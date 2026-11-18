# 같은 카드의 데이터 위치 바꾸기

하나의 강의 카드를 네 단계로 살펴봅니다. 이 폴더는 수업용 별도 예제입니다. 폴더를 통째로 복사해 사용하며, 예제의 시간은 실제 강의 시간표가 아닙니다.

1. **HTML 안 JSON:** HTML의 `<script type="application/json">`에 카드 데이터가 있습니다. 브라우저가 `JSON.parse`로 읽고 Alpine이 표시합니다.
2. **Python 리스트·딕셔너리:** FastAPI가 Python 데이터를 `/api/dict`에서 JSON 응답으로 보내고, 브라우저의 `fetch`가 가져와 같은 카드를 표시합니다.
3. **SQLite:** Python이 DB 행을 읽어 `/api/sqlite`에서 JSON 응답으로 보내고 같은 카드에 표시합니다.
4. **Jinja2:** 이번에는 FastAPI가 SQLite 데이터를 템플릿에 넣어 완성된 HTML을 `/sqlite`로 응답합니다. 브라우저는 서버가 만든 HTML을 표시합니다.

Tailwind CSS는 모양, Alpine.js는 브라우저에서 카드 표시와 버튼 펼치기를 돕습니다. 2~4 단계는 Python 서버가 필요합니다. GitHub Pages는 정적 파일을 제공할 뿐 FastAPI나 SQLite를 실행하지 않습니다. 이 실습에서는 복사한 폴더에 `practice.py`를 **직접 새로 작성**합니다. `practice_complete.py`는 모든 단계를 끝낸 참고용 완성본이며, `main.py` 역시 기존 완성본이므로 덮어쓰지 않습니다.

## 1. HTML 안의 JSON 확인

`static/01-local-json.html`을 브라우저로 엽니다. Tailwind CSS와 Alpine.js는 CDN에서 불러오므로 인터넷 연결이 필요합니다. VS Code에서 HTML 안 `lesson-data`의 Git 제목을 바꾸어 저장하고 브라우저를 새로고침합니다. 데이터가 HTML 안에 들어 있고, `JSON.parse`가 문자열을 브라우저에서 다룰 수 있는 배열로 바꿉니다. 이 단계에 Python이나 Node 서버는 필요하지 않습니다.

VS Code의 Live Server 확장이 있다면 해당 파일을 우클릭해 **Open with Live Server**를 선택해도 됩니다. 단순 정적 페이지를 제공하고 저장 후 브라우저를 새로고침하는 도구입니다.

## 2. FastAPI 준비와 Python 데이터

### 2-1. Python 확인과 설치

이 예제는 **Windows와 Python 3.10 이상**을 기준으로 설명합니다. PowerShell에서 다음 명령으로 설치된 버전을 확인합니다.

```powershell
py -3 --version
```

`Python 3.12.5`처럼 `3.10` 이상의 버전이 나오면 다음 단계로 진행합니다. 숫자는 설치된 버전에 따라 다릅니다. `py`를 찾지 못하면 `python --version`도 실행해 보세요. 이 명령으로 Python 3.10 이상이 확인되면 아래 가상환경 생성 명령에서 `py -3` 대신 `python`을 사용합니다.

