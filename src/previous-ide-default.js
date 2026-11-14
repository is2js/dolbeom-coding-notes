// Exact IDE defaults shipped before the eight-topic split. Never edit user drafts in place.
export const previousIdeDefault = {
  "section": {
    "id": "codex-context",
    "title": "통합 터미널·Git·GitHub·Markdown을 한 흐름으로 보기",
    "minutes": 4,
    "optional": false,
    "body": "### 같은 프로젝트를 한 작업대에서 확인합니다\n\nVS Code의 탐색기에서 앞서 만든 메모 복제본의 README와 note.txt를 엽니다. Markdown 미리보기, 통합 터미널과 Source Control을 번갈아 보면서 각 도구의 역할을 짚어 봅니다. 터미널은 명령과 출력을 다루고, Git은 변경을 비교하고 기록하며, GitHub는 원격 저장소를 제공합니다.\n\n통합 PowerShell에서 `pwd`로 현재 위치를 보고 VS Code에서 연 폴더와 같은지 확인합니다. Windows PowerShell에서 `pwd`는 `Get-Location`의 기본 별칭입니다. Windows cmd에서는 인수 없는 `cd`, macOS/Linux 셸에서는 `pwd`를 사용합니다. 터미널을 편집기 안에서 열어도 현재 폴더는 직접 확인합니다.\n\nREADME를 한 줄 수정하고 저장한 다음, VS Code의 **Source Control**에서 변경된 파일과 전후 차이를 확인합니다. 저장, Git 커밋, GitHub push는 서로 다른 단계입니다. 파일을 실제로 Git으로 관리하려면 Git 설치가 필요하고, 일부 GitHub 기능에는 로그인이나 확장이 필요할 수 있습니다.\n\n**같이 확인:** README 원문과 미리보기 → 현재 폴더 → 수정한 줄의 diff 순서로 가리킵니다. 여기서 수정한 문서는 자동으로 GitHub에 올라가지 않습니다. 이어 별도 카드 폴더를 VS Code에서 열어 HTML을 작성합니다.",
    "presentationPoints": [
      "VS Code의 탐색기·미리보기·터미널·Source Control을 오가며 역할을 구분합니다.",
      "현재 폴더와 README의 수정 전후를 확인합니다.",
      "저장·커밋·GitHub push는 각각 별개의 단계입니다."
    ]
  },
  "step": {
    "id": "tools-05",
    "title": "문서·터미널·Git·GitHub 확인을 연결하기",
    "description": "복제본 README, 통합 PowerShell, Source Control의 변경 비교를 차례로 확인합니다. pwd는 Windows PowerShell의 Get-Location 기본 별칭입니다.",
    "scene": "terminal",
    "code": "README.md 열기 → Markdown 미리보기\npwd  # Windows PowerShell 기본 별칭; Get-Location\nSource Control → README 변경 비교\n\n파일 저장 → Git 커밋 → GitHub push",
    "language": "text",
    "output": "현재 폴더와 README 변경을 확인합니다.\n저장한 내용은 커밋과 push를 거쳐야 원격에 올라갑니다.",
    "focus": "terminal",
    "fileName": "VS Code · 메모 복제본",
    "files": [
      "README.md",
      "note.txt"
    ]
  },
  "metadata": {
    "title": "IDE: VS Code로 파일을 열고 웹 화면 만들기",
    "shortTitle": "IDE",
    "subtitle": "VS Code에서 README 변경 확인부터 HTML·CSS·JavaScript 화면 실습까지 연결하기",
    "icon": "code",
    "case": {
      "kind": "real",
      "title": "VS Code에서 README를 수정하고 Git 변경 내용 살펴보기",
      "body": "![VS Code에서 Git 연습 프로젝트의 README.md를 열어 제목, 준비물과 파일 안내를 살펴보는 강사 화면](./assets/course/ide-vscode-readme-case.png)\n\n### 어떤 화면인가요?\n\n위 이미지는 강사의 VS Code에서 `git-practice` 프로젝트의 `README.md`를 열어 둔 실제 화면입니다. 왼쪽 탐색기에 프로젝트의 `note.txt`, `branch-note.txt`, `README.md`가 보이고, 오른쪽 편집기에서 앞서 작성한 제목과 준비물, 파일 안내를 읽을 수 있습니다. 이미지를 클릭하면 크게 볼 수 있습니다.\n\n### 이어서 보여 줄 실습\n\n1. **README 열기와 수정:** VS Code에서 앞서 연습한 프로젝트 폴더의 `README.md`를 열고, 제목이나 소개 문장 한 곳을 바꿉니다. 이 예시처럼 원래 `git-practice`를 열 수도 있고, 앞에서 pull한 `git-practice-clone`을 사용할 수도 있습니다. 두 폴더는 별개이므로 현재 연 폴더를 먼저 확인합니다.\n2. **저장하고 변경 찾기:** `Ctrl+S`로 저장한 뒤 왼쪽의 **소스 제어(Source Control)** 아이콘을 누릅니다. Git이 관리하는 저장소라면 변경 목록에서 `README.md`를 확인할 수 있습니다.\n3. **변화 비교하기:** 변경 목록의 `README.md`를 선택하면 변경 전과 현재 내용을 비교하는 **Diff(차이)** 화면을 볼 수 있습니다. 추가하거나 바꾼 줄의 색과 내용을 살펴보며 어떤 문장이 달라졌는지 확인합니다. 스테이징 여부와 화면 설정에 따라 비교 기준이나 배치가 달라질 수 있습니다.\n\n첨부 이미지는 README를 편집기에서 연 장면입니다. 소스 제어와 Diff 화면은 이어지는 실제 시연에서 보여 줍니다. 파일을 **저장**한 것과 Git에 **커밋**하거나 GitHub에 **push**한 것은 각각 다른 단계이며, 지금은 변경을 살펴봅니다.\n\n이제 VS Code를 준비하고 README 검색·미리보기와 단축키를 연습한 뒤, HTML 화면도 직접 만들어 보겠습니다. [VS Code 소스 제어 안내](https://code.visualstudio.com/docs/sourcecontrol/overview)",
      "question": "README를 저장한 뒤 어떤 파일과 문장이 바뀌었는지 VS Code에서 어떻게 확인할까요?"
    },
    "objectives": [
      "VS Code를 설치하고 앞서 만든 복제본 폴더와 README를 연다.",
      "VS Code와 PyCharm 키맵을 비교하고 검색·미리보기·편집 단축키를 연습한다.",
      "VS Code에서 태그·속성·CSS 선언·클릭 흐름을 읽고 강의 카드에 HTML·CSS·JavaScript를 적용한다."
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
      "통합 터미널·Git·GitHub·Markdown의 역할과 저장·커밋·push 차이를 설명할 수 있다.",
      "VS Code에서 카드 HTML을 저장하고 브라우저에 표시할 수 있다."
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
      },
      {
        "term": "HTML",
        "definition": "웹 문서에 제목·버튼·문장 등 내용과 구조를 표현하는 언어입니다."
      },
      {
        "term": "CSS",
        "definition": "HTML 요소의 색상·여백·배치 등 시각적인 표현을 지정하는 언어입니다."
      },
      {
        "term": "JavaScript",
        "definition": "브라우저에서 클릭 등의 사건에 반응하고 화면을 변경하는 프로그램을 작성하는 언어입니다."
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
    "closing": "VS Code에서 메모 복제본의 README를 검색하고 미리보기로 확인했습니다. VS Code의 확장 가능한 편집기와 Python 중심 IDE PyCharm을 비교하고 강사의 단축키 설정을 살펴보고 찾기·줄 이동·주석·저장을 연습했습니다. 별도의 강의 카드 폴더에서는 VS Code로 HTML·CSS·JavaScript를 차례로 작성했습니다. 다음에는 이 카드가 프론트엔드에 속하는 이유와 백엔드와의 관계를 살펴봅니다.",
    "presentation": {
      "caseSummary": "실제 VS Code 화면에서 README와 프로젝트 파일을 먼저 살펴봅니다. 이어 제목을 수정하고 저장한 뒤 소스 제어의 README 변경 목록과 Diff를 확인합니다. 저장·커밋·push는 각각 다른 단계입니다.",
      "demo": {
        "program": "VS Code · 강사의 PyCharm · 브라우저",
        "file": "메모 프로젝트 git-practice 또는 pull한 git-practice-clone의 README.md · 별도 연습 폴더의 index.html, style.css, script.js",
        "command": "README 변경 사례 시연: 수정·저장 → 소스 제어 → Diff 확인\nVS Code 설치·기본 설정 → 메모 복제본 폴더 열기\nREADME 검색·미리보기 → 강사의 PyCharm VSCode Keymap 화면 잠깐 확인\n공통 단축키로 찾기·줄 이동·주석·저장 연습\nREADME 저장 후 통합 터미널·Git 변경 비교\nVS Code에서 별도 카드 폴더 열기 → index.html 저장·미리보기\nstyle.css 작성·연결 → 24px 여백 확인\nscript.js 작성·연결 → 버튼과 Enter·Space로 펼치기·접기",
        "expectedResult": "편집기를 준비해 앞서 만든 README를 확인합니다. 동일한 Git 강의 카드가 HTML 구조, CSS 모양, JavaScript 클릭 동작을 차례로 갖추며 각 도해와 실제 파일의 연결을 설명할 수 있습니다.",
        "durationMinutes": 8
      },
      "returnSummary": "IDE에서 파일과 실행 결과를 확인하고, 같은 카드에 HTML 구조·CSS 모양·JavaScript 동작을 차례로 더했습니다. 다음은 이 실습과 프론트엔드의 관계, 백엔드와의 연결입니다."
    }
  }
};
