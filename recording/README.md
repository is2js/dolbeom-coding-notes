# 촬영용 Windows 실습 환경과 OBS·Zoom 준비

**PC에서 OBS 또는 Zoom과 마이크를 실행하고, 별도 실습 창에서 도구를 시연합니다.** 용량이 부족한 현재 PC에는 Windows Sandbox를 먼저 권합니다. 설치 후 특정 시점으로 되돌아가는 기능이 꼭 필요하면 일반 Hyper-V VM을 사용합니다.

현재 추천 조합은 **Sandbox + 무료 OBS 녹화**입니다. 클라우드 녹화가 편하면 Zoom 유료 플랜도 선택할 수 있습니다. OBS로 혼자 사전 녹화할 때는 Zoom 회의를 만들거나 결제할 필요가 없습니다.

| 지금 필요한 내용 | 안내 |
| --- | --- |
| Sandbox에 Windows Terminal·Git·VS Code 설치 | 아래 **Sandbox에 시연 도구 준비** |
| 무료로 실습 창만 녹화·북마크와 창 테두리 자르기 | [OBS 녹화 순서](OBS.md) |
| 설치 상태를 보관하는 일반 VM | 아래 **VM 공간은 언제 확보해야 하나요?**와 생성 명령 |
| Zoom 클라우드 녹화 | 아래 **Zoom 유료 결제 후 한 번 설정** |

이 폴더의 `windows-vm.ps1`은 Hyper-V 상태 확인, VM 생성, 체크포인트 저장·복원을 돕습니다. Windows 설치, Zoom 결제·로그인·계정 설정은 사용자가 진행합니다.

## 용량을 줄이는 방법: Windows Sandbox

| 구분 | Windows Sandbox — 현재 추천 | 일반 Hyper-V VM |
| --- | --- | --- |
| Windows 설치 파일 | 별도 ISO 불필요 | ISO 필요 |
| 디스크 | 공식 최소 여유 1GB + 설치 앱·임시 파일 공간 | 가상디스크 최대 64GiB, 실제 여유 40GiB부터 생성 허용 |
| 초기화 | 창을 닫고 다시 열면 깨끗한 상태 | 저장한 체크포인트로 복원 |
| 설치를 마친 상태 유지 | 닫으면 사라짐 | 유지 가능 |
| 현재 PC에서 보이는 Windows | 호스트와 같은 Windows 10 빌드 | ISO로 설치한 Windows 11 |

Sandbox의 1GB는 공식 기능 설치 최소 조건입니다. Git·IDE·다운로드까지 모두 1GB에 들어간다는 뜻은 아닙니다. 호스트 Windows의 파일을 재사용하므로 Windows를 별도로 설치하는 VM보다 가볍습니다. [설치 조건](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-install) · [상태 초기화·OS·앱 제한](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-faq)

