// Published web-tools content before the highlight and x-text exercise update.
export const previousWebToolsHighlightsDefault = {
  "id": "web-tools",
  "case": {
    "body": "### 1. 온라인 청첩장에서 답변 펼치기\n\n강사가 만든 [온라인 청첩장](https://wedding.chojaeseong.com/)을 열고 질문을 눌러 보세요. **답변을 펼치고 접는 동작**에 Alpine.js를 사용합니다. 청첩장에는 Bootstrap과 Swiper 등 다른 도구도 함께 사용됩니다.\n\n청첩장의 HTML에는 Alpine.js를 CDN으로 불러오는 코드가 있습니다.\n\n~~~html\n<script defer src=\"https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js\"></script>\n~~~\n\nHTML에 CDN 주소를 적으면 별도 패키지 설치 없이 브라우저가 Alpine.js를 불러옵니다. `3.x.x`는 3 버전 계열을 가리킵니다. 답변이 부드럽게 펼쳐지도록 Alpine 플러그인도 사용합니다.\n\n### 2. 부동산 지도에서 지역 선택하기\n\n![돌범의 부동산 지도에서 지역을 선택하고 지도를 살펴보는 실제 프로젝트 화면](./assets/course/buja-map-case.gif)\n\n강사가 Codex와 함께 만든 [돌범의 부동산 지도](https://is2js.github.io/buja-clone/)에서 **지역 탭을 선택**하거나 지도를 클릭해 보세요. Alpine.js가 지역 선택과 화면 표시를 연결하며, 지도 영역은 지도 라이브러리와 함께 동작합니다.\n\n지역 탭에서 쓰는 코드의 일부입니다. `@click`은 버튼을 눌렀을 때 지역을 선택하는 동작을 실행합니다.\n\n~~~html\n<template x-for=\"item in data.areas\" :key=\"item.code\">\n  <button type=\"button\" role=\"tab\"\n    :aria-selected=\"area === item.code\"\n    :class=\"{on: area === item.code}\"\n    @click=\"setArea(item.code)\" x-text=\"item.name\"></button>\n</template>\n~~~\n\n이제 앞에서 만든 강의 카드에도 Alpine.js를 연결해 버튼 동작을 간결하게 표현해 봅니다."
  },
  "sections": [
    {
      "id": "frontend-css",
      "body": "두 카드의 버튼을 눌러 비교합니다. [직접 작성한 CSS·JavaScript 카드](./examples/course-card/03-javascript/index.html) · [Tailwind CSS 카드](./examples/course-card/04-tailwind/index.html)\n\n앞서 만든 `git-practice/index.html`을 계속 수정합니다. 기존 CSS 대신 Tailwind CSS 3의 **Play CDN**을 연결하고, JavaScript 버튼 동작은 같은 폴더의 `script.js`로 유지합니다.\n\n### Tailwind CSS를 뭐라고 부를까요?\n\n**Tailwind CSS**는 여백·색·모서리를 작은 **유틸리티 클래스**로 제공하는 CSS 프레임워크입니다. HTML의 `class`에 필요한 이름을 조합합니다.\n\nHTML 태그 안에서 모양을 지정할 때 `style=\"padding: 24px\"`는 CSS를 직접 적는 인라인 스타일이고, `class=\"p-6\"`은 Tailwind가 제공하는 CSS 규칙의 이름입니다.\n\n### 1. 직접 작성한 CSS 다시 보기\n\n```css\n.card {\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\n```\n\n### 2. CDN으로 Tailwind 연결하기\n\n**CDN**은 파일을 인터넷으로 전달하는 서비스입니다. `git-practice/index.html`의 `<head>`에서 기존 `style.css` 연결을 제거하고 아래 두 줄을 넣습니다. `script.js` 연결이 이미 있다면 중복해서 넣지 않습니다.\n\n```html\n<script src=\"https://cdn.tailwindcss.com/3.4.17\"></script>\n<script defer src=\"script.js\"></script>\n```\n\n첫 줄은 수업용 Tailwind 3 Play CDN 도구를 불러옵니다. 둘째 줄은 같은 폴더의 `script.js`를 이어 써서 버튼 동작을 유지합니다. CDN을 사용하려면 인터넷 연결이 필요합니다.\n\n### 3. 클래스 읽고 여백 바꾸기\n\n`<body>`를 `<body class=\"bg-slate-100 p-6 font-sans\">`로 바꾸고 기존 `<article>` 전체를 아래 코드로 교체해 저장합니다.\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" aria-expanded=\"false\">설명 보기</button>\n  <p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n`p-6`은 안쪽 여백, `rounded-xl`은 둥근 모서리, `bg-white`는 흰 배경, `max-w-80`은 최대 폭입니다.\n\n**직접 확인:** `p-6`을 `p-8`로 바꿔 안쪽 여백이 24px에서 32px로 커지는지 확인하고 되돌립니다. Tailwind 3 기본 글자 크기 기준입니다.\n\n### 4. 배포할 때\n\nHTML을 읽으면서 색·간격을 한곳에서 조합하기 쉽지만, 긴 클래스 목록은 읽기 어려울 수 있습니다. **Play CDN은 연습용**입니다. 운영 사이트에서는 프로젝트의 Tailwind 버전에 맞는 빌드 도구로 CSS를 생성해 배포합니다. [Tailwind 3 Play CDN](https://v3.tailwindcss.com/docs/installation/play-cdn) · [Tailwind 설치 안내](https://tailwindcss.com/docs/installation)",
      "presentationPoints": [
        "Tailwind CSS는 작은 유틸리티 클래스로 모양을 조합하는 CSS 프레임워크입니다.",
        "CDN 주소를 HTML에 연결하고 p-6을 p-8로 바꿔 여백을 비교합니다.",
        "Play CDN은 연습용이며 운영에는 버전에 맞는 빌드 과정을 사용합니다."
      ]
    },
    {
      "id": "frontend-alpine",
      "body": "**Alpine.js**는 버튼을 누르면 펼치는 동작처럼 작은 상호작용을 HTML 속성에 적는 JavaScript 프레임워크입니다. 이 속성을 **지시어**라고 부르며, 연결한 Alpine이 읽고 실행합니다.\n\n### 1. 이전 JavaScript 확인\n\n```javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n```\n\n### 2. Alpine을 연결한 카드 열기\n\nVS Code에서 계속 작업한 `git-practice/index.html`을 엽니다. 기존 `script.js`의 클릭 동작을 Alpine으로 표현합니다. Tailwind는 모양을 담당합니다. [Alpine 카드](./examples/course-card/05-alpine/index.html)\n\n```html\n<script src=\"https://cdn.tailwindcss.com/3.4.17\"></script>\n<script defer src=\"https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js\"></script>\n<style>[x-cloak] { display: none !important; }</style>\n```\n\n`<head>`의 기존 `script.js` 연결을 제거하고 아래 CDN 연결과 스타일을 넣습니다. Tailwind CDN이 이미 있다면 중복해서 넣지 않습니다. 두 CDN을 불러오려면 인터넷 연결이 필요합니다. `defer`는 HTML을 읽은 뒤 실행하라는 뜻이고, 마지막 줄의 스타일은 Alpine이 준비되기 전 설명이 잠깐 보이는 것을 막습니다. [Alpine 설치 안내](https://alpinejs.dev/essentials/installation)\n\n### 3. 상태 → 클릭 → 표시 읽기\n\n기존 `<article>`부터 `</article>`까지 아래 코드로 교체하고 저장합니다.\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n  <h1>Git</h1>\n  <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\"\n    @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n  <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n- `x-data`가 `open` 상태를 만들고 처음에 `false`로 둡니다.\n- `@click`은 클릭할 때 `open` 값을 뒤집습니다.\n- `x-show`는 `open`이 참일 때 설명을 보입니다.\n- `:aria-expanded`는 펼침 상태를 전달하고 `x-cloak`은 로딩 중 잠깐 보이는 것을 막습니다.\n\n### 4. 눌러 보고 초기값 바꾸기\n\n1. 클릭해 설명을 펼치고 다시 눌러 접습니다. **Enter**와 **Space**로도 확인합니다.\n2. `open: false`를 `open: true`로 바꾸고 저장·새로고침해 처음부터 설명이 보이는지 확인합니다. 확인 후 `false`로 되돌립니다.\n3. 동작하지 않으면 CDN 연결을 확인합니다. 예전 `script.js`가 함께 연결되어 있다면 제거합니다.\n\n다음 주제에서 같은 카드를 여는 방법과 `npm run dev`를 살펴봅니다. [Alpine 공식 시작 안내](https://alpinejs.dev/start-here)",
      "presentationPoints": [
        "Alpine.js는 HTML 속성에서 작은 화면 동작을 선언하는 가벼운 JavaScript 프레임워크입니다.",
        "CDN으로 Alpine을 불러와 x-data·@click·x-show로 상태와 클릭을 연결합니다.",
        "인터넷 연결, 버전, 클릭·키보드·새로고침을 확인합니다."
      ]
    },
    {
      "id": "frontend-bonus"
    }
  ],
  "steps": [
    {
      "id": "frontend-02"
    },
    {
      "id": "frontend-03"
    },
    {
      "id": "frontend-06"
    },
    {
      "id": "frontend-08"
    }
  ],
  "checklist": [
    "Tailwind와 Alpine의 CDN 주소 및 인터넷 연결을 확인할 수 있다.",
    "같은 카드의 기존 CSS와 Tailwind 클래스가 담당하는 모양을 비교할 수 있다.",
    "버튼의 클릭과 표시 상태를 직접 작성한 JavaScript와 Alpine으로 비교할 수 있다."
  ],
  "closing": "같은 카드의 모양과 동작을 Tailwind와 Alpine으로 표현했습니다. 다음에는 화면이 브라우저에서 실행되는 방식과 개발 서버의 역할을 알아봅니다.",
  "presentation": {
    "caseSummary": "<mark>온라인 청첩장</mark>에서 답변 펼치기를, <mark>부동산 지도</mark>에서 지역 선택을 살펴봅니다. 청첩장은 Alpine.js를 CDN으로 연결했습니다.",
    "returnSummary": "HTML에 Tailwind 클래스와 Alpine 상태를 연결했습니다. 다음에는 화면이 실행되는 프론트엔드와 개발 서버를 살펴봅니다."
  }
};
