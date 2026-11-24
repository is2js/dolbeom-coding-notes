# 강의 카드 Vite 개발 서버 예제

07강에서 만든 강의 카드를 Vite 개발 서버로 열어 보는 예제입니다. `index.html`에서 Tailwind CSS 3와 Alpine.js를 CDN으로 연결합니다. 버튼을 누르면 설명이 펼쳐지고 버튼 글자도 바뀝니다. CDN을 불러오려면 인터넷 연결이 필요합니다.

| 파일 | 역할 |
| --- | --- |
| `index.html` | 강의 카드와 Tailwind·Alpine CDN 연결 |
| `package.json` | Vite 설치 정보와 `npm run dev` 명령 설정 |
| `package-lock.json` | 설치할 패키지 버전을 기록 |
| `.gitignore` | `node_modules`와 `dist`를 Git 기록에서 제외 |

1. [Node.js 공식 다운로드](https://nodejs.org/en/download)에서 LTS 버전을 설치합니다. npm도 함께 설치됩니다. VS Code에서 이 폴더를 열고 새 터미널에서 설치 여부를 확인합니다.

   ```powershell
   node --version
   npm --version
   ```

2. 이 폴더에서 필요한 패키지를 설치하고 개발 서버를 시작합니다.

   ```powershell
   npm install
   npm run dev
   ```

3. 터미널에 표시된 Local 주소를 브라우저에서 열고 버튼을 눌러 봅니다. `index.html`을 수정하고 저장하면 화면 변경을 확인할 수 있습니다. 서버가 켜진 터미널에서 `h`를 누르고 Enter를 누르면 Vite 도움말이 나타납니다. 종료할 때는 `Ctrl+C`를 누릅니다.

`npm run dev`는 `package.json`의 `scripts.dev`에 적힌 Vite 명령을 실행합니다. `127.0.0.1`은 현재 컴퓨터를 가리키며 포트 `5173`이 이미 사용 중이면 Vite가 다른 포트를 선택할 수 있으니 실제 출력된 주소를 확인합니다.

Tailwind 3 Play CDN은 학습·시연용입니다. 실제 배포용 프로젝트에서는 Tailwind의 설치 및 빌드 구성을 별도로 준비합니다. 이 예제는 FastAPI 서버를 실행하지 않습니다.

PowerShell에서 `npm.ps1` 실행 정책 오류가 나면 `npm.cmd install`과 `npm.cmd run dev`를 사용할 수 있습니다. 현재 폴더를 확인하는 PowerShell 명령 `pwd`와 `ls`는 `Get-Location`과 `Get-ChildItem`의 기본 별칭입니다. Windows cmd에서는 `cd`와 `dir`을, macOS/Linux에서는 `pwd`와 `ls`를 사용합니다.
