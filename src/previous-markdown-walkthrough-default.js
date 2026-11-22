// Published Markdown fields before the README walkthrough and case source update.
export const previousMarkdownWalkthroughDefault = {
  "id": "markdown",
  "case": {
    "body": "### 1. Plan 모드에서 계획 먼저 받기\n\n![Codex Plan 모드에서 PVP RPG 소개 화면 개선 계획을 받고 구현을 요청한 실제 대화](./assets/course/markdown-codex-plan-conversation.png)\n\n소개 화면을 개선해 달라고 요청하자, 코딩을 돕는 AI 에이전트인 Codex가 **Plan 모드에서 구현 전에 계획을 마크다운으로 정리**했습니다. 저는 계획에 담긴 작업 범위를 확인한 뒤 **이 계획을 구현해 달라**고 요청했습니다. [OpenAI Plan 모드 안내](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)\n\n### 2. 계획에서 마크다운 찾기\n\n![같은 Codex 계획문에 구현 목표, 목록, 경로를 표시한 인라인 코드, 화면 구성 표가 보이는 화면](./assets/course/markdown-codex-plan-document.png)\n\n같은 계획을 펼쳐 보면 **제목**으로 내용을 나누고, **목록**으로 할 일을 정리하며, **표**로 화면 구성을 비교합니다. `/intro` 같은 경로는 인라인 코드로 표시해 본문에서 바로 찾을 수 있습니다.\n\n### 3. 내가 보내는 요청도 마크다운으로 쓰기\n\n<mark>프롬프트는 에이전트에게 보내는 요청입니다. 제목과 목록으로 바꿀 것, 지킬 조건, 확인 방법을 나눠 쓰면 요청을 읽고 빠진 부분을 확인하기 쉽습니다.</mark>\n\n```markdown\n## 목표\n- 강의 카드에 자세히 보기 버튼을 추가해 주세요.\n\n## 지킬 조건\n- 기존 카드 제목과 색상은 유지해 주세요.\n\n## 확인 방법\n- 버튼을 누르면 설명이 열리고, 다시 누르면 닫히는지 확인해 주세요.\n```\n\n[마크다운 실시간 연습 열기](#/lesson/markdown/section-markdown-map)에서 위 요청을 붙여 넣고, 제목과 목록이 어떻게 보이는지 확인해 봅니다.",
    "question": "내가 Codex에게 요청한다면, 바꿀 것과 지킬 조건을 어떤 제목과 목록으로 나눠 쓸까요?"
  },
  "closing": "Codex 계획문으로 Markdown을 연습하고 원래 저장소에서 README를 작성해 push한 뒤, GitHub 강의에서 만든 복제본에서 새 기록을 확인하고 반영했습니다. 다음 IDE에서 업데이트한 README를 엽니다.",
  "checklist": [
    "Codex 계획 예시에서 제목·목록·강조·링크·표를 바꾸고 미리보기로 확인할 수 있다.",
    "원래 메모 프로젝트에 README.md의 항목을 작성하고 저장할 수 있다.",
    "README만 확인해 커밋·push하고 GitHub 표시를 확인할 수 있다.",
    "기존 복제본에서 fetch로 새 기록을 확인하고 pull로 README를 받아올 수 있다."
  ],
  "presentation": {
    "caseSummary": "<mark>Plan 모드에서 요청 → 마크다운 계획 확인 → 구현 요청</mark> 순서로 진행했습니다. 두 이미지에서 제목·목록·표를 찾아봅니다. 내 프롬프트도 <mark>목표·조건·확인 방법</mark>을 나눠 써 봅니다. [마크다운 실시간 연습 열기](#/lesson/markdown/section-markdown-map)",
    "demo": {
      "program": "웹 브라우저 · 메모장 · Windows PowerShell",
      "command": "Codex 계획문으로 Markdown 문법 연습\n원래 git-practice 위치와 README 존재 여부 확인 → 항목별 예시로 README 작성·저장\n상태·main·origin 확인 → README만 add·변경 확인 → commit → push\nGitHub 저장소 새로고침 → README 제목·표·체크리스트·파일 링크 확인\n기존 git-practice-clone 복제본 → fetch로 새 기록 확인 → pull --ff-only → README 확인",
      "expectedResult": "README를 작성·push한 다음 기존 복제본에서 원격 변경을 확인하고 반영합니다."
    },
    "returnSummary": "README를 작성해 GitHub에 올리고 기존 복제본으로 받아 왔습니다. 다음 IDE에서 업데이트한 README를 열고 미리 봅니다."
  },
  "sections": [
    {
      "id": "markdown-map"
    },
    {
      "id": "tools-markdown",
      "body": "`README.md`는 **프로젝트 소개와 시작 방법**을 담는 문서입니다. 원래 **git-practice**의 두 메모를 소개하는 README를 작성합니다. [GitHub README 안내](https://docs.github.com/ko/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)\n\n### 준비. 원래 폴더에 README 열기\n\n```powershell\ncd ~/git-practice\npwd\n```\n\n```powershell\npwd\nls\nTest-Path .\\README.md\n```\n\n`note.txt`와 `branch-note.txt`가 있고 `Test-Path`가 **False**일 때 새 파일을 만듭니다. True면 기존 파일의 내용을 확인합니다. `~`는 현재 사용자 홈이며 다른 위치에 만들었다면 실제 경로를 사용합니다.\n\nWindows PowerShell의 `cd`·`pwd`·`ls`는 `Set-Location`·`Get-Location`·`Get-ChildItem`의 별칭입니다. `Test-Path`에는 기본 별칭이 없습니다. Windows cmd는 `cd`·`dir`·`if exist README.md echo 존재함`, macOS/Linux 기본 셸은 `pwd`·`ls`·`test -e README.md`를 씁니다.\n\n```powershell\nnotepad README.md\n```\n\n### 1. 제목, 이미지, 소개\n\n`#` 제목과 `**` 굵게, `*` 기울기를 적용합니다. 이미지는 선택입니다. 자신의 이미지를 쓰려면 프로젝트에 파일을 넣고 실제 경로를 적습니다.\n\n````markdown\n# Git 연습 메모\n\n![Git 로고](https://raw.githubusercontent.com/github/explore/main/topics/git/git.png)\n\n**터미널과 Git**을 익히는 *작은 메모 프로젝트*입니다.\n````\n\n### 2. 준비물과 설치 링크\n\n실제로 필요한 Git과 편집기를 적습니다.\n\n````markdown\n## 준비물\n- Windows PowerShell과 [Git for Windows](https://git-scm.com/install/windows)\n- 메모장 또는 텍스트 편집기\n\nGit이 없다면 위 링크에서 Git for Windows를 설치합니다.\n````\n\n### 3. 표와 파일 링크\n\n표에 두 메모를 적고 `[이름](경로)`로 연결합니다.\n\n````markdown\n## 파일 안내\n| 파일 | 내용 |\n| --- | --- |\n| [note.txt](./note.txt) | 버전 기록 연습 메모 |\n| [branch-note.txt](./branch-note.txt) | 브랜치 작업 메모 |\n````\n\n### 4. 확인 방법을 코드 블록으로\n\n````markdown\n## 내용 확인하기\n이 폴더에서 PowerShell을 열고 메모를 읽습니다.\n\n```powershell\ncat .\\note.txt\n```\n````\n\nWindows PowerShell의 `cat`은 `Get-Content`의 별칭입니다. cmd는 `type note.txt`, macOS/Linux 기본 셸은 `cat note.txt`를 씁니다.\n\n### 5. 체크리스트와 참고 링크\n\n`[x]`는 완료, `[ ]`는 할 일입니다. `---`는 구분선을 만듭니다.\n\n````markdown\n## 실습 체크\n- [x] 메모의 버전 기록하기\n- [x] 저장소 복제하기\n- [ ] 메모 내용 더 정리하기\n\n---\n[Git 공식 문서](https://git-scm.com/doc)\n````\n\n### 완성 원문과 비교\n\n````markdown\n# Git 연습 메모\n\n![Git 로고](https://raw.githubusercontent.com/github/explore/main/topics/git/git.png)\n\n**터미널과 Git**을 익히는 *작은 메모 프로젝트*입니다.\n\n## 준비물\n- Windows PowerShell과 [Git for Windows](https://git-scm.com/install/windows)\n- 메모장 또는 텍스트 편집기\n\nGit이 없다면 위 링크에서 Git for Windows를 설치합니다.\n\n## 파일 안내\n| 파일 | 내용 |\n| --- | --- |\n| [note.txt](./note.txt) | 버전 기록 연습 메모 |\n| [branch-note.txt](./branch-note.txt) | 브랜치 작업 메모 |\n\n## 내용 확인하기\n이 폴더에서 PowerShell을 열고 메모를 읽습니다.\n\n```powershell\ncat .\\note.txt\n```\n\n## 실습 체크\n- [x] 메모의 버전 기록하기\n- [x] 저장소 복제하기\n- [ ] 메모 내용 더 정리하기\n\n---\n[Git 공식 문서](https://git-scm.com/doc)\n````\n\n**Ctrl+S**로 저장하고 메모장을 닫은 다음 README를 확인합니다.\n\n```powershell\ncat .\\README.md\ngit status\n```\n\n다음 절에서 **이 README만** 커밋해 GitHub에 올립니다. 기존 `git-practice-clone`은 그다음에 새 기록을 받는 데 씁니다.",
      "presentationPoints": [
        "메모 프로젝트에 실제 필요한 제목·소개·준비물·파일·확인 방법을 작성합니다.",
        "이미지·표·링크·체크리스트와 코드 블록을 살펴보고 완성본과 비교합니다.",
        "원래 git-practice 폴더의 README를 저장하고 다음 단계에서 GitHub에 올립니다."
      ]
    },
    {
      "id": "markdown-readme-push",
      "body": "원래 `git-practice` 폴더에 저장한 **README.md**를 GitHub로 보냅니다.\n\n### 1. 브랜치와 원격 주소 확인\n\n```powershell\ngit status --short\ngit branch --show-current\ngit remote -v\n```\n\n현재 브랜치는 **main**이고 `origin`의 push 주소는 **내 GitHub 저장소**여야 합니다. 다른 작업이 준비되어 있다면 상태를 먼저 확인합니다.\n\n### 2. README만 선택하고 내용 확인\n\n```powershell\ngit add README.md\ngit diff --cached --name-only\ngit diff --cached\n```\n\n첫 Diff로 파일 이름, 두 번째 Diff로 커밋에 들어갈 내용을 봅니다. **README.md만** 보여야 합니다.\n\n### 3. 커밋한 뒤 push\n\n```powershell\ngit commit -m \"Add project README\"\ngit push -u origin main\n```\n\n커밋은 내 컴퓨터에 기록하고, push는 기록을 GitHub로 보냅니다. `-u`는 브랜치 연결을 기억합니다. 로그인 창이 나오면 저장소에 쓸 수 있는 계정으로 인증합니다.\n\n### 4. GitHub에서 새로고침\n\nGitHub 저장소를 **새로고침**해서 README 제목·표·체크리스트와 파일 링크를 확인합니다. 외부 이미지는 제공처에 따라 표시 여부가 달라질 수 있습니다. 다음은 기존 `git-practice-clone`에 이 변경을 받는 실습입니다.",
      "presentationPoints": [
        "원래 git-practice 폴더에서 README와 main·origin을 확인합니다.",
        "README만 준비해 내용을 확인하고 커밋·push합니다.",
        "GitHub에 표시된 README와 파일 링크를 확인합니다."
      ]
    },
    {
      "id": "markdown-readme-fetch",
      "body": "**평소에는 pull만 해도 됩니다.** 이번에는 `fetch`로 새 기록을 먼저 살펴본 뒤 `pull`로 반영합니다.\n\n| 명령 | 내 컴퓨터에서 일어나는 일 |\n| --- | --- |\n| clone | 새 폴더에 원격 저장소 복제 |\n| fetch | 원격의 새 기록만 받아 확인 |\n| pull | 새 기록을 받아 현재 브랜치와 파일에 반영 |\n\n### 1. 이미 만든 복제본 열기\n\n```powershell\ncd ~/git-practice-clone\npwd\nTest-Path .\\README.md\ngit status --short\ngit branch --show-current\ngit remote -v\n```\n\n**기존 git-practice-clone**에서 시작합니다. 강사의 예시 경로는 `C:\\Users\\is2js\\git-practice-clone`입니다. 복제할 때 다른 이름을 썼다면 `cd`에서 그 이름을 사용합니다. README가 아직 없어서 `Test-Path` 결과는 **False**입니다. 이미 있다면 기록과 상태를 확인합니다. 브랜치는 **main**, 원격은 **내 저장소**, 변경 목록은 **빈 상태**인지 봅니다.\n\nWindows PowerShell의 `cd`와 `pwd`는 `Set-Location`과 `Get-Location`의 별칭입니다. `Test-Path`에는 기본 별칭이 없습니다. 같은 목적으로 cmd에서는 `if exist README.md echo 존재함`, macOS/Linux 기본 셸에서는 `test -e README.md`를 사용할 수 있습니다.\n\n### 2. fetch 결과에서 README 커밋 찾기\n\n`fetch`는 현재 브랜치나 작업 파일을 자동으로 바꾸지 않습니다.\n\n```powershell\ngit fetch origin\ngit status -sb\ngit log --oneline HEAD..origin/main\ngit diff --stat HEAD origin/main\n```\n\n상태에서 **behind 1**, 로그에서 **Add project README**, 변경 요약에서 **README.md**를 봅니다. 결과가 비어 있다면 push 여부와 원격 주소를 확인합니다.\n\n### 3. pull로 복제본에 반영\n\n```powershell\ngit pull --ff-only origin main\nls\ncat .\\README.md\ngit log -1 --oneline\n```\n\n`--ff-only`는 기록이 갈라졌을 때 멈추는 옵션입니다. 파일 목록과 README 내용, 최근 커밋을 확인합니다. Windows PowerShell에서 `ls`는 `Get-ChildItem`, `cat`은 `Get-Content`의 별칭입니다. cmd는 `dir`과 `type README.md`, macOS/Linux 기본 셸은 `ls`와 `cat README.md`를 씁니다.\n\n### 4. 다음 실습을 위해 원래 폴더로 복귀\n\n```powershell\ncd ~/git-practice\npwd\nls\n```\n\ncmd에서는 `cd /d \"%USERPROFILE%\\git-practice\"`, `cd`, `dir`을 쓰고 macOS 기본 셸에서는 `cd ~/git-practice`, `pwd`, `ls`를 씁니다. IDE 실습은 **원본 git-practice**에서 이어갑니다. [Git fetch 공식 문서](https://git-scm.com/docs/git-fetch) · [Git pull 공식 문서](https://git-scm.com/docs/git-pull)",
      "presentationPoints": [
        "GitHub 강의에서 이미 만든 복제본과 원격·main·작업 상태를 확인합니다.",
        "fetch 후 아직 없는 커밋과 바뀔 파일을 살펴봅니다.",
        "pull --ff-only로 반영하고 README와 최신 커밋을 확인합니다."
      ]
    }
  ],
  "steps": [
    {
      "id": "codex-01"
    },
    {
      "id": "tools-08",
      "description": "원래 git-practice 폴더로 이동해 README 존재 여부를 확인한 뒤 소개·준비물·파일·확인 방법을 작성합니다.",
      "code": "cd ~/git-practice\npwd\nls\nTest-Path .\\README.md\n# False이고 예상한 원래 폴더일 때만:\nnotepad README.md\n# 항목별 예시를 작성하고 Ctrl+S 후 닫기\ncat .\\README.md\ngit status",
      "output": "README 원문의 제목·소개·준비물·표·확인 방법이 보입니다. 파일을 저장해도 GitHub에는 아직 반영되지 않습니다."
    },
    {
      "id": "markdown-readme-push",
      "description": "원래 git-practice의 main·origin과 준비된 README만 확인하고 커밋·push한 뒤 GitHub 화면과 파일 링크를 확인합니다.",
      "code": "git status --short\ngit branch --show-current\ngit remote -v\ngit add README.md\ngit diff --cached --name-only\ngit diff --cached\n# README만 준비됐을 때:\ngit commit -m \"Add project README\"\ngit push -u origin main",
      "output": "README만 준비했는지 확인 → 커밋·push → GitHub에서 제목·표·체크리스트와 파일 링크 확인. 다른 변경이 준비돼 있으면 멈춥니다."
    },
    {
      "id": "markdown-readme-fetch",
      "output": "fetch는 기록만 가져옵니다. 변경을 확인하고 pull하면 기존 복제본에서도 README가 보입니다."
    }
  ]
};
