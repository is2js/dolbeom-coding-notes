// Published 08 lesson before the CDN card and Vite setup update.
export const previousWebCdnViteDefault = {
  "id": "web",
  "number": 8,
  "title": "프론트엔드: 브라우저 화면과 개발 서버 이해하기",
  "shortTitle": "프론트엔드",
  "subtitle": "앞서 만든 웹 카드부터 AI가 안내한 npm 개발 서버까지 연결하기",
  "icon": "layers",
  "durationMinutes": 56,
  "case": {
    "kind": "real",
    "title": "AI가 알려준 npm 명령은 왜 실행할까요?",
    "body": "강사가 터미널에서 강의노트의 `npm run dev`를 실행하는 실제 영상입니다. 수업에서는 우리가 만든 강의 카드 폴더에서 같은 명령을 실행합니다.\n\n![강사가 강의노트 폴더에서 npm run dev로 Vite 서버를 열고 h와 Enter로 도움말을 확인하는 터미널 화면](./assets/course/frontend-vite-terminal.gif)\n\n첫 강의에서 AI가 ZIP과 함께 `npm install`, `npm run dev`를 안내했던 장면입니다.\n\n![AI가 사이트 결과물을 ZIP으로 제공하고 npm install과 npm run dev를 안내한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n1. `npm run dev`는 현재 폴더의 `package.json`에서 `scripts.dev`에 적힌 작업을 실행합니다. 영상에서는 Vite가 `127.0.0.1:5188`을 열었습니다.\n2. 터미널의 **Local 주소**를 브라우저에서 엽니다. `127.0.0.1`은 내 컴퓨터이고, 뒤의 숫자는 포트입니다.\n3. Vite가 실행 중인 같은 터미널에서 `h` + `Enter`로 도움말을 엽니다. 영상에서는 `r` 재시작, `u` 주소 표시, `o` 브라우저 열기, `c` 출력 정리, `q` 종료를 보여 줍니다. 글자 뒤에 `Enter`를 누릅니다. 종료할 때 `Ctrl+C`도 쓸 수 있습니다.",
    "question": "브라우저에 보이는 카드와 npm 개발 서버는 각각 어떤 일을 할까요?"
  },
  "objectives": [
    "HTML·CSS·JavaScript와 Tailwind·Alpine이 브라우저 화면에서 하는 일을 말한다.",
    "Live Server로 카드의 로컬 주소를 열고 저장 후 화면 변화를 확인한다.",
    "카드 폴더의 package.json을 읽고 npm install과 npm run dev로 Vite를 실행한 뒤 도움말을 확인한다.",
    "FastAPI가 파일과 API를 함께 제공하는 경우 사용하는 서버 주소를 구분한다.",
    "React·Vue와 백엔드의 FastAPI·Flask·Django·Spring의 역할을 구분한다.",
    "HTML에 JSON 데이터를 넣고 Alpine.js로 강의 카드에 표시한다."
  ],
  "sections": [
    {
      "id": "web-map",
      "title": "프론트엔드란? 브라우저에서 보이고 움직이는 화면",
      "minutes": 12,
      "optional": false,
      "body": "**프론트엔드**는 사용자가 브라우저에서 보고 조작하는 부분입니다. 우리가 만든 카드에서 제목·모양·동작이 어디에서 왔는지 확인하세요.\n\n```text\nHTML: 제목·버튼·설명\nCSS / Tailwind CSS: 카드 여백·색\nJavaScript / Alpine.js: 설명 펼치기\n                 ↓\n           브라우저의 화면\n```\n\n### React·Vue와 Vite\n\n- **React**와 **Vue**는 카드·버튼처럼 재사용하는 화면 조각인 **컴포넌트**를 만드는 도구입니다. React는 UI 라이브러리이고, Vue는 UI 프레임워크입니다. [React 소개](https://react.dev/learn) · [Vue 소개](https://vuejs.org/guide/introduction.html)\n- **Vite**는 개발 중 브라우저에서 화면을 확인하고 배포용 파일을 준비하는 도구입니다. React·Vue와 함께 쓰거나 기본 HTML 카드와 함께 쓸 수 있습니다. [Vite 소개](https://vite.dev/guide/)",
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
      "body": "같은 강의 카드를 **Live Server → Vite** 순으로 열어 비교합니다. 실습 폴더는 `git-practice`입니다.\n\n### 1. Live Server로 열기\n\n`index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 터미널이나 브라우저에 나온 실제 주소를 확인합니다. 예시는 `http://127.0.0.1:5500/`입니다. 제목을 바꾸고 저장해 새로고침과 변경 결과를 본 뒤 되돌립니다. 이 카드의 Live Server 실습은 VS Code 확장만 준비하면 됩니다. [Live Server 확장 안내](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n\n### 2. Vite 프로젝트의 파일 읽기\n\n우리가 작성한 HTML·CSS·JavaScript에 아래 설정이 추가됩니다. [강의 카드 Vite 예제 저장소](https://github.com/is2js/course-card-vite-example)\n\n```text\ncourse-card-vite-example/  ← Vite 예제 저장소\n├─ index.html               ← 화면의 구조\n├─ style.css                ← 화면의 모양\n├─ script.js                ← 버튼 동작\n├─ package.json             ← 프로젝트와 실행 작업 설정\n└─ package-lock.json        ← 설치되는 패키지 버전의 구체적인 기록\n```\n\n**`package.json`: 프로젝트의 약속**\n\n`git-practice`에 `package.json` 파일이 없다면 아래 전체 코드를 새로 저장합니다. 이미 있다면 `scripts`와 의존성을 먼저 읽습니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite --host 127.0.0.1 --port 5173\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"6.4.1\"\n  }\n}\n```\n\n- `name`과 `version`은 프로젝트의 이름·버전입니다. `private: true`는 npm 패키지 저장소에 실수로 게시하는 것을 막고, `type: \"module\"`은 Node.js에서 `.js`를 ES 모듈로 읽도록 합니다.\n- `scripts`는 실행할 작업 목록이고, `devDependencies`는 개발에 필요한 패키지 목록입니다. `npm install`은 이 파일을 읽어 Vite `6.4.1`을 설치합니다. [npm 스크립트 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### `npm run dev`를 한 단어씩 읽기\n\n```text\nnpm       run       dev\n도구 이름   실행하기    작업 이름\n```\n\n`npm`은 Node.js 프로젝트의 패키지를 설치하고 작업을 실행하는 도구입니다. `run`은 등록된 작업을 실행하라는 뜻이고, `dev`는 작성자가 붙인 작업 이름입니다. `npm run`만 입력하면 가능한 작업을 나열합니다. 이 예제에서 `npm run dev`는 **`scripts.dev`**의 값인 `vite --host 127.0.0.1 --port 5173`을 실행합니다. `--host`는 접속 주소, `--port`는 포트를 정합니다. AI가 같은 명령을 안내하면 현재 프로젝트의 `scripts.dev`부터 확인합니다. [npm run 공식 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### 같은 강의 카드에서 Vite를 직접 실행하기\n\n1. 원본 `git-practice`의 VS Code 터미널에서 카드 폴더와 Node.js 버전을 확인합니다.\n\n```powershell\ncd ~/git-practice\npwd\nls\nnode --version\nnpm --version\n```\n\nWindows PowerShell의 `cd`·`pwd`·`ls`는 `Set-Location`·`Get-Location`·`Get-ChildItem`의 기본 별칭입니다. cmd에서 대응 명령은 `cd /d %USERPROFILE%\\git-practice`, 인수 없는 `cd`, `dir`입니다. macOS/Linux에서는 `cd ~/git-practice`, `pwd`, `ls`를 사용합니다.\n\n2. 카드 파일과 `package.json`이 보이면 아래 명령을 실행합니다. 인터넷 연결이 필요합니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n3. 터미널에 나온 **Local 주소**를 브라우저에서 엽니다. 예제 주소는 `127.0.0.1:5173`이며 이미 사용 중이면 다른 포트가 표시될 수 있습니다. 제목을 바꾸고 저장해 브라우저에 반영되는지 봅니다.\n4. 같은 터미널에서 `h` + `Enter`로 도움말을 엽니다. 예제에는 `r` 재시작, `u` 주소 표시, `o` 브라우저 열기, `c` 출력 지우기, `q` 종료가 표시됩니다. 글자 뒤에 `Enter`를 누릅니다. 서버는 `Ctrl+C`로도 종료할 수 있습니다. 강의노트 영상의 5188 서버는 별도입니다.\n\n**`package-lock.json`은 설치한 버전 기록**입니다. 아래 예시는 npm이 만든 파일의 앞부분입니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"lockfileVersion\": 3,\n  \"requires\": true,\n  \"packages\": {\n    \"\": {\n      \"name\": \"course-card-vite-demo\",\n      \"version\": \"1.0.0\",\n      \"devDependencies\": {\n        \"vite\": \"6.4.1\"\n      }\n```\n\nnpm으로 설치하면 잠금 파일이 만들어지거나 갱신되고 패키지는 `node_modules/`에 들어갑니다. `.gitignore`에 `node_modules/`가 있는지 확인합니다. [npm lock 파일 안내](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)\n\n### 3. 초기 Windows에서 Node.js 준비\n\n[Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 프로젝트에 맞는 Windows LTS 설치 프로그램을 받습니다. 일반적인 공식 설치에는 npm도 들어 있습니다. 새 터미널의 `node --version`, `npm --version` 버전이 확인되면 `git-practice`에서 다음 명령을 실행합니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n`npm install`은 패키지 설치, `npm run dev`는 등록된 개발 작업 실행입니다.\n\n### 4. Live Server와 Vite 비교\n\n| 비교 | 앞에서 만든 카드 + Live Server | 같은 카드의 Vite 예제 |\n| --- | --- | --- |\n| 준비 | VS Code와 Live Server 확장 | Node.js·npm과 프로젝트에 필요한 패키지 |\n| 여는 방법 | `index.html`에서 Open with Live Server | 해당 폴더에서 `npm install` 후 `npm run dev` |\n| 주소 예시 | `http://127.0.0.1:5500/` | `http://127.0.0.1:5173/` |\n| 저장 후 | 파일 변경을 감지해 브라우저 새로고침 | 일부 변경은 전체 새로고침 없이 교체(HMR), 파일·설정에 따라 새로고침 가능 |\n| 추가 역할 | 정적 파일을 로컬 주소로 제공 | 개발 서버와 배포용 파일을 만드는 빌드 도구 |\n\n두 방법에서 같은 카드를 확인할 수 있습니다. **빌드**는 소스를 배포용 파일로 만드는 작업입니다. 이 예제의 `dev`는 개발 서버를 켜는 작업입니다. [Vite 공식 안내](https://vite.dev/guide/)\n\n### 5. import 오류가 나면 Node.js 확인\n\n`import { performance } from 'node:perf_hooks'` 주변에서 `SyntaxError: Unexpected token {`이 나오면 현재 실행 중인 Node.js를 확인합니다.\n\n```powershell\nnode --version\nnpm --version\nwhere.exe node\n```\n\n예제의 Vite 6.4.1은 Node.js **18.x, 20.x 또는 22 이상**을 지원합니다. 조건에 맞는 버전을 다시 설치했다면 VS Code와 터미널을 다시 열고 위 명령을 실행합니다. `where.exe node`로 이전 실행 경로가 먼저 잡혔는지 확인할 수 있습니다. [Vite 6.4.1의 지원 Node.js 버전](https://github.com/vitejs/vite/blob/v6.4.1/packages/vite/package.json) · [Node.js 공식 다운로드](https://nodejs.org/en/download/)\n\n`package.json`이 있는 실제 폴더에서 재시도합니다. 원본 `git-practice`에서 실행하고 있는지 확인하세요.\n\n```powershell\npwd\nls\nnpm install\nnpm run dev\n```\n\n`pwd`와 `ls`는 PowerShell에서 `Get-Location`과 `Get-ChildItem`의 기본 별칭입니다. 브라우저에서 카드를 확인하려면 실행한 폴더에 `index.html`이 있어야 합니다. 종료는 `Ctrl+C`입니다.\n\n### 6. 보충 실습 · 이전 Node.js에서 카드 열기\n\nNode.js 10.24.1에서 확인한 간단 서버로 같은 `git-practice` 카드를 열 수 있습니다. 기존 Vite 설정은 그대로 둡니다.\n\n1. [간단 서버 예제 파일](https://github.com/is2js/dolbeom-coding-notes/blob/main/public/examples/course-card/06-node-simple/server.cjs)의 내용을 `git-practice/server.cjs`에 복사합니다. 같은 파일이 이미 있다면 덮어쓰기 전에 내용을 확인합니다.\n2. Vite 서버가 켜져 있다면 먼저 그 터미널에서 `Ctrl+C`를 눌러 종료합니다. 두 서버가 같은 5173 포트를 사용하기 때문입니다.\n3. `git-practice` 터미널에서 아래 명령을 실행합니다.\n\n```powershell\ncd ~/git-practice\npwd\nnode server.cjs\n```\n\nPowerShell의 `cd`·`pwd`는 각각 `Set-Location`·`Get-Location`의 기본 별칭입니다. cmd에서는 `cd /d %USERPROFILE%\\git-practice`와 `cd`, macOS/Linux에서는 `cd ~/git-practice`와 `pwd`를 사용합니다.\n\n터미널에 표시된 주소에서 카드를 열고 새로고침으로 변경을 확인합니다. 종료는 `Ctrl+C`입니다. 기존 `package.json`은 바꾸지 않습니다.\n\n### 7. 후속 강의 · FastAPI로 같은 카드 열기\n\n```text\n브라우저 → FastAPI 주소로 요청\n           → Python 데이터 또는 SQLite 조회\n           → 템플릿에 데이터 채우기 → 완성된 HTML 응답\n브라우저 → 받은 HTML·CSS·JavaScript로 카드 표시\n```\n\n후속 예제는 **FastAPI의 주소 하나**에서 브라우저 화면과 데이터를 확인합니다. VS Code의 **Live Server: Stop Live Server**로 기존 서버를 닫고 구분해도 됩니다. Python의 `pip`는 Python 패키지를 설치하는 도구입니다.",
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
      "body": "브라우저가 주소를 열면 서버에 **요청**을 보내고 받은 파일을 화면으로 그립니다.\n\n```text\n브라우저  ── 카드 파일 요청 ──→  Live Server\n브라우저  ←─ HTML·CSS·JS ───  Live Server\n```\n\n`127.0.0.1`이나 `localhost`는 주소를 연 내 컴퓨터를 가리킵니다. Live Server의 `127.0.0.1:5500`과 FastAPI의 `127.0.0.1:8000`처럼 숫자로 접속할 서비스를 구분합니다.\n\n### 어떤 일을 맡나요?\n\n- **프론트엔드**는 사용자가 보고 누르는 화면입니다.\n- **백엔드**는 서버에서 요청을 받고 데이터를 준비·저장하는 부분입니다.\n\n| 영역 | 대표 예시 | 이 강의에서의 역할 |\n| --- | --- | --- |\n| 프론트엔드 | React, Vue | 브라우저에서 카드·버튼 같은 화면을 구성하는 방법을 제공합니다. |\n| 백엔드 · Python | FastAPI, Flask, Django | 요청에 응답하고 데이터를 처리하는 서버를 만드는 데 사용합니다. |\n| 백엔드 · Java/Kotlin | Spring 또는 Spring Boot | Java나 Kotlin으로 서버 애플리케이션을 만드는 데 사용합니다. |\n\nFastAPI, Flask, Django로 Python 서버를 만들 수 있습니다. Spring Boot는 Spring 서버 앱의 설정과 실행을 돕습니다. [FastAPI](https://fastapi.tiangolo.com/) · [Flask](https://flask.palletsprojects.com/en/stable/) · [Django](https://www.djangoproject.com/) · [Spring Boot](https://spring.io/projects/spring-boot/)\n\n### 화면과 데이터를 받을 주소\n\n후속 강의에서는 FastAPI가 화면 파일 `/static/...`과 데이터 `/api/...`를 같은 주소로 제공합니다. 예를 들어 `http://127.0.0.1:8000/static/02-dict-api.html`에서 실행하는 `fetch('/api/dict')`도 FastAPI 8000번으로 요청합니다.\n\n같은 HTML을 Live Server의 `:5500`에서 열면 `/api/dict`는 `:5500/api/dict`에 요청을 보냅니다. 서버를 나누는 프로젝트는 API 주소와 출처 설정을 맞춥니다. [FastAPI CORS 안내](https://fastapi.tiangolo.com/tutorial/cors/)",
      "presentationPoints": [
        "React·Vue는 브라우저 화면을 구성하는 대표적인 도구입니다.",
        "FastAPI·Flask·Django와 Spring은 서버를 만드는 도구입니다.",
        "이번 실습은 FastAPI 주소에서 화면과 API를 함께 확인합니다."
      ]
    },
    {
      "id": "web-json-card",
      "title": "HTML 안의 JSON으로 카드 데이터 표현하기",
      "minutes": 10,
      "optional": false,
      "body": "### 1. 복사본 준비하기\n\n기존 `git-practice/index.html`을 같은 폴더의 `json-practice.html`로 복사합니다. 같은 이름의 파일이 있으면 내용을 먼저 확인하고, 복사한 `json-practice.html`에서 아래 실습을 진행합니다. [JSON 카드 예제](./examples/course-card/server-data/static/01-local-json.html) · [예제 저장소](https://github.com/is2js/dolbeom-coding-notes)\n\n### 2. 카드 앞에 JSON 추가하기\n\n기존 `<body>`의 `<article>` 위치를 찾습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`<body>` 바로 아래, `<article>` 앞에 JSON 블록을 넣습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <script type=\"application/json\" id=\"lesson-data\">\n  [\n    {\"title\": \"윈도우 터미널\", \"minutes\": 30, \"description\": \"폴더를 확인하고 탐색기와 오갑니다.\"},\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}\n  ]\n  </script>\n\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`lesson-data`는 데이터를 찾을 이름입니다. `[]` 안의 `{}` 하나가 카드 한 장입니다. 여기까지 저장하면 화면에는 기존 Git 카드 한 장이 보입니다.\n\n### 3. Alpine.js로 JSON 읽기\n\n기존 `<article>`부터 `</article>`까지 아래 `<main>` 전체로 교체합니다. JSON 블록과 CDN 연결은 둡니다.\n\n```html\n  <main class=\"mx-auto max-w-3xl p-6\"\n        x-data=\"{ lessons: JSON.parse(document.getElementById('lesson-data').textContent) }\">\n    <h1 class=\"mb-4 text-2xl font-bold\">나의 강의 카드</h1>\n    <p>데이터 출처: HTML 안의 JSON</p>\n    <ul class=\"grid gap-4 md:grid-cols-2\">\n      <template x-for=\"(lesson, index) in lessons\" :key=\"index\">\n        <li>\n          <article class=\"rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n            <h2 class=\"text-xl font-bold\" x-text=\"lesson.title\"></h2>\n            <p><span x-text=\"lesson.minutes\"></span>분</p>\n            <button type=\"button\" class=\"mt-4 rounded bg-slate-800 px-3 py-2 text-white\"\n                    @click=\"open = !open\" :aria-expanded=\"open\">설명 보기</button>\n            <p class=\"mt-3\" x-show=\"open\" x-cloak x-text=\"lesson.description\"></p>\n          </article>\n        </li>\n      </template>\n    </ul>\n  </main>\n```\n\n`getElementById('lesson-data').textContent`로 글자를 가져오고 `JSON.parse`로 읽어 `lessons`에 담습니다. `x-for`로 카드 수만큼 반복하고 `x-text`로 제목·시간·설명을 채웁니다.\n\n### 4. 카드 두 장 확인하기\n\n**Open with Live Server**로 열고 카드 두 장과 버튼을 확인합니다. CDN에 연결되어 있어야 합니다. JSON에서 Git 제목만 바꾸고 저장해 카드가 바뀌는지 봅니다. 카드가 비어 있으면 큰따옴표와 쉼표를 확인하세요.",
      "presentationPoints": [
        "HTML 안 JSON을 JSON.parse로 읽고 같은 카드에 표시합니다.",
        "정적 파일을 수정·저장하고 브라우저에서 확인합니다."
      ]
    },
    {
      "id": "web-future-backend",
      "title": "후속 강의 예고: Python 데이터와 SQLite",
      "minutes": 4,
      "optional": false,
      "body": "지금은 **HTML 안 JSON → Alpine.js → 브라우저 카드**까지 완성했습니다.\n\n**다음 강의**에서는 같은 카드의 데이터를 서버에서 가져오는 세 단계를 살펴봅니다.\n\n1. **Python 딕셔너리**의 카드 목록을 FastAPI가 JSON으로 보냅니다.\n2. **SQLite**에 데이터를 저장하고 FastAPI가 읽습니다.\n3. **Jinja2** 템플릿에 데이터를 채워 서버에서 HTML을 만듭니다.\n\n데이터·백엔드 강의는 준비 중입니다. 그림에서 데이터의 위치가 어떻게 바뀌는지 살펴보고 이번 강의를 마칩니다.",
      "presentationPoints": [
        "이번에는 HTML 안 JSON을 Alpine.js로 읽어 카드를 표시합니다.",
        "후속 강의에서 Python 딕셔너리와 SQLite 데이터를 FastAPI로 전달합니다.",
        "Jinja2 템플릿으로 데이터를 화면에 채우는 흐름도 살펴볼 예정입니다."
      ]
    },
    {
      "id": "web-bonus",
      "title": "보충 노트: 주소의 경로와 해시, 빌드 결과 구분",
      "minutes": 5,
      "optional": true,
      "body": "- `#/lesson/terminal`의 `#` 뒤는 **프래그먼트**입니다. 브라우저가 이 값으로 강의를 고릅니다. 서버로 보내는 요청에는 이 부분이 빠집니다.\n- `/data/course.json` 같은 파일의 주소는 배포 경로에 따라 달라집니다.\n- 코드 수정은 원본에서 하고, **빌드**로 배포 파일을 만듭니다. 브라우저에 전달된 JavaScript와 데이터는 열어 볼 수 있으므로 권한이 필요한 동작은 서버에서 확인합니다."
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
    "React·Vue와 Vite, Python 백엔드 프레임워크와 Spring의 역할을 구분한다.",
    "HTML 안 JSON 데이터를 Alpine.js로 읽어 두 카드를 표시한다."
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
      "description": "Live Server의 정적 카드와 후속 강의에서 다룰 FastAPI 서버의 역할을 구분합니다.",
      "scene": "architecture",
      "code": "카드 실습: 브라우저 ↔ Live Server :5500 (예시)\n다음 실습: 브라우저 ↔ FastAPI :8000 /static/... · /api/...\n포트는 실제 표시된 값 확인",
      "language": "text",
      "output": "후속 예제에서는 FastAPI 주소로 화면과 데이터를 함께 제공할 수 있습니다.",
      "focus": "web",
      "fileName": "브라우저 · 로컬 서버",
      "files": [
        "index.html",
        "main.py"
      ]
    },
    {
      "id": "web-json-practice",
      "title": "HTML 안 JSON 수정하기",
      "description": "HTML에 담긴 JSON을 바꾸고 정적 카드 화면을 새로고침합니다.",
      "scene": "code",
      "code": "<script type=\"application/json\" id=\"lesson-data\">\n[{\"title\":\"Git\",\"minutes\":25,\"description\":\"변경 확인\"}]\n</script>\nJSON.parse(document.getElementById(\"lesson-data\").textContent)",
      "language": "html",
      "output": "HTML 안의 JSON을 브라우저가 읽어 카드에 표시합니다.",
      "focus": "frontend",
      "fileName": "git-practice/json-practice.html",
      "files": [
        "git-practice/json-practice.html"
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
  "closing": "터미널과 Git부터 웹 카드, Live Server와 Vite, HTML 안 JSON까지 살펴보았습니다. 다음 강의에서는 Python 데이터와 SQLite를 같은 카드에 연결할 예정입니다.",
  "presentation": {
    "caseSummary": "강사가 강의노트에서 npm run dev로 Vite 서버를 열고 h와 Enter로 도움말을 확인하는 실제 장면을 봅니다. 이어 강의 카드에서도 개발 서버를 실행합니다.",
    "demo": {
      "program": "VS Code · 브라우저",
      "file": "카드 index.html · 강의 본문의 예제 파일 구조와 package.json",
      "command": "카드를 Live Server로 열고 저장 결과 확인\n카드 폴더에서 package.json 확인 → npm install → npm run dev\n표시된 Local 주소 열고 실행 중 터미널에서 h + Enter\nHTML 안 JSON을 Alpine.js로 읽어 카드 두 개 표시\n후속 Python 데이터와 SQLite 흐름 살펴보고 마무리",
      "expectedResult": "같은 카드를 Live Server와 Vite로 확인하고 HTML 안 JSON으로 카드 두 개를 표시합니다.",
      "durationMinutes": 5
    },
    "returnSummary": "HTML 안 JSON을 Alpine.js로 카드에 표시했고, Python과 SQLite 연결은 준비 중인 후속 강의에서 이어갈 예정입니다."
  }
};
