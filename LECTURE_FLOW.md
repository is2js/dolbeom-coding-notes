# 강의 흐름과 내용 수정 안내

2026-10-26에 전달받은 개요를 기준으로 만든 편집용 초안입니다. 강의 제목과 세부 표현은 계속 바꿀 수 있습니다. 실제 Codex 경험을 아직 전달받지 않은 도입은 **교체용 예시**로 표시했습니다.

## 강의처럼 진행하면서 수정하세요

1. [강의 연습](http://127.0.0.1:5188/#/lesson/terminal/case)을 열고 주제를 선택합니다.
2. **시작 사례부터 읽고 다음 설명**으로 이동합니다. 왼쪽 현재 위치·가운데 그림·오른쪽 본문은 같은 절을 가리킵니다. 좁은 화면은 위의 현재 설명 선택 메뉴와 화살표를 사용합니다.
3. **이 내용 수정 → 수정 → 이 내용으로 연습**을 누르면 저장을 확인한 뒤 같은 절로 돌아옵니다. 본문이 아직 저장될 수 없는 상태라면 편집기에 남아 오류를 고칠 수 있습니다.

중앙 **관련 예제 재현**은 선택한 절의 코드·출력만 보여 줍니다. 세부절이 바뀌면 그림과 예제 묶음도 바뀝니다. **이 위치에서 발표**로 현재 절부터 발표를 시작할 수도 있습니다.

터미널 도입은 **실제 Codex 프롬프트 입력 장면의 영상·시연 자리 표시**입니다. 아직 영상은 등록되지 않았으며 프롬프트는 강사가 실제 장면을 준비하며 교체합니다.

터미널의 네 본편 절은 다음 순서로 연습합니다.

1. **위치·GUI 전환·폴더:** `Get-Location`과 `pwd` → 실제 경로만 복사해 Win+R에 붙여 넣기 또는 PowerShell에서 `explorer.exe .` → `Get-ChildItem`과 `ls` → 실제 연습용 부모 폴더로 `Set-Location` 또는 `cd` → `Test-Path`가 False인지 확인 → `mkdir` 또는 `New-Item -ItemType Directory`로 생성 → `cd` 또는 `Set-Location`으로 이동 → `pwd`·`ls`·`explorer.exe .` → 탐색기 주소줄 `wt -d .` → 열린 Terminal의 프로필·위치 확인. `C:\work`는 예시이므로 실제 존재하는 연습용 경로로 바꿉니다. 같은 기능의 두 명령은 비교 예시로, 폴더를 생성할 때는 둘 중 하나만 실행합니다.
2. **GUI·메모 파일:** 앞에서 만든 `dolbeom-demo` 폴더에서 `pwd`로 경로 확인 → `Test-Path .\memo.txt`가 False일 때 `New-Item -ItemType File -Path .\memo.txt` 또는 PowerShell 별칭 `ni` → 탐색기에서 메모장으로 열기 → `Hello, Codex!` 입력·저장 → `ls`와 `cat .\memo.txt` 또는 `Get-Content -LiteralPath .\memo.txt`로 같은 파일 확인. 기존 파일이 있다면 다른 이름을 사용합니다.
3. **호스트·셸:** Terminal·PowerShell·cmd·설치된 Git Bash 구분 → Terminal의 테마·탭·분할·단축키·시작 위치 장점 → `$PSVersionTable.PSVersion` → 기본 5.1과 선택 설치 7의 공존 확인. 7 설치는 필수가 아닙니다.
4. **설정·정리:** Ctrl+, → 앱 테마·프로필 색 구성표와 글꼴 확인 → 동작에서 연결 키 확인·변경 → 탭 → Alt+Shift+D → Alt+방향키 → 핵심 체크리스트. 테마와 키는 버전·설정·키보드 배열에 따라 달라질 수 있습니다.

관련 예제 재현의 출력은 예상 예시이며 자동 실행이 아닙니다. 실제 실습은 강사가 앞에서 만든 연습 폴더와 PowerShell·탐색기·메모장을 오가며 진행합니다.

PowerShell 기본 별칭 `pwd`·`ls`·`cd`·`cat`은 macOS의 Bash·zsh에서도 같은 이름을 자주 사용하지만, Windows cmd에서는 `cd`·`dir`·`type` 등 셸별 명령을 확인합니다. `ni`는 PowerShell 전용이며 `Test-Path`에는 기본 별칭이 없습니다. macOS의 `test -e`, cmd의 `if exist`는 비슷한 존재 확인이지만 별개의 셸 문법입니다. macOS의 `touch`는 파일이 이미 있을 때 수정 시간을 바꿀 수 있으므로 먼저 이름을 확인합니다.

## 3시간 진행 순서

| 순서 | 주제 | 본편 구성 | 시간 |
| --- | --- | --- | ---: |
| 01 | 윈도우 터미널과 UI 스왑에 익숙해지기 | 실제 Codex 입력 장면 자리 → 현재 위치·탐색기 전환 → 폴더 생성·이동 → 같은 메모 파일을 GUI와 PowerShell로 확인 → 셸·테마·단축키 | 25분 |
| 02 | Git | Codex의 변경 기록 → 버전 관리와 GitHub·PR 연결 → 수정·검증·커밋을 요청하는 프롬프트 | 25분 |
| 03 | GitHub | 다른 프로젝트를 clone해서 분석 → 원격 보관·서버에서 받기·프로필·Pages | 20분 |
| 04 | 마크다운 | Codex 요청 구조화 → README와 프로필 → Notion·Obsidian과 공통 문법 | 20분 |
| 05 | IDE | Codex 변경 확인과 편집 도구 → 같은 강의 카드에 HTML·CSS·JavaScript를 차례로 적용 | 40분 |
| 06 | 프론트엔드·백엔드 | 만든 카드와 프론트엔드의 관계 → 로컬·서버와 요청·응답 → 서버가 HTML을 만드는 방식 | 20분 |
| 07 | 템플릿 엔진 | 같은 카드에 Jinja2 데이터 → Tailwind CSS로 꾸미기 → Alpine.js로 동작 연결 | 30분 |
| 합계 | 7개 주제 · 본편 25개 절 | 사례·설명·시연·정리 포함 | 180분 |

실전 전환 시간은 각 주제의 본편 시간에 포함됩니다. 보충 노트 30분은 필요할 때 골라 사용하는 별도 자료입니다. 현재 앱의 본편 시간 합계가 최종 기준입니다.

IDE의 HTML·CSS·JavaScript 실습은 가상의 강의 카드 예제입니다. 실습을 저장하고 브라우저를 새로고침하면서 구조, 모양, 버튼 동작을 차례로 확인합니다. 이어지는 프론트엔드 단원에서는 이 카드가 사용자에게 보이고 상호작용하는 프론트엔드의 한 예라는 점을 설명합니다. 템플릿 단원은 같은 카드의 역할을 다시 활용해 서버 데이터, Tailwind CSS, Alpine.js를 연결합니다.

시연 준비용 완성본은 [강의 카드 예제](public/examples/ide-card/index.html)와 같은 폴더의 `style.css`, `script.js`입니다. VS Code에서 세 파일을 열어 비교하거나 [브라우저에서 완성 화면](http://127.0.0.1:5188/examples/ide-card/index.html)을 확인할 수 있습니다. 처음부터 만드는 수업에서는 별도 연습 폴더에 같은 파일을 차례로 작성합니다.

## 바로잡은 용어와 개념

| 처음 표현 | 강의에서 사용할 설명 | 근거 |
| --- | --- | --- |
| PowerShell 대신 Windows Terminal을 쓴다 | Windows Terminal은 터미널 앱이고, 그 안에서 PowerShell·명령 프롬프트 같은 셸을 실행한다. | [Microsoft: Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/) |
| PowerShell 7을 설치해야 시작할 수 있다 | Windows 기본 5.1로도 기본 실습이 가능하다. 7은 선택 설치하며 powershell.exe(5.1)와 pwsh(7)는 공존한다. | [Microsoft: PowerShell 설치와 공존](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows) |
| Git을 쓰면 PR까지 할 수 있다 | Git은 변경을 기록한다. GitHub는 원격 저장소와 협업 기능을 제공하며, PR은 변경을 검토·병합하도록 제안하는 GitHub 기능이다. | [Git: 버전 관리](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control), [GitHub: PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) |
| clone하면 다른 곳에서 바로 실행된다 | clone은 저장소를 가져오는 작업이다. 실행 환경·의존성·설정·DB 준비는 프로젝트에 따라 별도다. | [GitHub: 저장소 복제](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) |
| README.md라는 약속 | 저장소 안내 문서로 널리 쓰는 관례다. README는 필수 파일이 아니며 프로필 README에는 별도 조건이 있다. | [GitHub: README](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes), [프로필 README](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) |
| 마크다운은 모든 앱에서 공통이다 | 제목·목록·코드 등 공통 문법이 많지만 GitHub·Notion·Obsidian의 확장 기능과 가져오기·입력 방식은 다르다. | [GitHub 문법](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables), [Notion Markdown](https://www.notion.com/help/writing-and-editing-basics), [Obsidian 문법](https://help.obsidian.md/syntax) |
| VS Code와 PyCharm | VS Code는 무료 코드 편집기이며 확장으로 여러 개발 기능을 갖춘다. PyCharm은 Python 중심 IDE이며 무료 핵심 기능과 구독 기능의 범위를 구분한다. | [VS Code FAQ](https://code.visualstudio.com/docs/supporting/faq), [PyCharm 기능 비교](https://www.jetbrains.com/pycharm/features/) |
| 프론트엔드와 백엔드는 둘 다 서버가 필요하다 | 브라우저에서 실행하는 화면 코드와 서버에서 실행하는 프로그램을 구분한다. 정적 화면은 파일 호스팅으로 제공할 수 있고, 두 개의 별도 서버를 둘 필요는 없다. | [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [FastAPI 배포 개념](https://fastapi.tiangolo.com/deployment/concepts/) |
| 백엔드 = 서버 + DB | 백엔드는 서버에서 요청을 처리하는 프로그램의 역할을 말한다. DB는 필요에 따라 연결하며 필수 구성은 아니다. | [FastAPI 첫 단계](https://fastapi.tiangolo.com/tutorial/first-steps/) |
| 백엔드만으로 화면을 그린다 | 서버에서 템플릿과 데이터를 합쳐 HTML을 응답하고, 브라우저가 해석해 화면을 표시한다. | [FastAPI 템플릿](https://fastapi.tiangolo.com/advanced/templates/) |
| FastAPI가 강세라 Jinja2를 선택한다 | 이 강의에서는 Python·FastAPI 예제에 연결하기 쉬워 Jinja2를 선택한다. Django Template Language와 비교하되 인기 순위로 선택을 설명하지 않는다. | [Jinja 템플릿](https://jinja.palletsprojects.com/en/stable/templates/), [Django 템플릿](https://docs.djangoproject.com/en/stable/topics/templates/) |
| Alpine.js가 JavaScript를 대신한다 | Alpine.js는 HTML에 상태·이벤트·화면 갱신을 간결하게 연결하는 JavaScript 도구다. 서버 템플릿이 만든 HTML에 상호작용을 추가한다. | [Alpine.js 시작](https://alpinejs.dev/start-here) |

React는 UI 라이브러리, Svelte는 컴파일러를 사용하는 UI 프레임워크로 소개합니다. FastAPI(Python)·Spring(Java)은 백엔드 예제로, Tailwind CSS는 유틸리티 클래스로 스타일을 구성하는 CSS 프레임워크로 설명합니다. 강의의 모든 도구를 한 프로젝트에서 반드시 함께 사용할 필요는 없습니다.

Codex 프롬프트 예시는 이 강의용으로 작성했습니다. 목표·대상·완료 조건을 명확히 전달하고 변경과 실행 결과를 확인하는 흐름은 [공식 프롬프팅 문서](https://learn.chatgpt.com/docs/prompting)를 참고했습니다. Git 통합 기능과 터미널은 [공식 로컬 환경 문서](https://learn.chatgpt.com/docs/environments/local-environment)를 참고했습니다.

## 앞으로 조금씩 수정하는 방법

### 브라우저에서 직접 수정

기본은 **본문 편집**입니다. 강의 → 도입 사례/본문 절을 고르고, 왼쪽 입력과 오른쪽 미리보기를 함께 봅니다.

세부 설정이 필요할 때만 **상세 설정**으로 이동합니다.

- **01 강의 정보:** 전체·주제 제목, 실제 사례 구분, 강의 소개
- **02 본문:** 절의 시간·순서·보충 구분·개념 그림
- **03 단계별 시연:** 미리 작성한 코드·설명·출력
- **05 발표:** 사례 요약·핵심 요점·실전 시연 카드·복귀 요약

로컬 개발 서버에서는 편집한 내용이 약 650ms 뒤 파일에도 자동 저장됩니다. **파일 저장 완료**를 확인하면 매번 Codex에 저장을 요청하지 않아도 됩니다. GitHub Pages에서 편집한 내용은 브라우저 저장이므로 JSON 내보내기·로컬 가져오기 후 다시 배포해야 합니다. 자세한 저장·배포 방법은 [README](README.md)에 있습니다.

본문과 발표 요약은 각각 편집합니다. 본문 문장을 크게 바꿨다면 **05 발표**도 함께 확인하세요. 본문을 바꿨다고 이미 다듬어 둔 발표 요약을 자동으로 덮어쓰지는 않습니다.

### Codex에 내용을 전달해 수정

이 채팅에 다음처럼 필요한 부분만 보내면 됩니다.

```text
2. Git의 세 번째 절을 수정해줘.
실제 사례: Codex에 작업 후 커밋까지 요청했는데, 변경 파일을 먼저 확인한 경험.
강조: 커밋과 push는 별도라는 점.
추가할 예시: 내가 쓰는 프로젝트의 README 제목 수정.
본문·발표 요약·시연 카드까지 함께 맞춰줘.
```

수정한 원본 파일과 브라우저 편집 내용이 겹치면 앱의 동시 수정 안내를 확인해 사용할 버전을 선택합니다. 수정 전 원본은 `artifacts/course-before-outline-2026-10-26.json`에 보관했습니다. 이 백업은 배포에 포함되지 않습니다.

실제 Codex 사용 경험을 보내줄 때는 **무엇을 요청했는지 → 어떤 명령·파일이 등장했는지 → 어디서 막혔는지 → 무엇을 이해했는지** 정도만 적어주면 도입 사례를 구체화할 수 있습니다.
