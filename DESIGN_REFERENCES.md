# 강의 노트 디자인 참고 기록

최근 확인일: 2026년 11월 11일 (최초 디자인 참고 기록: 2026년 11월 6일)

돌범의 강의 노트는 크림색 작업대와 세이지색 강조, 입체 SVG를 바탕으로 구성합니다. 아래 사이트에서 관찰한 탐색 방식과 시각자료의 역할을 강의 노트에 맞게 재구성했습니다. 강의 내용의 출처와 UI 디자인의 참고는 구분합니다.

## 최초 디자인 참고

### Learn Arduino

- 주소: <https://learn-arduino-red.vercel.app/>
- 최초 디자이너 표기: [Dilum Sanjaya](https://x.com/DilumSanjaya)
- 관찰한 요소: 크림색 바탕과 가는 격자, 중심의 입체 모형, 그림이 있는 수업 선택 카드, 설명과 예제를 나누는 보기 전환.
- 적용 위치: 강의와 발표의 그림 작업대, 주제별 썸네일, 설명 그림과 관련 예제 탭.
- 재구성 방식: 아두이노 부품 대신 터미널·버전 기록·문서·편집기 등 일곱 개발 주제를 자체 SVG로 표현합니다. 작은 썸네일은 주제를 구별하는 대표 형태에 집중하고 설명용 그림과 용도를 나눕니다.

## 추가 참고

| 사이트 | 확인한 화면과 URL | 관찰한 요소 | 강의 노트에 적용하는 방식 |
| --- | --- | --- | --- |
| 한 입 크기로 잘라먹는 바이브코딩 핸드북 | [공개 핸드북](https://vibe.onebitefe.com/) | 주제와 소주제의 계층, 본문과 시각자료·라이브 데모의 구분 | 주제 탐색과 현재 소주제 표시를 분리하고, 본문에 맞춘 그림 및 관련 예제를 함께 연결합니다. 공개 화면의 탐색 구조를 참고했습니다. |
| Microsoft Learn | [웹 개발 입문 모듈의 소개 화면](https://learn.microsoft.com/en-us/training/modules/get-started-with-web-development/1-introduction) | 현재 단위와 전체 단위 수, 펼쳐 보는 모듈 메뉴, 다음 단위 안내, 이미지 확대 링크 | 현재 순서와 제목을 함께 표시합니다. 모바일에서는 현재 주제를 먼저 보여주고 전체 주제 목록을 펼치며, 세부 그림을 크게 볼 수 있게 합니다. |
| Brilliant | [공개 소개 화면](https://brilliant.org/) | 개념별 그림과 설명의 묶음, 선택 상태가 분명한 주제 전환 | 일곱 주제의 그림과 글자 영역을 분리하고 실제 설명 장면에 캡션을 붙입니다. 강의 사례·예제와 SVG는 자체 제작합니다. |

## 웹 기초와 편집기 설치 구성

확인일: 2026년 11월 11일. 한입 바이브코딩 핸드북의 아래 공개 강의를 브라우저에서 확인했습니다. 학습 순서와 설명용 도해의 역할을 참고하며, 강의 카드 프로젝트와 기존 크림·세이지 그림체로 다시 구성합니다. 참고 강의의 타이머 프로젝트, 문구, 코드와 이미지 파일은 복제하지 않습니다.

| 확인한 화면과 URL | 관찰한 구성·도해의 역할 | 자체 구현 적용 위치 |
| --- | --- | --- |
| [인터넷과 웹](https://vibe.onebitefe.com/lessons/s05-c01-internet-web) | 학습 목표를 먼저 제시하고 브라우저 요청·서버 응답·화면 표시를 그림과 짧은 설명으로 연결합니다. HTML·CSS·JavaScript가 필요한 이유를 전체 흐름에서 소개합니다. | 기존 프론트엔드·백엔드 설명과 IDE의 강의 카드 실습을 연결합니다. 카드의 내용·모양·동작을 같은 화면에서 확인합니다. |
| [HTML로 배치하기](https://vibe.onebitefe.com/lessons/s05-c02-html-layout), [HTML 핵심 태그 살펴보기](https://vibe.onebitefe.com/lessons/s05-c03-html-tags) | 짧은 태그 원문과 표시 결과를 가까이 두고, 시작·내용·끝 및 속성의 이름·값을 화살표와 라벨로 구분합니다. 문서 골격도 별도로 설명합니다. | `tools-html` 본문 중간에 자체 도해 `public/assets/course/diagrams/html-element.svg`, `html-attributes.svg`, `html-document.svg`를 배치합니다. 현재 카드의 `Git` 제목, 버튼과 설명을 사용합니다. |
| [CSS로 꾸미기](https://vibe.onebitefe.com/lessons/s05-c04-css), [JavaScript로 움직이기](https://vibe.onebitefe.com/lessons/s05-c05-javascript), [HTML·CSS·JS 프로젝트](https://vibe.onebitefe.com/lessons/s05-c06-html-css-js-project) | 선택자·속성·값 및 HTML class와 CSS의 연결을 분해하고, 이벤트가 동작을 실행해 화면을 바꾸는 과정을 나타냅니다. 기능을 단계별로 더한 후 결과를 확인합니다. | `tools-css`의 `css-declaration.svg`, `tools-javascript`의 `javascript-flow.svg`에서 현재 카드의 24px 여백과 설명 펼치기 흐름을 표현합니다. HTML → CSS → JavaScript의 기존 카드 완성 단계를 유지합니다. |
| [VS Code 소개](https://vibe.onebitefe.com/lessons/s04-c01-vscode-intro), [VS Code 설치·사용법](https://vibe.onebitefe.com/lessons/s04-c02-vscode-install) | 설치부터 폴더 열기·파일 저장·확장·설정·통합 터미널까지 화면별 작업을 작게 나누고, 사용자가 눌러야 할 기능의 역할을 설명합니다. | 새 `tools-vscode-setup`과 기존 `tools-vscode`에 Windows 설치·기본 설정·같은 README 열기 순서를 구성합니다. `tools-pycharm`에는 짧은 설치·첫 폴더 열기 안내를 같은 원칙으로 덧붙입니다. |

- 본문 도해는 JSON의 일반 이미지 문법으로 연결하고, `src/course-markdown.js`에서 위 다섯 SVG 파일명만 명시적으로 허용합니다. 일반 강의 본문과 발표의 본문 보기에서 같은 자료를 사용합니다.
- 기술 내용은 참고 화면과 별도로 [MDN HTML 기본 문법](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax), [void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element), [VS Code Windows 설치](https://code.visualstudio.com/docs/setup/windows), [기본 편집·서식](https://code.visualstudio.com/docs/editing/codebasics), [표시 언어](https://code.visualstudio.com/docs/configure/locales), [PyCharm 설치](https://www.jetbrains.com/help/pycharm/installation-guide.html)로 확인합니다. HTML의 빈 요소, 내장 포매터와 선택 확장, 실제 터미널 경로와 버전별 설치 화면을 정확히 구분합니다.

## 강의 개념 그림 참고

- **Git 협업 과정 그림**, 확인일 2026년 11월 11일: [그림판으로 보는 Git 협업 기록](https://blog.chojaeseong.com/git/%ED%98%91%EC%97%85/%EC%BD%94%EB%93%9C%EB%A6%AC%EB%B7%B0/%EC%9A%B0%ED%85%8C%EC%BD%94/2022/02/17/git_%EA%B7%B8%EB%A6%BC%ED%8C%90%EC%9C%BC%EB%A1%9C_%EB%B3%B4%EB%8A%94_%ED%98%91%EC%97%85%EB%AF%B8%EC%85%98%28%EC%99%84%29.html). 원격 저장소와 각 작업자의 로컬 저장소를 영역으로 나누고 작업과 이동 방향을 단계별로 보여 주는 방식을 참고했습니다. GitHub 강의의 원격 연결·전송 그림에 적용하며, 그림은 현재 강의의 크림·세이지 SVG로 다시 만듭니다.
- 원문은 fork와 여러 원격을 다루지만 입문 실습에서는 내 로컬과 GitHub의 `origin` 관계부터 표현합니다. `fetch`는 원격 정보와 기록을 가져오며 현재 작업 파일에 자동으로 병합하지 않는다는 점은 [Git 공식 원격 저장소 안내](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)로 확인해 설명합니다.

## 구현 기준

- 홈·강의·발표가 하나의 주제 썸네일 매핑을 공유하며 제목이나 순서를 바꿔도 같은 ID의 그림을 사용합니다.
- 강의와 발표는 화면 크기와 관계없이 **큰 주제 드롭다운 → 하위 주제 썸네일 버튼 → 이전·다음 버튼**의 구조를 사용합니다. 드롭다운은 한 열의 목록으로 화면 위에 겹쳐 열리고, 하위 버튼은 가로로 넘겨 선택합니다.
- 번호·제목·시간·현재 상태는 실제 강의 데이터에서 읽습니다. 현재 상태는 색상과 `현재` 문구를 함께 사용합니다.
- 터치 영역은 최소 44px로 확보하고, 긴 제목을 줄바꿈합니다. 중앙 그림은 비율을 유지하며 확대 화면에서 원본 크기도 확인할 수 있습니다.
- 2026년 11월 7일 사용자가 제공한 Learn Arduino 모바일 화면을 기준으로 주제 선택과 하위 순서 탐색을 분리했습니다. 최외곽 장식 상자는 생략하고, 드롭다운·하위 버튼의 종이색 바탕과 선명한 외곽선을 유지합니다. 현재 하위 버튼에는 청록색 테두리, 다음 버튼에는 남색 바탕과 밝은 화살표를 사용합니다.
- 기본 주제 그림 7개와 소주제 그림 31개를 각각 재생성했습니다. 선명한 남색 윤곽선, 크림색 종이와 세이지색 패널, 청록색·황토색 신호를 조합하고 명령 커서·파일 이동·요청·응답 등 의미가 있는 일부 요소만 움직입니다. 작은 버튼은 긴 코드가 없는 별도 썸네일을 사용합니다.
- 좌측 도구 바는 코드 작업실·파일 트리·개념 연결·터미널 실습·문서 편집을 나타내는 자체 선형 SVG 아이콘으로 표현합니다. 각 버튼의 기능과 아이콘의 뜻이 일치하도록 구성합니다.
- 움직임 멈춤, 운영체제의 동작 줄이기 설정, 키보드 초점 표시와 대화상자 초점 복귀를 지원합니다.
- 외부 로고·그림·3D 모델·코드·강의 원문은 복제하지 않습니다. 최초 디자인 표기를 유지하고 참고한 구성 원칙만 자체 UI에 반영합니다.

## 나중에 참고 사이트를 추가할 때

사이트 이름과 확인일, 실제 확인한 페이지 링크, 참고한 요소, 적용한 화면을 함께 기록합니다. 구경한 사이트와 실제 반영한 사이트를 구분하고, 레이아웃 참고를 강의 원문이나 자산의 사용 허가로 해석하지 않습니다.
