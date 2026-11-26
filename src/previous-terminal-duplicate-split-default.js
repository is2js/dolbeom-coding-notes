export const previousTerminalDuplicateSplitDefault = {
  "sections": [
    {
      "id": "terminal-example",
      "title": "첫 명령: 현재 위치와 탐색기 사이를 오가며 폴더 만들기",
      "minutes": 12,
      "optional": false,
      "body": "### 실습 전에 Microsoft Store에서 준비하기\n\n먼저 <mark>Microsoft Store에서 PowerShell과 Windows Terminal을 설치하거나 이미 설치되어 있는지 확인</mark>합니다.\n\n1. **시작 메뉴 → Microsoft Store**를 열고 `PowerShell`을 검색합니다. 게시자가 Microsoft인 **PowerShell** 앱을 설치합니다. `PowerShell Preview`는 미리보기 버전입니다.\n2. 같은 방법으로 **Windows Terminal**을 검색해 엽니다. **설치**가 보이면 설치하고, **열기**만 보이면 바로 실행합니다. 한국어 화면에서는 **Windows 터미널** 또는 **터미널**로 표시될 수 있습니다.\n3. Windows Terminal 탭 옆 `⌄`에서 새로 설치한 **PowerShell** 프로필을 선택합니다. 기존 **Windows PowerShell**은 5.1 프로필입니다. 이 실습 명령을 준비하는 동안 새 버전을 설치할 수 없다면 5.1에서도 기본 폴더 명령을 연습할 수 있습니다.\n\n[Microsoft Store의 PowerShell](https://apps.microsoft.com/detail/9mz1snwt0n5d) · [Microsoft Store의 Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701)\n\n### 1. 현재 위치를 확인하고 탐색기에서 열기\n\nWindows PowerShell의 `pwd`는 `Get-Location`의 별칭입니다. 두 명령의 경로가 같은지 보세요. cmd는 `cd`, macOS/Linux 기본 셸은 `pwd`로 위치를 확인합니다.\n\n```powershell\nGet-Location\npwd\n```\n\n경로는 컴퓨터마다 다릅니다. <mark>출력에서 실제 폴더 경로만 복사 → `Win+R` → 붙여넣기 → `Enter`</mark>로 탐색기를 엽니다. 탐색기와 터미널이 **같은 경로**를 가리키는지 확인합니다.\n\n같은 폴더를 여는 두 번째 방법은 PowerShell에서 <mark>`explorer.exe .`</mark>을 실행하는 것입니다. <mark>`.`은 현재 폴더</mark>를 뜻합니다.\n\n```powershell\nexplorer.exe .\n```\n\ncmd의 `start .`, macOS의 `open .`도 각각 현재 폴더를 GUI로 엽니다.\n\n### 2. 현재 폴더와 부모 폴더 오가기\n\n`cd`는 Windows PowerShell의 `Set-Location` 별칭입니다. `cd .`은 현재 폴더(`Set-Location .`), `cd ..`은 바로 위 폴더(`Set-Location ..`)로 이동합니다. cmd와 macOS/Linux 기본 셸의 `cd`도 이 두 경로를 사용할 수 있습니다.\n\n```powershell\npwd\ncd .\npwd\ncd ..\npwd\n```\n\n`pwd`를 보고 무엇이 달라졌는지 확인합니다. `cd '실제 경로'`의 따옴표 안에 복사해 둔 경로를 넣으면 처음 위치로 돌아갑니다.\n\n### 3. 목록을 읽고 홈 폴더에 연습 폴더 만들기\n\nPowerShell로 돌아와 <mark>`Get-ChildItem`과 기본 별칭 `ls`의 목록이 같은지</mark> 봅니다.\n\n```powershell\nGet-ChildItem\nls\nls -Force\n```\n\n<mark>숨김 항목도 보려면 `ls -Force`</mark> 또는 `Get-ChildItem -Force`를 씁니다. 같은 목적의 cmd 명령은 `dir /a`, macOS/Linux 기본 셸 명령은 `ls -a`입니다. 일반 목록은 각각 `dir`, `ls`로 봅니다.\n\n먼저 `C:\\Users`의 목록을 살펴봅니다.\n\n```powershell\nSet-Location 'C:\\Users'\npwd\nls\n```\n\n폴더를 만드는 곳은 **자신의 홈 폴더**입니다. `~`가 홈을 가리킵니다. macOS/Linux 기본 셸에서도 `cd ~`, cmd에서는 `cd /d \"%USERPROFILE%\"`을 씁니다.\n\n```powershell\ncd ~\npwd\nls\nTest-Path .\\git-practice\n```\n\n`Test-Path`가 **False**면 만들 수 있습니다. True면 다른 이름을 정하고 뒤의 예제도 맞춰 바꿉니다. `Test-Path`에는 기본 별칭이 없습니다. macOS/Linux 기본 셸은 `test -e git-practice && echo exists`, cmd는 `if exist git-practice echo exists`로 확인할 수 있습니다. 이 예시는 경로가 있을 때 `exists`를 표시합니다.\n\n```powershell\nmkdir git-practice\n```\n\n폴더 생성은 `mkdir`, `New-Item -ItemType Directory -Path .\\git-practice`, `ni` 중 한 가지 방법만 사용합니다. Windows PowerShell의 `mkdir`은 폴더 생성 함수이고 `ni`는 `New-Item`의 별칭입니다. cmd와 macOS/Linux 기본 셸에도 각자의 `mkdir`이 있습니다.\n\n### 4. 방금 만든 빈 폴더만 삭제하고 다시 만들기\n\n`pwd`로 부모 위치를 보고 **방금 새로 만든 빈 폴더**인지 확인합니다. 내용이 있으면 삭제하지 않습니다. 실행 후 확인 질문이 나오면 **N으로 취소**합니다.\n\n```powershell\npwd\nrmdir .\\git-practice\nTest-Path .\\git-practice\n```\n\nWindows의 PowerShell 7에서 <mark>`rmdir`은 `Remove-Item`의 기본 별칭</mark>입니다. <mark>`rm`도 `Remove-Item`의 별칭이며 파일도 삭제</mark>할 수 있습니다. `Remove-Item -LiteralPath .\\git-practice` 또는 `rmdir -LiteralPath .\\git-practice`도 같은 대상에 쓸 수 있으니 삭제 명령은 한 번만 실행합니다. `-Recurse`와 `-Force`는 여기서 사용하지 않습니다. cmd와 macOS/Linux의 `rmdir git-practice`는 각 셸에서 빈 폴더를 삭제합니다.\n\n`Test-Path`가 **False**면 삭제를 확인한 것입니다. 다음 실습을 위해 다시 만들고 그 안으로 들어갑니다. `cd` 대신 `Set-Location .\\git-practice`도 사용할 수 있습니다.\n\n```powershell\nmkdir git-practice\ncd .\\git-practice\npwd\nls\nexplorer.exe .\n```\n\n### 5. Tab으로 자동완성하고 탐색기에서 터미널 열기\n\n아래 명령으로 부모 폴더로 나옵니다. <mark>`cd .\\git`까지 입력하고 `Tab`</mark>을 누릅니다. 후보가 여럿이면 `Tab`을 다시 누르고, 방금 만든 폴더가 맞으면 `Enter`로 이동합니다. `pwd`로 경로를 확인합니다.\n\n```powershell\ncd ..\n# 또는 Set-Location ..\npwd\nls\n```\n\n연습 폴더를 연 탐색기에서 **주소 표시줄**에 <mark>`wt -d .`을 넣고 `Enter`</mark>를 누릅니다. <mark>`-d`는 시작 폴더, `.`은 현재 탐색기 위치</mark>를 뜻합니다. Windows Terminal이 열리면 `pwd`로 같은 폴더인지 확인합니다.\n\n```text\nwt -d .\n```\n\n`wt -d .`을 셸에서 실행하면 그 셸의 현재 위치가 기준입니다. Windows Terminal이 설치되어 있으면 cmd에서도 쓸 수 있습니다. 다음 절에서는 이 폴더에 `note.txt`를 만듭니다.",
      "presentationPoints": [
        "<mark>Microsoft Store → PowerShell·Windows Terminal → PowerShell 프로필</mark>",
        "<mark>`pwd` → `Win+R` 또는 `explorer.exe .`</mark> · `ls -Force`로 숨김 항목 확인",
        "<mark>빈 폴더만 `rmdir`</mark> · `Tab` 자동 완성 → 탐색기 주소줄 `wt -d .`"
      ]
    },
    {
      "id": "terminal-gui-cli",
      "title": "GUI와 CLI 연결: 같은 메모 파일을 만들고 확인하기",
      "minutes": 6,
      "optional": false,
      "body": "### 1. 같은 폴더에서 메모 파일 만들기\n\n`pwd` 또는 `Get-Location`으로 앞에서 만든 **git-practice** 폴더에 있는지 확인합니다. `Test-Path`가 **False**일 때 새 파일을 만듭니다. True면 기존 파일을 보존합니다.\n\n```powershell\npwd\nls\nTest-Path .\\note.txt\n```\n\n`Test-Path`에는 PowerShell 기본 별칭이 없습니다. macOS/Linux 기본 셸에서는 `test -e note.txt && echo exists`, cmd에서는 `if exist note.txt echo exists`로 확인합니다. 경로가 있을 때만 `exists`가 보입니다.\n\n<mark>`New-Item`에서 `File`을 선택</mark>합니다. Windows PowerShell의 기본 별칭 `ni`로도 실행할 수 있습니다. <mark>두 방법 중 하나만 사용하고 같은 이름의 파일이 있으면 멈춥니다.</mark>\n\n```powershell\nNew-Item -ItemType File -Path .\\note.txt\n# 위 명령 대신 사용할 Windows PowerShell 기본 별칭:\nni -ItemType File -Path .\\note.txt\n```\n\nmacOS의 Bash·zsh에서는 파일이 없는 것을 확인한 뒤 `touch note.txt`로 만듭니다. 이미 있는 파일에 실행하면 수정 시간이 바뀔 수 있습니다.\n\n### 2. 탐색기와 메모장으로 만들고 저장하기\n\n<mark>강사는 `explorer.exe .`으로 파일 탐색기를 열어 GUI에서 원하는 확장자의 파일을 만드는 편입니다.</mark> 탐색기에서 **새로 만들기** 메뉴를 사용하거나 메모장으로 새 파일을 만들 수도 있습니다. 위에서 이미 만들었다면 같은 파일을 엽니다.\n\n```powershell\nexplorer.exe .\n```\n\n<mark>`notepad.exe note.txt`로도 같은 이름의 파일을 열거나 만들 수 있습니다.</mark> 파일이 없으면 새 파일을 만들지 묻습니다. `Hello, Codex!`를 적고 **Ctrl+S**로 저장합니다.\n\n```powershell\nnotepad.exe note.txt\n```\n\n### 터미널로 돌아와 읽기\n\n<mark>PowerShell에서 `ls` 또는 `Get-ChildItem`으로 파일을 찾고, `Get-Content`의 짧은 기본 별칭 `cat`으로 내용을 읽습니다.</mark> 메모장에 저장한 문장과 같은지 확인합니다.\n\n```powershell\nls\ncat .\\note.txt\n```\n\n<mark>macOS의 Bash·zsh에서도 `cat note.txt`</mark>로 파일을 읽습니다. cmd에서는 목록을 `dir`, 내용을 `type note.txt`로 확인합니다.\n\n### GUI가 편한데도 터미널을 익히는 이유\n\n- <mark>GUI는 눈으로 보며 선택하기 좋고, 터미널은 현재 위치와 작업 과정을 글자로 확인하고 전달하기 좋습니다.</mark> 상황에 맞게 두 방법을 오갑니다.\n- <mark>ZIP으로 받은 프로젝트</mark>의 압축을 푼 뒤 안내를 읽으면 터미널에서 로컬 서버를 켜라는 설명을 만날 수 있습니다.\n- <mark>실행한 폴더, 화면에 나온 주소, 오류 메시지</mark>를 개인정보를 가린 뒤 Codex에 함께 전달하면 문제 상황을 구체적으로 알릴 수 있습니다.\n- 다음 강의에서는 <mark>터미널의 Git 명령으로 파일 변경 기록</mark>을 확인합니다. 명령과 결과를 읽을 수 있으면 GUI 도구와 AI 안내도 이해하기 쉬워집니다.",
      "presentationPoints": [
        "<mark>파일이 없을 때 `New-Item` 또는 `ni`</mark> · 탐색기·메모장으로도 생성",
        "<mark>메모장 저장 → `ls`로 찾고 `cat`으로 읽기</mark> · 두 화면의 내용 확인",
        "<mark>ZIP 실행 안내</mark> → 폴더·주소·오류를 Codex에 전달 → 다음 Git"
      ]
    },
    {
      "id": "terminal-host-shell",
      "title": "터미널 호스트와 셸: PowerShell·cmd·버전 이해하기",
      "minutes": 6,
      "optional": false,
      "body": "<mark>Windows Terminal은 창·탭·분할 창·글꼴을 제공하는 **터미널 호스트**입니다. PowerShell과 cmd는 그 안에서 명령을 해석하는 **셸**입니다. Git Bash를 설치했다면 프로필로 열 수 있습니다.</mark>\n\n```text\nWindows Terminal — 호스트\n ├─ Windows PowerShell 5.1 — powershell.exe\n ├─ PowerShell 7 — pwsh / pwsh.exe (선택 설치)\n ├─ 명령 프롬프트 — cmd.exe\n └─ Git Bash — 설치한 경우 선택 프로필\n```\n\n### Windows Terminal을 쓰면 편한 점\n\n- <mark>**탭과 분할 창**으로 여러 셸과 작업을 한 창에 띄웁니다. 셸 이름은 프로필에서 확인합니다.</mark>\n- <mark>**테마와 색 구성표**로 앱의 모양과 프로필별 글꼴·글자색·배경색을 조절합니다.</mark> 색을 바꿔도 기존 명령은 그대로 쓸 수 있습니다. [프로필 모양 설정](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/profile-appearance)\n- <mark>**작업(Actions)**에서 새 탭, 탭 전환, 분할, 창 이동 단축키를 정합니다.</mark>\n- 탐색기 주소 표시줄의 `wt -d .`으로 열고 `pwd`로 시작 폴더를 확인합니다.\n\n<mark>Windows 안내에서 PowerShell을 자주 쓰는 이유는 **5.1이 기본 제공**되고, 파일·프로세스 속성을 읽어 필요한 항목을 골라 자동화하기 쉽기 때문입니다.</mark> 설명을 따라 하기 전에 PowerShell·cmd·Bash 중 어떤 셸인지 확인하세요.\n\n### PowerShell 버전 확인\n\n<mark>현재 셸의 버전은 `$PSVersionTable.PSVersion`으로 확인합니다.</mark>\n\n```powershell\n$PSVersionTable.PSVersion\n```\n\n`Major` 5와 `Minor` 1은 5.1이고, `Major` 7은 PowerShell 7입니다. 이 표현에는 기본 별칭이 없습니다. cmd의 `ver`는 Windows 버전을 보여 줍니다.\n\n### PowerShell 7을 쓰면 좋은 점\n\n<mark>**PowerShell 7은 선택 사항입니다.** 기본 폴더 실습은 5.1과 7에서 모두 할 수 있고, 두 버전을 함께 설치해 쓸 수 있습니다.</mark>\n\n- <mark>**출력 색과 강조를 조절**할 수 있습니다. PowerShell 7.2부터 `$PSStyle`로 파일 목록이나 오류 등의 출력 스타일을 바꿀 수 있습니다.</mark> 화면 전체의 글꼴·배경·색 구성표는 Windows Terminal에서 바꿉니다. [PowerShell 출력 스타일](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_ansi_terminals)\n- <mark>**오류의 첫 메시지가 짧아** 어떤 문제가 났는지 파악하기 쉽습니다.</mark> [PowerShell 오류 표시](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables#errorview)\n- <mark>**Windows·macOS·Linux에서 사용**할 수 있어 다른 운영체제에서도 PowerShell을 익히기 좋습니다.</mark> 개발 도구의 설치 안내가 버전 7을 권장하면 해당 도구의 요구 버전을 확인합니다. [PowerShell 7의 차이와 지원 환경](https://learn.microsoft.com/en-us/powershell/scripting/install/migrating-from-windows-powershell-51-to-powershell-7)",
      "presentationPoints": [
        "<mark>**Terminal**은 탭·분할·테마·단축키를 제공하고, **PowerShell·cmd**는 명령을 해석합니다.</mark>",
        "<mark>`$PSVersionTable.PSVersion`으로 버전을 확인합니다. 7 설치는 선택 사항입니다.</mark>",
        "<mark>**PowerShell 7**의 출력 강조·간결한 오류 표시·여러 OS 지원을 소개합니다.</mark>"
      ]
    },
    {
      "id": "terminal-shortcuts",
      "title": "Terminal 설정: 탭·분할 단축키 연습",
      "minutes": 6,
      "optional": false,
      "body": "### 1. 기본 단축키 확인\n\n**`Ctrl+,` → 작업(Actions)**에서 내 키를 확인합니다. <mark>● 파란색으로 표시된 기본 키</mark>는 강사가 다른 키로 지정해 사용하는 동작입니다.\n\n| 할 일 | 기본 설정 예시 |\n| --- | --- |\n| 설정 열기 | `Ctrl+,` |\n| 새 탭 열기 | `Ctrl+Shift+T` |\n| 다음 / 이전 탭 | `Ctrl+Tab` / `Ctrl+Shift+Tab` |\n| 특정 번호 탭으로 이동 | `Ctrl+Alt+1~8`, `Ctrl+Alt+9`는 마지막 탭 |\n| 오른쪽 / 아래로 현재 창 복제해 분할 | <mark>● Alt+Shift++ / Alt+Shift+-</mark> |\n| 인접 분할 창으로 포커스 이동 | <mark>● Alt+방향키</mark> |\n| 현재 분할 창 닫기 | <mark>● Ctrl+Shift+W</mark> |\n\n`Ctrl+Shift+1~9`로는 프로필의 **새 탭을 열고**, `Ctrl+Alt+1~9`로는 **이미 열린 탭으로 이동**합니다.\n\n### 2. 강사의 키와 비교\n\n| 할 일 | 강사 설정 | 비교할 기본 키 |\n| --- | --- | --- |\n| 오른쪽 / 아래 분할 | `Ctrl+Shift+\\` / `Ctrl+Shift+-` | `Alt+Shift++` / `Alt+Shift+-` |\n| 인접 분할 창으로 포커스 이동 | `Ctrl+Alt+방향키` | `Alt+방향키` |\n| 현재 분할 창 닫기 | `Ctrl+W` | `Ctrl+Shift+W` |\n\n`Ctrl+Shift+\\`는 백슬래시 키를 누릅니다. 키보드에는 원화 기호처럼 보일 수 있습니다. `Ctrl+Alt+←`는 강사 설정에서 왼쪽 창으로, 기본 설정에서 직전에 이용한 창으로 이동합니다. 키를 바꾸기 전 **작업**에서 겹치는 동작을 확인합니다.\n\n### 3. 내 키로 바꾸고 연습하기\n\n**작업 → 원하는 동작 → 편집 → 새 키 입력 → 저장** 순서입니다. 기본 키로도 연습할 수 있습니다.\n\n1. <mark>**탭 열기와 전환.** `Ctrl+Shift+T`로 탭을 열고 `Ctrl+Tab`으로 오갑니다.</mark>\n2. <mark>**오른쪽·아래로 분할.** 기본 `Alt+Shift++` / `Alt+Shift+-` 또는 강사 `Ctrl+Shift+\\` / `Ctrl+Shift+-`를 사용합니다.</mark>\n3. <mark>**분할 창 이동.** 기본 `Alt+방향키` 또는 강사 `Ctrl+Alt+방향키`로 옮긴 뒤 각 창에서 `pwd` 또는 `Get-Location`을 확인합니다.</mark>\n4. <mark>**연습 창 닫기.** 기본 `Ctrl+Shift+W` 또는 강사 `Ctrl+W`를 누릅니다.</mark> 분할 창이 하나면 탭이 닫힐 수 있으니 실행 중인 작업을 확인합니다.\n\n[Microsoft 단축키 안내](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/actions) · [분할 창 안내](https://learn.microsoft.com/en-us/windows/terminal/panes)",
      "presentationPoints": [
        "<mark>**탭**은 `Ctrl+Shift+T`로 열고 `Ctrl+Tab`으로 전환합니다.</mark>",
        "<mark>**분할**은 강사 `Ctrl+Shift+\\` / `Ctrl+Shift+-`로 연습합니다.</mark>",
        "<mark>**창 이동·닫기**는 강사 `Ctrl+Alt+방향키`와 `Ctrl+W`입니다.</mark>"
      ]
    },
    {
      "id": "terminal-bonus",
      "title": "보충 노트: 파이프와 명령을 읽는 방법",
      "minutes": 5,
      "optional": true,
      "body": "PowerShell에서 `|`는 **왼쪽의 결과를 오른쪽의 명령으로 전달**합니다. `Get-ChildItem -File | Select-Object Name`은 파일 목록에서 이름만 뽑습니다. `ls`와 `select`는 각각 `Get-ChildItem`과 `Select-Object`의 별칭입니다. 이름 목록을 보는 macOS 명령은 `ls -1`, cmd 명령은 `dir /b`입니다.\n\n낯선 명령은 **어떤 대상을 다루는지** 먼저 읽습니다. PowerShell의 `cat .\\note.txt`, macOS의 `cat note.txt`, cmd의 `type note.txt`는 각각 해당 메모의 내용을 읽습니다."
    }
  ],
  "steps": [
    {
      "id": "terminal-01",
      "title": "현재 위치·탐색기와 . · .. 이해하기",
      "description": "현재 경로를 복사하고 탐색기로 연 뒤, cd .과 cd ..을 각각 실행하고 pwd로 비교합니다. 복사한 실제 경로로 돌아옵니다. PowerShell에서 cd는 Set-Location의 기본 별칭입니다.",
      "scene": "terminal",
      "code": "PowerShell: Get-Location\nPowerShell: pwd → 표시된 실제 경로 복사\nGUI: Win+R → 복사한 경로 붙여 넣기 → Enter\n또는 PowerShell: explorer.exe .\nPowerShell: cd . → pwd\nPowerShell: cd .. → pwd\n복사한 실제 경로를 따옴표로 감싸 cd로 돌아온 뒤 pwd 확인",
      "language": "text",
      "output": "예상 예시:\n탐색기에 현재 폴더가 열립니다. cd . 이후 위치는 그대로이고 cd .. 이후에는 부모 폴더로 이동합니다. 최상위 폴더라면 그대로일 수 있습니다.\n복사한 실제 경로로 돌아온 뒤 pwd로 확인합니다.",
      "focus": "terminal",
      "fileName": "PowerShell · 선택한 연습용 부모 폴더",
      "files": []
    },
    {
      "id": "terminal-02",
      "title": "폴더 만들기·빈 폴더 삭제·다시 만들기",
      "description": "C:\\Users에서 사용자 폴더 목록을 확인한 뒤 쓰기 가능한 자신의 사용자 홈으로 이동합니다. Test-Path가 False일 때 새 폴더를 만들고, 방금 만든 빈 폴더만 삭제한 뒤 다시 만들어 이동합니다.",
      "scene": "terminal",
      "code": "Get-ChildItem\nls\nls -Force\nSet-Location 'C:\\Users'\n# 또는 cd 'C:\\Users'\npwd\nls\n# C:\\Users에서 생성하지 않고 쓰기 가능한 사용자 홈으로 이동:\ncd ~\npwd\nls\nTest-Path .\\git-practice\n# False일 때만:\nmkdir git-practice\n# 또는 New-Item -ItemType Directory -Path .\\git-practice\n# 또는 ni -ItemType Directory -Path .\\git-practice\npwd\n# 방금 만든 폴더가 비어 있고 부모 위치가 맞을 때만 삭제:\nrmdir .\\git-practice\n# 또는 Remove-Item -LiteralPath .\\git-practice\nTest-Path .\\git-practice\n# False로 삭제된 것을 확인한 뒤:\nmkdir git-practice\ncd .\\git-practice\npwd\nls\nexplorer.exe .\n# 부모로 이동하고 자동완성으로 되돌아오기:\ncd ..  # 또는 Set-Location ..\npwd\n# cd .\\git 까지 입력 → Tab → 원하는 이름 확인 → Enter\npwd",
      "language": "powershell",
      "output": "예상 예시:\n부모 위치가 맞고 방금 만든 폴더가 비어 있을 때 삭제합니다. Test-Path가 False이면 다시 만들고 이동합니다.\n마지막 pwd가 새 연습 폴더를 표시하고 ls 결과는 비어 있어도 정상입니다.",
      "focus": "files",
      "fileName": "새 연습 폴더 · git-practice",
      "files": [
        "git-practice/"
      ]
    },
    {
      "id": "terminal-03",
      "title": "탐색기의 현재 폴더에서 Terminal 열기",
      "description": "explorer.exe .으로 열린 연습 폴더의 주소 표시줄에 wt -d .을 입력합니다. Terminal 실행 명령이 등록된 환경을 기준으로 합니다.",
      "scene": "terminal",
      "code": "탐색기 주소 표시줄: wt -d .\n열린 Terminal 창 또는 탭에서 PowerShell 프로필 확인\nPowerShell: pwd",
      "language": "text",
      "output": "예상 예시:\nWindows Terminal의 새 창 또는 탭이 열리고 pwd가 탐색기의 연습 폴더와 같은 시작 경로를 표시합니다.\n다른 기본 셸이 열리면 해당 셸의 위치 확인 명령 또는 PowerShell 프로필을 사용합니다.",
      "focus": "files",
      "fileName": "탐색기 · 연습 폴더",
      "files": [
        "git-practice/"
      ]
    },
    {
      "id": "terminal-04",
      "title": "연습 폴더와 새 메모 파일 이름 확인하기",
      "description": "앞 절에서 만든 git-practice 폴더에서 실제 위치와 파일 이름이 없는지 먼저 확인합니다. ni는 PowerShell 전용 별칭이며 macOS의 touch는 별도 명령입니다. Test-Path에는 기본 별칭이 없고 macOS Bash/zsh의 test -e와 cmd의 if exist는 다른 확인 문법입니다. 강사는 탐색기에서 파일을 만들거나 메모장에 저장하는 방법도 보여 줍니다.",
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
      "description": "Windows 기본 5.1과 선택 설치하는 7을 구분합니다. 버전 확인과 함께 PowerShell 출력 스타일과 Windows Terminal 화면 설정의 차이를 소개합니다.",
      "scene": "terminal",
      "code": "$PSVersionTable.PSVersion\n\n# 실행 이름: 5.1은 powershell.exe / 7은 pwsh",
      "language": "powershell",
      "output": "예상 예시:\nMajor 5, Minor 1 → Windows PowerShell 5.1\nMajor 7 → PowerShell 7 계열\n세부 버전값은 환경마다 다릅니다. 7 설치는 필수가 아닙니다.",
      "focus": "terminal",
      "fileName": "Terminal 프로필 · 버전 확인",
      "files": []
    },
    {
      "id": "terminal-06",
      "title": "탭 열기와 탭 전환 단축키 확인하기",
      "description": "설정의 작업에서 새 탭과 탭 전환의 기본 단축키를 확인하고 연습합니다.",
      "scene": "terminal",
      "code": "Ctrl+, → 설정 → 작업에서 새 탭·탭 이동 키 확인\n기본 Ctrl+Shift+T → 새 탭 · Ctrl+Tab → 다음 탭\n기본 Ctrl+Alt+1~8 → 번호 탭 · Ctrl+Alt+9 → 마지막 탭\n각 탭에서 pwd 또는 Get-Location으로 위치 확인",
      "language": "text",
      "output": "예상 예시:\n새 탭을 열고 열린 탭 사이를 이동합니다. 내 컴퓨터의 키는 작업 설정에서 확인합니다.",
      "focus": "terminal",
      "fileName": "Windows Terminal · 설정과 탭",
      "files": []
    },
    {
      "id": "terminal-07",
      "title": "분할 창·포커스 이동 뒤 체크리스트 정리하기",
      "description": "강사의 사용자 지정 분할·포커스 키를 공식 기본 키와 비교하고 작업 설정에서 확인한 뒤 연습합니다.",
      "scene": "terminal",
      "code": "작업에서 오른쪽·아래 분할 및 포커스 이동 키 확인\n기본 Alt+Shift++ / Alt+Shift+- → 오른쪽 / 아래 분할\n강사 Ctrl+Shift+\\ / Ctrl+Shift+- → 오른쪽 / 아래 분할\n기본 Alt+방향키 / 강사 Ctrl+Alt+방향키 → 포커스 이동\n기본 Ctrl+Shift+W / 강사 Ctrl+W → 현재 연습용 창 닫기\n각 분할 창의 pwd 또는 Get-Location 확인",
      "language": "text",
      "output": "예상 예시:\n같은 탭에 두 개의 분할 창이 보이고 선택한 창의 테두리가 바뀝니다.\n사용자 키를 추가해도 다른 기본 키가 모두 삭제되는 것은 아닙니다. Ctrl+Alt+Left는 기본 직전 창 이동과 강사의 왼쪽 이동이 충돌하므로 실제 설정을 확인합니다.",
      "focus": "terminal",
      "fileName": "Windows Terminal · 분할 창",
      "files": []
    },
    {
      "id": "terminal-08",
      "title": "메모장에 저장한 내용을 터미널에서 읽기",
      "description": "탐색기에서 같은 파일을 메모장으로 열고 입력·저장한 뒤 PowerShell에서 확인합니다. Windows PowerShell의 cat은 Get-Content의 별칭입니다.",
      "scene": "terminal",
      "code": "탐색기: 연습 폴더의 note.txt를 메모장으로 열기\nPowerShell: notepad.exe note.txt\n메모장: Hello, Codex! 입력 → Ctrl+S\nPowerShell: ls\nPowerShell: cat .\\note.txt\nmacOS Bash/zsh: cat note.txt\nWindows cmd: type note.txt",
      "language": "text",
      "output": "예상 예시:\n탐색기와 ls에 note.txt가 보입니다.\ncat 출력: Hello, Codex!\n메모장을 다시 바꾸면 저장한 뒤 cat으로 다시 확인합니다.",
      "focus": "files",
      "fileName": "메모장 · note.txt",
      "files": [
        "git-practice/",
        "note.txt"
      ]
    },
    {
      "id": "codex-02",
      "title": "메모를 확인한 상황을 Codex에 전달하기",
      "description": "강의용 프롬프트 예시입니다. 실제로 확인한 폴더와 내용에 맞춰 대괄호를 바꿉니다.",
      "scene": "code",
      "code": "현재 경로: [확인한 연습 폴더 경로]\n파일: note.txt\n확인: 메모장에 저장하고 cat(Windows PowerShell의 Get-Content 기본 별칭)으로 내용을 읽었습니다.\n질문: GUI와 CLI가 같은 파일을 다룬다는 뜻을 설명해 줘.",
      "language": "text",
      "output": "예상 예시:\nCodex가 전달받은 상황을 바탕으로 GUI와 CLI를 설명합니다.\n미리 작성한 안내이며 자동 실행이 아닙니다.",
      "focus": "codex",
      "fileName": "상태 전달 프롬프트 · 교체용 예시",
      "files": [
        "note.txt"
      ]
    }
  ]
};
