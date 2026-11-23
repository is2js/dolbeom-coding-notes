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
