export const previousWebXDataIndexDefault = {
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
      "body": "### 1. 복사본 준비하기\n\n앞에서 완성한 `git-practice/index.html`을 같은 폴더에 `alpine-data-practice.html`이라는 이름으로 복사해 엽니다. 이미 같은 파일이 있으면 먼저 확인합니다. 기존 `<head>`의 Tailwind·Alpine CDN과 `x-cloak` 스타일은 그대로 둡니다. [완성 예제 보기](./examples/course-card/alpine-data/index.html)\n\n### 2. x-data에 카드 데이터 선언하기\n\n기존 `<body>` 안의 카드 `<article>`을 찾습니다. 아래처럼 `<main>`으로 감싸고, 그 `x-data`에 `lessons` 배열을 적습니다. `<article>`의 버튼 상태 `open`과 동작은 그대로 둡니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <main x-data=\"{ lessons: [\n    { title: '윈도우 터미널', minutes: 30, description: '폴더를 확인하고 탐색기와 오갑니다.' },\n    { title: 'Git', minutes: 25, description: '변경을 확인하고 기록합니다.' }\n  ] }\">\n    <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n      <h1>Git</h1>\n      <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\"\n        @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\"\n        x-text=\"open ? '설명 접기' : '설명 보기'\">설명 보기</button>\n      <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n    </article>\n  </main>\n</body>\n```\n\n`lessons`는 강의 데이터 목록이고 `[]` 안의 `{}` 하나가 카드 한 장의 제목·시간·설명입니다. 이 단계에서는 데이터만 준비했으므로 화면에는 기존 Git 카드 한 장이 그대로 보입니다. 여기서는 **JSON 파일이 아니라 JavaScript 객체와 배열**을 `x-data`에 직접 작성하므로 `JSON.parse`나 별도 JSON 스크립트는 필요하지 않습니다.\n\n### 3. 카드에 데이터 표시하기\n\n기존 `<main>`부터 `</main>`까지 아래 코드로 교체합니다. `<head>`의 CDN과 스타일은 유지합니다.\n\n```html\n  <main class=\"mx-auto max-w-3xl\" x-data=\"{ lessons: [\n    { title: '윈도우 터미널', minutes: 30, description: '폴더를 확인하고 탐색기와 오갑니다.' },\n    { title: 'Git', minutes: 25, description: '변경을 확인하고 기록합니다.' }\n  ] }\">\n    <h1 class=\"mb-4 text-2xl font-bold\">나의 강의 카드</h1>\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <template x-for=\"(lesson, index) in lessons\" :key=\"index\">\n        <article class=\"rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n          <h2 class=\"text-xl font-bold\" x-text=\"lesson.title\"></h2>\n          <p><span x-text=\"lesson.minutes\"></span>분</p>\n          <button type=\"button\" class=\"mt-4 rounded bg-slate-800 px-3 py-2 text-white\"\n            @click=\"open = !open\" :aria-expanded=\"open.toString()\"\n            :aria-controls=\"'detail-' + index\" x-text=\"open ? '설명 접기' : '설명 보기'\">설명 보기</button>\n          <p class=\"mt-3\" :id=\"'detail-' + index\" x-show=\"open\" x-cloak x-text=\"lesson.description\"></p>\n        </article>\n      </template>\n    </div>\n  </main>\n```\n\n`x-for`가 `lessons` 항목마다 카드를 만들고, `x-text`가 각 항목의 제목·시간·설명을 채웁니다. 각 카드의 `x-data=\"{ open: false }\"`가 펼침 상태를 따로 관리하므로 한 카드만 눌러도 다른 카드는 닫힌 상태로 유지됩니다. 버튼의 `x-text`는 이전 실습처럼 `open`에 따라 문구를 바꿉니다.\n\n### 4. 카드 두 장 확인하기\n\n`alpine-data-practice.html`을 우클릭해 **Open with Live Server**로 엽니다. Vite를 사용 중이라면 터미널의 Local 주소 뒤에 `/alpine-data-practice.html`을 붙여 엽니다. 예: `http://127.0.0.1:5173/alpine-data-practice.html` (포트는 실제 출력값을 사용). 루트 주소는 기존 `index.html`을 보여 줍니다.\n\n카드 두 장의 제목·시간과 버튼을 확인하고 데이터의 Git 제목을 바꿔 저장해 보세요. CDN을 불러오려면 인터넷 연결이 필요합니다. 카드가 보이지 않으면 작은따옴표와 쉼표, `x-data`의 중괄호를 확인합니다.",
      "presentationPoints": [
        "x-data에 강의 데이터 배열을 직접 선언하고 x-for·x-text로 카드에 표시합니다.",
        "각 카드의 open 상태로 버튼 문구와 설명을 독립적으로 펼치고 접습니다.",
        "복사본을 열 때 Live Server 또는 Vite 주소에 파일 이름을 확인합니다."
      ]
    },
    {
      "id": "web-future-backend"
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
      "fileName": "git-practice/alpine-data-practice.html",
      "files": [
        "git-practice/alpine-data-practice.html"
      ]
    }
  ]
};
