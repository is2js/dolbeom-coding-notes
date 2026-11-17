// Published backend lesson before the hands-on route exercises.
export const previousFastapiRoutesDefault = {
  "id": "templates",
  "number": 9,
  "title": "데이터와 백엔드: HTML·Python·SQLite·템플릿",
  "shortTitle": "데이터·백엔드",
  "subtitle": "같은 카드의 데이터를 HTML, Python, DB로 옮기고 템플릿으로 출력합니다",
  "icon": "sparkles",
  "durationMinutes": 65,
  "case": {
    "kind": "example",
    "title": "카드 데이터는 HTML에만 있어야 할까요?",
    "body": "### 같은 카드, 달라지는 데이터 위치\n\n카드의 제목과 설명을 HTML에 직접 넣을 수도 있지만, 화면과 데이터가 늘어나면 관리 방법이 달라집니다. 같은 카드를 이용해 **HTML 안 JSON → 서버의 Python 리스트·딕셔너리 → SQLite DB → Jinja2 템플릿** 순서로 비교합니다. 이 사례는 수업용 예시입니다.",
    "question": "같은 카드 데이터가 어디에 저장되고 누가 HTML을 채울까요?"
  },
  "objectives": [
    "HTML 내부 JSON과 브라우저의 JSON.parse를 읽는다.",
    "Windows에서 Python을 확인하고 가상환경·패키지·FastAPI 서버를 준비한다.",
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
      "minutes": 25,
      "optional": false,
      "body": "### HTML 안의 데이터에서 Python 데이터로\n\n앞에서는 카드 데이터를 HTML 안에 넣었습니다. 이번에는 별도 Python 파일의 리스트와 딕셔너리에 보관합니다. `sample_data.py`의 예시입니다.\n\n```python\nLESSONS = [\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"},\n]\n```\n\nFastAPI는 `/api/dict` 요청을 받으면 이 Python 목록을 **JSON 응답**으로 바꿔 보냅니다. HTML의 `fetch('/api/dict')`가 응답을 가져오고 Alpine이 같은 카드에 표시합니다. 이제 이 요청에 답할 **Python 서버**를 우리 컴퓨터에 준비해 보겠습니다.\n\n### 1. 실습 폴더 열기\n\n앞 절에서 복사한 `server-data` 폴더 전체를 VS Code로 엽니다. 아직 없다면 [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP**으로 소스를 내려받거나 앞에서 배운 clone을 이용합니다. 그 안의 `public/examples/course-card/server-data` 폴더를 별도 연습 위치로 **통째로 복사**합니다. [서버 예제 파일 보기](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/server-data)\n\nVS Code의 **터미널 → 새 터미널**에서 PowerShell을 열고 아래를 실행합니다.\n\n```powershell\npwd\nls\n```\n\n현재 위치가 복사한 `server-data` 폴더이고 목록에 `main.py`, `sample_data.py`, `requirements.txt`, `static`, `templates`가 있는지 확인합니다. 다르면 탐색기에서 **그 폴더 자체를 VS Code로 열고** 터미널을 다시 엽니다. `pwd`는 Windows PowerShell의 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다. cmd에서는 인수 없는 `cd`와 `dir`, macOS/Linux 기본 셸에서는 `pwd`와 `ls`를 이용합니다.\n\n### 2. Python 설치와 버전 확인\n\n이번 예제는 **Windows의 Python 3.10 이상**을 기준으로 합니다. 아직 설치하지 않았다면 [Python 공식 다운로드](https://www.python.org/downloads/windows/)에서 Windows용 설치 안내에 따라 Python 설치 관리자를 설치하고 Python 3을 준비합니다. 설치 화면은 버전마다 달라질 수 있습니다. Python 설치 관리자 방식으로 준비한다면 터미널을 새로 열고 예를 들어 다음 명령으로 Python 3.12를 설치할 수 있습니다. 이미 Python 3.10 이상이 있다면 설치 명령은 건너뜁니다.\n\n```powershell\npy install 3.12\n```\n\n이 명령은 설치 관리자에서 제공하는 방법이며 인터넷이 필요합니다. 기존 방식의 설치 프로그램을 사용한다면 설치 화면의 안내와 공식 문서를 따릅니다. 설치 후 터미널을 새로 열고 다음을 입력합니다.\n\n```powershell\npy -3 --version\n```\n\n예를 들어 `Python 3.12.10`처럼 표시되면 됩니다. `py`가 없지만 Python이 설치되어 있다면 `python --version`으로 확인하고, 아래 가상환경 생성의 `py -3` 대신 확인된 `python`을 사용하세요. 둘 다 인식되지 않으면 설치 완료 여부, 터미널 재시작, Windows의 앱 실행 별칭·경로를 [Python Windows 공식 안내](https://docs.python.org/3/using/windows.html)에서 확인합니다. `Python 3`이라는 이름만으로 충분한 것이 아니라 **3.10 이상인지 숫자까지 확인**합니다.\n\n### 3. 프로젝트 전용 가상환경 만들기\n\n**가상환경**은 이 프로젝트에 필요한 Python 패키지를 다른 프로젝트와 분리해 두는 폴더입니다. 서버 실행에 반드시 필요한 것은 아니지만, 패키지가 서로 충돌하지 않도록 이 강의에서는 사용합니다. `venv`는 Python에 포함된 기능이라 별도 설치 없이 폴더를 만듭니다.\n\n먼저 같은 폴더에서 `.venv`가 이미 있는지 확인합니다.\n\n```powershell\nTest-Path .\\.venv\n```\n\n`False`일 때만 다음 명령으로 만듭니다. 이미 `True`라면 기존 환경을 덮어쓰지 말고 새 연습 폴더를 복사해 진행합니다. `Test-Path`에는 기본 별칭이 없습니다. cmd에서는 `if exist .venv echo 존재함`, macOS/Linux 셸에서는 `test -e .venv`로 존재를 확인할 수 있지만 출력 방식은 다릅니다.\n\n```powershell\npy -3 -m venv .venv\n```\n\n`py` 대신 `python`으로 버전을 확인했다면 `python -m venv .venv`를 실행합니다. `-m venv`는 선택한 Python에 포함된 가상환경 생성 기능을 실행하라는 뜻입니다. 정상 생성되면 같은 폴더에 `.venv`가 생기고 다시 확인할 때 `True`가 나옵니다.\n\n### 4. 가상환경 활성화와 패키지 설치\n\nPowerShell에서 다음을 입력해 이 터미널이 가상환경의 Python을 사용하도록 합니다.\n\n```powershell\n.\\.venv\\Scripts\\Activate.ps1\npython -c \"import sys; print(sys.executable)\"\n```\n\n프롬프트 앞에 보통 `(.venv)`가 나타나고, 출력 경로가 복사한 `server-data\\.venv\\Scripts\\python.exe`를 가리키는지 확인합니다. 표시가 보이더라도 **경로까지 확인**하면 사용 중인 Python을 확실히 알 수 있습니다. 가상환경 활성화는 이 터미널에만 적용됩니다.\n\n이제 프로젝트에 필요한 FastAPI·Uvicorn·Jinja2를 `requirements.txt`에 적힌 조건에 맞춰 설치합니다. 인터넷이 필요하며, 아래 명령은 **활성화한 터미널**에서 실행합니다.\n\n```powershell\npython -m pip install -r requirements.txt\n```\n\n`pip`은 Python 패키지 설치 도구이고 `-r requirements.txt`는 필요한 패키지 목록을 읽으라는 뜻입니다. `python -m pip`는 지금 선택된 Python에 연결된 pip을 실행합니다. 설치 후 다음으로 확인해 봅니다.\n\n```powershell\npython -m pip show fastapi uvicorn jinja2\n```\n\n설치 정보가 나오면 다음으로 넘어갑니다. 패키지 이름을 찾지 못했다면 인터넷, 현재 폴더와 위 Python 경로를 확인하고 설치 결과의 오류를 읽습니다.\n\n**활성화가 차단된다면:** 회사 PC 등의 PowerShell 실행 정책 때문에 `Activate.ps1`이 실행되지 않을 수 있습니다. 정책을 바꾸지 않아도 아래처럼 `.venv` 안의 Python을 **직접 지정**해 설치와 실행을 계속할 수 있습니다. 활성화 성공 시에는 아래 대안 명령을 다시 실행할 필요가 없습니다.\n\n```powershell\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n.\\.venv\\Scripts\\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000\n```\n\n직접 경로로 서버를 시작했다면 다음 단계의 실행 명령은 생략하고 주소 확인으로 넘어갑니다. [Python 가상환경 공식 안내](https://docs.python.org/3/library/venv.html)\n\n### 5. FastAPI 서버 실행과 화면 확인\n\n활성화에 성공했다면 같은 터미널에서 서버를 시작합니다.\n\n```powershell\npython -m uvicorn main:app --host 127.0.0.1 --port 8000\n```\n\nUvicorn은 FastAPI 앱을 실행해 브라우저의 요청을 받는 서버입니다. `main:app`은 `main.py`의 `app`, `127.0.0.1`은 내 컴퓨터, `8000`은 접속할 포트입니다. 터미널에 실행 안내가 나오면 **서버를 켜 둔 채** 다음 두 주소를 각각 엽니다.\n\n1. [Python 데이터 카드](http://127.0.0.1:8000/static/02-dict-api.html): 데이터를 받아 표시한 화면\n2. [JSON 응답](http://127.0.0.1:8000/api/dict): Python 목록이 변환된 데이터\n\n이 단계에서는 FastAPI가 정적 화면과 API를 함께 제공하므로 Live Server는 **별도로 필요하지 않습니다**. 주소를 헷갈리지 않게 VS Code 명령 팔레트에서 **Live Server: Stop Live Server**로 중지해도 됩니다. Live Server의 `:5500`으로 열면 `fetch('/api/dict')`도 `:5500`으로 요청하므로 FastAPI의 `:8000`에 자동으로 연결되지 않습니다. 두 서버를 따로 연결하는 프로젝트는 별도 설정이 필요합니다.\n\n서버가 켜진 터미널에서 `Ctrl+C`를 누르면 종료됩니다. 이 명령에는 자동 재시작 옵션이 없으므로 Python 코드를 수정한 뒤에는 서버를 종료하고 같은 실행 명령으로 다시 켭니다. HTML·CSS·JavaScript를 수정했다면 저장 후 FastAPI 주소에서 새로고침합니다. `8000` 포트가 이미 사용 중이면 서버를 중지하고 실행 명령의 포트를 `8001`로 바꾼 뒤 브라우저 주소도 `:8001`로 바꾸세요. [FastAPI 서버 실행 안내](https://fastapi.tiangolo.com/deployment/manually/)\n\n다음 SQLite 실습에서는 이 서버를 켜 둔 채 **두 번째 터미널**에서 DB 준비 스크립트를 실행합니다. GitHub Pages는 정적 파일만 제공하며 Python 서버를 실행하지 않습니다. 이 단계에서 `npm run dev`는 필요하지 않습니다.",
      "presentationPoints": [
        "Python 3.10 이상과 실습 폴더를 확인한 뒤 .venv를 만듭니다.",
        "가상환경을 활성화하고 패키지를 설치한 뒤 FastAPI 서버를 켭니다.",
        "FastAPI 주소에서 카드·JSON을 확인하고 Ctrl+C로 종료합니다."
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
      "title": "Python 확인부터 가상환경·FastAPI 실행까지",
      "description": "복사한 server-data 폴더에서 Python을 확인하고 .venv를 만들어 활성화한 뒤 필요한 패키지와 서버를 준비합니다.",
      "scene": "terminal",
      "code": "pwd\nls\npy -3 --version\nTest-Path .\\.venv\n# False일 때만 생성\npy -3 -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -c \"import sys; print(sys.executable)\"\npython -m pip install -r requirements.txt\npython -m uvicorn main:app --host 127.0.0.1 --port 8000",
      "language": "powershell",
      "output": "(.venv) Python 경로를 확인하고 FastAPI 주소에서 카드와 JSON을 확인합니다.",
      "focus": "backend",
      "fileName": "server-data · PowerShell",
      "files": [
        "main.py",
        "sample_data.py",
        "requirements.txt",
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
    "Python 버전과 가상환경을 확인하고 FastAPI 서버를 실행·종료한다.",
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
    },
    {
      "title": "가상환경은 터미널마다 확인합니다",
      "body": "새 탭에서는 활성화가 이어지지 않습니다. .venv의 Python 경로를 직접 사용하거나 그 탭에서 다시 활성화합니다."
    },
    {
      "title": "가상환경 활성화가 막히면",
      "body": "PowerShell 실행 정책을 변경하지 않고 .venv\\Scripts\\python.exe를 직접 지정해 같은 가상환경을 사용할 수 있습니다."
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
    },
    {
      "term": "venv 가상환경",
      "definition": "Python 프로젝트별 패키지를 분리해 관리하기 위해 만드는 환경입니다."
    },
    {
      "term": "pip",
      "definition": "선택한 Python 환경에 필요한 패키지를 설치하는 도구입니다."
    },
    {
      "term": "Uvicorn",
      "definition": "FastAPI 앱을 실행해 브라우저의 HTTP 요청을 처리하는 서버입니다."
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
    },
    {
      "title": "Python Windows 설치",
      "url": "https://docs.python.org/3/using/windows.html"
    },
    {
      "title": "Python 가상환경",
      "url": "https://docs.python.org/3/library/venv.html"
    }
  ],
  "closing": "HTML 내부 JSON에서 시작해 Python과 SQLite 데이터를 JSON으로 가져왔고, 마지막에는 같은 DB 데이터를 템플릿으로 HTML에 채웠습니다.",
  "presentation": {
    "caseSummary": "같은 카드의 데이터 위치를 HTML 안 JSON → 서버 Python → SQLite로 바꾸고, 마지막에 Jinja 템플릿으로 출력합니다.",
    "demo": {
      "program": "VS Code · PowerShell · 브라우저",
      "file": "static/01-local-json.html · sample_data.py · courses.sqlite3 · templates/cards.html",
      "command": "HTML 안 JSON 수정 → Live Server 정적 카드 확인\nPython 확인 → .venv 생성·활성화 → 패키지 설치 → FastAPI 실행\nFastAPI의 :8000 화면과 /api/dict JSON 확인\n두 번째 터미널에서 seed.py → /api/sqlite 확인 → add_card.py\n/sqlite에서 Jinja HTML 응답 확인",
      "expectedResult": "가상환경에서 FastAPI를 실행하고 Python·SQLite 데이터와 Jinja HTML을 같은 카드로 확인합니다.",
      "durationMinutes": 12
    },
    "returnSummary": "정적 카드에는 Live Server를 쓰고, FastAPI가 화면·API·템플릿을 제공하는 단계에서는 FastAPI 주소로 전환했습니다."
  }
};
