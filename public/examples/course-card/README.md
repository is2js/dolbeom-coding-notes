# 강의 카드 공통 실습

이 폴더는 각 주제의 실제 사례와 별개로 준비한 수업용 예제입니다. Markdown·IDE·프론트엔드·템플릿에서 강의 카드를 살펴봅니다. Git 기초는 이 카드 대신 별도의 텍스트 파일로 연습합니다. 이 자료는 강사가 준비한 결과물입니다. 수업에서는 앞서 사용한 `git-practice` 폴더에 직접 파일을 만들며, 기존 파일이 있으면 내용을 먼저 확인합니다. 이 예제의 카드 시간은 이해를 돕는 가상 숫자이며 실제 강의 시간표와 다를 수 있습니다.

## 단계별 파일

1. `01-html/index.html`: 제목·버튼·설명만 있는 HTML. 버튼은 아직 동작하지 않습니다.
2. `02-css/index.html`: `style.css`를 연결해 24px 여백과 카드 모양을 추가합니다.
3. [JavaScript 완성 카드](03-javascript/index.html): `script.js`를 연결해 버튼으로 설명을 펼치고 접습니다.
4. `04-tailwind/index.html`·`05-alpine/index.html`: CDN에서 Tailwind CSS·Alpine.js를 불러와 같은 카드를 비교합니다. 인터넷 연결이 필요합니다.
5. `04-vite-dev/`: 프론트엔드 개발 서버 설정을 살펴보는 참고 예제입니다. 수업에서는 `git-practice`에서 이어서 실습합니다.
6. `server-data/static/01-local-json.html`: HTML 안의 JSON을 브라우저에서 읽는 정적 예제입니다. 이어 `server-data/README.md`를 따라 FastAPI의 Python 딕셔너리·SQLite API와 Jinja 템플릿을 확인합니다.
7. `template-preview.html`: GitHub Pages에서도 볼 수 있는 정적 비교 화면입니다. 직접 작성한 CSS·JavaScript와 Tailwind·Alpine 카드를 나란히 눌러 보고 코드도 펼쳐 볼 수 있습니다. Git 제목은 HTML에 미리 들어 있으므로 서버 템플릿을 실제로 실행한 결과는 아닙니다. `p-6`은 Tailwind 기본 테마와 브라우저의 기본 16px 글자 크기에서 24px입니다.
8. `server/`: FastAPI가 전달한 데이터를 Jinja2가 HTML로 만들고 Tailwind와 Alpine이 브라우저에서 적용되는 독립 실행 예제입니다.

HTML·CSS·JavaScript 단계별 결과는 브라우저에서 직접 확인할 수 있습니다. 수업에서는 VS Code의 Live Server 확장에서 HTML 파일을 우클릭해 **Open with Live Server**를 선택하고 저장한 변화를 확인합니다. 확장이 없으면 파일을 직접 열고 저장 후 새로고침해도 됩니다. Live Server는 별도 확장이고 FastAPI 백엔드를 실행하지 않습니다.

## 작업 흐름

- 터미널에서는 `git-practice` 연습 폴더의 위치와 파일 목록을 확인합니다. Windows PowerShell에서 `Get-Location` 또는 기본 별칭 `pwd`, `Get-ChildItem` 또는 기본 별칭 `ls`, `Set-Location` 또는 기본 별칭 `cd`를 사용할 수 있습니다. macOS 기본 셸의 `pwd`, `ls`, `cd`는 별도 명령이고 Windows cmd에서는 위치 확인 `cd`, 목록 `dir`, 이동 `cd`를 사용합니다. 이름이 같더라도 옵션과 출력은 다를 수 있습니다.
- Git은 `git-practice` 폴더에서 저장소와 .git을 확인하고 메모 파일의 저장·스테이징·커밋을 익힙니다. 버전 1·2의 차이를 비교하고 이전 기록을 본 뒤 main으로 돌아옵니다. 기존 폴더나 사용자 파일은 덮어쓰지 않습니다.
- GitHub에서의 원격 저장과 clone은 앞 강의에서 만든 `git-practice/note.txt` 저장소로 연습합니다. 준비된 예제 파일을 내려받더라도 자동으로 Git 기록이나 원격 연결이 생기지는 않습니다.
- Markdown에서는 앞서 만든 `git-practice`의 README를 작성하고, VS Code에서 원문과 미리보기를 확인합니다. 이 파일은 강의 카드 예제의 실행 안내입니다.

