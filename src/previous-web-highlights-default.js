export const previousWebHighlightsDefault = {
  "sections": [
    {
      "id": "web-map"
    },
    {
      "id": "web-http"
    },
    {
      "id": "web-html",
      "body": "브라우저가 주소를 열면 서버에 **요청**을 보내고 받은 파일을 화면으로 그립니다.\n\n```text\n브라우저  ── 카드 파일 요청 ──→  Live Server\n브라우저  ←─ HTML·CSS·JS ───  Live Server\n```\n\n`127.0.0.1`이나 `localhost`는 주소를 연 내 컴퓨터를 가리킵니다. Live Server의 `127.0.0.1:5500`과 FastAPI의 `127.0.0.1:8000`처럼 숫자로 접속할 서비스를 구분합니다.\n\n### 어떤 일을 맡나요?\n\n- **프론트엔드**는 사용자가 보고 누르는 화면입니다.\n- **백엔드**는 서버에서 요청을 받고 데이터를 준비·저장하는 부분입니다.\n\n| 영역 | 대표 예시 | 이 강의에서의 역할 |\n| --- | --- | --- |\n| 프론트엔드 | React, Vue | 브라우저에서 카드·버튼 같은 화면을 구성하는 방법을 제공합니다. |\n| 백엔드 · Python | FastAPI, Flask, Django | 요청에 응답하고 데이터를 처리하는 서버를 만드는 데 사용합니다. |\n| 백엔드 · Java/Kotlin | Spring 또는 Spring Boot | Java나 Kotlin으로 서버 애플리케이션을 만드는 데 사용합니다. |\n\nFastAPI, Flask, Django로 Python 서버를 만들 수 있습니다. Spring Boot는 Spring 서버 앱의 설정과 실행을 돕습니다. [FastAPI](https://fastapi.tiangolo.com/) · [Flask](https://flask.palletsprojects.com/en/stable/) · [Django](https://www.djangoproject.com/) · [Spring Boot](https://spring.io/projects/spring-boot/)\n\n### 화면과 데이터를 받을 주소\n\n후속 강의에서는 FastAPI가 화면 파일 `/static/...`과 데이터 `/api/...`를 같은 주소로 제공합니다. 예를 들어 `http://127.0.0.1:8000/static/02-dict-api.html`에서 실행하는 `fetch('/api/dict')`도 FastAPI 8000번으로 요청합니다.\n\n같은 HTML을 Live Server의 `:5500`에서 열면 `/api/dict`는 `:5500/api/dict`에 요청을 보냅니다. 서버를 나누는 프로젝트는 API 주소와 출처 설정을 맞춥니다. [FastAPI CORS 안내](https://fastapi.tiangolo.com/tutorial/cors/)",
      "presentationPoints": [
        "React·Vue는 브라우저 화면을 구성하는 대표적인 도구입니다.",
        "FastAPI·Flask·Django와 Spring은 서버를 만드는 도구입니다.",
        "이번 실습은 FastAPI 주소에서 화면과 API를 함께 확인합니다."
      ]
    },
    {
      "id": "web-json-card",
      "body": "### 1. 기존 카드 열기\n\n앞에서 완성한 `git-practice/index.html`을 VS Code에서 열고 그대로 이어서 수정합니다. 기존 `<head>`의 Tailwind·Alpine CDN과 `x-cloak` 스타일은 그대로 둡니다. [완성 예제 보기](./examples/course-card/alpine-data/index.html)\n\n### 2. x-data에 카드 데이터 선언하기\n\n기존 `<body>` 안의 카드 `<article>`을 찾습니다. 아래처럼 `<main>`으로 감싸고, 그 `x-data`에 `lessons` 배열을 적습니다. `<article>`의 버튼 상태 `open`과 동작은 그대로 둡니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <main x-data=\"{ lessons: [\n    { title: '윈도우 터미널', minutes: 30, description: '폴더를 확인하고 탐색기와 오갑니다.' },\n    { title: 'Git', minutes: 25, description: '변경을 확인하고 기록합니다.' }\n  ] }\">\n    <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n      <h1>Git</h1>\n      <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\"\n        @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\"\n        x-text=\"open ? '설명 접기' : '설명 보기'\">설명 보기</button>\n      <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n    </article>\n  </main>\n</body>\n```\n\n`lessons`는 강의 데이터 목록이고 `[]` 안의 `{}` 하나가 카드 한 장의 제목·시간·설명입니다. 이 단계에서는 데이터만 준비했으므로 화면에는 기존 Git 카드 한 장이 그대로 보입니다. 여기서는 **JSON 파일이 아니라 JavaScript 객체와 배열**을 `x-data`에 직접 작성하므로 `JSON.parse`나 별도 JSON 스크립트는 필요하지 않습니다.\n\n### 3. 카드에 데이터 표시하기\n\n기존 `<main>`부터 `</main>`까지 아래 코드로 교체합니다. `<head>`의 CDN과 스타일은 유지합니다.\n\n```html\n  <main class=\"mx-auto max-w-3xl\" x-data=\"{ lessons: [\n    { title: '윈도우 터미널', minutes: 30, description: '폴더를 확인하고 탐색기와 오갑니다.' },\n    { title: 'Git', minutes: 25, description: '변경을 확인하고 기록합니다.' }\n  ] }\">\n    <h1 class=\"mb-4 text-2xl font-bold\">나의 강의 카드</h1>\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <template x-for=\"(lesson, index) in lessons\" :key=\"index\">\n        <article class=\"rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n          <h2 class=\"text-xl font-bold\" x-text=\"lesson.title\"></h2>\n          <p><span x-text=\"lesson.minutes\"></span>분</p>\n          <button type=\"button\" class=\"mt-4 rounded bg-slate-800 px-3 py-2 text-white\"\n            @click=\"open = !open\" :aria-expanded=\"open.toString()\"\n            :aria-controls=\"'detail-' + index\" x-text=\"open ? '설명 접기' : '설명 보기'\">설명 보기</button>\n          <p class=\"mt-3\" :id=\"'detail-' + index\" x-show=\"open\" x-cloak x-text=\"lesson.description\"></p>\n        </article>\n      </template>\n    </div>\n  </main>\n```\n\n`x-for`가 `lessons` 항목마다 카드를 만들고, `x-text`가 각 항목의 제목·시간·설명을 채웁니다. 각 카드의 `x-data=\"{ open: false }\"`가 펼침 상태를 따로 관리하므로 한 카드만 눌러도 다른 카드는 닫힌 상태로 유지됩니다. 버튼의 `x-text`는 이전 실습처럼 `open`에 따라 문구를 바꿉니다.\n\n### 4. 카드 두 장 확인하기\n\n`git-practice/index.html`을 우클릭해 **Open with Live Server**로 엽니다. Vite를 `git-practice` 폴더에서 실행 중이라면 터미널에 표시된 Local 주소를 브라우저에서 엽니다. 예: `http://127.0.0.1:5173/` (포트는 실제 출력값을 사용).\n\n카드 두 장의 제목·시간과 버튼을 확인하고 데이터의 Git 제목을 바꿔 저장해 보세요. CDN을 불러오려면 인터넷 연결이 필요합니다. 카드가 보이지 않으면 작은따옴표와 쉼표, `x-data`의 중괄호를 확인합니다.",
      "presentationPoints": [
        "x-data에 강의 데이터 배열을 직접 선언하고 x-for·x-text로 카드에 표시합니다.",
        "각 카드의 open 상태로 버튼 문구와 설명을 독립적으로 펼치고 접습니다.",
        "git-practice의 index.html을 Live Server 또는 Vite의 Local 주소에서 확인합니다."
      ]
    },
    {
      "id": "web-future-backend",
      "body": "이번 수업에서는 **HTML의 Alpine.js `x-data`에 데이터를 직접 선언**해 카드에 표시했습니다. 다음 강의에서는 데이터 위치를 차례로 바꿔 봅니다.\n\n1. **현재:** 브라우저의 `x-data`에 카드 데이터를 직접 적고 Alpine이 화면에 표시합니다.\n2. **Python 데이터:** 서버의 Python 딕셔너리를 FastAPI가 JSON으로 응답하면 Alpine이 가져와 표시합니다.\n3. **SQLite 데이터:** FastAPI가 SQLite에서 데이터를 조회해 JSON으로 응답하면 Alpine이 가져와 표시합니다. 브라우저가 데이터베이스에 직접 접속하는 것은 아닙니다.\n\n데이터·백엔드 강의는 준비 중입니다. Jinja2 템플릿은 서버에서 HTML을 만드는 별도의 후속 방식으로 살펴볼 수 있습니다.",
      "presentationPoints": [
        "이번에는 Alpine x-data에 직접 선언한 카드 데이터를 표시합니다.",
        "후속 강의에서는 Python 딕셔너리와 SQLite 데이터를 FastAPI JSON 응답으로 받아 표시합니다."
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
      "id": "web-json-practice"
    }
  ],
  "closing": "터미널과 Git부터 웹 카드, Live Server와 Vite, Alpine x-data까지 살펴보았습니다. 다음 강의에서는 Python과 SQLite 데이터를 FastAPI로 연결할 예정입니다.",
  "presentation": {
    "returnSummary": "Alpine x-data에 직접 선언한 데이터를 카드에 표시했고, Python과 SQLite 연결은 준비 중인 후속 강의에서 이어갈 예정입니다."
  }
};
