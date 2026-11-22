// Published defaults before the first push and clone walkthrough was updated.
export const previousGithubFirstPushDefault = {
  "id": "github",
  "closing": "Git에서 기록한 메모를 GitHub에 push하고 다른 폴더에 clone했습니다. 이 복제본에는 아직 README가 없습니다. 다음 Markdown 강의에서 원래 git-practice에 README를 작성하고 push한 뒤, 이미 만든 복제본에서 변경을 받아 IDE 실습을 이어갑니다. 두 폴더는 자동 동기화되지 않습니다.",
  "checklist": [
    "기존 git-practice의 main·병합 기록·원격 연결 상태를 확인할 수 있습니다.",
    "내 빈 GitHub 저장소의 HTTPS 주소를 origin에 연결하고 push 결과를 확인할 수 있습니다.",
    "다른 폴더에서 clone하고 note.txt version 2, branch-note.txt와 병합된 기록을 확인할 수 있습니다.",
    "push·clone과 GitHub Pages 공개가 서로 다름을 설명할 수 있습니다.",
    "복제본에는 README가 없으며 다음 강의에서 새로 작성한다는 것을 말할 수 있습니다."
  ],
  "presentation": {
    "demo": {
      "command": "GitHub 가입·로그인 확인\ngit-practice의 main·두 파일·병합 기록·origin 확인\nGitHub에서 README 없는 빈 저장소 생성 → HTTPS 주소 복사\ngit remote add origin 내주소 → git remote -v\ngit push -u origin main → GitHub에서 메모·기록 확인\n홈으로 이동 → git-practice-clone 대상 폴더가 없는지 확인\ngit clone 내주소 git-practice-clone → 새 폴더 진입\ncat .\\note.txt와 cat .\\branch-note.txt → git log --oneline --graph --decorate",
      "expectedResult": "GitHub와 다른 폴더의 복제본에서 note.txt version 2, branch-note.txt와 브랜치 병합 기록을 확인합니다. 다음 강의에서 README를 작성합니다."
    },
    "returnSummary": "Git에서 기록한 파일을 원격으로 push하고 다른 폴더에 clone했습니다. 다음 Markdown 강의에서는 원래 git-practice에 README를 작성해 push하고 기존 복제본에서 받아 봅니다."
  },
  "sections": [
    {
      "id": "github-clone",
      "body": "### 실습 전에 GitHub 계정 준비\n\n<mark>내 저장소를 만들려면 GitHub 계정이 필요합니다.</mark> [GitHub](https://github.com/)에 접속해 [가입](https://github.com/signup)하거나 기존 계정으로 로그인합니다. 빈 저장소를 만든 뒤 **내 사용자 이름이 들어간 HTTPS 주소**를 복사해 터미널의 `git remote add origin`에 넣을 예정입니다.\n\n### 1. 원래 git-practice에서 상태 확인\n\n```powershell\ncd ~/git-practice\npwd\n```\n\n```powershell\npwd\ngit status\ngit log --oneline --graph --decorate\ncat .\\note.txt\ncat .\\branch-note.txt\ngit remote -v\n```\n\n**main · version 2 · branch work · 변경 없는 상태**인지 확인합니다. 이전 커밋에 머물렀다면 `git switch main`으로 돌아옵니다. 다른 이름을 썼다면 실제 경로를 사용합니다.\n\n- `git remote -v`의 **-v**는 **verbose(자세히)**의 줄임말이며 `--verbose`와 같습니다. <mark>`git remote`는 원격 이름을 보여 주고, `-v`를 붙이면 주소도 표시합니다.</mark>\n- <mark>출력이 비었다면 연결된 원격이 없습니다.</mark> 이미 `origin`이 있거나 `origin already exists`가 나오면 기존 주소부터 확인합니다.\n- Windows PowerShell의 `cd`, `pwd`, `cat`은 `Set-Location`, `Get-Location`, `Get-Content`의 별칭입니다. cmd는 현재 위치에 `cd`, 메모 읽기에 `type note.txt`를 쓰고, macOS/Linux 기본 셸은 `pwd`, `cat note.txt`를 씁니다.\n\n### 2. GitHub에서 빈 저장소 만들기\n\n<mark>**New repository**에서 이름을 `git-practice`로 짓고 공개 범위를 정합니다.</mark> <mark>`README`, `.gitignore`, 라이선스 추가 없이 저장소를 만든 뒤 내 HTTPS 주소를 복사합니다.</mark> 올리기 전에 커밋에 포함된 작성자 이름과 이메일을 확인합니다. [GitHub 공식 안내](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)\n\n### 3. 원격 주소 등록하고 확인\n\n<mark>`origin`은 원격 저장소 주소에 붙이는 이름입니다.</mark> 아래 주소를 내 실제 주소로 바꿉니다. 기존 연결이 없는 경우에 등록합니다.\n\n```powershell\ngit remote add origin https://github.com/YOUR-USERNAME/git-practice.git\n```\n\n```powershell\ngit remote -v\n```\n\n| 표시 | 뜻 |\n| --- | --- |\n| fetch | GitHub에서 기록을 가져올 때 쓰는 주소 |\n| push | 내 컴퓨터의 커밋을 GitHub로 보낼 때 쓰는 주소 |\n\n두 줄이 모두 **내 저장소**를 가리키는지 봅니다. 주소를 본 뒤 실제 전송은 다음 단계에서 합니다. `fetch`로 기록을 확인할 때는 현재 작업 파일은 그대로입니다.\n\n### 4. 기록을 보내고 브라우저에서 확인\n\n```powershell\ngit push -u origin main\n```\n\n<mark>`-u`는 push가 성공하면 로컬 `main`과 원격 브랜치의 연결을 기억합니다.</mark> `--set-upstream`의 짧은 형태입니다. 로그인 창이 나오면 내 GitHub 계정으로 인증합니다. Git HTTPS 작업에서 계정 비밀번호 입력은 지원되지 않으므로 Git 자격 증명 관리자의 브라우저 로그인 절차를 따릅니다. 토큰과 비밀번호는 공유하지 않습니다. [GitHub 인증 안내](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)\n\n<mark>GitHub를 새로고침해 `note.txt`, `branch-note.txt`와 커밋 기록을 확인합니다.</mark> 저장하고 아직 커밋하지 않은 변경은 전송되지 않습니다.",
      "presentationPoints": [
        "<mark>GitHub 가입·로그인</mark> → 원본 `git-practice`에서 `git remote -v`로 이름·주소 확인",
        "<mark>빈 `git-practice` 저장소</mark> 생성 → 내 HTTPS 주소를 `origin`으로 등록",
        "<mark>`-u`로 브랜치 연결 기억</mark> → GitHub에서 두 메모와 커밋 확인"
      ]
    },
    {
      "id": "github-roles",
      "body": "### 1. 홈에서 복제 폴더 이름 확인\n\n```powershell\ncd ~\npwd\nTest-Path .\\git-practice-clone\n```\n\n`Test-Path`가 **False**일 때 새 폴더로 복제합니다. True면 기존 폴더를 확인하거나 다른 이름을 씁니다. 이미 이전 강의대로 `github-clone-practice` 아래에 복제했다면 이후 실습에서도 그 복제본의 **실제 경로**를 사용합니다.\n\nWindows PowerShell의 `cd`, `pwd`는 `Set-Location`, `Get-Location`의 별칭입니다. `Test-Path`에는 기본 별칭이 없습니다. cmd는 `cd /d %USERPROFILE%`, `cd`, `if exist git-practice-clone echo 존재함`, macOS/Linux 기본 셸은 `cd ~`, `pwd`, `test -e git-practice-clone`을 씁니다.\n\n### 2. 내 저장소를 새 폴더로 복제\n\nGitHub의 **Code → HTTPS**에서 주소를 복사해 예시를 바꿉니다. 마지막 이름은 새 폴더 이름입니다.\n\n```powershell\ngit clone https://github.com/YOUR-USERNAME/git-practice.git git-practice-clone\n```\n\n성공한 뒤 다음 단계로 이동합니다. 오류가 나오면 주소, 로그인, 네트워크를 확인합니다. [저장소 복제 공식 안내](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)\n\n### 3. 두 메모와 기록 확인\n\n```powershell\ncd .\\git-practice-clone\npwd\nls\ncat .\\note.txt\ncat .\\branch-note.txt\ngit log --oneline --graph --decorate\n```\n\n**note.txt는 version 2, branch-note.txt는 branch work**입니다. 커밋 그래프도 원본과 같은지 살펴봅니다. PowerShell에서 풀어 쓴 명령은 `Set-Location .\\git-practice-clone`, `Get-Location`, `Get-ChildItem`(`ls`), `Get-Content .\\note.txt`(`cat`)입니다. cmd는 `cd`, `dir`, `type note.txt`, macOS/Linux 기본 셸은 `cd`, `pwd`, `ls`, `cat note.txt`를 씁니다.\n\n**다음 강의**에서는 원래 `git-practice`에 README를 만들어 GitHub에 올린 뒤, 이 복제본에서 새 기록을 받습니다. GitHub는 저장소 보관, 프로필 소개, GitHub Pages를 통한 정적 사이트 공개에도 쓰입니다.",
      "presentationPoints": [
        "홈으로 이동하고 원본 옆에 만들 복제 대상 이름이 없는지 확인합니다.",
        "Code → HTTPS에서 복사한 내 주소를 사용해 git clone을 실행합니다.",
        "복제본의 두 파일과 브랜치 작업·병합 기록을 확인한 뒤 README 작성으로 이어갑니다."
      ]
    },
    {
      "id": "git-bonus"
    }
  ],
  "steps": [
    {
      "id": "git-09"
    },
    {
      "id": "github-01"
    },
    {
      "id": "github-02"
    },
    {
      "id": "github-origin-check"
    },
    {
      "id": "github-03",
      "description": "원래 폴더에서 확인한 main 기록을 GitHub에 보냅니다. 인증 화면의 비밀 정보는 공개하지 않습니다.",
      "output": "성공 후 GitHub 페이지를 새로고침합니다. -u는 브랜치 연결을 기억하는 선택지입니다."
    },
    {
      "id": "git-10"
    },
    {
      "id": "github-04"
    },
    {
      "id": "github-clone-check"
    },
    {
      "id": "git-12"
    },
    {
      "id": "github-clone-enter",
      "description": "복제 성공 후 이동하여 위치와 파일을 확인합니다. cd·pwd·ls는 PowerShell 기본 별칭입니다.",
      "code": "cd .\\git-practice-clone\npwd\nls",
      "output": "복제본 폴더와 note.txt가 보입니다."
    },
    {
      "id": "github-clone-verify"
    }
  ]
};

