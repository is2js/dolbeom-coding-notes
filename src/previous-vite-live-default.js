// Published frontend lesson before the live Vite demonstration.
export const previousViteLiveDefault = {
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
    "body": "![AI가 사이트 결과물을 ZIP으로 제공하고 npm install과 npm run dev를 안내한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n### 터미널 강의에서 만났던 실제 화면\n\n처음 강의에서 AI가 프로젝트 ZIP과 함께 `npm install`, `npm run dev`를 알려 준 화면을 보았습니다. 그때는 터미널에서 실행해야 한다는 점만 확인했죠. 이제 앞에서 만든 카드 화면을 바탕으로 **왜 이런 명령이 필요한지** 읽어 봅니다.\n\n이 명령은 **해당 프로젝트에서 안내한 실행 방법**입니다. 모든 사이트에 똑같이 쓰는 필수 명령은 아닙니다. 서버를 켜는 프로그램도 프로젝트마다 다릅니다. 이 화면은 실제 AI 답변이며 아래 연습은 같은 원리를 이해하기 위한 별도 예제입니다.\n\n### 오늘 확인할 순서\n\n앞에서 만든 카드가 브라우저에서 실행되는 프론트엔드라는 점을 살펴보고, `package.json`에 적힌 `dev`가 어떤 명령인지 읽습니다. 우리가 만든 카드는 VS Code의 Live Server로 실행해 저장한 수정 결과를 확인합니다. AI가 안내한 프로젝트에서는 Vite와 npm이 무엇을 하는지 이해하며, 이번 실습에서 npm을 직접 실행할 필요는 없습니다. 이어 사용자 화면과 백엔드가 요청과 응답으로 연결되는 모습을 설명합니다.",
    "question": "브라우저에 보이는 카드와 npm 개발 서버는 각각 어떤 일을 할까요?"
  },
  "objectives": [
    "HTML·CSS·JavaScript와 Tailwind·Alpine이 브라우저 화면에서 하는 일을 말한다.",
    "Live Server로 카드의 로컬 주소를 열고 저장 후 화면 변화를 확인한다.",
    "초기 Windows의 Node.js·npm 준비와 Vite 프로젝트 파일을 읽고 Live Server와 구분한다.",
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
      "body": "### 1. 우리가 만든 카드를 Live Server로 실행하기\n\n앞에서 VS Code로 만든 `index.html`, `style.css`, `script.js`를 다시 봅니다. VS Code의 **Live Server 확장**으로 카드 폴더의 `index.html`을 우클릭하고 **Open with Live Server**를 선택합니다. 예를 들어 `http://127.0.0.1:5500/`이 열립니다. 주소와 포트는 설정에 따라 달라질 수 있습니다.\n\n**직접 시연:** 카드 제목을 바꾸고 저장해 브라우저의 변화를 확인한 뒤 원래대로 되돌립니다. Live Server는 저장된 HTML·CSS·JavaScript를 로컬 주소로 제공하고 변경 시 브라우저를 새로고침합니다. 이 단순 카드 실습에는 Node.js와 npm이 필요하지 않습니다. [Live Server 확장 안내](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n\n### 2. 같은 카드가 Vite 프로젝트에 있다면?\n\n앞에서 사용한 `git-practice/course-card/03-javascript` 폴더에서 같은 카드 실습을 이어갑니다. [강의 카드 Vite 예제 저장소](https://github.com/is2js/course-card-vite-example)는 설정을 읽어 볼 참고 자료입니다. 이 저장소를 따로 복제하지 않아도 됩니다. 수업의 카드 시연은 Live Server로 진행하며, Vite 실행은 선택 사항입니다. 직접 시험한다면 `03-javascript`에 `package.json`이 이미 있는지 먼저 확인하세요. 기존 파일은 덮어쓰지 않고 그 안의 `scripts`와 의존성을 살펴봅니다.\n\n```text\ncourse-card-vite-example/  ← Vite 예제 저장소\n├─ index.html               ← 화면의 구조\n├─ style.css                ← 화면의 모양\n├─ script.js                ← 버튼 동작\n├─ package.json             ← 프로젝트와 실행 작업 설정\n└─ package-lock.json        ← 설치되는 패키지 버전의 구체적인 기록\n```\n\nHTML·CSS·JavaScript는 앞에서 직접 만들었습니다. 위 파일 구조와 아래 설정은 참고 저장소의 예시이며, 실제 카드 실습은 `git-practice/course-card/03-javascript`에서 이어갑니다.\n\n**`package.json`: 프로젝트의 약속**\n\n정확한 파일 이름은 **`package.json`**입니다. 프로젝트 이름, 필요한 패키지와 실행 작업을 기록합니다. 아래는 참고 저장소의 예제 파일 전체입니다. `03-javascript`에서 직접 만들 경우 기존 파일이 없을 때만 새로 만듭니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite --host 127.0.0.1 --port 5173\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"6.4.1\"\n  }\n}\n```\n\n- `name`과 `version`은 이 프로젝트를 구분하는 이름과 버전입니다. 이 예제의 이름은 `course-card-vite-demo`입니다.\n- `private: true`는 이 프로젝트가 npm 패키지 저장소에 실수로 게시되는 것을 막는 설정입니다. GitHub 저장소의 공개 여부와는 별개입니다.\n- `type: \"module\"`은 Node.js가 이 프로젝트의 `.js` 파일을 기본적으로 ES 모듈 방식으로 해석하도록 하는 설정입니다.\n- `scripts`는 프로젝트에서 사용할 작업 목록입니다. 그 안의 `dev`는 작업의 이름이며, `npm run dev`를 입력하면 오른쪽에 적힌 `vite --host 127.0.0.1 --port 5173`이 실행됩니다. `--host`는 접속할 주소, `--port`는 포트를 지정합니다.\n- `devDependencies`는 개발에 필요한 패키지 목록입니다. 여기서는 Vite `6.4.1`을 지정했고, `npm install`이 이 설정을 읽어 패키지를 준비합니다.\n- `dev`의 내용은 프로젝트 작성자가 정하므로 다른 도구를 실행하거나 이 항목이 없을 수도 있습니다. AI가 `npm run dev`를 안내하면 해당 프로젝트의 `scripts.dev`부터 살펴봅니다. [npm 스크립트 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### `npm run dev`를 한 단어씩 읽기\n\n```text\nnpm       run       dev\n도구 이름   실행하기    작업 이름\n```\n\n- `npm`은 Node.js와 함께 사용하는 패키지 관리 도구입니다. 필요한 도구를 설치하고 프로젝트에 등록된 작업을 실행합니다.\n- `run`은 `package.json`의 `scripts`에 적힌 작업을 찾아 실행하라는 뜻입니다.\n- `dev`는 실행할 작업의 이름입니다. 흔히 개발을 뜻하는 development의 줄임말로 쓰며, 파일의 `scripts` 안에서 `\"dev\"`라는 이름을 찾습니다.\n\n작업 이름 없이 `npm run`만 입력하면 이 프로젝트에서 사용할 수 있는 스크립트 목록을 볼 수 있습니다. 지금은 실행하지 않고 예제의 `scripts`를 직접 읽어 봅니다.\n\n이 예제에서 `npm run dev`가 하는 일은 **`scripts`의 `dev` 값을 읽고 `vite --host 127.0.0.1 --port 5173`을 실행하는 것**입니다. 명령어의 `dev` 자체가 서버 프로그램의 이름은 아닙니다. 실제로 어떤 프로그램을 실행할지는 오른쪽 값이 결정합니다. 예를 들어 `\"dev\": \"다른 명령\"`이라면 그 다른 명령이 실행됩니다. `dev`가 없다면 npm은 해당 작업을 찾지 못했다는 오류를 표시합니다.\n\n**강사가 따라 읽는 순서**\n\n1. 터미널에서 프로젝트 폴더로 이동합니다. 이 폴더의 `package.json`을 확인합니다.\n2. `scripts` 안에서 `dev`를 찾고 콜론 오른쪽에 적힌 명령을 읽습니다.\n3. 이 예제의 `vite`는 Vite 개발 서버를 시작합니다. `--host 127.0.0.1`은 내 컴퓨터에서 접속할 주소, `--port 5173`은 문을 구별하는 포트 번호입니다.\n4. 서버가 실행되는 동안 터미널을 켜 두고 표시된 주소를 브라우저에서 엽니다. 보통 터미널에서 `Ctrl+C`를 누르면 서버를 종료합니다.\n\n`npm install`은 패키지를 준비하는 단계이고, `npm run dev`는 준비된 프로젝트의 개발 작업을 실행하는 단계입니다. `npm run dev`가 패키지 설치까지 자동으로 대신하는 것은 아닙니다. 프로젝트에 필요한 Node.js와 패키지가 준비되지 않았다면 실행 중 오류가 날 수 있습니다. 이번 수업에서는 위 순서를 **읽고 이해**하며 같은 카드는 Live Server로 엽니다. 원한다면 아래 오류 해결 절차를 참고해 Vite도 별도로 확인할 수 있습니다. [npm run 공식 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n**`package-lock.json`: 설치 결과의 기록**\n\nnpm은 설치 과정에서 패키지와 하위 패키지의 구체적인 버전 등을 기록합니다. 아래는 실제 파일의 앞부분 중 프로젝트를 나타내는 부분만 **발췌**한 것입니다. 나머지 내용은 길어서 생략했습니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"lockfileVersion\": 3,\n  \"requires\": true,\n  \"packages\": {\n    \"\": {\n      \"name\": \"course-card-vite-demo\",\n      \"version\": \"1.0.0\",\n      \"devDependencies\": {\n        \"vite\": \"6.4.1\"\n      }\n```\n\n이 기록은 여러 환경에서 비슷한 설치 결과를 재현하는 데 도움이 됩니다. 일부만 보여 준 내용이므로 이 코드 블록을 새 파일로 복사해 사용하지 않습니다. [npm lock 파일 안내](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)\n\n설치 후 생기는 `node_modules/`는 내려받은 패키지가 들어가는 폴더입니다. 위 트리의 원본 파일과 달리 **설치 전에 항상 있는 것은 아닙니다**. 직접 파일을 만들거나 수정할 곳으로 생각하지 않아도 됩니다.\n\n### 3. 초기 Windows에서 npm을 사용하려면?\n\nWindows에는 Node.js가 없거나 설치된 버전이 오래된 경우가 있습니다. `npm install`을 먼저 입력하는 것만으로 Node.js가 설치되는 것은 아닙니다. 나중에 AI가 npm 명령을 안내하면 해당 프로젝트가 요구하는 Node.js 버전을 확인하고, [Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 Windows용 설치 프로그램을 선택합니다. 일반적인 공식 Node.js 설치에는 npm이 함께 제공됩니다. 설치 방식에 따라 다를 수 있으므로 새 터미널을 열고 `node --version`과 `npm --version`으로 각각 확인합니다. 인식되지 않으면 터미널 재시작과 설치·PATH 설정을 확인합니다.\n\n아래는 **명령의 의미를 읽는 예시**입니다. 수업에서는 Live Server로 확인하며, Vite를 선택적으로 시험한다면 준비한 `git-practice/course-card/03-javascript`에서 실행합니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n1. `npm install`: 해당 프로젝트의 설정을 읽고 필요한 패키지를 준비합니다. 처음 내려받을 때 인터넷이 필요할 수 있습니다.\n2. `npm run dev`: `package.json`의 `scripts.dev`에 적힌 작업을 실행합니다. 위 예제에서는 Vite 개발 서버가 시작됩니다. 프로젝트마다 작업과 요구 버전이 다르므로 안내를 먼저 확인합니다.\n\n### 4. Live Server와 Vite의 차이\n\n브라우저는 HTML·CSS·JavaScript를 읽어 카드를 보여 줍니다. **개발 서버**는 개발 중인 파일을 브라우저가 주소로 요청했을 때 전달하는 프로그램입니다. VS Code가 파일을 편집하고 Live Server나 Vite가 파일을 제공하며 브라우저가 화면을 표시합니다. 화면을 보여 주는 브라우저와 파일을 보내 주는 서버는 서로 다른 역할입니다.\n\nLive Server는 이미 작성한 파일을 간단히 열고 저장 결과를 확인하는 데 편리합니다. Vite는 개발 중 화면을 제공하고, 프로젝트 설정에 따라 여러 파일과 패키지를 배포에 사용할 파일로 정리하는 **빌드**도 돕습니다. 빌드는 개발 중인 소스에서 배포용 결과물을 준비하는 작업입니다. 예제의 `dev`는 개발 서버를 켜는 작업이며 빌드를 실행하지 않습니다.\n\n| 비교 | 앞에서 만든 카드 + Live Server | 같은 카드의 Vite 예제 |\n| --- | --- | --- |\n| 준비 | VS Code와 Live Server 확장 | Node.js·npm과 프로젝트에 필요한 패키지 |\n| 여는 방법 | `index.html`에서 Open with Live Server | 해당 폴더에서 `npm install` 후 `npm run dev` |\n| 주소 예시 | `http://127.0.0.1:5500/` | `http://127.0.0.1:5173/` |\n| 저장 후 | 파일 변경을 감지해 브라우저 새로고침 | 일부 변경은 전체 새로고침 없이 교체(HMR), 파일·설정에 따라 새로고침 가능 |\n| 추가 역할 | 정적 파일을 로컬 주소로 제공 | 개발 서버와 배포용 파일을 만드는 빌드 도구 |\n\n**보이는 카드와 버튼 동작은 같습니다.** 단순 카드 확인에는 Live Server로 충분합니다. Vite는 여러 모듈과 패키지를 쓰는 프로젝트의 개발·빌드에 도움을 주지만, 그 자체가 React나 Vue처럼 화면을 구성하는 도구는 아닙니다. 같은 이름의 `dev` 작업이 언제나 Vite를 실행하는 것도 아닙니다. 포트 번호는 프로젝트와 설정에 따라 달라집니다. [Vite 공식 안내](https://vite.dev/guide/)\n\n### 5. Vite 실행 중 import 오류가 나오면?\n\n`npm run dev`를 실행할 때 `vite.js`의 `import { performance } from 'node:perf_hooks'` 부근에서 `SyntaxError: Unexpected token {`이 나오면 **먼저 Node.js 버전을 확인합니다.** 오래된 Node.js가 Vite의 모듈 문법을 처리하지 못할 때 볼 수 있는 증상입니다. 오류 문구만으로 실제 버전을 확정할 수는 없습니다.\n\n```powershell\nnode --version\nnpm --version\nwhere.exe node\n```\n\n`node --version`은 실제 실행되는 Node.js 버전, `npm --version`은 npm 버전, `where.exe node`는 Windows에서 발견한 Node.js 실행 파일의 위치를 보여 줍니다. 예제의 **Vite 6.4.1**은 Node.js 18.x, 20.x 또는 22 이상을 요구합니다. 19.x와 21.x는 이 버전의 지원 범위에 들어가지 않습니다. 다른 프로젝트는 요구 버전이 다를 수 있습니다. [Vite 6.4.1의 지원 Node.js 버전](https://github.com/vitejs/vite/blob/v6.4.1/packages/vite/package.json)\n\n1. 버전이 요구 조건에 맞지 않으면 [Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 현재 LTS Windows 설치 프로그램을 선택해 설치합니다. 이미 여러 프로젝트에서 특정 Node.js 버전이나 버전 관리자를 사용한다면 그 환경의 설정을 먼저 확인합니다.\n2. 터미널과 VS Code를 다시 열고 위 세 명령으로 새 버전이 선택됐는지 확인합니다. 이전 버전이 계속 나오면 `where.exe node`에서 여러 경로가 잡히는지 확인합니다.\n3. `package.json`이 있는 실제 폴더에서 이 예제를 실행하려는 경우, 파일을 확인한 후 필요한 패키지를 설치하고 서버를 켭니다.\n\n```powershell\npwd\nls\nnpm install\nnpm run dev\n```\n\nWindows PowerShell에서 `pwd`는 `Get-Location`, `ls`는 `Get-ChildItem`의 기본 별칭입니다. 수업의 카드 파일은 `git-practice/course-card/03-javascript`에 둡니다. 이미 `git-practice` 루트에 `package.json`을 만들고 실행했다면 오류를 진단할 때는 **그 루트 폴더**에서 다시 실행합니다. `03-javascript`와 루트의 설정을 덮어쓰거나 자동으로 옮기지 않습니다.\n\n`npm install`은 해당 폴더의 설정과 잠금 파일에 따라 패키지를 준비하며 잠금 파일을 갱신할 수 있습니다. 설치한 패키지를 무조건 삭제할 필요는 없습니다. 오류가 계속되면 Node.js 버전, 실행 파일 경로와 전체 오류를 확인합니다. 실행에 성공하면 터미널에 표시되는 주소를 열고 종료할 때 `Ctrl+C`를 누릅니다. 그 폴더에 `index.html`이 있어야 브라우저에서 카드가 표시됩니다.\n\nVite를 시험했다면 `node_modules/`는 다운로드된 패키지 폴더입니다. Git에 포함하지 않도록 해당 저장소의 `.gitignore`에 `node_modules/` 항목을 추가하거나 확인합니다. 기존 파일과 기록은 보존합니다.\n\n### 6. 이전 Node.js에서도 실행해 볼 수 있는 간단 서버\n\nVite 6.4.1은 정해진 Node.js 버전이 필요합니다. 설치 환경을 비교하고 싶다면 Node.js에 기본으로 들어 있는 기능만 쓰는 별도 예제도 있습니다. 이 예제는 **Node.js 10.24.1에서도 실행을 확인**했으며, Live Server의 자동 새로고침은 없으므로 저장 후 브라우저에서 직접 새로고침합니다. 현재 지원되는 Node.js LTS로 업데이트하는 것을 권장합니다.\n\n1. 원본 git-practice의 course-card 안에 **06-node-simple** 폴더를 만듭니다. 이미 존재한다면 기존 파일을 확인하고 덮어쓰지 않습니다.\n2. 앞서 직접 작성한 03-javascript의 index.html, style.css, script.js를 06-node-simple로 **복사**합니다. 기존 카드 원본은 그대로 둡니다.\n3. [간단 서버 예제 폴더](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/06-node-simple)에서 package.json과 server.cjs를 확인하고, 강의노트 저장소 ZIP이나 clone에서 두 파일을 06-node-simple에 복사합니다. 같은 이름이 이미 있다면 덮어쓰지 않습니다.\n4. VS Code 터미널을 열고 06-node-simple 폴더에서 다음 명령으로 실행합니다.\n\n```powershell\ncd ~/git-practice/course-card/06-node-simple\npwd\nnpm run dev\n```\n\ncd는 Windows PowerShell의 Set-Location, pwd는 Get-Location의 기본 별칭입니다. cmd에서는 cd /d %USERPROFILE%\\git-practice\\course-card\\06-node-simple와 cd, macOS/Linux 기본 셸에서는 cd ~/git-practice/course-card/06-node-simple와 pwd를 씁니다. 경로가 다르면 실제 경로를 사용합니다.\n\n이 예제의 package.json에는 다음처럼 적혀 있습니다.\n\n```json\n{\n  \"scripts\": {\n    \"dev\": \"node server.cjs\"\n  }\n}\n```\n\nnpm run dev는 여기서 Node.js로 server.cjs를 실행합니다. 다른 패키지는 설치하지 않으므로 npm install이 필요하지 않습니다. 표시되는 http://127.0.0.1:5173/에서 카드를 확인하고 종료할 때 Ctrl+C를 누릅니다. 이미 포트를 사용 중이면 기존 서버를 종료한 후 실행합니다.\n\n이 간단 예제는 지정된 카드 파일만 제공하는 학습용 서버입니다. Vite의 빌드와 자동 갱신 기능을 제공하지 않으며 FastAPI도 실행하지 않습니다. 앞서 git-practice 루트에 만든 package.json을 바꾸거나 삭제하지 않아도 됩니다.\n\n### 7. FastAPI와 템플릿으로 넘어가면?\n\n앞에서 살펴본 Live Server와 Vite는 카드를 개발하면서 브라우저에서 확인하는 방법입니다. 다음 실습에서는 **Python으로 만든 FastAPI 앱**이 요청을 받아 데이터를 처리하고 화면을 전달합니다. FastAPI 서버도 브라우저에 파일을 제공할 수 있어, 수업에서는 FastAPI 주소에서 카드와 데이터를 함께 확인합니다.\n\n```text\n브라우저 → FastAPI 주소로 요청\n           → Python 데이터 또는 SQLite 조회\n           → 템플릿에 데이터 채우기 → 완성된 HTML 응답\n브라우저 → 받은 HTML·CSS·JavaScript로 카드 표시\n```\n\n처음에는 HTML 안의 JSON을 읽고, 이어 FastAPI의 Python 딕셔너리와 SQLite 데이터로 바꿉니다. 그다음 Jinja2 템플릿을 사용해 서버에서 데이터를 HTML에 채웁니다. Python 패키지 설치에는 뒤에서 `pip`를 사용하며, 위 Vite 예제의 npm과는 별개의 준비 과정입니다.\n\n이후 실습에서는 FastAPI가 템플릿을 데이터로 채운 화면과 API를 제공하며, 브라우저에서 **FastAPI가 알려 준 주소**로 접속합니다. 이 구성에서는 같은 화면을 확인하려고 Live Server를 따로 켤 필요가 없습니다. 주소를 헷갈리지 않도록 VS Code 상태 표시줄 또는 **Live Server: Stop Live Server**로 중지해도 됩니다.\n\nLive Server나 Vite는 Python의 FastAPI 코드를 대신 실행하지 않습니다. 반대로 FastAPI를 쓴다고 언제나 Vite가 필요 없어지는 것은 아닙니다. 프론트엔드를 별도로 개발하는 프로젝트는 둘을 함께 사용할 수도 있지만, 우리 실습은 FastAPI 주소 하나에서 확인합니다.",
      "presentationPoints": [
        "npm run dev는 package.json의 scripts.dev에 적힌 실제 명령을 실행합니다.",
        "npm install로 도구를 준비하고 Live Server와 Vite가 브라우저에 파일을 제공하는 방식을 구분합니다.",
        "수업에서는 Live Server를 시연하고 이후 FastAPI 주소에서 데이터와 템플릿 화면을 확인합니다."
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
    "package.json에서 scripts.dev를 찾고 npm install과 npm run dev의 역할을 구분한다.",
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
      "description": "같은 카드 파일과 package.json을 강의 본문에서 읽으며 두 실행 방식을 비교합니다.",
      "scene": "code",
      "code": "Live Server: 카드 폴더의 index.html → Open with Live Server\nVite 예제: 강의 본문의 폴더 구조와 package.json → scripts.dev 확인\n읽기만 하기: npm install → npm run dev\nLive Server :5500 / Vite 예제 :5173 (포트는 달라질 수 있음)",
      "language": "text",
      "output": "카드 화면은 같지만 실행 도구와 준비 과정이 다릅니다. 실제 시연은 Live Server만 사용합니다.",
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
  "closing": "앞서 만든 카드를 Live Server로 확인하고 Vite·npm 개발 명령의 뜻을 읽었습니다. 다음에는 FastAPI가 제공하는 주소에서 Python·SQLite 데이터와 템플릿을 확인합니다.",
  "presentation": {
    "caseSummary": "첫 터미널 사례의 npm 안내를 다시 보고, 우리가 직접 사용할 Live Server와 Vite의 역할을 비교합니다. npm은 이번 실습에서 실행하지 않습니다.",
    "demo": {
      "program": "VS Code · 브라우저",
      "file": "카드 index.html · 강의 본문의 예제 파일 구조와 package.json",
      "command": "VS Code에서 카드 폴더를 열고 index.html → Open with Live Server\n표시된 주소에서 제목 변경과 저장 결과 확인\n강의 본문에서 같은 카드와 package.json의 dev 설정을 비교\n다음 FastAPI 단계에서는 FastAPI가 제공하는 주소 사용",
      "expectedResult": "같은 카드를 Live Server로 확인하고 Vite와 npm 명령의 역할을 구분합니다.",
      "durationMinutes": 5
    },
    "returnSummary": "정적 카드에는 Live Server를 사용하고, 다음 FastAPI 예제는 화면·API를 제공하는 FastAPI 주소로 전환합니다."
  }
};
