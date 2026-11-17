// Published defaults before the Windows Python setup lesson update.
export const previousPythonSetupDefault = {
  "web-tools": {
    "id": "web-tools",
    "number": 7,
    "title": "웹 화면을 간결하게: Tailwind CSS와 Alpine.js",
    "shortTitle": "Tailwind·Alpine",
    "subtitle": "같은 강의 카드의 CSS와 JavaScript를 도구로 다시 표현합니다",
    "icon": "code",
    "durationMinutes": 30,
    "case": {
      "kind": "example",
      "title": "같은 카드를 더 간결하게 바꿀 수 있을까요?",
      "body": "### 이미 만든 카드를 다시 봅니다\n\n앞에서 HTML·CSS·JavaScript로 Git 강의 카드를 만들었습니다. 같은 화면을 유지하면서 CSS의 카드 모양을 Tailwind 클래스로, JavaScript의 버튼 동작을 Alpine 속성으로 다시 표현합니다. 수업용 비교 예시이며 실제 Codex 응답을 재현한 것은 아닙니다.\n\n이때 **Tailwind CSS**는 화면의 모양을 만드는 데 쓰는 **유틸리티 중심 CSS 프레임워크**, **Alpine.js**는 버튼을 누르거나 내용을 펼치는 등의 작은 화면 동작을 돕는 **가벼운 JavaScript 프레임워크**라고 소개합니다. 프레임워크는 반복되는 작업에 쓸 기능과 작성 방식을 미리 제공하는 도구라고 생각하면 됩니다. 두 도구의 역할은 다르며, HTML·CSS·JavaScript를 대체하는 별도의 언어는 아닙니다.\n\n카드의 내용은 같지만 도구를 적용하는 방법과 필요한 준비가 달라집니다. 먼저 [두 카드 비교 화면](./examples/course-card/template-preview.html)을 열고 각각의 버튼을 눌러 봅니다.",
      "question": "같은 카드에서 모양과 클릭 동작을 각각 어디에 표현할 수 있을까요?"
    },
    "objectives": [
      "기존 CSS와 Tailwind 클래스가 같은 화면의 모양을 어떻게 표현하는지 비교한다.",
      "버튼 클릭을 직접 작성한 JavaScript와 Alpine의 상태·이벤트·표시로 비교한다.",
      "CDN 연습과 운영용 빌드 및 라이브러리 설정을 구분한다."
    ],
    "sections": [
      {
        "id": "frontend-css",
        "title": "같은 강의 카드에 Tailwind CSS 적용하기",
        "minutes": 15,
        "optional": false,
        "body": "### 같은 카드를 다른 방식으로 꾸밉니다\n\n앞에서 완성한 [직접 작성한 CSS·JavaScript 카드](./examples/course-card/03-javascript/index.html)는 그대로 둡니다. [Tailwind CSS 카드](./examples/course-card/04-tailwind/index.html)를 열면 내용과 버튼 동작은 같고, 모양을 적는 방법만 달라집니다. 두 버튼을 눌러 확인하세요.\n\n이 예제는 HTML에서 Tailwind CSS 3의 **Play CDN**을 바로 불러옵니다. 인터넷 연결이 필요하지만, 이 단계에서는 Node.js나 npm을 설치하지 않아도 됩니다. [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP**으로 전체 소스를 받거나 앞에서 배운 clone으로 가져옵니다. 압축을 풀고 `public/examples/course-card` 폴더를 별도 위치에 복사해 VS Code로 열면 기존 파일을 덮어쓰지 않습니다.\n\n### Tailwind CSS를 뭐라고 부를까요?\n\n**Tailwind CSS**는 여백·색·모서리처럼 자주 쓰는 스타일을 작은 **유틸리티 클래스**로 제공하는 CSS 프레임워크입니다. 프레임워크는 자주 필요한 기능과 작성 방식을 미리 준비해 주는 도구라고 생각해 보세요. 우리는 HTML의 `class`에 필요한 이름을 골라 조합하고, 브라우저는 연결된 Tailwind 도구가 만든 CSS 규칙을 적용합니다.\n\nHTML 태그 안에서 모양을 지정하므로 ‘HTML에서 바로 꾸민다’고 설명할 수 있지만, `style=\"padding: 24px\"`처럼 CSS 속성값을 태그에 직접 쓰는 **인라인 스타일**과는 다릅니다. 예를 들어 `class=\"p-6\"`은 준비된 CSS 규칙의 이름을 적는 것입니다. Tailwind도 결국 CSS를 사용하며, 스타일을 제공하는 Tailwind 도구를 연결해야 모양이 나타납니다.\n\n### 1. 직접 작성한 CSS 다시 보기\n\n```css\n.card {\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\n```\n\n`style.css`에서 `.card`라는 이름을 정해 HTML 카드와 연결했습니다. 같은 화면을 Tailwind의 작은 유틸리티 클래스로 표현할 수도 있습니다.\n\n### 2. CDN으로 Tailwind 연결하기\n\n**CDN**은 자주 사용하는 파일을 인터넷의 서버에서 전달해 주는 서비스입니다. HTML에서 CDN 주소를 지정하면 브라우저가 필요한 파일을 내려받아 사용합니다. 복사한 폴더의 `04-tailwind/index.html`에서 다음 부분을 확인합니다.\n\n```html\n<script src=\"https://cdn.tailwindcss.com/3.4.17\"></script>\n<script defer src=\"../03-javascript/script.js\"></script>\n```\n\n첫 줄은 수업용 Tailwind 3 Play CDN 도구를 불러오고, 이 도구가 HTML의 클래스에 맞는 CSS를 브라우저에서 만듭니다. `3.4.17`은 수업 예제에 지정한 버전입니다. 둘째 줄의 `script.js`는 이전 단계에서 직접 만든 JavaScript로, `..`은 현재 폴더의 부모 폴더를 가리킵니다. 이번 단계에서는 버튼 동작을 그대로 두고 모양만 바꿉니다. 인터넷 또는 CDN 접속이 막히면 모양이 적용되지 않을 수 있으므로 연결 상태와 주소를 확인합니다.\n\n### 3. 클래스가 하는 일 읽기\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\" class=\"cursor-pointer px-3 py-2\" aria-expanded=\"false\">설명 보기</button>\n  <p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n`p-6`은 안쪽 여백, `rounded-xl`은 둥근 모서리, `bg-white`는 흰 배경입니다. `max-w-80`은 최대 폭을 제한합니다. Tailwind 3의 기본 설정과 브라우저 기본 글자 크기 16px을 사용하면 `p-6`은 24px입니다. 사용 중인 테마나 루트 글자 크기를 바꾸면 결과도 달라질 수 있습니다.\n\n**직접 확인:** `p-6`을 `p-8`로 바꾸고 저장한 뒤 브라우저를 새로고침합니다. 같은 조건에서 안쪽 여백이 24px에서 32px로 커집니다. 비교 후 `p-6`으로 되돌립니다. 변경할 곳을 못 찾으면 카드의 `article`에 있는 `p-6`인지 확인합니다.\n\n### 4. 편한 점과 준비할 점\n\nHTML을 읽으면서 색·간격을 한곳에서 조합하기 쉽지만, 클래스 이름을 익혀야 하고 긴 클래스 목록은 읽기 어려울 수 있습니다. 이 수업의 Play CDN은 HTML을 보며 **빠르게 연습하는 개발용**입니다. 운영 사이트에서는 Play CDN 대신 프로젝트에 맞는 Tailwind 빌드 도구로 실제 사용하는 CSS를 생성해 배포합니다. 이때 버전과 HTML·템플릿 파일을 찾는 설정을 함께 확인합니다. 프로젝트에서 요구하는 3.x와 4.x의 설치 방법은 다를 수 있으므로 해당 버전의 공식 안내를 따릅니다. [Tailwind 3 Play CDN](https://v3.tailwindcss.com/docs/installation/play-cdn) · [Tailwind 설치 안내](https://tailwindcss.com/docs/installation)\n\n다음 절에서는 여기에 남아 있는 JavaScript 클릭 동작을 Alpine.js로 바꾸어 봅니다.",
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
        "body": "### 버튼 동작을 다시 살펴봅니다\n\n이전 `03-javascript/script.js`는 버튼을 찾고 클릭할 때 설명의 숨김 상태와 `aria-expanded`를 바꿨습니다. Alpine.js는 **브라우저에서 실행되는 JavaScript 도구**로, HTML 속성에 상태·이벤트·표시 조건을 적어 작은 상호작용을 연결하도록 도와줍니다. JavaScript를 몰라도 모든 기능이 자동으로 생기거나 JavaScript 자체가 없어지는 것은 아닙니다.\n\n### Alpine.js를 뭐라고 부를까요?\n\n**Alpine.js**는 HTML에 상태와 동작을 선언해 작은 상호작용을 만드는 **가벼운 JavaScript 프레임워크**입니다. 예를 들어 설명이 열렸는지 `x-data`에 적고, 버튼을 눌렀을 때 `@click`으로 상태를 바꾸고, `x-show`로 보여 줄지 정합니다. 이렇게 HTML 가까이에 작성해 동작을 한눈에 살펴볼 수 있습니다.\n\n이 이름들은 HTML만으로 저절로 실행되는 기능이 아니라 **Alpine이 읽는 속성(지시어)**입니다. 연결한 Alpine JavaScript가 상태와 클릭을 처리합니다. 따라서 Alpine 파일을 연결해야 하고, 속성 안에서 사용하는 값과 표현식은 여전히 JavaScript입니다. 이것은 CSS의 인라인 스타일이 아니라 **화면 동작을 HTML 속성으로 선언하는 방식**입니다.\n\nTailwind는 `class`로 **모양**을, Alpine은 지시어로 **동작**을 돕습니다. 둘은 함께 쓸 수 있지만 서로 필수는 아닙니다. 화면과 기능이 커지면 속성이 길어져 읽기 어려울 수 있어 직접 작성한 JavaScript 또는 다른 도구가 더 적합할 수도 있습니다.\n\n### 1. 이전 JavaScript를 확인합니다\n\n```javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n```\n\n직접 쓴 코드는 각 단계를 분명히 볼 수 있습니다. Alpine을 사용한 파일은 같은 목적을 다른 형식으로 표현합니다.\n\n### 2. Alpine이 준비된 같은 카드 열기\n\n[Alpine 카드](./examples/course-card/05-alpine/index.html)를 열거나 복사한 `05-alpine/index.html`을 VS Code에서 확인합니다. 이 파일은 이전 `script.js` 대신 **Alpine을 CDN에서 불러옵니다.** Tailwind는 모양을 계속 담당합니다. 두 주소는 각각의 역할을 가진 외부 파일을 불러오므로 인터넷 연결이 필요합니다.\n\n```html\n<script src=\"https://cdn.tailwindcss.com/3.4.17\"></script>\n<script defer src=\"https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js\"></script>\n<style>[x-cloak] { display: none !important; }</style>\n```\n\n`3.14.9`는 이 예제의 Alpine 버전이며, `defer`는 HTML을 읽은 뒤 스크립트를 실행하게 합니다. 마지막 줄은 Alpine이 준비되기 전 접힌 설명이 잠깐 드러나지 않도록 도와줍니다. 실제 프로젝트에서는 필요에 따라 고정된 CDN 버전을 사용하거나 npm 등으로 Alpine을 설치해 프로젝트에 포함할 수 있습니다. [Alpine 설치 안내](https://alpinejs.dev/essentials/installation)\n\n### 3. 상태·클릭·표시를 한 줄씩 읽기\n\n```html\n<article class=\"max-w-80 rounded-xl bg-white p-6\" x-data=\"{ open: false }\">\n  <h1>Git</h1>\n  <button type=\"button\" class=\"cursor-pointer px-3 py-2\"\n    @click=\"open = !open\" :aria-expanded=\"open.toString()\" aria-controls=\"detail\">설명 보기</button>\n  <p id=\"detail\" x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n- `x-data`: 이 카드의 `open` 상태를 만들고 처음에는 `false`로 둡니다.\n- `@click`: 버튼을 누를 때 `open`을 반대로 바꿉니다.\n- `x-show`: `open`이 참이면 설명을 보여 주고 거짓이면 숨깁니다.\n- `:aria-expanded`: 펼침 여부를 보조 기술에도 전달합니다. `x-cloak`은 초기 로딩 중 내용이 잠깐 보이는 것을 막으며, 위에서 추가한 `[x-cloak]` CSS 규칙이 필요합니다.\n\n### 4. 직접 눌러 확인하기\n\n1. 처음에는 설명이 접혀 있는지 확인합니다.\n2. 버튼을 누르면 설명이 보이고 다시 누르면 접힙니다. 버튼에 초점을 둔 뒤 Enter와 Space로도 확인합니다.\n3. 브라우저를 새로고침하면 `open: false`에서 다시 시작합니다. 화면 상태를 DB에 저장한 것은 아닙니다.\n4. 복사한 파일에서 `open: false`를 `open: true`로 바꾸고 저장·새로고침하면 처음부터 설명이 보입니다. 확인 후 `false`로 되돌립니다.\n\n버튼이 동작하지 않으면 인터넷과 Alpine CDN 주소를 확인하고, 이전 `script.js`와 Alpine을 동시에 연결하지 않았는지 살펴봅니다. Alpine을 적용할 수 있는지는 프로젝트에 따라 다르며, 복잡한 기능에서는 직접 작성한 JavaScript나 다른 도구가 더 나을 수도 있습니다. [Alpine 공식 시작 안내](https://alpinejs.dev/start-here)\n\n다음 주제에서는 브라우저에서 동작하는 이런 화면과 `npm run dev` 같은 개발 서버의 역할을 구분합니다.",
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
        "body": "### Tailwind 3 빌드에서 찾아야 할 문자열\n\nTailwind 3는 설정된 content 경로의 파일을 읽고 발견한 클래스에 해당하는 CSS를 만듭니다. `bg-${color}-500`처럼 런타임에 문자열을 이어 붙여 최종 클래스가 소스에 통째로 나타나지 않으면 기대한 CSS가 생성되지 않을 수 있습니다. 상태별로 `bg-teal-500`, `bg-slate-500`처럼 완전한 클래스 문자열을 적은 매핑을 사용하면 의도를 분명히 할 수 있습니다. 프로젝트가 3.x인지 4.x인지 먼저 확인하고 설치 안내를 섞지 않습니다.\n\n서버 템플릿 예제라면 Tailwind 3의 content 경로가 `./templates/**/*.html` 같은 실제 템플릿 파일을 포함하는지도 확인합니다. 이번 연습은 Play CDN을 사용하지만, 운영용으로 빌드할 때는 CSS 생성 설정과 실제 응답에 담긴 class를 따로 대조합니다. 무조건 모든 클래스를 safelist에 넣으면 원인을 가릴 수 있습니다.\n\nAlpine의 일반 상태는 새로고침하면 초기값으로 돌아옵니다. 학습 완료나 최근 위치를 유지하려면 저장 로직 또는 저장용 플러그인처럼 별도의 수단이 필요합니다. 상태가 사라졌다는 현상을 클릭 연결 오류와 혼동하지 않습니다. 이번의 카드 펼치기는 서버 저장 기능이 아닙니다.\n\n**보충 과제:** 카드의 완료 상태에 따라 두 가지 완전한 클래스 문자열을 고르고, 새로고침 전후 무엇이 유지되어야 하는지 글로 정합니다. [Tailwind 3 content 설정](https://v3.tailwindcss.com/docs/content-configuration)을 읽고 준비된 설정과 비교합니다."
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
        "fileName": "02-css/style.css",
        "files": [
          "02-css/index.html",
          "02-css/style.css"
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
    "glossary": [
      {
        "term": "Tailwind CSS",
        "definition": "여백·색 같은 작은 스타일을 유틸리티 클래스로 조합하는 CSS 프레임워크입니다."
      },
      {
        "term": "Alpine.js",
        "definition": "HTML 속성에 적은 상태·이벤트·표시 조건을 JavaScript로 연결하는 가벼운 프레임워크입니다."
      },
      {
        "term": "CDN",
        "definition": "파일을 인터넷 서버에서 전달해 주는 서비스로, 이 실습에서는 Tailwind와 Alpine을 불러옵니다."
      }
    ],
    "checklist": [
      "Tailwind와 Alpine의 CDN 주소 및 인터넷 연결을 확인할 수 있다.",
      "같은 카드의 기존 CSS와 Tailwind 클래스가 담당하는 모양을 비교할 수 있다.",
      "버튼의 클릭과 표시 상태를 직접 작성한 JavaScript와 Alpine으로 비교할 수 있다."
    ],
    "closing": "같은 카드의 모양과 동작을 Tailwind와 Alpine으로 표현했습니다. 다음에는 화면이 브라우저에서 실행되는 방식과 개발 서버의 역할을 알아봅니다.",
    "references": [
      {
        "title": "Tailwind Play CDN 안내",
        "url": "https://v3.tailwindcss.com/docs/installation/play-cdn"
      },
      {
        "title": "Alpine 시작 안내",
        "url": "https://alpinejs.dev/start-here"
      },
      {
        "title": "Tailwind 유틸리티 클래스 안내",
        "url": "https://tailwindcss.com/docs/styling-with-utility-classes"
      }
    ],
    "presentation": {
      "caseSummary": "기존 CSS·JavaScript 카드와 같은 화면을 Tailwind·Alpine으로 비교합니다. 내용은 그대로 두고 모양과 동작을 작성하는 방법을 바꿉니다.",
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "04-tailwind/index.html · 05-alpine/index.html · CDN",
        "command": "기존 카드와 04-tailwind 비교 → p-6을 p-8로 바꾸고 복구\n05-alpine에서 상태·클릭·표시 읽기 → 버튼·키보드·새로고침 확인",
        "expectedResult": "같은 Git 카드의 모양을 Tailwind 클래스로, 버튼 동작을 Alpine 상태와 속성으로 설명할 수 있습니다.",
        "durationMinutes": 5
      },
      "returnSummary": "HTML에 Tailwind 클래스와 Alpine 상태를 연결했습니다. 다음에는 화면이 실행되는 프론트엔드와 개발 서버를 살펴봅니다."
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
        "body": "### HTML 안에 있는 데이터부터 봅니다\n\n앞에서 만든 강의 카드의 제목과 설명은 HTML에 직접 적혀 있습니다. 이번에는 같은 문서 안의 JSON 데이터에 내용을 모아 두고 화면에 채웁니다. JSON은 데이터를 텍스트로 표현하는 형식입니다. 이 단계는 **내 컴퓨터의 정적 파일**만 사용합니다.\n\n[HTML 안 JSON 카드](./examples/course-card/server-data/static/01-local-json.html)를 열어 기존 카드와 비교합니다. 예제의 핵심은 다음과 같습니다.\n\n```html\n<script type=\"application/json\" id=\"lesson-data\">\n[{\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}]\n</script>\n```\n\n`application/json`은 이 부분을 실행 코드가 아닌 JSON 데이터로 담는다는 표시입니다. 준비된 카드의 Alpine 상태에서 `JSON.parse(document.getElementById('lesson-data').textContent)`로 읽어 카드 목록에 넣습니다. `x-for`로 목록을 반복하고 `x-text`로 내용을 표시합니다. Tailwind는 모양, Alpine은 카드 표시·버튼 동작을 돕습니다.\n\n**직접 확인:** [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)를 clone하거나 **Code → Download ZIP**으로 받습니다. `public/examples/course-card/server-data` 폴더를 통째로 별도의 연습 위치에 복사하고 VS Code에서 `static/01-local-json.html`의 Git 제목을 고쳐 저장합니다. VS Code에서 **Open with Live Server**로 열면 저장 후 제목 변화를 확인할 수 있습니다. 이 정적 단계는 Python·Node 서버가 필요 없으며 파일을 직접 열고 새로고침해도 됩니다. Tailwind와 Alpine은 CDN 주소로 불러오므로 인터넷 연결이 필요합니다.\n\n다음에는 데이터가 HTML 안이 아니라 **서버의 Python**에 있을 때 브라우저가 가져오는 흐름을 확인합니다.",
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
        "body": "### Python에 데이터를 두고 FastAPI를 켭니다\n\n앞에서는 HTML 안에 데이터를 넣었습니다. 이번에는 별도 Python 파일의 리스트와 딕셔너리에 보관합니다. `sample_data.py`의 예시입니다.\n\n```python\nLESSONS = [\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"},\n]\n```\n\n이는 Python 자료구조입니다. FastAPI는 `/api/dict` 요청을 받으면 이 Python 목록을 **JSON 응답**으로 변환해 보냅니다. 정적 HTML의 `fetch('/api/dict')`는 그 응답을 가져오고 Alpine의 `x-for`가 같은 카드 구조에 내용을 표시합니다. 이 단계에서는 서버 템플릿을 사용하지 않습니다.\n\n### Live Server에서 FastAPI로 전환하기\n\n여기부터는 FastAPI가 정적 화면 파일과 `/api/dict`를 모두 제공합니다. 앞에서 사용하던 Live Server는 **이 예제에 따로 필요하지 않습니다.** 주소를 헷갈리지 않게 VS Code 명령 팔레트에서 **Live Server: Stop Live Server**로 닫아도 됩니다. 다른 포트에서 실행 중이라면 반드시 종료해야 하는 것은 아닙니다.\n\n브라우저에서 반드시 아래 FastAPI 주소의 `/static/02-dict-api.html`을 엽니다. `fetch('/api/dict')`는 현재 페이지가 열린 출처로 요청하기 때문에, Live Server의 예시 `:5500`에서 열면 `:5500/api/dict`를 찾고 FastAPI의 `:8000`에 자동으로 가지 않습니다. 포트는 각각 실행 화면에서 확인합니다.\n\n### Windows에서 서버 실행하기\n\n[서버 준비 안내](./examples/course-card/server-data/README.md)를 보고 `server-data` 폴더 전체를 **별도 연습 위치**에 복사해 VS Code로 엽니다. Python 3.10 이상과 패키지 설치를 위한 인터넷이 필요합니다. 없으면 [Python Windows 설치 안내](https://docs.python.org/3/using/windows.html)를 확인합니다.\n\n통합 PowerShell에서 현재 위치와 준비 상태를 확인합니다. `pwd`는 Windows PowerShell의 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다. cmd에서는 위치에 인수 없는 `cd`, 목록에 `dir`을, macOS/Linux 셸에서는 `pwd`, `ls`를 사용합니다.\n\n```powershell\npwd\nls\npy -3 --version\nTest-Path .\\.venv\n```\n\n`main.py`, `sample_data.py`, `requirements.txt`, `static`, `templates`가 보이고 `.venv`가 `False`일 때만 아래를 실행합니다. `Test-Path`에는 PowerShell 기본 별칭이 없습니다. cmd의 `if exist .venv echo 존재함`, macOS/Linux의 `test -e .venv`는 별도 문법이며 출력도 다릅니다. `.venv`가 있다면 덮어쓰지 말고 다른 새 연습 폴더를 사용합니다.\n\n```powershell\npy -3 -m venv .venv\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n.\\.venv\\Scripts\\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000\n```\n\n`main:app`은 `main.py`의 FastAPI `app`을 뜻하고, `127.0.0.1`은 내 컴퓨터입니다. [Python 데이터 카드](http://127.0.0.1:8000/static/02-dict-api.html)와 [JSON 응답](http://127.0.0.1:8000/api/dict)을 각각 열어 비교합니다. Python 코드를 고치면 이 기본 명령에는 자동 재시작 옵션이 없으므로 서버를 중지하고 다시 시작한 뒤 새로고침합니다. 정적 HTML·CSS·JS를 고쳤다면 저장한 뒤 FastAPI 주소에서 새로고침해 확인합니다. 종료는 서버 터미널에서 `Ctrl+C`입니다. [FastAPI 서버 실행 안내](https://fastapi.tiangolo.com/deployment/manually/)\n\nGitHub Pages는 정적 파일을 제공할 뿐 Python 서버를 실행하지 않습니다. `npm run dev`는 이 Python 서버를 켜는 명령이 아닙니다.",
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
        "body": "### 같은 SQLite 데이터를 템플릿에 전달합니다\n\n이전 단계의 `/api/sqlite`는 **JSON 데이터**를 응답했고, 브라우저가 HTML에 내용을 넣었습니다. 이번에는 [템플릿 카드](http://127.0.0.1:8000/sqlite)를 엽니다. FastAPI가 같은 DB 행을 읽어 `templates/cards.html`에 전달하고 Jinja2가 공통 구조와 데이터를 합쳐 **HTML 응답**을 만듭니다. 화면에는 앞에서 DB에 추가한 마크다운 카드도 나타납니다.\n\n`templates/cards.html`의 핵심 부분입니다.\n\n```html\n{% for lesson in lessons %}\n  <h2>{{ lesson.title }}</h2>\n  <p>{{ lesson.minutes }}분</p>\n  <p>{{ lesson.description }}</p>\n{% endfor %}\n```\n\n`{% for ... %}`는 목록의 카드 구조를 반복하고, `{{ ... }}`는 데이터 값을 넣습니다. 서버는 완성된 HTML을 응답하고 브라우저는 그 HTML을 표시합니다. 그 뒤 Alpine이 버튼의 펼치기 동작을 담당합니다. Tailwind는 모양을 담당합니다. [FastAPI Jinja2 공식 안내](https://fastapi.tiangolo.com/advanced/templates/)\n\n**비교:** `/api/sqlite`는 DB의 JSON 응답, `/sqlite`는 같은 데이터를 담은 HTML 응답입니다. 데이터는 같은 DB에 있으며 화면을 조립하는 위치가 다릅니다. Jinja2는 서버 템플릿 도구이며 데이터베이스나 서버 자체는 아닙니다. Django의 템플릿 언어도 같은 목적을 갖지만 문법과 설정은 다릅니다.\n\n이 화면은 FastAPI가 Jinja 템플릿을 처리해 응답하므로 FastAPI의 `/sqlite` 주소로 엽니다. 템플릿 파일을 Live Server로 직접 열면 서버에서 데이터를 넣어 주지 않습니다. 이 예제의 Tailwind와 Alpine은 CDN에서 불러오므로 인터넷 연결이 필요합니다. 화면과 데이터는 FastAPI 주소에서 확인하므로 여기서는 Live Server가 따로 필요하지 않습니다.\n\n이 예제는 학습용 로컬 서버입니다. GitHub Pages는 정적 HTML을 제공하며 FastAPI와 SQLite 실행을 대신하지 않습니다.",
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
          "static/01-local-json.html"
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
        "command": "HTML 안 JSON 수정 → Live Server 정적 카드 확인\nFastAPI 실행 → FastAPI의 :8000/static 화면과 /api/dict JSON 확인\nseed.py → /api/sqlite JSON과 카드 확인 → add_card.py\n/sqlite에서 Jinja HTML 응답 확인",
        "expectedResult": "같은 카드가 HTML JSON, Python 데이터, SQLite 데이터로 표시되고 마지막에는 서버 템플릿 HTML로 제공됩니다.",
        "durationMinutes": 8
      },
      "returnSummary": "정적 카드에는 Live Server를 쓰고, FastAPI가 화면·API·템플릿을 제공하는 단계에서는 FastAPI 주소로 전환했습니다."
    }
  }
};
