// Published IDE fields before the installation walkthrough and screenshots were updated.
export const previousIdeSetupScreenshotsDefault = {
  "id": "ide",
  "case": {
    "body": "![VS Code에서 Git 연습 프로젝트의 README.md를 열어 제목, 준비물과 파일 안내를 살펴보는 강사 화면](./assets/course/ide-vscode-readme-case.png)\n\n1. 원본 폴더의 `README.md`에서 제목이나 소개 한 줄을 수정합니다.\n2. `Ctrl+S`로 저장하고 왼쪽 **소스 제어(Source Control)**를 엽니다.\n3. 변경 목록에서 `README.md`를 눌러 **Diff(변경 전후)**에 표시된 줄을 확인합니다.\n\n이미지는 README를 편집기에서 연 장면입니다. 소스 제어와 Diff 화면은 이어지는 실제 시연에서 보여 줍니다. 파일 저장 뒤 커밋으로 기록하고 push로 공유합니다. [VS Code 소스 제어 안내](https://code.visualstudio.com/docs/sourcecontrol/overview)"
  },
  "presentation": {
    "caseSummary": "실제 VS Code 화면에서 README와 프로젝트 파일을 먼저 살펴봅니다. 이어 제목을 수정하고 저장한 뒤 소스 제어의 README 변경 목록과 Diff를 확인합니다. 저장·커밋·push는 각각 다른 단계입니다.",
    "demo": {
      "command": "README 변경 사례 시연: 수정·저장 → 소스 제어 → Diff 확인\nVS Code 설치·기본 설정 → 원래 git-practice 폴더 열기\nREADME 검색·미리보기 → 강사의 PyCharm VSCode Keymap 화면 확인\n공통 단축키로 찾기·줄 이동·주석·저장 연습\n통합 터미널·Git에서 문서 변경 확인"
    }
  },
  "sections": [
    {
      "id": "tools-vscode-setup",
      "body": "**실습 목표**는 VS Code로 원본 `git-practice` 폴더를 열고 README를 확인하는 것입니다. 설치되어 있다면 버전 확인부터 시작합니다.\n\n### VS Code와 PyCharm\n\n**VS Code**는 터미널·Git·디버깅과 확장을 갖춘 무료 코드 편집기입니다. **PyCharm**은 Python 개발에 초점을 둔 통합 개발 환경(IDE)입니다. 수업에서는 VS Code를 사용합니다. [VS Code 공식 설명](https://code.visualstudio.com/docs/supporting/faq) · [PyCharm 공식 안내](https://www.jetbrains.com/pycharm/)\n\n강사는 **VSCode Keymap**을 적용한 PyCharm 화면을 잠깐 보여 줍니다. 이 플러그인은 VS Code 기본 조작과 비슷한 키를 제공하며, 개인 단축키는 별도로 설정합니다. [JetBrains 키맵 안내](https://www.jetbrains.com/help/pycharm/migrating-from-vsc-to-pycharm.html)\n\n### 1. Windows에 설치하기\n\n[VS Code 공식 다운로드](https://code.visualstudio.com/Download)에서 Windows PC에 맞는 파일을 받습니다. 개인 PC는 보통 **User Setup**으로 설치합니다. Visual Studio Code의 설치 파일 이름을 확인하세요.\n\n| 설치 방식 | 누구에게 설치하나요? | 권한과 위치 |\n| --- | --- | --- |\n| User Setup | 현재 Windows 사용자 | 일반적으로 관리자 권한 없이 사용자 폴더에 설치 |\n| System Setup | 이 PC의 모든 사용자 | 관리자 권한이 필요하며 Program Files에 설치 |\n\n**Add to PATH**를 켜면 터미널에서 `code` 명령을 쓸 수 있습니다. **Open with Code**를 선택하면 폴더 우클릭에서도 열 수 있습니다. [Windows 설치 공식 안내](https://code.visualstudio.com/docs/setup/windows)\n\n### 2. 원본 폴더 열기\n\n설치 후 새 PowerShell을 열어 버전을 확인합니다.\n\n```powershell\ncode --version\n```\n\nVS Code에서 **파일 → 폴더 열기 → `git-practice`**를 선택합니다. 왼쪽에 `README.md`, `note.txt`, `branch-note.txt`가 보이면 맞는 폴더입니다. 해당 폴더의 터미널에서도 열 수 있습니다.\n\n```powershell\npwd\ncode .\n```\n\n`pwd`는 Windows PowerShell에서 `Get-Location`의 기본 별칭입니다. cmd는 `cd`, macOS 기본 셸은 `pwd`로 현재 위치를 확인합니다. `code`가 인식되지 않으면 새 터미널에서 다시 시도하거나 위의 폴더 열기 메뉴를 사용합니다. macOS에서는 `code` 명령에 별도 PATH 설정이 필요할 수 있습니다.\n\n### 3. 화면과 확장 준비하기\n\n`Ctrl+,`로 설정을 열고 **Font Size**를 조절합니다. `Alt+Z`로 줄바꿈, `Ctrl+S`로 저장을 확인합니다. 화면은 왼쪽 탐색기, 중앙 편집기, 아래 터미널 순서로 살펴봅니다.\n\n`Ctrl+Shift+X`로 **확장(Extensions)**을 열어 이름·게시자·ID를 확인합니다.\n\n| 필요한 기능 | 준비 방법 | 확인할 항목 |\n| --- | --- | --- |\n| README의 원문과 미리보기 | 내장 기능 | 확장 없이 `Ctrl+K` 다음 `V` 또는 `Ctrl+Shift+V` |\n| HTML·CSS·JavaScript 편집과 기본 서식 | 내장 기능 | 문법 강조·자동완성·Format Document |\n| 한국어 메뉴 | 선택 확장 | Microsoft 한국어 팩 · `MS-CEINTL.vscode-language-pack-ko` |\n| 저장할 때 브라우저 새로고침 | 이번 실습에 사용하는 확장 | Live Server · Ritwick Dey · `ritwickdey.LiveServer` |\n| 여러 언어의 코드 서식 통일 | 선택 확장 | Prettier - Code formatter · 확장 ID `esbenp.prettier-vscode` |\n\nHTML은 내장 **Open in Integrated Browser**나 외부 브라우저에서도 열 수 있습니다. 수업에서는 파일 저장 결과를 바로 보기 위해 Live Server를 사용합니다. [HTML 공식 안내](https://code.visualstudio.com/docs/languages/html)\n\n### 4. 수업에 쓸 확장과 선택 설정\n\n- **Live Server**는 게시자가 **Ritwick Dey**인지 확인하고 `ritwickdey.LiveServer`를 설치합니다. 뒤에서 `index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 상태 표시줄의 **Go Live**로도 시작합니다. 저장하면 브라우저가 새로고침되고, 명령 팔레트의 **Live Server: Stop Live Server**로 종료합니다. [확장 공식 페이지](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n- **한국어 메뉴**가 필요하면 `Ctrl+Shift+X`에서 [Microsoft 한국어 팩](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ko)을 설치합니다. 언어가 그대로라면 `Ctrl+Shift+P` → **Configure Display Language** → **한국어(ko)**를 선택하고 다시 시작합니다. [표시 언어 공식 안내](https://code.visualstudio.com/docs/configure/locales)\n- **Prettier**는 선택입니다. `esbenp.prettier-vscode`를 설치한 뒤 **Format Document With... → Configure Default Formatter... → Prettier**를 선택합니다. **Shift+Alt+F**로 결과를 확인합니다. 저장할 때도 적용하려면 `Ctrl+,`에서 **Format On Save**를 검색하고, 수업 폴더에만 쓸 때는 **Workspace**를 선택합니다. 설정 키는 `editor.defaultFormatter`와 `editor.formatOnSave`입니다. [Prettier 공식 확장](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) · [기본 편집·서식 공식 안내](https://code.visualstudio.com/docs/editing/codebasics)\n\n마지막으로 원본 폴더에서 `README.md`를 열어 내장 Markdown 미리보기로 확인합니다.",
      "presentationPoints": [
        "VS Code는 코드 편집기지만 확장과 내장 기능으로 IDE처럼 사용할 수 있습니다.",
        "PyCharm은 Python 중심 IDE이며 강사의 VSCode Keymap 화면만 잠깐 보여 줍니다.",
        "User Setup으로 설치하고 같은 복제본과 한국어팩·선택 확장을 확인합니다."
      ]
    },
    {
      "id": "tools-vscode"
    },
    {
      "id": "tools-shortcuts-practice"
    },
    {
      "id": "codex-context"
    },
    {
      "id": "tools-bonus"
    }
  ],
  "steps": [
    {
      "id": "ide-vscode-setup",
      "description": "Windows User Setup을 기준으로 PATH와 선택 옵션을 읽고 설치합니다. 이미 설치되어 있으면 새 설치 대신 버전과 화면 설정만 확인합니다.",
      "code": "공식 다운로드 → Windows User Installer\n설치 옵션: Add to PATH 확인 → 설치 후 새 터미널\n파일 → 폴더 열기 → 앞서 만든 원본 메모 프로젝트\nCtrl+Shift+X → Microsoft 한국어팩 ID 확인 → 설치\nCtrl+Shift+P → Configure Display Language → 한국어 → 재시작",
      "output": "같은 README가 열리고 한국어 메뉴가 적용됩니다. Markdown 미리보기와 HTML·CSS·JavaScript 기본 편집에는 별도 확장이 필요하지 않습니다."
    },
    {
      "id": "ide-vscode-code"
    },
    {
      "id": "ide-vscode-extensions",
      "title": "기본 기능과 선택 확장 설정 확인",
      "description": "확장 이름과 식별자를 확인하고, 선택한 경우 Live Server와 Prettier의 실행·서식 설정을 직접 짚는 준비된 시연입니다. HTML이 없는 단계에서는 메뉴를 읽고 이후 카드 실습에서 실행합니다.",
      "code": "Ctrl+Shift+X → Live Server · ritwickdey.LiveServer\n카드 index.html → Open with Live Server → 표시 주소 확인\nLive Server: Stop Live Server\nCtrl+Shift+X → Prettier · esbenp.prettier-vscode\nFormat Document With... → Configure Default Formatter... → Prettier\nShift+Alt+F → 내용 확인 → 선택: Workspace의 Format On Save",
      "output": "한국어팩은 표시 언어, Live Server는 로컬 파일 제공, Prettier는 서식 정리를 담당합니다. 설치·저장·Git 커밋·원격 게시를 각각 구분합니다."
    },
    {
      "id": "tools-01",
      "title": "원본 폴더을 VS Code에서 열기"
    },
    {
      "id": "tools-02"
    },
    {
      "id": "tools-03"
    },
    {
      "id": "ide-shortcut-practice"
    },
    {
      "id": "tools-05"
    }
  ]
};

