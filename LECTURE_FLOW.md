# 강의 흐름과 내용 수정 안내

2026-10-26에 전달받은 개요를 기준으로 만든 편집용 초안입니다. 강의 제목과 세부 표현은 계속 바꿀 수 있습니다. 실제 Codex 경험을 아직 전달받지 않은 도입은 **교체용 예시**로 표시했습니다.

## 강의처럼 진행하면서 수정하세요

1. [강의 연습](http://127.0.0.1:5188/#/lesson/terminal/case)을 열고 주제를 선택합니다.
2. **시작 사례부터 읽고 다음 설명**으로 이동합니다. 왼쪽 현재 위치·가운데 그림·오른쪽 본문은 같은 절을 가리킵니다. 좁은 화면은 위의 현재 설명 선택 메뉴와 화살표를 사용합니다.
3. **이 내용 수정 → 수정 → 이 내용으로 연습**을 누르면 저장을 확인한 뒤 같은 절로 돌아옵니다. 본문이 아직 저장될 수 없는 상태라면 편집기에 남아 오류를 고칠 수 있습니다.

중앙 **관련 예제 재현**은 선택한 절의 코드·출력만 보여 줍니다. 세부절이 바뀌면 그림과 예제 묶음도 바뀝니다. **이 위치에서 발표**로 현재 절부터 발표를 시작할 수도 있습니다.

첫 터미널 예제는 `Write-Output '안녕하세요, 돌범입니다.'`입니다. 입력 → 결과 확인 → 문구 교체를 연습합니다. 실제 명령은 별도의 PowerShell에서 실행합니다.

## 3시간 진행 순서

| 순서 | 주제 | 본편 구성 | 시간 |
| --- | --- | --- | ---: |
| 01 | 윈도우 터미널 | Codex의 터미널 → 명령어를 쓰는 이유 → 터미널 앱과 셸 → 단축키 연습 | 25분 |
| 02 | Git | Codex의 변경 기록 → 버전 관리와 GitHub·PR 연결 → 수정·검증·커밋을 요청하는 프롬프트 | 25분 |
| 03 | GitHub | 다른 프로젝트를 clone해서 분석 → 원격 보관·서버에서 받기·프로필·Pages | 20분 |
| 04 | 마크다운 | Codex 요청 구조화 → README와 프로필 → Notion·Obsidian과 공통 문법 | 20분 |
| 05 | IDE | Codex 변경을 PyCharm에서 확인 → VS Code 단축키 → PyCharm과 키맵 → 터미널·Git·문서 통합 | 20분 |
| 06 | 프론트엔드·백엔드 | 로컬과 원격 실행 → 브라우저·백엔드·DB의 역할 → 서버가 HTML을 만드는 방식 | 25분 |
| 07 | 템플릿 엔진 | Jinja2·Django 템플릿 비교 → HTML·CSS·JavaScript → Tailwind CSS·Alpine.js 조합 | 45분 |
| 합계 | 7개 주제 · 본편 22개 절 | 사례·설명·시연·정리 포함 | 180분 |

실전 전환 시간 **3·4·3·2·3·4·6분**은 위 시간에 포함됩니다. 보충 노트 30분은 필요할 때 골라 사용하는 별도 자료입니다. 현재 앱의 본편 시간 합계가 최종 기준입니다.

## 바로잡은 용어와 개념

| 처음 표현 | 강의에서 사용할 설명 | 근거 |
| --- | --- | --- |
| PowerShell 대신 Windows Terminal을 쓴다 | Windows Terminal은 터미널 앱이고, 그 안에서 PowerShell·명령 프롬프트 같은 셸을 실행한다. | [Microsoft: Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/) |
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
