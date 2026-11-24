# 강의 카드 Vite 개발 서버 예제

앞에서 만든 강의 카드의 HTML·CSS·JavaScript에 개발 서버 실행 설정을 추가한 참고 예제입니다. 수업에서는 앞서 작업하던 `git-practice` 폴더에서 카드를 만들고 Vite 설정을 추가합니다. 기존 파일이 있다면 먼저 확인하고 덮어쓰지 마세요. 이 예제는 FastAPI 백엔드를 실행하거나 GitHub Pages에 서버를 배포하지 않습니다.

1. Node.js와 npm을 설치하고, `git-practice` 폴더를 VS Code에서 연 뒤 통합 터미널에서 위치와 버전을 확인합니다. PowerShell에서 `pwd`는 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다.

   ```powershell
   pwd
   ls
   node --version
   npm --version
   ```

2. `git-practice`의 `package.json`에서 `scripts.dev`를 읽은 뒤 패키지 설치가 완료되면 개발 서버를 실행합니다.

   ```powershell
   npm install
   npm run dev
   ```

3. 터미널의 실제 로컬 주소를 브라우저에 열어 카드를 확인합니다. `index.html`에서 제목을 고치고 저장해 브라우저 변화를 확인한 후 원래대로 돌립니다. 서버가 실행 중인 터미널에서 `Ctrl+C`로 종료합니다.

PowerShell에서 `npm.ps1` 실행 정책 오류가 나면 설정을 바꾸지 않고 `npm.cmd install`과 `npm.cmd run dev`를 사용할 수 있습니다. `127.0.0.1`은 명령을 실행한 컴퓨터 자신이므로 이 주소만 다른 사람에게 보내도 공유되지 않습니다.

Windows cmd의 현재 위치 확인은 `cd`, 목록 확인은 `dir`입니다. macOS/Linux 기본 셸에서는 `pwd`, `ls`를 사용합니다. Vite가 요구하는 Node.js 버전은 설치 안내를 확인하세요.