1. 아래 BIOS **SVM Mode**를 켜는 단계는 Sandbox도 필요합니다.
2. 현재 PC에는 Sandbox 기능이 켜져 있지 않습니다. **관리자 Windows PowerShell**에서 다음 명령으로 켭니다. 자동 재부팅은 하지 않습니다. `RestartNeeded`가 true이면 작업을 저장하고 직접 재부팅합니다.

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Containers-DisposableClientVM -All -NoRestart
```

3. 탐색기에서 **`recording/lecture-sandbox.wsb`를 더블클릭**합니다. 인터넷·복사/붙여넣기를 사용할 수 있는 RAM 4GB의 빈 실습 창이 열립니다. 마이크·카메라는 호스트 OBS 또는 Zoom에서 사용합니다. 호스트 폴더 연결이나 앱 자동 설치는 없습니다. [공식 설정 파일 안내](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-configure-using-wsb-file)
4. Git 설치 시연 등을 한 뒤 창을 닫으면 초기화됩니다. 결과물을 보관하려면 닫기 전에 복사해서 호스트에 저장합니다. 설치 파일은 호스트에 보관했다가 다시 복사하면 반복 다운로드를 줄일 수 있습니다.
5. Windows Terminal 설치의 Microsoft Store 화면은 **호스트에서 시연**합니다. Sandbox에는 Store 앱이 없으므로 Store 설치 화면을 그대로 재현할 수 없습니다. 터미널 명령·Git 실습은 Sandbox에서 진행할 수 있습니다.

### Sandbox에 시연 도구 준비

**Windows Terminal·Git·VS Code를 설치하거나 실행해 단기 시연할 수 있습니다.** Sandbox에는 **Microsoft Store와 WinGet이 기본 포함되지 않으므로** 공식 EXE·ZIP을 사용합니다. [WinGet 공식 설명](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget-on-windows-sandbox)

| 도구 | 준비 파일 | Sandbox에서 실행하는 방법 |
| --- | --- | --- |
| Windows Terminal | [공식 안정 버전의 x64 unpackaged ZIP](https://github.com/microsoft/terminal/releases/latest) | 압축을 풀고 `WindowsTerminal.exe` 실행. 실행 파일 옆에 `.portable`이라는 빈 파일을 만들면 설정도 그 폴더에 보관 |
| Git | [Git for Windows x64 Setup EXE](https://git-scm.com/install/windows) | 설치 마법사 실행. 명령 프롬프트·다른 앱에서도 Git을 쓰는 PATH 옵션을 선택하고 설치 후 터미널을 새로 열기 |
| VS Code | [x64 User Installer](https://code.visualstudio.com/download) | 설치 파일 실행. 설치 과정을 생략하려면 공식 ZIP 배포본을 풀고 `Code.exe` 실행 |

Terminal의 unpackaged/portable 방식은 현재 PC의 Windows 10 빌드 19045에서 사용할 수 있는 배포 방식입니다. **기본 터미널 지정·탐색기의 Open in Terminal 메뉴는 제공하지 않지만 탭·분할·명령어 시연은 가능합니다.** [Terminal 배포 방식](https://learn.microsoft.com/en-us/windows/terminal/distributions)

Microsoft는 [Sandbox에서 VS Code를 설치하는 공식 예제](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-sample-configuration#example-2---installing-visual-studio-code-at-launch-in-a-sandbox)도 제공합니다. 다만 [VS Code 지원 범위](https://code.visualstudio.com/docs/supporting/requirements#not-supported)에서는 비영구 VM을 공식 지원에서 제외하므로, 설치·짧은 편집·Git 연동을 촬영 전에 실제로 확인합니다. 현재 PC에서는 BIOS 가상화가 활성화되지 않아 아직 실행 검증하지 못했습니다.

처음에는 **호스트에 세 파일을 한 번 내려받기 → Sandbox 안으로 복사 → 설치/실행** 순서가 단순합니다. 설정 동기화 로그인 없이 강의용 빈 환경으로 연습합니다. 닫으면 앱·설정도 사라지므로 파일은 호스트에 보관하고, 매번 설치 마법사가 필요한 부분과 실행만 필요한 부분을 구분합니다.

첫 리허설은 다음 정도면 충분합니다.

1. Terminal을 열고 탭을 추가한 뒤 `git --version`으로 Git을 확인합니다.
2. Sandbox 바탕화면에 `lecture-demo` 폴더를 만들고, Terminal에서 그 폴더로 이동해 `git init`을 실행합니다.
3. VS Code의 **폴더 열기**로 같은 폴더를 열고 `README.md`에 `# 첫 실습`을 저장합니다.
4. VS Code의 **소스 제어**에서 새 파일이 표시되는지 확인합니다. 보관할 파일을 호스트로 복사한 뒤 Sandbox를 닫아 초기화 흐름까지 연습합니다.

아래는 **특정 시점을 보관해야 할 때 사용하는 일반 VM** 준비 방법입니다. Sandbox만 사용하면 ISO 다운로드와 VM 생성·체크포인트 단계는 건너뜁니다. BIOS 가상화가 현재 꺼진 것으로 표시되므로 Sandbox 실행은 아직 검증하지 못했습니다.

## 먼저 할 일

2026-10-26 확인한 현재 PC 상태입니다. 이후에는 `Check`로 다시 확인하세요.

| 항목 | 확인 결과 | 다음 행동 |
| --- | --- | --- |
| 호스트 | Windows 10 Pro, Ryzen 5 5600X, RAM 32GB | VM은 Windows 11 x64로 준비 |
| Hyper-V | 기능 설치됨, VMMS 실행 중 | 재설치 불필요 |
| 가상화 | 펌웨어 가상화·실행 중 하이퍼바이저가 모두 false로 표시 | BIOS의 SVM 설정 확인 후 재부팅 |
| 저장 공간 | 현재 연결된 C: 여유 약 23GB | 일반 VM은 40GiB 이상 확보, Sandbox는 별도 100GiB 불필요 |
| 실행 권한 | 현재 터미널은 일반 권한 | VM 생성 시 PowerShell을 관리자 권한으로 실행 |
| Windows ISO | Downloads 바로 아래에서 찾지 못함 | 공식 x64 ISO를 준비하거나 기존 ISO 위치 지정 |