// Published IDE sections before the Markdown preview troubleshooting update.
export const previousIdePreviewBindingsDefault = {
  "id": "ide",
  "sections": [
    {
      "id": "tools-vscode-setup",
      "body": "<mark>실습 목표는 **VS Code로 원본 `git-practice` 폴더를 열고 `README.md`를 확인**하는 것입니다.</mark> 이미 설치했다면 버전 확인부터 시작합니다.\n\n### VS Code와 PyCharm\n\n**VS Code**는 터미널·Git·디버깅과 확장을 갖춘 무료 코드 편집기입니다. **PyCharm**은 Python 개발에 초점을 둔 통합 개발 환경(IDE)입니다. 수업에서는 VS Code를 사용합니다. [VS Code 공식 설명](https://code.visualstudio.com/docs/supporting/faq) · [PyCharm 공식 안내](https://www.jetbrains.com/pycharm/)\n\n<mark>강사는 **VSCode Keymap을 적용한 PyCharm 화면**을 잠깐 보여 줍니다.</mark> 이 플러그인은 VS Code 기본 조작과 비슷한 키를 제공하며, 개인 단축키는 별도로 설정합니다. [JetBrains 키맵 안내](https://www.jetbrains.com/help/pycharm/migrating-from-vsc-to-pycharm.html)\n\n### 1. Windows에 설치하기\n\n[VS Code 공식 다운로드](https://code.visualstudio.com/Download)에서 Windows PC에 맞는 설치 파일을 내려받습니다.\n\n> 설치할 때 **Add to PATH**를 꼭 체크해 주세요.\n\n<mark>**Add to PATH**를 켜면 터미널에서 `code` 명령을 쓸 수 있습니다.</mark> **Open with Code**를 선택하면 탐색기에서 폴더를 우클릭해 열 수도 있습니다. [Windows 설치 공식 안내](https://code.visualstudio.com/docs/setup/windows)\n\n> 여기서 잠시 멈추고 VS Code를 설치한 뒤 돌아와 주세요.\n\n### 2. 원본 폴더 열기\n\n설치가 끝나면 새 PowerShell을 열어 버전을 확인합니다.\n\n```powershell\ncode --version\n```\n\nVS Code에서 **파일 → 폴더 열기 → `git-practice`**를 선택합니다. 왼쪽에 `README.md`, `note.txt`, `branch-note.txt`가 보이면 맞는 폴더입니다. <mark>원본 폴더에서 연 터미널에서도 `code .`으로 같은 폴더를 열 수 있습니다.</mark> 점(`.`)은 현재 폴더입니다.\n\n```powershell\npwd\ncode .\n```\n\n`pwd`는 Windows PowerShell에서 `Get-Location`의 기본 별칭입니다. cmd는 `cd`, macOS 기본 셸은 `pwd`로 현재 위치를 확인합니다. `code`가 인식되지 않으면 설치 후 새 터미널을 열거나 VS Code의 폴더 열기 메뉴를 사용합니다. macOS에서는 `code` 명령에 별도 PATH 설정이 필요할 수 있습니다.\n\n### 3. 화면과 확장 준비하기\n\n<mark>`Ctrl+,`로 설정을 열고 **Font Size**를 조절합니다.</mark> `Alt+Z`로 줄바꿈을 켜고 끄고, `Ctrl+S`로 저장합니다. <mark>화면은 **왼쪽 탐색기 → 중앙 편집기 → 아래 터미널** 순서로 살펴봅니다.</mark>\n\n<mark>`Ctrl+Shift+X`로 **확장(Extensions)**을 열어 이름·게시자·ID를 확인합니다.</mark>\n\n| 확장 이름 | 게시자 · 확장 ID | 쓰는 곳 |\n| --- | --- | --- |\n| **Korean Language Pack** | Microsoft · `MS-CEINTL.vscode-language-pack-ko` | 한국어 메뉴 · 선택 |\n| **Prettier - Code formatter** | Prettier · `esbenp.prettier-vscode` | 들여쓰기·줄바꿈 정리 · 선택 |\n| **ESLint** | Microsoft · `dbaeumer.vscode-eslint` | JavaScript 규칙 검사 · 선택 |\n| **Live Server** | Ritwick Dey · `ritwickdey.LiveServer` | 저장한 HTML을 브라우저에서 바로 확인 · 카드 실습에 사용 |\n\nREADME 미리보기와 HTML·CSS·JavaScript의 문법 강조, 자동완성은 내장 기능입니다. README는 `Ctrl+K` 다음 `V` 또는 `Ctrl+Shift+V`로 미리 볼 수 있습니다. [VS Code HTML 안내](https://code.visualstudio.com/docs/languages/html)\n\n### 4. 수업에 쓸 확장과 선택 설정\n\n확장 목록에서 이름을 검색하고 표의 **게시자와 확장 ID**가 일치하는 항목의 **설치**를 누릅니다.\n\n#### Korean Language Pack\n\n`korean`으로 검색해 Microsoft의 **Korean Language Pack**을 설치합니다. 메뉴가 바로 바뀌지 않으면 `Ctrl+Shift+P` → **Configure Display Language** → **한국어(ko)**를 선택하고 다시 시작합니다. [공식 확장](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ko)\n\n![확장 아이콘을 열고 korean을 검색해 Microsoft Korean Language Pack을 고르는 VS Code 화면](./assets/course/ide-vscode-extension-korean.png)\n\n#### Prettier - Code formatter\n\n`prettier`로 검색해 게시자가 **Prettier**인 **Prettier - Code formatter**를 설치합니다. 여러 파일의 들여쓰기·공백·줄바꿈을 같은 규칙으로 정리합니다. [공식 확장](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)\n\n![prettier 검색 결과에서 게시자 Prettier의 Prettier - Code formatter를 고르는 화면](./assets/course/ide-vscode-extension-prettier.png)\n\n#### ESLint\n\n`eslint`로 검색해 게시자가 **Microsoft**인 **ESLint**를 설치합니다. JavaScript에서 선언하고 쓰지 않은 변수처럼 프로젝트의 규칙에 어긋난 줄을 표시합니다. ESLint 패키지와 규칙이 준비된 프로젝트에서 검사가 동작하므로, 지금은 확장 설치 위치를 확인합니다. [공식 확장](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)\n\n![eslint 검색 결과에서 Microsoft ESLint의 설치 버튼을 찾는 화면](./assets/course/ide-vscode-extension-eslint.png)\n\n#### Live Server\n\n`live`로 검색해 **Ritwick Dey**의 **Live Server**를 설치합니다. 카드 실습에서 `index.html`을 우클릭해 **Open with Live Server**를 선택하거나 하단 **Go Live**를 누릅니다. 파일을 저장하면 브라우저가 새로고침됩니다. 종료할 때는 명령 팔레트에서 **Live Server: Stop Live Server**를 선택합니다. [공식 확장](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n\n![live 검색 결과에서 Ritwick Dey의 Live Server를 찾는 화면](./assets/course/ide-vscode-extension-live-server.png)\n\n#### Prettier 추가 설정\n\n1. `Ctrl+,`로 설정을 열고 `formatter`를 검색합니다. **Editor: Default Formatter**에서 사용할 기본 포매터를 **Prettier - Code formatter**로 지정합니다.\n2. 같은 설정 화면에서 `save`를 검색합니다. **Editor: Format On Save**를 체크하면 지원되는 파일을 저장할 때 들여쓰기와 줄바꿈이 자동으로 정리됩니다.\n\n![VS Code 설정에서 formatter를 검색해 Prettier를 지정하고 save 검색에서 Format On Save를 켜는 화면](./assets/course/ide-vscode-prettier-settings.png)\n\n수업 폴더에만 적용하려면 설정 화면의 **작업 영역(Workspace)** 탭에서 지정합니다. `Shift+Alt+F`로 수동 서식 정리도 확인할 수 있습니다. [Prettier 설정 안내](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#format-on-save)\n\n마지막으로 원본 폴더에서 `README.md`를 열어 내장 Markdown 미리보기로 확인합니다."
    },
    {
      "id": "tools-vscode",
      "body": "원본 git-practice에서 **파일 이름, 문서 내용, 기능 이름**을 하나씩 찾아봅니다.\n\n| 알고 있는 것 | Windows 기본 키 | 이 실습에서 찾을 것 |\n| --- | --- | --- |\n| 파일 이름 | `Ctrl+P` | `README.md` |\n| 문서 안의 문구 | `Ctrl+Shift+F` | `확인 방법` |\n| 실행할 기능의 이름 | `Ctrl+Shift+P` | `Markdown: Open Preview to the Side` |\n\n### README 원문과 미리보기\n\n**Ctrl+K 다음 V**는 옆에 미리보기를 엽니다. `Ctrl+Shift+V`는 현재 편집 영역에서 엽니다. 강사처럼 선택 중 `Ctrl+K`가 링크 삽입으로 설정된 경우 선택을 해제하거나 `Ctrl+Shift+V`를 사용합니다.\n\n```markdown\n# Git 연습 메모\n\n## 확인 방법\n- note.txt에서 version 2를 확인합니다.\n```\n\n제목을 `나의 Git 연습 메모`로 바꿔 미리보기에서 확인하고 `Ctrl+S`로 저장합니다. 미리보기는 VS Code의 기본 기능입니다. [VS Code Markdown 공식 안내](https://code.visualstudio.com/docs/languages/markdown)\n\n**Ctrl + 백틱 키**로 통합 터미널도 열어 봅니다. 명령을 실행할 때는 먼저 현재 폴더를 확인합니다.",
      "presentationPoints": [
        "VS Code는 무료 코드 편집기이며 여러 개발 기능을 연결합니다.",
        "Ctrl+P는 파일명, Ctrl+Shift+F는 내용, Ctrl+Shift+P는 명령입니다.",
        "README 원문과 미리보기를 나란히 보며 수정하고 저장합니다."
      ]
    },
    {
      "id": "tools-shortcuts-practice",
      "body": "강사의 Windows PyCharm은 **VSCode Keymap**을 바탕으로 설정한 **VSCode copy**를 사용합니다. 실습은 아래 Windows VS Code 기본 키로 따라 합니다.\n\n### 1. README에서 찾기\n\n검색해 보고 `Esc`로 검색 창을 닫습니다.\n\n| 연습할 동작 | Windows 단축키 | 해 볼 일 |\n| --- | --- | --- |\n| 파일 찾기 | `Ctrl+P` | `README.md`를 찾아 열기 |\n| 기능 찾기 | `Ctrl+Shift+P` | VS Code 명령 팔레트에서 `Markdown: Open Preview` 검색 |\n| 현재 파일에서 찾기 | `Ctrl+F` | README에서 `Git` 찾기 |\n| 현재 파일에서 바꾸기 | `Ctrl+H` | 바꾸기 화면만 열어 보기. 실제 프로젝트 내용은 바꾸지 않고 `Esc`로 닫기 |\n| Markdown 미리보기 | `Ctrl+Shift+V` | README 원문과 미리보기 화면 전환 |\n| 통합 터미널 | `Ctrl` + 백틱 키 | 터미널을 열고 다시 눌러 접기 |\n\n백틱 키의 위치는 키보드마다 다를 수 있습니다. 메뉴 **보기 → 터미널**로도 열 수 있습니다.\n\n### 2. 연습 파일에서 편집하기\n\nVS Code에서 **파일 → 새 텍스트 파일**을 엽니다. 아래 내용을 입력한 뒤 오른쪽 아래 언어 모드를 **HTML**로 선택합니다. `Ctrl+S`를 눌러 원본 `git-practice`에 `shortcut-practice.html`로 저장합니다. 이름이 겹치면 다른 이름을 씁니다.\n\n```html\n<h1>Git 연습</h1>\n<p>첫 번째 문장</p>\n<p>두 번째 문장</p>\n```\n\n| 연습할 동작 | Windows 단축키 | 해 볼 일 |\n| --- | --- | --- |\n| 줄 이동 | `Alt+↑` / `Alt+↓` | 문장 줄에 커서를 두고 위아래로 옮기기 |\n| 줄 복사 | `Shift+Alt+↓` | 문장 한 줄을 아래로 복사하기 |\n| 실행 취소 | `Ctrl+Z` | 방금 복사하거나 이동한 동작 되돌리기 |\n| 주석 처리 | `Ctrl+/` | HTML 문장 줄을 주석으로 바꾸고 다시 눌러 해제하기 |\n| 선택 영역 확장·축소 | `Alt+Shift+→` / `Alt+Shift+←` | 문장 속에 커서를 두고 반복해 눌러 선택 범위가 어떻게 달라지는지 보기 |\n| 블록 주석 토글 | `Alt+Shift+A` | HTML 문장 일부를 선택해 주석 처리하고 다시 눌러 해제하기 |\n| 저장 | `Ctrl+S` | 연습 파일을 저장하고 다시 열어 확인하기 |\n\n- `Alt+Shift+→`는 단어, 태그처럼 **문법 구조를 따라** 선택 범위를 넓히고 `Alt+Shift+←`로 범위를 줄입니다. 단어 단위 선택은 `Ctrl+Shift+→` / `Ctrl+Shift+←`입니다.\n- `Alt+Shift+A`로 선택한 부분을 `<!-- 선택한 내용 -->`처럼 **블록 주석**으로 감쌉니다. `Ctrl+/`로 줄 주석도 적용해 비교합니다. 두 동작은 Windows VS Code 기본 키입니다. [선택 영역 확장·축소 안내](https://code.visualstudio.com/docs/editing/codebasics#_shrinkexpand-selection) · [블록 주석 기본 단축키](https://code.visualstudio.com/docs/reference/default-keybindings)\n\n### 3. 키가 다르면 설정 확인하기\n\nVS Code는 **파일 → 기본 설정 → 바로 가기 키**, PyCharm은 **설정 → Keymap**에서 동작을 검색합니다. 강사의 VS Code에서 `Ctrl+K`는 선택 중 링크를 삽입하므로 나란히 미리보기를 열 때는 선택을 해제하거나 `Ctrl+Shift+V`를 사용합니다. 강사의 PyCharm `Ctrl+D`에는 파일 비교가 추가돼 있습니다. [VS Code Windows 기본 키](https://code.visualstudio.com/docs/reference/default-keybindings) · [PyCharm 키맵 설정](https://www.jetbrains.com/help/pycharm/configuring-keyboard-and-mouse-shortcuts.html)"
    },
    {
      "id": "codex-context"
    },
    {
      "id": "tools-bonus"
    }
  ],
  "steps": [
    {
      "id": "ide-vscode-setup"
    },
    {
      "id": "ide-vscode-code"
    },
    {
      "id": "ide-vscode-extensions",
      "description": "확장 탭에서 네 개의 이름과 게시자, ID를 확인합니다. Prettier의 기본 포매터와 저장 시 서식 옵션을 설정합니다.",
      "code": "Ctrl+Shift+X → Korean Language Pack (Microsoft)\nPrettier - Code formatter (Prettier)\nESLint (Microsoft) → JavaScript 검사\nLive Server (Ritwick Dey) → 카드 실습에 사용\nCtrl+, → formatter → Editor: Default Formatter → Prettier - Code formatter\nCtrl+, → save → Editor: Format On Save 체크",
      "output": "언어 팩은 메뉴, Prettier는 서식, ESLint는 실행 환경이 준비된 프로젝트의 코드 규칙 검사, Live Server는 저장한 화면의 새로고침을 담당합니다."
    },
    {
      "id": "tools-01"
    },
    {
      "id": "tools-02"
    },
    {
      "id": "tools-03",
      "description": "앞서 본 README를 열고 원문과 미리보기를 나란히 비교하는 준비된 예시입니다. Ctrl+K 다음 V는 Windows 기본 키입니다.",
      "code": "Ctrl+Shift+P → Keyboard Shortcuts 검색\nEsc → README.md로 돌아가기\nCtrl+K 다음 V → 미리보기 옆에 열기\nREADME 제목 한 줄 수정 → 표시 확인 → Ctrl+S",
      "output": "명령 팔레트: 기능 이름으로 찾기\n왼쪽 원문 / 오른쪽 미리보기: 제목과 목록 비교\n수정 중 미리보기 반영 → 저장\n키가 다르면 현재 키보드 설정 확인"
    },
    {
      "id": "ide-shortcut-practice"
    },
    {
      "id": "tools-05"
    }
  ],
  "presentation": {
    "demo": {
      "command": "README 변경 사례 시연: 수정·저장 → 소스 제어 → Diff 확인\nVS Code 설치에서 Add to PATH 체크 → 원래 git-practice 폴더 열기\n네 가지 확장 확인 → Prettier 기본 포매터·저장 시 서식 설정\nREADME 검색·미리보기 → 강사의 PyCharm VSCode Keymap 화면 확인\n공통 단축키로 찾기·줄 이동·주석·저장 연습\n통합 터미널·Git에서 문서 변경 확인"
    }
  }
};
