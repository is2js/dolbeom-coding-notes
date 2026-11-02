#Requires -Version 5.1
<#
.SYNOPSIS
Prepare a local, isolated Windows 11 lecture VM and named checkpoints.
.DESCRIPTION
Check is read-only and works without elevation. It prints one JSON summary;
blockers in that summary do not make Check fail. All other actions require an
elevated PowerShell window. Supports Windows PowerShell 5.1 and PowerShell 7 on
Windows, with the local Hyper-V/Storage modules installed.

Create requires an existing, explicitly selected local StorageRoot, at least
MinimumFreeGiB actually free on its volume, a nonempty local ISO file, firmware
virtualization, an active hypervisor, and running VMMS. It creates a NEW VM:
Generation 2, static 8 GiB RAM, 4 vCPUs, dynamic VirtualDiskGiB VHDX, Secure Boot with
the Microsoft Windows template, local-key-protected vTPM, and Default Switch.
Defaults are a 64 GiB maximum virtual disk and 40 GiB actual free host space.
The dynamic disk grows as data is written; its maximum is not preallocated.
40 GiB is this helper's lightweight starting guard, not a Microsoft guarantee
of sufficient space for installation, apps, updates, or checkpoints. Monitor
actual host free space and leave more room as the VM is used.

The script never downloads files, accepts license terms, restarts the host,
starts/stops a VM, deletes resources, or replaces an existing VM/directory/file.
OS installation and guest shutdown happen manually in Hyper-V Manager.
Checkpoint and Restore require the VM to be Off. They manage only a VM bearing
this script's ownership note, and require an explicit, unique checkpoint name.
Restore asks for confirmation and discards changes made after the checkpoint.
Checkpoints are local recovery points, not backups or cloud-session resets.
On failure, partial newly created resources remain for manual inspection.

