// Published defaults before the IDE shortcuts and web tools explanation update.
export const previousIdeToolsDefault = {
  "ide": {
    "id": "ide",
    "number": 5,
    "title": "IDE: VS Code로 파일과 개발 도구 다루기",
    "shortTitle": "IDE",
    "subtitle": "README 변경 확인부터 검색·단축키·통합 터미널 활용까지",
    "icon": "code",
    "durationMinutes": 38,
    "case": {
      "kind": "real",
      "title": "VS Code에서 README를 수정하고 Git 변경 내용 살펴보기",
      "body": "![VS Code에서 Git 연습 프로젝트의 README.md를 열어 제목, 준비물과 파일 안내를 살펴보는 강사 화면](./assets/course/ide-vscode-readme-case.png)\n\n### 어떤 화면인가요?\n\n위 이미지는 강사의 VS Code에서 `git-practice` 프로젝트의 `README.md`를 열어 둔 실제 화면입니다. 왼쪽 탐색기에 프로젝트의 `note.txt`, `branch-note.txt`, `README.md`가 보이고, 오른쪽 편집기에서 앞서 작성한 제목과 준비물, 파일 안내를 읽을 수 있습니다. 이미지를 클릭하면 크게 볼 수 있습니다.\n\n### 이어서 보여 줄 실습\n\n1. **README 열기와 수정:** VS Code에서 앞서 연습한 프로젝트 폴더의 `README.md`를 열고, 제목이나 소개 문장 한 곳을 바꿉니다. 이 예시처럼 원래 `git-practice`를 열 수도 있고, 앞에서 pull한 `git-practice-clone`을 사용할 수도 있습니다. 두 폴더는 별개이므로 현재 연 폴더를 먼저 확인합니다.\n2. **저장하고 변경 찾기:** `Ctrl+S`로 저장한 뒤 왼쪽의 **소스 제어(Source Control)** 아이콘을 누릅니다. Git이 관리하는 저장소라면 변경 목록에서 `README.md`를 확인할 수 있습니다.\n3. **변화 비교하기:** 변경 목록의 `README.md`를 선택하면 변경 전과 현재 내용을 비교하는 **Diff(차이)** 화면을 볼 수 있습니다. 추가하거나 바꾼 줄의 색과 내용을 살펴보며 어떤 문장이 달라졌는지 확인합니다. 스테이징 여부와 화면 설정에 따라 비교 기준이나 배치가 달라질 수 있습니다.\n\n첨부 이미지는 README를 편집기에서 연 장면입니다. 소스 제어와 Diff 화면은 이어지는 실제 시연에서 보여 줍니다. 파일을 **저장**한 것과 Git에 **커밋**하거나 GitHub에 **push**한 것은 각각 다른 단계이며, 지금은 변경을 살펴봅니다.\n\n이제 VS Code를 준비하고 README 검색·미리보기와 단축키를 연습한 뒤, HTML 화면도 직접 만들어 보겠습니다. [VS Code 소스 제어 안내](https://code.visualstudio.com/docs/sourcecontrol/overview)",
      "question": "README를 저장한 뒤 어떤 파일과 문장이 바뀌었는지 VS Code에서 어떻게 확인할까요?"
    },
    "objectives": [
      "VS Code를 설치하고 앞서 만든 복제본 폴더와 README를 연다.",
      "VS Code와 PyCharm 키맵을 비교하고 검색·미리보기·편집 단축키를 연습한다.",
      "통합 터미널·Git·GitHub·Markdown으로 같은 프로젝트의 변경을 살펴본다."
    ],
    "sections": [
      {
        "id": "tools-vscode-setup",
        "title": "VS Code 설치하고 내 실습 폴더 열기",
        "minutes": 12,
        "optional": false,
        "body": "### 편집할 작업대를 준비합니다\n\n앞에서 만든 `git-practice-clone`에는 메모와 README가 있습니다. 이제 이 폴더를 코드 편집기에서 열어 파일을 찾고 화면을 확인합니다. 이미 VS Code가 설치되어 있다면 버전을 확인하고 폴더 열기부터 따라갑니다.\n\n### VS Code와 PyCharm은 어떻게 다를까요?\n\n**VS Code**는 Microsoft가 코드 편집기로 소개하는 무료 도구입니다. 파일 편집뿐 아니라 터미널, 디버깅과 Git 기능을 제공하고 필요한 확장을 더해 **IDE처럼 사용할 수 있습니다**. **PyCharm**은 Python 개발에 초점을 둔 통합 개발 환경(IDE)으로, 프로젝트 탐색과 실행·디버깅 같은 기능을 함께 제공합니다. 두 도구의 경계는 딱 잘라 나뉘기보다 사용하는 기능에 따라 겹칩니다. 이번 수업의 설치와 실습은 VS Code를 기준으로 합니다. [VS Code 공식 설명](https://code.visualstudio.com/docs/supporting/faq) · [PyCharm 공식 안내](https://www.jetbrains.com/pycharm/)\n\n### 강사의 PyCharm 단축키 화면\n\n강사는 이미 설정한 PyCharm 화면에서 VS Code에 익숙한 단축키를 사용하는 모습만 잠깐 보여 줍니다. PyCharm의 **VSCode Keymap** 플러그인은 VS Code의 기본 조작을 가깝게 제공하지만, VS Code의 개인 단축키를 자동으로 추출하거나 동기화하는 기능은 아닙니다. 모든 기능의 키가 완전히 같다는 뜻도 아닙니다. 수강생은 PyCharm 설치나 키맵 설정 없이 VS Code 실습을 이어갑니다. [JetBrains 키맵 안내](https://www.jetbrains.com/help/pycharm/migrating-from-vsc-to-pycharm.html)\n\n### 1. Windows 설치 파일 선택\n\n[VS Code 공식 다운로드](https://code.visualstudio.com/Download)에서 내 Windows와 프로세서에 맞는 설치 파일을 받습니다. 일반적인 개인 PC는 **User Installer**를 선택하면 됩니다. Visual Studio와 Visual Studio Code는 다른 제품입니다.\n\n| 설치 방식 | 누구에게 설치하나요? | 권한과 위치 |\n| --- | --- | --- |\n| User Setup | 현재 Windows 사용자 | 일반적으로 관리자 권한 없이 사용자 폴더에 설치 |\n| System Setup | 이 PC의 모든 사용자 | 관리자 권한이 필요하며 Program Files에 설치 |\n\n설치 화면의 안내를 읽고 진행합니다. **Add to PATH**는 터미널에서 `code` 명령으로 편집기를 열 수 있게 하는 옵션입니다. 폴더 우클릭의 **Open with Code**가 보이면 편하게 폴더를 여는 선택 기능으로 사용할 수 있습니다. 추가 AI 서비스나 계정 연결은 이번 파일 편집 실습의 필수 준비가 아닙니다. [Windows 설치 공식 안내](https://code.visualstudio.com/docs/setup/windows)\n\n### 2. 같은 복제본 열기\n\n설치 후에는 기존 터미널을 닫고 새 PowerShell 창을 엽니다. 새로 반영된 PATH를 읽기 위해서입니다. 먼저 버전을 확인합니다.\n\n```powershell\ncode --version\n```\n\n파일 탐색기에서 앞서 작업한 `git-practice-clone`의 실제 경로를 확인합니다. VS Code의 **파일 → 폴더 열기**로 그 폴더를 선택하면 왼쪽 탐색기에 `README.md`, `note.txt`, `branch-note.txt`가 보입니다. 파일 하나만 여는 것과 프로젝트 폴더를 여는 것을 구분합니다.\n\n터미널이 같은 복제본 안에 있다면 아래처럼 열 수도 있습니다. `pwd`는 Windows PowerShell의 `Get-Location` 기본 별칭이며, `code`는 VS Code 프로그램의 명령입니다. Windows cmd에서는 현재 위치 확인에 `cd`, macOS 기본 셸에서는 `pwd`를 사용합니다. macOS에서 `code`를 사용하려면 해당 운영체제의 별도 PATH 설정이 필요할 수 있습니다.\n\n```powershell\npwd\ncode .\n```\n\n`code`를 찾지 못한다면 새 터미널인지 확인하고 설치 때 **Add to PATH**를 선택했는지 살펴봅니다. 당장은 시작 메뉴에서 VS Code를 열고 **폴더 열기**로 진행할 수 있습니다. 앞에서 직접 만든 연습 폴더를 열었는지 확인한 뒤 작업합니다.\n\n### 3. 화면을 읽기 좋게 맞추기\n\n`Ctrl+,`로 설정을 열어 **Font Size**를 검색하고 녹화 화면에서도 읽히는 크기로 조절합니다. `Alt+Z`로 긴 문장의 줄바꿈을 켜고 꺼 보며 README가 어떻게 보이는지 비교합니다. 왼쪽 탐색기, 가운데 편집 영역, 하단 터미널을 한 번씩 가리킵니다. 저장은 `Ctrl+S`로 직접 확인합니다.\n\n### 4. 기본 기능과 설치할 확장 구분하기\n\nVS Code에서 플러그인을 **확장(Extensions)**이라고 부릅니다. `Ctrl+Shift+X`를 누르면 확장 화면이 열립니다. 검색 결과의 이름만 보지 말고 아래 식별자와 게시자를 확인합니다. 이미 설치되어 있다면 다시 설치하지 않고 설치됨·사용 상태를 확인합니다.\n\n| 필요한 기능 | 준비 방법 | 확인할 항목 |\n| --- | --- | --- |\n| README의 원문과 미리보기 | 내장 기능 | 확장 없이 `Ctrl+K` 다음 `V` 또는 `Ctrl+Shift+V` |\n| HTML·CSS·JavaScript 편집과 기본 서식 | 내장 기능 | 문법 강조·자동완성·Format Document |\n| 한국어 메뉴 | 선택 확장 | Microsoft 한국어 팩 · `MS-CEINTL.vscode-language-pack-ko` |\n| 저장할 때 브라우저 새로고침 | 이번 실습에 사용하는 확장 | Live Server · Ritwick Dey · `ritwickdey.LiveServer` |\n| 여러 언어의 코드 서식 통일 | 선택 확장 | Prettier - Code formatter · 확장 ID `esbenp.prettier-vscode` |\n\n이번 카드의 첫 실습은 내장 기능으로 진행할 수 있습니다. 최신 VS Code의 HTML 파일에는 **Open in Integrated Browser** 미리보기도 있습니다. 구버전에서 해당 메뉴가 없다면 외부 브라우저로 파일을 열어 저장·새로고침하거나 아래 Live Server를 선택합니다. [HTML 공식 안내](https://code.visualstudio.com/docs/languages/html)\n\n### 5. 한국어 팩 설치와 표시 언어 적용\n\n1. `Ctrl+Shift+X`를 누르고 **Korean Language Pack for Visual Studio Code**를 검색합니다. [Microsoft 한국어 팩](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ko)의 확장 ID가 위 표와 같은지 확인합니다.\n2. **Install(설치)**을 누릅니다. 표시 언어 변경이나 재시작 안내가 나오면 적용합니다.\n3. 메뉴 언어가 그대로라면 `Ctrl+Shift+P` → **Configure Display Language(표시 언어 구성)** → **한국어(ko)**를 선택하고 안내에 따라 다시 시작합니다. 영어 메뉴를 유지해도 실습에는 문제가 없습니다. [표시 언어 공식 안내](https://code.visualstudio.com/docs/configure/locales)\n\n### 이번 실습: Live Server 설치하고 카드 미리보기\n\n1. 확장 화면에서 **Live Server**를 검색하고 게시자 **Ritwick Dey**, 확장 ID `ritwickdey.LiveServer`를 확인한 뒤 설치합니다. [확장 공식 페이지](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n2. 뒤에서 만들 카드 폴더와 저장한 `index.html`을 연 뒤 파일을 우클릭해 **Open with Live Server**를 선택합니다. 상태 표시줄의 **Go Live**로도 시작할 수 있습니다.\n3. 표시된 로컬 주소의 카드에서 제목을 바꾸어 저장하고 브라우저가 다시 표시되는지 확인합니다. 사용이 끝나면 명령 팔레트의 **Live Server: Stop Live Server**로 종료합니다.\n\nLive Server는 VS Code에 추가하는 확장이며 저장한 HTML·CSS·JavaScript 파일을 로컬 주소로 보여 주고 변경 시 브라우저 새로고침을 돕습니다. GitHub Pages에 게시하거나 FastAPI 백엔드를 만드는 기능은 아닙니다. 지금은 설치 여부와 메뉴를 확인하고, HTML 실습에서 실제 화면을 엽니다. 설치가 어렵다면 정적 카드는 브라우저에서 직접 열어 저장 후 새로고침해도 됩니다.\n\n### 선택: Prettier 설치와 기본 포매터 설정\n\n1. 확장 화면에서 **Prettier - Code formatter**를 찾고 공식 확장 ID `esbenp.prettier-vscode`를 확인해 설치합니다. 이름이 비슷한 다른 확장과 구분합니다. [Prettier 공식 확장](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)\n2. 연습용 문서를 연 뒤 명령 팔레트에서 **Format Document With...** → **Configure Default Formatter...** → **Prettier - Code formatter**를 선택합니다. 메뉴의 한국어 번역은 버전에 따라 다를 수 있습니다.\n3. 먼저 **Format Document** 또는 Windows 기본 키 **Shift+Alt+F**로 현재 파일의 서식만 정리하고, 내용이 보존됐는지 확인합니다. 저장할 때도 적용하고 싶으면 `Ctrl+,`에서 **Format On Save**를 검색해 선택합니다. 설정의 **User / Workspace** 범위를 확인하고, 이 실습 폴더에만 적용하려면 Workspace를 사용합니다.\n\n설정 키는 `editor.defaultFormatter`와 `editor.formatOnSave`입니다. 기존 설정 파일을 통째로 덮어쓰지 않고 설정 화면에서 필요한 항목만 바꿉니다. 프로젝트에 이미 포매터 설정이 있다면 그 규칙부터 확인합니다. HTML·CSS·JavaScript의 기본 서식 기능도 있으므로 Prettier는 선택 사항입니다. ESLint 역시 프로젝트의 규칙과 설정을 함께 준비하는 도구이며 이번 카드에 필수로 설치하지 않습니다. [기본 편집·서식 공식 안내](https://code.visualstudio.com/docs/editing/codebasics)\n\n**직접 확인:** 앞서 만든 복제본의 `README.md`를 열고, 한국어 메뉴 적용 여부와 내장 Markdown 미리보기를 확인합니다. Live Server는 뒤의 카드 HTML 실습에서 사용하며, 나머지 확장은 수업 시간과 필요에 따라 선택합니다. 다음 절에서는 파일명 검색·내용 검색·나란한 미리보기를 연습합니다.",
        "presentationPoints": [
          "VS Code는 코드 편집기지만 확장과 내장 기능으로 IDE처럼 사용할 수 있습니다.",
          "PyCharm은 Python 중심 IDE이며 강사의 VSCode Keymap 화면만 잠깐 보여 줍니다.",
          "User Setup으로 설치하고 같은 복제본과 한국어팩·선택 확장을 확인합니다."
        ]
      },
      {
        "id": "tools-vscode",
        "title": "무료 VS Code에서 필수 단축키로 찾아보기",
        "minutes": 9,
        "optional": false,
        "body": "### 같은 문서를 찾아 나란히 읽습니다\n\n설치와 기본 설정을 마쳤다면 앞서 사용한 **git-practice-clone 복제본**을 엽니다. 시작 사례에서 본 README와 Git 변경 확인을 떠올리며, 내가 만든 `README.md`를 직접 고칩니다. 탐색기의 경로와 파일 목록으로 같은 복제본인지 확인합니다.\n\nVS Code는 개인·상업 용도로 무료로 사용할 수 있는 코드 편집기입니다. 디버깅·작업 실행·버전 관리와 확장으로 여러 개발 기능을 연결할 수 있습니다. 편집기의 무료 사용과 선택적 AI 서비스의 이용 조건은 각각 확인합니다.\n\n### 파일 이름, 파일 내용, 기능 이름으로 찾아보기\n\n| 알고 있는 것 | Windows 기본 키 | 이 실습에서 찾을 것 |\n| --- | --- | --- |\n| 파일 이름 | `Ctrl+P` | `README.md` |\n| 문서 안의 문구 | `Ctrl+Shift+F` | `확인 방법` |\n| 실행할 기능의 이름 | `Ctrl+Shift+P` | `Markdown: Open Preview to the Side` |\n\n세 가지를 차례로 실행합니다. 파일명 검색에 문서의 문장을 넣었을 때 결과가 없는 이유도 설명해 봅니다. 메뉴 언어·운영체제·사용자 설정에 따라 키와 이름이 다를 수 있으므로, 원하는 기능을 명령 팔레트에서 찾아 현재 키를 확인합니다.\n\n### README 원문과 결과를 함께 보기\n\n`README.md`를 열고 **Ctrl+K를 누른 뒤 V**를 누르면 Markdown 미리보기가 옆에 열립니다. `Ctrl+Shift+V`는 현재 편집기 그룹에서 미리보기를 여는 다른 방법입니다. 선택한 글자가 있으면 해제한 뒤 시도합니다. 강사처럼 선택 중 `Ctrl+K`를 링크 삽입으로 바꾼 설정에서는 연속 키가 가로채질 수 있습니다. 이때 선택을 해제하거나 `Ctrl+Shift+V`를 사용합니다. 다음처럼 앞에서 작성한 제목을 찾습니다.\n\n```markdown\n# Git 연습 메모\n\n## 확인 방법\n- note.txt에서 version 2를 확인합니다.\n```\n\n**한 가지 수정:** 첫 제목을 `나의 Git 연습 메모`로 바꾸어 미리보기의 변화를 확인하고 `Ctrl+S`로 저장합니다. 원문을 저장하는 단계, Git으로 커밋하는 단계, GitHub에 push하는 단계가 각각 필요하다는 점을 다시 확인합니다. 기본 Markdown 미리보기에는 별도 확장 설치가 필요하지 않습니다. [VS Code Markdown 공식 안내](https://code.visualstudio.com/docs/languages/markdown)\n\n통합 터미널은 Ctrl와 백틱(`)으로 표시할 수 있습니다. 현재 폴더를 확인한 뒤 필요한 명령을 실행합니다. 화면의 위치만 외우기보다 파일·문구·기능 가운데 무엇을 찾는지 먼저 정합니다.\n\n다음 절에서는 방금 익힌 찾기와 미리보기에 줄 이동·복사·주석·저장 단축키를 더해 직접 연습합니다.",
        "presentationPoints": [
          "VS Code는 무료 코드 편집기이며 여러 개발 기능을 연결합니다.",
          "Ctrl+P는 파일명, Ctrl+Shift+F는 내용, Ctrl+Shift+P는 명령입니다.",
          "README 원문과 미리보기를 나란히 보며 수정하고 저장합니다."
        ]
      },
      {
        "id": "tools-shortcuts-practice",
        "title": "VS Code와 강사의 PyCharm 단축키 연습하기",
        "minutes": 10,
        "optional": false,
        "body": "### 같은 동작을 키보드로 연습합니다\n\n강사의 Windows PyCharm 2025.2 설정에서는 **VSCode copy** 키맵을 사용합니다. VSCode Keymap을 바탕으로 개인 설정을 더한 키맵입니다. 아래는 이 키맵 파일과 Windows VS Code 기본 단축키에서 확인한 공통 동작을 중심으로 골랐습니다. 수강생은 **VS Code에서만** 따라 하면 됩니다. PyCharm 설치는 필요하지 않습니다. 키보드 배열, 앱 버전, 확장, 포커스와 개인 설정에 따라 결과가 다를 수 있습니다.\n\n### 1. 먼저 찾기와 화면 이동\n\n앞서 연 `git-practice-clone` 폴더를 VS Code에서 확인합니다. 키를 누른 뒤 원하는 항목을 찾고 `Esc`로 검색 창을 닫아 봅니다.\n\n| 연습할 동작 | Windows 단축키 | 해 볼 일 |\n| --- | --- | --- |\n| 파일 찾기 | `Ctrl+P` | `README.md`를 찾아 열기 |\n| 기능 찾기 | `Ctrl+Shift+P` | VS Code 명령 팔레트에서 `Markdown: Open Preview` 검색 |\n| 현재 파일에서 찾기 | `Ctrl+F` | README에서 `Git` 찾기 |\n| 현재 파일에서 바꾸기 | `Ctrl+H` | 바꾸기 화면만 열어 보기. 실제 프로젝트 내용은 바꾸지 않고 `Esc`로 닫기 |\n| Markdown 미리보기 | `Ctrl+Shift+V` | README 원문과 미리보기 화면 전환 |\n| 통합 터미널 | `Ctrl` + 백틱 키 | 터미널을 열고 다시 눌러 접기 |\n\n`Ctrl+Shift+P`는 VS Code에서는 명령 팔레트이고 PyCharm에서는 유사한 기능 검색입니다. 화면 구성과 검색 결과는 다를 수 있습니다. 백틱은 작은 역따옴표 키이며 키보드 배열에 따라 입력 위치가 다릅니다. 터미널 키가 작동하지 않으면 VS Code 메뉴 **보기 → 터미널**을 사용합니다.\n\n### 2. 연습용 파일에서 편집해 보기\n\nVS Code에서 **파일 → 새 텍스트 파일**을 열고 아래 글을 입력합니다. 오른쪽 아래 언어 모드를 **HTML**로 선택한 뒤, `Ctrl+S`를 눌러 프로젝트 밖의 연습 위치에 `shortcut-practice.html`로 저장합니다. 같은 이름의 파일이 이미 있다면 다른 이름을 사용하며 덮어쓰지 않습니다. 기존 README는 수정하지 않습니다.\n\n```html\n<h1>Git 연습</h1>\n<p>첫 번째 문장</p>\n<p>두 번째 문장</p>\n```\n\n| 연습할 동작 | Windows 단축키 | 해 볼 일 |\n| --- | --- | --- |\n| 줄 이동 | `Alt+↑` / `Alt+↓` | 문장 줄에 커서를 두고 위아래로 옮기기 |\n| 줄 복사 | `Shift+Alt+↓` | 문장 한 줄을 아래로 복사하기 |\n| 실행 취소 | `Ctrl+Z` | 방금 복사하거나 이동한 동작 되돌리기 |\n| 주석 처리 | `Ctrl+/` | HTML 문장 줄을 주석으로 바꾸고 다시 눌러 해제하기 |\n| 저장 | `Ctrl+S` | 연습 파일을 저장하고 다시 열어 확인하기 |\n\n줄 이동·복사와 주석은 편집기에 커서가 있을 때 연습합니다. `Ctrl+Z`는 최근 동작을 되돌립니다. 언어 모드나 선택 상태에 따라 주석 결과가 다를 수 있으므로 화면에서 확인합니다. 연습 파일은 프로젝트 밖에 남겨 두거나 **직접 만든 파일만** 탐색기에서 정리합니다.\n\n### 3. 내 설정과 다를 때 확인하기\n\nVS Code에서 **파일 → 기본 설정 → 바로 가기 키**를 열고 기능 이름을 검색해 현재 키와 충돌을 확인합니다. PyCharm에서는 **설정 → Keymap**에서 확인합니다. 강사의 VS Code에서는 Markdown 텍스트를 선택했을 때 `Ctrl+K`가 링크 삽입으로 설정되어 있어 `Ctrl+K` 다음 `V`의 나란히 미리보기와 충돌할 수 있습니다. 선택을 해제하고 다시 시도하거나 `Ctrl+Shift+V`를 사용합니다. 강사의 PyCharm에서는 `Ctrl+D`에 파일 비교도 추가되어 있으므로 이 키를 공통 편집 단축키로 단정하지 않습니다.\n\n이어서 통합 터미널과 Git의 변경 확인을 살펴본 뒤, 연습한 찾기·줄 이동·주석·저장을 활용해 HTML 강의 카드를 만듭니다. [VS Code Windows 기본 키](https://code.visualstudio.com/docs/reference/default-keybindings) · [PyCharm 키맵 설정](https://www.jetbrains.com/help/pycharm/configuring-keyboard-and-mouse-shortcuts.html)",
        "presentationPoints": [
          "강사의 VSCode copy 키맵과 VS Code의 공통 단축키를 확인합니다.",
          "README에서 찾기·미리보기, 별도 HTML 연습 파일에서 줄 이동·복사·주석·저장을 연습합니다.",
          "설정과 포커스에 따라 달라질 수 있으므로 각 앱의 키보드 설정에서 확인합니다."
        ]
      },
      {
        "id": "codex-context",
        "title": "README 한 줄 수정으로 VS Code·Git·GitHub 연결하기",
        "minutes": 7,
        "optional": false,
        "body": "### 무엇을 한 번에 확인할까요?\n\n앞에서 각각 배운 도구를 VS Code 한 화면에서 연결합니다. **README 한 줄을 바꾼 뒤, 미리보기와 Git 변경 내용을 확인하고 GitHub의 원격 저장소와 비교**합니다. VS Code는 작업대, Markdown은 문서 작성 형식, 터미널은 명령을 입력하는 곳, Git은 변경을 비교·기록하는 도구, GitHub는 원격 저장소입니다.\n\n### 1. 같은 복제본과 현재 상태 확인\n\nVS Code에서 앞서 README를 pull한 `git-practice-clone` 폴더를 열고 탐색기에서 `README.md`를 선택합니다. **보기 → 터미널**로 통합 터미널을 엽니다. 아래에서 `pwd`는 Windows PowerShell의 `Get-Location` 기본 별칭이며, Git 명령은 Git 프로그램의 명령입니다.\n\n```powershell\npwd\ngit status --short\ngit remote -v\n```\n\n터미널의 위치가 VS Code에서 연 복제본과 같고, `origin`이 앞에서 사용한 GitHub 저장소인지 확인합니다. 다른 폴더에 있다면 직접 선택한 실제 복제본 경로로 이동합니다. 기본 위치는 `~/git-practice-clone`이지만 이름이나 위치를 다르게 정했다면 그대로 사용합니다. Windows cmd의 현재 위치 확인은 인수 없는 `cd`, macOS/Linux 기본 셸은 `pwd`입니다.\n\n`git status --short`에 아무것도 보이지 않는 **깨끗한 상태**라면 새로 한 줄을 바꾸어 볼 수 있습니다. 시작 사례에서 이미 수정한 README가 있다면 덮어쓰거나 초기화하지 말고, 그 변경 내용을 그대로 확인하는 데 사용해도 됩니다. 다른 작업이 섞여 있거나 파일·저장소가 예상과 다르면 멈추고 먼저 확인합니다.\n\n### 2. Markdown을 수정하고 미리보기\n\n`README.md`의 소개 문장 끝에 짧은 문장을 하나 추가하고 `Ctrl+S`로 저장합니다. 예를 들어 **“이 문서는 Git 연습을 소개합니다.”**라고 적을 수 있습니다. 실제 중요한 내용은 지우지 않습니다.\n\nVS Code에서 `Ctrl+Shift+V`로 Markdown 미리보기를 열어 방금 수정한 문장이 보이는지 확인합니다. 이것은 **현재 복제본의 파일**을 보는 화면입니다. 저장하거나 미리보기만 했을 때 GitHub의 문서가 자동으로 바뀌지는 않습니다.\n\n### 3. 소스 제어에서 무엇이 달라졌는지 보기\n\n왼쪽의 **소스 제어(Source Control)**를 열고 변경 목록의 `README.md`를 선택합니다. 아직 스테이징하지 않은 변경은 보통 마지막 커밋의 내용과 현재 파일을 비교합니다. 색이 표시된 줄에서 추가한 문장을 찾아봅니다. 화면 배치와 비교 기준은 선택한 항목이나 스테이징 상태에 따라 달라집니다.\n\n### 4. 터미널에서 같은 변경 확인\n\n같은 VS Code 통합 터미널에서 다음 명령을 실행합니다. 명령은 내용을 확인할 뿐 수정하거나 커밋하지 않습니다.\n\n```powershell\ngit status --short\ngit diff README.md\n```\n\n첫 명령은 변경된 파일을 보여 줍니다. 두 번째 명령은 README의 **아직 스테이징하지 않은 변경 내용**을 줄 단위로 보여 줍니다. 소스 제어에서 본 문장과 비교해 봅니다. 이미 스테이징된 변경은 이 diff에 나타나지 않으므로 소스 제어의 스테이징 영역과 현재 상태를 먼저 확인합니다.\n\n### 5. GitHub와 비교하고 마무리\n\n브라우저에서 앞서 연결한 내 GitHub 저장소를 새로고침해 README를 살펴봅니다. GitHub에는 원격 저장소에 이미 올라간 내용이 표시되고, 방금 이 복제본에서 저장한 문장은 아직 자동으로 반영되지 않습니다. 다른 사람이 원격에 별도로 올린 변경이 있다면 그 내용은 보일 수 있습니다.\n\n**저장**은 현재 파일에 쓰는 일, **커밋**은 선택한 변경을 로컬 Git 기록에 남기는 일, **push**는 커밋을 원격으로 보내는 일입니다. 이 시연은 비교까지만 합니다. 수정은 그대로 두고, 이후 커밋할지 결정합니다. 다음 주제에서는 별도의 폴더에서 HTML·CSS·JavaScript로 강의 카드를 직접 만듭니다.",
        "presentationPoints": [
          "같은 복제본을 확인하고 README 한 줄을 저장해 Markdown 미리보기를 봅니다.",
          "소스 제어 Diff와 터미널 git status·git diff에서 같은 변경을 확인합니다.",
          "GitHub에는 원격에 올라간 내용이 보이며, 저장·커밋·push는 서로 다른 단계입니다."
        ]
      },
      {
        "id": "tools-bonus",
        "title": "보충 노트: 가상환경과 실행 버튼을 같은 기준으로 맞추기",
        "minutes": 5,
        "optional": true,
        "body": "이 절은 본편에 포함하지 않습니다. 가상환경을 준비하는 예시는 `python -m venv .venv`입니다. 사용 가능한 Python과 버전은 먼저 프로젝트 요구사항에 맞게 확인해야 합니다. 이미 환경이 있는 프로젝트에서는 새로 만들기보다 그 환경을 선택하는 일이 먼저일 수 있습니다. 생성·제거·이전의 상세한 규칙은 [Python venv 문서](https://docs.python.org/3/library/venv.html)를 참고합니다.\n\nPowerShell에서 가상환경 Python을 직접 지정하면 실행 대상이 분명해집니다.\n\n```powershell\n.\\.venv\\Scripts\\python.exe .\\tools\\check_course.py\n```\n\n이는 활성화 스크립트를 실행하는 방식과 다른 선택입니다. 활성화는 현재 셸의 도구 검색 경로 등을 조정하는 편의 기능이며, 환경의 실행 파일을 직접 호출하는 방법도 있습니다. 이 예제에서는 전역 실행 정책을 바꾸는 절차를 추가하지 않습니다.\n\nPyCharm 실행 설정과 터미널 출력을 비교할 때는 세 항목을 봅니다. 스크립트 경로, Python 실행 파일 경로, 작업 폴더입니다. 이 셋을 같은 기준으로 기록하면 다른 실행 결과의 원인을 더 좁힐 수 있습니다. 프로그램이 환경변수나 외부 파일도 사용한다면 그것도 영향을 줄 수 있지만, 이번 보조 도구는 단순한 JSON 읽기로 범위를 한정합니다.\n\n`.venv` 폴더와 IDE 개인 설정을 통째로 다른 사람에게 복사하는 것이 프로젝트 전달의 기본은 아닙니다. 필요한 환경을 다시 만들 수 있는 설명과 의존성 정보를 남기는 방향으로 생각합니다. 어떤 파일을 버전 관리할지는 앞서 배운 2강 Git의 ignore·스테이징 기준과 연결합니다."
      }
    ],
    "pitfalls": [
      {
        "title": "프로젝트 이름만 보고 같은 파일이라고 가정하기",
        "body": "루트 폴더와 파일의 전체 경로를 확인합니다. 다운로드 사본과 작업 폴더가 다를 수 있습니다."
      },
      {
        "title": "VS Code를 Visual Studio와 혼동하거나 모든 AI 기능도 무료라고 가정하기",
        "body": "VS Code는 무료 코드 편집기이고 Visual Studio는 별도 IDE입니다. 선택적인 서비스와 확장은 별도 조건을 확인합니다."
      },
      {
        "title": "VSCode 키맵이 모든 기능과 실행 환경을 똑같이 만든다고 생각하기",
        "body": "키맵은 동작에 연결된 키 조합입니다. Python 인터프리터·실행 설정·Git 연결과는 별도로 확인합니다."
      },
      {
        "title": "저장·커밋·원격 업로드를 한 번의 저장으로 생각하기",
        "body": "파일 저장, Git 기록, GitHub push를 구분하고 준비된 diff와 결과를 먼저 읽습니다."
      }
    ],
    "checklist": [
      "VS Code의 파일명 찾기·내용 검색·명령 팔레트·Markdown 미리보기를 구분할 수 있다.",
      "VS Code가 코드 편집기지만 IDE처럼 확장해 쓸 수 있고, PyCharm은 Python 중심 IDE임을 설명할 수 있다.",
      "키맵은 단축키를 연결하는 설정이며 개인 설정 자동 동기화와 다름을 설명할 수 있다.",
      "통합 터미널·Git·GitHub·Markdown의 역할과 저장·커밋·push 차이를 설명할 수 있다."
    ],
    "steps": [
      {
        "id": "ide-vscode-setup",
        "title": "VS Code 설치와 기본 화면 준비",
        "description": "Windows User Setup을 기준으로 PATH와 선택 옵션을 읽고 설치합니다. 이미 설치되어 있으면 새 설치 대신 버전과 화면 설정만 확인합니다.",
        "scene": "vscode",
        "code": "공식 다운로드 → Windows User Installer\n설치 옵션: Add to PATH 확인 → 설치 후 새 터미널\n파일 → 폴더 열기 → 앞서 만든 메모 복제본\nCtrl+Shift+X → Microsoft 한국어팩 ID 확인 → 설치\nCtrl+Shift+P → Configure Display Language → 한국어 → 재시작",
        "language": "text",
        "output": "같은 README가 열리고 한국어 메뉴가 적용됩니다. Markdown 미리보기와 HTML·CSS·JavaScript 기본 편집에는 별도 확장이 필요하지 않습니다.",
        "focus": "ide",
        "fileName": "VS Code · 설치와 기본 설정",
        "files": [
          "README.md"
        ]
      },
      {
        "id": "ide-vscode-code",
        "title": "새 터미널에서 같은 폴더 열기",
        "description": "설치 후 새 PowerShell을 열고 버전을 확인합니다. pwd가 앞서 만든 복제본을 가리킬 때 code .으로 열어 같은 파일을 확인합니다. pwd는 Windows PowerShell의 Get-Location 기본 별칭입니다.",
        "scene": "terminal",
        "code": "code --version\npwd\ncode .",
        "language": "powershell",
        "output": "code 버전 확인 → 현재 경로 확인 → 같은 복제본이 VS Code에서 열림\ncode를 찾지 못하면 새 터미널과 설치 PATH를 확인하거나 파일 → 폴더 열기를 사용합니다.",
        "focus": "terminal",
        "fileName": "git-practice-clone · PowerShell",
        "files": [
          "README.md",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "ide-vscode-extensions",
        "title": "기본 기능과 선택 확장 설정 확인",
        "description": "확장 이름과 식별자를 확인하고, 선택한 경우 Live Server와 Prettier의 실행·서식 설정을 직접 짚는 준비된 시연입니다. HTML이 없는 단계에서는 메뉴를 읽고 이후 카드 실습에서 실행합니다.",
        "scene": "vscode",
        "code": "Ctrl+Shift+X → Live Server · ritwickdey.LiveServer\n카드 index.html → Open with Live Server → 표시 주소 확인\nLive Server: Stop Live Server\nCtrl+Shift+X → Prettier · esbenp.prettier-vscode\nFormat Document With... → Configure Default Formatter... → Prettier\nShift+Alt+F → 내용 확인 → 선택: Workspace의 Format On Save",
        "language": "text",
        "output": "한국어팩은 표시 언어, Live Server는 로컬 파일 제공, Prettier는 서식 정리를 담당합니다. 설치·저장·Git 커밋·원격 게시를 각각 구분합니다.",
        "focus": "ide",
        "fileName": "VS Code · 확장과 작업 공간 설정",
        "files": [
          "README.md"
        ]
      },
      {
        "id": "tools-01",
        "title": "복제본을 VS Code에서 열기",
        "description": "GitHub에서 복제한 뒤 README를 받아온 git-practice-clone의 실제 경로를 폴더 열기로 선택합니다.",
        "scene": "vscode",
        "code": "파일 → 폴더 열기 → 사용자 홈/git-practice-clone\n탐색기: README.md · note.txt · branch-note.txt",
        "language": "text",
        "output": "탐색기에서 복제본의 세 파일을 확인합니다. 원래 git-practice 폴더와 복제본이 서로 다른 위치임을 구분합니다.",
        "focus": "ide",
        "fileName": "VS Code · 메모 복제본",
        "files": [
          "README.md",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "tools-02",
        "title": "파일명 찾기와 내용 검색 비교",
        "description": "마크다운 강의에서 만든 복제본 README를 Ctrl+P로 찾고 Ctrl+Shift+F로 확인 방법을 검색합니다.",
        "scene": "vscode",
        "code": "Ctrl+P → README.md\nCtrl+Shift+F → 확인 방법",
        "language": "text",
        "output": "파일명 검색: README.md\n내용 검색: README.md 안의 “확인 방법”\n검색 대상이 서로 다름",
        "focus": "files",
        "fileName": "Quick Open · Search",
        "files": [
          "README.md",
          "note.txt"
        ]
      },
      {
        "id": "tools-03",
        "title": "명령 팔레트와 Markdown 나란히 미리보기",
        "description": "앞서 본 README를 열고 원문과 미리보기를 나란히 비교하는 준비된 예시입니다. Ctrl+K 다음 V는 Windows 기본 키입니다.",
        "scene": "vscode",
        "code": "Ctrl+Shift+P → Keyboard Shortcuts 검색\nEsc → README.md로 돌아가기\nCtrl+K 다음 V → 미리보기 옆에 열기\nREADME 제목 한 줄 수정 → 표시 확인 → Ctrl+S",
        "language": "text",
        "output": "명령 팔레트: 기능 이름으로 찾기\n왼쪽 원문 / 오른쪽 미리보기: 제목과 목록 비교\n수정 중 미리보기 반영 → 저장\n키가 다르면 현재 키보드 설정 확인",
        "focus": "ide",
        "fileName": "README.md · Command Palette",
        "files": [
          "README.md"
        ]
      },
      {
        "id": "ide-shortcut-practice",
        "title": "VS Code 단축키를 직접 눌러 보기",
        "description": "README를 찾고, 별도 HTML 연습 파일에서 줄 이동·복사·주석·저장을 확인합니다. 단축키는 Windows VS Code 기본값과 강사의 PyCharm 키맵을 기준으로 합니다.",
        "scene": "vscode",
        "code": "Ctrl+P → README.md\nCtrl+F → Git 찾기\nCtrl+Shift+V → Markdown 미리보기\n별도 HTML 연습 파일: Alt+↑/↓ → Shift+Alt+↓ → Ctrl+Z → Ctrl+/ → Ctrl+S",
        "language": "text",
        "output": "README에서 검색과 미리보기를 확인하고, 별도 연습 파일에서 줄과 주석이 바뀌는 모습을 확인합니다.",
        "focus": "ide",
        "fileName": "VS Code · 단축키 연습",
        "files": [
          "README.md",
          "shortcut-practice.html"
        ]
      },
      {
        "id": "tools-05",
        "title": "README 수정부터 GitHub 비교까지 한 화면에서 보기",
        "description": "같은 복제본에서 README를 저장하고 VS Code 소스 제어와 통합 터미널로 변경을 확인한 뒤 GitHub 원격 화면과 비교합니다.",
        "scene": "terminal",
        "code": "복제본 README.md 한 줄 수정 → Ctrl+S → Markdown 미리보기\nSource Control → README.md Diff 확인\npwd  # Windows PowerShell: Get-Location\ngit status --short\ngit diff README.md\nGitHub 저장소 새로고침 → 원격 README 확인",
        "language": "text",
        "output": "로컬 README의 변경은 소스 제어와 git diff에서 보입니다. GitHub에는 원격에 올라간 내용이 보이며 저장만으로 자동 반영되지 않습니다.",
        "focus": "terminal",
        "fileName": "VS Code · 메모 복제본",
        "files": [
          "README.md",
          "note.txt"
        ]
      }
    ],
    "glossary": [
      {
        "term": "IDE",
        "definition": "편집·탐색·실행·디버깅 등 개발 작업을 연결하는 통합 개발 환경입니다. PyCharm은 Python 개발을 중심으로 구성됩니다."
      },
      {
        "term": "VS Code",
        "definition": "개인·상업 용도로 무료인 코드 편집기입니다. 내장 기능과 확장으로 디버깅·버전 관리 등 개발 작업을 연결합니다."
      },
      {
        "term": "키맵",
        "definition": "기능과 키보드·마우스 조합의 연결입니다. VSCode Keymap은 PyCharm에서 VS Code와 비슷한 조작을 제공하는 선택적 플러그인입니다."
      },
      {
        "term": "인터프리터",
        "definition": "Python 코드를 실행하는 프로그램입니다. 실제 실행 파일 경로가 프로젝트의 실행 환경을 확인하는 단서입니다."
      },
      {
        "term": "통합 터미널",
        "definition": "편집기나 IDE 내부에 표시되는 명령줄 창입니다. 현재 폴더와 사용하는 셸은 별도로 확인합니다."
      },
      {
        "term": "diff",
        "definition": "기준과 현재 내용 사이의 차이를 보여 주는 비교입니다. 요청한 변경과 예상 밖 변경을 확인할 때 사용합니다."
      },
      {
        "term": "Source Control",
        "definition": "VS Code에서 변경을 확인하고 버전 관리 작업을 연결하는 화면입니다. 파일 저장·커밋·원격 공유는 구분합니다."
      }
    ],
    "references": [
      {
        "title": "VS Code Docs · 무료 사용과 코드 편집기·IDE의 구분",
        "url": "https://code.visualstudio.com/docs/supporting/faq"
      },
      {
        "title": "VS Code Docs · 운영체제별 기본 단축키",
        "url": "https://code.visualstudio.com/docs/reference/default-keybindings"
      },
      {
        "title": "VS Code Docs · 키보드 단축키 확인과 사용자 설정",
        "url": "https://code.visualstudio.com/docs/configure/keybindings"
      },
      {
        "title": "VS Code Docs · Git 및 Source Control 개요",
        "url": "https://code.visualstudio.com/docs/sourcecontrol/overview"
      },
      {
        "title": "VS Code Docs · GitHub 연동과 확장 기능",
        "url": "https://code.visualstudio.com/docs/sourcecontrol/github"
      },
      {
        "title": "JetBrains Docs · 통합 PyCharm의 무료 핵심 기능과 Pro 범위",
        "url": "https://www.jetbrains.com/help/pycharm/unified-pycharm.html"
      },
      {
        "title": "JetBrains Docs · VS Code에서 이전하기와 VSCode Keymap",
        "url": "https://www.jetbrains.com/help/pycharm/migrating-from-vsc-to-pycharm.html"
      },
      {
        "title": "JetBrains Docs · 키맵과 단축키 설정",
        "url": "https://www.jetbrains.com/help/pycharm/configuring-keyboard-and-mouse-shortcuts.html"
      },
      {
        "title": "JetBrains Docs · Python 인터프리터 확인",
        "url": "https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html"
      },
      {
        "title": "Python Docs · 가상환경과 실행 파일 직접 지정",
        "url": "https://docs.python.org/3/library/venv.html"
      },
      {
        "title": "참고한 공개 핸드북 · HTML 구조",
        "url": "https://vibe.onebitefe.com/lessons/s05-c02-html-layout"
      },
      {
        "title": "참고한 공개 핸드북 · CSS로 꾸미기",
        "url": "https://vibe.onebitefe.com/lessons/s05-c04-css"
      },
      {
        "title": "VS Code Windows 설치",
        "url": "https://code.visualstudio.com/docs/setup/windows"
      },
      {
        "title": "VS Code 표시 언어",
        "url": "https://code.visualstudio.com/docs/configure/locales"
      },
      {
        "title": "VS Code HTML 미리보기",
        "url": "https://code.visualstudio.com/docs/languages/html"
      },
      {
        "title": "PyCharm 설치",
        "url": "https://www.jetbrains.com/help/pycharm/installation-guide.html"
      }
    ],
    "closing": "VS Code에서 메모 복제본의 README를 검색하고 미리보기로 확인했습니다. 강사의 키맵과 편집 단축키를 살펴보고, 통합 터미널과 Git으로 변경을 확인했습니다. 다음 주제에서는 이 작업대를 이용해 별도의 강의 카드를 직접 만듭니다.",
    "presentation": {
      "caseSummary": "실제 VS Code 화면에서 README와 프로젝트 파일을 먼저 살펴봅니다. 이어 제목을 수정하고 저장한 뒤 소스 제어의 README 변경 목록과 Diff를 확인합니다. 저장·커밋·push는 각각 다른 단계입니다.",
      "demo": {
        "program": "VS Code · 강사의 PyCharm",
        "file": "메모 프로젝트 git-practice 또는 pull한 git-practice-clone의 README.md",
        "command": "README 변경 사례 시연: 수정·저장 → 소스 제어 → Diff 확인\nVS Code 설치·기본 설정 → 메모 복제본 폴더 열기\nREADME 검색·미리보기 → 강사의 PyCharm VSCode Keymap 화면 확인\n공통 단축키로 찾기·줄 이동·주석·저장 연습\n통합 터미널·Git에서 문서 변경 확인",
        "expectedResult": "README를 열고 미리보며 단축키와 통합 터미널, Git의 변경 비교를 실습합니다.",
        "durationMinutes": 6
      },
      "returnSummary": "VS Code에서 문서와 변경 사항을 확인했습니다. 다음 주제에서 익숙해진 작업대로 웹 카드를 직접 작성합니다."
    }
  },
  "web-tools": {
    "id": "web-tools",
    "number": 7,
    "title": "웹 화면을 간결하게: Tailwind CSS와 Alpine.js",
    "shortTitle": "Tailwind·Alpine",
    "subtitle": "같은 강의 카드의 CSS와 JavaScript를 도구로 다시 표현합니다",
    "icon": "code",
    "durationMinutes": 30,
    "case": {
      "kind": "example",
      "title": "같은 카드를 더 간결하게 바꿀 수 있을까요?",
      "body": "### 이미 만든 카드를 다시 봅니다\n\n앞에서 HTML·CSS·JavaScript로 Git 강의 카드를 만들었습니다. 같은 화면을 유지하면서 CSS의 카드 모양을 Tailwind 클래스로, JavaScript의 버튼 동작을 Alpine 속성으로 다시 표현합니다. 수업용 비교 예시이며 실제 Codex 응답을 재현한 것은 아닙니다.\n\n카드의 내용은 같지만 도구를 적용하는 방법과 필요한 준비가 달라집니다. 먼저 [두 카드 비교 화면](./examples/course-card/template-preview.html)을 열고 각각의 버튼을 눌러 봅니다.",
      "question": "같은 카드에서 모양과 클릭 동작을 각각 어디에 표현할 수 있을까요?"
    },
    "objectives": [
      "기존 CSS와 Tailwind 클래스가 같은 화면의 모양을 어떻게 표현하는지 비교한다.",
      "버튼 클릭을 직접 작성한 JavaScript와 Alpine의 상태·이벤트·표시로 비교한다.",
      "준비된 파일과 실제 프로젝트에서 추가로 필요한 빌드·라이브러리 설정을 구분한다."
    ],
    "sections": [
      {
        "id": "frontend-css",
        "title": "같은 강의 카드에 Tailwind CSS 적용하기",
        "minutes": 15,
        "optional": false,
        "body": "### 같은 카드를 다른 방식으로 꾸밉니다\n\n앞에서 완성한 [직접 작성한 CSS·JavaScript 카드](./examples/course-card/03-javascript/index.html)는 그대로 둡니다. [Tailwind CSS 카드](./examples/course-card/04-tailwind/index.html)를 열면 내용과 버튼 동작은 같고, 모양을 적는 방법만 달라집니다. 두 버튼을 눌러 확인하세요.\n\n이 예제는 수업용으로 **미리 생성한 Tailwind CSS 3 파일**을 사용합니다. 인터넷이나 Node 설치 없이도 제공된 예제를 열 수 있습니다. 새 클래스가 모두 들어 있는 파일은 아니므로 여기서 안내한 클래스만 보장합니다. [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP**으로 전체 소스를 받거나 앞에서 배운 clone으로 가져옵니다. 압축을 풀고 `public/examples/course-card` 폴더를 별도 위치에 복사해 VS Code로 열면 기존 파일을 덮어쓰지 않습니다.\n\n### 1. 직접 작성한 CSS 다시 보기\n\n```css\n.card {\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\n```\n\n`style.css`에서 `.card`라는 이름을 정해 HTML 카드와 연결했습니다. 같은 화면을 Tailwind의 작은 유틸리티 클래스로 표현할 수도 있습니다.\n\n### 2. 준비된 Tailwind CSS를 연결하기\n\n복사한 폴더의 `04-tailwind/index.html`을 엽니다. 다음 경로에서 `..`은 **현재 폴더의 부모 폴더**이며, `static/course.css`에 준비된 CSS가 있어야 합니다. 이 파일은 Node로 서버를 실행하는 명령이 아니라 브라우저가 불러오는 스타일 파일입니다.\n\n```html\n<link rel=\"stylesheet\" href=\"../static/course.css\">\n<script defer src=\"../03-javascript/script.js\"></script>\n```\n\n`script.js`는 이전 단계에서 만든 JavaScript를 그대로 사용합니다. 이번 단계에서는 버튼 동작을 바꾸지 않고 모양만 바꿉니다.\n\n### 3. 클래스가 하는 일 읽기\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\" class=\"cursor-pointer px-3 py-2\" aria-expanded=\"false\">설명 보기</button>\n  <p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n`p-6`은 안쪽 여백, `rounded-xl`은 둥근 모서리, `bg-white`는 흰 배경입니다. `max-w-80`은 최대 폭을 제한합니다. Tailwind 3의 기본 설정과 브라우저 기본 글자 크기 16px을 사용하면 `p-6`은 24px입니다. 사용 중인 테마나 루트 글자 크기를 바꾸면 결과도 달라질 수 있습니다.\n\n**직접 확인:** `p-6`을 미리 준비된 `p-8`로 바꾸고 저장한 뒤 브라우저를 새로고침합니다. 같은 조건에서 안쪽 여백이 24px에서 32px로 커집니다. 비교 후 `p-6`으로 되돌립니다. 변경할 곳을 못 찾으면 카드의 `article`에 있는 `p-6`인지 확인합니다.\n\n### 4. 편한 점과 준비할 점\n\nHTML을 읽으면서 색·간격을 한곳에서 조합하기 쉽지만, 클래스 이름을 익혀야 하고 긴 클래스 목록은 읽기 어려울 수 있습니다. 이 수업의 `static/course.css`에는 일부 클래스만 미리 생성해 두었습니다. **임의의 새 클래스를 입력한다고 자동으로 추가되지 않습니다.** 실제 프로젝트에서는 사용하는 소스 경로와 Tailwind 버전에 맞는 빌드 설정이 필요합니다. Tailwind Play CDN은 간단한 개발 실험용이며 운영 배포용이 아닙니다. [Tailwind 공식 안내](https://tailwindcss.com/docs/installation/play-cdn)\n\n다음 절에서는 여기에 남아 있는 JavaScript 클릭 동작을 Alpine.js로 바꾸어 봅니다.",
        "presentationPoints": [
          "기존 CSS 카드와 같은 모양을 Tailwind 클래스로 표현합니다.",
          "준비된 CSS에서 p-6을 p-8로 바꿔 여백을 확인합니다.",
          "새 클래스는 Tailwind 설정에 맞춰 CSS를 생성해야 합니다."
        ]
      },
      {
        "id": "frontend-alpine",
        "title": "같은 버튼 동작을 Alpine.js로 바꾸기",
        "minutes": 15,
        "optional": false,
        "body": "### 버튼 동작을 다시 살펴봅니다\n\n이전 `03-javascript/script.js`는 버튼을 찾고 클릭할 때 설명의 숨김 상태와 `aria-expanded`를 바꿨습니다. Alpine.js는 **브라우저에서 실행되는 JavaScript 도구**로, HTML 속성에 상태·이벤트·표시 조건을 적어 작은 상호작용을 연결하도록 도와줍니다. JavaScript를 몰라도 모든 기능이 자동으로 생기거나 JavaScript 자체가 없어지는 것은 아닙니다.\n\n### 1. 이전 JavaScript를 확인합니다\n\n```javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n```\n\n직접 쓴 코드는 각 단계를 분명히 볼 수 있습니다. Alpine을 사용한 파일은 같은 목적을 다른 형식으로 표현합니다.\n\n### 2. Alpine이 준비된 같은 카드 열기\n\n[Alpine 카드](./examples/course-card/05-alpine/index.html)를 열거나 복사한 `05-alpine/index.html`을 VS Code에서 확인합니다. 이 파일에는 직접 작성한 `script.js` 대신 **이미 준비한 Alpine 파일 하나**를 연결합니다. HTML 한 파일만 다른 곳에 옮기면 상대 경로가 달라져 실행되지 않으므로 `course-card` 폴더 전체를 유지합니다.\n\n```html\n<link rel=\"stylesheet\" href=\"../static/course.css\">\n<script defer src=\"../static/alpine.js\"></script>\n```\n\n### 3. 상태·클릭·표시를 한 줄씩 읽기\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n  <h1>Git</h1>\n  <button type=\"button\" class=\"cursor-pointer px-3 py-2\"\n    @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n  <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n- `x-data`: 이 카드의 `open` 상태를 만들고 처음에는 `false`로 둡니다.\n- `@click`: 버튼을 누를 때 `open`을 반대로 바꿉니다.\n- `x-show`: `open`이 참이면 설명을 보여 주고 거짓이면 숨깁니다.\n- `:aria-expanded`: 펼침 여부를 보조 기술에도 전달합니다. `x-cloak`은 초기 로딩 중 내용이 잠깐 보이는 것을 막으며, 준비된 CSS의 `[x-cloak]` 규칙이 필요합니다.\n\n### 4. 직접 눌러 확인하기\n\n1. 처음에는 설명이 접혀 있는지 확인합니다.\n2. 버튼을 누르면 설명이 보이고 다시 누르면 접힙니다. 버튼에 초점을 둔 뒤 Enter와 Space로도 확인합니다.\n3. 브라우저를 새로고침하면 `open: false`에서 다시 시작합니다. 화면 상태를 DB에 저장한 것은 아닙니다.\n4. 복사한 파일에서 `open: false`를 `open: true`로 바꾸고 저장·새로고침하면 처음부터 설명이 보입니다. 확인 후 `false`로 되돌립니다.\n\n버튼이 동작하지 않으면 `../static/alpine.js` 파일이 있는지, 이전 `script.js`와 Alpine을 동시에 연결하지 않았는지 확인합니다. Alpine을 적용할 수 있는지는 프로젝트에 따라 다르며, 복잡한 기능에서는 직접 작성한 JavaScript나 다른 도구가 더 나을 수도 있습니다. [Alpine 공식 시작 안내](https://alpinejs.dev/start-here)\n\n다음 주제에서는 브라우저에서 동작하는 이런 화면과 `npm run dev` 같은 개발 서버의 역할을 구분합니다.",
        "presentationPoints": [
          "기존 JavaScript의 클릭·숨김·접근성 상태를 다시 봅니다.",
          "Alpine의 x-data·클릭·x-show가 같은 카드의 동작을 연결합니다.",
          "클릭·키보드·새로고침과 파일 경로를 직접 확인합니다."
        ]
      },
      {
        "id": "frontend-bonus",
        "title": "보충: 클래스가 개발 화면에만 보일 때",
        "minutes": 5,
        "optional": true,
        "body": "### Tailwind 3 빌드에서 찾아야 할 문자열\n\nTailwind 3는 설정된 content 경로의 파일을 읽고 발견한 클래스에 해당하는 CSS를 만듭니다. `bg-${color}-500`처럼 런타임에 문자열을 이어 붙여 최종 클래스가 소스에 통째로 나타나지 않으면 기대한 CSS가 생성되지 않을 수 있습니다. 상태별로 `bg-teal-500`, `bg-slate-500`처럼 완전한 클래스 문자열을 적은 매핑을 사용하면 의도를 분명히 할 수 있습니다. 프로젝트가 3.x인지 4.x인지 먼저 확인하고 설치 안내를 섞지 않습니다.\n\n서버 템플릿 예제라면 Tailwind 3의 content 경로가 `./templates/**/*.html` 같은 실제 템플릿 파일을 포함하는지도 확인합니다. 준비된 static/course.css는 이 예제에서 쓰는 클래스를 포함한 결과물이라는 전제입니다. CSS 생성 설정과 실제 응답에 담긴 class를 따로 대조합니다. 무조건 모든 클래스를 safelist에 넣으면 원인을 가릴 수 있습니다.\n\nAlpine의 일반 상태는 새로고침하면 초기값으로 돌아옵니다. 학습 완료나 최근 위치를 유지하려면 저장 로직 또는 저장용 플러그인처럼 별도의 수단이 필요합니다. 상태가 사라졌다는 현상을 클릭 연결 오류와 혼동하지 않습니다. 이번의 카드 펼치기는 서버 저장 기능이 아닙니다.\n\n**보충 과제:** 카드의 완료 상태에 따라 두 가지 완전한 클래스 문자열을 고르고, 새로고침 전후 무엇이 유지되어야 하는지 글로 정합니다. [Tailwind 3 content 설정](https://v3.tailwindcss.com/docs/content-configuration)을 읽고 준비된 설정과 비교합니다."
      }
    ],
    "steps": [
      {
        "id": "frontend-02",
        "title": "기존 카드 CSS 읽기",
        "description": "같은 Git 카드의 style.css에서 여백과 모서리를 다시 봅니다.",
        "scene": "code",
        "code": ".card { padding: 24px; border-radius: 12px; background: white; }",
        "language": "css",
        "output": ".card는 HTML에 붙인 클래스이며, 각 속성은 카드의 모양을 지정합니다.",
        "focus": "frontend",
        "fileName": "02-css/style.css",
        "files": [
          "02-css/index.html",
          "02-css/style.css"
        ]
      },
      {
        "id": "frontend-03",
        "title": "Tailwind 카드 여백 바꾸기",
        "description": "미리 생성한 Tailwind CSS 3에 포함된 p-6과 p-8을 비교합니다.",
        "scene": "browser",
        "code": "<article class=\"max-w-80 rounded-xl bg-white p-6\">\n  <h1>Git</h1>\n</article>\n<!-- p-6 → p-8 -->",
        "language": "html",
        "output": "기본 테마·루트 16px에서 카드 여백 24px → 32px. 새로고침 후 확인합니다.",
        "focus": "frontend",
        "fileName": "04-tailwind/index.html",
        "files": [
          "04-tailwind/index.html",
          "static/course.css"
        ]
      },
      {
        "id": "frontend-06",
        "title": "직접 작성한 클릭 동작 확인",
        "description": "기존 JavaScript가 버튼 클릭과 화면의 숨김 상태를 연결합니다.",
        "scene": "code",
        "code": "button.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});",
        "language": "javascript",
        "output": "클릭마다 설명의 숨김 상태와 aria-expanded가 바뀝니다.",
        "focus": "frontend",
        "fileName": "03-javascript/script.js",
        "files": [
          "03-javascript/index.html",
          "03-javascript/script.js"
        ]
      },
      {
        "id": "frontend-08",
        "title": "Alpine으로 펼치기 연결",
        "description": "준비된 Alpine과 x-cloak CSS를 사용하는 같은 카드입니다.",
        "scene": "browser",
        "code": "<article x-data=\"{ open: false }\">\n  <button @click=\"open = !open\" :aria-expanded=\"open.toString()\">설명 보기</button>\n  <p x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>",
        "language": "html",
        "output": "처음 접힘 → 클릭 후 펼침 → 다시 클릭하면 접힘. Enter·Space도 확인합니다.",
        "focus": "frontend",
        "fileName": "05-alpine/index.html",
        "files": [
          "05-alpine/index.html",
          "static/alpine.js",
          "static/course.css"
        ]
      }
    ],
    "pitfalls": [
      {
        "title": "파일을 하나만 복사하여 실행하기",
        "body": "상대 경로로 연결된 CSS와 Alpine 파일을 포함해 course-card 폴더 전체를 복사하고 실행합니다."
      },
      {
        "title": "준비된 CSS에 모든 클래스가 들어 있다고 생각하기",
        "body": "이 실습의 CSS는 일부 클래스만 미리 생성했습니다. 새로운 클래스에는 프로젝트에 맞는 빌드 과정이 필요합니다."
      },
      {
        "title": "두 클릭 코드를 동시에 실행하기",
        "body": "Alpine 카드에서는 이전 script.js를 함께 연결하지 않고 한 방식으로 버튼을 동작시킵니다."
      }
    ],
    "glossary": [
      {
        "term": "Tailwind CSS",
        "definition": "작은 스타일 기능을 클래스로 조합하는 CSS 프레임워크입니다."
      },
      {
        "term": "Alpine.js",
        "definition": "HTML에 적은 상태·이벤트·표시 조건을 브라우저에서 실행하도록 연결하는 JavaScript 도구입니다."
      },
      {
        "term": "CDN",
        "definition": "인터넷을 통해 파일을 내려받는 방법입니다. 이 실습 예제는 준비된 로컬 파일을 씁니다."
      }
    ],
    "checklist": [
      "준비된 CSS와 Alpine 파일의 상대 경로를 확인할 수 있다.",
      "같은 카드의 기존 CSS와 Tailwind 클래스가 담당하는 모양을 비교할 수 있다.",
      "버튼의 클릭과 표시 상태를 직접 작성한 JavaScript와 Alpine으로 비교할 수 있다."
    ],
    "closing": "같은 카드의 모양과 동작을 Tailwind와 Alpine으로 표현했습니다. 다음에는 화면이 브라우저에서 실행되는 방식과 개발 서버의 역할을 알아봅니다.",
    "references": [
      {
        "title": "Tailwind Play CDN 안내",
        "url": "https://tailwindcss.com/docs/installation/play-cdn"
      },
      {
        "title": "Alpine 시작 안내",
        "url": "https://alpinejs.dev/start-here"
      }
    ],
    "presentation": {
      "caseSummary": "기존 CSS·JavaScript 카드와 같은 화면을 Tailwind·Alpine으로 비교합니다. 내용은 그대로 두고 모양과 동작을 작성하는 방법을 바꿉니다.",
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "04-tailwind/index.html · 05-alpine/index.html · static/course.css · static/alpine.js",
        "command": "기존 카드와 04-tailwind 비교 → p-6을 p-8로 바꾸고 복구\n05-alpine에서 상태·클릭·표시 읽기 → 버튼·키보드·새로고침 확인",
        "expectedResult": "같은 Git 카드의 모양을 Tailwind 클래스로, 버튼 동작을 Alpine 상태와 속성으로 설명할 수 있습니다.",
        "durationMinutes": 5
      },
      "returnSummary": "HTML에 Tailwind 클래스와 Alpine 상태를 연결했습니다. 다음에는 화면이 실행되는 프론트엔드와 개발 서버를 살펴봅니다."
    }
  }
};