Python이 없거나 버전이 낮다면 [Python 공식 다운로드](https://www.python.org/downloads/windows/)에서 Windows용 Python을 설치한 뒤 터미널을 새로 열고 버전을 다시 확인합니다. 설치 화면과 명령 등록 방법은 설치 방식에 따라 달라질 수 있습니다. [Windows에서 Python 사용하기](https://docs.python.org/3/using/windows.html)

VS Code에서 `Ctrl+Shift+X`로 확장을 열고 게시자가 Microsoft인 **Python** 확장을 설치합니다. 가상환경을 만든 다음 `Ctrl+Shift+P`에서 **Python: Select Interpreter**를 선택하고 `.venv`를 고릅니다. [VS Code Python 안내](https://code.visualstudio.com/docs/languages/python/)

### 2-2. 실습 폴더 확인

강의노트 저장소에서 `public/examples/course-card/server-data` 폴더를 **통째로 별도의 연습 위치에 복사**하고, VS Code에서 복사한 `server-data` 폴더를 엽니다. VS Code 메뉴 **터미널 → 새 터미널**에서 PowerShell을 열고 다음을 실행합니다.

```powershell
pwd
ls
Test-Path .\.venv
```

`pwd`는 현재 위치, `ls`는 파일 목록을 보여 줍니다. Windows PowerShell에서는 각각 `Get-Location`, `Get-ChildItem`의 기본 별칭입니다. cmd에서는 각각 인수 없는 `cd`, `dir`을 쓰고, macOS/Linux 기본 셸에서는 `pwd`, `ls`를 사용합니다. 같은 이름이라도 셸마다 옵션과 출력이 다를 수 있습니다.

목록에 `main.py`, `sample_data.py`, `requirements.txt`, `templates`, `static`이 보이는지 확인하세요. `Test-Path`는 `.venv`가 있으면 `True`, 없으면 `False`를 표시합니다. 이 명령에는 PowerShell 기본 별칭이 없습니다. cmd에서는 `if exist .venv echo 존재함`, macOS/Linux에서는 `test -e .venv`로 존재 여부를 확인할 수 있지만 출력 방식은 다릅니다. **`False`일 때만** 다음 단계에서 가상환경을 만듭니다. 이미 존재하면 삭제하거나 덮어쓰지 말고 다른 연습 폴더를 사용합니다.

### 2-3. 가상환경 만들기와 켜기

가상환경은 이 프로젝트에 필요한 Python 패키지를 다른 프로젝트와 나누어 두는 폴더입니다. FastAPI 실행에 무조건 필요한 것은 아니지만, 패키지 버전이 섞이지 않도록 이 실습에서 사용합니다. 같은 `server-data` 폴더의 PowerShell에서 실행합니다.

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -c "import sys; print(sys.executable)"
```

첫 줄은 Python에 포함된 `venv` 기능으로 `.venv` 폴더를 만듭니다. 둘째 줄은 **현재 터미널**에 가상환경을 활성화합니다. 보통 입력 줄 앞에 `(.venv)`가 표시됩니다. 셋째 줄의 경로 끝이 `server-data\.venv\Scripts\python.exe`인지 확인하세요. `py` 대신 `python --version`으로 확인한 경우 첫 줄을 `python -m venv .venv`로 바꿉니다.

PowerShell에서 스크립트 실행이 차단되어 활성화가 실패할 수 있습니다. 그때는 실행 정책을 바꾸지 않아도 됩니다. 아래의 `python` 대신 매번 `.\.venv\Scripts\python.exe`를 사용하면 같은 가상환경에서 실행할 수 있습니다. 예를 들어 패키지 설치는 `.\.venv\Scripts\python.exe -m pip install -r requirements.txt`입니다. [Python 가상환경 안내](https://docs.python.org/3/library/venv.html)

### 2-4. 필요한 패키지 설치와 첫 번째 라우트 작성

활성화한 터미널에서, 인터넷에 연결된 상태로 다음을 실행합니다.

```powershell
python -m pip install -r requirements.txt
```

이 명령은 `requirements.txt`에 적힌 FastAPI·Uvicorn·Jinja2를 **이 가상환경에** 설치합니다. 패키지 설치에 실패했다면 인터넷 연결과 Python·pip 오류 메시지를 먼저 확인하세요.

가상환경 활성화에 실패했다면 아래처럼 가상환경의 Python 경로를 직접 사용하세요.

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

VS Code에서 이 복사본 안에 새 파일 `practice.py`를 만들고 [강의 본문의 첫 번째 서버 코드](https://is2js.github.io/dolbeom-coding-notes/#/lesson/templates/section-backend-python)를 입력해 저장합니다. 이미 `practice.py`가 있다면 덮어쓰지 말고 새 연습 폴더에서 시작합니다. 첫 코드는 `FastAPI()`로 앱을 만들고, `/static`에 HTML 폴더를 연결하며, `/api/dict` 요청에 `sample_data.py`의 Python 데이터를 반환합니다.

```powershell
python -m uvicorn practice:app
```

`practice:app`은 **`practice.py` 안의 `app`**을 뜻하며 `127.0.0.1`은 내 컴퓨터를 가리킵니다. 시작 메시지가 나온 뒤에는 이 터미널을 열어 둡니다. 가상환경을 활성화하지 않았다면 `python` 대신 `.\.venv\Scripts\python.exe`를 사용합니다.

서버를 중지할 때는 서버가 실행 중인 터미널을 선택하고 `Ctrl+C`를 누릅니다. 활성화한 가상환경에서 나갈 때는 서버를 중지한 뒤 `deactivate`를 입력합니다. 포트 `8000`을 이미 사용 중이면 `--port 8001`처럼 다른 포트를 정하고 브라우저 주소도 같은 번호로 바꿉니다. [FastAPI 서버 실행 안내](https://fastapi.tiangolo.com/deployment/manually/)

브라우저에서 [Python 데이터 카드](http://127.0.0.1:8000/static/02-dict-api.html)를 열고, 별도 탭에서 [Python 데이터 JSON 응답](http://127.0.0.1:8000/api/dict)을 살펴봅니다. `sample_data.py`에는 Python 리스트 안에 카드별 딕셔너리가 있습니다. FastAPI가 Python 데이터를 JSON 응답으로 만들고, HTML이 `fetch('/api/dict')`로 받아 카드를 채웁니다. Python 파일을 수정했다면 이 예제의 서버를 중지·재시작한 뒤 새로고침합니다.

**이 단계부터는 FastAPI 주소를 사용합니다.** 예를 들어 Live Server가 `:5500`에서 화면을 열면 `fetch('/api/dict')`도 `:5500`으로 요청하므로 `:8000`의 FastAPI에 닿지 않습니다. 이 예제는 FastAPI가 `/static`의 HTML·CSS·JavaScript와 `/api` 데이터를 함께 제공하므로 Live Server가 별도로 필요하지 않습니다. 혼동을 줄이려면 Live Server를 종료해도 되지만, 다른 포트로 실행 중이라면 반드시 종료할 필요는 없습니다. 두 서버를 나눠 연결하는 프로젝트는 별도 설정이 필요할 수 있습니다.

## 3. SQLite 준비와 카드 표시

서버는 켜 둔 채 **두 번째** PowerShell 터미널을 열고 같은 `server-data` 폴더인지 `pwd`로 확인합니다. `seed.py`는 Python 목록으로 SQLite 연습 DB를 준비합니다.

```powershell
pwd
.\.venv\Scripts\python.exe seed.py
```

같은 폴더의 `courses.sqlite3`는 DB 파일입니다. `lessons` 표에 데이터가 없을 때만 카드 행을 넣고, 이미 행이 있으면 덮어쓰거나 중복하지 않습니다. Python의 `sqlite3`는 표준 라이브러리라 별도 DB 서버가 필요하지 않습니다. [SQLite 공식 안내](https://docs.python.org/3/library/sqlite3.html)

[강의의 두 번째 코드](https://is2js.github.io/dolbeom-coding-notes/#/lesson/templates/section-backend-sqlite)를 `practice.py` **맨 아래에 추가**해 DB를 읽는 함수와 `/api/sqlite` 경로를 만듭니다. 파일을 저장하고 서버 터미널에서 `Ctrl+C`로 중지한 뒤 `python -m uvicorn practice:app`으로 다시 켭니다. 활성화하지 않은 터미널에서는 `python` 대신 `.\.venv\Scripts\python.exe`를 사용합니다.

[SQLite 데이터 카드](http://127.0.0.1:8000/static/03-sqlite-api.html)를 열면 같은 HTML 카드가 이번에는 `/api/sqlite`에서 DB 행을 JSON으로 받아 표시합니다. DB를 만들기 전이라면 준비 상태를 확인하라는 문구가 표시됩니다. 행을 추가한 뒤 새로고침합니다.

```powershell
.\.venv\Scripts\python.exe add_card.py
```

준비된 스크립트가 `마크다운` 카드를 추가합니다. 이미 있으면 중복하지 않고 기존 DB 데이터를 유지합니다. `/api/dict`는 Python 목록이므로 새 DB 행이 자동으로 나타나지 않습니다.

## 4. Jinja2 템플릿으로 변환

[강의의 세 번째 코드](https://is2js.github.io/dolbeom-coding-notes/#/lesson/templates/section-web-jinja)를 `practice.py` **맨 아래에 추가**해 템플릿과 `/sqlite` 경로를 연결하고 저장한 뒤 서버를 다시 켭니다. [서버 템플릿 카드](http://127.0.0.1:8000/sqlite)를 엽니다. FastAPI가 같은 SQLite 행을 읽어 `templates/cards.html`에 전달하고, Jinja2가 카드 구조를 반복한 **완성된 HTML**을 서버에서 만듭니다. 이 주소는 브라우저에서 카드 데이터를 fetch해 HTML을 조립하는 대신 서버가 만든 HTML을 받습니다. Alpine 버튼 동작은 HTML을 받은 뒤 브라우저에서 실행됩니다. [FastAPI 템플릿 문서](https://fastapi.tiangolo.com/advanced/templates/)

`/api/sqlite`와 `/sqlite`는 같은 DB를 읽지만 전자는 JSON, 후자는 HTML을 응답합니다. DB가 없으면 `seed.py`를 실행하라는 오류가 나옵니다. 기존 파일을 지우지 말고 원인을 확인하세요. 실습은 로컬 예시이며 계정·인증이나 운영 배포 구성을 포함하지 않습니다.
