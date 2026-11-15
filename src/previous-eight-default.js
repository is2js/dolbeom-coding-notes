// Snapshot of the last published eight-topic defaults for non-destructive draft migration.
export const previousEightDefault = {
  "web": {
    "id": "web",
    "number": 7,
    "title": "프론트엔드·백엔드: 서버 위치에서 HTML 응답까지",
    "shortTitle": "프론트엔드·백엔드",
    "subtitle": "로컬·원격 서버를 구분하고 브라우저와 서버가 나누는 일을 따라갑니다",
    "icon": "layers",
    "durationMinutes": 20,
    "case": {
      "kind": "example",
      "title": "제 PC에서 켠 백엔드는 진짜 서버가 아닌가요?",
      "body": "교체용 가상 사례 · 실제 사용자 대화가 아닙니다.\n\n가상의 개발자가 Codex가 제안한 dolbeom-notes의 FastAPI 예제를 읽다가 멈췄습니다. 자기 PC의 127.0.0.1:8000에서 강의 목록이 보이는데, ‘백엔드는 원격 컴퓨터에 있어야 하는 것 아닌가? 프론트엔드용 서버도 하나 더 필요한가?’라는 의문이 생겼습니다. 이어 ‘서버가 HTML을 렌더링한다’는 말을 보고 서버가 화면의 픽셀까지 그려 보내는 것으로 이해했습니다. 같은 Git 카드를 기준으로 위치와 역할을 나눠 봅니다.",
      "question": "서버의 위치, 요청을 처리하는 프로그램, 최종 화면을 그리는 브라우저는 어떻게 구분할까요?"
    },
    "objectives": [
      "서버라는 말의 기계·프로세스 의미와 로컬·원격의 위치 차이를 구분한다.",
      "앞선 웹 코딩에서 만든 HTML·CSS·JavaScript 카드가 프론트엔드의 기초이며 프론트엔드는 사용자 화면과 브라우저 상호작용을 아우르는 영역임을 설명한다.",
      "프론트엔드와 백엔드를 HTTP 요청·응답을 주고받는 책임으로 설명한다.",
      "React·Svelte와 FastAPI·Spring의 역할을 다이어그램에서 찾는다.",
      "두 개의 별도 서버나 데이터베이스가 모든 웹사이트의 필수 조건은 아님을 설명한다.",
      "서버의 HTML 생성과 브라우저의 화면 렌더링을 나누어 확인한다."
    ],
    "sections": [
      {
        "id": "web-map",
        "title": "백엔드는 어디서 실행될까: 로컬과 원격 서버",
        "minutes": 5,
        "optional": false,
        "body": "### 장소와 역할을 따로 읽습니다\n가상 프로젝트 `dolbeom-notes`가 `http://127.0.0.1:8000/lessons`에서 열린다고 해 봅시다. 내 PC에서 요청을 받아 강의 데이터를 준비하는 프로그램도 백엔드입니다. 원격 컴퓨터로 옮겨야 비로소 백엔드가 되는 것은 아닙니다. **로컬·원격은 실행 장소, 백엔드는 맡은 역할**을 설명합니다.\n\n‘서버를 샀다’에서는 서버가 컴퓨터를, ‘서버를 종료했다’에서는 실행 중인 프로그램을 뜻할 수 있습니다. 서버 프로그램이 실행된 한 단위를 프로세스라고 부릅니다. 한 컴퓨터에서 여러 프로세스가 동작할 수 있고, 웹 요청을 받는 서버 프로세스도 그중 하나입니다. FastAPI 앱은 서버 프로그램과 함께 실행되며 요청을 처리합니다. [FastAPI의 서버 프로세스 설명](https://fastapi.tiangolo.com/deployment/server-workers/)을 이 구분의 참고로 봅니다.\n\n`127.0.0.1`과 `localhost`는 주소를 여는 컴퓨터 자신을 가리킵니다. 뒤의 `8000`은 요청을 받을 포트입니다. 친구 PC에서 같은 주소를 열면 친구 PC 자신에게 연결하므로 내 화면을 공유한 것이 아닙니다. 원격 서비스는 접속 가능한 호스트 주소와 실행·네트워크 조건을 별도로 갖춰야 합니다. 주소만 바꾸면 배포가 끝나는 것은 아닙니다.\n\n```text\n개발: 내 PC의 브라우저 → 내 PC의 서버 프로세스\n서비스: 내 PC의 브라우저 → 접속 가능한 원격 서버\n```\n\n두 그림에서 바뀌는 것은 서버의 위치입니다. 요청을 받아 응답하는 역할은 이어집니다. 준비된 시연 화면에서 주소·포트·실행 중인 프로그램을 짚고 ‘현재 어느 컴퓨터의 어느 프로그램에 요청했는가’를 말해 봅니다. 준비된 재현은 예시이고, 실전 시연에서는 강사가 미리 준비한 프로젝트와 브라우저에서 같은 흐름을 확인합니다.",
        "presentationPoints": [
          "로컬·원격은 장소이고, 백엔드는 요청을 처리하는 역할입니다.",
          "서버는 컴퓨터나 실행 중인 프로그램을 가리킬 수 있습니다.",
          "localhost는 접속한 PC 자신이므로 주소 전달만으로 공유되지 않습니다."
        ]
      },
      {
        "id": "web-http",
        "title": "프론트엔드와 백엔드: 요청·응답으로 나누는 책임",
        "minutes": 9,
        "optional": false,
        "body": "### 앞에서 만든 카드가 프론트엔드입니다\nIDE에서 `index.html`에 Git 카드의 제목과 버튼을 넣고, `style.css`로 꾸미고, `script.js`로 설명 펼치기를 만들었습니다. HTML·CSS·JavaScript는 프론트엔드를 만드는 기본 기술입니다. 프론트엔드는 이 기술과 완전히 별개인 무언가가 아니라 사용자가 보고 조작하는 화면과 브라우저 쪽 동작을 아우르는 더 넓은 영역입니다. 버튼을 누르면 설명이 나타나는 동작도 프론트엔드입니다.\n\n프론트엔드라는 말을 쓴다고 React나 Svelte가 필수인 것은 아닙니다. 앞에서처럼 기본 기술만으로 화면을 만들 수도 있고, React·Svelte 같은 도구를 이용해 더 큰 화면을 구성할 수도 있습니다. 다음 그림에서 앞선 카드의 화면과 클릭 동작을 왼쪽에 놓고, 서버에서 처리하는 일을 오른쪽에 놓아 봅니다.\n\n### 그림의 화살표마다 입력과 결과를 붙입니다\n프론트엔드는 사용자가 보는 UI와 상호작용을 구성하는 영역이고, 백엔드는 서버에서 요청 처리·데이터 준비·업무 규칙 등을 맡는 영역입니다. 화면의 버튼을 누르는 일과 서버가 저장 요청을 검증하는 일은 서로 연결되지만 책임은 다릅니다.\n\n```text\n브라우저 / UI                         서버 쪽 처리\nHTML + JavaScript ── HTTP 요청 ──→ FastAPI(Python)\nReact 또는 Svelte ←─ HTML·JSON 응답 ─ Spring(Java)\n                                      ↓ 필요할 때\n                                  파일·외부 API·DB\n```\n\n가운데 선은 코드 파일을 직접 공유하는 선이 아니라 요청과 응답입니다. `GET /lessons`는 목록을 달라는 요청이고, 서버는 상태·헤더·본문으로 답합니다. 본문은 HTML일 수도 JSON일 수도 있습니다. `200`은 해당 요청의 성공 상태이며, 뒤이은 브라우저 동작까지 모두 성공했다는 뜻은 아닙니다.\n\nReact는 [UI 라이브러리](https://react.dev/)이고, Svelte는 컴파일러로 컴포넌트를 변환하는 [UI 프레임워크](https://svelte.dev/docs/svelte/overview)입니다. FastAPI와 Spring은 이 예에서 서버 쪽 요청 처리를 담당합니다. 이들을 같은 종류의 경쟁 도구로 외우지 않습니다. React·Svelte 생태계는 서버 렌더링도 지원할 수 있으므로 ‘React이면 무조건 브라우저에서만 실행’이라고 단정하지 않습니다.\n\n그림의 두 영역이 별도 서버 두 대를 요구하지는 않습니다. 하나의 서버 앱이 HTML·정적 파일·API를 함께 제공할 수 있고, 개발 편의에 따라 UI 개발 서버와 API 서버를 나누기도 합니다. 강의 목록 표시와 브라우저 검색만 필요하면 자체 업무 백엔드 없이 정적 호스팅만 쓸 수도 있습니다. 정적 호스팅도 파일을 전달하는 서버는 사용합니다. 데이터베이스 역시 선택이며, 이 예제의 두 카드는 메모리 목록으로 충분합니다.\n\n그림을 보며 ‘누가 요청하고, 누가 어떤 형식으로 응답하며, 다음 동작은 어디서 실행되는가’를 설명합니다. 기술 이름보다 이 세 답이 수정 위치를 좁혀 줍니다.\n\n**공통 실습 확인:** [완성된 정적 카드](./examples/course-card/03-javascript/index.html)의 버튼 동작은 브라우저에서 실행됩니다. 이후 준비된 서버 예제에서는 카드의 제목 데이터가 어디에서 HTML로 채워지는지도 비교합니다.",
        "presentationPoints": [
          "IDE에서 만든 HTML·CSS·JavaScript 카드와 클릭 동작이 프론트엔드입니다.",
          "프론트엔드는 사용자 화면·브라우저 동작을 아우르며 React·Svelte는 선택 도구입니다.",
          "필요할 때 서버와 HTTP 요청·응답으로 연결하며 별도 서버 두 대나 DB는 필수가 아닙니다."
        ],
        "illustrationId": "web-architecture"
      },
      {
        "id": "web-html",
        "title": "서버 템플릿의 HTML 응답을 브라우저가 화면으로",
        "minutes": 6,
        "optional": false,
        "body": "### ‘렌더링’이라는 말의 입력과 출력을 확인합니다\n이번에는 요청 시 서버에서 HTML을 만드는 방식을 봅니다. FastAPI가 `GET /lessons`를 받아 강의 목록을 준비하고, Jinja2가 템플릿의 빈자리에 값을 넣어 HTML 문자열을 만듭니다. 서버는 그 문자열을 HTML 응답으로 보내며, 브라우저가 문서를 해석하고 CSS를 적용해 배치와 픽셀을 그립니다. **서버가 HTML을 생성하는 일과 브라우저가 최종 화면을 그리는 일**을 나눕니다.\n\n```html\n<!-- 서버가 읽는 templates/cards.html 일부 -->\n{% for lesson in lessons %}\n  <li><h2>{{ lesson.title }}</h2></li>\n{% endfor %}\n```\n\n`lessons`에 Git 항목이 있으면 아래와 같은 축약 예에서 응답에는 `<li><h2>Git</h2></li>`가 들어갑니다. 실제 공통 카드 응답에는 article과 다른 속성도 포함됩니다. 브라우저가 Jinja 문법을 해석하는 것이 아닙니다. 서버가 처리한 결과를 받습니다. [FastAPI 템플릿 문서](https://fastapi.tiangolo.com/advanced/templates/)의 `TemplateResponse`는 요청 객체·템플릿 이름·context 데이터를 이 과정으로 연결합니다.\n\n준비된 Network 화면에서 문서 요청의 URL, `200`, `text/html`, Response를 차례로 봅니다. 응답 본문에 Git 제목이 들어 있으면 서버의 초기 HTML 생성까지 확인한 것입니다. Elements는 브라우저가 다루는 현재 DOM이므로 JavaScript 실행 후 Response와 달라질 수도 있습니다. 서버가 보낸 HTML에 없는 클릭 동작을 기대하려면 브라우저 코드가 추가로 필요합니다.\n\n모든 화면이 이 경로만 사용하는 것은 아닙니다. 미리 만든 정적 HTML을 전달하거나 JSON을 받아 브라우저에서 목록을 만들 수도 있습니다. 오늘의 서버 템플릿은 그중 한 구성입니다. 다음 강의에서는 같은 Git 카드에 스타일과 펼치기 동작을 더합니다. 서버 응답 이후에도 HTML·CSS·JavaScript가 각각 어떤 일을 맡는지 이어서 확인합니다.",
        "presentationPoints": [
          "FastAPI가 데이터를 준비하고 Jinja2가 HTML 문자열을 만들어 응답합니다.",
          "브라우저는 받은 HTML과 CSS를 해석해 최종 화면을 그립니다.",
          "Network의 HTML 응답과 JavaScript 실행 후의 현재 DOM을 구분합니다."
        ],
        "illustrationId": "server-rendering"
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
        "title": "로컬 백엔드는 진짜 백엔드가 아니라고 생각하기",
        "body": "로컬·원격은 실행 장소이고 백엔드는 역할입니다. 내 PC의 서버 프로세스도 요청을 받아 응답할 수 있습니다."
      },
      {
        "title": "프론트·백엔드라서 서버가 반드시 두 개라고 생각하기",
        "body": "하나의 앱이 HTML·정적 파일·API를 함께 제공할 수 있습니다. 개발 서버를 나누는 선택과 역할 구분은 별개입니다."
      },
      {
        "title": "백엔드에는 반드시 DB가 있다고 생각하기",
        "body": "서버는 메모리 목록·파일·계산 결과로도 응답합니다. 저장 범위와 기능이 필요할 때 저장소를 선택합니다."
      },
      {
        "title": "React는 CSR 전용, 서버 렌더링은 픽셀 전송이라고 이해하기",
        "body": "React의 구성은 서버 렌더링을 포함할 수 있습니다. 여기서 서버 렌더링 결과는 HTML이며 최종 화면은 브라우저가 그립니다."
      }
    ],
    "checklist": [
      "서버 기계와 서버 프로세스, 로컬과 원격을 구분해 설명한다.",
      "localhost 주소를 다른 사람에게 전달했을 때의 한계를 설명한다.",
      "React·Svelte와 FastAPI·Spring을 각 역할에 배치한다.",
      "별도 서버 두 대와 DB를 필수 조건으로 단정하지 않는다.",
      "HTML 응답 본문과 브라우저가 그린 화면을 각각 확인한다."
    ],
    "steps": [
      {
        "id": "web-01",
        "title": "가상 프로젝트의 실행 위치 지도",
        "description": "준비된 비교 화면입니다. 내 PC에서 실행되는 서버와 원격 서버의 역할은 같고 위치가 다름을 읽습니다.",
        "scene": "architecture",
        "code": "로컬: 내 PC [브라우저] → 127.0.0.1:8000 [서버 프로세스]\n원격: 내 PC [브라우저] → 접속 가능한 원격 호스트 [서버 프로세스]\n공통: GET /lessons → 강의 데이터를 준비 → HTML 응답",
        "language": "text",
        "output": "위치는 달라도 두 서버 모두 요청을 받아 응답합니다. 이 시연은 실제 서버를 실행하지 않습니다.",
        "focus": "backend",
        "fileName": "dolbeom-notes · 실행 위치 지도",
        "files": [
          "main.py",
          "templates/cards.html"
        ]
      },
      {
        "id": "web-server-process",
        "title": "기계와 프로세스를 나누기",
        "description": "하나의 Windows PC 안에서 브라우저와 서버 프로그램이 각각 실행된다는 준비용 관찰입니다.",
        "scene": "architecture",
        "code": "Windows PC\n├─ 브라우저 프로세스: 주소를 열고 화면 표시\n└─ 서버 프로세스: 포트 8000에서 요청 처리\n\n서버 프로그램 종료 ≠ PC 전원 종료",
        "language": "text",
        "output": "서버를 끈다는 말이 이 장면에서는 서버 프로세스 종료를 뜻합니다.",
        "focus": "backend",
        "fileName": "서버라는 말의 두 의미",
        "files": [
          "main.py"
        ]
      },
      {
        "id": "web-02",
        "title": "주소에서 요청 대상을 확인",
        "description": "브라우저가 내 PC의 서버에 문서 요청을 보낸다는 가상 Network 기록입니다.",
        "scene": "browser",
        "code": "GET /lessons HTTP/1.1\nHost: 127.0.0.1:8000\nAccept: text/html",
        "language": "http",
        "output": "대상: 내 PC의 포트 8000\n경로: /lessons\n친구 PC에서 127.0.0.1을 열면 친구 PC 자신에게 요청합니다.",
        "focus": "frontend",
        "fileName": "Network · 요청 헤더",
        "files": [
          "main.py",
          "templates/cards.html"
        ]
      },
      {
        "id": "web-05",
        "title": "기초 실습에서 프론트엔드와 백엔드로",
        "description": "IDE에서 직접 만든 Git 카드를 프론트엔드에 놓고, 서버가 필요한 경우 요청·응답이 어떻게 연결되는지 봅니다.",
        "scene": "architecture",
        "code": "IDE 실습: index.html + style.css + script.js\n          Git 카드 화면 + 클릭으로 설명 펼치기\n          ↓ 이것이 프론트엔드의 한 예\n[사용자 화면·브라우저 동작] ── 필요 시 HTTP 요청 ──→ [서버 처리: FastAPI / Spring]\n                            ←── HTML 또는 JSON 응답 ──\nReact·Svelte: 화면을 만드는 선택 도구 / DB: 필요할 때 사용",
        "language": "text",
        "output": "HTML·CSS·JavaScript는 프론트엔드를 만드는 기본 기술입니다. 프론트엔드라는 영역과 서로 다른 기술이 아닙니다. 카드 펼치기만으로 서버 요청이 생기지는 않습니다.",
        "focus": "frontend",
        "fileName": "IDE의 Git 카드 → 프론트엔드·백엔드 역할 지도",
        "files": [
          "index.html",
          "style.css",
          "script.js",
          "main.py"
        ]
      },
      {
        "id": "web-09",
        "title": "React는 UI 라이브러리",
        "description": "비교용 컴포넌트 조각입니다. 실제 실행 환경을 설치하지 않으며 렌더링 방식은 앱 구성에 따라 달라집니다.",
        "scene": "code",
        "code": "export function CourseCard({ lesson }) {\n  return (\n    <article>\n      <h2>{lesson.title}</h2>\n      <p>{lesson.minutes}분</p>\n    </article>\n  );\n}",
        "language": "jsx",
        "output": "입력 lesson={title:'Git', minutes:25} → Git · 25분\n컴포넌트만으로 CSR·SSR 중 하나를 단정하지 않습니다.",
        "focus": "frontend",
        "fileName": "비교용 CourseCard.jsx · 코드 조각",
        "files": [
          "CourseCard.jsx"
        ]
      },
      {
        "id": "web-10",
        "title": "Svelte는 컴파일러를 사용하는 UI 프레임워크",
        "description": "Svelte 5 문법의 비교용 컴포넌트입니다. 같은 데이터로 화면을 구성하되 별도 실습으로 설치하지 않습니다.",
        "scene": "code",
        "code": "<script>\n  let { lesson } = $props();\n</script>\n\n<article>\n  <h2>{lesson.title}</h2>\n  <p>{lesson.minutes}분</p>\n</article>",
        "language": "html",
        "output": "입력 lesson={title:'Git', minutes:25} → Git · 25분\n컴파일러가 컴포넌트를 변환하며, SvelteKit 등의 구성으로 서버 렌더링도 조합할 수 있습니다.",
        "focus": "frontend",
        "fileName": "비교용 CourseCard.svelte · 코드 조각",
        "files": [
          "CourseCard.svelte"
        ]
      },
      {
        "id": "web-04",
        "title": "정적 프론트엔드만 쓰는 다른 선택",
        "description": "업무 백엔드가 없는 변형도 가능함을 확인합니다. 정적 호스팅은 파일을 전달하고 브라우저가 JSON을 읽습니다.",
        "scene": "browser",
        "code": "GET /data/course.json HTTP/1.1\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"lessons\":[{\"id\":\"git\",\"title\":\"Git\",\"minutes\":25}]}",
        "language": "http",
        "output": "정적 파일 + 브라우저 JavaScript로도 카드 표시·검색이 가능합니다. DB나 자체 업무 API가 꼭 필요하지는 않습니다.",
        "focus": "frontend",
        "fileName": "비교 변형 · 정적 JSON 응답",
        "files": [
          "index.html",
          "src/main.js",
          "public/data/course.json"
        ]
      },
      {
        "id": "web-ssr-handler",
        "title": "FastAPI가 템플릿에 데이터를 전달",
        "description": "다음 템플릿 강의로 이어지는 개념 설명용 main.py 축약 예입니다. 실제 실행은 공통 카드 README의 준비된 서버 파일과 안내를 사용합니다.",
        "scene": "pycharm",
        "code": "from fastapi import FastAPI, Request\nfrom fastapi.responses import HTMLResponse\nfrom fastapi.staticfiles import StaticFiles\nfrom fastapi.templating import Jinja2Templates\n\napp = FastAPI()\napp.mount('/static', StaticFiles(directory='static'), name='static')\ntemplates = Jinja2Templates(directory='templates')\nLESSONS = [\n    {'id': 'terminal', 'title': '윈도우 터미널', 'minutes': 30},\n    {'id': 'git', 'title': 'Git', 'minutes': 25},\n]\n\n@app.get('/lessons', response_class=HTMLResponse)\ndef lesson_list(request: Request):\n    return templates.TemplateResponse(\n        request=request, name='cards.html',\n        context={'lessons': LESSONS},\n    )",
        "language": "python",
        "output": "GET /lessons → lessons 목록을 cards.html에 전달 → HTML 응답\n이 코드는 개념 설명용 재현이며 여기서 서버를 시작하지 않습니다.",
        "focus": "backend",
        "fileName": "main.py · 준비된 서버 예제",
        "files": [
          "main.py",
          "templates/cards.html",
          "static/course.css",
          "static/alpine.js"
        ]
      },
      {
        "id": "web-ssr-template",
        "title": "템플릿과 응답을 나란히",
        "description": "Jinja 문법이 서버에서 처리되어 응답에는 실제 카드 제목이 들어가는 과정을 봅니다. 출력은 핵심만 보여 주는 축약 예이며 실제 카드에는 article과 다른 속성이 더 있습니다.",
        "scene": "code",
        "code": "<!-- templates/cards.html의 본문 조각 -->\n<ul>\n{% for lesson in lessons %}\n  <li>\n    <h2>{{ lesson.title }}</h2>\n    <p>{{ lesson.minutes }}분</p>\n  </li>\n{% endfor %}\n</ul>",
        "language": "html",
        "output": "응답 본문 발췌:\n<ul><li><h2>윈도우 터미널</h2><p>30분</p></li>\n<li><h2>Git</h2><p>25분</p></li></ul>\n브라우저가 Jinja의 for 구문을 실행하는 것은 아닙니다.",
        "focus": "backend",
        "fileName": "templates/cards.html · 초기 HTML 생성",
        "files": [
          "main.py",
          "templates/cards.html"
        ]
      },
      {
        "id": "web-08",
        "title": "서버 렌더링은 HTML 응답까지",
        "description": "요청 시 HTML을 만드는 서버와 실제 화면을 그리는 브라우저를 구분합니다.",
        "scene": "architecture",
        "code": "FastAPI: 요청 → lessons 준비\nJinja2: cards.html + lessons → HTML 문자열\nHTTP: Content-Type: text/html\n브라우저: HTML 해석 → CSS 적용 → 배치·그리기\n브라우저 JavaScript: 이후 클릭·입력 처리 가능",
        "language": "text",
        "output": "서버는 이 예에서 화면의 픽셀을 전송하지 않습니다. HTML 생성과 최종 화면 렌더링은 다른 단계입니다.",
        "focus": "backend",
        "fileName": "서버 HTML 생성 → 브라우저 화면",
        "files": [
          "main.py",
          "templates/cards.html",
          "static/course.css",
          "static/alpine.js"
        ]
      },
      {
        "id": "web-11",
        "title": "응답과 현재 화면을 대조",
        "description": "가상의 Network와 Elements 결과입니다. URL·상태·본문과 최종 표시를 별도 근거로 확인합니다.",
        "scene": "browser",
        "code": "Network → /lessons\nStatus: 200\nContent-Type: text/html; charset=utf-8\nResponse: <h2>Git</h2>\n\nElements → 현재 DOM의 h2 확인\n화면 → Git · 25분 카드 확인",
        "language": "text",
        "output": "초기 제목은 HTML 응답에 있습니다. 서버의 HTML 생성과 브라우저 표시를 각각 확인했습니다. 클릭 동작은 다음 강의에서 더합니다.",
        "focus": "frontend",
        "fileName": "Network / Elements · 준비용 관찰",
        "files": [
          "main.py",
          "templates/cards.html"
        ]
      }
    ],
    "glossary": [
      {
        "term": "서버 기계 / 서버 프로세스",
        "definition": "서버 기계는 실행 자원을 제공하는 컴퓨터이고, 서버 프로세스는 그 위에서 요청에 응답하며 실행 중인 프로그램의 한 단위입니다."
      },
      {
        "term": "로컬 / 원격",
        "definition": "이 예에서 내 PC에서 실행되는지 다른 컴퓨터에서 실행되는지를 나타내는 위치의 구분입니다."
      },
      {
        "term": "프론트엔드 / 백엔드",
        "definition": "UI·상호작용을 구성하는 영역과 서버에서 요청 처리·데이터 준비·업무 규칙 등을 맡는 영역의 구분입니다."
      },
      {
        "term": "React / Svelte",
        "definition": "React는 UI 라이브러리이고 Svelte는 컴파일러를 사용하는 UI 프레임워크입니다. 두 도구의 이름만으로 렌더링 위치를 단정하지 않습니다."
      },
      {
        "term": "요청 / 응답",
        "definition": "클라이언트가 URL과 방법 등으로 요청하고 서버가 상태·헤더·본문으로 답하는 통신의 한 쌍입니다."
      },
      {
        "term": "서버 템플릿 렌더링",
        "definition": "이 강의에서는 서버가 템플릿과 데이터를 결합해 HTML 문자열을 만드는 과정입니다. 브라우저의 최종 화면 그리기와 구분합니다."
      },
      {
        "term": "DOM",
        "definition": "브라우저가 문서를 객체 구조로 다루는 모델입니다. JavaScript 실행 후 응답 원문과 달라질 수 있습니다."
      }
    ],
    "references": [
      {
        "title": "FastAPI · Server Workers: 서버 프로그램과 프로세스",
        "url": "https://fastapi.tiangolo.com/deployment/server-workers/"
      },
      {
        "title": "FastAPI · Templates: Jinja2Templates와 HTML 응답",
        "url": "https://fastapi.tiangolo.com/advanced/templates/"
      },
      {
        "title": "React · UI 라이브러리와 프레임워크 조합",
        "url": "https://react.dev/"
      },
      {
        "title": "Svelte · Overview: UI 프레임워크와 컴파일러",
        "url": "https://svelte.dev/docs/svelte/overview"
      },
      {
        "title": "Spring · Serving Web Content with Spring MVC",
        "url": "https://spring.io/guides/gs/serving-web-content/"
      },
      {
        "title": "MDN · Client-server overview",
        "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview"
      },
      {
        "title": "Svelte 5 · $props",
        "url": "https://svelte.dev/docs/svelte/$props"
      }
    ],
    "closing": "로컬·원격은 위치이고 프론트엔드·백엔드는 역할입니다. 서버가 템플릿으로 만든 HTML을 브라우저가 화면으로 그리는 경로를 확인했습니다. 다음에는 같은 카드에 모양과 클릭 동작을 더합니다.",
    "presentation": {
      "caseSummary": "내 PC에서 켠 FastAPI도 백엔드인지, 서버가 둘 필요한지 혼란스럽습니다. 서버의 위치·역할과 HTML 생성·브라우저 화면 그리기를 같은 카드 예제로 나눠 봅니다.",
      "demo": {
        "program": "강사용 FastAPI 프로젝트 · PowerShell · 브라우저",
        "file": "index.html · style.css · script.js · main.py · templates/cards.html",
        "command": "1분: 앞선 웹 코딩의 Git 카드에서 HTML·CSS·JavaScript와 버튼 동작 확인\n1분: 필요할 때 화면이 서버로 요청을 보내는 관계 설명\n1분: 미리 준비된 FastAPI의 /lessons 응답에서 Git 제목 확인\n1분: 서버의 HTML 생성과 브라우저 화면 표시를 구분",
        "expectedResult": "앞선 웹 코딩의 Git 카드와 설명 펼치기는 브라우저의 프론트엔드 동작입니다. 준비된 FastAPI 예제의 /lessons 응답에서 Git 제목을 찾아 서버의 HTML 생성과 브라우저 표시를 구분합니다.",
        "durationMinutes": 4
      },
      "returnSummary": "앞선 웹 코딩에서 만든 HTML·CSS·JavaScript 카드가 프론트엔드의 한 예임을 확인했습니다. 서버가 필요한 기능에서는 요청·응답으로 백엔드와 연결하며, 서버 두 대나 DB는 필수가 아닙니다."
    }
  },
  "templates": {
    "id": "templates",
    "number": 8,
    "title": "템플릿: Jinja2에 Tailwind·Alpine을 더하는 순서",
    "shortTitle": "템플릿",
    "subtitle": "같은 Git 카드로 HTML 구조·CSS 모양·JavaScript 반응을 연결합니다",
    "icon": "sparkles",
    "durationMinutes": 40,
    "case": {
      "kind": "example",
      "title": "템플릿·class·x-show 중 어디를 고쳐야 할까요?",
      "body": "교체용 가상 사례 · 실제 사용자 대화가 아닙니다.\n\n가상의 개발자가 dolbeom-notes에 ‘Git 제목과 25분 표시, 넓은 카드 여백, 설명 펼치기’를 요청했습니다. Codex가 제안한 예제에는 {{ lesson.title }}, class, x-data, @click이 같은 HTML에 적혀 있습니다. 개발자는 ‘Jinja2 대신 Alpine을 쓰면 되는가? Tailwind 클래스에 버튼 동작도 들어 있는가?’라고 묻습니다. 서버의 초기 HTML 생성, 카드 모양, 브라우저의 펼침 상태를 순서대로 분리해 읽습니다.",
      "question": "같은 태그에 섞여 있는 세 종류의 코드를 각각 어느 단계에서 누가 처리할까요?"
    },
    "objectives": [
      "IDE에서 직접 만든 Git 카드를 Jinja2 데이터와 템플릿으로 확장한다.",
      "Jinja2와 Django Template Language의 공통 목적과 문법 차이를 구분하고 FastAPI와 Jinja2를 선택한 학습 이유를 설명한다.",
      "직접 작성한 CSS와 Tailwind 유틸리티를 비교한다.",
      "직접 작성한 JavaScript의 클릭·표시 동작과 Alpine의 상태·이벤트 연결을 비교한다.",
      "초기 HTML·스타일·클릭·새로고침 결과를 각각 확인한다."
    ],
    "sections": [
      {
        "id": "web-jinja",
        "title": "Jinja2와 Django Template: 왜 이번에는 Jinja2일까",
        "minutes": 11,
        "optional": false,
        "body": "### IDE에서 만든 카드를 데이터로 확장합니다\n앞에서는 `index.html`에 Git이라는 제목을 직접 적었습니다. 이번에는 그 카드 구조를 템플릿으로 사용하고 서버가 `lesson.title`에 전달한 값을 넣습니다. Git 외에 다른 강의가 추가되어도 공통 구조를 복사해 제목을 일일이 바꾸지 않고 목록을 반복해 카드를 만들 수 있습니다.\n\n### 둘 다 템플릿과 데이터를 결합합니다\n서버 템플릿 엔진은 문서의 공통 구조에 데이터를 채워 HTML 같은 텍스트를 만듭니다. Jinja2와 Django Template Language(DTL)는 모두 변수 출력, 조건, 반복을 제공합니다. `{{ lesson.title }}`과 `{% for ... %}`가 닮았어도 같은 언어는 아닙니다. 예를 들어 기본값 필터의 인자 표기부터 다릅니다.\n\n```text\nJinja2: {{ lesson.title|default('제목 없음') }}\nDTL:    {{ lesson.title|default:'제목 없음' }}\n```\n\n이는 문법 비교용 조각입니다. 기본 설정에서 title이 빈 문자열이면 Jinja2는 빈값을, DTL은 대체 문구를 출력합니다. 비슷하게 생겼다는 이유로 다른 엔진의 문법을 그대로 옮기면 오류나 다른 결과가 날 수 있습니다. [Django 템플릿 문서](https://docs.djangoproject.com/en/5.2/topics/templates/)는 DTL과 Jinja2용 백엔드를 함께 설명합니다. Django가 Jinja2를 지원하지 않는다고 말하지 않습니다.\n\n이번 수업은 [FastAPI 공식 예제](https://fastapi.tiangolo.com/advanced/templates/)의 `Jinja2Templates` 연결을 따라가기 위해 Jinja2를 고릅니다. Python으로 요청 데이터를 준비하고 같은 카드 템플릿을 읽기 쉬운 학습 조합입니다. 인기 순위나 모든 프로젝트에서의 우월함을 근거로 삼지 않습니다. 이미 Django로 만든 프로젝트라면 사용 중인 템플릿 엔진과 팀 규칙부터 확인합니다.\n\n예제에서 FastAPI는 `lessons`를 context로 전달하고, Jinja2의 반복은 그 목록으로 카드 HTML을 만듭니다. 템플릿은 HTTP 요청을 받는 서버 자체나 DB가 아닙니다. [Jinja 문법 문서](https://jinja.palletsprojects.com/en/stable/templates/)를 보며 ‘입력은 템플릿과 데이터, 출력은 HTML 문자열’이라고 말해 봅니다. 코드를 Python에서 실행한다는 이유로 템플릿 안에 모든 업무 처리를 넣지도 않습니다. 준비·검증은 서버 코드에, 출력 구조는 템플릿에 두면 역할을 따라가기 쉽습니다.\n\n**공통 실습:** [카드 비교 안내](./examples/course-card/index.html)에서 IDE의 정적 카드와 서버 템플릿 카드를 비교합니다. 같은 HTML 구조를 복사해 제목을 바꾸는 대신 `lesson.title`과 반복을 사용하면 데이터가 늘 때 공통 카드 구조를 재사용할 수 있습니다. 서버에서 처리할 Python·FastAPI·Jinja2 환경은 [예제 준비 안내](./examples/course-card/README.md)를 먼저 확인합니다. GitHub Pages는 정적 파일을 보여 주며 Python 서버를 실행하지 않습니다.",
        "presentationPoints": [
          "IDE에서 직접 적은 Git 제목을 서버가 전달한 데이터로 채웁니다.",
          "Jinja2와 DTL은 목적이 닮았지만 문법·규칙이 다른 엔진입니다.",
          "FastAPI는 데이터·응답을 연결하고 Jinja2는 템플릿과 데이터로 HTML을 만듭니다."
        ]
      },
      {
        "id": "frontend-css",
        "title": "기존 CSS와 Tailwind를 같은 카드에서 비교하기",
        "minutes": 11,
        "optional": false,
        "body": "### IDE 실습에서 꾸민 카드를 다시 봅니다\n앞에서 `style.css`의 `.card`로 Git 카드의 여백과 모서리를 꾸몄습니다. HTML·CSS·JavaScript의 기본 역할은 그대로 두고, 이번에는 같은 스타일을 다른 방식으로 표현합니다.\n\n```css\n.card { padding: 24px; border-radius: .75rem; background-color: white; }\n```\n\nTailwind CSS는 작은 스타일 기능을 클래스로 조합하는 **CSS 유틸리티 프레임워크**입니다. 준비된 Tailwind 3 기본 테마에서는 같은 카드에 `p-6 rounded-xl bg-white`를 붙여 각각 안쪽 여백·둥근 모서리·흰 배경을 표현할 수 있습니다.\n\n```html\n<article class=\"p-6 rounded-xl bg-white\">\n  <h2>{{ lesson.title }}</h2>\n  <button type=\"button\">설명 보기</button>\n</article>\n```\n\n서버는 `{{ lesson.title }}`에 데이터의 제목을 채우고, 브라우저는 준비된 CSS를 적용합니다. `p-6`을 `p-8`로 바꿔 카드 안쪽 여백이 달라지는지 확인합니다. Tailwind 클래스가 작동하려면 해당 프로젝트에서 생성하거나 준비한 CSS가 연결되어야 합니다. Tailwind는 CSS나 JavaScript 동작을 대체하는 별도 언어가 아닙니다.\n\n**같이 확인:** IDE에서 만든 `.card`의 `padding: 24px`과 `p-6`을 비교하고, 제목 데이터와 버튼 동작이 여백 변경과 별개인지 확인합니다. 다음 절에서 직접 작성했던 펼치기 JavaScript를 Alpine과 비교합니다.\n\n**쉬워지는 지점:** 별도의 CSS 선택자를 오가며 값을 찾지 않고 HTML의 클래스에서 카드 안쪽 여백을 확인할 수 있습니다. 대신 클래스가 뜻하는 스타일과 준비된 CSS 파일을 알아야 합니다. 기본 글자 크기 16px을 기준으로 Tailwind 기본 `p-6`은 1.5rem(24px), `p-8`은 2rem(32px)입니다. 폰트 기준이나 테마 설정이 달라지면 실제 결과도 확인합니다.",
        "presentationPoints": [
          "IDE의 style.css와 Tailwind 클래스로 같은 카드 모양을 표현합니다.",
          "기본 테마 p-6 → p-8로 여백을 바꾸며 준비된 Tailwind CSS를 확인합니다.",
          "제목 데이터·카드 모양·클릭 동작은 각각 다른 역할입니다."
        ]
      },
      {
        "id": "frontend-alpine",
        "title": "Alpine으로 브라우저 반응을 더하고 템플릿과 조합하기",
        "minutes": 18,
        "optional": false,
        "body": "### IDE에서 작성한 클릭 동작과 비교합니다\n앞서 `script.js`에서 버튼의 클릭을 듣고 `detail.hidden`과 `aria-expanded`를 바꿔 설명을 펼쳤습니다. 같은 사용 경험을 Alpine으로 표현해 봅니다. 한 줄씩 완전히 똑같은 코드를 실행한다는 뜻은 아니고, 상태와 표시를 연결하는 같은 목적을 비교합니다.\n\n### 서버 생성 뒤 브라우저의 작은 동작을 연결합니다\nAlpine은 HTML 속성에 적은 JavaScript 상태와 표현을 브라우저 동작에 연결하는 도구입니다. JavaScript를 대체하는 언어도, 서버의 Jinja2 템플릿 엔진을 통째로 대신하는 도구도 아닙니다. 이번 예제는 Jinja2가 초기 카드 목록을 만들고, Tailwind가 모양을, Alpine이 각 카드의 펼침을 연결합니다.\n\n```html\n<article class=\"p-6 rounded-xl\" x-data=\"{ open: false }\">\n  <h2>{{ lesson.title }}</h2>\n  <button type=\"button\" @click=\"open = !open\"\n          :aria-expanded=\"open\">설명 보기</button>\n  <p x-show=\"open\" x-cloak>변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n이 조각은 Jinja2의 카드 반복 안에 들어갑니다. 서버는 `{{ lesson.title }}`을 Git으로 바꾸고 Alpine 속성은 응답에 남깁니다. Alpine이 브라우저에서 실행되면 `x-data`가 카드별 상태 범위를, `@click`이 사건을, `x-show`가 표시 조건을 연결합니다. 처리 주체와 시점이 다릅니다.\n\n입력은 `x-model`, 상태를 글자로 보여 줄 때는 `x-text`를 사용할 수 있습니다. `x-for`는 브라우저 쪽 반복입니다. 이번 목록은 Jinja2가 이미 반복하므로 같은 카드를 다시 x-for로 만들 필요가 없습니다. 서버 반복과 브라우저 반복 중 누가 목록을 소유하는지 정해야 중복을 피할 수 있습니다. [Alpine 시작 문서](https://alpinejs.dev/start-here)의 지시문을 필요한 역할에 맞춰 읽습니다.\n\n준비 예제에는 `[x-cloak] { display: none !important; }`와 Alpine 로딩이 포함됩니다. 초기 숨김 깜박임을 줄이고 버튼의 키보드 동작·펼침 상태를 확인합니다. [x-show](https://alpinejs.dev/directives/show)는 DOM을 삭제하지 않고 표시를 바꿉니다. 서버 저장이나 권한 검사는 생기지 않습니다. 클릭해 펼친 뒤 새로고침하면 초기 false로 돌아오는 것도 예상 결과입니다. HTML 응답·스타일·클릭·초기화를 각각 검증하고 요청을 마무리합니다.\n\n**쉬워지는 지점:** 기존 JavaScript에서는 요소를 찾고 클릭 이벤트를 연결한 뒤 숨김 상태와 접근성 상태를 갱신했습니다. Alpine에서는 카드 안의 `x-data`, `@click`, `x-show`를 함께 읽으며 상태와 표시를 연결합니다. 코드를 없애는 것이 아니라 브라우저에서 실행되는 JavaScript 도구를 사용합니다. 라이브러리를 준비해야 하고 새로고침 후 상태 저장은 별도입니다.",
        "presentationPoints": [
          "IDE의 script.js 클릭·표시 연결을 Alpine의 x-data·@click·x-show와 비교합니다.",
          "Jinja2는 서버 초기 HTML, Alpine은 브라우저의 상태·이벤트·표시를 연결합니다.",
          "카드별 펼침·키보드·초기 숨김·새로고침을 확인합니다."
        ]
      },
      {
        "id": "frontend-bonus",
        "title": "보충: 클래스가 개발 화면에만 보일 때",
        "minutes": 5,
        "optional": true,
        "body": "### Tailwind 3 빌드에서 찾아야 할 문자열\n\nTailwind 3는 설정된 content 경로의 파일을 읽고 발견한 클래스에 해당하는 CSS를 만듭니다. `bg-${color}-500`처럼 런타임에 문자열을 이어 붙여 최종 클래스가 소스에 통째로 나타나지 않으면 기대한 CSS가 생성되지 않을 수 있습니다. 상태별로 `bg-teal-500`, `bg-slate-500`처럼 완전한 클래스 문자열을 적은 매핑을 사용하면 의도를 분명히 할 수 있습니다. 프로젝트가 3.x인지 4.x인지 먼저 확인하고 설치 안내를 섞지 않습니다.\n\n서버 템플릿 예제라면 Tailwind 3의 content 경로가 `./templates/**/*.html` 같은 실제 템플릿 파일을 포함하는지도 확인합니다. 준비된 static/course.css는 이 예제에서 쓰는 클래스를 포함한 결과물이라는 전제입니다. CSS 생성 설정과 실제 응답에 담긴 class를 따로 대조합니다. 무조건 모든 클래스를 safelist에 넣으면 원인을 가릴 수 있습니다.\n\nAlpine의 일반 상태는 새로고침하면 초기값으로 돌아옵니다. 학습 완료나 최근 위치를 유지하려면 저장 로직 또는 저장용 플러그인처럼 별도의 수단이 필요합니다. 상태가 사라졌다는 현상을 클릭 연결 오류와 혼동하지 않습니다. 이번의 카드 펼치기는 서버 저장 기능이 아닙니다.\n\n**보충 과제:** 카드의 완료 상태에 따라 두 가지 완전한 클래스 문자열을 고르고, 새로고침 전후 무엇이 유지되어야 하는지 글로 정합니다. [Tailwind 3 content 설정](https://v3.tailwindcss.com/docs/content-configuration)을 읽고 준비된 설정과 비교합니다."
      }
    ],
    "pitfalls": [
      {
        "title": "Jinja2와 Django Template을 같은 문법으로 취급하기",
        "body": "변수와 반복 모양이 닮았어도 필터 인자와 동작 규칙이 다릅니다. 파일이 사용하는 실제 엔진을 먼저 확인합니다."
      },
      {
        "title": "FastAPI를 쓰면 Jinja2가 무조건 필수라고 생각하기",
        "body": "FastAPI는 여러 템플릿 엔진을 사용할 수 있습니다. 이번에는 공식 연결 예제를 따라 배우기 위해 Jinja2를 선택했습니다."
      },
      {
        "title": "Tailwind를 JavaScript 도구라고 부르기",
        "body": "Tailwind는 CSS 유틸리티 프레임워크입니다. class는 모양을, Alpine의 속성과 표현은 브라우저 상태·이벤트를 연결합니다."
      },
      {
        "title": "Alpine이 JavaScript나 Jinja2를 없앤다고 생각하기",
        "body": "Alpine은 JavaScript 위에서 동작합니다. 서버 초기 HTML 생성과 브라우저 상호작용을 함께 구성할 수 있습니다."
      },
      {
        "title": "서버와 브라우저에서 같은 목록을 중복 반복하기",
        "body": "Jinja2가 만든 카드 목록에 다시 x-for를 붙일 필요는 없습니다. 목록 데이터를 누가 소유하고 반복할지 먼저 정합니다."
      },
      {
        "title": "x-show가 삭제·저장·권한 검사까지 한다고 생각하기",
        "body": "표시를 바꾸는 동작입니다. 값의 영속 저장, 내용 삭제, 서버 권한 검증은 별도로 구현합니다."
      }
    ],
    "checklist": [
      "Jinja2와 DTL의 공통 목적과 다른 문법을 예로 설명한다.",
      "FastAPI와의 학습 조합이 Jinja2 선택 이유임을 말한다.",
      "같은 카드에서 HTML·CSS·JavaScript의 줄을 각각 찾는다.",
      "p-6 → p-8을 안쪽 여백의 변화로 설명한다.",
      "서버 Jinja 반복과 브라우저 Alpine 상태의 실행 시점을 나눈다.",
      "각 카드의 펼침·접기와 키보드 동작을 확인한다.",
      "새로고침 시 펼침 상태가 초기화됨을 예상 결과로 확인한다.",
      "초기 HTML 응답·스타일·클릭 결과를 별도 근거로 남긴다."
    ],
    "steps": [
      {
        "id": "web-06",
        "title": "두 템플릿 엔진의 문법 비교",
        "description": "Jinja2와 DTL은 비슷한 목적을 가지지만 같은 언어가 아님을 필터 표기로 확인합니다.",
        "scene": "code",
        "code": "Jinja2: {{ lesson.title|default('제목 없음') }}\nDTL:    {{ lesson.title|default:'제목 없음' }}\n\n공통 목적: 템플릿 + context → HTML 등의 텍스트\n선택 기준: 이번 예제는 FastAPI의 Jinja2Templates 연결",
        "language": "text",
        "output": "문법을 엔진에 맞춰 읽습니다. 기본값이 적용되는 조건도 각 엔진의 규칙을 확인해야 합니다. 인기 순위로 선택하지 않습니다.",
        "focus": "backend",
        "fileName": "Jinja2 / Django Template 비교 메모",
        "files": [
          "templates/cards.html",
          "main.py"
        ]
      },
      {
        "id": "web-07",
        "title": "FastAPI가 제공할 데이터 확인",
        "description": "이전 강의의 main.py에서 가져온 코드 조각입니다. 같은 두 카드 데이터를 Jinja2 context로 전달합니다.",
        "scene": "pycharm",
        "code": "# main.py의 LESSONS와 lesson_list 발췌\nLESSONS = [\n    {'id': 'terminal', 'title': '윈도우 터미널', 'minutes': 30},\n    {'id': 'git', 'title': 'Git', 'minutes': 25},\n]\n\n# lesson_list(request) 안의 반환\nreturn templates.TemplateResponse(\n    request=request, name='cards.html',\n    context={'lessons': LESSONS},\n)",
        "language": "python",
        "output": "context의 키 lessons와 템플릿의 for lesson in lessons가 연결됩니다. DB나 설치 명령을 추가하지 않습니다.",
        "focus": "backend",
        "fileName": "main.py · 데이터 전달 부분 발췌",
        "files": [
          "main.py",
          "templates/cards.html"
        ]
      },
      {
        "id": "web-03",
        "title": "HTML 구조부터 읽기",
        "description": "다른 처리 없이도 제목·시간·버튼의 의미를 읽을 수 있는 카드입니다.",
        "scene": "code",
        "code": "<article>\n  <h2>Git</h2>\n  <p>25분</p>\n  <button type='button'>설명 보기</button>\n</article>",
        "language": "html",
        "output": "제목과 시간, 누를 수 있는 버튼이 있습니다. 아직 설명 표시를 바꾸는 JavaScript 연결은 없습니다.",
        "focus": "frontend",
        "fileName": "Git 카드 · 구조 비교 조각",
        "files": [
          "templates/cards.html"
        ]
      },
      {
        "id": "frontend-01",
        "title": "직접 적은 제목을 서버 데이터로",
        "description": "IDE에서 직접 적었던 Git 카드 구조를 서버 반복 안에 넣습니다. 초기 목록 생성은 Jinja2가 맡습니다.",
        "scene": "code",
        "code": "<ul>\n{% for lesson in lessons %}\n  <li>\n    <article>\n      <h2>{{ lesson.title }}</h2>\n      <p>{{ lesson.minutes }}분</p>\n      <button type='button'>설명 보기</button>\n    </article>\n  </li>\n{% endfor %}\n</ul>",
        "language": "html",
        "output": "응답에는 윈도우 터미널 · 30분, Git · 25분 카드가 들어갑니다. 브라우저가 Jinja 문법을 해석하지 않습니다.",
        "focus": "backend",
        "fileName": "templates/cards.html · 목록 본문 발췌",
        "files": [
          "main.py",
          "templates/cards.html"
        ]
      },
      {
        "id": "frontend-02",
        "title": "선택자·속성·값으로 CSS 읽기",
        "description": "IDE에서 작성한 style.css의 카드 여백과 모서리·배경을 Tailwind 적용 전 비교합니다.",
        "scene": "code",
        "code": ".card {\n  padding: 24px;\n  border-radius: .75rem;\n  background-color: white;\n}\n/* .card: 선택자 / padding: 속성 / 24px: 값 */",
        "language": "css",
        "output": "카드 안쪽 여백과 둥근 모서리, 흰 배경이 생깁니다. 제목 데이터나 버튼 동작은 바뀌지 않습니다.",
        "focus": "frontend",
        "fileName": "사용자 CSS와의 비교 조각",
        "files": [
          "templates/cards.html",
          "static/course.css"
        ]
      },
      {
        "id": "frontend-03",
        "title": "같은 스타일을 Tailwind로",
        "description": "Tailwind 3 기본 테마와 준비된 CSS를 전제로 합니다. p-6를 p-8으로 바꾸는 차이만 봅니다.",
        "scene": "browser",
        "code": "<article class='p-6 rounded-xl bg-white'>\n  <h2>Git</h2><p>25분</p>\n</article>\n\n<!-- 비교: p-6 → p-8 -->",
        "language": "html",
        "output": "기본 테마에서 padding 1.5rem → 2rem (기본 16px 기준 24px → 32px)\n카드 안쪽 여백이 커집니다. Tailwind는 CSS 유틸리티 프레임워크입니다.",
        "focus": "frontend",
        "fileName": "Git 카드 · 스타일 비교",
        "files": [
          "templates/cards.html",
          "static/course.css"
        ]
      },
      {
        "id": "frontend-04",
        "title": "카드 간격은 목록 부모에서",
        "description": "카드 안쪽 여백과 카드 사이 간격을 구분합니다. 넓은 화면의 열 수도 CSS 역할입니다.",
        "scene": "browser",
        "code": "<ul class='grid gap-4 md:grid-cols-2'>\n  <li><article class='p-6 rounded-xl bg-white'>…</article></li>\n  <li><article class='p-6 rounded-xl bg-white'>…</article></li>\n</ul>",
        "language": "html",
        "output": "p-6: 카드 안쪽 여백\ngap-4: 목록 항목 사이 간격\nmd:grid-cols-2: 기본 테마의 md 이상에서 두 열\n클릭 이벤트는 아직 추가되지 않았습니다.",
        "focus": "frontend",
        "fileName": "templates/cards.html · 부모 배치 조각",
        "files": [
          "templates/cards.html",
          "static/course.css"
        ]
      },
      {
        "id": "frontend-05",
        "title": "JavaScript 값과 펼침 상태",
        "description": "카드 데이터와 펼침 상태는 다른 값입니다. 코드 읽기용 조각이며 별도 설치 없이 설명합니다.",
        "scene": "code",
        "code": "const lesson = { id: 'git', title: 'Git', minutes: 25 };\nconst lessons = [lesson];\nlet open = false;\nopen = !open;\n\n// 문자열 / 숫자 / 객체 / 배열 / 불리언을 구분합니다.",
        "language": "javascript",
        "output": "lesson.title → Git\nlesson.minutes → 25\nlessons.length → 1\nopen → true\n값을 바꾸는 일과 실제 DOM 표시 연결은 구분합니다.",
        "focus": "frontend",
        "fileName": "JavaScript 상태 읽기 · 비교 조각",
        "files": [
          "templates/cards.html"
        ]
      },
      {
        "id": "frontend-06",
        "title": "IDE에서 작성했던 JavaScript와 비교",
        "description": "IDE에서 만든 같은 Git 카드입니다. script.js가 버튼 클릭에 반응하고 설명의 숨김 상태를 바꿉니다.",
        "scene": "code",
        "code": "<!-- index.html -->\n<button id='toggle' type='button' aria-expanded='false'>설명 보기</button>\n<p id='detail' hidden>변경을 확인하고 기록합니다.</p>\n\n<!-- script.js를 불러온 뒤 실행 -->\n<script>\n  const button = document.querySelector('#toggle');\n  const detail = document.querySelector('#detail');\n  button.addEventListener('click', () => {\n    const isHidden = detail.hidden;\n    detail.hidden = !isHidden;\n    button.setAttribute('aria-expanded', String(isHidden));\n  });\n</script>",
        "language": "html",
        "output": "클릭 → 숨겨진 설명 표시 / 다시 클릭 → 설명 숨김\nAlpine은 같은 목표를 상태·이벤트·표시 지시문으로 표현하게 돕습니다.",
        "focus": "frontend",
        "fileName": "순수 JavaScript 비교 · 카드 한 개",
        "files": [
          "templates/cards.html"
        ]
      },
      {
        "id": "frontend-07",
        "title": "x-data로 카드별 상태 범위",
        "description": "Alpine 스크립트가 준비되어 있다는 조건입니다. Jinja의 서버 제목과 Alpine의 브라우저 상태를 함께 읽습니다.",
        "scene": "browser",
        "code": "<!-- Jinja 반복 안의 카드 조각 -->\n<article x-data='{ open: false }'>\n  <h2>{{ lesson.title }}</h2>\n  <span x-text=\"open ? '펼침' : '접힘'\"></span>\n</article>",
        "language": "html",
        "output": "서버: lesson.title → Git\n브라우저: open=false → 접힘 표시\n각 article의 x-data가 독립된 상태를 가집니다.",
        "focus": "frontend",
        "fileName": "templates/cards.html · 서버 값과 브라우저 값",
        "files": [
          "templates/cards.html",
          "static/alpine.js"
        ]
      },
      {
        "id": "frontend-08",
        "title": "클릭과 설명 표시를 연결",
        "description": "초기 숨김용 x-cloak CSS가 준비되어 있고, 속성 표현은 브라우저에서 JavaScript로 평가됩니다.",
        "scene": "browser",
        "code": "<article x-data='{ open: false }'>\n  <h2>Git</h2>\n  <button type='button' @click='open = !open'\n          :aria-expanded='open'>설명 보기</button>\n  <p x-show='open' x-cloak>변경을 확인하고 기록합니다.</p>\n</article>",
        "language": "html",
        "output": "처음: 접힘 / 클릭: 설명 표시 / 다시 클릭: 숨김\n버튼은 키보드 Enter·Space로도 동작합니다. 상태 변경에 새 서버 요청은 필요하지 않습니다.",
        "focus": "frontend",
        "fileName": "Git 카드 · Alpine 상호작용",
        "files": [
          "templates/cards.html",
          "static/alpine.js",
          "static/course.css"
        ]
      },
      {
        "id": "frontend-09",
        "title": "x-model과 x-for가 필요한 다른 경우",
        "description": "브라우저가 목록 데이터를 소유하는 별도 비교 조각입니다. 이번 서버 반복 목록에 중복 추가하는 코드가 아닙니다.",
        "scene": "code",
        "code": "<div x-data=\"{ query: '', lessons: [{id:'git', title:'Git'}] }\">\n  <label>제목 검색 <input x-model='query'></label>\n  <template x-for=\"lesson in lessons.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))\" :key='lesson.id'>\n    <p x-text='lesson.title'></p>\n  </template>\n</div>",
        "language": "html",
        "output": "x-model: 입력 → query\nx-for: 브라우저 목록 반복 / x-text: 제목 표시\n이 별도 조각은 Git 카드 한 개를 대상으로 합니다. 본 예제는 Jinja2의 초기 반복을 유지합니다.",
        "focus": "frontend",
        "fileName": "브라우저 소유 목록 · 선택 비교 조각",
        "files": [
          "templates/cards.html",
          "static/alpine.js"
        ]
      },
      {
        "id": "codex-04",
        "title": "템플릿·스타일·Alpine을 한 문서로",
        "description": "이전 강의의 main.py와 조합할 준비용 cards.html 전체입니다. course.css와 Alpine 3 스크립트는 미리 준비된 정적 파일입니다.",
        "scene": "code",
        "code": "<!doctype html>\n<html lang='ko'>\n<head>\n  <meta charset='utf-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1'>\n  <title>돌범 강의 목록</title>\n  <link rel='stylesheet' href=\"{{ url_for('static', path='/course.css') }}\">\n  <script defer src=\"{{ url_for('static', path='/alpine.js') }}\"></script>\n  <style>[x-cloak] { display: none !important; }</style>\n</head>\n<body class='bg-stone-100 text-slate-800'>\n  <main class='mx-auto max-w-3xl p-6'>\n    <h1 class='mb-4 text-2xl font-bold'>돌범 강의 목록</h1>\n    <ul class='grid gap-4 md:grid-cols-2'>\n    {% for lesson in lessons %}\n      <li>\n        <article class='rounded-xl bg-white p-6' x-data='{ open: false }'>\n          <h2 class='text-xl font-bold'>{{ lesson.title }}</h2>\n          <p>{{ lesson.minutes }}분</p>\n          <button type='button' class='mt-4 rounded bg-slate-800 px-3 py-2 text-white focus-visible:ring-2 focus-visible:ring-teal-600'\n                  @click='open = !open' :aria-expanded='open'>설명 보기</button>\n          <p class='mt-3' x-show='open' x-cloak>변경을 확인하고 기록합니다.</p>\n        </article>\n      </li>\n    {% endfor %}\n    </ul>\n  </main>\n</body>\n</html>",
        "language": "html",
        "output": "서버: Jinja 반복으로 두 카드 생성\nCSS: 여백·배치·색 표현\n브라우저: 카드마다 펼치기 상태 연결\n실제 앱 파일을 바꾸거나 서버를 실행하는 단계는 아닙니다.",
        "focus": "frontend",
        "fileName": "templates/cards.html · 준비용 완성 예제",
        "files": [
          "main.py",
          "templates/cards.html",
          "static/course.css",
          "static/alpine.js"
        ]
      },
      {
        "id": "frontend-10",
        "title": "예상 동작을 나누어 확인",
        "description": "미리 작성한 확인 결과입니다. 코드 검토·실제 실행 검증·가상 출력은 같은 증거가 아님을 구분합니다.",
        "scene": "browser",
        "code": "준비된 확인 순서\n1. /lessons 응답에 윈도우 터미널·Git 제목이 있는가\n2. CSS가 적용되어 카드 안쪽 여백이 있는가\n3. Git만 펼쳐도 다른 카드는 접혀 있는가\n4. Enter·Space로 버튼을 사용할 수 있는가\n5. 다시 클릭하면 접히는가\n6. 새로고침하면 두 카드 모두 초기 접힘으로 돌아가는가",
        "language": "text",
        "output": "가상 기대 결과: 초기 HTML·스타일·카드별 상태·키보드·재클릭·초기화 모두 예상과 일치\n이 출력은 학습용 재현이며 실제 프로젝트 검증 완료 보고가 아닙니다.",
        "focus": "frontend",
        "fileName": "준비된 브라우저 확인표",
        "files": [
          "main.py",
          "templates/cards.html",
          "static/course.css",
          "static/alpine.js"
        ]
      },
      {
        "id": "codex-10",
        "title": "Codex 요청과 완료 근거로 연결",
        "description": "수정할 책임과 검증할 결과를 작게 나눠 전달하는 예시입니다.",
        "scene": "code",
        "code": "요청 예시:\nFastAPI+Jinja2 예제의 Git 카드 안쪽 여백을 p-6에서 p-8으로 바꿔 주세요.\n제목 데이터와 서버 반복은 유지하고 카드별 Alpine 펼치기는 그대로 연결해 주세요.\nHTML 응답, 여백 변화, 키보드 펼치기, 새로고침 초기화를 각각 확인해 주세요.\n\n확인 근거 예시:\n- 바뀐 템플릿 줄\n- 실제 수행한 확인과 결과\n- 아직 수행하지 않은 설치·서버 실행·배포 범위",
        "language": "text",
        "output": "모양은 CSS/Tailwind, 상태·이벤트는 JavaScript/Alpine, 초기 HTML은 Jinja2라는 구분이 수정 요청과 검증 범위를 구체화합니다.",
        "focus": "codex",
        "fileName": "다음 요청을 위한 확인 메모",
        "files": [
          "templates/cards.html",
          "README.md"
        ]
      }
    ],
    "glossary": [
      {
        "term": "템플릿 엔진",
        "definition": "템플릿의 구조와 context 데이터를 결합해 HTML 같은 텍스트 결과를 만드는 도구입니다."
      },
      {
        "term": "Jinja2 / DTL",
        "definition": "Python 생태계의 서로 다른 템플릿 언어·엔진입니다. 목적과 표기가 닮았어도 필터·규칙은 각각 확인합니다."
      },
      {
        "term": "context",
        "definition": "서버 코드가 템플릿에 전달하는 이름과 값의 묶음입니다. 예제에서는 lessons라는 키에 카드 목록을 담습니다."
      },
      {
        "term": "HTML / CSS / JavaScript",
        "definition": "문서 구조·의미, 시각 표현, 상태·이벤트·DOM 동작을 각각 다루는 웹의 기본 기술입니다."
      },
      {
        "term": "Tailwind CSS",
        "definition": "작은 스타일 기능을 유틸리티 클래스로 조합하는 CSS 프레임워크입니다. CSS의 속성과 값으로 결과를 읽을 수 있습니다."
      },
      {
        "term": "상태 / 이벤트",
        "definition": "open 같은 현재 값이 상태이고 클릭·입력처럼 반응할 사건이 이벤트입니다. 상태 변화와 화면 표시를 연결하는 코드가 필요합니다."
      },
      {
        "term": "Alpine",
        "definition": "HTML 속성의 JavaScript 상태·표현을 브라우저의 이벤트와 DOM 표시에 연결하는 도구입니다. 서버 템플릿과 함께 사용할 수 있습니다."
      },
      {
        "term": "x-cloak",
        "definition": "Alpine 초기화 전 콘텐츠가 잠깐 보이는 현상을 줄일 때 쓰는 속성입니다. 예제처럼 이를 숨기는 CSS 규칙을 함께 준비합니다."
      },
      {
        "term": "유틸리티 클래스",
        "definition": "padding·색·배치 등 작은 CSS 기능을 연결하는 클래스입니다. 여러 개를 조합해 카드 모양을 만듭니다."
      },
      {
        "term": "검증 근거",
        "definition": "실제로 수행한 코드 확인·실행 결과·브라우저 관찰을 구분해 완료 판단을 뒷받침하는 정보입니다. 준비된 가상 출력과 구분합니다."
      }
    ],
    "references": [
      {
        "title": "FastAPI · Templates: 이번 Jinja2 조합의 근거",
        "url": "https://fastapi.tiangolo.com/advanced/templates/"
      },
      {
        "title": "Jinja · Template Designer Documentation",
        "url": "https://jinja.palletsprojects.com/en/stable/templates/"
      },
      {
        "title": "Django 5.2 · Templates: DTL과 Jinja2 백엔드",
        "url": "https://docs.djangoproject.com/en/5.2/topics/templates/"
      },
      {
        "title": "Tailwind CSS 3 · Utility-First Fundamentals",
        "url": "https://v3.tailwindcss.com/docs/utility-first"
      },
      {
        "title": "Tailwind CSS 3 · Content Configuration",
        "url": "https://v3.tailwindcss.com/docs/content-configuration"
      },
      {
        "title": "Alpine · Start Here",
        "url": "https://alpinejs.dev/start-here"
      },
      {
        "title": "Alpine · x-show",
        "url": "https://alpinejs.dev/directives/show"
      },
      {
        "title": "Django 5.2 · default 필터",
        "url": "https://docs.djangoproject.com/en/5.2/ref/templates/builtins/#default"
      }
    ],
    "closing": "Jinja2가 서버에서 초기 HTML을 만들고, Tailwind가 CSS 모양을, Alpine이 브라우저의 JavaScript 상태와 사건을 연결합니다. 같은 카드에서 바꿀 책임과 확인 근거를 나누면 Codex에게 필요한 변경을 더 구체적으로 요청할 수 있습니다.",
    "presentation": {
      "caseSummary": "IDE에서 만든 Git 카드의 HTML·CSS·JavaScript를 Jinja2 데이터, Tailwind 스타일, Alpine 동작으로 확장합니다.",
      "demo": {
        "program": "강사용 IDE · 실행 중인 FastAPI 예제 · 브라우저",
        "file": "main.py · templates/cards.html · static/course.css · static/alpine.js",
        "command": "1분: IDE Git 카드의 제목을 Jinja2 데이터와 비교\n1분: 기존 style.css와 Tailwind p-6을 비교하고 p-8로 변경\n1분: 기존 script.js와 x-data · @click · x-show 비교\n1분: 버튼 펼치기·키보드 조작·새로고침 초기 상태 확인",
        "expectedResult": "실제 HTML 응답에는 두 카드 제목이 있고 p-8 저장·새로고침 뒤 안쪽 여백이 커집니다. 각 카드의 Alpine 펼침은 독립적으로 동작하며 버튼의 키보드 조작과 새로고침 후 초기 접힘을 확인합니다.",
        "durationMinutes": 4
      },
      "returnSummary": "IDE에서 직접 만든 카드에 Jinja2 데이터, Tailwind CSS, Alpine 동작을 더했습니다. HTML·CSS·JavaScript의 기본 역할은 유지되며 서버 생성과 브라우저 동작을 구분합니다."
    }
  }
};

export const previousEightCourseMetadata = {
  "title": "돌범이 풀어주는 Ai 구독 전 코딩 필수 노하우",
  "subtitle": "윈도우 터미널부터 웹 코딩과 템플릿까지, Codex 개발 사례로 연결하는 8가지 코딩 기본기",
  "author": "돌범"
};