## FastAPI·Jinja2 예제 실행 (선택 실습)

첫 터미널 강의에서는 설치하거나 실행할 필요가 없습니다. 이 단계는 Python이 준비된 **별도 연습 폴더**에서 진행하며, VS Code의 Live Server와 다릅니다. `course-card` 폴더 전체를 복사한 뒤 그 안의 `server` 폴더를 VS Code의 통합 터미널 또는 Windows Terminal PowerShell에서 엽니다. 저장소를 신뢰할 수 있는지, 명령과 설치할 패키지를 먼저 확인합니다.

```powershell
pwd
# Python이 설치된 환경에서:
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000
```

브라우저에서 `http://127.0.0.1:8000/lessons`을 열면 윈도우 터미널과 Git 카드가 보입니다. `/`에서도 같은 카드를 확인할 수 있습니다. 설명 보기 버튼을 클릭하거나 Enter·Space를 눌러 펼침을 확인합니다. 종료하려면 서버를 실행한 터미널에서 `Ctrl+C`를 누릅니다. Python 실행 이름이나 가상환경 경로는 환경마다 다를 수 있습니다. `pwd`는 Windows PowerShell의 `Get-Location` 기본 별칭이며 cmd에서는 인수 없는 `cd`, macOS의 Bash·zsh에서는 `pwd`로 위치를 확인합니다.

서버가 켜지지 않으면 현재 위치가 `server`인지, Python과 패키지가 설치되었는지, 8000번 포트를 이미 다른 프로그램이 사용 중인지 확인합니다. 포트를 바꾸었다면 브라우저 주소에도 같은 포트를 씁니다. 필요한 경우 오류 메시지에서 개인 정보를 지우고 도움을 요청합니다. 프로젝트 코드를 수정했다면 서버를 다시 시작한 후 새로고침합니다. 자동 재시작 설정은 이 기본 명령에 포함하지 않았습니다.

`main.py`의 `lessons`가 데이터, `server/templates/cards.html`의 `{{ lesson.title }}`과 반복이 HTML 생성, `p-6` 등이 Tailwind CSS, `x-data`·`@click`·`x-show`가 브라우저의 Alpine 동작입니다. 새로고침 시 펼침 상태는 초기화됩니다. 서버는 로컬에서만 열리며 인터넷 공개나 영구 저장 기능은 없습니다.

## 사용된 라이브러리

카드 실습은 HTML의 `<script>` 태그로 Tailwind CSS 3.4.17 Play CDN과 Alpine.js 3.14.9 CDN을 불러옵니다. Node.js 설치 없이 시작할 수 있지만, 처음 열 때와 새로고침할 때 CDN에 접근할 수 있어야 합니다. 연결이 실패하면 스타일이나 버튼 동작이 빠질 수 있습니다.

CDN은 파일을 인터넷에서 전달하는 서비스입니다. Tailwind Play CDN은 개발·학습용입니다. 실제 배포 프로젝트에서는 공식 설치 안내에 따라 사용하는 클래스의 CSS를 빌드해 사이트 자산으로 제공하세요. Alpine은 필요에 따라 패키지로 설치해 프로젝트 빌드에 포함하거나 신뢰할 수 있는 CDN의 고정 버전을 사용할 수 있습니다. 기존 `static` 폴더의 파일은 이전 예제와 라이선스 참고용으로 남겨 두었으며 현재 카드 단계에서는 불러오지 않습니다.
