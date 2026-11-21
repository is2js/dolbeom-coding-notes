// Git defaults before the instructor highlights and merge explanation.
export const previousGitHighlightsDefault = {
  "closing": "메모의 두 버전을 기록하고 이전 기록을 확인했습니다. 별도 브랜치에서 만든 파일을 main에 합친 뒤, 다음 GitHub 강의에서 이 저장소를 원격에 올리고 다른 폴더에 복제합니다.",
  "checklist": [
    "새 연습 저장소의 .git과 작업 파일이 하는 역할을 구분할 수 있습니다.",
    "파일 저장·스테이징·커밋을 거쳐 두 기록을 만들 수 있습니다.",
    "일반 diff와 --staged가 비교하는 대상을 구분할 수 있습니다.",
    "커밋 ID, 메시지, main과 HEAD를 그림과 기록에서 찾을 수 있습니다.",
    "이전 커밋에서 내용을 확인하고 main으로 돌아올 수 있습니다.",
    "새 브랜치에서 파일을 커밋하고 main으로 돌아와 병합 기록을 확인할 수 있습니다."
  ],
  "presentation": {
    "returnSummary": "메모의 두 버전을 기록하고 이전 기록을 확인했습니다. 별도 브랜치를 main에 합친 저장소를 다음 GitHub 강의에 사용합니다.",
    "caseSummary": "PyCharm에서 커밋에 남긴 변경을 살펴봅니다. 이어 Codex 화면에서 <mark>11개 변경 파일과 추가·삭제 줄 수</mark>를 읽습니다. 작업 중 변경과 커밋으로 남긴 기록을 구분한 뒤 메모 파일로 연습합니다."
  },
  "sections": [
    {
      "id": "git-example",
      "body": "### 저장과 커밋의 차이\n\n**저장**은 파일의 현재 내용을 바꾸고, **커밋**은 선택한 파일 상태를 메시지와 함께 Git 기록에 남깁니다. 터미널 강의의 `note.txt`로 두 동작을 연습합니다.\n\n### 1. Git 설치 확인\n\n```powershell\ngit --version\n```\n\n실습은 **Git 2.28 이상**을 기준으로 합니다. `git init -b`와 `git switch`를 사용합니다. 필요한 경우 설치하고 터미널을 다시 엽니다. [Git 공식 설치 안내](https://git-scm.com/install/windows)\n\n### 2. 앞서 만든 연습 폴더에서 시작\n\n```powershell\ncd ~\npwd\nTest-Path .\\git-practice\n```\n\n`Test-Path`가 **True**이고 앞에서 만든 폴더가 맞으면 이동합니다. 이름이나 위치가 다르면 실제 경로를 사용합니다. Windows PowerShell의 `cd`는 `Set-Location`, `pwd`는 `Get-Location`의 별칭입니다. `Test-Path`에는 기본 별칭이 없으며, cmd의 `if exist`나 macOS/Linux 기본 셸의 `test -e`로 비슷하게 확인합니다.\n\n```powershell\ncd .\\git-practice\npwd\nls -Force\nTest-Path .\\note.txt\nTest-Path .\\.git\ngit status\n```\n\n**note.txt는 True, .git은 False**인지 확인합니다. `git status`가 `fatal: not a git repository`를 보여 주면 처음부터 연습할 수 있습니다. 다른 파일이나 기존 저장소가 보이면 경로를 다시 확인합니다. `ls`는 Windows PowerShell의 `Get-ChildItem` 별칭입니다. 숨김 목록은 PowerShell `ls -Force`, cmd `dir /a`, macOS/Linux 기본 셸 `ls -a`로 봅니다.\n\n### 3. 연습 저장소 시작\n\n```powershell\ngit init -b main\n```\n\n`main`은 이번에 사용할 브랜치 이름입니다. 아래 두 명령 중 하나로 `.git` 폴더가 생겼는지 확인합니다.\n\n```powershell\nGet-ChildItem -Force\nls -Force\n```\n\n`.git`에는 Git 기록과 설정이, 그 바깥의 `note.txt`에는 직접 고칠 메모가 있습니다. 원격 공유는 GitHub 강의에서 합니다.",
      "presentationPoints": [
        "파일 저장은 현재 내용을 바꾸고, 커밋은 선택한 시점의 상태를 기록합니다.",
        "앞에서 만든 연습 폴더와 note.txt 및 기존 저장소 부재를 확인하고 git init -b main을 실행합니다.",
        "git --version으로 Git 설치를 확인합니다."
      ]
    },
    {
      "id": "git-why",
      "body": "### 1. 커밋 작성자 설정\n\n아래 수업용 이름과 이메일은 **현재 저장소에만** 적용됩니다. GitHub 로그인은 따로 진행합니다.\n\n```powershell\ngit config --local user.name \"Practice\"\ngit config --local user.email \"practice@example.com\"\n```\n\n### 2. 첫 문장 적고 저장\n\n```powershell\nnotepad note.txt\n```\n\n`git-practice/note.txt`의 `Hello, Codex!`를 아래로 바꾼 후 **Ctrl+S**를 누르고 닫습니다.\n\n```text\nversion 1\n```\n\n### 3. 상태 확인 → 선택 → 기록\n\n| 이름 | 이 실습에서의 뜻 |\n| --- | --- |\n| 작업 파일 | 메모장에서 읽고 고치는 note.txt의 현재 내용 |\n| 스테이징 | 다음 커밋에 넣기로 선택해 둔 내용 |\n| 커밋 기록 | 메시지와 함께 남긴 파일 상태의 스냅샷 |\n\n```powershell\ngit status\n```\n\n`Untracked files`에서 새 파일을 찾습니다.\n\n```powershell\ngit add note.txt\ngit status\n```\n\n`Changes to be committed`에 `note.txt`가 `new file`로 보이면 기록합니다.\n\n```powershell\ngit commit -m \"version 1\"\n```\n\n### 4. 기록 확인\n\n```powershell\ngit log --oneline\ngit status\n```\n\n`git log --oneline`에서 **커밋 ID**와 우리가 붙인 **version 1 메시지**를 확인합니다. `git status`에 변경이 없으면 기록할 내용이 남지 않은 상태입니다. `git add`로 선택한 뒤 다시 수정했다면, 새 수정도 기록하려면 다시 선택합니다.",
      "presentationPoints": [
        "작업 파일, 다음 기록에 선택한 스테이징, 완료된 커밋을 구분합니다.",
        "메모장 저장 → git status → git add → 상태 확인 → git commit 순서로 진행합니다.",
        "커밋 ID는 기록의 식별자이고 version 1은 직접 붙인 메시지입니다."
      ]
    },
    {
      "id": "git-diff"
    },
    {
      "id": "git-prompt",
      "body": "### 1. 지금 위치와 이전 기록 비교\n\n```powershell\ngit log --oneline\n```\n\n`HEAD -> main`에서 **main**은 브랜치 이름, **HEAD**는 내가 지금 보는 위치입니다. 두 커밋 실습에서 `HEAD~1`은 현재 커밋의 바로 이전 기록입니다.\n\n```powershell\ngit diff HEAD~1 HEAD -- note.txt\n```\n\n### 2. 이전 기록에 잠시 머무르기\n\n메모장을 저장하고 닫습니다. **main에 커밋이 두 개 있고 변경이 없을 때** 이동합니다.\n\n```powershell\ngit status\ngit log --oneline\n```\n\n```powershell\ngit switch --detach HEAD~1\n```\n\n`--detach`는 HEAD를 브랜치에서 떼어 이전 커밋을 직접 가리키게 합니다. **main은 version 2에 남고 HEAD만 version 1을 봅니다.** `detached HEAD`가 표시되면 이전 기록을 보는 중입니다. 이 단계에서는 파일만 읽습니다.\n\n```text\n이동 전: HEAD → main → version 2 → version 1\n이동 후:        main → version 2 → version 1 ← HEAD\n```\n\n```powershell\ngit status\ncat .\\note.txt\n```\n\n`version 1`이 보여야 합니다. Windows PowerShell의 `cat`은 `Get-Content` 별칭이며 `Get-Content .\\note.txt`로도 읽을 수 있습니다. cmd는 `type note.txt`, macOS/Linux 기본 셸은 `cat`을 사용합니다.\n\n### 3. version 2가 안 보이면 main을 기준으로 확인\n\n```powershell\ngit log --oneline\ngit log --oneline main\n```\n\n`git log`는 현재 HEAD에서 **이전 기록 쪽**으로 따라갑니다. 첫 명령은 version 1부터, 두 번째는 main의 version 2부터 봅니다.\n\n```text\n현재 위치의 log:  version 1\nmain의 log:      version 2 → version 1\n```\n\n### 4. main으로 돌아오기\n\n```powershell\ngit switch main\ngit status\ncat .\\note.txt\n```\n\n`main`으로 돌아와 파일에 **version 2**가 보이는지 확인합니다.\n\n### Codex에게 작업을 요청하는 예\n\n다음 실습을 위해 현재 메모는 version 2로 유지합니다. 아래는 AI에 전달하는 요청 예시입니다.\n\n```text\n현재 폴더와 Git 상태를 먼저 확인해 줘.\nnote.txt만 version 3으로 바꾸고 변경 diff를 보여 줘.\n다른 파일과 기존 변경은 보존해 줘.\nnote.txt를 스테이징하고 커밋할 내용을 확인한 뒤 로컬 커밋해 줘.\n커밋 ID와 남은 변경을 알려 줘.\n```\n\nAI가 작업한 뒤에도 `git status`와 `git log --oneline`을 확인합니다. 커밋이 끝났다면 일반 `git diff`는 비어 있을 수 있습니다.",
      "presentationPoints": [
        "HEAD가 브랜치에서 떨어져 이전 커밋을 직접 가리키는 상태가 detached HEAD입니다.",
        "현재 위치의 git log에는 version 2가 안 보이지만, git log --oneline main에서는 두 기록을 확인합니다.",
        "main은 version 2를 그대로 가리키며, git switch main으로 돌아와 파일을 확인합니다."
      ]
    },
    {
      "id": "git-branch",
      "body": "**브랜치**는 작업을 나누는 갈래입니다. `main`에서 `practice-branch`를 만들고 새 메모를 기록한 뒤 **merge(병합)**로 합칩니다.\n\n### 1. 시작 위치와 빈 이름 확인\n\n```powershell\npwd\ngit status\ngit log --oneline\nTest-Path .\\branch-note.txt\ngit branch --list practice-branch\n```\n\n- **내가 만든 git-practice**, 브랜치 **main**, 커밋 **version 1·2**, 변경 없는 상태(`working tree clean`)에서 시작합니다.\n- `Test-Path`는 **False**, 마지막 명령은 빈 출력이어야 합니다. 이름이 이미 있거나 결과가 다르면 멈춥니다.\n- Windows PowerShell의 `pwd`는 `Get-Location` 별칭이며 `Test-Path`에는 기본 별칭이 없습니다. cmd는 `if exist branch-note.txt echo 존재함`, macOS/Linux 기본 셸은 `test -e branch-note.txt` 뒤에 `echo $?`(0은 존재, 1은 없음)로 확인합니다.\n\n### 2. 브랜치 만들고 그쪽으로 이동\n\n```powershell\ngit switch -c practice-branch\ngit branch\n```\n\n`-c`는 새 브랜치를 만들며 전환합니다. `* practice-branch`가 현재 위치입니다.\n\n### 3. 새 메모 저장하고 기록\n\n```powershell\nnotepad branch-note.txt\n```\n\n새 파일 만들기를 선택해 아래 한 줄을 적고 **Ctrl+S**를 누른 뒤 메모장을 닫습니다.\n\n```text\nbranch work\n```\n\n```powershell\ngit status\n```\n\n`branch-note.txt`가 보이면 그 파일을 준비합니다.\n\n```powershell\ngit add branch-note.txt\ngit status\n```\n\n`Changes to be committed`에서 파일을 확인한 뒤 기록합니다.\n\n```powershell\ngit commit -m \"Add branch note\"\ngit status\n```\n\n### 4. main으로 돌아와 병합\n\n```powershell\ngit switch main\ngit status\nTest-Path .\\branch-note.txt\ncat .\\note.txt\n```\n\n병합 전에는 새 파일이 없으므로 **False**, 원래 메모는 **version 2**가 보여야 합니다.\n\n```powershell\ngit merge --no-ff -m \"Merge practice branch\" practice-branch\n```\n\n`--no-ff`는 이 실습에서 그래프로 볼 **병합 지점**을 남깁니다. `-m`은 메시지를 정합니다. 일반 `git merge practice-branch`는 새 병합 커밋 없이 합쳐질 수도 있습니다. 충돌이 나오면 상태부터 확인합니다.\n\n### 5. 두 갈래가 합쳐졌는지 확인\n\n```powershell\ngit log --oneline --graph --decorate\ngit status\nls\ncat .\\branch-note.txt\ncat .\\note.txt\n```\n\n그래프의 **Merge practice branch**와 **Add branch note**, 두 파일의 **branch work**와 **version 2**를 찾습니다. Windows PowerShell의 `ls`와 `cat`은 `Get-ChildItem`, `Get-Content`의 별칭입니다. cmd는 `dir`과 `type note.txt`, macOS/Linux 기본 셸은 `ls`와 `cat note.txt`를 씁니다. 다음 GitHub 실습에서 이 main의 기록을 보냅니다.",
      "presentationPoints": [
        "깨끗한 연습 저장소에서 파일과 브랜치 이름이 비어 있는지 확인합니다.",
        "practice-branch에서 새 파일을 커밋하고 main으로 돌아옵니다.",
        "--no-ff로 병합 지점을 남기고 그래프와 두 파일을 확인합니다."
      ]
    }
  ],
  "steps": [
    {
      "id": "git-01"
    },
    {
      "id": "git-help"
    },
    {
      "id": "git-02"
    },
    {
      "id": "git-02-enter"
    },
    {
      "id": "git-02-init",
      "description": "앞에서 확인한 새 연습 폴더에만 Git을 초기화합니다."
    },
    {
      "id": "git-hidden"
    },
    {
      "id": "git-03",
      "description": "앞에서 만든 같은 note.txt를 열어 Hello, Codex!를 version 1로 고치고 저장합니다."
    },
    {
      "id": "git-04"
    },
    {
      "id": "git-first-commit"
    },
    {
      "id": "git-05"
    },
    {
      "id": "git-05-diff"
    },
    {
      "id": "git-staged-diff"
    },
    {
      "id": "git-06"
    },
    {
      "id": "git-history-diff"
    },
    {
      "id": "git-07"
    },
    {
      "id": "git-07-switch"
    },
    {
      "id": "git-08"
    },
    {
      "id": "codex-09"
    },
    {
      "id": "git-branch-check"
    },
    {
      "id": "git-branch-switch"
    },
    {
      "id": "git-branch-edit"
    },
    {
      "id": "git-branch-stage"
    },
    {
      "id": "git-branch-commit"
    },
    {
      "id": "git-branch-return"
    },
    {
      "id": "git-branch-merge",
      "description": "깨끗한 main에서만 실행합니다. --no-ff는 병합 지점을 남기고 -m은 메시지를 지정합니다."
    },
    {
      "id": "git-branch-review"
    }
  ]
};
