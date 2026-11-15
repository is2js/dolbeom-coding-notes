// Published nine-topic baseline before the Live Server clarification.
export const previousNineDefault = {
  "web-coding": {
    "id": "web-coding",
    "number": 6,
    "title": "웹 코딩 첫 실습: HTML·CSS·JavaScript로 강의 카드 만들기",
    "shortTitle": "웹 코딩 첫 실습",
    "subtitle": "지금까지 익힌 폴더·문서·편집기를 활용해 작은 웹 화면을 만듭니다",
    "icon": "code",
    "durationMinutes": 30,
    "case": {
      "kind": "example",
      "title": "지금까지 배운 도구로 첫 웹 화면을 만들어 볼까요?",
      "body": "### README에서 브라우저 화면으로\n\n지금까지 폴더를 열고, 파일을 편집하고, Markdown을 미리보며 Git의 변경을 살펴봤습니다. 이제 별도의 연습 폴더에서 VS Code로 작은 **강의 카드**를 만들어 브라우저에서 확인합니다. 이 카드는 수업용 예제이며 Codex의 실제 결과물은 아닙니다.\n\n### 같은 카드를 세 단계로 완성합니다\n\n1. **HTML:** 제목·버튼·설명의 내용과 순서를 만듭니다.\n2. **CSS:** 같은 카드에 여백과 색을 더합니다.\n3. **JavaScript:** 버튼을 누르면 설명이 펼쳐지도록 동작을 연결합니다.\n\n앞에서 배운 폴더 확인·파일 저장·편집기와 브라우저 전환을 사용합니다. Git·GitHub는 변경 기록과 공유가 필요할 때 선택해 연결할 수 있으며, 첫 화면을 보는 데 commit이나 push는 필수가 아닙니다. Node·Python 설치 없이 간단한 정적 파일을 브라우저에서 확인합니다.",
      "question": "같은 카드에서 내용·모양·버튼 동작은 각각 어떤 파일에서 달라질까요?"
    },
    "objectives": [
      "지금까지 배운 폴더 확인·VS Code 편집·저장과 브라우저 확인을 웹 파일 실습에 연결한다.",
      "HTML·CSS·JavaScript로 한 장의 강의 카드를 단계별로 만들고 각 파일의 역할을 구분한다.",
      "버튼의 동작을 확인하고 다음 프론트엔드·백엔드 주제로 연결한다."
    ],
    "sections": [
      {
        "id": "tools-html",
        "title": "HTML: 강의 카드의 내용과 구조 만들기",
        "minutes": 16,
        "optional": false,
        "body": "### 먼저 만들 화면을 확인합니다\n\n이번 웹 기초 실습은 **강의 카드**를 만듭니다. 제목은 Git, 버튼은 설명 보기, 설명은 변경을 확인하고 기록합니다입니다. [완성 카드](./examples/course-card/03-javascript/index.html)를 잠깐 본 뒤, 별도의 빈 카드 연습 폴더에서 HTML → CSS → JavaScript 순서로 직접 완성합니다. 기존 메모 복제본과 파일이 섞이지 않도록 VS Code의 폴더 열기에서 별도의 빈 카드 연습 폴더를 새로 만들거나 준비합니다. 같은 이름의 폴더나 파일이 이미 있다면 덮어쓰지 말고 다른 이름을 사용합니다. 지금까지 연습한 폴더 확인과 파일 저장을 이곳에서 다시 사용합니다.\n\n브라우저는 HTML의 구조, CSS의 모양, JavaScript의 동작을 읽어 화면을 만듭니다. 인터넷에서 웹 페이지를 열 때는 브라우저가 서버에 자료를 요청하고 응답을 받습니다. 이번에는 내 컴퓨터에 있는 작은 파일을 먼저 열어 보며, 요청·응답과 프론트엔드·백엔드의 자세한 관계는 다음 주제에서 이어갑니다.\n\n### 1. 태그와 내용으로 화면의 구조 표현하기\n\n짧은 제목 하나부터 읽습니다.\n\n```html\n<h1>Git</h1>\n```\n\n![h1의 시작 태그, Git 내용, 끝 태그를 나누어 읽는 설명 그림](./assets/course/diagrams/html-element.svg)\n\n`<h1>`은 제목의 시작 태그, `Git`은 내용, `</h1>`은 끝 태그입니다. 이 묶음을 요소라고 부릅니다. `<p>...</p>`는 문단, `<button>...</button>`은 버튼입니다. HTML은 브라우저에 담을 내용과 구조를 표현합니다.\n\n### 2. 속성으로 요소에 정보 붙이기\n\n```html\n<article class=\"card\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\">설명 보기</button>\n  <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n![HTML 요소의 속성 이름과 값, class와 id의 연결 대상을 설명하는 그림](./assets/course/diagrams/html-attributes.svg)\n\n`article`은 이 카드 내용을 묶습니다. `class=\"card\"`는 다음 CSS에서 카드 모양을 고를 이름이고, `id=\"toggle\"`과 `id=\"detail\"`은 JavaScript에서 버튼과 설명을 찾을 때 사용합니다. `type=\"button\"`은 이 요소가 일반 버튼임을 나타냅니다. 속성은 보통 시작 태그 안에 적습니다. 속성 이름과 값 사이의 `=`와 값의 따옴표를 함께 확인합니다.\n\n**한 가지 확인:** 아직 색이나 버튼 동작을 만들지 않았습니다. 이 코드에서 버튼 다음에 적힌 설명 문단이 화면에서도 다음에 보이는지 예상해 봅니다.\n\n### 3. HTML 문서의 기본 틀에 넣기\n\n![HTML 문서에서 head의 탭 제목과 body의 화면 내용이 나뉘는 설명 그림](./assets/course/diagrams/html-document.svg)\n\n`head`에는 문서의 정보가, `body`에는 페이지에 표시할 내용이 들어갑니다. `title`은 브라우저 탭 이름이고 `h1`은 페이지 안의 제목입니다. `meta charset=\"utf-8\"`은 한글을 포함한 문자의 인코딩을 알립니다. `meta`처럼 끝 태그를 쓰지 않는 요소도 있습니다.\n\nVS Code에서 **파일 → 폴더 열기**로 별도의 카드 연습 폴더를 열고, 왼쪽 탐색기의 **새 파일** 버튼으로 `index.html`을 만듭니다. 아래 코드를 입력한 뒤 `Ctrl+S`로 저장합니다. 파일이 앞의 메모 복제본이 아닌 카드 폴더에 있는지 확인합니다.\n\n~~~html\n<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\">설명 보기</button>\n    <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>\n~~~\n\n### 4. 저장한 화면을 열고 한 곳 바꾸기\n\n최신 VS Code에서는 탐색기나 편집기 탭의 `index.html`을 우클릭해 **Open in Integrated Browser**를 선택하거나 상단의 **Show Preview** 아이콘을 누를 수 있습니다. HTML 미리보기는 수정 내용을 확인하는 작업대입니다. 메뉴가 없는 구버전이라면 파일 탐색기에서 `index.html`을 외부 브라우저로 열고 저장 후 새로고침합니다. 이 간단한 카드는 파일을 직접 열어도 확인할 수 있습니다. [VS Code HTML 공식 안내](https://code.visualstudio.com/docs/languages/html)\n\n**한 가지 수정:** `<h1>Git</h1>`의 Git을 바꾸어 저장하고 화면의 제목만 바뀌는지 확인한 뒤 원래대로 돌립니다. `<title>`의 글자는 탭 이름에 표시되는지도 비교합니다. 아직 버튼을 눌러도 설명의 표시 상태는 바뀌지 않습니다.\n\n### 선택: 로컬 서버로 확인하기\n\n강사가 별도로 준비한 [Live Server 확장](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)을 사용할 수도 있습니다. 게시자는 Ritwick Dey이며 VS Code의 기본 기능과 구분합니다. 설치한 환경에서는 카드 폴더를 열고 `index.html` 우클릭의 **Open with Live Server** 또는 상태 표시줄의 **Go Live**로 시작합니다. 표시된 주소에서 카드를 확인하고, 마치면 **Live Server: Stop Live Server**로 종료합니다.\n\n로컬 서버는 연습 파일을 제공하는 도구입니다. 실행했다고 GitHub Pages에 배포되거나 FastAPI 같은 백엔드가 준비되는 것은 아닙니다. 확장이 없다면 기본 미리보기나 외부 브라우저 실습을 이어갑니다.\n\n**단계 예제:** [HTML 카드](./examples/course-card/01-html/index.html) → [CSS 카드](./examples/course-card/02-css/index.html) → [JavaScript 완성 카드](./examples/course-card/03-javascript/index.html). 다음 단계에서는 같은 카드에 모양을 더합니다.",
        "presentationPoints": [
          "VS Code에서 별도 카드 폴더를 열고 index.html을 만듭니다.",
          "시작 태그·내용·끝 태그와 속성, head와 body를 읽고 저장합니다.",
          "VS Code 미리보기 또는 외부 브라우저로 제목 변경을 확인합니다."
        ]
      },
      {
        "id": "tools-css",
        "title": "CSS: 같은 강의 카드 꾸미기",
        "minutes": 7,
        "optional": false,
        "body": "### 같은 카드에 모양을 더합니다\n\nHTML로 만든 제목·버튼·설명은 그대로 두고 여백과 색을 더합니다. 먼저 카드의 여백을 정하는 작은 규칙 하나를 읽습니다.\n\n```css\n.card {\n  padding: 24px;\n}\n```\n\n![CSS 규칙의 선택자 card, 속성 padding, 값 24px을 나누어 읽는 설명 그림](./assets/course/diagrams/css-declaration.svg)\n\n`.card`는 `class=\"card\"`인 HTML 요소를 고르는 **선택자**, `padding`은 안쪽 여백을 정하는 **속성**, `24px`은 그 **값**입니다. 중괄호 안에 선언을 적고 세미콜론으로 마칩니다. HTML의 class 이름에는 점을 쓰지 않고 CSS에서 `.card`라고 선택합니다.\n\n### 1. 스타일 파일 저장하기\n\n앞서 만든 카드 폴더에 `style.css`를 만들고 다음 내용을 저장합니다.\n\n~~~css\nbody {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}\n~~~\n\n`body`는 페이지 전체의 글꼴·배경과 여백을, `.card`는 카드의 크기·배경·둥근 모서리를, `button`은 버튼의 여백과 커서를 정합니다.\n\n### 2. HTML과 CSS 연결하기\n\n`index.html`의 `head` 안, 닫는 `</head>` 앞에 아래 줄을 넣고 저장합니다.\n\n~~~html\n<link rel=\"stylesheet\" href=\"style.css\">\n~~~\n\n`href`의 파일 이름과 실제 `style.css` 위치가 같아야 합니다. 브라우저를 새로고침해 연한 배경, 흰색 카드와 여백이 보이는지 확인합니다. 바뀌지 않으면 두 파일의 위치·파일명·저장 여부부터 살펴봅니다.\n\n**한 가지 수정:** `.card` 안의 `padding: 24px`만 `32px`로 바꾸어 카드 안쪽 여백을 비교한 뒤 **24px로 되돌립니다.** 뒤의 템플릿 비교도 24px을 기준으로 진행합니다.\n\n**단계 예제:** [CSS 카드](./examples/course-card/02-css/index.html)를 HTML 카드와 나란히 비교합니다. 다음 단계에서는 같은 버튼에 동작을 연결합니다.",
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
        "body": "### 같은 버튼에 클릭 동작 연결하기\n\nHTML로 만든 버튼을 누르면 설명이 펼쳐지고 다시 누르면 접히게 만듭니다. 그림에서 **요소 찾기 → 클릭 듣기 → 상태 바꾸기**를 먼저 따라봅니다.\n\n![JavaScript가 버튼과 설명을 찾고 클릭을 기다린 뒤 hidden과 aria-expanded 상태를 바꾸는 흐름](./assets/course/diagrams/javascript-flow.svg)\n\n### 1. 처음 보일 상태 정하기\n\n앞서 만든 `index.html`의 버튼과 설명 줄을 바꿉니다. `hidden`은 설명을 처음에 숨기고, `aria-expanded=\"false\"`는 버튼의 펼침 상태를 전달합니다.\n\n~~~html\n<button id=\"toggle\" type=\"button\" aria-expanded=\"false\">설명 보기</button>\n<p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n~~~\n\n### 2. 클릭할 때 할 일 적기\n\n같은 카드 폴더에 `script.js`를 만들고 다음 코드를 저장합니다.\n\n~~~javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n~~~\n\n첫 두 줄은 HTML의 `id`로 버튼과 설명을 찾습니다. 여기서 `#toggle`은 id가 toggle인 요소를 고르는 선택자입니다. `addEventListener('click', ...)`는 클릭할 때 실행할 동작을 연결합니다. `detail.hidden`의 현재 값을 읽고 반대로 바꿔 표시·숨김을 전환하며 버튼의 `aria-expanded`도 함께 바꿉니다.\n\n### 3. HTML에 연결하고 결과 확인하기\n\n`index.html`의 `head` 안에 아래 줄을 추가합니다. `defer`는 HTML을 읽은 뒤 스크립트를 실행하도록 합니다. 세 파일을 모두 저장한 뒤 미리보기를 새로고침합니다.\n\n~~~html\n<script defer src=\"script.js\"></script>\n~~~\n\n처음에는 설명이 숨겨져 있어야 합니다. 버튼을 한 번 클릭하면 설명이 나타나고, 다시 클릭하면 숨겨집니다. Tab으로 버튼을 선택해 Enter나 Space를 눌러도 같은지 확인합니다. 동작하지 않으면 `toggle`·`detail` 이름과 파일 연결, 저장 여부를 대조합니다.\n\n**한 가지 수정:** 설명 문장만 나의 소개로 바꾸어 저장하고, 같은 버튼 동작이 유지되는지 확인합니다. HTML의 내용, CSS의 모양, JavaScript의 동작이 같은 카드에 함께 적용되었습니다.\n\n**단계 예제:** [완성 카드](./examples/course-card/03-javascript/index.html)의 클릭·키보드 동작을 확인합니다. 다음 단원에서는 이 카드가 프론트엔드에 어떻게 속하고 백엔드와 어떻게 연결되는지 살펴봅니다.",
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
        "description": "VS Code의 별도 카드 연습 폴더를 열어 index.html을 만들고 저장합니다. 작은 태그·속성·문서 그림을 읽고 내장 미리보기 또는 외부 브라우저로 확인합니다. 버튼 동작은 아직 연결하지 않았습니다.",
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
        "description": "같은 폴더에 style.css를 저장하고 index.html의 head에 link 태그를 넣습니다. 선택자·속성·값 그림을 읽고 .card의 여백을 24px에서 32px로 비교한 뒤 24px로 되돌립니다.",
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
        "description": "기존 HTML과 CSS 카드에 hidden과 aria-expanded를 추가하고 script.js를 defer로 연결합니다. 요소 찾기 → 클릭 듣기 → 상태 바꾸기 그림과 코드의 각 부분을 대응합니다.",
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
        "body": "별도의 카드 연습 폴더를 사용하고, 이름이 같은 기존 파일이 있으면 덮어쓰지 않습니다."
      }
    ],
    "glossary": [
      {
        "term": "HTML",
        "definition": "웹 문서의 제목·버튼·문장 등 내용과 구조를 표현하는 언어입니다."
      },
      {
        "term": "CSS",
        "definition": "HTML 요소의 색상·여백·배치 등 시각적 표현을 지정하는 언어입니다."
      },
      {
        "term": "JavaScript",
        "definition": "브라우저의 클릭 등에 반응하고 화면을 변경하는 프로그램을 작성하는 언어입니다."
      }
    ],
    "checklist": [
      "별도 연습 폴더와 VS Code에서 저장한 파일 위치를 확인할 수 있다.",
      "HTML 구조·CSS 모양·JavaScript 버튼 동작의 차이를 설명할 수 있다.",
      "같은 카드를 브라우저에서 열고 수정 결과를 확인할 수 있다."
    ],
    "closing": "하나의 카드에서 HTML은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. 다음 주제에서는 이 카드가 프론트엔드와 어떤 관계인지, 백엔드와 어떻게 연결되는지 살펴봅니다.",
    "references": [
      {
        "title": "VS Code HTML 편집",
        "url": "https://code.visualstudio.com/docs/languages/html"
      },
      {
        "title": "참고한 공개 핸드북 · HTML 구조",
        "url": "https://vibe.onebitefe.com/lessons/s05-c02-html-layout"
      },
      {
        "title": "참고한 공개 핸드북 · CSS로 꾸미기",
        "url": "https://vibe.onebitefe.com/lessons/s05-c04-css"
      }
    ],
    "presentation": {
      "caseSummary": "README를 편집하던 작업대로 별도의 웹 카드 폴더를 엽니다. 같은 카드에 HTML 구조, CSS 모양, JavaScript 동작을 한 단계씩 더해 봅니다.",
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "별도 카드 연습 폴더의 index.html · style.css · script.js",
        "command": "별도 카드 폴더 열기 → index.html 작성·저장·브라우저 확인\nstyle.css 작성·연결 → 여백과 색 확인\nscript.js 작성·연결 → 버튼 클릭과 Enter·Space로 펼치기·접기",
        "expectedResult": "하나의 Git 카드가 HTML 구조, CSS 모양과 JavaScript 버튼 동작을 차례로 갖춥니다.",
        "durationMinutes": 6
      },
      "returnSummary": "같은 웹 카드에서 내용·모양·동작을 나누어 만들었습니다. 다음 주제에서 이 화면과 프론트엔드·백엔드의 관계를 설명합니다."
    }
  },
  "web": {
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
      "body": "![AI가 사이트 결과물을 ZIP으로 제공하고 npm install과 npm run dev를 안내한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n### 터미널 강의에서 만났던 실제 화면\n\n처음 강의에서 AI가 프로젝트 ZIP과 함께 `npm install`, `npm run dev`를 알려 준 화면을 보았습니다. 그때는 터미널에서 실행해야 한다는 점만 확인했죠. 이제 앞에서 만든 카드 화면을 바탕으로 **왜 이런 명령이 필요한지** 읽어 봅니다.\n\n이 명령은 **해당 프로젝트에서 안내한 실행 방법**입니다. 모든 사이트에 똑같이 쓰는 필수 명령은 아닙니다. 서버를 켜는 프로그램도 프로젝트마다 다릅니다. 이 화면은 실제 AI 답변이며 아래 연습은 같은 원리를 이해하기 위한 별도 예제입니다.\n\n### 오늘 확인할 순서\n\n앞에서 만든 카드가 브라우저에서 실행되는 프론트엔드라는 점을 살펴보고, `package.json`에 적힌 `dev`가 어떤 명령인지 읽습니다. 준비한 예제를 개발 서버로 실행하면 터미널이 알려 주는 주소를 브라우저에서 열고 저장한 수정 결과를 확인합니다. 이어 사용자 화면과 백엔드가 요청과 응답으로 연결되는 모습을 설명합니다.",
      "question": "브라우저에 보이는 카드와 npm 개발 서버는 각각 어떤 일을 할까요?"
    },
    "objectives": [
      "HTML·CSS·JavaScript와 Tailwind CSS·Alpine.js가 브라우저 화면에 기여하는 역할을 말한다.",
      "Node.js와 npm의 역할, package.json의 scripts와 의존성을 구분한다.",
      "준비한 Vite 카드에서 npm install·npm run dev를 읽고 주소·수정·종료를 확인한다.",
      "프론트엔드와 백엔드, 로컬 주소와 원격 서비스의 차이를 설명한다."
    ],
    "sections": [
      {
        "id": "web-map",
        "title": "프론트엔드란? 브라우저에서 보이고 움직이는 화면",
        "minutes": 9,
        "optional": false,
        "body": "### 앞서 만든 강의 카드가 프론트엔드입니다\n\n사용자가 보고 누르는 화면과 브라우저 쪽 상호작용을 **프론트엔드**라고 부릅니다. 앞선 카드의 `index.html`은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. 이어 배운 Tailwind CSS와 Alpine.js는 각각 모양과 동작을 작성할 때 도움을 주는 도구입니다. 이들이 실행된 결과도 브라우저에서 확인합니다.\n\n```text\nHTML: 제목·버튼·설명\nCSS / Tailwind CSS: 카드 여백·색\nJavaScript / Alpine.js: 설명 펼치기\n                 ↓\n           브라우저의 화면\n```\n\n프론트엔드는 HTML·CSS·JavaScript와 별개의 기술 이름이 아니라, 이 기술들로 만드는 **사용자 쪽 영역**을 가리킵니다. 기본 기술만으로도 만들 수 있고 React나 Svelte처럼 UI를 구성하는 도구를 선택할 수도 있습니다. 프론트엔드가 반드시 React를 뜻하지는 않습니다.\n\n### 같은 브라우저 화면도 여러 방식으로 열 수 있습니다\n\n앞의 간단한 카드는 `index.html`을 브라우저에서 직접 열 수 있었습니다. 별도 프로그램 없이도 동작하는 정적 파일이기 때문입니다. 반면 어떤 프로젝트는 파일 변환, 패키지 사용, 자동 갱신 또는 API 연결을 위해 **개발 서버**를 사용합니다. 실제 프로젝트의 README와 설정을 확인해야 합니다.\n\n**직접 확인:** [기본 카드](./examples/course-card/03-javascript/index.html)에서 버튼을 눌러 보고, 제목·모양·동작이 어디에서 왔는지 각각 짚습니다. 이미 브라우저로 파일을 열었다고 해서 개발 서버나 백엔드가 자동으로 실행되는 것은 아닙니다.",
        "presentationPoints": [
          "앞서 만든 카드의 구조·모양·클릭 동작은 사용자 쪽 프론트엔드입니다.",
          "Tailwind와 Alpine은 각각 스타일과 동작 작성을 돕습니다.",
          "단순 정적 파일은 서버 없이 열 수도 있고, 프로젝트에 따라 개발 서버를 사용합니다."
        ]
      },
      {
        "id": "web-http",
        "title": "AI가 안내한 npm install과 npm run dev 읽기",
        "minutes": 13,
        "optional": false,
        "body": "### Node.js, npm, 개발 서버를 나눠 봅니다\n\n**Node.js**는 브라우저 밖에서 JavaScript를 실행하는 환경입니다. **npm**은 Node.js와 함께 설치되는 패키지 관리자이며 프로젝트에 필요한 패키지를 준비하고, `package.json`의 스크립트를 실행하는 데 사용합니다. 이 수업에서 소개하는 **Vite 개발 서버**는 브라우저에 개발 중인 파일을 제공하고 변경 확인을 돕는 도구입니다. [Node.js 소개](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) · [Vite 시작 안내](https://vite.dev/guide/)\n\n### 1. package.json에서 무슨 일을 하는지 읽기\n\n준비한 예제의 `package.json`에는 다음 설정이 있습니다. 전체 설정 중 학습에 필요한 부분을 발췌했습니다.\n\n```json\n{\n  \"scripts\": { \"dev\": \"vite --host 127.0.0.1 --port 5173\" },\n  \"devDependencies\": { \"vite\": \"6.4.1\" }\n}\n```\n\n- `devDependencies`는 개발할 때 사용하는 패키지를 기록합니다. 이 예제에서는 Vite입니다.\n- `scripts.dev`는 `dev`라는 이름에 연결한 명령입니다.\n- `npm install`은 프로젝트 설정과 잠금 파일을 참고해 필요한 패키지를 준비합니다.\n- `npm run dev`는 이 프로젝트의 `scripts.dev`를 실행합니다. **`dev`의 내용은 프로젝트마다 다르며, 없는 경우도 있습니다.** `npm run`을 입력하면 사용 가능한 스크립트를 볼 수 있습니다. [npm run 공식 안내](https://docs.npmjs.com/cli/commands/npm-run-script/)\n\n### 2. 준비된 예제로 실제 실행하기\n\n[예제 소스](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/04-vite-dev)에는 앞에서 만든 Git 카드와 `package.json`, 잠금 파일이 있습니다. 이 예제는 강의노트 저장소를 내려받아 폴더를 연 강사의 시연입니다. 예제 폴더를 **프로젝트 밖의 별도 연습 위치에 복사**해 VS Code의 폴더 열기로 엽니다. 이미 같은 이름이 있으면 덮어쓰지 말고 다른 이름을 사용합니다. GitHub Pages의 화면 자체에서 Node 서버가 돌아가는 것은 아닙니다.\n\nVS Code의 **보기 → 터미널**을 열고 예제 폴더에 있는지 확인합니다. `pwd`는 Windows PowerShell의 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다. cmd에서는 각각 `cd`, `dir`, macOS/Linux 셸에서는 `pwd`, `ls`를 사용합니다. Git Bash나 다른 셸은 출력이 다를 수 있습니다.\n\n```powershell\npwd\nls\nnode --version\nnpm --version\n```\n\n`package.json`과 `index.html`이 같은 예제 폴더에 보이고 Node와 npm 버전이 나오는지 확인합니다. Node가 없다면 [Node.js 공식 다운로드](https://nodejs.org/en/download)에서 해당 프로젝트가 지원하는 버전을 설치한 뒤 터미널을 다시 엽니다. 설치·버전 확인이 어려우면 강사의 준비된 화면을 보고 다음으로 넘어갈 수 있습니다. PowerShell에서 `npm.ps1` 실행 정책 오류가 나면 `npm.cmd --version`으로 확인하고 아래 두 명령도 각각 `npm.cmd install`, `npm.cmd run dev`로 실행할 수 있습니다. 정책 설정은 바꾸지 않습니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n첫 명령이 완료된 뒤 두 번째를 실행합니다. 예제의 개발 서버는 터미널에 `http://127.0.0.1:5173/` 같은 주소를 표시합니다. 이미 포트가 사용 중이면 주소가 달라질 수 있으니 **실제 터미널 출력**을 읽어 브라우저에서 엽니다. 열리지 않으면 서버가 계속 실행 중인지, 폴더와 주소가 맞는지 확인합니다.\n\n### 3. 수정 결과 확인하고 종료하기\n\nVS Code에서 `index.html`의 `Git` 제목을 한 번 바꾸고 저장합니다. 브라우저가 다시 표시하는지 확인합니다. 자동 갱신 방식은 도구와 설정에 따라 다르므로 달라지지 않으면 새로고침합니다. 완료 후 원래 제목으로 되돌리고, 서버를 실행한 터미널에서 `Ctrl+C`로 종료합니다. 브라우저에서 화면이 보이는 것과 개발 서버가 실행 중인 것은 서로 다른 상태입니다.\n\n이 예제의 `npm install`은 필요한 파일을 준비하는 단계이고, `npm run dev`는 개발용 프로그램을 실행하는 단계입니다. 설치했다고 GitHub Pages에 배포되거나 FastAPI 백엔드가 자동으로 생기지는 않습니다.",
        "presentationPoints": [
          "npm install은 필요한 패키지 준비, npm run dev는 package.json의 dev 실행입니다.",
          "명령은 예제 폴더에서 실행하고 실제 터미널 주소를 브라우저에서 엽니다.",
          "카드 제목을 저장해 확인한 뒤 서버 터미널에서 Ctrl+C로 종료합니다."
        ]
      },
      {
        "id": "web-html",
        "title": "브라우저와 서버: 화면 요청과 백엔드의 역할",
        "minutes": 8,
        "optional": false,
        "body": "### 주소를 열면 어떤 일이 일어날까요?\n\n브라우저에 개발 서버 주소를 입력하면 브라우저가 요청하고 개발 서버가 HTML·CSS·JavaScript 같은 파일을 응답합니다. 브라우저는 받은 파일을 해석해 카드 화면을 표시하고 버튼의 JavaScript를 실행합니다.\n\n```text\n내 브라우저  ── 화면 파일 요청 ──→  내 PC의 개발 서버\n내 브라우저  ←─ HTML·CSS·JS 응답 ─  내 PC의 개발 서버\n```\n\n`127.0.0.1` 또는 `localhost`는 **주소를 열고 있는 내 컴퓨터 자신**을 뜻합니다. `5173` 같은 숫자는 어느 프로그램에 요청을 보낼지 구분하는 포트입니다. 같은 주소를 다른 사람의 PC에 보내도 그 사람 PC를 가리키므로 내 서버 화면이 자동으로 공유되지 않습니다.\n\n### 프론트엔드와 백엔드\n\n프론트엔드는 사용자가 보고 조작하는 화면, **백엔드**는 서버에서 요청 처리·데이터 준비·저장 같은 일을 담당합니다. 지금 Vite 예제는 화면 개발을 돕는 서버이며, 이를 켰다고 업무 데이터를 처리하는 FastAPI가 생기는 것은 아닙니다.\n\n한 프로젝트가 프론트엔드와 백엔드를 별도 서버로 개발할 수도 있고, 하나의 서버에서 화면과 데이터를 함께 제공할 수도 있습니다. 데이터베이스도 필요한 서비스에서 선택해 사용합니다. 간단한 정적 카드에는 별도 백엔드가 필수는 아닙니다. 개발 서버가 **로컬에서** 동작한다고 해서 진짜 서버가 아닌 것도 아닙니다. 로컬·원격은 장소를, 프론트엔드·백엔드는 역할을 나타냅니다.\n\n### 다음 강의로 연결\n\n다음에는 HTML에 넣은 JSON에서 시작해 FastAPI의 Python 딕셔너리와 SQLite의 데이터를 API로 전달하고, 마지막에 템플릿에서 같은 카드로 만드는 방식으로 차례로 확장합니다. 브라우저가 최종 화면을 그리는 역할은 그대로입니다.",
        "presentationPoints": [
          "브라우저가 개발 서버에 파일을 요청하고 받은 HTML·CSS·JS로 화면을 만듭니다.",
          "localhost는 내 컴퓨터, 포트는 요청을 받는 프로그램의 구분입니다.",
          "다음에는 FastAPI와 템플릿이 데이터를 넣은 HTML을 응답합니다."
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
      "실제 터미널 주소로 카드에 접속하고 Ctrl+C로 서버를 종료한다.",
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
        "title": "package.json의 dev 명령 살펴보기",
        "description": "이 예제의 dev는 Vite 서버를 실행하며 프로젝트마다 다릅니다.",
        "scene": "code",
        "code": "\"scripts\": { \"dev\": \"vite --host 127.0.0.1 --port 5173\" }\n\"devDependencies\": { \"vite\": \"6.4.1\" }",
        "language": "json",
        "output": "npm run dev는 해당 프로젝트에 적힌 dev를 실행합니다.",
        "focus": "web",
        "fileName": "04-vite-dev/package.json",
        "files": [
          "package.json"
        ]
      },
      {
        "id": "web-ssr-handler",
        "title": "브라우저와 개발 서버의 요청·응답",
        "description": "내 브라우저와 내 PC의 Vite 개발 서버를 구분하고 다음 FastAPI 서버로 연결합니다.",
        "scene": "architecture",
        "code": "브라우저 → 파일 요청 → Vite 개발 서버\n브라우저 ← HTML·CSS·JS ← Vite 개발 서버\n다음: FastAPI → 템플릿 HTML 응답",
        "language": "text",
        "output": "Vite의 화면 파일 제공과 FastAPI의 데이터 처리는 서로 다른 역할입니다.",
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
    "closing": "앞서 만든 카드는 프론트엔드의 한 예입니다. npm 명령과 개발 서버를 이해한 뒤, 다음 주제에서는 HTML JSON에서 Python 딕셔너리·SQLite 데이터와 템플릿까지 이어갑니다.",
    "presentation": {
      "caseSummary": "터미널 첫 사례의 AI 답변에서 npm install과 npm run dev를 다시 봅니다. 프로젝트 설정과 개발 서버를 이해한 뒤 준비된 카드에서 실행합니다.",
      "demo": {
        "program": "VS Code · PowerShell · 브라우저",
        "file": "별도 복사한 04-vite-dev/package.json · index.html",
        "command": "예제 폴더 확인 → node --version → npm --version\npackage.json의 scripts.dev 확인\nnpm install → npm run dev\n터미널 주소를 브라우저에서 열고 카드 제목 변경·저장\nCtrl+C로 서버 종료",
        "expectedResult": "Vite 개발 서버가 알려 준 로컬 주소에서 카드가 보이고, 저장한 제목의 변경을 확인합니다. 개발 서버와 FastAPI는 별도 역할입니다.",
        "durationMinutes": 5
      },
      "returnSummary": "프론트엔드와 개발 서버의 역할을 구분했습니다. 다음에는 HTML JSON과 FastAPI의 데이터·SQLite·템플릿을 연결합니다."
    }
  },
  "templates": {
    "id": "templates",
    "number": 9,
    "title": "데이터와 백엔드: HTML·Python·SQLite·템플릿",
    "shortTitle": "데이터·백엔드",
    "subtitle": "같은 카드의 데이터를 HTML, Python, DB로 옮기고 템플릿으로 출력합니다",
    "icon": "sparkles",
    "durationMinutes": 55,
    "case": {
      "kind": "example",
      "title": "카드 데이터는 HTML에만 있어야 할까요?",
      "body": "### 같은 카드, 달라지는 데이터 위치\n\n카드의 제목과 설명을 HTML에 직접 넣을 수도 있지만, 화면과 데이터가 늘어나면 관리 방법이 달라집니다. 같은 카드를 이용해 **HTML 안 JSON → 서버의 Python 리스트·딕셔너리 → SQLite DB → Jinja2 템플릿** 순서로 비교합니다. 이 사례는 수업용 예시입니다.",
      "question": "같은 카드 데이터가 어디에 저장되고 누가 HTML을 채울까요?"
    },
    "objectives": [
      "HTML 내부 JSON과 브라우저의 JSON.parse를 읽는다.",
      "FastAPI가 Python 또는 SQLite 데이터를 JSON으로 응답하고 브라우저가 fetch하는 흐름을 확인한다.",
      "같은 SQLite 데이터를 Jinja2 템플릿에 전달해 서버에서 HTML을 만드는 흐름을 설명한다."
    ],
    "sections": [
      {
        "id": "backend-html-json",
        "title": "HTML 안의 JSON으로 카드 데이터 표현하기",
        "minutes": 10,
        "optional": false,
        "body": "### HTML 안에 있는 데이터부터 봅니다\n\n앞에서 만든 강의 카드의 제목과 설명은 HTML에 직접 적혀 있습니다. 이번에는 같은 문서 안의 JSON 데이터에 내용을 모아 두고 화면에 채웁니다. JSON은 데이터를 텍스트로 표현하는 형식입니다. 이 단계는 **내 컴퓨터의 정적 파일**만 사용합니다.\n\n[HTML 안 JSON 카드](./examples/course-card/server-data/static/01-local-json.html)를 열어 기존 카드와 비교합니다. 예제의 핵심은 다음과 같습니다.\n\n```html\n<script type=\"application/json\" id=\"lesson-data\">\n[{\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}]\n</script>\n```\n\n`application/json`은 이 부분을 실행 코드가 아닌 JSON 데이터로 담는다는 표시입니다. 준비된 카드의 Alpine 상태에서 `JSON.parse(document.getElementById('lesson-data').textContent)`로 읽어 카드 목록에 넣습니다. `x-for`로 목록을 반복하고 `x-text`로 내용을 표시합니다. Tailwind는 모양, Alpine은 카드 표시·버튼 동작을 돕습니다.\n\n**직접 확인:** [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)를 clone하거나 **Code → Download ZIP**으로 받습니다. `public/examples/course-card/server-data` 폴더를 통째로 별도의 연습 위치에 복사하고 VS Code에서 `static/01-local-json.html`의 Git 제목을 고쳐 저장합니다. 같은 폴더의 CSS·Alpine 파일을 유지한 채 HTML을 브라우저에서 열고 새로고침하면 제목이 바뀝니다. 이 단계는 Python·Node 서버 없이도 볼 수 있습니다.\n\n다음에는 데이터가 HTML 안이 아니라 **서버의 Python**에 있을 때 브라우저가 가져오는 흐름을 확인합니다.",
        "presentationPoints": [
          "HTML 안 JSON을 JSON.parse로 읽고 같은 카드에 표시합니다.",
          "정적 파일을 수정·저장하고 브라우저에서 확인합니다."
        ]
      },
      {
        "id": "backend-python",
        "title": "FastAPI의 Python 데이터 가져오기",
        "minutes": 15,
        "optional": false,
        "body": "### Python에 데이터를 두고 FastAPI를 켭니다\n\n앞에서는 HTML 안에 데이터를 넣었습니다. 이번에는 별도 Python 파일의 리스트와 딕셔너리에 보관합니다. `sample_data.py`의 예시입니다.\n\n```python\nLESSONS = [\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"},\n]\n```\n\n이는 Python 자료구조입니다. FastAPI는 `/api/dict` 요청을 받으면 이 Python 목록을 **JSON 응답**으로 변환해 보냅니다. 정적 HTML의 `fetch('/api/dict')`는 그 응답을 가져오고 Alpine의 `x-for`가 같은 카드 구조에 내용을 표시합니다. 이 단계에서는 서버 템플릿을 사용하지 않습니다.\n\n### Windows에서 서버 실행하기\n\n[서버 준비 안내](./examples/course-card/server-data/README.md)를 보고 `server-data` 폴더 전체를 **별도 연습 위치**에 복사해 VS Code로 엽니다. Python 3.10 이상과 패키지 설치를 위한 인터넷이 필요합니다. 없으면 [Python Windows 설치 안내](https://docs.python.org/3/using/windows.html)를 확인합니다.\n\n통합 PowerShell에서 현재 위치와 준비 상태를 확인합니다. `pwd`는 Windows PowerShell의 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다. cmd에서는 위치에 인수 없는 `cd`, 목록에 `dir`을, macOS/Linux 셸에서는 `pwd`, `ls`를 사용합니다.\n\n```powershell\npwd\nls\npy -3 --version\nTest-Path .\\.venv\n```\n\n`main.py`, `sample_data.py`, `requirements.txt`, `static`, `templates`가 보이고 `.venv`가 `False`일 때만 아래를 실행합니다. `Test-Path`에는 PowerShell 기본 별칭이 없습니다. cmd의 `if exist .venv echo 존재함`, macOS/Linux의 `test -e .venv`는 별도 문법이며 출력도 다릅니다. `.venv`가 있다면 덮어쓰지 말고 다른 새 연습 폴더를 사용합니다.\n\n```powershell\npy -3 -m venv .venv\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n.\\.venv\\Scripts\\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000\n```\n\n`main:app`은 `main.py`의 FastAPI `app`을 뜻하고, `127.0.0.1`은 내 컴퓨터입니다. [Python 데이터 카드](http://127.0.0.1:8000/static/02-dict-api.html)와 [JSON 응답](http://127.0.0.1:8000/api/dict)을 각각 열어 비교합니다. Python 제목을 고치면 서버를 중지하고 다시 시작한 뒤 새로고침합니다. 종료는 서버 터미널에서 `Ctrl+C`입니다. [FastAPI 서버 실행 안내](https://fastapi.tiangolo.com/deployment/manually/)\n\nGitHub Pages는 정적 파일을 제공할 뿐 Python 서버를 실행하지 않습니다. `npm run dev`는 이 Python 서버를 켜는 명령이 아닙니다.",
        "presentationPoints": [
          "Python 리스트·딕셔너리를 FastAPI가 JSON으로 응답합니다.",
          "브라우저가 fetch로 데이터를 받아 같은 카드를 표시합니다.",
          "내 컴퓨터에서 서버를 켜고 Ctrl+C로 종료합니다."
        ]
      },
      {
        "id": "backend-sqlite",
        "title": "SQLite 데이터베이스의 카드 가져오기",
        "minutes": 15,
        "optional": false,
        "body": "### Python 목록 대신 SQLite에 데이터를 보관합니다\n\nSQLite는 표와 행을 한 파일에 저장하는 데이터베이스입니다. Python에 포함된 `sqlite3`를 사용하므로 이번 연습에 별도 DB 서버는 필요하지 않습니다. 예제의 `courses.sqlite3`는 **복사한 별도 연습 폴더**에만 생성합니다.\n\n서버를 켠 상태에서 두 번째 PowerShell 터미널을 열고 같은 `server-data` 폴더인지 확인한 뒤 실행합니다.\n\n```powershell\npwd\n.\\.venv\\Scripts\\python.exe seed.py\n```\n\n`pwd`는 PowerShell의 `Get-Location` 기본 별칭입니다. cmd에서는 인수 없는 `cd`, macOS/Linux 셸에서는 `pwd`로 위치를 확인합니다. `seed.py`는 Python 목록의 데이터를 `lessons` 표가 **비어 있을 때만** 넣습니다. 기존 행이 있다면 삭제하거나 덮어쓰지 않고 유지합니다.\n\n브라우저에서 [SQLite 데이터 카드](http://127.0.0.1:8000/static/03-sqlite-api.html)를 열고, [SQLite JSON 응답](http://127.0.0.1:8000/api/sqlite)도 확인합니다. FastAPI는 DB 행을 읽어 JSON으로 응답하고, HTML은 `fetch('/api/sqlite')`로 받아 같은 카드에 표시합니다. DB가 아직 없으면 먼저 `seed.py`를 실행하라는 안내가 나타납니다.\n\n두 번째 터미널에서 다음 스크립트를 실행하고 SQLite 카드 화면을 새로고침합니다.\n\n```powershell\n.\\.venv\\Scripts\\python.exe add_card.py\n```\n\n`마크다운` 카드가 추가됩니다. 같은 카드가 이미 있으면 중복하지 않고 기존 데이터를 유지합니다. Python 목록(`/api/dict`)은 별개이므로 DB에 추가한 카드가 자동으로 들어가지는 않습니다. SQL의 `?`는 값을 전달하는 자리입니다. [Python sqlite3 공식 문서](https://docs.python.org/3/library/sqlite3.html)\n\n지금까지는 브라우저가 JSON 응답을 받아 화면을 채웠습니다. 다음에는 서버가 같은 DB 데이터와 템플릿을 합쳐 HTML을 먼저 만들어 보냅니다.",
        "presentationPoints": [
          "seed.py로 새 연습 DB를 준비하고 기존 데이터는 보존합니다.",
          "DB 행을 JSON으로 받아 카드에 표시하고 새 카드를 추가합니다."
        ]
      },
      {
        "id": "web-jinja",
        "title": "Jinja2 템플릿에 DB 데이터 넣기",
        "minutes": 15,
        "optional": false,
        "body": "### 같은 SQLite 데이터를 템플릿에 전달합니다\n\n이전 단계의 `/api/sqlite`는 **JSON 데이터**를 응답했고, 브라우저가 HTML에 내용을 넣었습니다. 이번에는 [템플릿 카드](http://127.0.0.1:8000/sqlite)를 엽니다. FastAPI가 같은 DB 행을 읽어 `templates/cards.html`에 전달하고 Jinja2가 공통 구조와 데이터를 합쳐 **HTML 응답**을 만듭니다. 화면에는 앞에서 DB에 추가한 마크다운 카드도 나타납니다.\n\n`templates/cards.html`의 핵심 부분입니다.\n\n```html\n{% for lesson in lessons %}\n  <h2>{{ lesson.title }}</h2>\n  <p>{{ lesson.minutes }}분</p>\n  <p>{{ lesson.description }}</p>\n{% endfor %}\n```\n\n`{% for ... %}`는 목록의 카드 구조를 반복하고, `{{ ... }}`는 데이터 값을 넣습니다. 서버는 완성된 HTML을 응답하고 브라우저는 그 HTML을 표시합니다. 그 뒤 Alpine이 버튼의 펼치기 동작을 담당합니다. Tailwind는 모양을 담당합니다. [FastAPI Jinja2 공식 안내](https://fastapi.tiangolo.com/advanced/templates/)\n\n**비교:** `/api/sqlite`는 DB의 JSON 응답, `/sqlite`는 같은 데이터를 담은 HTML 응답입니다. 데이터는 같은 DB에 있으며 화면을 조립하는 위치가 다릅니다. Jinja2는 서버 템플릿 도구이며 데이터베이스나 서버 자체는 아닙니다. Django의 템플릿 언어도 같은 목적을 갖지만 문법과 설정은 다릅니다.\n\n이 예제는 학습용 로컬 서버입니다. GitHub Pages는 정적 HTML을 제공하며 FastAPI와 SQLite 실행을 대신하지 않습니다.",
        "presentationPoints": [
          "같은 DB 데이터를 템플릿과 합쳐 HTML로 응답합니다.",
          "JSON 응답과 서버가 만든 HTML 응답의 차이를 확인합니다."
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
          "static/01-local-json.html",
          "static/alpine.js"
        ]
      },
      {
        "id": "backend-start",
        "title": "FastAPI 서버와 Python 데이터 확인",
        "description": "서버를 켜고 Python 목록의 JSON 응답과 카드 화면을 확인합니다.",
        "scene": "terminal",
        "code": "pwd\nls\npy -3 --version\nTest-Path .\\.venv\n# False일 때만 생성\npy -3 -m venv .venv\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n.\\.venv\\Scripts\\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000",
        "language": "powershell",
        "output": "/api/dict는 JSON, /static/02-dict-api.html은 JSON을 받아 표시한 카드입니다.",
        "focus": "backend",
        "fileName": "server-data · PowerShell",
        "files": [
          "main.py",
          "sample_data.py",
          "static/02-dict-api.html"
        ]
      },
      {
        "id": "backend-db-init",
        "title": "SQLite 연습 DB 준비와 데이터 추가",
        "description": "두 번째 터미널에서 DB를 준비하고 새 카드를 추가합니다. 기존 데이터는 유지합니다.",
        "scene": "terminal",
        "code": "pwd\n.\\.venv\\Scripts\\python.exe seed.py\n.\\.venv\\Scripts\\python.exe add_card.py",
        "language": "powershell",
        "output": "/api/sqlite의 JSON과 /static/03-sqlite-api.html 카드에서 마크다운 항목이 보입니다.",
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
        "title": "DB 데이터를 Jinja 템플릿으로 출력",
        "description": "서버가 DB 데이터를 같은 카드 구조에 넣어 HTML로 응답합니다.",
        "scene": "code",
        "code": "{% for lesson in lessons %}\n  <h2>{{ lesson.title }}</h2>\n  <p>{{ lesson.minutes }}분</p>\n  <p>{{ lesson.description }}</p>\n{% endfor %}",
        "language": "html",
        "output": "/sqlite는 DB 데이터를 반영한 HTML을 응답합니다. /api/sqlite의 JSON과 구분합니다.",
        "focus": "backend",
        "fileName": "templates/cards.html",
        "files": [
          "main.py",
          "templates/cards.html",
          "courses.sqlite3"
        ]
      }
    ],
    "checklist": [
      "HTML 안 JSON과 Python·SQLite의 데이터 위치를 구분한다.",
      "브라우저가 JSON을 fetch해 카드를 만드는 과정을 설명한다.",
      "서버 템플릿이 DB 데이터로 HTML을 만드는 과정을 설명한다."
    ],
    "pitfalls": [
      {
        "title": "정적 배포와 서버 실행 구분",
        "body": "GitHub Pages는 Python 서버나 SQLite 질의를 실행하지 않습니다. FastAPI 서버는 연습 컴퓨터에서 별도로 실행합니다."
      },
      {
        "title": "Python 목록과 DB는 별개입니다",
        "body": "seed.py는 빈 DB에만 데이터를 넣습니다. 이후 두 저장소의 변경은 자동 동기화되지 않습니다."
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
      }
    ],
    "closing": "HTML 내부 JSON에서 시작해 Python과 SQLite 데이터를 JSON으로 가져왔고, 마지막에는 같은 DB 데이터를 템플릿으로 HTML에 채웠습니다.",
    "presentation": {
      "caseSummary": "같은 카드의 데이터 위치를 HTML 안 JSON → 서버 Python → SQLite로 바꾸고, 마지막에 Jinja 템플릿으로 출력합니다.",
      "demo": {
        "program": "VS Code · PowerShell · 브라우저",
        "file": "static/01-local-json.html · sample_data.py · courses.sqlite3 · templates/cards.html",
        "command": "HTML 안 JSON 수정 → 정적 카드 확인\nFastAPI 실행 → /api/dict JSON과 카드 확인\nseed.py → /api/sqlite JSON과 카드 확인 → add_card.py\n/sqlite에서 Jinja HTML 응답 확인",
        "expectedResult": "같은 카드가 HTML JSON, Python 데이터, SQLite 데이터로 표시되고 마지막에는 서버 템플릿 HTML로 제공됩니다.",
        "durationMinutes": 8
      },
      "returnSummary": "데이터의 위치와 JSON·HTML 응답, 서버와 브라우저가 화면을 조립하는 시점을 구분했습니다."
    }
  }
};
