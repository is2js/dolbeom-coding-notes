# 같은 카드의 데이터 위치 바꾸기

하나의 강의 카드를 네 단계로 살펴봅니다. 이 폴더는 수업용 별도 예제입니다. 폴더를 통째로 복사해 사용하며, 예제의 시간은 실제 강의 시간표가 아닙니다.

1. **HTML 안 JSON:** HTML의 `<script type="application/json">`에 카드 데이터가 있습니다. 브라우저가 `JSON.parse`로 읽고 Alpine이 표시합니다.
2. **Python 리스트·딕셔너리:** FastAPI가 Python 데이터를 `/api/dict`에서 JSON 응답으로 보내고, 브라우저의 `fetch`가 가져와 같은 카드를 표시합니다.
3. **SQLite:** Python이 DB 행을 읽어 `/api/sqlite`에서 JSON 응답으로 보내고 같은 카드에 표시합니다.
4. **Jinja2:** 이번에는 FastAPI가 SQLite 데이터를 템플릿에 넣어 완성된 HTML을 `/sqlite`로 응답합니다. 브라우저는 서버가 만든 HTML을 표시합니다.

Tailwind CSS는 모양, Alpine.js는 브라우저에서 카드 표시와 버튼 펼치기를 돕습니다. 2~4 단계는 Python 서버가 필요합니다. GitHub Pages는 정적 파일을 제공할 뿐 FastAPI나 SQLite를 실행하지 않습니다.

## 1. HTML 안의 JSON 확인

`static/01-local-json.html`을 브라우저로 엽니다. Tailwind CSS와 Alpine.js는 CDN에서 불러오므로 인터넷 연결이 필요합니다. VS Code에서 HTML 안 `lesson-data`의 Git 제목을 바꾸어 저장하고 브라우저를 새로고침합니다. 데이터가 HTML 안에 들어 있고, `JSON.parse`가 문자열을 브라우저에서 다룰 수 있는 배열로 바꿉니다. 이 단계에 Python이나 Node 서버는 필요하지 않습니다.

VS Code의 Live Server 확장이 있다면 해당 파일을 우클릭해 **Open with Live Server**를 선택해도 됩니다. 단순 정적 페이지를 제공하고 저장 후 브라우저를 새로고침하는 도구입니다.

## 2. FastAPI 준비와 Python 데이터

