// Previously published defaults before keeping the exercise in git-practice.
export const previousGitPracticeRootDefault = {
  "web-coding": {
    "id": "web-coding",
    "sections": [
      {
        "id": "tools-html",
        "title": "HTML: 강의 카드의 내용과 구조 만들기",
        "minutes": 16,
        "optional": false,
        "body": "원본 `git-practice`에서 `course-card` → `03-javascript` 폴더를 만들고 `index.html`을 만듭니다. VS Code 탐색기에서 `03-javascript` 폴더를 우클릭해 **새 파일**을 선택하고 이름을 입력합니다. `style.css`와 `script.js`는 다음 단계에서 각각 만듭니다. 같은 이름이 있다면 먼저 내용을 확인하세요. 만들 화면을 먼저 봅니다. [완성 카드](./examples/course-card/03-javascript/index.html)\n\n### 1. 태그와 내용 읽기\n\n```html\n<h1>Git</h1>\n```\n\n![h1의 시작 태그, Git 내용, 끝 태그를 나누어 읽는 설명 그림](./assets/course/diagrams/html-element.svg)\n\n`<h1>`은 시작 태그, `Git`은 내용, `</h1>`은 끝 태그입니다. 셋을 합쳐 **요소**라고 부릅니다. `<p>...</p>`는 문단, `<button>...</button>`은 버튼입니다.\n\n### 2. 속성으로 이름 붙이기\n\n```html\n<article class=\"card\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\">설명 보기</button>\n  <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n![HTML 요소의 속성 이름과 값, class와 id의 연결 대상을 설명하는 그림](./assets/course/diagrams/html-attributes.svg)\n\n`article`은 카드의 내용을 묶습니다. `class=\"card\"`는 CSS에서 모양을 찾는 이름이고, `id=\"toggle\"`과 `id=\"detail\"`은 JavaScript가 버튼과 설명을 찾는 이름입니다. `type=\"button\"`은 일반 버튼임을 표시합니다.\n\n### 3. 전체 HTML 작성하기\n\n![HTML 문서에서 head의 탭 제목과 body의 화면 내용이 나뉘는 설명 그림](./assets/course/diagrams/html-document.svg)\n\n`head`는 문서 정보, `body`는 실제 화면입니다. `title`은 탭 이름, `h1`은 화면의 제목, `meta charset=\"utf-8\"`은 한글을 포함한 문자를 읽을 인코딩입니다. **`index.html`**에 아래를 입력하고 **Ctrl+S**로 저장합니다.\n\n~~~html\n<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\">설명 보기</button>\n    <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>\n~~~\n\n### 4. 열고 제목 바꿔 보기\n\n1. [Live Server 확장](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)을 설치했다면 `index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 설치할 때는 **Ritwick Dey**의 `ritwickdey.LiveServer`를 확인합니다.\n2. 브라우저에서 실제로 열린 주소를 확인합니다. 예시는 `http://127.0.0.1:5500/`입니다.\n3. `<h1>Git</h1>`의 제목을 바꾸고 `Ctrl+S`로 저장합니다. 화면이 바뀌는지 본 뒤 원래대로 돌립니다. 필요하면 브라우저를 새로고침합니다.\n\nLive Server 없이 탐색기에서 파일을 열어도 됩니다. 서버를 종료할 때는 **Live Server: Stop Live Server**를 사용합니다.\n\n[HTML 카드](./examples/course-card/01-html/index.html) → [CSS 카드](./examples/course-card/02-css/index.html) → [JavaScript 완성 카드](./examples/course-card/03-javascript/index.html)",
        "presentationPoints": [
          "VS Code에서 별도 카드 폴더를 열고 index.html을 만듭니다.",
          "시작 태그·내용·끝 태그와 속성, head와 body를 읽고 저장합니다.",
          "Live Server 주소를 열고 저장한 제목의 변화를 확인합니다."
        ]
      },
      {
        "id": "tools-css",
        "title": "CSS: 같은 강의 카드 꾸미기",
        "minutes": 7,
        "optional": false,
        "body": "HTML 실습에서 만든 `git-practice/course-card/03-javascript` 폴더를 그대로 사용합니다.\n\n### 1. style.css 파일 만들기\n\nVS Code 왼쪽 **탐색기**에서 `03-javascript` 폴더를 우클릭하고 **새 파일**을 선택합니다. `style.css`를 입력해 만들고 `Ctrl+S`로 저장합니다. 이미 있다면 열어 확인합니다.\n\n### 2. HTML에 CSS 연결하기\n\n`index.html`의 `<head>` 안, `</head>` 바로 앞에 아래 줄을 추가하고 저장합니다.\n\n~~~html\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n~~~\n\n`href`는 같은 폴더에 있는 `style.css`를 가리킵니다. 파일이 비어 있으면 화면 모양은 그대로입니다.\n\n### 3. 선택자와 여백 읽기\n\n```css\n.card {\n  padding: 24px;\n}\n```\n\n![CSS 규칙의 선택자 card, 속성 padding, 값 24px을 나누어 읽는 설명 그림](./assets/course/diagrams/css-declaration.svg)\n\n`.card`는 `class=\"card\"`인 요소를 고르는 **선택자**, `padding`은 안쪽 여백 **속성**, `24px`은 **값**입니다.\n\n### 4. style.css 작성하고 확인하기\n만든 `style.css`에 아래 내용을 입력하고 `Ctrl+S`로 저장합니다.\n\n~~~css\nbody {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}\n~~~\n\n`body`는 페이지 전체, `.card`는 카드, `button`은 버튼의 모양입니다.\n\n브라우저에서 흰 카드와 여백을 확인합니다. 변화가 없으면 `index.html`과 `style.css`의 위치·저장 상태를 확인하세요. `.card`의 `padding: 24px`을 `32px`로 바꿔 차이를 보고 **24px로 되돌립니다**. [CSS 카드](./examples/course-card/02-css/index.html)",
        "presentationPoints": [
          "style.css를 만들고 index.html에 연결합니다.",
          "저장 후 새로고침해 색상과 여백을 확인합니다.",
          "CSS는 HTML 요소의 시각적인 모양을 정합니다."
        ]
      },
      {
        "id": "tools-javascript",
        "title": "JavaScript: 버튼 클릭으로 설명 펼치기",
        "minutes": 7,
        "optional": false,
        "body": "목표는 **버튼 클릭 → 설명 펼치기 → 한 번 더 클릭 → 접기**입니다. 앞에서 만든 같은 카드 폴더를 사용합니다.\n\n### 1. script.js 파일 만들기\n\nVS Code 왼쪽 **탐색기**에서 `03-javascript` 폴더를 우클릭하고 **새 파일**을 선택합니다. `script.js`를 입력해 만들고 `Ctrl+S`로 저장합니다. 이미 있다면 열어 확인합니다.\n\n### 2. HTML에 JavaScript 연결하기\n\n`index.html`의 `<head>` 안에 기존 CSS 연결 아래로 `<script>`를 추가하고 저장합니다.\n\n~~~html\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n  <script defer src=\"script.js\"></script>\n</head>\n~~~\n\n`src`는 같은 폴더의 `script.js`를 가리킵니다. `defer`는 HTML을 읽은 뒤 스크립트를 실행합니다. 파일이 비어 있으면 버튼 동작은 아직 없습니다.\n\n### 3. 설명을 처음에 숨기기\n`index.html`의 버튼과 설명을 아래로 교체합니다. `hidden`은 처음에 숨기고 `aria-expanded=\"false\"`는 버튼의 접힌 상태를 전달합니다.\n\n~~~html\n<button id=\"toggle\" type=\"button\" aria-expanded=\"false\">설명 보기</button>\n<p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n~~~\n\nHTML에 `hidden`을 추가한 뒤에는 설명이 숨겨져 있고, 아직 JavaScript가 비어 있으므로 버튼을 눌러도 열리지 않습니다.\n\n### 4. 클릭 동작 작성하고 확인하기\n\n![JavaScript가 버튼과 설명을 찾고 클릭을 기다린 뒤 hidden과 aria-expanded 상태를 바꾸는 흐름](./assets/course/diagrams/javascript-flow.svg)\n\n만든 `script.js`에 아래 내용을 입력하고 `Ctrl+S`로 저장합니다.\n\n~~~javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n~~~\n\n`#toggle`과 `#detail`로 각 `id`를 가진 HTML 요소를 찾습니다. `addEventListener('click', ...)`는 클릭할 때 실행하는 동작입니다. `detail.hidden`을 반대로 바꾸고 버튼의 `aria-expanded`도 함께 갱신합니다.\n\n1. 저장 후 버튼을 눌러 설명이 펼쳐지고 접히는지 확인합니다.\n2. **Tab**으로 버튼을 골라 **Enter**나 **Space**도 눌러 봅니다.\n3. 동작하지 않으면 `toggle`·`detail` 이름, 파일 연결, 저장 여부를 확인합니다.\n\n설명 문장만 나의 소개로 바꿔도 같은 동작이 유지되는지 확인합니다. [완성 카드](./examples/course-card/03-javascript/index.html)",
        "presentationPoints": [
          "script.js를 연결하고 버튼 클릭을 처리합니다.",
          "클릭마다 설명이 보이고 숨겨지는지 확인합니다.",
          "구조·모양·동작을 합쳐 프론트엔드 화면을 만듭니다."
        ]
      }
    ],
    "steps": [
      {
        "id": "html-practice",
        "title": "HTML로 강의 카드 만들기",
        "description": "VS Code에서 카드 폴더와 index.html을 만들고 저장한 뒤 Live Server로 열어 제목 변경을 확인합니다.",
        "scene": "vscode",
        "code": "<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\">설명 보기</button>\n    <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>",
        "language": "html",
        "output": "Git 제목, 설명 보기 버튼, 설명 문장이 표시됩니다.\n이 단계에서 버튼을 눌러도 설명 상태는 바뀌지 않습니다.\n<title>은 탭 이름, <h1>은 화면의 Git 제목입니다.",
        "focus": "ide",
        "fileName": "index.html · 1단계",
        "files": [
          "index.html"
        ]
      },
      {
        "id": "css-practice",
        "title": "CSS로 강의 카드 꾸미기",
        "description": "같은 카드 폴더에 style.css를 만든 뒤 index.html의 head에 먼저 연결합니다. 선택자·속성·값을 살펴보고 CSS를 작성해 여백을 비교합니다.",
        "scene": "vscode",
        "code": "body {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}",
        "language": "css",
        "output": "연한 배경에 여백과 둥근 모서리가 있는 흰색 카드가 보입니다.",
        "focus": "ide",
        "fileName": "style.css · 2단계",
        "files": [
          "index.html",
          "style.css"
        ]
      },
      {
        "id": "javascript-practice",
        "title": "JavaScript로 설명 펼치기",
        "description": "같은 카드 폴더에 script.js를 만든 뒤 index.html의 head에 defer로 먼저 연결합니다. 버튼과 설명의 초기 상태를 정하고 클릭 동작을 작성합니다.",
        "scene": "vscode",
        "code": "const button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});",
        "language": "javascript",
        "output": "처음에는 설명이 숨겨지고 클릭하면 표시됩니다.\n다시 클릭하면 숨겨지며 Enter·Space도 사용할 수 있습니다.",
        "focus": "ide",
        "fileName": "script.js · 3단계",
        "files": [
          "index.html",
          "style.css",
          "script.js"
        ]
      }
    ],
    "pitfalls": [
      {
        "title": "파일을 저장하기 전에 화면을 확인하기",
        "body": "어느 폴더에 어떤 이름으로 저장했는지 먼저 확인하고, 미리보기나 브라우저를 다시 확인합니다."
      },
      {
        "title": "HTML·CSS·JavaScript를 같은 역할로 생각하기",
        "body": "내용과 구조, 모양, 클릭 동작을 각각 구분하고 같은 카드에서 어떤 변화가 생기는지 확인합니다."
      },
      {
        "title": "기존 메모 프로젝트 파일을 실습 파일로 덮어쓰기",
        "body": "git-practice의 course-card/03-javascript 하위 폴더를 사용하고 이름이 같은 파일이 있으면 덮어쓰지 않습니다."
      }
    ],
    "presentation": {
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "git-practice/course-card/03-javascript의 index.html · style.css · script.js",
        "command": "git-practice의 course-card/03-javascript 폴더 열기 → index.html 작성·저장 → Live Server로 확인\nstyle.css 만들기·HTML에 연결 → CSS 작성 → 여백과 색 확인\nscript.js 만들기·HTML에 연결 → JavaScript 작성 → 버튼 클릭과 Enter·Space로 펼치기·접기",
        "expectedResult": "하나의 Git 카드가 HTML 구조, CSS 모양과 JavaScript 버튼 동작을 차례로 갖춥니다.",
        "durationMinutes": 6
      }
    }
  },
  "web-tools": {
    "id": "web-tools",
    "sections": [
      {
        "id": "frontend-css",
        "title": "같은 강의 카드에 Tailwind CSS 적용하기",
        "minutes": 15,
        "optional": false,
        "body": "두 카드의 버튼을 눌러 비교합니다. [직접 작성한 CSS·JavaScript 카드](./examples/course-card/03-javascript/index.html) · [Tailwind CSS 카드](./examples/course-card/04-tailwind/index.html)\n\n이 예제는 HTML에서 Tailwind CSS 3의 **Play CDN**을 바로 불러옵니다. [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP** 또는 clone으로 받은 `public/examples/course-card`에서 **04-tailwind·05-alpine** 폴더를 `git-practice/course-card/`에 복사합니다. 같은 이름의 폴더는 먼저 내용을 확인합니다. `03-javascript`에서 바꿨던 제목이나 설명은 필요하면 각 예제 파일에도 직접 적습니다.\n\n### Tailwind CSS를 뭐라고 부를까요?\n\n**Tailwind CSS**는 여백·색·모서리를 작은 **유틸리티 클래스**로 제공하는 CSS 프레임워크입니다. HTML의 `class`에 필요한 이름을 조합합니다.\n\nHTML 태그 안에서 모양을 지정할 때 `style=\"padding: 24px\"`는 CSS를 직접 적는 인라인 스타일이고, `class=\"p-6\"`은 Tailwind가 제공하는 CSS 규칙의 이름입니다.\n\n### 1. 직접 작성한 CSS 다시 보기\n\n```css\n.card {\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\n```\n\n### 2. CDN으로 Tailwind 연결하기\n\n**CDN**은 파일을 인터넷으로 전달하는 서비스입니다. `git-practice/course-card/04-tailwind/index.html`에서 아래 두 줄을 확인합니다.\n\n```html\n<script src=\"https://cdn.tailwindcss.com/3.4.17\"></script>\n<script defer src=\"../03-javascript/script.js\"></script>\n```\n\n첫 줄은 수업용 Tailwind 3 Play CDN 도구를 불러옵니다. 둘째 줄은 이전 `script.js`을 이어 써서 버튼 동작을 유지합니다. `..`은 위 폴더를 가리킵니다. CDN을 사용하려면 인터넷 연결이 필요합니다.\n\n### 3. 클래스 읽고 여백 바꾸기\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" aria-expanded=\"false\">설명 보기</button>\n  <p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n`p-6`은 안쪽 여백, `rounded-xl`은 둥근 모서리, `bg-white`는 흰 배경, `max-w-80`은 최대 폭입니다.\n\n**직접 확인:** `p-6`을 `p-8`로 바꿔 안쪽 여백이 24px에서 32px로 커지는지 확인하고 되돌립니다. Tailwind 3 기본 글자 크기 기준입니다.\n\n### 4. 배포할 때\n\nHTML을 읽으면서 색·간격을 한곳에서 조합하기 쉽지만, 긴 클래스 목록은 읽기 어려울 수 있습니다. **Play CDN은 연습용**입니다. 운영 사이트에서는 프로젝트의 Tailwind 버전에 맞는 빌드 도구로 CSS를 생성해 배포합니다. [Tailwind 3 Play CDN](https://v3.tailwindcss.com/docs/installation/play-cdn) · [Tailwind 설치 안내](https://tailwindcss.com/docs/installation)",
        "presentationPoints": [
          "Tailwind CSS는 작은 유틸리티 클래스로 모양을 조합하는 CSS 프레임워크입니다.",
          "CDN 주소를 HTML에 연결하고 p-6을 p-8로 바꿔 여백을 비교합니다.",
          "Play CDN은 연습용이며 운영에는 버전에 맞는 빌드 과정을 사용합니다."
        ]
      },
      {
        "id": "frontend-alpine",
        "title": "같은 버튼 동작을 Alpine.js로 바꾸기",
        "minutes": 15,
        "optional": false,
        "body": "**Alpine.js**는 버튼을 누르면 펼치는 동작처럼 작은 상호작용을 HTML 속성에 적는 JavaScript 프레임워크입니다. 이 속성을 **지시어**라고 부르며, 연결한 Alpine이 읽고 실행합니다.\n\n### 1. 이전 JavaScript 확인\n\n```javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n```\n\n### 2. Alpine을 연결한 카드 열기\n\nVS Code에서 `git-practice/course-card/05-alpine/index.html`을 엽니다. 기존 `script.js`의 클릭 동작을 Alpine으로 표현합니다. Tailwind는 모양을 담당합니다. [Alpine 카드](./examples/course-card/05-alpine/index.html)\n\n```html\n<script src=\"https://cdn.tailwindcss.com/3.4.17\"></script>\n<script defer src=\"https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js\"></script>\n<style>[x-cloak] { display: none !important; }</style>\n```\n\n두 CDN을 불러오려면 인터넷 연결이 필요합니다. `defer`는 HTML을 읽은 뒤 실행하라는 뜻이고, 마지막 줄의 스타일은 Alpine이 준비되기 전 설명이 잠깐 보이는 것을 막습니다. [Alpine 설치 안내](https://alpinejs.dev/essentials/installation)\n\n### 3. 상태 → 클릭 → 표시 읽기\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n  <h1>Git</h1>\n  <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\"\n    @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n  <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n- `x-data`가 `open` 상태를 만들고 처음에 `false`로 둡니다.\n- `@click`은 클릭할 때 `open` 값을 뒤집습니다.\n- `x-show`는 `open`이 참일 때 설명을 보입니다.\n- `:aria-expanded`는 펼침 상태를 전달하고 `x-cloak`은 로딩 중 잠깐 보이는 것을 막습니다.\n\n### 4. 눌러 보고 초기값 바꾸기\n\n1. 클릭해 설명을 펼치고 다시 눌러 접습니다. **Enter**와 **Space**로도 확인합니다.\n2. `open: false`를 `open: true`로 바꾸고 저장·새로고침해 처음부터 설명이 보이는지 확인합니다. 확인 후 `false`로 되돌립니다.\n3. 동작하지 않으면 CDN 연결과 예전 `script.js`가 함께 연결되었는지 확인합니다.\n\n다음 주제에서 같은 카드를 여는 방법과 `npm run dev`를 살펴봅니다. [Alpine 공식 시작 안내](https://alpinejs.dev/start-here)",
        "presentationPoints": [
          "Alpine.js는 HTML 속성에서 작은 화면 동작을 선언하는 가벼운 JavaScript 프레임워크입니다.",
          "CDN으로 Alpine을 불러와 x-data·@click·x-show로 상태와 클릭을 연결합니다.",
          "인터넷 연결, 버전, 클릭·키보드·새로고침을 확인합니다."
        ]
      },
      {
        "id": "frontend-bonus",
        "title": "보충: 클래스가 개발 화면에만 보일 때",
        "minutes": 5,
        "optional": true,
        "body": "- **Tailwind CSS 3**는 설정한 content 경로에서 완전한 클래스 이름을 읽습니다. `bg-${color}-500`처럼 문자열을 조립할 경우 CSS가 빠질 수 있으니 `bg-teal-500`, `bg-slate-500`처럼 전체 이름을 적습니다. 서버 템플릿은 `./templates/**/*.html`처럼 실제 파일 경로가 포함됐는지 확인합니다. [Tailwind 3 content 설정](https://v3.tailwindcss.com/docs/content-configuration)\n- **Alpine.js**의 상태는 새로고침하면 초기값으로 돌아옵니다. 완료 표시를 남기려면 별도 저장 기능이 필요합니다.\n- **보충 실습**은 완료 전후의 클래스 이름을 정하고, 어떤 상태를 새로고침 후에도 남길지 써 보는 것입니다."
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
        "fileName": "course-card/03-javascript/style.css",
        "files": [
          "course-card/03-javascript/index.html",
          "course-card/03-javascript/style.css"
        ]
      },
      {
        "id": "frontend-03",
        "title": "Tailwind 카드 여백 바꾸기",
        "description": "Tailwind Play CDN으로 불러온 카드의 p-6과 p-8을 비교합니다.",
        "scene": "browser",
        "code": "<article class=\"max-w-80 rounded-xl bg-white p-6\">\n  <h1>Git</h1>\n</article>\n<!-- p-6 → p-8 -->",
        "language": "html",
        "output": "기본 테마·루트 16px에서 카드 여백 24px → 32px. 새로고침 후 확인합니다.",
        "focus": "frontend",
        "fileName": "04-tailwind/index.html",
        "files": [
          "04-tailwind/index.html",
          "03-javascript/script.js"
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
        "description": "CDN으로 불러온 Alpine과 x-cloak CSS를 사용하는 같은 카드입니다.",
        "scene": "browser",
        "code": "<article x-data=\"{ open: false }\">\n  <button @click=\"open = !open\" :aria-expanded=\"open.toString()\">설명 보기</button>\n  <p x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>",
        "language": "html",
        "output": "처음 접힘 → 클릭 후 펼침 → 다시 클릭하면 접힘. Enter·Space도 확인합니다.",
        "focus": "frontend",
        "fileName": "05-alpine/index.html",
        "files": [
          "05-alpine/index.html"
        ]
      }
    ],
    "pitfalls": [
      {
        "title": "CDN 파일이 불러와지지 않을 때",
        "body": "인터넷 연결과 Tailwind·Alpine의 CDN 주소를 확인합니다. 04-tailwind는 이전 단계의 script.js도 상대 경로로 불러오므로 course-card 폴더 구조를 유지합니다."
      },
      {
        "title": "연습용 Play CDN을 운영 환경에 그대로 사용하기",
        "body": "Tailwind Play CDN은 개발·연습용입니다. 실제 운영 프로젝트에서는 해당 버전에 맞는 빌드 도구로 CSS를 생성해 배포합니다."
      },
      {
        "title": "두 클릭 코드를 동시에 실행하기",
        "body": "Alpine 카드에서는 이전 script.js를 함께 연결하지 않고 한 방식으로 버튼을 동작시킵니다."
      }
    ],
    "presentation": {
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "04-tailwind/index.html · 05-alpine/index.html · CDN",
        "command": "기존 카드와 04-tailwind 비교 → p-6을 p-8로 바꾸고 복구\n05-alpine에서 상태·클릭·표시 읽기 → 버튼·키보드·새로고침 확인",
        "expectedResult": "같은 Git 카드의 모양을 Tailwind 클래스로, 버튼 동작을 Alpine 상태와 속성으로 설명할 수 있습니다.",
        "durationMinutes": 5
      }
    }
  },
  "web": {
    "id": "web",
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
        "body": "같은 강의 카드를 **Live Server → Vite** 순으로 열어 비교합니다. 실습 폴더는 `git-practice/course-card/03-javascript`입니다.\n\n### 1. Live Server로 열기\n\n`index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 터미널이나 브라우저에 나온 실제 주소를 확인합니다. 예시는 `http://127.0.0.1:5500/`입니다. 제목을 바꾸고 저장해 새로고침과 변경 결과를 본 뒤 되돌립니다. 이 카드의 Live Server 실습은 VS Code 확장만 준비하면 됩니다. [Live Server 확장 안내](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n\n### 2. Vite 프로젝트의 파일 읽기\n\n우리가 작성한 HTML·CSS·JavaScript에 아래 설정이 추가됩니다. [강의 카드 Vite 예제 저장소](https://github.com/is2js/course-card-vite-example)\n\n```text\ncourse-card-vite-example/  ← Vite 예제 저장소\n├─ index.html               ← 화면의 구조\n├─ style.css                ← 화면의 모양\n├─ script.js                ← 버튼 동작\n├─ package.json             ← 프로젝트와 실행 작업 설정\n└─ package-lock.json        ← 설치되는 패키지 버전의 구체적인 기록\n```\n\n**`package.json`: 프로젝트의 약속**\n\n`03-javascript`에 `package.json` 파일이 없다면 아래 전체 코드를 새로 저장합니다. 이미 있다면 `scripts`와 의존성을 먼저 읽습니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite --host 127.0.0.1 --port 5173\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"6.4.1\"\n  }\n}\n```\n\n- `name`과 `version`은 프로젝트의 이름·버전입니다. `private: true`는 npm 패키지 저장소에 실수로 게시하는 것을 막고, `type: \"module\"`은 Node.js에서 `.js`를 ES 모듈로 읽도록 합니다.\n- `scripts`는 실행할 작업 목록이고, `devDependencies`는 개발에 필요한 패키지 목록입니다. `npm install`은 이 파일을 읽어 Vite `6.4.1`을 설치합니다. [npm 스크립트 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### `npm run dev`를 한 단어씩 읽기\n\n```text\nnpm       run       dev\n도구 이름   실행하기    작업 이름\n```\n\n`npm`은 Node.js 프로젝트의 패키지를 설치하고 작업을 실행하는 도구입니다. `run`은 등록된 작업을 실행하라는 뜻이고, `dev`는 작성자가 붙인 작업 이름입니다. `npm run`만 입력하면 가능한 작업을 나열합니다. 이 예제에서 `npm run dev`는 **`scripts.dev`**의 값인 `vite --host 127.0.0.1 --port 5173`을 실행합니다. `--host`는 접속 주소, `--port`는 포트를 정합니다. AI가 같은 명령을 안내하면 현재 프로젝트의 `scripts.dev`부터 확인합니다. [npm run 공식 안내](https://docs.npmjs.com/cli/v12/commands/npm-run/)\n\n### 같은 강의 카드에서 Vite를 직접 실행하기\n\n1. 원본 `git-practice`의 VS Code 터미널에서 카드 폴더와 Node.js 버전을 확인합니다.\n\n```powershell\ncd ~/git-practice/course-card/03-javascript\npwd\nls\nnode --version\nnpm --version\n```\n\nWindows PowerShell의 `cd`·`pwd`·`ls`는 `Set-Location`·`Get-Location`·`Get-ChildItem`의 기본 별칭입니다. cmd에서 대응 명령은 `cd /d %USERPROFILE%\\git-practice\\course-card\\03-javascript`, 인수 없는 `cd`, `dir`입니다. macOS/Linux에서는 `cd ~/git-practice/course-card/03-javascript`, `pwd`, `ls`를 사용합니다.\n\n2. 카드 파일과 `package.json`이 보이면 아래 명령을 실행합니다. 인터넷 연결이 필요합니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n3. 터미널에 나온 **Local 주소**를 브라우저에서 엽니다. 예제 주소는 `127.0.0.1:5173`이며 이미 사용 중이면 다른 포트가 표시될 수 있습니다. 제목을 바꾸고 저장해 브라우저에 반영되는지 봅니다.\n4. 같은 터미널에서 `h` + `Enter`로 도움말을 엽니다. 예제에는 `r` 재시작, `u` 주소 표시, `o` 브라우저 열기, `c` 출력 지우기, `q` 종료가 표시됩니다. 글자 뒤에 `Enter`를 누릅니다. 서버는 `Ctrl+C`로도 종료할 수 있습니다. 강의노트 영상의 5188 서버는 별도입니다.\n\n**`package-lock.json`은 설치한 버전 기록**입니다. 아래 예시는 npm이 만든 파일의 앞부분입니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"lockfileVersion\": 3,\n  \"requires\": true,\n  \"packages\": {\n    \"\": {\n      \"name\": \"course-card-vite-demo\",\n      \"version\": \"1.0.0\",\n      \"devDependencies\": {\n        \"vite\": \"6.4.1\"\n      }\n```\n\nnpm으로 설치하면 잠금 파일이 만들어지거나 갱신되고 패키지는 `node_modules/`에 들어갑니다. `.gitignore`에 `node_modules/`가 있는지 확인합니다. [npm lock 파일 안내](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)\n\n### 3. 초기 Windows에서 Node.js 준비\n\n[Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 프로젝트에 맞는 Windows LTS 설치 프로그램을 받습니다. 일반적인 공식 설치에는 npm도 들어 있습니다. 새 터미널의 `node --version`, `npm --version` 버전이 확인되면 `git-practice/course-card/03-javascript`에서 다음 명령을 실행합니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n`npm install`은 패키지 설치, `npm run dev`는 등록된 개발 작업 실행입니다.\n\n### 4. Live Server와 Vite 비교\n\n| 비교 | 앞에서 만든 카드 + Live Server | 같은 카드의 Vite 예제 |\n| --- | --- | --- |\n| 준비 | VS Code와 Live Server 확장 | Node.js·npm과 프로젝트에 필요한 패키지 |\n| 여는 방법 | `index.html`에서 Open with Live Server | 해당 폴더에서 `npm install` 후 `npm run dev` |\n| 주소 예시 | `http://127.0.0.1:5500/` | `http://127.0.0.1:5173/` |\n| 저장 후 | 파일 변경을 감지해 브라우저 새로고침 | 일부 변경은 전체 새로고침 없이 교체(HMR), 파일·설정에 따라 새로고침 가능 |\n| 추가 역할 | 정적 파일을 로컬 주소로 제공 | 개발 서버와 배포용 파일을 만드는 빌드 도구 |\n\n두 방법에서 같은 카드를 확인할 수 있습니다. **빌드**는 소스를 배포용 파일로 만드는 작업입니다. 이 예제의 `dev`는 개발 서버를 켜는 작업입니다. [Vite 공식 안내](https://vite.dev/guide/)\n\n### 5. import 오류가 나면 Node.js 확인\n\n`import { performance } from 'node:perf_hooks'` 주변에서 `SyntaxError: Unexpected token {`이 나오면 현재 실행 중인 Node.js를 확인합니다.\n\n```powershell\nnode --version\nnpm --version\nwhere.exe node\n```\n\n예제의 Vite 6.4.1은 Node.js **18.x, 20.x 또는 22 이상**을 지원합니다. 조건에 맞는 버전을 다시 설치했다면 VS Code와 터미널을 다시 열고 위 명령을 실행합니다. `where.exe node`로 이전 실행 경로가 먼저 잡혔는지 확인할 수 있습니다. [Vite 6.4.1의 지원 Node.js 버전](https://github.com/vitejs/vite/blob/v6.4.1/packages/vite/package.json) · [Node.js 공식 다운로드](https://nodejs.org/en/download/)\n\n`package.json`이 있는 실제 폴더에서 재시도합니다. 실수로 원본 `git-practice` 루트에서 실행했다면 그 위치의 설정부터 확인하세요.\n\n```powershell\npwd\nls\nnpm install\nnpm run dev\n```\n\n`pwd`와 `ls`는 PowerShell에서 `Get-Location`과 `Get-ChildItem`의 기본 별칭입니다. 브라우저에서 카드를 확인하려면 실행한 폴더에 `index.html`이 있어야 합니다. 종료는 `Ctrl+C`입니다.\n\n### 6. 보충 실습 · 이전 Node.js에서 카드 열기\n\nNode.js 10.24.1에서 확인한 간단 서버 예제입니다. 수업 카드를 복사해 수동 새로고침으로 확인합니다.\n\n1. `git-practice` 안의 **course-card**에 **06-node-simple** 폴더를 만듭니다.\n2. 이전 카드의 `index.html`, `style.css`, `script.js`와 예제의 **package.json·server.cjs**를 복사합니다. 같은 파일 이름은 먼저 내용을 확인합니다. [간단 서버 예제 폴더](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/06-node-simple)\n3. 터미널에서 다음을 실행합니다.\n\n```powershell\ncd ~/git-practice/course-card/06-node-simple\npwd\nnpm run dev\n```\n\nPowerShell의 `cd`·`pwd`는 `Set-Location`·`Get-Location`의 기본 별칭입니다. cmd는 **cd /d %USERPROFILE%\\git-practice\\course-card\\06-node-simple**, **cd**, macOS/Linux는 **cd ~/git-practice/course-card/06-node-simple**, **pwd**를 사용합니다.\n\n```json\n{\n  \"scripts\": {\n    \"dev\": \"node server.cjs\"\n  }\n}\n```\n\n이 `npm run dev`는 Node.js로 **server.cjs**를 실행합니다. 별도 패키지 설치 없이 터미널의 주소에서 카드를 열고 `Ctrl+C`로 종료합니다.\n\n### 7. 후속 강의 · FastAPI로 같은 카드 열기\n\n```text\n브라우저 → FastAPI 주소로 요청\n           → Python 데이터 또는 SQLite 조회\n           → 템플릿에 데이터 채우기 → 완성된 HTML 응답\n브라우저 → 받은 HTML·CSS·JavaScript로 카드 표시\n```\n\n후속 예제는 **FastAPI의 주소 하나**에서 브라우저 화면과 데이터를 확인합니다. VS Code의 **Live Server: Stop Live Server**로 기존 서버를 닫고 구분해도 됩니다. Python의 `pip`는 Python 패키지를 설치하는 도구입니다.",
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
        "body": "### 1. 복사본 준비하기\n\n`git-practice/course-card/05-alpine/index.html`을 `git-practice/course-card/server-data/static/01-local-json-practice.html`로 복사합니다. `server-data` 폴더가 없다면 예제의 `public/examples/course-card/server-data`를 `course-card`에 복사합니다. 같은 파일이 있으면 내용을 먼저 확인하세요. [JSON 카드 예제](./examples/course-card/server-data/static/01-local-json.html) · [예제 저장소](https://github.com/is2js/dolbeom-coding-notes)\n\n### 2. 카드 앞에 JSON 추가하기\n\n기존 `<body>`의 `<article>` 위치를 찾습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`<body>` 바로 아래, `<article>` 앞에 JSON 블록을 넣습니다.\n\n```html\n<body class=\"bg-slate-100 p-6 font-sans\">\n  <script type=\"application/json\" id=\"lesson-data\">\n  [\n    {\"title\": \"윈도우 터미널\", \"minutes\": 30, \"description\": \"폴더를 확인하고 탐색기와 오갑니다.\"},\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}\n  ]\n  </script>\n\n  <article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n    <h1>Git</h1>\n    <button type=\"button\" class=\"cursor-pointer rounded border border-slate-500 bg-slate-100 px-3 py-2\" @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n    <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n```\n\n`lesson-data`는 데이터를 찾을 이름입니다. `[]` 안의 `{}` 하나가 카드 한 장입니다. 여기까지 저장하면 화면에는 기존 Git 카드 한 장이 보입니다.\n\n### 3. Alpine.js로 JSON 읽기\n\n기존 `<article>`부터 `</article>`까지 아래 `<main>` 전체로 교체합니다. JSON 블록과 CDN 연결은 둡니다.\n\n```html\n  <main class=\"mx-auto max-w-3xl p-6\"\n        x-data=\"{ lessons: JSON.parse(document.getElementById('lesson-data').textContent) }\">\n    <h1 class=\"mb-4 text-2xl font-bold\">나의 강의 카드</h1>\n    <p>데이터 출처: HTML 안의 JSON</p>\n    <ul class=\"grid gap-4 md:grid-cols-2\">\n      <template x-for=\"(lesson, index) in lessons\" :key=\"index\">\n        <li>\n          <article class=\"rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n            <h2 class=\"text-xl font-bold\" x-text=\"lesson.title\"></h2>\n            <p><span x-text=\"lesson.minutes\"></span>분</p>\n            <button type=\"button\" class=\"mt-4 rounded bg-slate-800 px-3 py-2 text-white\"\n                    @click=\"open = !open\" :aria-expanded=\"open\">설명 보기</button>\n            <p class=\"mt-3\" x-show=\"open\" x-cloak x-text=\"lesson.description\"></p>\n          </article>\n        </li>\n      </template>\n    </ul>\n  </main>\n```\n\n`getElementById('lesson-data').textContent`로 글자를 가져오고 `JSON.parse`로 읽어 `lessons`에 담습니다. `x-for`로 카드 수만큼 반복하고 `x-text`로 제목·시간·설명을 채웁니다.\n\n### 4. 카드 두 장 확인하기\n\n**Open with Live Server**로 열고 카드 두 장과 버튼을 확인합니다. CDN에 연결되어 있어야 합니다. JSON에서 Git 제목만 바꾸고 저장해 카드가 바뀌는지 봅니다. 카드가 비어 있으면 큰따옴표와 쉼표를 확인하세요.",
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
        "fileName": "static/01-local-json.html",
        "files": [
          "static/01-local-json.html"
        ]
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
    "presentation": {
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "카드 index.html · 강의 본문의 예제 파일 구조와 package.json",
        "command": "카드를 Live Server로 열고 저장 결과 확인\n카드 폴더에서 package.json 확인 → npm install → npm run dev\n표시된 Local 주소 열고 실행 중 터미널에서 h + Enter\nHTML 안 JSON을 Alpine.js로 읽어 카드 두 개 표시\n후속 Python 데이터와 SQLite 흐름 살펴보고 마무리",
        "expectedResult": "같은 카드를 Live Server와 Vite로 확인하고 HTML 안 JSON으로 카드 두 개를 표시합니다.",
        "durationMinutes": 5
      }
    }
  }
};