이전의 **100GiB 물리 여유 강제 조건은 제거했습니다.** 일반 VM 도우미는 **가상디스크 최대 용량 64GiB**와 **호스트 실제 여유 공간 40GiB**를 구분합니다. 동적 디스크는 64GiB를 처음부터 모두 차지하지 않으며 실제 Windows·앱·변경 데이터만큼 커집니다. 가상디스크 상한만 줄인다고 설치된 Windows의 실제 데이터가 줄어들지는 않습니다.

40GiB는 이 도우미에서 정한 가벼운 실습 시작 기준이며 Microsoft 공식 요구량이나 설치 성공 보장값은 아닙니다. ISO를 같은 디스크에 보관했다면 다운로드가 끝난 뒤의 여유 공간으로 검사합니다. 업데이트·IDE·체크포인트가 추가되면 더 많은 공간이 필요합니다. 현재 23GB로 일반 Windows VM 설치를 진행하지는 않습니다.

### VM 공간은 언제 확보해야 하나요?

**빈 VM을 만드는 것 자체가 물리 디스크 64GiB를 바로 요구하는 것은 아닙니다.** 동적 디스크 파일은 작게 시작할 수 있습니다. 하지만 Windows 설치·업데이트·앱·체크포인트 데이터가 실제로 쌓이므로 현재 C: 여유 23GB에서 Windows VM을 완성하고 유지할 수 있다고 보장할 수는 없습니다. 현재 생성 도우미는 실제 여유 40GiB 미만이면 중단합니다. [동적 가상디스크 설명](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn641210%28v%3Dws.11%29#10-understanding-virtual-hard-disk)

C:를 반드시 비울 필요는 없습니다. **여유가 있는 다른 SSD에 ISO와 VM 저장 폴더를 두면 됩니다.** 용량과 함께 BIOS 가상화·관리자 권한도 준비되어야 합니다. OBS 녹화 파일을 같은 디스크에 저장하면 그 용량도 별도로 필요합니다. 공간 확보 전에는 Sandbox로 설치 시연을 먼저 진행하는 구성이 현실적입니다.

### 1. 저장 공간과 가상화

1. C: 공간을 확보하거나 다른 SSD를 연결합니다. NTFS 또는 ReFS 형식의 SSD에 탐색기로 저장 폴더(예: `D:\LectureVMs`)를 먼저 만듭니다. Git 프로젝트·OneDrive 밖의 폴더를 사용합니다. 외장 SSD를 사용하면 VM이 실행 중일 때 분리하지 않습니다.
2. 작업을 저장하고, 원하는 시점에 PC를 다시 시작해 BIOS에서 **SVM Mode → Enabled**를 확인합니다. 현재 메인보드는 **MSI MAG B550M MORTAR WIFI**입니다.
3. MSI 공식 AMD 안내는 `OC → CPU Features → SVM Mode`를 사용합니다. BIOS 버전에 따라 CPU 관련 메뉴 이름이 다를 수 있으므로 실제 메뉴를 확인합니다. 부팅·디스크 설정을 바꿀 필요는 없습니다. [MSI SVM 안내](https://us.msi.com/faq/2581) · [해당 보드 지원 페이지](https://www.msi.com/Motherboard/MAG-B550M-MORTAR-WIFI/support)
4. Windows에 돌아온 뒤 작업 관리자 → 성능 → CPU에서 **가상화: 사용**을 확인합니다. 아래 `Check`에서도 `HypervisorPresent`를 확인합니다. BIOS에서 켰는데도 false라면 출력 결과를 먼저 확인하고 원인을 점검합니다.

스크립트는 BIOS·부팅 설정을 변경하거나 PC를 재부팅하지 않습니다. `EnableHyperV`는 Hyper-V가 설치되지 않은 다른 PC용이며, 현재 PC에서는 먼저 실행할 필요가 없습니다.

### 2. Windows 설치 파일

[Microsoft Windows 11 다운로드](https://www.microsoft.com/ko-kr/software-download/windows11)에서 **x64 디바이스용 Windows 11 디스크 이미지(ISO)**를 선택하고 한국어 ISO를 저장합니다. VM 설치에 사용할 Windows 라이선스와 약관은 직접 확인합니다.

호스트의 설치 도우미나 ISO 안의 `setup.exe`를 실행할 필요는 없습니다. 다운로드한 ISO를 아래 VM 생성 명령에 연결합니다.

## 상태 확인과 VM 생성

시작 메뉴에서 **Windows PowerShell → 관리자 권한으로 실행**을 선택합니다. 명령은 호스트 PC에서 실행합니다.

```powershell
cd C:\Users\cho_desktop\WebstormProjects\dolbeom-coding-notes
.\recording\windows-vm.ps1 -Action Check
```

`Check`는 일반 권한으로도 실행할 수 있고 설정을 변경하지 않습니다. 관리자·가상화·디스크 상태 등을 JSON으로 표시합니다. 생성할 저장 위치와 ISO를 정했다면 다음처럼 입력합니다. 경로 입력 시 따옴표는 넣지 않습니다.

```powershell
$vmStorageRoot = Read-Host 'VM 저장 폴더의 전체 경로 (예: D:\LectureVMs)'
$windowsIsoPath = Read-Host '다운로드한 Windows 11 ISO의 전체 경로'
.\recording\windows-vm.ps1 -Action Check -StorageRoot $vmStorageRoot -IsoPath $windowsIsoPath
```

`HostAndInputsReadyForCreate`가 `true`인지 확인한 뒤 생성합니다. 별도로 같은 이름의 VM과 Default Switch도 확인하므로 문제가 있으면 중단합니다.

```powershell
.\recording\windows-vm.ps1 -Action Create -StorageRoot $vmStorageRoot -IsoPath $windowsIsoPath
```

VM 기본값은 **`Dolbeom-Lecture-Win11` / 2세대 / RAM 8GB / 가상 CPU 4개 / 최대 64GiB의 동적 디스크 / Secure Boot / 가상 TPM / Default Switch 인터넷 연결**입니다. Windows 11의 가상디스크 최소 요구는 64GB입니다. [Windows 11 VM 요구 사항](https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements#virtual-machine-support)

필요하면 생성 시 `-VirtualDiskGiB 80 -MinimumFreeGiB 50`처럼 가상디스크 상한과 호스트 여유 기준을 각각 올릴 수 있습니다. 기존 VM 디스크를 줄이는 기능은 아닙니다.

기존의 같은 이름 VM이나 대상 폴더가 있으면 중단합니다. 부족한 권한·공간·가상화·ISO를 확인하면 생성 전에 중단하며, VM을 자동으로 시작하지 않습니다.

생성이 끝나면 시작 메뉴의 **Hyper-V 관리자**에서 `Dolbeom-Lecture-Win11`을 선택하고 **연결 → 시작**을 누릅니다. ISO 부팅 화면이 나오면 VM 창에서 키를 누르고 Windows 설치를 진행합니다. 설치가 끝나면 VM 설정 → DVD 드라이브에서 ISO를 분리합니다.

Windows 안에서 업데이트와 화면 배율을 정리한 뒤, **VM의 Windows를 종료**하고 첫 체크포인트를 만듭니다. Windows 11에는 Terminal이 이미 있을 수 있으므로 설치 여부를 확인하는 실습으로 진행할 수 있습니다.

## 시연 상태를 저장하고 되돌리기

체크포인트는 “이 시점으로 돌아가기”입니다. 이 도우미는 VM이 완전히 **꺼짐(Off)** 상태일 때만 저장·복원합니다. 저장된 앱 메모리 대신 설치·파일 상태를 재현하는 방식입니다. VM 안에서 Windows를 종료하고 실행하세요.

```powershell
# Git 등 시연 도구를 설치하기 전
.\recording\windows-vm.ps1 -Action Checkpoint -CheckpointName '00-clean-windows'

# Git을 설치하고 설정한 뒤, 다시 Windows를 종료한 상태에서
.\recording\windows-vm.ps1 -Action Checkpoint -CheckpointName '01-git-installed'

# IDE와 예제까지 준비한 뒤
.\recording\windows-vm.ps1 -Action Checkpoint -CheckpointName '02-demo-ready'

# 저장해 둔 지점 확인
.\recording\windows-vm.ps1 -Action List

# 설치 전으로 되돌리기 — 변경이 사라진다는 확인 질문이 표시됩니다
.\recording\windows-vm.ps1 -Action Restore -CheckpointName '00-clean-windows'
```

복원하면 **해당 지점 이후 VM 안의 파일·설정·로그인 상태가 되돌아갑니다.** 보관할 실습 결과는 먼저 호스트나 원격 저장소에 저장합니다. 체크포인트는 별도 백업을 대신하지 않습니다. 이 스크립트는 체크포인트를 자동 삭제하지 않습니다.

강의노트는 VM 또는 Sandbox의 브라우저에서 [배포된 강의노트](https://is2js.github.io/dolbeom-coding-notes/#/present/terminal/case)를 엽니다. 호스트의 `127.0.0.1:5188`은 별도 실습 환경 자신의 주소와 다르므로 배포 주소를 사용하는 것이 간단합니다. 공개 강의에 아직 반영하지 않은 원고는 호스트에서 확인하고, 필요할 때 OBS의 **강의노트/실습 장면 전환**이나 Zoom의 **새 공유**를 사용합니다.

## 무료 OBS 녹화

**OBS는 호스트 PC에만 설치**하고 Sandbox 또는 VM 창을 캡처합니다. 창·북마크 영역 자르기, 마이크, 녹화 형식, 장면 전환과 저장 공간 계산은 [OBS 무료 녹화 가이드](OBS.md)에 정리했습니다. 아래 Zoom 설정은 클라우드 녹화를 선택할 때만 진행합니다.

## Zoom 유료 결제 후 한 번 설정

최소 구성은 **Zoom Workplace Pro 월간 1라이선스**입니다. 직접 결제할 때 월간 결제인지, 라이선스 수가 1개인지, 세금 포함 총액과 다음 갱신일을 확인합니다. 조직 계정이면 본인에게 유료 라이선스가 배정되어 있어야 합니다. [Pro 안내](https://www.zoom.com/ko/products/collaboration-tools/zoom-workplace-pro/) · [클라우드 녹화 요건](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062627)

1. Zoom 웹 포털 → **설정(Settings) → 녹화 및 대화 내용(Recording & Transcript)**에서 **클라우드 녹화**를 켭니다.
2. `Record active speaker, gallery view and shared screen separately` 아래 **Shared screen만 선택**합니다. 다른 영상 레이아웃과 **Record thumbnails when sharing**은 해제합니다. 얼굴 없는 공유 화면 영상용 설정입니다.
3. 별도 음성 파일도 보관하려면 **Record audio-only files**를 추가로 선택합니다. 코드 화면의 불필요한 이름·타임스탬프 표시도 끕니다. [공식 녹화 설정](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0064676)
4. PC의 Zoom 앱에서 마이크를 선택하고 **기본 소음 제거(Noise removal)**를 유지합니다. 코딩 설명에는 음악용 원음 설정이 필요하지 않습니다. 특히 **Live performance audio**는 클라우드 녹화에 오디오를 담지 못하므로 켜지 않습니다. [공식 오디오 안내](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0064198)

## 매번 촬영하는 순서

1. VM 또는 Sandbox를 열고, 그 안에서 노트와 시연 앱을 엽니다. 브라우저 북마크 표시줄을 숨기고 코드 글자를 충분히 키웁니다.
2. **호스트 PC**의 Zoom에서 혼자 회의를 시작합니다. 카메라는 끄고 컴퓨터 오디오 연결·마이크 음소거 해제를 확인합니다.
3. **화면 공유에서 VM 연결 창 또는 Sandbox 창 하나**를 선택합니다. 그 안에서 브라우저 ↔ 터미널 ↔ IDE로 전환하면 공유 대상을 바꾸지 않아도 됩니다. 본 녹화 전에 창 테두리·가독성을 확인합니다.
4. **녹화 → 클라우드에 녹화**로 60~90초 시험 촬영합니다. 발표 화면 설명 → 터미널 입력 → IDE 확인 → 발표 화면 복귀까지 한 번씩 해봅니다.
5. 회의를 끝내고 처리 완료 후 웹 **녹화 및 대화 내용(Recordings & Transcripts)**에서 MP4를 내려받습니다. **목소리, 코드 가독성, 실제 영상 크기, 원치 않는 화면 포함 여부**를 확인합니다. 유료 결제만으로 1080p가 보장되지는 않습니다. [녹화 시작](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062627) · [해상도 안내](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0066421)
6. 문제가 없으면 절별로 본 촬영을 진행합니다. 완성 영상은 호스트나 별도 저장소에 보관하고 나서 VM을 복원합니다.

클라우드 녹화는 선택한 공유 창 안의 브라우저 북마크를 자동으로 지우지 않습니다. VM 안의 브라우저를 강의 전용으로 정리해야 합니다. 녹화 MP4에는 마이크 음성이 함께 들어가는지 시험 파일로 확인하세요.

실전 시연이 실패하면 준비한 MP4를 일반 동영상 플레이어로 열어 **플레이어 창 + 컴퓨터 소리 공유**를 사용합니다. 동영상 최적화는 영상 재생 때만 켜고, 코드를 설명할 때는 끕니다. [화면·소리 공유 안내](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060596)
