// Published web coding defaults before creating and connecting each file first.
export const previousWebFileOrderDefault = {
  "id": "web-coding",
  "sections": [
    {
      "id": "tools-html",
      "body": "원본 `git-practice`에서 `course-card` → `03-javascript` 폴더를 만들고 `index.html`, `style.css`, `script.js`를 준비합니다. 같은 이름이 있다면 먼저 내용을 확인하세요. 만들 화면을 먼저 봅니다. [완성 카드](./examples/course-card/03-javascript/index.html)\n\n### 1. 태그와 내용 읽기\n\n```html\n<h1>Git</h1>\n```\n\n![h1의 시작 태그, Git 내용, 끝 태그를 나누어 읽는 설명 그림](./assets/course/diagrams/html-element.svg)\n\n`<h1>`은 시작 태그, `Git`은 내용, `</h1>`은 끝 태그입니다. 셋을 합쳐 **요소**라고 부릅니다. `<p>...</p>`는 문단, `<button>...</button>`은 버튼입니다.\n\n### 2. 속성으로 이름 붙이기\n\n```html\n<article class=\"card\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\">설명 보기</button>\n  <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n![HTML 요소의 속성 이름과 값, class와 id의 연결 대상을 설명하는 그림](./assets/course/diagrams/html-attributes.svg)\n\n`article`은 카드의 내용을 묶습니다. `class=\"card\"`는 CSS에서 모양을 찾는 이름이고, `id=\"toggle\"`과 `id=\"detail\"`은 JavaScript가 버튼과 설명을 찾는 이름입니다. `type=\"button\"`은 일반 버튼임을 표시합니다.\n\n### 3. 전체 HTML 작성하기\n\n![HTML 문서에서 head의 탭 제목과 body의 화면 내용이 나뉘는 설명 그림](./assets/course/diagrams/html-document.svg)\n\n`head`는 문서 정보, `body`는 실제 화면입니다. `title`은 탭 이름, `h1`은 화면의 제목, `meta charset=\"utf-8\"`은 한글을 포함한 문자를 읽을 인코딩입니다. **`index.html`**에 아래를 입력하고 **Ctrl+S**로 저장합니다.\n\n~~~html\n<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\">설명 보기</button>\n    <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>\n~~~\n\n### 4. 열고 제목 바꿔 보기\n\n1. [Live Server 확장](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)을 설치했다면 `index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 설치할 때는 **Ritwick Dey**의 `ritwickdey.LiveServer`를 확인합니다.\n2. 브라우저에서 실제로 열린 주소를 확인합니다. 예시는 `http://127.0.0.1:5500/`입니다.\n3. `<h1>Git</h1>`의 제목을 바꾸고 `Ctrl+S`로 저장합니다. 화면이 바뀌는지 본 뒤 원래대로 돌립니다. 필요하면 브라우저를 새로고침합니다.\n\nLive Server 없이 탐색기에서 파일을 열어도 됩니다. 서버를 종료할 때는 **Live Server: Stop Live Server**를 사용합니다.\n\n[HTML 카드](./examples/course-card/01-html/index.html) → [CSS 카드](./examples/course-card/02-css/index.html) → [JavaScript 완성 카드](./examples/course-card/03-javascript/index.html)",
      "presentationPoints": [
        "VS Code에서 별도 카드 폴더를 열고 index.html을 만듭니다.",
        "시작 태그·내용·끝 태그와 속성, head와 body를 읽고 저장합니다.",
        "Live Server 주소를 열고 저장한 제목의 변화를 확인합니다."
      ]
    },
    {
      "id": "tools-css",
      "body": "### 카드 여백 읽기\n\n```css\n.card {\n  padding: 24px;\n}\n```\n\n![CSS 규칙의 선택자 card, 속성 padding, 값 24px을 나누어 읽는 설명 그림](./assets/course/diagrams/css-declaration.svg)\n\n`.card`는 `class=\"card\"`인 요소를 고르는 **선택자**, `padding`은 안쪽 여백 **속성**, `24px`은 **값**입니다.\n\n### 1. 스타일 파일 작성\n\n카드 폴더에 `style.css`를 만들고 아래 내용을 저장합니다.\n\n~~~css\nbody {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}\n~~~\n\n`body`는 페이지 전체, `.card`는 카드, `button`은 버튼의 모양입니다.\n\n### 2. 연결하고 여백 바꿔 보기\n\n`index.html`의 `head` 안에서 `</head>` 앞에 연결합니다.\n\n~~~html\n<link rel=\"stylesheet\" href=\"style.css\">\n~~~\n\n브라우저에서 흰 카드와 여백을 확인합니다. 변화가 없으면 `index.html`과 `style.css`의 위치·저장 상태를 확인하세요. `.card`의 `padding: 24px`을 `32px`로 바꿔 차이를 보고 **24px로 되돌립니다**. [CSS 카드](./examples/course-card/02-css/index.html)",
      "presentationPoints": [
        "style.css를 만들고 index.html에 연결합니다.",
        "저장 후 새로고침해 색상과 여백을 확인합니다.",
        "CSS는 HTML 요소의 시각적인 모양을 정합니다."
      ]
    },
    {
      "id": "tools-javascript",
      "body": "목표는 **버튼 클릭 → 설명 펼치기 → 한 번 더 클릭 → 접기**입니다.\n\n![JavaScript가 버튼과 설명을 찾고 클릭을 기다린 뒤 hidden과 aria-expanded 상태를 바꾸는 흐름](./assets/course/diagrams/javascript-flow.svg)\n\n### 1. 설명을 처음에 숨기기\n\n`index.html`의 버튼과 설명을 아래로 교체합니다. `hidden`은 처음에 숨기고 `aria-expanded=\"false\"`는 버튼의 접힌 상태를 전달합니다.\n\n~~~html\n<button id=\"toggle\" type=\"button\" aria-expanded=\"false\">설명 보기</button>\n<p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n~~~\n\n### 2. 클릭 동작 작성하기\n\n같은 폴더의 `script.js`에 저장합니다.\n\n~~~javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n~~~\n\n`#toggle`과 `#detail`로 각 `id`를 가진 HTML 요소를 찾습니다. `addEventListener('click', ...)`는 클릭할 때 실행하는 동작입니다. `detail.hidden`을 반대로 바꾸고 버튼의 `aria-expanded`도 함께 갱신합니다.\n\n### 3. HTML에 연결하고 눌러 보기\n\n`index.html`의 `head` 안에 추가합니다. `defer`는 HTML을 읽은 뒤 스크립트를 실행합니다.\n\n~~~html\n<script defer src=\"script.js\"></script>\n~~~\n\n1. 저장 후 버튼을 눌러 설명이 펼쳐지고 접히는지 확인합니다.\n2. **Tab**으로 버튼을 골라 **Enter**나 **Space**도 눌러 봅니다.\n3. 동작하지 않으면 `toggle`·`detail` 이름, 파일 연결, 저장 여부를 확인합니다.\n\n설명 문장만 나의 소개로 바꿔도 같은 동작이 유지되는지 확인합니다. [완성 카드](./examples/course-card/03-javascript/index.html)",
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
      "description": "VS Code에서 카드 폴더와 index.html을 만들고 저장한 뒤 Live Server로 열어 제목 변경을 확인합니다."
    },
    {
      "id": "css-practice",
      "description": "같은 폴더에 style.css를 저장하고 index.html의 head에 link 태그를 넣습니다. 선택자·속성·값 그림을 읽고 .card의 여백을 24px에서 32px로 비교한 뒤 24px로 되돌립니다."
    },
    {
      "id": "javascript-practice",
      "description": "기존 HTML과 CSS 카드에 hidden과 aria-expanded를 추가하고 script.js를 defer로 연결합니다. 요소 찾기 → 클릭 듣기 → 상태 바꾸기 그림과 코드의 각 부분을 대응합니다."
    }
  ],
  "presentation": {
    "demo": {
      "command": "git-practice의 course-card/03-javascript 폴더 열기 → index.html 작성·저장 → Live Server로 확인\nstyle.css 작성·연결 → 여백과 색 확인\nscript.js 작성·연결 → 버튼 클릭과 Enter·Space로 펼치기·접기"
    }
  }
};

// Published web coding recap before the HTML, CSS and JavaScript review.
export const previousWebRecapDefault = {
  "id": "web-coding",
  "sections": [
    {
      "id": "tools-html"
    },
    {
      "id": "tools-css"
    },
    {
      "id": "tools-javascript"
    }
  ],
  "steps": [
    {
      "id": "html-practice"
    },
    {
      "id": "css-practice"
    },
    {
      "id": "javascript-practice"
    }
  ],
  "closing": "하나의 카드에서 HTML은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. 다음 주제에서는 같은 카드의 모양과 동작을 Tailwind CSS와 Alpine.js로 바꿔 봅니다.",
  "checklist": [
    "git-practice 안의 카드 폴더와 VS Code에서 저장한 파일 위치를 확인할 수 있다.",
    "HTML 구조·CSS 모양·JavaScript 버튼 동작의 차이를 설명할 수 있다.",
    "같은 카드를 브라우저에서 열고 수정 결과를 확인할 수 있다."
  ],
  "presentation": {
    "returnSummary": "HTML·CSS·JavaScript로 만든 카드를 다음 주제에서 Tailwind CSS와 Alpine.js로 다시 표현합니다."
  }
};