export const previousGithubClonePathDefault = {
  "id": "markdown",
  "sections": [
    {
      "id": "markdown-map"
    },
    {
      "id": "tools-markdown"
    },
    {
      "id": "markdown-readme-push"
    },
    {
      "id": "markdown-readme-fetch",
      "body": "**평소에는 pull만 해도 됩니다.** 이번에는 `fetch`로 새 기록을 먼저 살펴본 뒤 `pull`로 반영합니다.\n\n| 명령 | 내 컴퓨터에서 일어나는 일 |\n| --- | --- |\n| clone | 새 폴더에 원격 저장소 복제 |\n| fetch | 원격의 새 기록만 받아 확인 |\n| pull | 새 기록을 받아 현재 브랜치와 파일에 반영 |\n\n### 1. 이미 만든 복제본 열기\n\n```powershell\ncd ~/git-practice-clone\npwd\nTest-Path .\\README.md\ngit status --short\ngit branch --show-current\ngit remote -v\n```\n\n**기존 git-practice-clone**에서 시작합니다. 강사의 예시 경로는 `C:\\Users\\is2js\\git-practice-clone`입니다. `github-clone-practice` 아래에 복제한 경우처럼 위치가 다르면 실제 경로를 사용합니다. README가 아직 없어서 `Test-Path` 결과는 **False**입니다. 이미 있다면 기록과 상태를 확인합니다. 브랜치는 **main**, 원격은 **내 저장소**, 변경 목록은 **빈 상태**인지 봅니다.\n\nWindows PowerShell의 `cd`와 `pwd`는 `Set-Location`과 `Get-Location`의 별칭입니다. `Test-Path`에는 기본 별칭이 없습니다. 같은 목적으로 cmd에서는 `if exist README.md echo 존재함`, macOS/Linux 기본 셸에서는 `test -e README.md`를 사용할 수 있습니다.\n\n### 2. fetch 결과에서 README 커밋 찾기\n\n`fetch`는 현재 브랜치나 작업 파일을 자동으로 바꾸지 않습니다.\n\n```powershell\ngit fetch origin\ngit status -sb\ngit log --oneline HEAD..origin/main\ngit diff --stat HEAD origin/main\n```\n\n상태에서 **behind 1**, 로그에서 **Add project README**, 변경 요약에서 **README.md**를 봅니다. 결과가 비어 있다면 push 여부와 원격 주소를 확인합니다.\n\n### 3. pull로 복제본에 반영\n\n```powershell\ngit pull --ff-only origin main\nls\ncat .\\README.md\ngit log -1 --oneline\n```\n\n`--ff-only`는 기록이 갈라졌을 때 멈추는 옵션입니다. 파일 목록과 README 내용, 최근 커밋을 확인합니다. Windows PowerShell에서 `ls`는 `Get-ChildItem`, `cat`은 `Get-Content`의 별칭입니다. cmd는 `dir`과 `type README.md`, macOS/Linux 기본 셸은 `ls`와 `cat README.md`를 씁니다.\n\n### 4. 다음 실습을 위해 원래 폴더로 복귀\n\n```powershell\ncd ~/git-practice\npwd\nls\n```\n\ncmd에서는 `cd /d \"%USERPROFILE%\\git-practice\"`, `cd`, `dir`을 쓰고 macOS 기본 셸에서는 `cd ~/git-practice`, `pwd`, `ls`를 씁니다. IDE 실습은 **원본 git-practice**에서 이어갑니다. [Git fetch 공식 문서](https://git-scm.com/docs/git-fetch) · [Git pull 공식 문서](https://git-scm.com/docs/git-pull)"
    }
  ],
  "steps": [
    {
      "id": "codex-01"
    },
    {
      "id": "tools-08"
    },
    {
      "id": "markdown-readme-push"
    },
    {
      "id": "markdown-readme-fetch"
    }
  ]
};
