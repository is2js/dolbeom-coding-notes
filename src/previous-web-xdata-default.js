export const previousWebXDataDefault = {
  "sections": [
    {
      "id": "web-map"
    },
    {
      "id": "web-http"
    },
    {
      "id": "web-html"
    },
    {
      "id": "web-json-card",
      "title": "HTML 안의 JSON으로 카드 데이터 표현하기",
      "minutes": 10,
      "optional": false,
      "body": "### 1. 복사본 준비하기\n\n기존 `git-practice/index.html`을 같은 폴더의 `json-practice.html`로 복사합니다. 같은 이름의 파일이 있으면 내용을 먼저 확인하고, 복사한 `json-practice.html`에서 아래 실습을 진행합니다. [JSON 카드 예제](./examples/course-card/server-data/static/01-local-json.html) · [예제 저장소](https://github.com/is2js/dolbeom-coding-notes)\n\n### 2. 카드 앞에 JSON 추가하기\n\n기존 `<body>`의 `<article>` 위치를 찾습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\" x-text=\"open ? '설명 접기' : '설명 보기'\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`<body>` 바로 아래, `<article>` 앞에 JSON 블록을 넣습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <script type=\"application/json\" id=\"lesson-data\">\n  [\n    {\"title\": \"윈도우 터미널\", \"minutes\": 30, \"description\": \"폴더를 확인하고 탐색기와 오갑니다.\"},\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}\n  ]\n  </script>\n\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\" x-text=\"open ? '설명 접기' : '설명 보기'\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`lesson-data`는 데이터를 찾을 이름입니다. `[]` 안의 `{}` 하나가 카드 한 장입니다. 여기까지 저장하면 화면에는 기존 Git 카드 한 장이 보입니다.\n\n### 3. Alpine.js로 JSON 읽기\n\n기존 `<article>`부터 `</article>`까지 아래 `<main>` 전체로 교체합니다. JSON 블록과 CDN 연결은 둡니다.\n\n```html\n  <main class=\"mx-auto max-w-3xl p-6\"\n        x-data=\"{ lessons: JSON.parse(document.getElementById('lesson-data').textContent) }\">\n    <h1 class=\"mb-4 text-2xl font-bold\">나의 강의 카드</h1>\n    <p>데이터 출처: HTML 안의 JSON</p>\n    <ul class=\"grid gap-4 md:grid-cols-2\">\n      <template x-for=\"(lesson, index) in lessons\" :key=\"index\">\n        <li>\n          <article class=\"rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n            <h2 class=\"text-xl font-bold\" x-text=\"lesson.title\"></h2>\n            <p><span x-text=\"lesson.minutes\"></span>분</p>\n            <button type=\"button\" class=\"mt-4 rounded bg-slate-800 px-3 py-2 text-white\"\n                    @click=\"open = !open\" :aria-expanded=\"open\">설명 보기</button>\n            <p class=\"mt-3\" x-show=\"open\" x-cloak x-text=\"lesson.description\"></p>\n          </article>\n        </li>\n      </template>\n    </ul>\n  </main>\n```\n\n`getElementById('lesson-data').textContent`로 글자를 가져오고 `JSON.parse`로 읽어 `lessons`에 담습니다. `x-for`로 카드 수만큼 반복하고 `x-text`로 제목·시간·설명을 채웁니다.\n\n### 4. 카드 두 장 확인하기\n\n**Open with Live Server**로 열고 카드 두 장과 버튼을 확인합니다. CDN에 연결되어 있어야 합니다. JSON에서 Git 제목만 바꾸고 저장해 카드가 바뀌는지 봅니다. 카드가 비어 있으면 큰따옴표와 쉼표를 확인하세요.",
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
      "id": "web-bonus"
    }
  ],
  "steps": [
    {
      "id": "web-01"
    },
    {
      "id": "web-02"
    },
    {
      "id": "web-ssr-handler"
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
  "objectives": [
    "HTML·CSS·JavaScript와 Tailwind·Alpine이 브라우저 화면에서 하는 일을 말한다.",
    "Live Server로 카드의 로컬 주소를 열고 저장 후 화면 변화를 확인한다.",
    "카드 폴더의 package.json을 읽고 npm install과 npm run dev로 Vite를 실행한 뒤 도움말을 확인한다.",
    "FastAPI가 파일과 API를 함께 제공하는 경우 사용하는 서버 주소를 구분한다.",
    "React·Vue와 백엔드의 FastAPI·Flask·Django·Spring의 역할을 구분한다.",
    "HTML에 JSON 데이터를 넣고 Alpine.js로 강의 카드에 표시한다."
  ],
  "checklist": [
    "카드의 HTML·CSS·JavaScript와 Tailwind·Alpine이 프론트엔드에서 하는 일을 설명한다.",
    "package.json의 scripts.dev를 확인하고 npm install과 npm run dev로 카드를 실행한다.",
    "Live Server 주소에서 카드의 저장 결과를 확인하고 필요하면 Live Server를 중지한다.",
    "브라우저·개발 서버·백엔드·데이터베이스의 역할을 구분한다.",
    "React·Vue와 Vite, Python 백엔드 프레임워크와 Spring의 역할을 구분한다.",
    "HTML 안 JSON 데이터를 Alpine.js로 읽어 두 카드를 표시한다."
  ],
  "closing": "터미널과 Git부터 웹 카드, Live Server와 Vite, HTML 안 JSON까지 살펴보았습니다. 다음 강의에서는 Python 데이터와 SQLite를 같은 카드에 연결할 예정입니다.",
  "presentation": {
    "caseSummary": "<mark>`npm run dev`는 현재 폴더의 `package.json`에 등록된 작업을 실행합니다.</mark> 터미널의 `127.0.0.1`은 내 컴퓨터, 뒤 숫자는 포트입니다. Vite 실행 중 `h` + `Enter`로 도움말을 보고 `Ctrl+C`로 종료합니다.",
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
