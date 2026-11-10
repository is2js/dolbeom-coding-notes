# 강의 카드 공통 실습

이 폴더는 각 주제의 실제 사례와 별개로 준비한 수업용 예제입니다. Markdown·IDE·프론트엔드·템플릿에서 강의 카드를 살펴봅니다. Git 기초는 이 카드 대신 별도의 텍스트 파일로 연습합니다. 압축 파일을 받았다면 압축을 풀고 이 폴더 전체를 별도의 연습 위치에 복사해서 사용합니다. 기존 파일은 덮어쓰지 마세요. 이 예제의 카드 시간은 이해를 돕는 가상 숫자이며 실제 강의 시간표와 다를 수 있습니다.

## 단계별 파일

1. `01-html/index.html`: 제목·버튼·설명만 있는 HTML. 버튼은 아직 동작하지 않습니다.
2. `02-css/index.html`: `style.css`를 연결해 24px 여백과 카드 모양을 추가합니다.
3. `03-javascript/index.html`: `script.js`를 연결해 버튼으로 설명을 펼치고 접습니다.
4. `template-preview.html`: GitHub Pages에서도 볼 수 있는 정적 비교 화면입니다. 직접 작성한 CSS·JavaScript와 Tailwind·Alpine 카드를 나란히 눌러 보고 코드도 펼쳐 볼 수 있습니다. Git 제목은 HTML에 미리 들어 있으므로 서버 템플릿을 실제로 실행한 결과는 아닙니다. `p-6`은 Tailwind 기본 테마와 브라우저의 기본 16px 글자 크기에서 24px입니다.
5. `server/`: FastAPI가 전달한 데이터를 Jinja2가 HTML로 만들고 Tailwind와 Alpine이 브라우저에서 적용되는 독립 실행 예제입니다.

`01-html`부터 `03-javascript`까지는 브라우저에서 HTML 파일을 직접 열 수 있습니다. VS Code에서 수정한 뒤 저장하고 브라우저를 새로고침합니다. 선택적으로 사전 설치한 Live Server 확장에서 HTML 파일을 우클릭해 **Open with Live Server**를 선택할 수 있습니다. Live Server는 별도 확장이고 FastAPI 백엔드를 실행하지 않습니다.

## 작업 흐름

- 터미널에서는 별도 연습 폴더의 위치와 파일 목록을 확인합니다. Windows PowerShell에서 `Get-Location` 또는 기본 별칭 `pwd`, `Get-ChildItem` 또는 기본 별칭 `ls`, `Set-Location` 또는 기본 별칭 `cd`를 사용할 수 있습니다. macOS 기본 셸의 `pwd`, `ls`, `cd`는 별도 명령이고 Windows cmd에서는 위치 확인 `cd`, 목록 `dir`, 이동 `cd`를 사용합니다. 이름이 같더라도 옵션과 출력은 다를 수 있습니다.
- Git은 이 카드와 별개의 **새 빈 연습 폴더**에서 저장소와 .git을 확인하고 메모 파일의 저장·스테이징·커밋을 익힙니다. 버전 1·2의 차이를 비교하고 이전 기록을 본 뒤 main으로 돌아옵니다. 기존 폴더나 사용자 파일은 덮어쓰지 않습니다.
- GitHub에서의 원격 저장과 clone은 강사가 준비한 별도 저장소의 실제 주소로 연습합니다. 이 폴더만 내려받았다고 자동으로 Git 기록이나 원격 연결이 생기지는 않습니다.
- Markdown에서는 이 README를 읽고, VS Code의 Windows 기본 키 `Ctrl+K` 다음 `V`로 원문과 미리보기를 나란히 확인합니다.

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

`static/course.css`는 수업에 사용한 Tailwind CSS 3 유틸리티를 미리 생성한 파일입니다. `static/alpine.js`는 Alpine.js 브라우저 배포 파일입니다. 관련 라이선스는 같은 폴더의 LICENSE 파일을 확인합니다. 두 파일이 준비되어 있어 정적 카드 예제를 확인할 때 Node.js는 필요하지 않습니다.
