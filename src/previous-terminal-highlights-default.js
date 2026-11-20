// Terminal defaults before the teaching highlights and Store walkthrough.
export const previousTerminalHighlightsDefault = {
  "case": {
    "body": "### ZIP과 실행 명령으로 받은 프로젝트\n\n제가 실제로 받은 결과물입니다. ZIP을 푼 뒤 프로젝트 폴더의 Windows Terminal에서 실행해 달라고 요청했습니다.\n\n![AI 에이전트가 프로젝트 ZIP과 npm 실행 명령을 제시하고 강사가 Windows Terminal의 PowerShell에서 실행해 달라고 요청한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n`npm install`은 준비에 필요한 패키지를 설치하고, `npm run dev`는 이 프로젝트의 개발 서버를 켭니다. 화면에서 **어느 폴더에서 어떤 명령을 실행하는지** 먼저 찾아보세요.\n\n### 도구 설치 안내에서도 만나는 터미널\n\n아래 검색 화면도 PowerShell 명령을 보여 줍니다. 실제 설치 방법은 환경에 맞는 공식 안내에서 확인합니다. [OpenAI Codex CLI 안내](https://learn.chatgpt.com/docs/codex/cli)\n\n![Windows에서 Codex CLI 설치 방법을 검색한 결과와 PowerShell 명령이 표시된 AI 요약 화면](./assets/course/codex-cli-install-search.png)\n\n**오늘의 목표**는 실행 위치와 오류 메시지를 직접 읽는 것입니다. HTML 파일을 바로 열 수 있는 사이트도 있고, 개발 서버를 켜서 수정 결과를 확인하는 프로젝트도 있습니다. 실습은 현재 폴더를 확인하는 것부터 시작합니다."
  },
  "objectives": [
    "Codex 요청을 입력하는 곳과 셸 명령을 입력하는 곳을 구분합니다.",
    "PowerShell의 현재 위치를 GUI로 열고, 목록 확인·폴더 생성·이동 뒤 같은 위치에서 Windows Terminal을 엽니다.",
    "앞에서 만든 연습 폴더에서 메모 파일을 만들고 메모장과 PowerShell로 같은 내용을 확인합니다.",
    "Windows Terminal 호스트와 PowerShell·cmd 셸을 구분하고 5.1·7의 실행 이름과 버전을 확인합니다.",
    "PowerShell 7 설치는 선택 사항임을 알고 필요할 때 공식 설치 안내를 찾습니다.",
    "설정의 작업에서 단축키를 확인·변경하고 탭·분할 창을 오가며 현재 위치를 다시 확인합니다."
  ],
  "checklist": [
    "Codex 요청을 입력하는 곳과 셸 명령을 입력하는 곳을 구분할 수 있습니다.",
    "Get-Location과 pwd로 확인한 경로를 Win+R 또는 explorer.exe .으로 열 수 있습니다.",
    "Get-ChildItem/ls, New-Item/ni와 mkdir 함수, Set-Location/cd의 역할을 구분하며 안전한 연습 폴더를 만들 수 있습니다.",
    "탐색기 주소줄 wt -d .로 Terminal을 열고 현재 위치를 다시 확인할 수 있습니다.",
    "같은 연습 폴더에서 새 메모 파일을 만들고 메모장에 저장한 내용을 PowerShell로 확인할 수 있습니다.",
    "Windows Terminal과 PowerShell·cmd·설치된 Git Bash의 역할을 구분합니다.",
    "Terminal의 테마·탭·분할·단축키를 사용하고 PowerShell 버전을 확인할 수 있습니다."
  ],
  "closing": "현재 위치를 확인하고 Win+R 또는 explorer.exe .으로 탐색기를 열었습니다. 목록·폴더를 다룬 뒤 같은 폴더의 메모를 만들고 메모장과 PowerShell에서 저장 결과를 확인했습니다. Terminal과 셸, 탭·분할·단축키를 정리하고 다음 Git 강의로 이어 갑니다. 다음 Git에서도 이 git-practice 폴더의 note.txt를 그대로 사용합니다.",
  "presentation": {
    "caseSummary": "AI가 프로젝트 ZIP과 실행 명령을 안내한 경험을 살펴봅니다. Codex CLI 설치를 검색할 때도 PowerShell 명령을 만날 수 있으며, 설치 전에는 공식 안내를 확인합니다.",
    "demo": {
      "program": "Windows Terminal · PowerShell · 탐색기 · 메모장",
      "file": "앞 절에서 만든 git-practice 폴더 · 새 note.txt",
      "command": "실제 AI 작업 캡처: ZIP 결과물과 터미널 실행 안내 소개\nGet-Location · pwd → Win+R 또는 explorer.exe . → cd . · cd .. → pwd\nGet-ChildItem · ls → 새 폴더 생성 → 빈 폴더 rmdir · 삭제 확인 → 재생성·이동 → wt -d .\n연습 폴더 pwd → Test-Path False 확인 → New-Item 또는 ni로 파일 생성\n탐색기에서 note.txt를 메모장으로 열어 입력·Ctrl+S\nls → cat 또는 Get-Content로 파일 내용 확인\nZIP 프로젝트의 로컬 실행 사례는 설명만: 실행 안내·폴더·출력 확인\nPowerShell 버전 → Terminal 설정의 탭·분할·단축키",
      "expectedResult": "같은 연습 폴더에 새 메모를 만들고 메모장에 저장합니다. 탐색기 목록과 PowerShell의 cat 또는 Get-Content에서 동일한 파일과 저장 내용을 확인합니다.",
      "durationMinutes": 6
    },
    "returnSummary": "현재 위치와 GUI 전환, . · .., 목록과 빈 연습 폴더 생성·삭제·이동을 확인했습니다. 같은 폴더의 메모를 만들고 저장한 뒤 탐색기와 PowerShell에서 확인했습니다. Terminal과 셸을 구분하고 Git으로 이어 갑니다. 다음 Git에서는 방금 만든 같은 폴더와 메모의 버전을 기록합니다."
  },
  "references": [
    {
      "title": "Microsoft · Windows Terminal 소개",
      "url": "https://learn.microsoft.com/en-us/windows/terminal/"
    },
    {
      "title": "Microsoft · 현재 위치 확인(Get-Location)",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-location"
    },
    {
      "title": "Microsoft · 항목 목록 확인(Get-ChildItem)",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem"
    },
    {
      "title": "Microsoft · 폴더 이동(Set-Location)",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-location"
    },
    {
      "title": "Microsoft · 새 항목과 폴더 만들기(New-Item)",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-item"
    },
    {
      "title": "Microsoft · Terminal 시작 폴더 지정(-d)",
      "url": "https://learn.microsoft.com/en-us/windows/terminal/command-line-arguments"
    },
    {
      "title": "Microsoft · PowerShell의 자동화와 객체",
      "url": "https://learn.microsoft.com/en-us/powershell/scripting/overview"
    },
    {
      "title": "Microsoft · PowerShell 7 선택 설치·WinGet·MSI",
      "url": "https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows"
    },
    {
      "title": "Microsoft · Windows PowerShell와 PowerShell의 실행 이름",
      "url": "https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell"
    },
    {
      "title": "Microsoft · cmd 명령 해석기",
      "url": "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd"
    },
    {
      "title": "Microsoft · Terminal 설정·작업·기본 단축키",
      "url": "https://learn.microsoft.com/en-us/windows/terminal/customize-settings/actions"
    },
    {
      "title": "Microsoft · Terminal 분할 창·포커스 이동",
      "url": "https://learn.microsoft.com/en-us/windows/terminal/panes"
    },
    {
      "title": "OpenAI · Codex 로컬 환경",
      "url": "https://learn.chatgpt.com/docs/environments/local-environment"
    },
    {
      "title": "Microsoft · Windows Terminal 모양 설정",
      "url": "https://learn.microsoft.com/en-us/windows/terminal/customize-settings/appearance"
    },
    {
      "title": "Microsoft · 파일 내용 읽기(Get-Content)",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-content"
    },
    {
      "title": "Microsoft · PowerShell 명령과 별칭 비교",
      "url": "https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/using-aliases"
    },
    {
      "title": "Microsoft · 경로 존재 확인(Test-Path)",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/test-path"
    },
    {
      "title": "Microsoft · PowerShell Tab 자동완성",
      "url": "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_tab_expansion"
    },
    {
      "title": "참고한 공개 핸드북 · Windows 터미널",
      "url": "https://vibe.onebitefe.com/lessons/s02-c02-terminal-windows"
    },
    {
      "title": "Microsoft · Windows Terminal 색 구성표",
      "url": "https://learn.microsoft.com/en-us/windows/terminal/customize-settings/color-schemes"
    }
  ],
  "sections": [
    {
      "id": "terminal-example",
      "body": "### 1. 현재 위치를 확인하고 탐색기에서 열기\n\nWindows PowerShell의 `pwd`는 `Get-Location`의 별칭입니다. 두 명령의 경로가 같은지 보세요. cmd는 `cd`, macOS/Linux 기본 셸은 `pwd`로 위치를 확인합니다.\n\n```powershell\nGet-Location\npwd\n```\n\n경로는 컴퓨터마다 다릅니다. 출력된 실제 경로를 복사하고 **Win+R → 붙여넣기 → Enter** 순서로 탐색기를 엽니다. PowerShell에서는 아래 방법도 가능합니다. `.`은 현재 폴더입니다.\n\n```powershell\nexplorer.exe .\n```\n\ncmd의 `start .`, macOS의 `open .`도 각각 현재 폴더를 GUI로 엽니다.\n\n### 2. 현재 폴더와 부모 폴더 오가기\n\n`cd`는 Windows PowerShell의 `Set-Location` 별칭입니다. `cd .`은 현재 폴더(`Set-Location .`), `cd ..`은 바로 위 폴더(`Set-Location ..`)로 이동합니다. cmd와 macOS/Linux 기본 셸의 `cd`도 이 두 경로를 사용할 수 있습니다.\n\n```powershell\npwd\ncd .\npwd\ncd ..\npwd\n```\n\n`pwd`를 보고 무엇이 달라졌는지 확인합니다. `cd '실제 경로'`의 따옴표 안에 복사해 둔 경로를 넣으면 처음 위치로 돌아갑니다.\n\n### 3. 목록을 읽고 홈 폴더에 연습 폴더 만들기\n\nWindows PowerShell의 `ls`는 `Get-ChildItem`의 별칭입니다.\n\n```powershell\nGet-ChildItem\nls\n```\n\n숨김 항목까지 볼 때는 `Get-ChildItem -Force` 또는 `ls -Force`를 씁니다. 같은 목적의 cmd 명령은 `dir /a`, macOS/Linux 기본 셸 명령은 `ls -a`입니다. 일반 목록은 각각 `dir`, `ls`로 봅니다.\n\n먼저 `C:\\Users`의 목록을 살펴봅니다.\n\n```powershell\nSet-Location 'C:\\Users'\npwd\nls\n```\n\n폴더를 만드는 곳은 **자신의 홈 폴더**입니다. `~`가 홈을 가리킵니다. macOS/Linux 기본 셸에서도 `cd ~`, cmd에서는 `cd /d \"%USERPROFILE%\"`을 씁니다.\n\n```powershell\ncd ~\npwd\nls\nTest-Path .\\git-practice\n```\n\n`Test-Path`가 **False**면 만들 수 있습니다. True면 다른 이름을 정하고 뒤의 예제도 맞춰 바꿉니다. `Test-Path`에는 기본 별칭이 없습니다. macOS/Linux 기본 셸은 `test -e git-practice && echo exists`, cmd는 `if exist git-practice echo exists`로 확인할 수 있습니다. 이 예시는 경로가 있을 때 `exists`를 표시합니다.\n\n```powershell\nmkdir git-practice\n```\n\n폴더 생성은 `mkdir`, `New-Item -ItemType Directory -Path .\\git-practice`, `ni` 중 한 가지 방법만 사용합니다. Windows PowerShell의 `mkdir`은 폴더 생성 함수이고 `ni`는 `New-Item`의 별칭입니다. cmd와 macOS/Linux 기본 셸에도 각자의 `mkdir`이 있습니다.\n\n### 4. 방금 만든 빈 폴더만 삭제하고 다시 만들기\n\n`pwd`로 부모 위치를 보고 **방금 새로 만든 빈 폴더**인지 확인합니다. 내용이 있으면 삭제하지 않습니다. 실행 후 확인 질문이 나오면 **N으로 취소**합니다.\n\n```powershell\npwd\nrmdir .\\git-practice\nTest-Path .\\git-practice\n```\n\nWindows PowerShell에서 `rmdir`과 `rm`은 `Remove-Item`의 별칭입니다. `Remove-Item -LiteralPath .\\git-practice` 또는 `rmdir -LiteralPath .\\git-practice`도 같은 대상에 쓸 수 있으니 삭제 명령은 한 번만 실행합니다. `-Recurse`와 `-Force`는 여기서 사용하지 않습니다. cmd와 macOS/Linux의 `rmdir git-practice`는 각 셸에서 빈 폴더를 삭제합니다.\n\n`Test-Path`가 **False**면 삭제를 확인한 것입니다. 다음 실습을 위해 다시 만들고 그 안으로 들어갑니다. `cd` 대신 `Set-Location .\\git-practice`도 사용할 수 있습니다.\n\n```powershell\nmkdir git-practice\ncd .\\git-practice\npwd\nls\nexplorer.exe .\n```\n\n### 5. Tab으로 자동완성하고 탐색기에서 터미널 열기\n\n아래 명령으로 부모 폴더로 나옵니다. `cd .\\git`까지 입력한 뒤 **Tab**을 눌러 방금 만든 이름인지 확인하고 Enter로 이동합니다. `pwd`로 돌아온 위치를 확인합니다.\n\n```powershell\ncd ..\n# 또는 Set-Location ..\npwd\nls\n```\n\n탐색기에서 **주소 표시줄**에 아래 명령을 넣고 Enter를 누릅니다. `-d`는 시작 폴더입니다. Windows Terminal이 열리면 `pwd`로 탐색기의 폴더와 같은지 봅니다.\n\n```text\nwt -d .\n```\n\n`wt -d .`을 셸에서 실행하면 그 셸의 현재 위치가 기준입니다. Windows Terminal이 설치되어 있으면 cmd에서도 쓸 수 있습니다. 다음 절에서는 이 폴더에 `note.txt`를 만듭니다.",
      "presentationPoints": [
        "Get-Location · pwd → Win+R / explorer.exe . → cd . · cd ..",
        "Get-ChildItem · ls → mkdir → 빈 연습 폴더 rmdir · 재생성",
        "cd로 이동 → 탐색기 주소줄 wt -d . → Terminal 위치 확인"
      ]
    },
    {
      "id": "terminal-gui-cli",
      "body": "### 1. PowerShell에서 빈 메모 만들기\n\n`pwd` 또는 `Get-Location`으로 앞에서 만든 **git-practice** 위치를 확인합니다. `Test-Path`가 **False**일 때 새 파일을 만듭니다. True면 기존 파일 대신 다른 이름을 사용합니다.\n\n```powershell\npwd\nls\nTest-Path .\\note.txt\n```\n\n`Test-Path`에는 기본 별칭이 없습니다. macOS/Linux 기본 셸에서는 `test -e note.txt && echo exists`, cmd에서는 `if exist note.txt echo exists`로 확인합니다. 경로가 있을 때만 `exists`가 보입니다.\n\n```powershell\nNew-Item -ItemType File -Path .\\note.txt\n```\n\nWindows PowerShell에서는 `ni -ItemType File -Path .\\note.txt`로도 만들 수 있습니다. `ni`는 `New-Item`의 별칭입니다. macOS/Linux 기본 셸의 `touch note.txt`는 같은 이름이 있으면 수정 시간을 바꿀 수 있으므로 먼저 확인합니다.\n\n### 2. 메모장에서 입력하고 저장하기\n\n- 탐색기에서 `note.txt`를 메모장으로 엽니다. 탐색기는 `explorer.exe .`으로 열 수 있습니다.\n- 또는 `notepad.exe .\\note.txt`로 같은 파일을 엽니다.\n- `Hello, Codex!`를 적고 **Ctrl+S**로 저장합니다.\n\n### 3. PowerShell에서 같은 내용 읽기\n\n```powershell\nls\ncat .\\note.txt\n# 같은 내용을 읽는 PowerShell 명령:\nGet-Content -LiteralPath .\\note.txt\n```\n\n메모장의 문장과 출력이 같은지 봅니다. 수정한 뒤에는 메모장을 저장하고 `cat .\\note.txt`를 다시 실행합니다. Windows PowerShell의 `ls`는 `Get-ChildItem`, `cat`은 `Get-Content`의 별칭입니다. cmd는 `dir`와 `type note.txt`, macOS/Linux 기본 셸은 `ls`와 `cat note.txt`를 씁니다.\n\n### 터미널이 필요한 순간\n\n- **실행과 반복.** 프로젝트 README에 나온 폴더에서 실행 명령을 쓰고, 터미널에 나온 로컬 주소를 브라우저에서 엽니다.\n- **문제 설명.** 실행 위치와 주소, 오류 메시지를 읽어 Codex에 전달합니다. 공유 전에 개인정보를 가립니다.\n- **도구 연결.** 다음 Git 강의에서 같은 폴더의 메모를 기록합니다.\n\n탐색기와 메모장은 클릭으로, PowerShell은 명령으로 **같은 파일을 확인**할 수 있습니다.",
      "presentationPoints": [
        "존재 확인: PowerShell Test-Path · macOS test · cmd if exist",
        "새 파일: PowerShell New-Item / ni · macOS touch",
        "메모장 저장 → cat / Get-Content · ZIP 실행 안내 사례"
      ]
    },
    {
      "id": "terminal-host-shell",
      "body": "**Windows Terminal**은 창과 탭을 제공하는 호스트입니다. **PowerShell·cmd·Git Bash**는 그 안에서 명령을 해석하는 셸입니다. `pwd`나 `ls` 같은 명령은 셸에서 해석합니다. 메모장은 셸에서 실행할 수 있는 프로그램입니다.\n\n```text\nWindows Terminal — 호스트\n ├─ Windows PowerShell 5.1 — powershell.exe\n ├─ PowerShell 7 — pwsh / pwsh.exe (선택 설치)\n ├─ 명령 프롬프트 — cmd.exe\n └─ Git Bash — 설치한 경우 선택 프로필\n```\n\n### Windows Terminal에서 할 수 있는 일\n\n- **탭과 분할 창.** 서로 다른 셸이나 작업을 한 창에서 봅니다.\n- **글꼴과 색 구성표.** 프로필마다 화면을 읽기 편하게 설정합니다.\n- **단축키.** 탭 이동과 분할, 포커스 키를 선택할 수 있습니다.\n- **시작 폴더.** 탐색기 주소줄의 `wt -d .`으로 열고 `pwd`로 위치를 확인합니다.\n\nWindows 프로젝트 설명에서 PowerShell을 자주 만나는 이유는 Windows PowerShell 5.1이 포함되어 있고 파일 관리와 자동화에 쓸 수 있기 때문입니다. 안내를 따라 할 때는 PowerShell, cmd, Bash 중 어떤 셸을 전제로 하는지 먼저 확인하세요.\n\n### 현재 버전 확인\n\n```powershell\n$PSVersionTable.PSVersion\n```\n\n`Major`가 5이고 `Minor`가 1이면 Windows PowerShell 5.1(`powershell.exe`), `Major`가 7이면 PowerShell 7(`pwsh`)입니다. 이 표현에는 공통 별칭이 없습니다. cmd의 `ver`는 Windows 버전을 보여 줍니다.\n\n### 원할 때 PowerShell 7 설치\n\n기본 폴더 실습은 5.1과 7에서 모두 진행할 수 있습니다. 필요한 경우에만 7을 설치합니다. 설치할 때는 Windows 패키지 관리자인 WinGet 또는 공식 설치 파일을 사용합니다. [Microsoft 설치 안내](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows) · [MSI 설치 파일 안내](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows#install-the-msi-package)\n\n```powershell\nwinget install --id Microsoft.PowerShell --source winget\n```\n\nWindows Terminal을 다시 열어 **Ctrl+, → 시작 → 기본 프로필 → PowerShell 7**을 선택합니다. 새 탭에서 `$PSVersionTable.PSVersion`을 확인합니다. [Microsoft 시작 설정 안내](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/startup)",
      "presentationPoints": [
        "Terminal은 호스트, PowerShell·cmd·설치된 Git Bash는 셸입니다.",
        "테마·탭·분할·단축키와 wt -d .로 같은 작업 위치를 편하게 사용합니다.",
        "PowerShell 5.1·7은 공존하며 7 설치는 선택 사항입니다."
      ]
    },
    {
      "id": "terminal-shortcuts",
      "body": "### 1. 기본 단축키 확인\n\n**Ctrl+, → 작업(Actions)**에서 내 키를 확인합니다. <mark>● 파란색으로 표시된 기본 키</mark>는 강사가 다른 키로 지정해 사용하는 동작입니다.\n\n| 할 일 | 기본 설정 예시 |\n| --- | --- |\n| 설정 열기 | Ctrl+, |\n| 새 탭 열기 | Ctrl+Shift+T |\n| 다음 / 이전 탭 | Ctrl+Tab / Ctrl+Shift+Tab |\n| 특정 번호 탭으로 이동 | <mark>● Ctrl+Alt+1~8, Ctrl+Alt+9는 마지막 탭</mark> |\n| 오른쪽 / 아래로 현재 창 복제해 분할 | <mark>● Alt+Shift++ / Alt+Shift+-</mark> |\n| 인접 분할 창으로 포커스 이동 | <mark>● Alt+방향키</mark> |\n| 현재 분할 창 닫기 | <mark>● Ctrl+Shift+W</mark> |\n\nCtrl+Shift+1~9는 프로필의 **새 탭을 열고**, Ctrl+Alt+1~9는 이미 열린 탭으로 이동합니다. 기호 키는 키보드 배열에 따라 확인하세요.\n\n### 2. 강사의 키와 비교\n\n| 할 일 | 강사의 설정 | 비교할 기본 키 |\n| --- | --- | --- |\n| 오른쪽 / 아래로 현재 창 복제해 분할 | Ctrl+Shift+\\ / Ctrl+Shift+- | Alt+Shift++ / Alt+Shift+- |\n| 인접 분할 창으로 포커스 이동 | Ctrl+Alt+방향키 | Alt+방향키 |\n| 1~9번째로 이미 열린 탭 이동 | Ctrl+1~9 | Ctrl+Alt+1~8, Ctrl+Alt+9는 마지막 탭 |\n| 현재 분할 창 닫기 | Ctrl+W | Ctrl+Shift+W |\n\nCtrl+Shift+\\는 백슬래시 키를 누릅니다. 키보드에서는 원화 기호처럼 보일 수 있습니다. 강사의 Ctrl+Alt+Left는 왼쪽 창 이동으로 지정돼 있습니다. Microsoft 기본 설정에서는 같은 조합으로 직전 창으로 이동하므로 **작업**에서 충돌을 확인합니다.\n\n### 3. 탭과 분할 창 연습\n\n설정을 바꾸려면 **작업 → 원하는 동작 → 편집 → 새 키 입력 → 저장** 순서입니다. 연습은 기본 키로도 할 수 있습니다.\n\n1. 새 탭을 열고 Ctrl+Tab으로 이동합니다. 강사는 Ctrl+1·Ctrl+2도 사용합니다.\n2. 기본 Alt+Shift++ 또는 강사의 Ctrl+Shift+\\로 오른쪽에 분할합니다. 아래 분할도 표와 비교합니다.\n3. 기본 Alt+방향키 또는 강사의 Ctrl+Alt+방향키로 초점을 옮기고, 각 창에서 `pwd` 또는 `Get-Location`으로 위치를 확인합니다.\n4. 기본 Ctrl+Shift+W 또는 강사의 Ctrl+W로 연습 창을 닫습니다. 마지막 창이면 탭이 닫힐 수 있습니다.\n\n[Microsoft 단축키 안내](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/actions) · [분할 창 안내](https://learn.microsoft.com/en-us/windows/terminal/panes)",
      "presentationPoints": [
        "Ctrl+, → 작업에서 내 컴퓨터의 탭·분할 단축키를 확인합니다.",
        "분할: 기본 Alt+Shift++/- ↔ 강사 Ctrl+Shift+\\ / Ctrl+Shift+-",
        "창 이동: 기본 Alt+방향키 ↔ 강사 Ctrl+Alt+방향키 · Ctrl+1~9 탭"
      ]
    },
    {
      "id": "terminal-bonus",
      "body": "PowerShell에서 `|`는 **왼쪽의 결과를 오른쪽의 명령으로 전달**합니다. `Get-ChildItem -File | Select-Object Name`은 파일 목록에서 이름만 뽑습니다. `ls`와 `select`는 각각 `Get-ChildItem`과 `Select-Object`의 별칭입니다. 이름 목록을 보는 macOS 명령은 `ls -1`, cmd 명령은 `dir /b`입니다.\n\n낯선 명령은 **어떤 대상을 다루는지** 먼저 읽습니다. `Get-Content -LiteralPath .\\note.txt`, PowerShell 별칭 `cat .\\note.txt`, macOS의 `cat note.txt`, cmd의 `type note.txt`는 각각 메모를 읽습니다."
    }
  ],
  "steps": [
    {
      "id": "terminal-01"
    },
    {
      "id": "terminal-02",
      "title": "폴더 만들기·빈 폴더 삭제·다시 만들기",
      "description": "C:\\Users에서 사용자 폴더 목록을 확인한 뒤 쓰기 가능한 자신의 사용자 홈으로 이동합니다. Test-Path가 False일 때 새 폴더를 만들고, 방금 만든 빈 폴더만 삭제한 뒤 다시 만들어 이동합니다.",
      "scene": "terminal",
      "code": "Get-ChildItem\nls\nSet-Location 'C:\\Users'\n# 또는 cd 'C:\\Users'\npwd\nls\n# C:\\Users에서 생성하지 않고 쓰기 가능한 사용자 홈으로 이동:\ncd ~\npwd\nls\nTest-Path .\\git-practice\n# False일 때만:\nmkdir git-practice\n# 또는 New-Item -ItemType Directory -Path .\\git-practice\n# 또는 ni -ItemType Directory -Path .\\git-practice\npwd\n# 방금 만든 폴더가 비어 있고 부모 위치가 맞을 때만 삭제:\nrmdir .\\git-practice\n# 또는 Remove-Item -LiteralPath .\\git-practice\nTest-Path .\\git-practice\n# False로 삭제된 것을 확인한 뒤:\nmkdir git-practice\ncd .\\git-practice\npwd\nls\nexplorer.exe .\n# 부모로 이동하고 자동완성으로 되돌아오기:\ncd ..  # 또는 Set-Location ..\npwd\n# cd .\\git 까지 입력 → Tab → 원하는 이름 확인 → Enter\npwd",
      "language": "powershell",
      "output": "예상 예시:\n부모 위치가 맞고 방금 만든 폴더가 비어 있을 때 삭제합니다. Test-Path가 False이면 다시 만들고 이동합니다.\n마지막 pwd가 새 연습 폴더를 표시하고 ls 결과는 비어 있어도 정상입니다.",
      "focus": "files",
      "fileName": "새 연습 폴더 · git-practice",
      "files": [
        "git-practice/"
      ]
    },
    {
      "id": "terminal-03"
    },
    {
      "id": "terminal-04",
      "title": "연습 폴더와 새 메모 파일 이름 확인하기",
      "description": "앞 절에서 만든 git-practice 폴더에서 실제 위치와 파일 이름이 없는지 먼저 확인합니다. ni는 PowerShell 전용 별칭이며 macOS의 touch는 별도 명령입니다. Test-Path에는 기본 별칭이 없고 macOS Bash/zsh의 test -e와 cmd의 if exist는 다른 확인 문법입니다.",
      "scene": "terminal",
      "code": "pwd\nls\nTest-Path .\\note.txt\n# False일 때만 실행:\nNew-Item -ItemType File -Path .\\note.txt\n# 또는 PowerShell에서만: ni -ItemType File -Path .\\note.txt",
      "language": "powershell",
      "output": "예상 예시:\npwd가 git-practice의 실제 경로를 표시합니다.\nFalse: note.txt가 없으므로 새 파일을 만듭니다.\nTrue: 기존 파일을 건드리지 않고 다른 이름을 정합니다.",
      "focus": "files",
      "fileName": "git-practice · note.txt",
      "files": [
        "git-practice/",
        "note.txt"
      ]
    },
    {
      "id": "terminal-05",
      "title": "호스트·셸과 PowerShell 버전 확인하기",
      "description": "Windows 기본 5.1과 선택 설치하는 7을 구분합니다. 버전을 먼저 확인하며 설치 예시는 필요한 경우에만 사용하는 선택 항목입니다.",
      "scene": "terminal",
      "code": "$PSVersionTable.PSVersion\n\n# 실행 이름: 5.1은 powershell.exe / 7은 pwsh\n# 선택 설치 예시:\n# winget install --id Microsoft.PowerShell --source winget",
      "language": "powershell",
      "output": "예상 예시:\nMajor 5, Minor 1 → Windows PowerShell 5.1\nMajor 7 → PowerShell 7 계열\n세부 버전값은 환경마다 다릅니다. 7 설치는 필수가 아닙니다.",
      "focus": "terminal",
      "fileName": "Terminal 프로필 · 버전 확인",
      "files": []
    },
    {
      "id": "terminal-06",
      "title": "탭 열기와 탭 전환 단축키 확인하기",
      "description": "설정의 작업에서 강사가 사용하는 탭 이동 키와 기본 단축키를 비교하고 직접 연습합니다.",
      "scene": "terminal",
      "code": "Ctrl+, → 설정 → 작업에서 새 탭·탭 이동 키 확인\n기본 Ctrl+Shift+T → 새 탭 · Ctrl+Tab → 다음 탭\n기본 Ctrl+Alt+1~8 → 번호 탭 · Ctrl+Alt+9 → 마지막 탭\n강사 Ctrl+1~9 → 1~9번째 탭 이동\n각 탭에서 pwd 또는 Get-Location으로 위치 확인",
      "language": "text",
      "output": "예상 예시:\n새 탭을 열고 열린 탭 사이를 이동합니다. 강사와 수강생의 단축키는 다를 수 있으므로 작업 설정에서 확인합니다.",
      "focus": "terminal",
      "fileName": "Windows Terminal · 설정과 탭",
      "files": []
    },
    {
      "id": "terminal-07"
    },
    {
      "id": "terminal-08",
      "title": "메모장에 저장한 내용을 터미널에서 읽기",
      "description": "탐색기에서 같은 파일을 메모장으로 열고 입력·저장한 뒤 PowerShell에서 확인합니다. Windows PowerShell의 cat은 Get-Content의 별칭입니다.",
      "scene": "terminal",
      "code": "탐색기: 연습 폴더의 note.txt를 메모장으로 열기\n메모장: Hello, Codex! 입력 → Ctrl+S\nPowerShell: ls\nPowerShell: cat .\\note.txt\n또는 PowerShell: Get-Content -LiteralPath .\\note.txt\nmacOS Bash/zsh: cat note.txt\nWindows cmd: type note.txt",
      "language": "text",
      "output": "예상 예시:\n탐색기와 ls에 note.txt가 보입니다.\ncat / Get-Content 출력: Hello, Codex!\n메모장을 다시 바꾸면 저장한 뒤 Get-Content를 다시 실행합니다.",
      "focus": "files",
      "fileName": "메모장 · note.txt",
      "files": [
        "git-practice/",
        "note.txt"
      ]
    },
    {
      "id": "codex-02"
    }
  ]
};
