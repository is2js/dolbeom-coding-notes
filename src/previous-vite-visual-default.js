// Published frontend lesson before the Vite and framework visual update.
export const previousViteVisualDefault = {
  "id": "web",
  "number": 8,
  "title": "프론트엔드: 브라우저 화면과 개발 서버 이해하기",
  "shortTitle": "프론트엔드",
  "subtitle": "앞서 만든 웹 카드부터 AI가 안내한 npm 개발 서버까지 연결하기",
  "icon": "layers",
  "durationMinutes": 30,
  "case": {
    "kind": "real",
    "title": "AI가 알려준 npm 명령은 왜 실행할까요?",
    "body": "![AI가 사이트 결과물을 ZIP으로 제공하고 npm install과 npm run dev를 안내한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n### 터미널 강의에서 만났던 실제 화면\n\n처음 강의에서 AI가 프로젝트 ZIP과 함께 `npm install`, `npm run dev`를 알려 준 화면을 보았습니다. 그때는 터미널에서 실행해야 한다는 점만 확인했죠. 이제 앞에서 만든 카드 화면을 바탕으로 **왜 이런 명령이 필요한지** 읽어 봅니다.\n\n이 명령은 **해당 프로젝트에서 안내한 실행 방법**입니다. 모든 사이트에 똑같이 쓰는 필수 명령은 아닙니다. 서버를 켜는 프로그램도 프로젝트마다 다릅니다. 이 화면은 실제 AI 답변이며 아래 연습은 같은 원리를 이해하기 위한 별도 예제입니다.\n\n### 오늘 확인할 순서\n\n앞에서 만든 카드가 브라우저에서 실행되는 프론트엔드라는 점을 살펴보고, `package.json`에 적힌 `dev`가 어떤 명령인지 읽습니다. 우리가 만든 카드는 VS Code의 Live Server로 실행해 저장한 수정 결과를 확인합니다. AI가 안내한 프로젝트에서는 Vite와 npm이 무엇을 하는지 이해하며, 이번 실습에서 npm을 직접 실행할 필요는 없습니다. 이어 사용자 화면과 백엔드가 요청과 응답으로 연결되는 모습을 설명합니다.",
    "question": "브라우저에 보이는 카드와 npm 개발 서버는 각각 어떤 일을 할까요?"
  },
  "objectives": [
    "HTML·CSS·JavaScript와 Tailwind·Alpine이 브라우저 화면에서 하는 일을 말한다.",
    "Live Server로 카드의 로컬 주소를 열고 저장 후 화면 변화를 확인한다.",
    "Vite·Node.js·npm과 package.json의 dev 명령을 읽고 Live Server와 차이를 설명한다.",
    "FastAPI가 파일과 API를 함께 제공하는 경우 사용하는 서버 주소를 구분한다."
  ],
  "sections": [
    {
      "id": "web-map",
      "title": "프론트엔드란? 브라우저에서 보이고 움직이는 화면",
      "minutes": 9,
      "optional": false,
      "body": "### 앞서 만든 강의 카드가 프론트엔드입니다\n\n사용자가 보고 누르는 화면과 브라우저 쪽 상호작용을 **프론트엔드**라고 부릅니다. 앞선 카드의 `index.html`은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. 이어 배운 Tailwind CSS와 Alpine.js는 각각 모양과 동작을 작성할 때 도움을 주는 도구입니다. 이들이 실행된 결과도 브라우저에서 확인합니다.\n\n```text\nHTML: 제목·버튼·설명\nCSS / Tailwind CSS: 카드 여백·색\nJavaScript / Alpine.js: 설명 펼치기\n                 ↓\n           브라우저의 화면\n```\n\n프론트엔드는 HTML·CSS·JavaScript와 별개의 기술 이름이 아니라, 이 기술들로 만드는 **사용자 쪽 영역**을 가리킵니다. 기본 기술만으로도 만들 수 있고 React나 Svelte처럼 UI를 구성하는 도구를 선택할 수도 있습니다. 프론트엔드가 반드시 React를 뜻하지는 않습니다.\n\n### 같은 브라우저 화면도 여러 방식으로 열 수 있습니다\n\n앞의 간단한 카드는 Live Server의 로컬 주소로 열었습니다. HTML 파일을 브라우저에서 직접 열 수도 있지만 Live Server는 저장한 변화를 다시 보기 편하게 합니다. 반면 어떤 프로젝트는 파일 변환·패키지·자동 갱신을 위해 **Vite 같은 개발 도구**를 사용합니다. 어떤 도구가 필요한지는 실제 프로젝트의 README와 설정을 확인해야 합니다.\n\n**직접 확인:** [기본 카드](./examples/course-card/03-javascript/index.html)에서 버튼을 눌러 보고, 제목·모양·동작이 어디에서 왔는지 각각 짚습니다. 이미 브라우저로 파일을 열었다고 해서 개발 서버나 백엔드가 자동으로 실행되는 것은 아닙니다.",
      "presentationPoints": [
        "앞서 만든 카드의 구조·모양·클릭 동작은 사용자 쪽 프론트엔드입니다.",
        "Tailwind와 Alpine은 각각 스타일과 동작 작성을 돕습니다.",
        "단순 정적 파일은 서버 없이 열 수도 있고, 프로젝트에 따라 개발 서버를 사용합니다."
      ]
    },
    {
      "id": "web-http",
      "title": "같은 카드로 Live Server와 Vite 비교하기",
      "minutes": 13,
      "optional": false,
      "body": "### 1. 우리가 만든 카드를 Live Server로 실행하기\n\n앞에서 VS Code로 만든 강의 카드의 `index.html`, `style.css`, `script.js`는 브라우저에서 실행되는 파일입니다. VS Code에 **Live Server 확장**을 설치하고 카드 폴더를 연 뒤 `index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 열리는 주소는 예를 들어 `http://127.0.0.1:5500/`입니다. 주소의 끝과 포트 번호는 폴더와 설정에 따라 다를 수 있습니다.\n\n**직접 시연:** 카드 제목을 바꾸고 저장해 브라우저에 반영되는지 확인한 뒤 원래대로 되돌립니다. Live Server는 저장된 HTML·CSS·JavaScript를 로컬 주소로 제공하고 변경을 감지해 브라우저를 새로고침합니다. 이 단순한 카드에는 Node.js와 npm이 필요하지 않습니다. 확장이 아직 없다면 [Live Server 설치 안내](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)를 참고합니다.\n\n### 2. 같은 카드를 Vite로 열면 무엇이 다를까요?\n\n비교를 위해 [앞에서 만든 카드 예제](./examples/course-card/03-javascript/index.html)와 동일한 카드 파일을 담은 [Vite 예제 폴더](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/04-vite-dev)를 준비했습니다. 두 폴더의 `index.html`, `style.css`, `script.js`는 같은 내용입니다. **서로 다른 폴더에 있는 복사본**이므로 한쪽 파일을 수정해도 다른 쪽은 바뀌지 않습니다. 이번 강의에서 직접 실행하는 것은 Live Server이고, Vite는 아래처럼 읽어 봅니다.\n\n| 비교 | 앞에서 만든 카드 + Live Server | 준비된 같은 카드 + Vite |\n| --- | --- | --- |\n| 폴더 | 내 카드 폴더 또는 `03-javascript` | 별도 복사본 `04-vite-dev` |\n| 파일 | HTML·CSS·JavaScript | 같은 세 파일과 `package.json`, `package-lock.json` |\n| 준비 | VS Code의 Live Server 확장 | Node.js와 npm, 해당 폴더에 필요한 패키지 설치 |\n| 시작 | `index.html` → Open with Live Server | 해당 폴더의 터미널에서 `npm install` 후 `npm run dev` |\n| 주소 예시 | `http://127.0.0.1:5500/` | `http://127.0.0.1:5173/` |\n| 저장 후 변화 | 브라우저가 새로고침되어 변경을 확인 | 일부 변경은 화면 전체를 새로고침하지 않고 교체(HMR)하며, 파일·설정에 따라 새로고침도 일어남 |\n\n**보이는 카드와 버튼 동작은 같습니다.** 이처럼 단순한 카드만 확인할 때는 Live Server로 충분합니다. Vite는 화면을 만드는 프레임워크가 아니라 **개발 서버와 빌드 도구**입니다. React 같은 프로젝트에서 여러 JavaScript 모듈과 패키지를 다루거나 개발 중 변경을 빠르게 반영하는 데 도움이 됩니다. 모든 프로젝트가 Vite를 쓰는 것은 아닙니다. [Vite 공식 안내](https://vite.dev/guide/)\n\n### 3. AI가 알려 준 npm 명령 읽기\n\n첫 사례처럼 AI가 ZIP과 함께 `npm install`, `npm run dev`를 안내하면 먼저 **압축을 푼 해당 프로젝트 폴더**와 그 안의 `package.json`을 확인합니다. `package.json`은 프로젝트에서 필요한 패키지와 실행할 작업을 적은 파일입니다. **Node.js**는 브라우저 밖에서 JavaScript 도구를 실행하는 환경이고, **npm**은 패키지를 설치하고 프로젝트에 적힌 작업을 실행하는 도구입니다.\n\n준비된 `04-vite-dev/package.json`에는 다음 설정이 들어 있습니다. 이 예제에서 `dev`는 Vite를 실행합니다.\n\n```json\n{\n  \"scripts\": { \"dev\": \"vite --host 127.0.0.1 --port 5173\" },\n  \"devDependencies\": { \"vite\": \"6.4.1\" }\n}\n```\n\n아래 명령은 **설명용**입니다. 지금 강의에서는 실행하지 않습니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n- `npm install`: 그 폴더의 설정을 보고 필요한 패키지를 준비합니다.\n- `npm run dev`: `package.json`의 `scripts.dev`에 적힌 작업을 실행합니다. 이 예제에서는 Vite 개발 서버가 시작됩니다.\n\n`npm run dev`의 `dev`는 프로젝트에서 정한 작업 이름입니다. 같은 이름이어도 다른 프로그램을 실행할 수 있고, 그 작업이 없는 프로젝트도 있습니다. 따라서 AI가 `npm run dev`를 안내했다고 해서 **반드시 Vite 프로젝트인 것은 아닙니다**. 파일과 프로젝트 안내를 함께 확인하세요. `npm dev`가 아닌 `npm run dev`가 이 예제의 명령입니다. [npm 공식 안내](https://docs.npmjs.com/cli/commands/npm-run-script/)\n\n### 4. FastAPI와 템플릿으로 넘어가면?\n\n이후 실습에서는 FastAPI가 템플릿을 데이터로 채운 화면과 API를 제공하며, 브라우저에서 **FastAPI가 알려 준 주소**로 접속합니다. 이 구성에서는 같은 화면을 확인하려고 Live Server를 따로 켤 필요가 없습니다. 주소를 헷갈리지 않도록 VS Code 상태 표시줄의 포트 표시 또는 **Live Server: Stop Live Server**로 중지해도 됩니다.\n\nLive Server나 Vite는 Python의 FastAPI 코드를 대신 실행하지 않습니다. 반대로 FastAPI를 쓴다고 언제나 Vite가 필요 없어지는 것은 아닙니다. 프론트엔드를 별도로 개발하는 프로젝트는 둘을 함께 사용할 수도 있지만, 우리 실습은 FastAPI 주소 하나에서 확인합니다.",
      "presentationPoints": [
        "카드를 Live Server로 열고 저장한 변경을 브라우저에서 확인합니다.",
        "같은 카드의 Vite 예제를 비교하고 package.json과 npm run dev의 뜻을 읽습니다.",
        "FastAPI가 템플릿과 API를 제공하면 해당 주소로 확인합니다."
      ]
    },
    {
      "id": "web-html",
      "title": "브라우저와 서버: 화면 요청과 백엔드의 역할",
      "minutes": 8,
      "optional": false,
      "body": "### 주소를 열면 어떤 일이 일어날까요?\n\nLive Server로 카드를 열면 브라우저는 내 PC의 Live Server에 파일을 요청하고, 받은 HTML·CSS·JavaScript를 해석해 화면을 표시합니다. 버튼 클릭은 브라우저의 JavaScript가 처리합니다.\n\n```text\n브라우저  ── 카드 파일 요청 ──→  Live Server\n브라우저  ←─ HTML·CSS·JS ───  Live Server\n```\n\n`127.0.0.1` 또는 `localhost`는 주소를 연 **내 컴퓨터 자신**입니다. 예를 들어 Live Server가 `127.0.0.1:5500`을, 나중의 FastAPI가 `127.0.0.1:8000`을 사용할 수 있습니다. 포트는 설정에 따라 다르며 화면에 실제로 나온 주소를 사용합니다. 같은 주소를 다른 사람의 PC에 보내면 그 사람의 컴퓨터를 가리킵니다.\n\n### 프론트엔드와 백엔드\n\n프론트엔드는 사용자가 보고 조작하는 화면입니다. **백엔드**는 서버에서 요청 처리와 데이터 준비·저장 등을 담당합니다. Live Server나 Vite 개발 서버는 개발 화면을 확인하는 도구이며, 켜는 것만으로 Python의 FastAPI나 SQLite 처리가 생기지는 않습니다.\n\n다음 예제에서는 FastAPI가 `/static/...` 화면 파일과 `/api/...` 데이터를 같은 주소에서 제공합니다. 브라우저에서 `http://127.0.0.1:8000/static/02-dict-api.html`을 열면 페이지의 `fetch('/api/dict')`도 같은 FastAPI의 8000번으로 요청합니다. 템플릿 HTML도 FastAPI 주소에서 받습니다. 이 구성에서는 Live Server를 다시 켤 필요가 없습니다.\n\n**주소가 다르면?** 예를 들어 Live Server의 `:5500`에서 위 파일을 열면 `/api/dict`는 `:5500/api/dict`를 찾으며 FastAPI `:8000`으로 자동 연결되지 않습니다. 포트가 다른 두 주소는 다른 출처입니다. 별도 프론트엔드 서버를 함께 쓰는 프로젝트는 API 주소·프록시 또는 CORS 설정을 따로 맞출 수 있지만, 이번에는 같은 FastAPI 주소로 열어 이해합니다. [FastAPI CORS 안내](https://fastapi.tiangolo.com/tutorial/cors/)\n\n개발 서버와 백엔드를 두 서버로 나누는 프로젝트도 있고, 이번 예제처럼 하나의 FastAPI 서버가 화면과 데이터를 함께 제공하는 경우도 있습니다. 다음 강의에서는 HTML 안 JSON → Python 딕셔너리 → SQLite → 템플릿으로 이어갑니다.",
      "presentationPoints": [
        "Live Server는 정적 파일을, FastAPI는 API와 템플릿을 제공할 수 있습니다.",
        "이번 예제는 FastAPI의 8000번 주소에서 화면·API를 함께 엽니다.",
        "포트가 다르면 상대 경로 API 요청이 다른 서버로 향합니다."
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
    "브라우저·개발 서버·백엔드·데이터베이스의 역할을 구분한다."
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
      "description": "같은 카드 복사본을 두 방식으로 여는 차이와 프로젝트의 dev 설정을 살펴봅니다.",
      "scene": "code",
      "code": "Live Server: 카드 폴더의 index.html → Open with Live Server\nVite 예제: 04-vite-dev/package.json → scripts.dev 확인\n설명만 보기: npm install → npm run dev\nLive Server :5500 / Vite 예제 :5173 (포트는 달라질 수 있음)",
      "language": "text",
      "output": "카드 화면은 같지만 실행 도구와 준비 과정이 다릅니다. 실제 시연은 Live Server만 사용합니다.",
      "focus": "web",
      "fileName": "카드 index.html / 04-vite-dev/package.json",
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
    }
  ],
  "references": [
    {
      "title": "Node.js 소개",
      "url": "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
    },
    {
      "title": "npm run 스크립트",
      "url": "https://docs.npmjs.com/cli/commands/npm-run-script/"
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
      "file": "카드 폴더 index.html / 비교: 04-vite-dev/package.json",
      "command": "VS Code에서 카드 폴더를 열고 index.html → Open with Live Server\n표시된 주소에서 제목 변경과 저장 결과 확인\n같은 카드 복사본의 04-vite-dev/package.json과 npm run dev 뜻 비교\n다음 FastAPI 단계에서는 FastAPI가 제공하는 주소 사용",
      "expectedResult": "같은 카드를 Live Server로 확인하고 Vite와 npm 명령의 역할을 구분합니다.",
      "durationMinutes": 5
    },
    "returnSummary": "정적 카드에는 Live Server를 사용하고, 다음 FastAPI 예제는 화면·API를 제공하는 FastAPI 주소로 전환합니다."
  }
};
