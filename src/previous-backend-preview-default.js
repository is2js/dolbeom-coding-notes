// Published defaults before the backend lesson became a future course.
export const previousBackendPreview = [
  {
    "id": "web",
    "number": 8,
    "title": "프론트엔드: 브라우저 화면과 개발 서버 이해하기",
    "shortTitle": "프론트엔드",
    "subtitle": "앞서 만든 웹 카드부터 AI가 안내한 npm 개발 서버까지 연결하기",
    "icon": "layers",
    "durationMinutes": 42,
    "case": {
      "kind": "real",
      "title": "AI가 알려준 npm 명령은 왜 실행할까요?",
      "body": "### 강사가 터미널에서 개발 서버를 실행하는 모습\n\n아래 움짤은 강사가 강의노트 프로젝트 폴더로 이동한 뒤 `npm run dev`를 입력하고, 브라우저에서 확인할 로컬 주소와 Vite 도움말을 살펴보는 실제 화면입니다.\n\n![강사가 강의노트 폴더에서 npm run dev로 Vite 서버를 열고 h와 Enter로 도움말을 확인하는 터미널 화면](./assets/course/frontend-vite-terminal.gif)\n\n첫 터미널 강의에서 AI가 사이트 결과물과 함께 `npm install`, `npm run dev`를 안내한 장면을 보았습니다. 이제 그 명령을 읽는 데 이어 **직접 실행하고 결과를 확인**하겠습니다. 영상의 프로젝트는 이 강의노트이고, 이어지는 카드 실습에서는 우리가 준비한 강의 카드 폴더를 사용합니다.\n\n![AI가 사이트 결과물을 ZIP으로 제공하고 npm install과 npm run dev를 안내한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n### 명령이 서버를 여는 과정\n\n터미널에서 `npm run dev`를 입력하면 npm이 해당 프로젝트의 `package.json`에 있는 `scripts.dev`를 찾아 그 값을 실행합니다. 영상에서 그 명령은 **Vite 개발 서버**를 시작합니다. 포트는 실행 명령의 옵션이나 Vite 설정 등으로 정해집니다. 이 강의노트 영상에서는 `127.0.0.1:5188`이 표시되며, 이어서 사용할 카드 예제는 설정에 따라 다른 포트를 사용할 수 있습니다.\n\n서버가 준비되면 터미널에 보이는 **Local 주소**를 브라우저에서 엽니다. `127.0.0.1`은 내 컴퓨터를 가리키고 콜론 뒤의 숫자는 접속할 포트입니다. 서버를 실행한 터미널은 켜 둡니다.\n\n### Vite 도움말 보기\n\n영상처럼 Vite가 실행 중인 **같은 터미널**에 `h`를 누른 뒤 `Enter`를 누르면 사용할 수 있는 단축 명령이 표시됩니다. 이것은 Vite가 대화형 터미널에서 제공하는 도움말입니다. 영상에서는 `r`로 서버 재시작, `u`로 주소 표시, `o`로 브라우저 열기, `c`로 터미널 화면 정리, `q`로 종료할 수 있다고 안내합니다. 각 글자를 누른 뒤 `Enter`를 눌러 사용합니다. 종료할 때는 `Ctrl+C`도 사용할 수 있습니다.\n\n단축 명령은 실행 중인 도구와 버전에 따라 달라집니다. 다른 서버나 일반 PowerShell 프롬프트에서는 같은 도움말이 나오지 않을 수 있으므로, 그 화면에 표시된 안내를 먼저 확인합니다.\n\n### 오늘 확인할 순서\n\n앞에서 만든 카드가 브라우저에서 동작하는 프론트엔드라는 점을 살펴보고, `package.json`의 `dev`가 어떤 명령을 실행하는지 읽습니다. Live Server로 열어 본 같은 카드를 Vite 개발 서버로도 직접 실행하고, 터미널의 주소와 도움말을 확인합니다. 이어 브라우저 화면과 백엔드의 요청·응답으로 넘어갑니다.",
      "question": "브라우저에 보이는 카드와 npm 개발 서버는 각각 어떤 일을 할까요?"
    },
    "objectives": [
      "HTML·CSS·JavaScript와 Tailwind·Alpine이 브라우저 화면에서 하는 일을 말한다.",
      "Live Server로 카드의 로컬 주소를 열고 저장 후 화면 변화를 확인한다.",
      "카드 폴더의 package.json을 읽고 npm install과 npm run dev로 Vite를 실행한 뒤 도움말을 확인한다.",
      "FastAPI가 파일과 API를 함께 제공하는 경우 사용하는 서버 주소를 구분한다.",
      "React·Vue와 백엔드의 FastAPI·Flask·Django·Spring의 역할을 구분한다."
    ],
    "sections": [
      {
        "id": "web-map",
        "title": "프론트엔드란? 브라우저에서 보이고 움직이는 화면",
        "minutes": 12,
        "optional": false,
        "body": "### 앞서 만든 강의 카드가 프론트엔드입니다\n\n사용자가 보고 누르는 화면과 브라우저 쪽 상호작용을 **프론트엔드**라고 부릅니다. 앞선 카드의 `index.html`은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. Tailwind CSS와 Alpine.js는 각각 모양과 동작을 작성할 때 도움을 주는 도구입니다. 이들이 실행된 결과는 브라우저에서 확인합니다.\n\n```text\nHTML: 제목·버튼·설명\nCSS / Tailwind CSS: 카드 여백·색\nJavaScript / Alpine.js: 설명 펼치기\n                 ↓\n           브라우저의 화면\n```\n\n프론트엔드는 HTML·CSS·JavaScript와 별개의 언어가 아니라, 이런 기술로 만드는 **사용자 쪽 영역**을 가리킵니다. 앞에서 작성한 간단한 카드처럼 기본 기술만으로 화면을 만들 수도 있습니다.\n\n### 더 큰 화면을 만들 때 만나는 이름\n\n- **React**는 버튼·카드처럼 다시 사용할 수 있는 화면 조각인 **컴포넌트**로 UI를 만드는 JavaScript 라이브러리입니다.\n- **Vue**는 컴포넌트와 상태를 이용해 UI를 만드는 JavaScript 프레임워크입니다.\n\n둘은 각각 화면을 구성하는 방법을 제공하며 HTML·CSS·JavaScript의 기초가 사라지는 것은 아닙니다. 이 강의에서 React나 Vue를 설치·실습하지는 않습니다. [React 소개](https://react.dev/learn) · [Vue 소개](https://vuejs.org/guide/introduction.html)\n\n### Vite는 React·Vue와 어떻게 다를까요?\n\n**React·Vue는 화면을 구성하는 도구**, **Vite는 개발할 때 화면을 제공하고 배포할 파일을 만드는 도구**입니다. 예를 들어 React 화면을 만들면서 Vite 개발 서버로 확인할 수 있습니다. Vue와 Vite도 함께 쓸 수 있고, React나 Vue 없이 우리가 만든 HTML·CSS·JavaScript 카드에도 Vite를 사용할 수 있습니다. React나 Vue 프로젝트가 모두 Vite를 쓰는 것은 아닙니다. [Vite 소개](https://vite.dev/guide/)\n\n**직접 확인:** 앞에서 만든 카드의 버튼을 눌러 보고, 제목·모양·동작이 어디에서 왔는지 짚습니다. 이어 같은 카드를 여는 Live Server와 Vite를 비교합니다.",
        "presentationPoints": [
          "앞서 만든 카드의 구조·모양·클릭 동작은 프론트엔드입니다.",
          "React는 UI 라이브러리, Vue는 UI 프레임워크입니다.",
          "Vite는 개발 서버·빌드 도구이며 React·Vue와 함께 쓸 수 있습니다."
        ]
      },
      {
        "id": "web-http",
        "title": "같은 카드로 Live Server와 Vite 비교하기",
        "minutes": 20,
        "optional": false,
        "body": "### 1. 우리가 만든 카드를 Live Server로 실행하기\n\n앞에서 VS Code로 만든 `index.html`, `style.css`, `script.js`를 다시 봅니다. VS Code의 **Live Server 확장**으로 카드 폴더의 `index.html`을 우클릭하고 **Open with Live Server**를 선택합니다. 예를 들어 `http://127.0.0.1:5500/`이 열립니다. 주소와 포트는 설정에 따라 달라질 수 있습니다.\n\n**직접 시연:** 카드 제목을 바꾸고 저장해 브라우저의 변화를 확인한 뒤 원래대로 되돌립니다. Live Server는 저장된 HTML·CSS·JavaScript를 로컬 주소로 제공하고 변경 시 브라우저를 새로고침합니다. 이 단순 카드 실습에는 Node.js와 npm이 필요하지 않습니다. [Live Server 확장 안내](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n\n### 2. 같은 카드가 Vite 프로젝트에 있다면?\n\n앞에서 사용한 `git-practice/course-card/03-javascript` 폴더에서 같은 카드 실습을 이어갑니다. [강의 카드 Vite 예제 저장소](https://github.com/is2js/course-card-vite-example)는 설정을 읽어 볼 참고 자료입니다. 이 저장소를 따로 복제하지 않아도 됩니다. 수업에서는 방금 Live Server로 열어 본 카드를 Vite로도 직접 실행합니다. `03-javascript`에 `package.json`이 이미 있는지 먼저 확인하세요. 기존 파일은 덮어쓰지 않고 그 안의 `scripts`와 의존성을 살펴봅니다.\n\n```text\ncourse-card-vite-example/  ← Vite 예제 저장소\n├─ index.html               ← 화면의 구조\n├─ style.css                ← 화면의 모양\n├─ script.js                ← 버튼 동작\n├─ package.json             ← 프로젝트와 실행 작업 설정\n└─ package-lock.json        ← 설치되는 패키지 버전의 구체적인 기록\n```\n\nHTML·CSS·JavaScript는 앞에서 직접 만들었습니다. 위 파일 구조와 아래 설정은 참고 저장소의 예시이며, 실제 카드 실습은 `git-practice/course-card/03-javascript`에서 이어갑니다.\n\n**`package.json`: 프로젝트의 약속**\n\n정확한 파일 이름은 **`package.json`**입니다. 프로젝트 이름, 필요한 패키지와 실행 작업을 기록합니다. 아래는 참고 저장소의 예제 파일 전체입니다. `03-javascript`에서 직접 만들 경우 기존 파일이 없을 때만 새로 만듭니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite --host 127.0.0.1 --port 5173\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"6.4.1\"\n  }\n}\n```\n\n- `name`과 `version`은 이 프로젝트를 구분하는 이름과 버전입니다. 이 예제의 이름은 `course-card-vite-demo`입니다.\n- `private: true`는 이 프로젝트가 npm 패키지 저장소에 실수로 게시되는 것을 막는 설정입니다. GitHub 저장소의 공개 여부와는 별개입니다.\n- `type: \"module\"`은 Node.js가 이 프로젝트의 `.js` 파일을 기본적으로 ES 모듈 방식으로 해석하도록 하는 설정입니다.\n- `scripts`는 프로젝트에서 사용할 작업 목록입니다. 그 안의 `dev`는 작업의 이름이며, `npm run dev`를 입력하면 오른쪽에 적힌 `vite --host 127.0.0.1 --port 5173`이 실행됩니다. `--host`는 접속할 주소, `--port`는 포트를 지정합니다.\n- `devDependencies`는 개발에 필요한 패키지 목록입니다. 여기서는 Vite `6.4.1`을 지정했고, `npm install`이 이 설정을 읽어 패키지를 준비합니다.\n- `dev`의 내용은 프로젝트 작성자가 정하므로 다른 도구를 실행하거나 이 항목이 없을 수도 있습니다. AI가 `npm run dev`를 안내하면 해당 프로젝트의 `scripts.dev`부터 살펴봅니다. [npm 스크립트 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### `npm run dev`를 한 단어씩 읽기\n\n```text\nnpm       run       dev\n도구 이름   실행하기    작업 이름\n```\n\n- `npm`은 Node.js와 함께 사용하는 패키지 관리 도구입니다. 필요한 도구를 설치하고 프로젝트에 등록된 작업을 실행합니다.\n- `run`은 `package.json`의 `scripts`에 적힌 작업을 찾아 실행하라는 뜻입니다.\n- `dev`는 실행할 작업의 이름입니다. 흔히 개발을 뜻하는 development의 줄임말로 쓰며, 파일의 `scripts` 안에서 `\"dev\"`라는 이름을 찾습니다.\n\n작업 이름 없이 `npm run`만 입력하면 이 프로젝트에서 사용할 수 있는 스크립트 목록을 볼 수 있습니다. 먼저 예제의 `scripts`를 읽고 이어서 직접 실행해 봅니다.\n\n이 예제에서 `npm run dev`가 하는 일은 **`scripts`의 `dev` 값을 읽고 `vite --host 127.0.0.1 --port 5173`을 실행하는 것**입니다. 명령어의 `dev` 자체가 서버 프로그램의 이름은 아닙니다. 실제로 어떤 프로그램을 실행할지는 오른쪽 값이 결정합니다. 예를 들어 `\"dev\": \"다른 명령\"`이라면 그 다른 명령이 실행됩니다. `dev`가 없다면 npm은 해당 작업을 찾지 못했다는 오류를 표시합니다.\n\n**강사가 따라 읽는 순서**\n\n1. 터미널에서 프로젝트 폴더로 이동합니다. 이 폴더의 `package.json`을 확인합니다.\n2. `scripts` 안에서 `dev`를 찾고 콜론 오른쪽에 적힌 명령을 읽습니다.\n3. 이 예제의 `vite`는 Vite 개발 서버를 시작합니다. `--host 127.0.0.1`은 내 컴퓨터에서 접속할 주소, `--port 5173`은 문을 구별하는 포트 번호입니다.\n4. 서버가 실행되는 동안 터미널을 켜 두고 표시된 주소를 브라우저에서 엽니다. 보통 터미널에서 `Ctrl+C`를 누르면 서버를 종료합니다.\n\n`npm install`은 패키지를 준비하는 단계이고, `npm run dev`는 준비된 프로젝트의 개발 작업을 실행하는 단계입니다. `npm run dev`가 패키지 설치까지 자동으로 대신하는 것은 아닙니다. 프로젝트에 필요한 Node.js와 패키지가 준비되지 않았다면 실행 중 오류가 날 수 있습니다. 이번 수업에서는 같은 카드를 Live Server와 Vite로 차례로 열어 확인합니다. [npm run 공식 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### 같은 강의 카드에서 Vite를 직접 실행하기\n\n아래 실습은 **강의노트 영상의 5188 서버와 별도로**, 앞에서 직접 만든 카드 폴더에서 진행합니다. 강의노트 서버를 켜 두더라도 카드의 Vite 서버는 다른 포트를 사용할 수 있습니다.\n\n1. VS Code에서 원본 `git-practice`를 열고 터미널을 엽니다. 아래 명령으로 카드 폴더에 이동하고 위치와 파일 목록을 확인합니다. 경로를 다르게 정했다면 실제 경로로 이동합니다.\n\n```powershell\ncd ~/git-practice/course-card/03-javascript\npwd\nls\nnode --version\nnpm --version\n```\n\n`cd`는 Windows PowerShell의 `Set-Location`, `pwd`는 `Get-Location`, `ls`는 `Get-ChildItem`의 기본 별칭입니다. cmd에서는 `cd /d %USERPROFILE%\\git-practice\\course-card\\03-javascript`, 인수 없는 `cd`, `dir`을 사용합니다. macOS/Linux 기본 셸에서는 `cd ~/git-practice/course-card/03-javascript`, `pwd`, `ls`를 사용합니다.\n\n2. `index.html`, `style.css`, `script.js`와 `package.json`을 확인합니다. `package.json`이 없다면 VS Code의 해당 폴더에 새 파일을 만들고 **위에서 본 전체 JSON**을 붙여넣어 저장합니다. 이미 있다면 덮어쓰지 않고 `scripts.dev`와 `devDependencies`를 먼저 확인합니다. 기존 설정이 다르면 아래 결과도 다를 수 있습니다.\n3. Node.js와 npm이 표시되고 예시의 Vite 6.4.1 설정을 준비했다면, 같은 카드 폴더에서 패키지를 설치하고 서버를 시작합니다. 설치에는 인터넷이 필요하며 `package-lock.json`이 만들어지거나 갱신될 수 있습니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n4. Vite가 준비되면 터미널에 표시된 **Local 주소**를 브라우저에서 엽니다. 위 예시 설정은 `127.0.0.1:5173`을 요청합니다. 5173이 이미 사용 중이면 다른 포트가 선택될 수 있으므로 실제 출력된 주소를 따릅니다. 카드 제목을 바꾸고 저장해 브라우저의 변화를 확인한 뒤 원하는 내용으로 돌려놓습니다.\n5. 서버가 실행 중인 **같은 터미널**에서 `h`를 누르고 `Enter`를 눌러 Vite 도움말을 확인합니다. 대화형 터미널에서 `r`은 재시작, `u`는 주소 표시, `o`는 브라우저 열기, `c`는 출력 정리, `q`는 종료입니다. 글자 뒤에 `Enter`를 누릅니다. 도구와 버전에 따라 목록은 달라질 수 있으며 비대화형 터미널에서는 나타나지 않을 수 있습니다.\n6. 시연을 마치면 `q` 후 `Enter` 또는 `Ctrl+C`로 **카드 Vite 서버**를 종료합니다. 강의노트 서버는 별도의 터미널과 포트를 사용합니다.\n\n`node`가 인식되지 않거나 설치 중 버전 오류가 나면 아래 Node.js 설치와 오류 해결 절을 먼저 확인합니다. 같은 이름의 파일을 임의로 덮어쓰거나 기존 `node_modules`를 지우지 않습니다.\n\n**`package-lock.json`: 설치 결과의 기록**\n\nnpm은 설치 과정에서 패키지와 하위 패키지의 구체적인 버전 등을 기록합니다. 아래는 실제 파일의 앞부분 중 프로젝트를 나타내는 부분만 **발췌**한 것입니다. 나머지 내용은 길어서 생략했습니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"lockfileVersion\": 3,\n  \"requires\": true,\n  \"packages\": {\n    \"\": {\n      \"name\": \"course-card-vite-demo\",\n      \"version\": \"1.0.0\",\n      \"devDependencies\": {\n        \"vite\": \"6.4.1\"\n      }\n```\n\n이 기록은 여러 환경에서 비슷한 설치 결과를 재현하는 데 도움이 됩니다. 일부만 보여 준 내용이므로 이 코드 블록을 새 파일로 복사해 사용하지 않습니다. [npm lock 파일 안내](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)\n\n설치 후 생기는 `node_modules/`는 내려받은 패키지가 들어가는 폴더입니다. 위 트리의 원본 파일과 달리 **설치 전에 항상 있는 것은 아닙니다**. 직접 파일을 만들거나 수정할 곳으로 생각하지 않아도 됩니다.\n\n### 3. 초기 Windows에서 npm을 사용하려면?\n\nWindows에는 Node.js가 없거나 설치된 버전이 오래된 경우가 있습니다. `npm install`을 먼저 입력하는 것만으로 Node.js가 설치되는 것은 아닙니다. 나중에 AI가 npm 명령을 안내하면 해당 프로젝트가 요구하는 Node.js 버전을 확인하고, [Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 Windows용 설치 프로그램을 선택합니다. 일반적인 공식 Node.js 설치에는 npm이 함께 제공됩니다. 설치 방식에 따라 다를 수 있으므로 새 터미널을 열고 `node --version`과 `npm --version`으로 각각 확인합니다. 인식되지 않으면 터미널 재시작과 설치·PATH 설정을 확인합니다.\n\n아래는 Vite 서버를 직접 실행할 때 쓰는 명령입니다. 준비한 `git-practice/course-card/03-javascript`에서 실행합니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n1. `npm install`: 해당 프로젝트의 설정을 읽고 필요한 패키지를 준비합니다. 처음 내려받을 때 인터넷이 필요할 수 있습니다.\n2. `npm run dev`: `package.json`의 `scripts.dev`에 적힌 작업을 실행합니다. 위 예제에서는 Vite 개발 서버가 시작됩니다. 프로젝트마다 작업과 요구 버전이 다르므로 안내를 먼저 확인합니다.\n\n### 4. Live Server와 Vite의 차이\n\n브라우저는 HTML·CSS·JavaScript를 읽어 카드를 보여 줍니다. **개발 서버**는 개발 중인 파일을 브라우저가 주소로 요청했을 때 전달하는 프로그램입니다. VS Code가 파일을 편집하고 Live Server나 Vite가 파일을 제공하며 브라우저가 화면을 표시합니다. 화면을 보여 주는 브라우저와 파일을 보내 주는 서버는 서로 다른 역할입니다.\n\nLive Server는 이미 작성한 파일을 간단히 열고 저장 결과를 확인하는 데 편리합니다. Vite는 개발 중 화면을 제공하고, 프로젝트 설정에 따라 여러 파일과 패키지를 배포에 사용할 파일로 정리하는 **빌드**도 돕습니다. 빌드는 개발 중인 소스에서 배포용 결과물을 준비하는 작업입니다. 예제의 `dev`는 개발 서버를 켜는 작업이며 빌드를 실행하지 않습니다.\n\n| 비교 | 앞에서 만든 카드 + Live Server | 같은 카드의 Vite 예제 |\n| --- | --- | --- |\n| 준비 | VS Code와 Live Server 확장 | Node.js·npm과 프로젝트에 필요한 패키지 |\n| 여는 방법 | `index.html`에서 Open with Live Server | 해당 폴더에서 `npm install` 후 `npm run dev` |\n| 주소 예시 | `http://127.0.0.1:5500/` | `http://127.0.0.1:5173/` |\n| 저장 후 | 파일 변경을 감지해 브라우저 새로고침 | 일부 변경은 전체 새로고침 없이 교체(HMR), 파일·설정에 따라 새로고침 가능 |\n| 추가 역할 | 정적 파일을 로컬 주소로 제공 | 개발 서버와 배포용 파일을 만드는 빌드 도구 |\n\n**보이는 카드와 버튼 동작은 같습니다.** 단순 카드 확인에는 Live Server로 충분합니다. Vite는 여러 모듈과 패키지를 쓰는 프로젝트의 개발·빌드에 도움을 주지만, 그 자체가 React나 Vue처럼 화면을 구성하는 도구는 아닙니다. 같은 이름의 `dev` 작업이 언제나 Vite를 실행하는 것도 아닙니다. 포트 번호는 프로젝트와 설정에 따라 달라집니다. [Vite 공식 안내](https://vite.dev/guide/)\n\n### 5. Vite 실행 중 import 오류가 나오면?\n\n`npm run dev`를 실행할 때 `vite.js`의 `import { performance } from 'node:perf_hooks'` 부근에서 `SyntaxError: Unexpected token {`이 나오면 **먼저 Node.js 버전을 확인합니다.** 오래된 Node.js가 Vite의 모듈 문법을 처리하지 못할 때 볼 수 있는 증상입니다. 오류 문구만으로 실제 버전을 확정할 수는 없습니다.\n\n```powershell\nnode --version\nnpm --version\nwhere.exe node\n```\n\n`node --version`은 실제 실행되는 Node.js 버전, `npm --version`은 npm 버전, `where.exe node`는 Windows에서 발견한 Node.js 실행 파일의 위치를 보여 줍니다. 예제의 **Vite 6.4.1**은 Node.js 18.x, 20.x 또는 22 이상을 요구합니다. 19.x와 21.x는 이 버전의 지원 범위에 들어가지 않습니다. 다른 프로젝트는 요구 버전이 다를 수 있습니다. [Vite 6.4.1의 지원 Node.js 버전](https://github.com/vitejs/vite/blob/v6.4.1/packages/vite/package.json)\n\n1. 버전이 요구 조건에 맞지 않으면 [Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 현재 LTS Windows 설치 프로그램을 선택해 설치합니다. 이미 여러 프로젝트에서 특정 Node.js 버전이나 버전 관리자를 사용한다면 그 환경의 설정을 먼저 확인합니다.\n2. 터미널과 VS Code를 다시 열고 위 세 명령으로 새 버전이 선택됐는지 확인합니다. 이전 버전이 계속 나오면 `where.exe node`에서 여러 경로가 잡히는지 확인합니다.\n3. `package.json`이 있는 실제 폴더에서 이 예제를 실행하려는 경우, 파일을 확인한 후 필요한 패키지를 설치하고 서버를 켭니다.\n\n```powershell\npwd\nls\nnpm install\nnpm run dev\n```\n\nWindows PowerShell에서 `pwd`는 `Get-Location`, `ls`는 `Get-ChildItem`의 기본 별칭입니다. 수업의 카드 파일은 `git-practice/course-card/03-javascript`에 둡니다. 이미 `git-practice` 루트에 `package.json`을 만들고 실행했다면 오류를 진단할 때는 **그 루트 폴더**에서 다시 실행합니다. `03-javascript`와 루트의 설정을 덮어쓰거나 자동으로 옮기지 않습니다.\n\n`npm install`은 해당 폴더의 설정과 잠금 파일에 따라 패키지를 준비하며 잠금 파일을 갱신할 수 있습니다. 설치한 패키지를 무조건 삭제할 필요는 없습니다. 오류가 계속되면 Node.js 버전, 실행 파일 경로와 전체 오류를 확인합니다. 실행에 성공하면 터미널에 표시되는 주소를 열고 종료할 때 `Ctrl+C`를 누릅니다. 그 폴더에 `index.html`이 있어야 브라우저에서 카드가 표시됩니다.\n\nVite를 시험했다면 `node_modules/`는 다운로드된 패키지 폴더입니다. Git에 포함하지 않도록 해당 저장소의 `.gitignore`에 `node_modules/` 항목을 추가하거나 확인합니다. 기존 파일과 기록은 보존합니다.\n\n### 6. 이전 Node.js에서도 실행해 볼 수 있는 간단 서버\n\nVite 6.4.1은 정해진 Node.js 버전이 필요합니다. 설치 환경을 비교하고 싶다면 Node.js에 기본으로 들어 있는 기능만 쓰는 별도 예제도 있습니다. 이 예제는 **Node.js 10.24.1에서도 실행을 확인**했으며, Live Server의 자동 새로고침은 없으므로 저장 후 브라우저에서 직접 새로고침합니다. 현재 지원되는 Node.js LTS로 업데이트하는 것을 권장합니다.\n\n1. 원본 git-practice의 course-card 안에 **06-node-simple** 폴더를 만듭니다. 이미 존재한다면 기존 파일을 확인하고 덮어쓰지 않습니다.\n2. 앞서 직접 작성한 03-javascript의 index.html, style.css, script.js를 06-node-simple로 **복사**합니다. 기존 카드 원본은 그대로 둡니다.\n3. [간단 서버 예제 폴더](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/06-node-simple)에서 package.json과 server.cjs를 확인하고, 강의노트 저장소 ZIP이나 clone에서 두 파일을 06-node-simple에 복사합니다. 같은 이름이 이미 있다면 덮어쓰지 않습니다.\n4. VS Code 터미널을 열고 06-node-simple 폴더에서 다음 명령으로 실행합니다.\n\n```powershell\ncd ~/git-practice/course-card/06-node-simple\npwd\nnpm run dev\n```\n\ncd는 Windows PowerShell의 Set-Location, pwd는 Get-Location의 기본 별칭입니다. cmd에서는 cd /d %USERPROFILE%\\git-practice\\course-card\\06-node-simple와 cd, macOS/Linux 기본 셸에서는 cd ~/git-practice/course-card/06-node-simple와 pwd를 씁니다. 경로가 다르면 실제 경로를 사용합니다.\n\n이 예제의 package.json에는 다음처럼 적혀 있습니다.\n\n```json\n{\n  \"scripts\": {\n    \"dev\": \"node server.cjs\"\n  }\n}\n```\n\nnpm run dev는 여기서 Node.js로 server.cjs를 실행합니다. 다른 패키지는 설치하지 않으므로 npm install이 필요하지 않습니다. 표시되는 http://127.0.0.1:5173/에서 카드를 확인하고 종료할 때 Ctrl+C를 누릅니다. 이미 포트를 사용 중이면 기존 서버를 종료한 후 실행합니다.\n\n이 간단 예제는 지정된 카드 파일만 제공하는 학습용 서버입니다. Vite의 빌드와 자동 갱신 기능을 제공하지 않으며 FastAPI도 실행하지 않습니다. 앞서 git-practice 루트에 만든 package.json을 바꾸거나 삭제하지 않아도 됩니다.\n\n### 7. FastAPI와 템플릿으로 넘어가면?\n\n앞에서 살펴본 Live Server와 Vite는 카드를 개발하면서 브라우저에서 확인하는 방법입니다. 다음 실습에서는 **Python으로 만든 FastAPI 앱**이 요청을 받아 데이터를 처리하고 화면을 전달합니다. FastAPI 서버도 브라우저에 파일을 제공할 수 있어, 수업에서는 FastAPI 주소에서 카드와 데이터를 함께 확인합니다.\n\n```text\n브라우저 → FastAPI 주소로 요청\n           → Python 데이터 또는 SQLite 조회\n           → 템플릿에 데이터 채우기 → 완성된 HTML 응답\n브라우저 → 받은 HTML·CSS·JavaScript로 카드 표시\n```\n\n처음에는 HTML 안의 JSON을 읽고, 이어 FastAPI의 Python 딕셔너리와 SQLite 데이터로 바꿉니다. 그다음 Jinja2 템플릿을 사용해 서버에서 데이터를 HTML에 채웁니다. Python 패키지 설치에는 뒤에서 `pip`를 사용하며, 위 Vite 예제의 npm과는 별개의 준비 과정입니다.\n\n이후 실습에서는 FastAPI가 템플릿을 데이터로 채운 화면과 API를 제공하며, 브라우저에서 **FastAPI가 알려 준 주소**로 접속합니다. 이 구성에서는 같은 화면을 확인하려고 Live Server를 따로 켤 필요가 없습니다. 주소를 헷갈리지 않도록 VS Code 상태 표시줄 또는 **Live Server: Stop Live Server**로 중지해도 됩니다.\n\nLive Server나 Vite는 Python의 FastAPI 코드를 대신 실행하지 않습니다. 반대로 FastAPI를 쓴다고 언제나 Vite가 필요 없어지는 것은 아닙니다. 프론트엔드를 별도로 개발하는 프로젝트는 둘을 함께 사용할 수도 있지만, 우리 실습은 FastAPI 주소 하나에서 확인합니다.",
        "presentationPoints": [
          "카드 폴더에서 scripts.dev를 확인하고 npm install과 npm run dev를 실행합니다.",
          "Vite가 출력한 Local 주소를 열고 같은 터미널에서 h와 Enter를 눌러 도움말을 확인합니다.",
          "Vite 서버를 종료한 다음 FastAPI가 제공하는 주소에서 데이터와 템플릿 화면을 확인합니다."
        ]
      },
      {
        "id": "web-html",
        "title": "브라우저와 서버: 화면 요청과 백엔드의 역할",
        "minutes": 10,
        "optional": false,
        "body": "### 주소를 열면 어떤 일이 일어날까요?\n\nLive Server로 카드를 열면 브라우저는 내 PC의 Live Server에 파일을 요청하고, 받은 HTML·CSS·JavaScript를 해석해 화면을 표시합니다. 버튼 클릭은 브라우저의 JavaScript가 처리합니다.\n\n```text\n브라우저  ── 카드 파일 요청 ──→  Live Server\n브라우저  ←─ HTML·CSS·JS ───  Live Server\n```\n\n`127.0.0.1` 또는 `localhost`는 주소를 연 **내 컴퓨터 자신**입니다. 예를 들어 Live Server가 `127.0.0.1:5500`을, 나중의 FastAPI가 `127.0.0.1:8000`을 사용할 수 있습니다. 포트는 설정에 따라 다르며 화면에 실제로 나온 주소를 사용합니다. 같은 주소를 다른 사람의 PC에 보내면 그 사람의 컴퓨터를 가리킵니다.\n\n### 프론트엔드와 백엔드\n\n프론트엔드는 사용자가 보고 조작하는 화면입니다. **백엔드**는 서버에서 요청 처리와 데이터 준비·저장 등을 담당합니다. Live Server나 Vite 개발 서버는 개발 화면을 확인하는 도구이며, 켜는 것만으로 Python의 FastAPI나 SQLite 처리가 생기지는 않습니다.\n\n### 프론트엔드와 백엔드의 대표적인 도구\n\n같은 강의 카드 서비스에 어떤 도구를 선택할 수 있는지 살펴봅니다. 이름을 외우기보다 **어느 쪽의 일을 돕는지**에 주목하세요.\n\n| 영역 | 대표 예시 | 이 강의에서의 역할 |\n| --- | --- | --- |\n| 프론트엔드 | React, Vue | 브라우저에서 카드·버튼 같은 화면을 구성하는 방법을 제공합니다. |\n| 백엔드 · Python | FastAPI, Flask, Django | 요청에 응답하고 데이터를 처리하는 서버를 만드는 데 사용합니다. |\n| 백엔드 · Java/Kotlin | Spring 또는 Spring Boot | Java나 Kotlin으로 서버 애플리케이션을 만드는 데 사용합니다. |\n\nFastAPI는 API 개발에 사용되며 이번 실습에서 선택한 Python 웹 프레임워크입니다. Flask는 가볍게 시작할 수 있는 Python 웹 프레임워크이고, Django는 여러 기능을 갖춘 Python 웹 프레임워크입니다. Spring은 Java 생태계의 프레임워크이며 Spring Boot는 Spring 앱의 설정과 실행을 돕습니다. 각 도구는 화면·데이터 처리 등 여러 방식으로 쓰일 수 있으므로 이름만 보고 모든 프로젝트의 구성을 단정하지 않습니다. [FastAPI](https://fastapi.tiangolo.com/) · [Flask](https://flask.palletsprojects.com/en/stable/) · [Django](https://www.djangoproject.com/) · [Spring Boot](https://spring.io/projects/spring-boot/)\n\n예를 들어 React 또는 Vue로 구성한 화면이 서버의 FastAPI에 데이터를 요청할 수 있습니다. 반대로 프론트엔드 프레임워크를 따로 쓰지 않고도 서버 템플릿으로 HTML을 만드는 방식이 있습니다. 우리 실습은 뒤쪽의 FastAPI와 템플릿으로 그 흐름을 보여 줍니다.\n\n다음 예제에서는 FastAPI가 `/static/...` 화면 파일과 `/api/...` 데이터를 같은 주소에서 제공합니다. 브라우저에서 `http://127.0.0.1:8000/static/02-dict-api.html`을 열면 페이지의 `fetch('/api/dict')`도 같은 FastAPI의 8000번으로 요청합니다. 템플릿 HTML도 FastAPI 주소에서 받습니다. 이 구성에서는 Live Server를 다시 켤 필요가 없습니다.\n\n**주소가 다르면?** 예를 들어 Live Server의 `:5500`에서 위 파일을 열면 `/api/dict`는 `:5500/api/dict`를 찾으며 FastAPI `:8000`으로 자동 연결되지 않습니다. 포트가 다른 두 주소는 다른 출처입니다. 별도 프론트엔드 서버를 함께 쓰는 프로젝트는 API 주소·프록시 또는 CORS 설정을 따로 맞출 수 있지만, 이번에는 같은 FastAPI 주소로 열어 이해합니다. [FastAPI CORS 안내](https://fastapi.tiangolo.com/tutorial/cors/)\n\n개발 서버와 백엔드를 두 서버로 나누는 프로젝트도 있고, 이번 예제처럼 하나의 FastAPI 서버가 화면과 데이터를 함께 제공하는 경우도 있습니다. 다음 강의에서는 HTML 안 JSON → Python 딕셔너리 → SQLite → 템플릿으로 이어갑니다.",
        "presentationPoints": [
          "React·Vue는 브라우저 화면을 구성하는 대표적인 도구입니다.",
          "FastAPI·Flask·Django와 Spring은 서버를 만드는 도구입니다.",
          "이번 실습은 FastAPI 주소에서 화면과 API를 함께 확인합니다."
        ]
      },
      {
        "id": "web-bonus",
        "title": "보충 노트: 주소의 경로와 해시, 빌드 결과 구분",
        "minutes": 5,
        "optional": true,
        "body": "예제 링크의 `#/lesson/terminal`에서 `#` 뒤는 URL의 fragment입니다. 브라우저 안의 라우팅 코드가 이 값을 읽어 표시할 강의를 고를 수 있습니다. HTTP 요청에는 fragment가 전송되지 않으므로 서버가 `#/lesson/terminal` 경로를 직접 처리한다고 생각하면 혼란스러워집니다.\n\n`/data/course.json` 같은 경로는 호스팅 기준과 배포의 base 경로에 영향을 받습니다. 로컬에서는 맞던 절대 경로가 하위 경로 배포에서 달라질 수 있습니다. 단순한 주소 하나도 어느 기준에서 해석되는지 알아야 한다는 점은 터미널의 상대 경로와 닮아 있습니다.\n\n소스 프로젝트와 빌드 결과도 구분합니다. 개발자는 src와 데이터 같은 원본을 고치고 빌드 도구가 배포 파일을 만듭니다. 생성된 JavaScript 파일을 직접 수정하면 다음 빌드에서 변경이 사라질 수 있습니다. 어디가 원본이고 어디가 결과인지 README와 빌드 설정에서 확인합니다.\n\n추가로 알아둘 점은 브라우저가 다운로드한 JavaScript와 데이터는 사용자가 읽을 수 있다는 사실입니다. 화면에서 버튼을 숨긴 것만으로 서버 권한 검사가 생기지는 않습니다. 로그인이나 결제처럼 서버에서 판단해야 할 규칙은 별도 설계가 필요합니다. 이번 과정에서는 그 구현을 만들지 않고 책임의 위치만 구분합니다."
      }
    ],
    "pitfalls": [
      {
        "title": "npm run dev는 모든 프로젝트에서 같은 명령",
        "body": "dev는 각 package.json에 작성된 스크립트 이름이며 프로젝트마다 내용이 다르거나 없을 수 있습니다."
      },
      {
        "title": "브라우저 화면이 보이면 백엔드도 실행 중",
        "body": "정적 파일이나 개발 서버만으로 화면을 볼 수 있습니다. FastAPI 백엔드는 별도로 실행해야 합니다."
      },
      {
        "title": "localhost 주소를 전달하면 다른 사람도 접속",
        "body": "localhost는 주소를 여는 컴퓨터 자신입니다. 다른 사람에게 공개하려면 별도의 배포와 접근 설정이 필요합니다."
      }
    ],
    "checklist": [
      "카드의 HTML·CSS·JavaScript와 Tailwind·Alpine이 프론트엔드에서 하는 일을 설명한다.",
      "package.json의 scripts.dev를 확인하고 npm install과 npm run dev로 카드를 실행한다.",
      "Live Server 주소에서 카드의 저장 결과를 확인하고 필요하면 Live Server를 중지한다.",
      "브라우저·개발 서버·백엔드·데이터베이스의 역할을 구분한다.",
      "React·Vue와 Vite, Python 백엔드 프레임워크와 Spring의 역할을 구분한다."
    ],
    "steps": [
      {
        "id": "web-01",
        "title": "만든 카드에서 프론트엔드 역할 확인",
        "description": "앞에서 만든 카드의 구조·모양·브라우저 동작을 짚습니다.",
        "scene": "browser",
        "code": "HTML → 구조\nCSS / Tailwind → 모양\nJavaScript / Alpine → 버튼 동작",
        "language": "text",
        "output": "같은 카드가 브라우저에 표시되고 클릭에 반응합니다.",
        "focus": "web",
        "fileName": "강의 카드 · 브라우저",
        "files": [
          "index.html",
          "style.css",
          "script.js"
        ]
      },
      {
        "id": "web-02",
        "title": "같은 카드: Live Server와 Vite 비교",
        "description": "같은 카드 폴더에서 Live Server와 Vite를 차례로 실행해 주소와 도움말을 비교합니다.",
        "scene": "code",
        "code": "Live Server: 카드 index.html → Open with Live Server\nVite: 카드 폴더에서 npm install → npm run dev\n표시된 Local 주소 열기 → h + Enter로 도움말 확인\n포트는 실제 출력된 주소 확인",
        "language": "text",
        "output": "같은 카드를 두 서버로 확인하고 Vite 도움말과 종료 방법을 살펴봅니다.",
        "focus": "web",
        "fileName": "카드 index.html / package.json",
        "files": [
          "index.html",
          "package.json"
        ]
      },
      {
        "id": "web-ssr-handler",
        "title": "브라우저와 개발 서버의 요청·응답",
        "description": "Live Server의 정적 카드와 FastAPI의 같은 주소에서 화면·API를 제공하는 실습을 구분합니다.",
        "scene": "architecture",
        "code": "카드 실습: 브라우저 ↔ Live Server :5500 (예시)\n다음 실습: 브라우저 ↔ FastAPI :8000 /static/... · /api/...\n포트는 실제 표시된 값 확인",
        "language": "text",
        "output": "이번 백엔드 실습은 FastAPI 주소만 열면 되며 Live Server는 별도로 필요하지 않습니다.",
        "focus": "web",
        "fileName": "브라우저 · 로컬 서버",
        "files": [
          "index.html",
          "main.py"
        ]
      }
    ],
    "glossary": [
      {
        "term": "프론트엔드",
        "definition": "사용자가 보고 조작하는 화면과 브라우저 쪽 동작을 구성하는 영역."
      },
      {
        "term": "Node.js",
        "definition": "브라우저 밖에서 JavaScript를 실행하는 환경."
      },
      {
        "term": "npm",
        "definition": "패키지를 준비하고 package.json의 스크립트를 실행하는 도구."
      },
      {
        "term": "개발 서버",
        "definition": "개발 중인 파일을 제공하고 수정 결과 확인을 돕는 프로그램."
      },
      {
        "term": "localhost",
        "definition": "주소를 여는 컴퓨터 자신을 가리키는 이름."
      },
      {
        "term": "Vite",
        "definition": "개발 서버와 배포용 빌드 기능을 제공하는 프론트엔드 개발 도구."
      },
      {
        "term": "React·Vue",
        "definition": "컴포넌트를 활용해 브라우저 화면을 구성하는 도구. React는 라이브러리, Vue는 프레임워크."
      }
    ],
    "references": [
      {
        "title": "Node.js 소개",
        "url": "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
      },
      {
        "title": "npm run 스크립트",
        "url": "https://docs.npmjs.com/cli/v12/commands/npm-run/"
      },
      {
        "title": "Vite 시작하기",
        "url": "https://vite.dev/guide/"
      }
    ],
    "closing": "앞서 만든 카드를 Live Server와 Vite로 실행하며 npm 명령과 터미널 도움말을 확인했습니다. 다음에는 FastAPI가 제공하는 주소에서 Python·SQLite 데이터와 템플릿을 확인합니다.",
    "presentation": {
      "caseSummary": "강사가 강의노트에서 npm run dev로 Vite 서버를 열고 h와 Enter로 도움말을 확인하는 실제 장면을 봅니다. 이어 강의 카드에서도 개발 서버를 실행합니다.",
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "카드 index.html · 강의 본문의 예제 파일 구조와 package.json",
        "command": "카드를 Live Server로 열고 저장 결과 확인\n카드 폴더에서 package.json 확인 → npm install → npm run dev\n표시된 Local 주소 열고 실행 중 터미널에서 h + Enter\nVite 서버 종료 후 다음 FastAPI 단계로 이동",
        "expectedResult": "같은 카드를 Live Server와 Vite로 확인하고 Vite 터미널 도움말을 살펴봅니다.",
        "durationMinutes": 5
      },
      "returnSummary": "같은 카드를 Live Server와 Vite로 확인했고, 다음에는 FastAPI 서버 주소에서 화면과 데이터를 확인합니다."
    }
  },
  {
    "id": "templates",
    "number": 9,
    "title": "데이터와 백엔드: HTML·Python·SQLite·템플릿",
    "shortTitle": "데이터·백엔드",
    "subtitle": "같은 카드의 데이터를 HTML, Python, DB로 옮기고 템플릿으로 출력합니다",
    "icon": "sparkles",
    "durationMinutes": 80,
    "case": {
      "kind": "example",
      "title": "Python 데이터를 템플릿에 넣어 강의 카드 보여주기",
      "body": "### 강의 카드의 데이터를 화면에 채웁니다\n\n앞에서 만든 Git 카드의 제목과 설명을 Python에서 준비해 HTML에 넣어 봅니다. 아래는 뒤에서 실습할 강의 카드 예제를 이해하기 쉽게 줄인 **수업용 재구성 코드**입니다. 먼저 데이터가 어디에서 어디로 전달되는지만 살펴봅니다.\n\n### 1. Python에서 카드 데이터 준비하기\n\n서버에서 사용할 카드 목록을 만듭니다. 목록의 한 항목에 제목, 시간, 설명을 담습니다.\n\n```python\nlessons = [\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}\n]\n```\n\n### 2. 카드 데이터와 템플릿 연결하기\n\n브라우저가 `/cards`를 요청하면 준비된 `cards.html` 템플릿에 `lessons` 데이터를 전달합니다. `request`는 현재 요청을 나타냅니다.\n\n```python\n@app.get(\"/cards\")\ndef cards(request: Request):\n    return templates.TemplateResponse(\n        request=request,\n        name=\"cards.html\",\n        context={\"lessons\": lessons, \"source\": \"Python 목록\"},\n    )\n```\n\n여기서는 데이터 전달을 강조하기 위해 앱과 템플릿 준비 코드를 생략했습니다. 실제 강의 예제의 마지막 단계에서는 Python 목록 대신 SQLite에서 읽은 목록을 같은 `cards.html`에 전달합니다.\n\n### 3. 템플릿에서 값이 들어갈 위치 정하기\n\n아래는 준비된 `templates/cards.html`에서 카드 내용을 표시하는 부분을 줄여 보여 준 것입니다.\n\n```html\n{% for lesson in lessons %}\n  <h2>{{ lesson.title }}</h2>\n  <p>{{ lesson.minutes }}분</p>\n  <p>{{ lesson.description }}</p>\n{% endfor %}\n```\n\n`{% for ... %}`는 카드 목록을 하나씩 반복하고 `{{ ... }}`는 해당 카드의 값을 표시할 자리입니다. Git 카드 하나가 전달되면 브라우저에는 **Git · 25분 · 변경을 확인하고 기록합니다.**라는 내용이 나타납니다. 실제 예제에서는 이 내용이 카드 모양과 버튼을 가진 HTML 안에 들어갑니다.\n\n**오늘의 흐름:** 먼저 HTML 안 JSON을 읽고, Python 데이터와 SQLite를 차례로 연결한 뒤, 마지막에 이 템플릿으로 같은 카드의 HTML을 서버에서 만들어 봅니다.",
      "question": "Python의 카드 데이터가 템플릿을 거쳐 화면에 어떻게 나타날까요?"
    },
    "objectives": [
      "HTML 내부 JSON과 브라우저의 JSON.parse를 읽는다.",
      "Windows에서 Python을 확인하고 가상환경·패키지·FastAPI 서버를 준비한다.",
      "FastAPI 라우트를 직접 작성해 Python 또는 SQLite 데이터를 JSON으로 응답한다.",
      "Jinja2 라우트에서 SQLite 데이터를 템플릿에 전달해 HTML을 만든다."
    ],
    "sections": [
      {
        "id": "backend-html-json",
        "title": "HTML 안의 JSON으로 카드 데이터 표현하기",
        "minutes": 10,
        "optional": false,
        "body": "### 1. 실습 파일 준비하기\n\nVS Code에서 `git-practice/course-card/05-alpine/index.html`을 엽니다. 앞에서 만든 Git 카드 한 개와 설명 보기 버튼이 들어 있는 파일입니다.\n\n이 파일을 복사해 `git-practice/course-card/server-data/static/01-local-json-practice.html`로 저장하고, 복사한 파일에서 실습합니다. 완성 결과는 [JSON 카드 예제](./examples/course-card/server-data/static/01-local-json.html)에서 확인할 수 있습니다. `server-data` 폴더가 없다면 [예제 저장소](https://github.com/is2js/dolbeom-coding-notes)의 `public/examples/course-card/server-data` 폴더를 `course-card` 안에 복사합니다. 기존 같은 이름의 파일은 덮어쓰지 마세요.\n\n### 2. 카드 앞에 JSON 데이터 추가하기\n\n실습 파일에서 `<body>`와 그 안의 `<article>`을 찾습니다. 파일에 이미 있는 코드는 다음과 같습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`<body>` 바로 아래, `<article>` 앞에 **JSON script만 추가**합니다. 기존 카드는 아직 그대로 둡니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <script type=\"application/json\" id=\"lesson-data\">\n  [\n    {\"title\": \"윈도우 터미널\", \"minutes\": 30, \"description\": \"폴더를 확인하고 탐색기와 오갑니다.\"},\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}\n  ]\n  </script>\n\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`lesson-data`는 데이터를 찾을 이름이고, `[]` 안의 `{}` 하나가 카드 하나입니다. `title`은 제목, `minutes`는 시간, `description`은 설명입니다. 저장해도 아직은 기존 Git 카드만 보입니다. JSON을 화면에 연결하는 코드는 다음에 작성합니다.\n\n### 3. Alpine.js가 JSON을 읽도록 카드 수정하기\n\n방금 추가한 JSON은 그대로 두고, **기존 `<article>`부터 `</article>`까지**를 아래 `<main>` 전체로 바꿉니다. `<body>`와 `</body>`, `<head>`의 Tailwind·Alpine CDN은 그대로 둡니다.\n\n```html\n  <main class=\"mx-auto max-w-3xl p-6\"\n        x-data=\"{ lessons: JSON.parse(document.getElementById('lesson-data').textContent) }\">\n    <h1 class=\"mb-4 text-2xl font-bold\">나의 강의 카드</h1>\n    <p>데이터 출처: HTML 안의 JSON</p>\n    <ul class=\"grid gap-4 md:grid-cols-2\">\n      <template x-for=\"(lesson, index) in lessons\" :key=\"index\">\n        <li>\n          <article class=\"rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n            <h2 class=\"text-xl font-bold\" x-text=\"lesson.title\"></h2>\n            <p><span x-text=\"lesson.minutes\"></span>분</p>\n            <button type=\"button\" class=\"mt-4 rounded bg-slate-800 px-3 py-2 text-white\"\n                    @click=\"open = !open\" :aria-expanded=\"open\">설명 보기</button>\n            <p class=\"mt-3\" x-show=\"open\" x-cloak x-text=\"lesson.description\"></p>\n          </article>\n        </li>\n      </template>\n    </ul>\n  </main>\n```\n\n`getElementById('lesson-data').textContent`로 JSON 글자를 찾고, `JSON.parse`로 변환해 `lessons`에 담습니다. `x-for`는 데이터마다 카드를 만들고, `x-text`는 제목·시간·설명을 넣습니다. 각 카드의 `open`은 버튼을 눌렀을 때 해당 카드의 설명만 펼칩니다.\n\n### 4. 실행하고 수정해 보기\n\n저장한 파일을 우클릭해 **Open with Live Server**를 선택합니다. 인터넷 연결이 있어야 Tailwind와 Alpine CDN을 불러올 수 있습니다. 카드 두 개와 각각의 설명 버튼을 확인한 다음, JSON의 Git 제목이나 설명을 바꿔 저장합니다. HTML 태그를 수정하지 않아도 카드 내용이 바뀝니다. 카드가 보이지 않으면 JSON의 큰따옴표와 쉼표를 확인하세요.\n\n다음 절에서는 이 HTML을 바탕으로, 데이터를 HTML 대신 Python에서 보내도록 바꿉니다.",
        "presentationPoints": [
          "HTML 안 JSON을 JSON.parse로 읽고 같은 카드에 표시합니다.",
          "정적 파일을 수정·저장하고 브라우저에서 확인합니다."
        ]
      },
      {
        "id": "backend-python",
        "title": "FastAPI의 Python 데이터 가져오기",
        "minutes": 30,
        "optional": false,
        "body": "### 처음부터 준비해 서버를 열어 봅니다\n\n앞 절에서는 HTML 안에 카드 데이터를 넣고 브라우저가 읽었습니다. 이제 Windows와 VS Code만 준비된 상태에서 Python을 설치하고, 가상환경과 FastAPI를 준비해 첫 서버를 띄웁니다. 그다음 Python 데이터가 같은 카드에 표시되도록 연결합니다.\n\n**진행 순서**는 실습 폴더 확인 → Python 설치와 확인 → VS Code 확장 → 가상환경 생성과 패키지 설치 → 첫 서버 확인 → 카드 데이터 연결입니다. 준비된 서버 폴더에는 연습에 필요한 HTML과 데이터 파일이 들어 있으며, 서버 코드는 직접 작성합니다.\n\n### 1. 실습 폴더 열기\n\n원본 `git-practice`를 VS Code로 열어 두고 앞 절에서 복사한 `course-card/server-data`를 사용합니다. 아직 없다면 [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP** 또는 clone에서 `public/examples/course-card/server-data`를 `git-practice/course-card/server-data`로 통째로 복사합니다. 같은 대상 폴더가 있으면 기존 내용을 확인하고 덮어쓰지 않습니다. 기존 `main.py`와 `practice_complete.py`는 완성 예제이므로 그대로 두고 `practice.py`를 별도로 작성합니다. [서버 예제 파일 보기](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/server-data)\n\nVS Code에서 **터미널 → 새 터미널**을 열고 PowerShell에 다음을 입력합니다. `~`는 현재 Windows 사용자의 홈 폴더입니다.\n\n```powershell\ncd ~/git-practice/course-card/server-data\npwd\nls\n```\n\n`pwd` 결과가 실제 `git-practice/course-card/server-data` 경로인지, `ls` 결과에 `requirements.txt`, `sample_data.py`, `static`, `templates`가 있는지 확인합니다. 저장 위치를 다르게 정했다면 자신이 복사한 실제 경로로 이동합니다. `cd`, `pwd`, `ls`는 Windows PowerShell에서 각각 `Set-Location`, `Get-Location`, `Get-ChildItem`의 기본 별칭입니다. cmd에서는 `cd /d %USERPROFILE%\\git-practice\\course-card\\server-data`, 인수 없는 `cd`, `dir`을, macOS/Linux 기본 셸에서는 `cd ~/git-practice/course-card/server-data`, `pwd`, `ls`를 사용합니다.\n\n### 2. Python 설치와 버전 확인\r\n\r\nWindows에 VS Code만 설치된 상황에서 시작합니다. [Python 공식 Windows 다운로드](https://www.python.org/downloads/windows/)에서 Python 설치 관리자를 설치하고 안내에 따라 Python 3.10 이상을 설치합니다. 설치 관리자의 화면과 설치 과정은 버전에 따라 다를 수 있습니다. 관리자 설치 후 Python 실행 환경이 아직 없다면 아래 명령으로 3.12를 설치합니다. 기존 Python 3.10 이상을 이미 사용한다면 설치를 건너뜁니다.\r\n\r\n```powershell\r\npy install 3.12\r\n```\r\n\r\nPython 설치 관리자를 연 뒤 Python이 이미 설치되어 있는지 확인하고, 필요할 때 안내된 `py install 3.12`를 실행합니다. 설치 중 경로 또는 명령 사용 설정 안내가 나타나면 화면의 안내를 따릅니다. 설치가 끝나면 VS Code를 다시 열고 **터미널 → 새 터미널**에서 버전을 확인합니다.\r\n\r\n```powershell\r\npy -3 --version\r\n```\r\n\r\n`Python 3.12.x`처럼 3.10 이상이 보이면 됩니다. `py`가 없는데 `python --version`은 정상이라면 아래 가상환경 생성 명령에서 `py -3` 대신 `python`을 사용합니다. 둘 다 실행되지 않으면 설치를 완료했는지 확인하고 터미널을 다시 여세요. 기존 Python Launcher에는 `py install`이 없을 수 있으므로 그때는 공식 설치 안내를 따릅니다. [Python Windows 설치 안내](https://docs.python.org/3/using/windows.html)\r\n\r\n### 3. VS Code Python 확장 설치\r\n\r\n1. VS Code에서 **Ctrl+Shift+X**를 눌러 확장을 엽니다.\r\n2. `Python`을 검색하고 게시자가 **Microsoft**인 확장을 설치합니다.\r\n3. 화면에서 제안하는 관련 확장 설치 안내를 확인합니다. Python 확장은 코드 색상, 자동완성, 오류 표시와 실행 환경 선택을 돕습니다. 확장 설치와 Python 설치는 각각 진행합니다. 이 실습의 필수 확장은 Microsoft의 Python이며 Jupyter는 필요하지 않습니다. [VS Code Python 공식 안내](https://code.visualstudio.com/docs/languages/python/)\r\n\r\n### 4. 프로젝트별 가상환경과 패키지 준비\r\n\r\nVS Code를 다시 열면 새 터미널의 위치가 바뀔 수 있으므로 다시 실습 폴더로 이동합니다. `py -3 -m venv .venv`는 그 폴더 안에 이 실습 전용 Python 환경을 만듭니다. `.venv`는 프로젝트에 필요한 패키지를 담는 폴더입니다. 기존 `.venv`가 있다면 덮어쓰지 말고 새 연습 폴더에서 진행합니다.\r\n\r\n```powershell\ncd ~/git-practice/course-card/server-data\npwd\nls\npy -3 -m venv .venv\n```\r\n\r\n`pwd`와 `ls`는 Windows PowerShell에서 각각 `Get-Location`, `Get-ChildItem`의 기본 별칭입니다. Windows cmd에서는 `cd`, `dir`, macOS/Linux 기본 셸에서는 `pwd`, `ls`로 같은 위치와 목록을 확인합니다. `py -3`이 없는 환경은 확인한 `python -m venv .venv`를 사용합니다.\r\n\r\n**Ctrl+Shift+P**를 누르고 `Python: Select Interpreter`를 찾아 실행한 후 `./.venv` 또는 `.venv\\Scripts\\python.exe`가 표시된 환경을 선택합니다. 자동완성과 실행 도구가 이 환경을 사용합니다. 목록에 없으면 **Enter interpreter path → Find**에서 `git-practice/course-card/server-data/.venv/Scripts/python.exe`를 직접 선택합니다. 이 선택은 편집기의 설정이며, 터미널에서 가상환경을 사용하는 단계도 아래에서 확인합니다.\r\n\r\n가상환경 안에 FastAPI와 서버 도구를 설치합니다. 준비된 `requirements.txt`의 내용은 다음과 같습니다.\n\n```text\nfastapi>=0.115,<1\nuvicorn>=0.30,<1\njinja2>=3.1,<4\n```\n\n`fastapi`는 요청을 처리할 앱, `uvicorn`은 앱을 실행해 요청을 받아 주는 서버, `jinja2`는 뒤에서 HTML 템플릿에 데이터를 넣는 도구입니다. `>=`와 `<`는 설치 가능한 버전 범위입니다. 아래 `python -m pip install -r requirements.txt`는 이 파일에 적힌 세 패키지를 현재 가상환경에 설치합니다. 인터넷 연결이 필요합니다.\n\nPowerShell에서 가상환경을 활성화하고 필요한 패키지를 설치합니다.\r\n\r\n```powershell\r\n.\\.venv\\Scripts\\Activate.ps1\r\npython -m pip install -r requirements.txt\r\n```\r\n\r\n보통 터미널 앞에 `(.venv)`가 표시됩니다. `python -m pip show fastapi`를 실행해 이름과 버전이 보이면 FastAPI가 설치된 것입니다. 새 터미널을 열면 가상환경이 자동 활성화될 수 있습니다. 표시되지 않으면 위 활성화 명령을 다시 실행합니다. 위치가 바뀌었다면 먼저 `cd ~/git-practice/course-card/server-data`로 이동합니다.\r\n\r\n**활성화 명령이 차단될 때** 실행 정책을 바꾸지 않고 아래 명령을 사용해 가상환경에 설치합니다. 이후 서버 실행 명령의 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 사용합니다. [Python 가상환경 안내](https://docs.python.org/3/library/venv.html)\r\n\r\n```powershell\r\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\r\n```\r\n\r\n### 5. 가장 작은 FastAPI 서버부터 확인하기\n\nVS Code 탐색기에서 `course-card/server-data` 안에 **새 파일** `hello.py`를 만듭니다. 같은 이름의 기존 파일이 있으면 덮어쓰지 말고 다른 이름으로 저장한 뒤 아래 실행 명령의 파일 이름도 맞춥니다.\n\n```python\nimport fastapi\n\napp = fastapi.FastAPI()\n\n@app.get(\"/\")\ndef hello():\n    return {\"message\": \"서버가 켜졌어요\"}\n```\n\n`fastapi.FastAPI()`는 앱을 만들고 `@app.get(\"/\")`는 브라우저가 기본 주소를 요청하면 아래 함수를 실행하도록 연결합니다. 이 주소 연결을 **라우트**라고 합니다. `return`의 딕셔너리는 JSON 응답으로 전달됩니다.\n\n파일을 저장한 뒤, 가상환경이 활성화된 같은 터미널에서 실행합니다.\n\n```powershell\npython -m uvicorn hello:app\n```\n\n`hello:app`은 `hello.py` 안의 `app`을 뜻합니다. 터미널을 켜 둔 채 [첫 서버 확인](http://127.0.0.1:8000/)을 열면 메시지가 담긴 JSON이 보입니다. 확인 후 **그 터미널에서 Ctrl+C**를 눌러 서버를 종료합니다. 가상환경 활성화가 차단됐다면 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 사용합니다. 포트 8000이 사용 중이라면 명령 끝에 `--port 8001`을 추가하고 브라우저에서도 `:8001`을 사용합니다.\n\n### 6. Python에 카드 데이터와 주소 만들기\n\n앞 절에서는 `01-local-json-practice.html` 안의 JSON을 읽었습니다. 이번에는 준비된 `server-data/sample_data.py`를 열어 같은 카드 데이터가 Python 목록에 있는지 확인합니다.\n\n```python\nLESSONS = [\n    {\"title\": \"윈도우 터미널\", \"minutes\": 30, \"description\": \"폴더를 확인하고 탐색기와 오갑니다.\"},\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"},\n]\n```\n\n이 파일은 이미 준비되어 있으므로 새로 만들 필요가 없습니다. 대괄호는 카드 목록, 중괄호는 카드 하나의 데이터입니다.\n\n`server-data`에 **새 파일** `practice.py`를 만들어 아래 코드를 저장합니다. 같은 파일이 이미 있다면 덮어쓰지 말고 다른 연습 폴더에서 진행합니다.\n\n```python\nfrom fastapi import FastAPI\nfrom fastapi.staticfiles import StaticFiles\nfrom sample_data import LESSONS\n\napp = FastAPI()\napp.mount(\"/static\", StaticFiles(directory=\"static\"), name=\"static\")\n\n@app.get(\"/api/dict\")\ndef api_dict():\n    return LESSONS\n```\n\n`sample_data.py`의 `LESSONS`를 가져와 `/api/dict` 주소로 보냅니다. FastAPI가 Python 목록을 JSON으로 바꿔 응답합니다. `/static`은 같은 폴더 안 `static`의 HTML을 브라우저에 보여주는 주소입니다. [FastAPI 라우트 안내](https://fastapi.tiangolo.com/tutorial/first-steps/) · [정적 파일 제공](https://fastapi.tiangolo.com/tutorial/static-files/)\n\n### 7. 앞서 만든 HTML을 서버 데이터용으로 수정하기\n\nVS Code에서 앞 절의 `server-data/static/01-local-json-practice.html`을 복사하여 같은 `static` 폴더에 **`02-dict-practice.html`**로 붙여넣습니다. 이름이 이미 있다면 다른 이름으로 저장하고 아래 브라우저 주소도 그 이름에 맞춥니다. 준비된 완성 예제 `02-dict-api.html`은 덮어쓰지 않습니다.\n\n먼저 복사한 HTML의 `<body>` 안에서 이전에 넣었던 JSON 블록을 통째로 지웁니다. 이 데이터는 이제 `sample_data.py`에 있습니다.\n\n**기존 코드 — 삭제할 부분**\n\n```html\n<script type=\"application/json\" id=\"lesson-data\">\n[\n  {\"title\": \"윈도우 터미널\", \"minutes\": 30, \"description\": \"폴더를 확인하고 탐색기와 오갑니다.\"},\n  {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}\n]\n</script>\n```\n\n이어서 그 바로 아래의 `<main ...>` 여는 태그를 찾습니다.\n\n**기존 코드**\n\n```html\n<main class=\"mx-auto max-w-3xl p-6\"\n      x-data=\"{ lessons: JSON.parse(document.getElementById('lesson-data').textContent) }\">\n```\n\n**변경 코드 — 위 여는 태그를 아래 코드로 교체**\n\n```html\n<main class=\"mx-auto max-w-3xl p-6\"\n      x-data=\"{ lessons: [], error: '' }\"\n      x-init=\"fetch('/api/dict').then(response => response.json()).then(data => lessons = data).catch(() => error = '서버에 연결하지 못했습니다.')\">\n```\n\n- `lessons: []`는 데이터가 오기 전의 빈 목록입니다.\n- `x-init`은 Alpine이 화면을 준비할 때 실행합니다. `fetch('/api/dict')`가 FastAPI에 데이터를 요청하고 `response.json()`으로 읽은 결과를 `lessons`에 넣습니다.\n- 기존 `x-for`, `x-text`와 카드 버튼 코드는 그대로 사용합니다. 이제 목록의 출처만 HTML 안의 JSON에서 서버로 바뀝니다.\n\n출처 문구도 바꾸고 연결 오류를 볼 수 있게 바로 아래에 한 줄을 추가합니다.\n\n**기존 코드**\n\n```html\n<p>데이터 출처: HTML 안의 JSON</p>\n```\n\n**변경 코드**\n\n```html\n<p>데이터 출처: Python 목록</p>\n<p x-show=\"error\" x-cloak x-text=\"error\" role=\"alert\"></p>\n```\n\nHTML의 나머지 부분과 `<head>`의 Tailwind·Alpine CDN, `[x-cloak]` 스타일은 유지하고 저장합니다. 이 실습 파일은 위에서 직접 `fetch`하므로 별도 JavaScript 파일을 추가할 필요가 없습니다. 참고용 `02-dict-api.html`은 같은 요청을 `load-cards.js`로 분리합니다.\n\n### 8. 서버를 켜고 카드와 데이터를 확인하기\n\n`server-data` 폴더의 가상환경이 활성화된 터미널에서 실행합니다. 활성화하지 않았다면 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 사용합니다.\n\n```powershell\npython -m uvicorn practice:app\n```\n\n서버를 켜 둔 채 먼저 [Python 데이터 응답](http://127.0.0.1:8000/api/dict)을 열어 JSON이 보이는지 확인합니다. 이어서 [직접 수정한 카드 화면](http://127.0.0.1:8000/static/02-dict-practice.html)을 열어 두 카드와 각 버튼을 확인합니다. 인터넷 연결이 있어야 CDN에서 Tailwind와 Alpine을 불러올 수 있습니다.\n\n`sample_data.py`에서 Git 제목을 바꾸고 저장한 뒤 터미널에서 **Ctrl+C**로 서버를 종료하고 같은 명령으로 다시 실행합니다. 데이터 주소와 카드 화면을 새로고침하면 수정된 제목이 나타납니다. Python 코드를 자동으로 다시 읽는 옵션을 사용하지 않았기 때문에 재시작이 필요합니다.\n\nFastAPI가 화면과 데이터를 함께 제공하므로 이 단계는 Live Server 없이 **8000번 주소**로 확인합니다. 포트가 이미 사용 중이면 `python -m uvicorn practice:app --port 8001`로 실행하고 브라우저 주소도 `:8001`로 바꿉니다. GitHub Pages는 Python 서버를 실행하지 않으므로 이 실습은 내 컴퓨터에서 진행합니다.\n\n다음 SQLite 실습에서는 같은 `practice.py`에 데이터베이스를 읽는 라우트를 추가합니다. `.venv`와 `node_modules`가 Git에 포함되지 않도록 커밋 전 `git status`와 `.gitignore`를 확인합니다.",
        "presentationPoints": [
          "Python 설치와 버전 확인 후 server-data에 가상환경을 만들고 FastAPI·Uvicorn·Jinja2를 설치합니다.",
          "hello.py의 첫 라우트를 열고 서버를 종료한 뒤 practice.py에서 Python 목록을 JSON으로 전달합니다.",
          "FastAPI 주소에서 JSON과 카드 화면을 확인하고 SQLite 단계로 이어갑니다."
        ]
      },
      {
        "id": "backend-sqlite",
        "title": "SQLite 데이터베이스의 카드 가져오기",
        "minutes": 20,
        "optional": false,
        "body": "### Python 목록 대신 SQLite에 데이터를 보관합니다\n\nSQLite는 표와 행을 한 파일에 저장하는 데이터베이스입니다. Python에 포함된 `sqlite3`를 사용하므로 이번 연습에 별도 DB 서버는 필요하지 않습니다. 예제의 `courses.sqlite3`는 **git-practice/course-card/server-data** 안에 생성합니다.\n\n서버를 켠 상태에서 **두 번째 PowerShell 터미널**을 엽니다. 새 터미널은 프로젝트 루트에서 시작할 수 있으므로 먼저 실습 폴더로 이동하고 확인한 뒤 실행합니다.\n\n```powershell\ncd ~/git-practice/course-card/server-data\npwd\n.\\.venv\\Scripts\\python.exe seed.py\n```\n\n`cd`와 `pwd`는 Windows PowerShell의 `Set-Location`과 `Get-Location` 기본 별칭입니다. cmd에서는 `cd /d %USERPROFILE%\\git-practice\\course-card\\server-data`와 인수 없는 `cd`를, macOS/Linux 셸에서는 `cd ~/git-practice/course-card/server-data`와 `pwd`를 사용합니다. macOS/Linux에서 가상환경의 Python 경로는 `.venv/bin/python`입니다. `seed.py`는 Python 목록의 데이터를 `lessons` 표가 **비어 있을 때만** 넣습니다. 기존 행이 있다면 삭제하거나 덮어쓰지 않고 유지합니다.\n\n### SQLite를 읽는 라우트 직접 추가하기\n\n첫 번째 터미널에서 `Ctrl+C`로 서버를 중지합니다. 앞에서 만든 `practice.py` **맨 아래에** 다음 코드를 이어서 입력하고 저장합니다. 기존 `/api/dict` 코드는 지우지 않습니다.\n\n```python\nfrom pathlib import Path\nfrom contextlib import closing\nimport sqlite3\nfrom fastapi import HTTPException\n\ndef read_lessons_from_db():\n    database = Path(__file__).resolve().parent / \"courses.sqlite3\"\n    if not database.is_file():\n        raise HTTPException(status_code=503, detail=\"먼저 seed.py를 실행하세요.\")\n    with closing(sqlite3.connect(database)) as connection:\n        connection.row_factory = sqlite3.Row\n        rows = connection.execute(\n            \"SELECT title, minutes, description FROM lessons ORDER BY id\"\n        ).fetchall()\n        return [dict(row) for row in rows]\n\n@app.get(\"/api/sqlite\")\ndef api_sqlite():\n    return read_lessons_from_db()\n```\n\n`read_lessons_from_db()`는 DB 파일을 열고 `lessons` 표의 행을 딕셔너리 목록으로 바꿉니다. 아직 DB 파일이 없다면 503 응답으로 `seed.py` 준비를 안내합니다. `@app.get(\"/api/sqlite\")`는 이 목록을 JSON으로 돌려주는 두 번째 라우트입니다.\n\n첫 번째 터미널에서 서버를 다시 실행합니다. 가상환경을 활성화하지 않았다면 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 씁니다.\n\n```powershell\npython -m uvicorn practice:app\n```\n\n브라우저에서 [SQLite 데이터 카드](http://127.0.0.1:8000/static/03-sqlite-api.html)를 열고, [SQLite JSON 응답](http://127.0.0.1:8000/api/sqlite)도 확인합니다. FastAPI는 DB 행을 읽어 JSON으로 응답하고, HTML은 `fetch('/api/sqlite')`로 받아 같은 카드에 표시합니다. DB가 아직 없으면 먼저 `seed.py`를 실행하라는 안내가 나타납니다.\n\n두 번째 터미널에서 다음 스크립트를 실행하고 SQLite 카드 화면을 새로고침합니다.\n\n```powershell\n.\\.venv\\Scripts\\python.exe add_card.py\n```\n\n`마크다운` 카드가 추가됩니다. 같은 카드가 이미 있으면 중복하지 않고 기존 데이터를 유지합니다. Python 목록(`/api/dict`)은 별개이므로 DB에 추가한 카드가 자동으로 들어가지는 않습니다. [Python sqlite3 공식 문서](https://docs.python.org/3/library/sqlite3.html)\n\n지금까지는 브라우저가 JSON 응답을 받아 화면을 채웠습니다. 다음에는 서버가 같은 DB 데이터와 템플릿을 합쳐 HTML을 먼저 만들어 보냅니다.",
        "presentationPoints": [
          "seed.py로 연습 DB를 준비하고 기존 데이터는 보존합니다.",
          "practice.py에 /api/sqlite 라우트를 추가해 DB의 JSON과 카드를 확인합니다."
        ]
      },
      {
        "id": "web-jinja",
        "title": "Jinja2 템플릿에 DB 데이터 넣기",
        "minutes": 20,
        "optional": false,
        "body": "### 같은 SQLite 데이터를 템플릿에 전달합니다\n\n이전 단계의 `/api/sqlite`는 **JSON 데이터**를 응답했고, 브라우저가 HTML에 내용을 넣었습니다. 이제 같은 `practice.py`에 화면을 만드는 라우트를 직접 추가합니다. 서버를 `Ctrl+C`로 중지하고 기존 코드 아래에 다음 코드를 이어 적어 저장합니다.\n\n```python\nfrom fastapi import Request\nfrom fastapi.responses import HTMLResponse\nfrom fastapi.templating import Jinja2Templates\n\ntemplates = Jinja2Templates(directory=\"templates\")\n\n@app.get(\"/sqlite\", response_class=HTMLResponse)\ndef template_sqlite(request: Request):\n    return templates.TemplateResponse(\n        request=request,\n        name=\"cards.html\",\n        context={\"lessons\": read_lessons_from_db(), \"source\": \"SQLite 데이터베이스\"},\n    )\n```\n\n`Jinja2Templates`는 `templates` 폴더의 HTML을 찾고, `@app.get(\"/sqlite\")`는 해당 주소의 요청을 처리합니다. `context`의 `lessons`에 바로 앞에서 만든 DB 조회 함수의 결과를 넣고 `source`에는 화면에 표시할 문구를 전달합니다. `request`는 현재 요청 정보를 템플릿 응답에 전달합니다.\n\n서버를 다시 실행한 뒤 [템플릿 카드](http://127.0.0.1:8000/sqlite)를 엽니다. 활성화한 터미널에서 실행하며, 활성화하지 않았다면 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 씁니다.\n\n```powershell\npython -m uvicorn practice:app\n```\n\nFastAPI가 같은 DB 행을 읽어 `templates/cards.html`에 전달하고 Jinja2가 공통 구조와 데이터를 합쳐 **HTML 응답**을 만듭니다. 화면에는 앞에서 DB에 추가한 마크다운 카드도 나타납니다.\n\n복사해 둔 `templates/cards.html`을 VS Code로 열면 다음과 같은 핵심 부분이 보입니다. 이 파일을 새로 만들거나 덮어쓸 필요는 없습니다.\n\n```html\n{% for lesson in lessons %}\n  <h2>{{ lesson.title }}</h2>\n  <p>{{ lesson.minutes }}분</p>\n  <p>{{ lesson.description }}</p>\n{% endfor %}\n```\n\n`{% for ... %}`는 목록의 카드 구조를 반복하고, `{{ ... }}`는 데이터 값을 넣습니다. 서버는 완성된 HTML을 응답하고 브라우저는 그 HTML을 표시합니다. 그 뒤 Alpine이 버튼의 펼치기 동작을 담당합니다. Tailwind는 모양을 담당합니다. [FastAPI Jinja2 공식 안내](https://fastapi.tiangolo.com/advanced/templates/)\n\n**비교:** `/api/sqlite`는 DB의 JSON 응답, `/sqlite`는 같은 데이터를 담은 HTML 응답입니다. 데이터는 같은 DB에 있으며 화면을 조립하는 위치가 다릅니다. Jinja2는 서버 템플릿 도구이며 데이터베이스나 서버 자체는 아닙니다. Django의 템플릿 언어도 같은 목적을 갖지만 문법과 설정은 다릅니다.\n\n이 화면은 FastAPI가 Jinja 템플릿을 처리해 응답하므로 FastAPI의 `/sqlite` 주소로 엽니다. 템플릿 파일을 Live Server로 직접 열면 서버에서 데이터를 넣어 주지 않습니다. 이 예제의 Tailwind와 Alpine은 CDN에서 불러오므로 인터넷 연결이 필요합니다. 화면과 데이터는 FastAPI 주소에서 확인하므로 여기서는 Live Server가 따로 필요하지 않습니다.\n\n이 예제는 학습용 로컬 서버입니다. GitHub Pages는 정적 HTML을 제공하며 FastAPI와 SQLite 실행을 대신하지 않습니다.\n\n**직접 확인:** `cards.html`의 `{{ lesson.title }}`을 찾아 데이터가 들어갈 위치를 확인합니다. 그다음 `source`의 문구를 `practice.py`에서 바꾸어 저장하고 서버를 재시작한 뒤 `/sqlite` 화면의 출처가 바뀌는지 확인합니다. 세 라우트를 순서대로 작성한 완성본은 복사해 둔 `practice_complete.py`에서 비교할 수 있습니다.",
        "presentationPoints": [
          "practice.py에 템플릿을 반환하는 /sqlite 라우트를 직접 추가합니다.",
          "DB 조회 결과와 source를 cards.html에 전달하고 JSON과 HTML 응답을 비교합니다."
        ]
      }
    ],
    "steps": [
      {
        "id": "backend-html-json",
        "title": "HTML 안 JSON 수정하기",
        "description": "HTML에 담긴 JSON을 바꾸고 정적 카드 화면을 새로고침합니다.",
        "scene": "code",
        "code": "<script type=\"application/json\" id=\"lesson-data\">\n[{\"title\":\"Git\",\"minutes\":25,\"description\":\"변경 확인\"}]\n</script>\nJSON.parse(document.getElementById(\"lesson-data\").textContent)",
        "language": "html",
        "output": "HTML 안의 JSON을 브라우저가 읽어 카드에 표시합니다.",
        "focus": "frontend",
        "fileName": "static/01-local-json.html",
        "files": [
          "static/01-local-json.html"
        ]
      },
      {
        "id": "backend-start",
        "title": "FastAPI 첫 라우트 작성하고 실행하기",
        "description": "가상환경을 준비한 뒤 practice.py에 FastAPI와 /api/dict 라우트를 직접 작성하고 실행합니다.",
        "scene": "terminal",
        "code": "pwd\nls\npy -3 --version\n# 새 연습 폴더에 .venv가 없을 때 만듭니다.\npy -3 -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\n# VS Code에서 practice.py를 작성하고 저장합니다.\npython -m uvicorn practice:app",
        "language": "powershell",
        "output": "가상환경에서 FastAPI를 실행하고 카드와 JSON을 확인합니다.",
        "focus": "backend",
        "fileName": "practice.py · PowerShell",
        "files": [
          "practice.py",
          "sample_data.py",
          "requirements.txt",
          "static/02-dict-api.html"
        ]
      },
      {
        "id": "backend-db-init",
        "title": "SQLite 연습 DB 준비와 데이터 추가",
        "description": "두 번째 터미널에서 DB를 준비하고 practice.py에 /api/sqlite 라우트를 직접 추가합니다.",
        "scene": "terminal",
        "code": "pwd\n.\\.venv\\Scripts\\python.exe seed.py\n.\\.venv\\Scripts\\python.exe add_card.py",
        "language": "powershell",
        "output": "추가한 /api/sqlite 라우트의 JSON과 카드에서 마크다운 항목을 확인합니다.",
        "focus": "backend",
        "fileName": "seed.py · add_card.py",
        "files": [
          "seed.py",
          "add_card.py",
          "courses.sqlite3"
        ]
      },
      {
        "id": "backend-template",
        "title": "템플릿 응답 라우트 직접 추가하기",
        "description": "practice.py에 /sqlite 라우트를 추가해 DB 데이터를 cards.html에 전달합니다.",
        "scene": "code",
        "code": "from fastapi import Request\nfrom fastapi.responses import HTMLResponse\nfrom fastapi.templating import Jinja2Templates\n\ntemplates = Jinja2Templates(directory=\"templates\")\n\n@app.get(\"/sqlite\", response_class=HTMLResponse)\ndef template_sqlite(request: Request):\n    return templates.TemplateResponse(\n        request=request,\n        name=\"cards.html\",\n        context={\"lessons\": read_lessons_from_db(), \"source\": \"SQLite 데이터베이스\"},\n    )",
        "language": "python",
        "output": "/sqlite는 DB 데이터를 반영한 HTML을 응답합니다. /api/sqlite의 JSON과 구분합니다.",
        "focus": "backend",
        "fileName": "practice.py",
        "files": [
          "practice.py",
          "templates/cards.html",
          "courses.sqlite3"
        ]
      }
    ],
    "checklist": [
      "HTML 안 JSON과 Python·SQLite의 데이터 위치를 구분한다.",
      "Python과 가상환경을 준비하고 FastAPI 앱과 /api/dict 라우트를 직접 작성·실행한다.",
      "/api/sqlite 라우트를 추가하고 브라우저가 JSON을 fetch하는 과정을 설명한다.",
      "/sqlite 라우트에서 템플릿에 DB 데이터를 전달해 HTML을 만든다."
    ],
    "pitfalls": [
      {
        "title": "정적 배포와 서버 실행 구분",
        "body": "GitHub Pages는 Python 서버나 SQLite 질의를 실행하지 않습니다. FastAPI 서버는 연습 컴퓨터에서 별도로 실행합니다."
      },
      {
        "title": "Python 목록과 DB는 별개입니다",
        "body": "seed.py는 빈 DB에만 데이터를 넣습니다. 이후 두 저장소의 변경은 자동 동기화되지 않습니다."
      },
      {
        "title": "가상환경은 터미널마다 확인합니다",
        "body": "새 탭에서는 활성화가 이어지지 않습니다. .venv의 Python 경로를 직접 사용하거나 그 탭에서 다시 활성화합니다."
      },
      {
        "title": "가상환경 활성화가 막히면",
        "body": "PowerShell 실행 정책을 변경하지 않고 .venv\\Scripts\\python.exe를 직접 지정해 같은 가상환경을 사용할 수 있습니다."
      }
    ],
    "glossary": [
      {
        "term": "FastAPI",
        "definition": "Python으로 HTTP 요청을 처리하는 백엔드 웹 프레임워크입니다."
      },
      {
        "term": "Jinja2",
        "definition": "서버에서 템플릿에 데이터를 채워 HTML을 만드는 도구입니다."
      },
      {
        "term": "SQLite",
        "definition": "파일에 표와 행을 저장하는 데이터베이스입니다."
      },
      {
        "term": "venv 가상환경",
        "definition": "Python 프로젝트별 패키지를 분리해 관리하기 위해 만드는 환경입니다."
      },
      {
        "term": "pip",
        "definition": "선택한 Python 환경에 필요한 패키지를 설치하는 도구입니다."
      },
      {
        "term": "Uvicorn",
        "definition": "FastAPI 앱을 실행해 브라우저의 HTTP 요청을 처리하는 서버입니다."
      },
      {
        "term": "라우트",
        "definition": "특정 주소의 요청을 처리할 함수를 연결한 규칙입니다."
      }
    ],
    "references": [
      {
        "title": "FastAPI 템플릿",
        "url": "https://fastapi.tiangolo.com/advanced/templates/"
      },
      {
        "title": "Python sqlite3",
        "url": "https://docs.python.org/3/library/sqlite3.html"
      },
      {
        "title": "서버 실행",
        "url": "https://fastapi.tiangolo.com/deployment/manually/"
      },
      {
        "title": "Python Windows 설치",
        "url": "https://docs.python.org/3/using/windows.html"
      },
      {
        "title": "Python 가상환경",
        "url": "https://docs.python.org/3/library/venv.html"
      },
      {
        "title": "FastAPI 첫 라우트",
        "url": "https://fastapi.tiangolo.com/tutorial/first-steps/"
      },
      {
        "title": "FastAPI 정적 파일",
        "url": "https://fastapi.tiangolo.com/tutorial/static-files/"
      }
    ],
    "closing": "HTML 내부 JSON에서 시작해 Python과 SQLite 데이터를 JSON으로 가져왔고, 마지막에는 같은 DB 데이터를 템플릿으로 HTML에 채웠습니다.",
    "presentation": {
      "caseSummary": "Python의 카드 데이터를 Jinja 템플릿에 전달해 Git 제목과 시간을 화면에 표시하는 흐름을 봅니다.",
      "demo": {
        "program": "VS Code · PowerShell · 브라우저",
        "file": "practice.py · sample_data.py · courses.sqlite3 · templates/cards.html",
        "command": "HTML 안 JSON 확인 → Python 설치와 VS Code Python 확장 준비\n.venv 생성·선택과 패키지 설치 → practice.py에 /api/dict 작성\npython -m uvicorn practice:app → 카드·JSON 확인\nseed.py 실행 → /api/sqlite 추가 후 JSON·카드 확인\n/sqlite 추가 → cards.html에 데이터 전달 확인",
        "expectedResult": "작성한 세 라우트로 Python·SQLite JSON과 Jinja HTML을 확인합니다.",
        "durationMinutes": 20
      },
      "returnSummary": "정적 카드에는 Live Server를 쓰고, FastAPI가 화면·API·템플릿을 제공하는 단계에서는 FastAPI 주소로 전환했습니다."
    }
  }
];