Exit codes: 0 success/Check/WhatIf; 2 unmet prerequisite or invalid action input;
3 existing resource/name conflict; 4 execution/query failure; 5 declined action.
PowerShell parameter-binding errors may return PowerShell's own nonzero code.
.PARAMETER Action
Check (default), EnableHyperV, Create, Checkpoint, Restore, or List.
.PARAMETER VMName
An exact local VM name. Defaults to Dolbeom-Lecture-Win11. Wildcards are rejected.
.PARAMETER StorageRoot
Existing local directory selected by the user. Required for Create. The script
creates a new VMName subdirectory inside it; that subdirectory must not exist.
Optional for Check to inspect the chosen volume without making changes.
.PARAMETER IsoPath
Existing nonempty local .iso file. Required for Create; optional for Check.
The script checks the file, not its Windows version, authenticity, or license.
.PARAMETER VirtualDiskGiB
Maximum capacity of the new dynamic VHDX in GiB; default 64, range 64-2048.
Windows 11 requires at least 64 GB of virtual disk capacity. This value is
separate from the actual free host storage required by MinimumFreeGiB.
.PARAMETER MinimumFreeGiB
Actual free space required on the selected host volume; default 40, range
40-2048 GiB. This is a helper guard rather than an official Windows minimum
or a guarantee for apps, updates, or checkpoints. An ISO already on the same
volume is counted in used space. Use a larger guard when more room is needed.
.PARAMETER CheckpointName
Explicit descriptive name, required for Checkpoint and Restore. Example:
00-Windows-clean, 01-Terminal-installed, or 02-Git-installed.
.EXAMPLE
.\recording\windows-vm.ps1 -Action Check
.EXAMPLE
.\recording\windows-vm.ps1 -Action Check -StorageRoot 'D:\LectureVMs' -IsoPath 'D:\ISO\Windows11.iso'
.EXAMPLE
.\recording\windows-vm.ps1 -Action EnableHyperV
Enables missing Hyper-V features with -NoRestart; any restart remains manual.
.EXAMPLE
.\recording\windows-vm.ps1 -Action Create -StorageRoot 'D:\LectureVMs' -IsoPath 'D:\ISO\Windows11.iso'
Run elevated after the Check blockers are resolved. Then open Hyper-V Manager
and start/connect to the VM manually to install Windows using your license.
.EXAMPLE
.\recording\windows-vm.ps1 -Action Checkpoint -CheckpointName '00-Windows-clean'
Shut down the guest first. This captures the VM's current disk state.
.EXAMPLE
.\recording\windows-vm.ps1 -Action List
.EXAMPLE
.\recording\windows-vm.ps1 -Action Restore -CheckpointName '00-Windows-clean' -Confirm
Shut down the guest first. Read the loss-of-changes confirmation before agreeing.
.LINK
https://learn.microsoft.com/windows-server/virtualization/hyper-v/checkpoints
.LINK
https://learn.microsoft.com/powershell/module/hyper-v/set-vmkeyprotector
.LINK
https://learn.microsoft.com/powershell/module/hyper-v/set-vmfirmware
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'High')]
param(
    [ValidateSet('Check', 'EnableHyperV', 'Create', 'Checkpoint', 'Restore', 'List')]
    [string] $Action = 'Check',

    [ValidatePattern('^[A-Za-z0-9][A-Za-z0-9 _-]{0,79}$')]
    [string] $VMName = 'Dolbeom-Lecture-Win11',

    [string] $StorageRoot,
    [string] $IsoPath,
    [string] $CheckpointName,

    [ValidateRange(64, 2048)]
    [int] $VirtualDiskGiB = 64,

    [ValidateRange(40, 2048)]
    [int] $MinimumFreeGiB = 40
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$script:OwnershipNote = 'Dolbeom lecture VM; managed by recording/windows-vm.ps1/v1'
$script:CreationStarted = $false
$script:VMDirectory = $null
$script:MinimumFreeBytes = [uint64] $MinimumFreeGiB * 1GB

function Stop-Task {
    param([int] $Code, [string] $Message)
    $exception = New-Object System.InvalidOperationException $Message
    $exception.Data['ExitCode'] = $Code
    throw $exception
}

function Write-Json {
    param($Value)
    $Value | ConvertTo-Json -Depth 9
}

function Test-Administrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal $identity
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-StorageSelection {
    param([string] $Path)
    if ([string]::IsNullOrWhiteSpace($Path) -or $Path -notmatch '^[A-Za-z]:[\\/]') {
        Stop-Task 2 'StorageRoot must be an existing absolute local drive path, for example D:\LectureVMs.'
    }
    $directory = Get-Item -LiteralPath $Path -ErrorAction Stop
    if ($directory -isnot [System.IO.DirectoryInfo]) {
        Stop-Task 2 'StorageRoot must be a directory.'
    }
    # Resolve the actual containing volume, including a volume mounted in a folder.
    $volume = @(Get-Volume -FilePath $directory.FullName -ErrorAction Stop)
    if ($volume.Count -ne 1) {
        Stop-Task 2 'Cannot uniquely determine the actual StorageRoot volume.'
    }
    if ([string] $volume[0].DriveType -ne 'Fixed') {
        Stop-Task 2 'StorageRoot must be on a fixed local volume.'
    }
    if ([string] $volume[0].FileSystemType -notin @('NTFS', 'ReFS')) {
        Stop-Task 2 'StorageRoot must use NTFS or ReFS.'
    }
    [pscustomobject] @{
        Path = $directory.FullName
        VolumePath = [string] $volume[0].Path
        FileSystem = [string] $volume[0].FileSystemType
        FreeBytes = [uint64] $volume[0].SizeRemaining
        FreeGiB = [math]::Round($volume[0].SizeRemaining / 1GB, 2)
        RequiredFreeGiB = $MinimumFreeGiB
        VirtualDiskGiB = $VirtualDiskGiB
        HasRequiredFreeSpace = ($volume[0].SizeRemaining -ge $script:MinimumFreeBytes)
        NewVMDirectory = Join-Path $directory.FullName $VMName
    }
}

function Get-IsoSelection {
    param([string] $Path)
    if ([string]::IsNullOrWhiteSpace($Path) -or $Path -notmatch '^[A-Za-z]:[\\/]') {
        Stop-Task 2 'IsoPath must be an existing absolute local .iso file path.'
    }
    $file = Get-Item -LiteralPath $Path -ErrorAction Stop
    if ($file -isnot [System.IO.FileInfo] -or $file.Extension -ine '.iso' -or $file.Length -le 0) {
        Stop-Task 2 'IsoPath must identify a nonempty .iso file.'
    }
    $stream = $null
    try {
        $stream = [System.IO.File]::Open($file.FullName, [System.IO.FileMode]::Open,
            [System.IO.FileAccess]::Read, [System.IO.FileShare]::Read)
    }
    finally {
        if ($null -ne $stream) { $stream.Dispose() }
    }
    [pscustomobject] @{ Path = $file.FullName; LengthBytes = $file.Length }
}

function Get-HostSummary {
    $warnings = New-Object 'System.Collections.Generic.List[string]'
    $computer = Get-CimInstance -ClassName Win32_ComputerSystem
    $os = Get-CimInstance -ClassName Win32_OperatingSystem
    $processors = @(Get-CimInstance -ClassName Win32_Processor)
    $features = @()
    try {
        $features = @(Get-CimInstance -ClassName Win32_OptionalFeature -Filter "Name LIKE 'Microsoft-Hyper-V%'" |
            Sort-Object Name | ForEach-Object {
                [pscustomobject] @{ Name = $_.Name; InstallState = [int] $_.InstallState;
                    Enabled = ($_.InstallState -eq 1) }
            })
    }
    catch { $warnings.Add('Hyper-V feature query failed: ' + $_.Exception.Message) }
    $vmms = Get-Service -Name vmms -ErrorAction SilentlyContinue
    $volumes = @(Get-CimInstance -ClassName Win32_LogicalDisk -Filter 'DriveType = 3' |
        Sort-Object DeviceID | ForEach-Object {
            [pscustomobject] @{ Drive = $_.DeviceID; FileSystem = $_.FileSystem;
                FreeGiB = [math]::Round($_.FreeSpace / 1GB, 2);
                RequiredFreeGiB = $MinimumFreeGiB;
                HasRequiredFreeSpace = ($_.FreeSpace -ge $script:MinimumFreeBytes) }
        })
    $hyperVInstalled = @($features | Where-Object { $_.Name -eq 'Microsoft-Hyper-V-All' -and $_.Enabled }).Count -eq 1
    $firmwareEnabled = @($processors | Where-Object { $_.VirtualizationFirmwareEnabled -eq $true }).Count -eq $processors.Count
    $slat = @($processors | Where-Object { $_.SecondLevelAddressTranslationExtensions -eq $true }).Count -eq $processors.Count
    $hypervisorPresent = ($computer.HypervisorPresent -eq $true)
    $administrator = Test-Administrator
    $blockers = New-Object 'System.Collections.Generic.List[string]'
    if (-not $administrator) { $blockers.Add('Run Create in an elevated PowerShell window.') }
    if (-not $hyperVInstalled) { $blockers.Add('Hyper-V features are not confirmed enabled; run EnableHyperV elevated, then restart manually if requested.') }
    # Some hosts hide processor virtualization flags once their hypervisor is active.
    if (-not $hypervisorPresent -and -not $firmwareEnabled) { $blockers.Add('Enable CPU virtualization (AMD SVM / Intel VT-x) in BIOS/UEFI, then boot Windows again.') }
    if (-not $hypervisorPresent -and -not $slat) { $blockers.Add('CPU SLAT support is not confirmed.') }
    if (-not $hypervisorPresent) { $blockers.Add('No active hypervisor detected. Resolve BIOS/Hyper-V/restart requirements before Create.') }
    if ($null -eq $vmms -or [string] $vmms.Status -ne 'Running') { $blockers.Add('The Hyper-V Virtual Machine Management service (VMMS) must be Running.') }
    if ($computer.TotalPhysicalMemory -lt 12GB) { $blockers.Add('At least 12 GiB host RAM is required here for the 8 GiB VM plus the host.') }
    $storage = $null
    if ([string]::IsNullOrWhiteSpace($StorageRoot)) {
        $blockers.Add(('Select StorageRoot explicitly; Create needs at least {0} GiB actually free on that volume.' -f $MinimumFreeGiB))
    }
    else {
        try {
            $storage = Get-StorageSelection $StorageRoot
            if (-not $storage.HasRequiredFreeSpace) { $blockers.Add(('Selected StorageRoot has less than {0} GiB free.' -f $MinimumFreeGiB)) }
            if (Test-Path -LiteralPath $storage.NewVMDirectory) { $blockers.Add('The target VM directory already exists; it will not be reused or overwritten.') }
        }
        catch { $blockers.Add('StorageRoot cannot be used: ' + $_.Exception.Message) }
    }
    $iso = $null
    if ([string]::IsNullOrWhiteSpace($IsoPath)) { $blockers.Add('Provide an existing Windows 11 ISO through IsoPath; no ISO is downloaded.') }
    else {
        try { $iso = Get-IsoSelection $IsoPath }
        catch { $blockers.Add('IsoPath cannot be used: ' + $_.Exception.Message) }
    }
    [pscustomobject] @{
        Action = 'Check'; Status = 'ReadOnly'; CheckedAtUtc = [datetime]::UtcNow.ToString('o')
        VMName = $VMName; IsAdministrator = $administrator
        VirtualDiskGiB = $VirtualDiskGiB; RequiredFreeGiB = $MinimumFreeGiB
        Host = [pscustomobject] @{ Windows = $os.Caption; Version = $os.Version;
            Build = $os.BuildNumber; Architecture = $os.OSArchitecture;
            RAMGiB = [math]::Round($computer.TotalPhysicalMemory / 1GB, 2);
            HypervisorPresent = $hypervisorPresent; VirtualizationFirmwareEnabled = $firmwareEnabled;
            SLAT = $slat; CPU = @($processors | ForEach-Object {
                [pscustomobject] @{ Name = $_.Name; Cores = $_.NumberOfCores; LogicalProcessors = $_.NumberOfLogicalProcessors }
            }) }
        HyperV = [pscustomobject] @{ FeaturesEnabled = $hyperVInstalled; Features = $features;
            VMMS = $(if ($null -ne $vmms) { [string] $vmms.Status } else { 'NotInstalled' }) }
        LocalVolumes = $volumes; Storage = $storage; ISO = $iso
        HostAndInputsReadyForCreate = ($blockers.Count -eq 0)
        Blockers = @($blockers.ToArray()); Warnings = @($warnings.ToArray())
        RemainingCreateChecks = @('Exact VM name must be unused.', 'Default Switch must exist.', 'Windows 11 CPU/ISO suitability and license require user verification.')
    }
}

function Import-LocalHyperV {
    try { Import-Module Hyper-V -ErrorAction Stop }
    catch { Stop-Task 2 ('Cannot load local Hyper-V module. Try elevated Windows PowerShell 5.1. ' + $_.Exception.Message) }
    $service = Get-Service -Name vmms -ErrorAction SilentlyContinue
    if ($null -eq $service -or [string] $service.Status -ne 'Running') {
        Stop-Task 2 'VMMS must already be Running. This script does not start services.'
    }
}

function Get-KnownVM {
    $matches = @(Get-VM -Name $VMName -ErrorAction SilentlyContinue)
    if ($matches.Count -ne 1 -or $matches[0].Name -ine $VMName) {
        Stop-Task 2 ('Exactly one local VM named ' + $VMName + ' must exist.')
    }
    if ([string] $matches[0].Notes -cne $script:OwnershipNote) {
        Stop-Task 2 'This VM does not have this script''s ownership note. Existing unrelated VMs are not managed.'
    }
    return $matches[0]
}

function Assert-CheckpointName {
    if ([string]::IsNullOrWhiteSpace($CheckpointName) -or $CheckpointName.Length -gt 100 -or
        [System.Management.Automation.WildcardPattern]::ContainsWildcardCharacters($CheckpointName) -or
        $CheckpointName -match '[\x00-\x1F]') {
        Stop-Task 2 'Provide an explicit descriptive CheckpointName (1-100 characters, no wildcards/control characters).'
    }
}

try {
    if ([System.Environment]::OSVersion.Platform -ne [System.PlatformID]::Win32NT) {
        Stop-Task 2 'This script requires Windows.'
    }
    if ($Action -eq 'Check') {
        Write-Json (Get-HostSummary)
        exit 0
    }
    if (-not (Test-Administrator)) { Stop-Task 2 'Run this action from an elevated PowerShell window. Check works without elevation.' }

    if ($Action -eq 'EnableHyperV') {
        $feature = Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -ErrorAction Stop
        if ([string] $feature.State -eq 'Enabled') {
            Write-Json ([pscustomobject] @{ Action = $Action; Status = 'AlreadyEnabled'; ChangesMade = $false;
                Message = 'No feature change needed. BIOS virtualization and an active hypervisor must still be checked.' })
            exit 0
        }
        if ($PSCmdlet.ShouldProcess('This Windows host', 'Enable Hyper-V optional features with -NoRestart; any reboot must be manual')) {
            $result = Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All -NoRestart -ErrorAction Stop
            Write-Json ([pscustomobject] @{ Action = $Action; Status = 'Enabled'; RestartNeeded = [bool] $result.RestartNeeded;
                Message = 'No restart was initiated. Restart manually when ready, then run Check again.' })
            exit 0
        }
    }
    else {
        if ($Action -eq 'Create') {
            $summary = Get-HostSummary
            if (-not $summary.HostAndInputsReadyForCreate) { Stop-Task 2 ($summary.Blockers -join ' ') }
        }
        Import-LocalHyperV
        switch ($Action) {
            'Create' {
                if (@(Get-VM -Name $VMName -ErrorAction SilentlyContinue).Count -gt 0) {
                    Stop-Task 3 'A VM with that name already exists. It will not be modified.'
                }
                $defaultSwitch = @(Get-VMSwitch -Name 'Default Switch' -ErrorAction SilentlyContinue)
                if ($defaultSwitch.Count -ne 1) { Stop-Task 2 'Default Switch is not available. This script does not create or alter switches.' }
                $script:VMDirectory = $summary.Storage.NewVMDirectory
                if (Test-Path -LiteralPath $script:VMDirectory) { Stop-Task 3 'Target directory already exists; choose a new VMName or StorageRoot.' }
                $createDescription = 'Create a new Windows 11 VM (8 GiB, 4 vCPUs, dynamic {0} GiB maximum, at least {1} GiB free host space, Secure Boot/vTPM); leave it Off' -f $VirtualDiskGiB, $MinimumFreeGiB
                if ($PSCmdlet.ShouldProcess($script:VMDirectory, $createDescription)) {
                    # Recheck the exact paths and free space immediately before the first write.
                    $storage = Get-StorageSelection $StorageRoot
                    $iso = Get-IsoSelection $IsoPath
                    if (-not $storage.HasRequiredFreeSpace) { Stop-Task 2 ('StorageRoot now has less than {0} GiB free.' -f $MinimumFreeGiB) }
                    if (Test-Path -LiteralPath $script:VMDirectory) { Stop-Task 3 'Target directory appeared during validation; no resources were replaced.' }
                    $script:CreationStarted = $true
                    New-Item -ItemType Directory -Path $script:VMDirectory -ErrorAction Stop | Out-Null
                    $diskDirectory = Join-Path $script:VMDirectory 'Virtual Hard Disks'
                    $checkpointDirectory = Join-Path $script:VMDirectory 'Checkpoints'
                    New-Item -ItemType Directory -Path $diskDirectory -ErrorAction Stop | Out-Null
                    New-Item -ItemType Directory -Path $checkpointDirectory -ErrorAction Stop | Out-Null
                    $diskPath = Join-Path $diskDirectory ($VMName + '.vhdx')
                    New-VHD -Path $diskPath -Dynamic -SizeBytes ([uint64] $VirtualDiskGiB * 1GB) -Confirm:$false -ErrorAction Stop | Out-Null
                    $vm = New-VM -Name $VMName -Generation 2 -MemoryStartupBytes 8GB -Path $script:VMDirectory -VHDPath $diskPath -SwitchName 'Default Switch' -Confirm:$false -ErrorAction Stop
                    Set-VM -VM $vm -Notes $script:OwnershipNote -StaticMemory -MemoryStartupBytes 8GB -ProcessorCount 4 -AutomaticStartAction Nothing -AutomaticCheckpointsEnabled $false -CheckpointType Standard -SnapshotFileLocation $checkpointDirectory -Confirm:$false -ErrorAction Stop
                    Set-VMFirmware -VM $vm -EnableSecureBoot On -SecureBootTemplate MicrosoftWindows -Confirm:$false -ErrorAction Stop
                    Set-VMKeyProtector -VM $vm -NewLocalKeyProtector -Confirm:$false -ErrorAction Stop
                    Enable-VMTPM -VM $vm -Confirm:$false -ErrorAction Stop
                    $dvd = Add-VMDvdDrive -VM $vm -Path $iso.Path -Passthru -Confirm:$false -ErrorAction Stop
                    Set-VMFirmware -VM $vm -FirstBootDevice $dvd -Confirm:$false -ErrorAction Stop
                    Write-Json ([pscustomobject] @{ Action = $Action; Status = 'Created'; VMName = $vm.Name;
                        VMId = [string] $vm.Id; Directory = $script:VMDirectory; VHDX = $diskPath;
                        VirtualDiskGiB = $VirtualDiskGiB; RequiredFreeGiB = $MinimumFreeGiB;
                        State = 'Off'; Message = 'Open Hyper-V Manager, connect/start manually, then install Windows using your own license. No OS installation or license acceptance was performed.' })
                    exit 0
                }
            }
            'List' {
                $vm = Get-KnownVM
                $snapshots = @(Get-VMSnapshot -VM $vm -ErrorAction Stop | Sort-Object CreationTime | ForEach-Object {
                    [pscustomobject] @{ Name = $_.Name; Id = [string] $_.Id; Created = $_.CreationTime;
                        SnapshotType = [string] $_.SnapshotType; State = [string] $_.State }
                })
                Write-Json ([pscustomobject] @{ Action = $Action; Status = 'ReadOnly'; VMName = $vm.Name;
                    VMId = [string] $vm.Id; State = [string] $vm.State; Checkpoints = $snapshots })
                exit 0
            }
            { $_ -in @('Checkpoint', 'Restore') } {
                Assert-CheckpointName
                $vm = Get-KnownVM
                if ([string] $vm.State -ne 'Off') {
                    Stop-Task 2 'Shut down the guest manually first; Checkpoint/Restore require State=Off. This script never starts or stops a VM.'
                }
                $matches = @(Get-VMSnapshot -VM $vm -ErrorAction Stop | Where-Object { $_.Name -ieq $CheckpointName })
                if ($Action -eq 'Checkpoint') {
                    if ($matches.Count -ne 0) { Stop-Task 3 'That checkpoint name already exists. Choose a new name; no checkpoint will be replaced.' }
                    if ($PSCmdlet.ShouldProcess($vm.Name, ('Capture the CURRENT powered-off disk state as checkpoint ' + $CheckpointName))) {
                        $snapshot = Checkpoint-VM -VM $vm -SnapshotName $CheckpointName -Passthru -Confirm:$false -ErrorAction Stop
                        Write-Json ([pscustomobject] @{ Action = $Action; Status = 'Created'; VMName = $vm.Name;
                            CheckpointName = $snapshot.Name; Id = [string] $snapshot.Id })
                        exit 0
                    }
                }
                else {
                    if ($matches.Count -ne 1) { Stop-Task 2 'Exactly one checkpoint with that explicit name must exist. Run List to inspect names.' }
                    if ([string] $matches[0].State -ne 'Off') { Stop-Task 2 'This checkpoint was not captured Off. Refusing a restore that could resume/start a VM.' }
                    $warning = 'RESTORE checkpoint ' + $CheckpointName + ': discard all guest files, installs, settings and process/session changes since that point. Existing checkpoints remain. The VM must stay Off.'
                    if ($PSCmdlet.ShouldProcess($vm.Name, $warning)) {
                        Restore-VMSnapshot -VMSnapshot $matches[0] -Confirm:$false -ErrorAction Stop
                        Write-Json ([pscustomobject] @{ Action = $Action; Status = 'Restored'; VMName = $vm.Name;
                            CheckpointName = $matches[0].Name; State = 'Off'; Message = 'Start the VM manually in Hyper-V Manager when ready.' })
                        exit 0
                    }
                }
            }
        }
    }
    $skippedStatus = 'Declined'
    $skippedCode = 5
    if ($WhatIfPreference) { $skippedStatus = 'WhatIf'; $skippedCode = 0 }
    Write-Json ([pscustomobject] @{ Action = $Action; Status = $skippedStatus; ChangesMade = $false })
    exit $skippedCode
}
catch {
    $code = 4
    if ($_.Exception.Data.Contains('ExitCode')) { $code = [int] $_.Exception.Data['ExitCode'] }
    $message = $_.Exception.Message
    if ($script:CreationStarted) { $message += ' No cleanup was performed. Inspect partial resources manually before retrying; existing data was not deleted.' }
    [Console]::Error.WriteLine($message)
    Write-Json ([pscustomobject] @{ Action = $Action; Status = 'Error'; ExitCode = $code;
        Message = $message; PartialCreationPossible = $script:CreationStarted; VMDirectory = $script:VMDirectory })
    exit $code
}
