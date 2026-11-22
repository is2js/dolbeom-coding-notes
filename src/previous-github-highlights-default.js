// GitHub defaults before the clone case and teaching highlights.
export const previousGithubHighlightsDefault = {
  "case": {
    "body": "강사가 GitHub에서 저장소 주소를 복사해 터미널에서 **clone**하고, 탐색기에서 복제된 폴더를 여는 과정을 시연합니다.\n\n**clone**은 원격 저장소의 파일과 Git 기록을 내 컴퓨터의 새 폴더로 가져오는 동작입니다. 우리도 `git-practice`의 `version 1`과 `version 2` 기록을 먼저 GitHub에 올리고, 새 폴더로 복제해 같은 메모와 기록을 확인합니다."
  },
  "presentation": {
    "caseSummary": "강사가 GitHub 저장소를 실제로 clone하고 새 폴더의 파일을 확인하는 장면을 보여줄 예정입니다. 이어서 앞 강의의 메모 저장소를 직접 push하고 다른 폴더로 clone합니다.",
    "demo": {
      "command": "git-practice의 main·두 파일·병합 기록·origin 확인\nGitHub에서 README 없는 빈 저장소 생성 → HTTPS 주소 복사\ngit remote add origin 내주소 → git remote -v\ngit push -u origin main → GitHub에서 메모·기록 확인\n홈으로 이동 → git-practice-clone 대상 폴더가 없는지 확인\ngit clone 내주소 git-practice-clone → 새 폴더 진입\ncat .\\note.txt와 cat .\\branch-note.txt → git log --oneline --graph --decorate"
    }
  },
  "sections": [
    {
      "id": "github-clone",
      "body": "### 1. 원래 git-practice에서 상태 확인\n\n```powershell\ncd ~/git-practice\npwd\n```\n\n```powershell\npwd\ngit status\ngit log --oneline --graph --decorate\ncat .\\note.txt\ncat .\\branch-note.txt\ngit remote -v\n```\n\n**main · version 2 · branch work · 변경 없는 상태**인지 확인합니다. 이전 커밋에 머물렀다면 `git switch main`으로 돌아옵니다. 다른 이름을 썼다면 실제 경로를 사용합니다.\n\n- `git remote -v`의 **-v**는 **verbose(자세히)**의 줄임말이며 `--verbose`와 같습니다. `git remote`는 원격 이름을 보여 주고 `-v`를 붙이면 주소도 표시합니다.\n- 출력이 비었다면 연결된 원격이 없습니다. 이미 `origin`이 있거나 `origin already exists`가 나오면 기존 주소부터 확인합니다.\n- Windows PowerShell의 `cd`, `pwd`, `cat`은 `Set-Location`, `Get-Location`, `Get-Content`의 별칭입니다. cmd는 현재 위치에 `cd`, 메모 읽기에 `type note.txt`를 쓰고, macOS/Linux 기본 셸은 `pwd`, `cat note.txt`를 씁니다.\n\n### 2. GitHub에서 빈 저장소 만들기\n\n**New repository**에서 이름을 `git-practice`로 짓습니다. 공개 범위를 정한 뒤 **README, .gitignore, license 추가 없이** 생성하고 내 **HTTPS 주소**를 복사합니다. 올리기 전에 커밋에 포함된 작성자 이름과 이메일을 확인합니다. [GitHub 공식 안내](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)\n\n### 3. 원격 주소 등록하고 확인\n\n`origin`은 원격 저장소 주소에 붙이는 **이름**입니다. 아래 주소를 내 실제 주소로 바꿉니다. 기존 연결이 없는 경우에 등록합니다.\n\n```powershell\ngit remote add origin https://github.com/YOUR-USERNAME/git-practice.git\n```\n\n```powershell\ngit remote -v\n```\n\n| 표시 | 뜻 |\n| --- | --- |\n| fetch | GitHub에서 기록을 가져올 때 쓰는 주소 |\n| push | 내 컴퓨터의 커밋을 GitHub로 보낼 때 쓰는 주소 |\n\n두 줄이 모두 **내 저장소**를 가리키는지 봅니다. 주소를 본 뒤 실제 전송은 다음 단계에서 합니다. `fetch`로 기록을 확인할 때는 현재 작업 파일은 그대로입니다.\n\n### 4. 기록을 보내고 브라우저에서 확인\n\n```powershell\ngit push -u origin main\n```\n\n`-u`는 로컬 `main`과 원격 브랜치의 연결을 기억합니다. 로그인 창이 나오면 내 GitHub 계정으로 인증합니다. Git HTTPS 작업에서 계정 비밀번호 입력은 지원되지 않으므로 Git 자격 증명 관리자의 브라우저 로그인 절차를 따릅니다. 토큰과 비밀번호는 공유하지 않습니다. [GitHub 인증 안내](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)\n\nGitHub를 새로고침해 **두 메모 파일과 커밋 기록**을 확인합니다. 저장하고 아직 커밋하지 않은 변경은 전송되지 않습니다.",
      "presentationPoints": [
        "Git 실습의 main·두 파일·병합 기록과 기존 origin 유무를 먼저 확인합니다.",
        "README 없는 빈 GitHub 저장소를 만들고 복사한 HTTPS 주소를 origin으로 연결합니다.",
        "git push -u origin main 뒤 GitHub에서 파일과 커밋을 확인합니다."
      ]
    },
    {
      "id": "github-roles"
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
      "id": "github-01",
      "description": "로그인 후 새 저장소를 만들고 공개 여부를 직접 선택합니다."
    },
    {
      "id": "github-02"
    },
    {
      "id": "github-origin-check",
      "description": "`-v`는 자세히 표시하는 옵션입니다. fetch(가져오기)와 push(보내기)에 사용할 주소가 내 GitHub 저장소를 가리키는지 확인합니다."
    },
    {
      "id": "github-03"
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
      "id": "github-clone-enter"
    },
    {
      "id": "github-clone-verify"
    }
  ]
};