`server-data` 폴더를 통째로 별도의 연습 위치에 복사하고 VS Code에서 폴더를 엽니다. Python 3.10 이상이 없다면 [Python Windows 설치 안내](https://docs.python.org/3/using/windows.html)를 확인해 설치합니다. 패키지 설치 시 인터넷이 필요합니다.

VS Code의 통합 PowerShell에서 `pwd`와 `ls`로 현재 폴더와 파일을 확인합니다. `pwd`는 Windows PowerShell의 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다. cmd에서는 위치 확인에 인수 없는 `cd`, 목록 확인에 `dir`을, macOS/Linux 기본 셸에서는 `pwd`, `ls`를 씁니다.

```powershell
pwd
ls
py -3 --version
Test-Path .\.venv
```

`main.py`, `sample_data.py`, `requirements.txt`, `templates`, `static`이 보이고 `Test-Path`가 `False`일 때만 다음을 실행합니다. `Test-Path`에는 PowerShell 기본 별칭이 없습니다. cmd의 존재 확인은 `if exist .venv echo 존재함`, macOS/Linux의 `test -e .venv`로 할 수 있으나 출력은 다릅니다. `.venv`가 이미 있으면 지우거나 덮어쓰지 말고 다른 연습 폴더를 씁니다.

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000
```

`py`가 없다면 설치한 Python 실행 이름과 버전을 확인합니다. `main:app`은 `main.py`에 만든 `app`이며 `127.0.0.1`은 내 컴퓨터를 가리킵니다. 서버 종료는 실행 중인 터미널에서 `Ctrl+C`입니다. 포트 8000을 이미 사용 중이면 서버와 브라우저 주소에서 같은 다른 포트를 선택합니다.

브라우저에서 [Python 데이터 카드](http://127.0.0.1:8000/static/02-dict-api.html)를 열고, 별도 탭에서 [Python 데이터 JSON 응답](http://127.0.0.1:8000/api/dict)을 살펴봅니다. `sample_data.py`에는 Python 리스트 안에 카드별 딕셔너리가 있습니다. FastAPI가 Python 데이터를 JSON 응답으로 만들고, HTML이 `fetch('/api/dict')`로 받아 카드를 채웁니다. Python 파일을 수정했다면 이 예제의 서버를 중지·재시작한 뒤 새로고침합니다.

**이 단계부터는 FastAPI 주소를 사용합니다.** 예를 들어 Live Server가 `:5500`에서 화면을 열면 `fetch('/api/dict')`도 `:5500`으로 요청하므로 `:8000`의 FastAPI에 닿지 않습니다. 이 예제는 FastAPI가 `/static`의 HTML·CSS·JavaScript와 `/api` 데이터를 함께 제공하므로 Live Server가 별도로 필요하지 않습니다. 혼동을 줄이려면 Live Server를 종료해도 되지만, 다른 포트로 실행 중이라면 반드시 종료할 필요는 없습니다. 두 서버를 나눠 연결하는 프로젝트는 별도 설정이 필요할 수 있습니다.

## 3. SQLite 준비와 카드 표시

서버는 켜 둔 채 **두 번째** PowerShell 터미널을 열고 같은 `server-data` 폴더인지 `pwd`로 확인합니다. `seed.py`는 Python 목록으로 SQLite 연습 DB를 준비합니다.

```powershell
pwd
.\.venv\Scripts\python.exe seed.py
```

같은 폴더의 `courses.sqlite3`는 DB 파일입니다. `lessons` 표에 데이터가 없을 때만 카드 행을 넣고, 이미 행이 있으면 덮어쓰거나 중복하지 않습니다. Python의 `sqlite3`는 표준 라이브러리라 별도 DB 서버가 필요하지 않습니다. [SQLite 공식 안내](https://docs.python.org/3/library/sqlite3.html)

[SQLite 데이터 카드](http://127.0.0.1:8000/static/03-sqlite-api.html)를 열면 같은 HTML 카드가 이번에는 `/api/sqlite`에서 DB 행을 JSON으로 받아 표시합니다. DB를 만들기 전이라면 준비 상태를 확인하라는 문구가 표시됩니다. 행을 추가한 뒤 새로고침합니다.

```powershell
.\.venv\Scripts\python.exe add_card.py
```

준비된 스크립트가 `마크다운` 카드를 추가합니다. 이미 있으면 중복하지 않고 기존 DB 데이터를 유지합니다. `/api/dict`는 Python 목록이므로 새 DB 행이 자동으로 나타나지 않습니다.

## 4. Jinja2 템플릿으로 변환

[서버 템플릿 카드](http://127.0.0.1:8000/sqlite)를 엽니다. FastAPI가 같은 SQLite 행을 읽어 `templates/cards.html`에 전달하고, Jinja2가 카드 구조를 반복한 **완성된 HTML**을 서버에서 만듭니다. 이 주소는 브라우저에서 카드 데이터를 fetch해 HTML을 조립하는 대신 서버가 만든 HTML을 받습니다. Alpine 버튼 동작은 HTML을 받은 뒤 브라우저에서 실행됩니다. [FastAPI 템플릿 문서](https://fastapi.tiangolo.com/advanced/templates/)

`/api/sqlite`와 `/sqlite`는 같은 DB를 읽지만 전자는 JSON, 후자는 HTML을 응답합니다. DB가 없으면 `seed.py`를 실행하라는 오류가 나옵니다. 기존 파일을 지우지 말고 원인을 확인하세요. 실습은 로컬 예시이며 계정·인증이나 운영 배포 구성을 포함하지 않습니다.
