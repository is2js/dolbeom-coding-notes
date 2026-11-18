// Published defaults before the beginner practice flow update.
export const previousPracticeFlowDefault = {
  "git": {
    "id": "git",
    "number": 2,
    "title": "Git: 한 파일로 처음 배우는 버전 기록",
    "shortTitle": "Git",
    "subtitle": "파일 저장과 커밋을 구분하고, 메모의 두 버전과 현재 위치를 직접 확인합니다.",
    "icon": "git",
    "durationMinutes": 45,
    "case": {
      "kind": "real",
      "title": "Git 기록에서 바뀐 파일과 내용을 찾아보기",
      "body": "### 개발 기록을 다시 살펴보는 화면\n\n아래는 제가 실제 프로젝트를 개발하며 Git 기록을 PyCharm에서 살펴본 화면입니다. 기능을 개선한 뒤 관련 변경을 하나의 **커밋**으로 기록해 두면, 나중에 어떤 작업을 했는지 기록 목록에서 찾아볼 수 있습니다. 커밋은 변경을 저장할 때마다 자동으로 생기는 것이 아니라, 기록할 내용을 골라 명시적으로 만듭니다.\n\n![PyCharm에서 Git 커밋 기록을 선택하고 관련 파일과 두 버전의 차이를 나란히 살펴보는 실제 프로젝트 화면](./assets/course/git-commit-diff-screenshot.png)\n\n### 화면을 읽는 순서\n\n1. **왼쪽 아래 기록 목록**에서 찾아보고 싶은 작업의 커밋을 선택합니다. 화면에서는 ‘RPG: 계정 캐릭터 관리 개선’ 기록을 선택했습니다.\n2. **오른쪽 파일 목록**에서 해당 기록과 관련된 파일을 살펴보고, 궁금한 파일을 선택합니다.\n3. **위쪽 Diff 화면**에서 선택한 파일의 두 버전을 나란히 비교합니다. 색으로 표시된 부분을 보며 어떤 줄이 달라졌는지 확인할 수 있습니다. 비교 기준과 화면 배치는 선택한 버전과 도구의 설정에 따라 달라질 수 있습니다.\n\n이렇게 작업을 의미 있는 단위로 기록하면 시간이 지난 뒤에도 특정 작업을 찾고, **어떤 파일이 바뀌었는지와 그 안의 변경 내용**을 확인하기 편합니다. Git이 버전 기록을 관리하고, 이 화면의 PyCharm은 그 기록과 차이를 보기 쉽게 보여 주는 도구입니다. 다른 IDE나 터미널에서도 Git 기록과 차이를 확인할 수 있습니다.\n\n이제 Git을 처음 사용하는 상황으로 돌아가, 새 폴더에 메모 파일을 만들고 저장·선택·기록·비교를 한 단계씩 연습합니다.",
      "question": "나중에 특정 작업을 다시 살펴보려면 어떤 단위로 기록하고, 바뀐 파일과 내용을 어떻게 확인하면 좋을까요?"
    },
    "objectives": [
      "새 연습 폴더에서 Git 저장소를 만들고 숨김 폴더 .git을 확인합니다.",
      "작업 파일·스테이징·커밋을 구분해 메모의 두 버전을 기록합니다.",
      "status·diff·log로 현재 상태와 기록 사이의 차이를 확인합니다.",
      "HEAD와 main의 역할을 이해하고 이전 기록을 본 뒤 main으로 돌아옵니다.",
      "새 브랜치에서 별도 파일을 기록하고 main에 합칩니다."
    ],
    "sections": [
      {
        "id": "git-example",
        "title": "Git 처음 시작하기: 파일 저장과 버전 기록",
        "minutes": 8,
        "optional": false,
        "body": "### 파일을 저장했는데 왜 Git이 필요할까요?\n\n메모를 고치고 저장하면 현재 파일의 내용이 바뀝니다. 어제 적었던 문장과 지금 문장이 어떻게 다른지 살펴보려면 이전 상태가 필요합니다. Git은 원하는 시점의 파일 상태를 설명과 함께 기록하는 **버전 관리 도구**입니다. 이번에는 코딩 대신 `note.txt` 한 파일로 기록과 비교를 연습합니다.\n\n커밋은 그 시점에 선택한 파일들의 상태를 담은 **스냅샷**으로 생각하면 됩니다. 사진을 찍듯 확인할 기준을 남기지만, 저장 버튼을 누를 때마다 자동으로 커밋되는 것은 아닙니다. 기존 내용과 같은 부분은 재사용될 수 있으므로 매번 모든 파일을 새 복사본으로 만드는 도구라고 외우지는 않습니다.\n\n### Git 설치와 도움말 확인\n\nWindows Terminal에서 PowerShell을 열고 Git이 설치되어 있는지 확인합니다. `git`으로 시작하는 명령은 Git 프로그램의 명령이며 PowerShell 전용 명령이나 별칭이 아닙니다.\n\n```powershell\ngit --version\n```\n\n버전이 표시되지 않으면 [Git 공식 설치 안내](https://git-scm.com/install/windows)를 따라 설치한 뒤 터미널을 다시 엽니다. 이 실습은 `git init -b`와 `git switch`를 사용할 수 있는 Git 2.28 이상을 기준으로 합니다. 명령이 낯설면 짧은 도움말을 확인할 수 있습니다. 도움말 확인은 파일을 바꾸지 않습니다.\n\n```powershell\ngit status -h\n```\n\n### 앞에서 만든 연습 폴더에서 시작\n\n터미널 강의에서 새로 만든 **git-practice 폴더와 note.txt**를 그대로 사용합니다. 앞에서 다른 이름이나 위치를 골랐다면 이후 모든 예시에도 실제 경로를 적용합니다. 먼저 홈의 폴더를 확인합니다. Windows PowerShell에서 `cd`는 `Set-Location`, `pwd`는 `Get-Location`의 기본 별칭입니다. `Test-Path`에는 기본 별칭이 없습니다.\n\n```powershell\ncd ~\npwd\nTest-Path .\\git-practice\n```\n\n`True`일 때 앞에서 **직접 새로 만든 연습 폴더**가 맞는지 확인한 후에만 이동합니다. 폴더가 없거나 기존 다른 프로젝트인지 확실하지 않으면 멈춥니다. cmd의 `if exist`, macOS/Linux 셸의 `test -e`는 비슷한 목적의 별도 문법입니다.\n\n```powershell\ncd .\\git-practice\npwd\nls -Force\nTest-Path .\\note.txt\nTest-Path .\\.git\ngit status\n```\n\n현재 위치와 방금 만든 `note.txt`를 확인합니다. 이 새 연습 폴더에는 그 메모만 있어야 합니다. `note.txt`는 `True`, `.git`은 `False`여야 합니다. 마지막 `git status`는 이 폴더나 상위 폴더에 이미 Git 저장소가 있는지 확인합니다. 새 연습 폴더에서 `fatal: not a git repository`처럼 **저장소가 없다는 오류가 나온 경우에만** 계속합니다. 브랜치와 상태가 표시된다면 상위 폴더를 포함해 이미 저장소 안에 있다는 뜻이므로 멈춥니다. 예상 밖의 파일이나 저장소가 있으면 기존 내용을 바꾸지 말고 멈춥니다. `ls`는 PowerShell `Get-ChildItem`의 별칭이며 `-Force`로 숨김 항목도 확인합니다. cmd는 `dir /a`, macOS/Linux 셸은 `ls -a`를 사용합니다.\n\n확인이 끝났다면 이 연습 폴더에만 Git 저장소를 초기화합니다. `main`은 이 실습에서 사용할 브랜치 이름입니다.\n\n```powershell\ngit init -b main\n```\n\n### .git이 생겼는지 살펴보기\n\n숨김 항목까지 표시하면 `.git` 폴더를 볼 수 있습니다. `Get-ChildItem`은 PowerShell 명령이고 `ls`는 기본 별칭입니다. 아래 두 명령은 비교용이므로 하나만 사용해도 됩니다.\n\n```powershell\nGet-ChildItem -Force\nls -Force\n```\n\n`.git`은 Git이 기록과 관리 정보를 보관하는 곳입니다. 밖의 `note.txt`는 우리가 읽고 고치는 파일이고, 안의 파일을 직접 편집할 필요는 없습니다. macOS/Linux 셸에서는 `ls -a`, cmd에서는 `dir /a`로 숨김 항목을 포함한 목록을 확인할 수 있습니다. 같은 별칭이 아니라 각 환경의 다른 명령입니다. 저장소를 초기화해도 GitHub에 업로드되지는 않습니다.",
        "presentationPoints": [
          "파일 저장은 현재 내용을 바꾸고, 커밋은 선택한 시점의 상태를 기록합니다.",
          "앞에서 만든 연습 폴더와 note.txt 및 기존 저장소 부재를 확인하고 git init -b main을 실행합니다.",
          "git status -h로 도움말을 읽으며 Git 명령을 익힙니다."
        ]
      },
      {
        "id": "git-why",
        "title": "첫 기록 만들기: 작업 파일·스테이징·커밋",
        "minutes": 9,
        "optional": false,
        "body": "### 커밋 작성자 설정\n\n커밋에는 작성자 이름과 이메일이 들어갑니다. 아래는 수업용 값이며 **현재 연습 저장소에만** 적용됩니다. GitHub 로그인이나 컴퓨터 전체의 설정을 바꾸는 명령은 아닙니다. 나중에 원격에 공유할 때는 사용할 이름과 이메일을 다시 확인합니다.\n\n```powershell\ngit config --local user.name \"Practice\"\ngit config --local user.email \"practice@example.com\"\n```\n\n### 메모장에 첫 문장 저장\n\n앞에서 만들고 확인한 같은 `git-practice/note.txt`를 메모장으로 엽니다. 예상한 파일이 아니라면 저장하지 말고 멈춥니다.\n\n```powershell\nnotepad note.txt\n```\n\n터미널 강의에서 직접 쓴 `Hello, Codex!`를 아래 한 줄로 바꾸고 **Ctrl+S로 저장한 뒤 메모장을 닫습니다.** 이 변경은 새 연습 파일에서만 합니다.\n\n```text\nversion 1\n```\n\n### 세 곳을 구분해 봅시다\n\n| 이름 | 이 실습에서의 뜻 |\n| --- | --- |\n| 작업 파일 | 메모장에서 읽고 고치는 note.txt의 현재 내용 |\n| 스테이징 | 다음 커밋에 넣기로 선택해 둔 내용 |\n| 커밋 기록 | 메시지와 함께 남긴 파일 상태의 스냅샷 |\n\n먼저 현재 상태를 확인합니다. 새 `note.txt`는 보통 `Untracked files` 아래에 보입니다. Git이 아직 이 파일을 기록할 대상으로 선택하지 않았다는 뜻입니다.\n\n```powershell\ngit status\n```\n\n다음 커밋에 넣을 파일을 선택한 뒤 상태를 다시 읽습니다.\n\n```powershell\ngit add -- note.txt\ngit status\n```\n\n이번에는 `Changes to be committed` 아래의 `new file`을 찾습니다. 커밋할 준비가 된 내용이라는 뜻이며 아직 커밋은 아닙니다. 선택한 내용을 기록합니다.\n\n```powershell\ngit commit -m \"version 1\"\n```\n\n성공 메시지를 확인한 뒤 커밋 목록과 현재 상태를 살펴봅니다. 오류가 났다면 다음 단계로 넘어가지 말고 원인을 확인합니다.\n\n```powershell\ngit log --oneline\ngit status\n```\n\n목록의 앞부분은 커밋을 식별하는 ID이며 컴퓨터마다 다릅니다. 뒤의 `version 1`은 우리가 붙인 **메시지**로, Git이 자동 발급하는 버전 번호가 아닙니다. 상태가 깨끗하다는 말은 현재 선택한 커밋과 비교해 기록할 변경이 없다는 뜻입니다.\n\n**저장 → add로 선택 → commit으로 기록**을 한 번씩 실행했습니다. `add`는 그때의 파일 내용을 선택합니다. 선택한 뒤 파일을 또 고치면 그 수정은 다시 선택하기 전까지 같은 커밋에 들어가지 않습니다.",
        "presentationPoints": [
          "작업 파일, 다음 기록에 선택한 스테이징, 완료된 커밋을 구분합니다.",
          "메모장 저장 → git status → git add → 상태 확인 → git commit 순서로 진행합니다.",
          "커밋 ID는 기록의 식별자이고 version 1은 직접 붙인 메시지입니다."
        ]
      },
      {
        "id": "git-diff",
        "title": "두 번째 버전 만들기: 상태와 변경 비교",
        "minutes": 9,
        "optional": false,
        "body": "### 같은 파일을 한 번 더 고치기\n\n첫 커밋을 만든 저장소에서 같은 메모를 엽니다.\n\n```powershell\nnotepad note.txt\n```\n\n내용을 아래처럼 바꾸고 **저장한 뒤 메모장을 닫습니다.** 저장이 끝난 다음에 터미널로 돌아옵니다.\n\n```text\nversion 2\n```\n\n### 아직 선택하지 않은 변경 읽기\n\n`git status`에서 `modified: note.txt`를 찾고 Diff를 확인합니다.\n\n```powershell\ngit status\ngit diff -- note.txt\n```\n\n일반 `git diff`는 **작업 파일과 스테이징에 선택해 둔 내용**을 비교합니다. 이 단계에서는 스테이징이 첫 커밋의 내용과 같으므로 `-version 1`, `+version 2`가 보입니다. `-`는 비교 기준에서 빠진 줄, `+`는 새로 들어온 줄입니다. 색은 터미널 설정에 따라 달라질 수 있습니다.\n\n### 선택한 변경도 다시 확인하기\n\n버전 2를 다음 커밋에 넣도록 선택한 뒤, 두 비교를 차례로 살펴봅니다.\n\n```powershell\ngit add -- note.txt\ngit diff -- note.txt\ngit diff --staged -- note.txt\n```\n\n파일을 더 고치지 않았다면 일반 `git diff`는 비어 있습니다. 작업 파일과 스테이징이 같아졌기 때문입니다. 변경이 사라진 것이 아닙니다. `git diff --staged`는 **스테이징과 최신 커밋**을 비교하므로, 첫 커밋에서 버전 2로 바뀔 내용이 보입니다.\n\n| 명령 | 비교하는 대상 |\n| --- | --- |\n| git diff | 현재 작업 파일 ↔ 스테이징 |\n| git diff --staged | 스테이징 ↔ 최신 커밋 |\n\n아직 추적하지 않은 새 파일의 내용은 일반 `git diff`에 표시되지 않을 수 있습니다. 그래서 파일 이름과 상태를 먼저 `git status`로 읽고, 상황에 맞는 비교를 사용합니다.\n\n### 두 번째 기록 남기기\n\n선택한 한 줄이 맞는지 확인했으면 기록합니다.\n\n```powershell\ngit commit -m \"version 2\"\ngit log --oneline\ngit status\n```\n\n이제 메모 파일 하나에 커밋 두 개가 생겼습니다. 보통 목록 위쪽이 새 커밋입니다. Git은 내 컴퓨터에서 기록을 관리하고, GitHub는 저장소를 원격에 보관하고 협업하는 서비스입니다. 로컬 커밋만으로 GitHub에 자동 업로드되지는 않습니다. 원격 공유는 다음 주제에서 살펴봅니다.",
        "presentationPoints": [
          "메모를 version 2로 저장한 뒤 status와 diff로 변경을 읽습니다.",
          "일반 diff는 작업 파일↔스테이징, --staged는 스테이징↔최신 커밋입니다.",
          "선택한 변경을 확인하고 두 번째 커밋을 만듭니다."
        ]
      },
      {
        "id": "git-prompt",
        "title": "기록 살펴보기: 이전 버전에 다녀와 main으로 복귀",
        "minutes": 9,
        "optional": false,
        "body": "### main과 HEAD는 어디를 가리킬까요?\n\n두 커밋을 만든 뒤 `git log --oneline`에서 가장 최근 커밋 옆의 `HEAD -> main`을 찾아봅니다. **main**은 이 실습의 브랜치 이름이고 최신 커밋을 가리킵니다. **HEAD**는 지금 확인하고 있는 위치를 가리킵니다. 평소에는 HEAD가 main을 통해 현재 커밋을 보고 있다고 이해하면 됩니다.\n\n```powershell\ngit log --oneline\n```\n\n커밋에는 앞선 기록으로 이어지는 관계도 있습니다. `HEAD~1`은 현재 커밋의 첫 번째 부모, 이 단순한 두 커밋 실습에서는 바로 이전 기록입니다. 두 기록의 파일 차이를 읽어 봅니다.\n\n```powershell\ngit diff HEAD~1 HEAD -- note.txt\n```\n\n### 예전 파일을 직접 보기 전에 확인\n\n메모장을 저장하고 닫습니다. 현재 브랜치가 main이고, 변경이 없는 깨끗한 상태이며 두 커밋이 있는지 확인합니다.\n\n```powershell\ngit status\ngit log --oneline\n```\n\n변경이 남아 있거나 커밋이 하나뿐이면 여기서 멈춥니다. 상태를 읽고 다음 명령을 따로 실행합니다.\n\n```powershell\ngit switch --detach HEAD~1\n```\n\n### detach: 이전 커밋에 잠시 머무르기\n\n`--detach`는 ‘떼어 놓다’라는 뜻입니다. 평소 `HEAD → main → version 2`처럼 브랜치를 통해 보던 현재 위치를, 이번에는 **브랜치에서 떼어 이전 커밋을 직접 보도록** 바꿉니다. 이 명령을 실행하기 전 `HEAD~1`은 version 2의 바로 이전 커밋을 뜻합니다. 이동 후에는 HEAD의 위치가 바뀌므로 같은 표현도 새 현재 위치의 부모를 뜻합니다. Git의 `detached HEAD` 메시지는 오류가 아니라 브랜치에 붙지 않은 현재 위치를 알려줍니다.\n\n```text\n이동 전: HEAD → main → version 2 → version 1\n이동 후:        main → version 2 → version 1 ← HEAD\n```\n\n화살표는 이해를 위한 간단한 그림입니다. **main은 여전히 version 2를 가리키며, 기존 기록을 삭제하거나 main을 뒤로 옮기지 않았습니다.** 이 상태에서 새 커밋을 만들면 main에 자동으로 붙지 않습니다. 이번에는 파일을 고치거나 새 커밋을 만들지 않고 살펴보기만 합니다.\n\n```powershell\ngit status\ncat .\\note.txt\n```\n\n`version 1`이 보이는지 확인합니다. Windows PowerShell의 `cat`은 `Get-Content`의 기본 별칭으로 `Get-Content .\\note.txt`와 같은 역할입니다. macOS/Linux에도 별도의 `cat` 명령이 있고 cmd에서는 `type note.txt`를 사용합니다. 같은 이름이어도 셸의 명령과 옵션은 다를 수 있습니다.\n\n### 왜 git log에서 version 2가 안 보일까요?\n\n`git log`는 기본적으로 **현재 HEAD가 가리키는 커밋부터 부모 방향으로** 기록을 보여 줍니다. 지금 HEAD는 version 1에 있으므로 그보다 나중에 만든 version 2가 기본 목록에 나타나지 않습니다. version 2가 삭제됐다는 뜻은 아닙니다.\n\n```powershell\ngit log --oneline\ngit log --oneline main\n```\n\n첫 번째 명령은 지금 위치인 version 1부터 보여 줍니다. 두 번째는 **main이 가리키는 위치부터** 기록을 보여 주므로 version 2와 version 1이 모두 보입니다. 두 명령은 목록만 읽으며 현재 파일을 바꾸거나 이동하지 않습니다. 커밋 ID와 출력 모양은 컴퓨터에 따라 다릅니다.\n\n```text\n현재 위치의 log:  version 1\nmain의 log:      version 2 → version 1\n```\n\n이 두 목록을 비교한 뒤 `git switch main`으로 돌아가 파일도 version 2로 바뀌는지 확인합니다.\n\n### main으로 돌아오기\n\n이번에는 이전 상태에서 파일을 고치거나 커밋하지 않고 읽기만 합니다. 돌아갈 곳을 이름으로 지정합니다.\n\n```powershell\ngit switch main\ngit status\ncat .\\note.txt\n```\n\n현재 브랜치가 main이고 `version 2`가 보이는지 확인합니다. 커밋 두 개도 그대로 남아 있습니다. 예전 상태에서 실수로 파일을 고쳤다면 전환을 반복하지 말고, 보존할 변경과 현재 상태를 먼저 확인합니다.\n\n### Codex에게 같은 작업을 부탁한다면\n\n수강생이 방금 익힌 순서를 요청에 넣으면 AI가 무엇을 했는지 읽기 쉬워집니다. 아래는 설명용 예시입니다. 이어지는 실습을 위해 지금은 실행하지 않고 version 2를 유지합니다.\n\n```text\n현재 폴더와 Git 상태를 먼저 확인해 줘.\nnote.txt만 version 3으로 바꾸고 변경 diff를 보여 줘.\n다른 파일과 기존 변경은 보존해 줘.\nnote.txt를 스테이징하고 커밋할 내용을 확인한 뒤 로컬 커밋해 줘.\n커밋 ID와 남은 변경을 알려 줘.\n```\n\nAI의 답변 뒤에도 `git status`, `git log --oneline`과 기록 사이의 차이를 확인합니다. 이미 커밋했다면 일반 `git diff`가 비어 있을 수 있다는 점을 기억합니다. 이제 main에서 새 브랜치를 만들어 별도 작업을 기록하고 다시 합쳐 보겠습니다.",
        "presentationPoints": [
          "HEAD가 브랜치에서 떨어져 이전 커밋을 직접 가리키는 상태가 detached HEAD입니다.",
          "현재 위치의 git log에는 version 2가 안 보이지만, git log --oneline main에서는 두 기록을 확인합니다.",
          "main은 version 2를 그대로 가리키며, git switch main으로 돌아와 파일을 확인합니다."
        ]
      },
      {
        "id": "git-branch",
        "title": "브랜치에서 수정하고 main에 합치기",
        "minutes": 10,
        "optional": false,
        "body": "### 브랜치란 무엇일까요?\n\n브랜치는 **작업을 나누는 갈래**입니다. 지금까지 만든 `main`에서 `practice-branch`라는 갈래를 만들고 새 파일에 작업합니다. 완료하면 `main`으로 돌아와 그 기록을 **merge(병합)**해 합칩니다. `note.txt`의 `version 2`는 그대로 둡니다.\n\n### 1. 실습 위치와 이름을 확인합니다\n\n앞에서 만든 **새 연습용 `git-practice` 폴더**에서만 진행합니다. 다른 프로젝트나 소중한 파일이 있는 폴더에서 따라 하지 않습니다. 메모장을 저장하고 닫은 뒤 확인합니다.\n\n```powershell\npwd\ngit status\ngit log --oneline\nTest-Path .\\branch-note.txt\ngit branch --list practice-branch\n```\n\n`pwd`는 PowerShell `Get-Location`의 기본 별칭입니다. `main`이고 `working tree clean`이며 `version 1`·`version 2` 기록이 있는지 확인합니다. `Test-Path` 결과가 **False**이고 마지막 명령이 아무것도 표시하지 않아야 새 이름을 쓸 수 있습니다. True이거나 같은 브랜치가 있거나 상태가 예상과 다르면 **멈추고 기존 파일과 기록을 보존**합니다. `Test-Path`에는 PowerShell 기본 별칭이 없습니다. cmd에서는 `if exist branch-note.txt echo 존재함`으로 확인합니다. macOS/Linux 셸에서는 `test -e branch-note.txt` 실행 후 `echo $?`로 결과를 확인할 수 있습니다. 0은 존재, 1은 존재하지 않음을 뜻합니다.\n\n### 2. 새 작업 갈래를 만듭니다\n\n```powershell\ngit switch -c practice-branch\ngit branch\n```\n\n`-c`는 브랜치를 만들고 그쪽으로 이동합니다. 목록의 `* practice-branch`는 현재 위치를 뜻합니다.\n\n### 3. 새 파일을 만들고 기록합니다\n\n```powershell\nnotepad branch-note.txt\n```\n\n새 파일 만들기를 확인하고 아래 한 줄을 입력합니다. **Ctrl+S로 저장하고 메모장을 닫습니다.**\n\n```text\nbranch work\n```\n\n```powershell\ngit status\n```\n\n`branch-note.txt`가 새 파일로 표시되는지 확인한 다음, 그 파일만 스테이징합니다.\n\n```powershell\ngit add branch-note.txt\ngit status\n```\n\n`Changes to be committed`에 이 파일이 보이면 커밋합니다.\n\n```powershell\ngit commit -m \"Add branch note\"\ngit status\n```\n\n커밋이 성공하고 변경이 없는 깨끗한 상태인지 확인합니다. 문제나 예상하지 못한 파일이 보이면 멈춰 확인합니다.\n\n### 4. main으로 돌아와 병합합니다\n\n```powershell\ngit switch main\ngit status\nTest-Path .\\branch-note.txt\ncat .\\note.txt\n```\n\n`main`의 상태가 깨끗하고, 새 파일은 아직 없으므로 `False`, 기존 메모는 `version 2`가 보여야 합니다. 다르면 멈춥니다. `cat`은 PowerShell의 `Get-Content` 기본 별칭입니다. cmd에서는 `type note.txt`, macOS/Linux에서는 `cat note.txt`를 사용합니다.\n\n이 실습에서는 합쳐진 지점을 그래프로 보기 위해 병합 커밋을 명시적으로 남깁니다.\n\n```powershell\ngit merge --no-ff -m \"Merge practice branch\" practice-branch\n```\n\n`--no-ff`는 직선으로 앞으로 이동할 수 있는 경우에도 병합 지점을 기록합니다. `-m`은 편집기 없이 병합 메시지를 지정합니다. 보통 `git merge practice-branch`처럼 실행하면 상황에 따라 빠른 이동(fast-forward)으로 합쳐져 별도 병합 커밋이 생기지 않을 수 있습니다. 충돌이나 다른 출력이 나타나면 임의로 덮어쓰지 말고 멈춰 확인합니다.\n\n### 5. 합쳐진 기록과 두 파일을 확인합니다\n\n```powershell\ngit log --oneline --graph --decorate\ngit status\nls\ncat .\\branch-note.txt\ncat .\\note.txt\n```\n\n그래프에서 갈라졌다가 다시 합쳐지는 선과 `Merge practice branch`, `Add branch note`를 찾아봅니다. `branch work`와 기존 `version 2`가 모두 보이면 성공입니다. `ls`는 PowerShell `Get-ChildItem`, `cat`은 `Get-Content`의 기본 별칭입니다. cmd에서는 `dir`과 `type`, macOS/Linux에서는 `ls`와 `cat`을 씁니다.\n\n다음 GitHub 강의에서는 이 병합된 `main`을 원격에 올린 뒤, 다른 폴더에서 두 파일과 기록을 다시 받습니다.",
        "presentationPoints": [
          "깨끗한 연습 저장소에서 파일과 브랜치 이름이 비어 있는지 확인합니다.",
          "practice-branch에서 새 파일을 커밋하고 main으로 돌아옵니다.",
          "--no-ff로 병합 지점을 남기고 그래프와 두 파일을 확인합니다."
        ]
      }
    ],
    "pitfalls": [
      {
        "title": "저장·add·commit을 같은 동작으로 생각하기",
        "body": "저장은 작업 파일을 바꾸고 add는 다음 기록의 내용을 선택하며 commit은 선택한 상태를 기록합니다."
      },
      {
        "title": "add 후 일반 diff가 비면 변경이 없어졌다고 생각하기",
        "body": "일반 diff는 작업 파일과 스테이징을 비교합니다. 선택한 변경은 diff --staged로 최신 커밋과 비교합니다."
      },
      {
        "title": "커밋 메시지를 자동 버전 번호로 생각하기",
        "body": "version 1·2는 직접 쓴 메시지이며 실제 기록은 커밋 ID로 식별합니다."
      },
      {
        "title": ".git 내부를 직접 고치거나 기존 폴더를 덮어쓰기",
        "body": "새 연습 폴더와 현재 위치를 확인합니다. .git은 관찰만 하고 파일은 직접 편집하지 않습니다."
      },
      {
        "title": "변경이 남아 있는데 과거로 이동하거나 돌아갈 곳을 잊기",
        "body": "상태가 깨끗한지 확인하고 이전 기록에서는 읽기만 합니다. git switch main으로 돌아와 main과 version 2를 확인합니다."
      },
      {
        "title": "실습 전 기존 파일이나 브랜치를 덮어쓰기",
        "body": "새 연습 저장소에서 현재 위치와 깨끗한 main, 파일과 브랜치 이름을 확인합니다. 이미 존재하거나 예상과 다르면 멈추고 기존 작업을 보존합니다."
      }
    ],
    "checklist": [
      "새 연습 저장소의 .git과 작업 파일이 하는 역할을 구분할 수 있습니다.",
      "파일 저장·스테이징·커밋을 거쳐 두 기록을 만들 수 있습니다.",
      "일반 diff와 --staged가 비교하는 대상을 구분할 수 있습니다.",
      "커밋 ID, 메시지, main과 HEAD를 그림과 기록에서 찾을 수 있습니다.",
      "이전 커밋에서 내용을 확인하고 main으로 돌아올 수 있습니다.",
      "새 브랜치에서 파일을 커밋하고 main으로 돌아와 병합 기록을 확인할 수 있습니다."
    ],
    "steps": [
      {
        "id": "git-01",
        "title": "Git 설치와 기존 연습 폴더 확인",
        "description": "Git 버전과 터미널 강의에서 직접 만든 연습 폴더의 위치를 확인합니다.",
        "scene": "terminal",
        "code": "git --version\ncd ~\npwd\nTest-Path .\\git-practice",
        "language": "powershell",
        "output": "True이면 직접 만든 연습 폴더인지 확인합니다. 없거나 다른 프로젝트라면 멈춥니다.",
        "focus": "git",
        "fileName": "준비 확인",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-help",
        "title": "짧은 도움말 읽기",
        "description": "상태 명령에 어떤 선택지가 있는지 도움말을 봅니다.",
        "scene": "terminal",
        "code": "git status -h",
        "language": "powershell",
        "output": "도움말은 파일을 바꾸지 않습니다. 모든 선택지를 외울 필요는 없습니다.",
        "focus": "git",
        "fileName": "Git 도움말",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-02",
        "title": "같은 연습 폴더로 이동",
        "description": "앞에서 직접 만든 폴더로 이동하고 예상한 경로인지 확인합니다.",
        "scene": "terminal",
        "code": "cd .\\git-practice\npwd",
        "language": "powershell",
        "output": "pwd가 직접 만든 연습 폴더를 표시해야 합니다.",
        "focus": "git",
        "fileName": "연습 폴더",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-02-enter",
        "title": "메모와 기존 Git 저장소 확인",
        "description": "숨김 파일까지 확인하고 앞서 만든 메모와 기존 저장소 유무를 확인합니다.",
        "scene": "terminal",
        "code": "ls -Force\nTest-Path .\\note.txt\nTest-Path .\\.git\ngit status",
        "language": "powershell",
        "output": "메모 True, .git False, git status는 저장소가 없다는 오류여야 합니다. 브랜치나 예상 밖의 파일이 보이면 멈춥니다.",
        "focus": "git",
        "fileName": "현재 위치",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-02-init",
        "title": "확인한 연습 폴더에 저장소 만들기",
        "description": "앞에서 확인한 새 연습 폴더에만 Git을 초기화합니다.",
        "scene": "terminal",
        "code": "git init -b main",
        "language": "powershell",
        "output": "GitHub 업로드가 아니라 현재 연습 폴더의 Git 관리 시작입니다.",
        "focus": "git",
        "fileName": "연습 저장소",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-hidden",
        "title": "숨김 .git 폴더 보기",
        "description": "PowerShell 명령과 기본 별칭으로 숨김 항목을 관찰합니다.",
        "scene": "terminal",
        "code": "Get-ChildItem -Force\nls -Force",
        "language": "powershell",
        "output": ".git은 기록 관리 정보입니다. 보기만 하고 내부 파일은 편집하지 않습니다.",
        "focus": "git",
        "fileName": ".git",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-03",
        "title": "연습용 작성자와 첫 메모",
        "description": "앞에서 만든 같은 note.txt를 열어 Hello, Codex!를 version 1로 고치고 저장합니다.",
        "scene": "terminal",
        "code": "git config --local user.name \"Practice\"\ngit config --local user.email \"practice@example.com\"\nnotepad note.txt",
        "language": "powershell",
        "output": "같은 note.txt의 내용을 version 1로 바꾸고 Ctrl+S로 저장한 뒤 닫습니다.",
        "focus": "git",
        "fileName": "note.txt",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-04",
        "title": "첫 파일 상태와 스테이징 확인",
        "description": "새 파일 상태를 읽고 다음 커밋에 넣을 내용을 선택합니다.",
        "scene": "terminal",
        "code": "git status\ngit add -- note.txt\ngit status",
        "language": "powershell",
        "output": "Untracked files → Changes to be committed 상태를 비교합니다.",
        "focus": "git",
        "fileName": "첫 스테이징",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-first-commit",
        "title": "버전 1 기록",
        "description": "선택한 내용을 첫 커밋으로 남긴 뒤 목록과 상태를 읽습니다.",
        "scene": "terminal",
        "code": "git commit -m \"version 1\"\ngit log --oneline\ngit status",
        "language": "powershell",
        "output": "ID는 기록 식별자이며 version 1은 직접 붙인 메시지입니다.",
        "focus": "git",
        "fileName": "첫 커밋",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-05",
        "title": "메모장에서 버전 2로 수정",
        "description": "version 2로 고치고 저장·종료한 다음 다음 단계로 갑니다.",
        "scene": "terminal",
        "code": "notepad note.txt",
        "language": "powershell",
        "output": "Ctrl+S로 저장하고 메모장을 닫습니다.",
        "focus": "git",
        "fileName": "note.txt",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-05-diff",
        "title": "아직 선택하지 않은 변경 읽기",
        "description": "메모장 종료 후 작업 파일과 스테이징을 비교합니다.",
        "scene": "terminal",
        "code": "git status\ngit diff -- note.txt",
        "language": "powershell",
        "output": "예상: -version 1, +version 2.",
        "focus": "git",
        "fileName": "작업 파일 비교",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-staged-diff",
        "title": "선택한 내용의 비교 읽기",
        "description": "add 후 두 종류의 diff가 비교하는 대상을 확인합니다.",
        "scene": "terminal",
        "code": "git add -- note.txt\ngit diff -- note.txt\ngit diff --staged -- note.txt",
        "language": "powershell",
        "output": "일반 diff는 비고, --staged에서 첫 커밋과 다른 줄이 보입니다.",
        "focus": "git",
        "fileName": "스테이징 비교",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-06",
        "title": "버전 2 기록과 두 커밋 확인",
        "description": "선택한 한 줄이 맞으면 두 번째 커밋을 만듭니다.",
        "scene": "terminal",
        "code": "git commit -m \"version 2\"\ngit log --oneline\ngit status",
        "language": "powershell",
        "output": "두 커밋과 깨끗한 상태를 확인합니다.",
        "focus": "git",
        "fileName": "두 번째 커밋",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-history-diff",
        "title": "두 기록 사이의 차이",
        "description": "현재 커밋과 바로 이전 부모 커밋의 파일을 비교합니다.",
        "scene": "terminal",
        "code": "git diff HEAD~1 HEAD -- note.txt",
        "language": "powershell",
        "output": "작업 중인 수정이 아니라 이미 남긴 두 기록 사이의 비교입니다.",
        "focus": "git",
        "fileName": "기록 비교",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-07",
        "title": "이전 기록 방문 전 확인",
        "description": "메모장을 닫고 main·깨끗한 상태·두 커밋을 확인합니다.",
        "scene": "terminal",
        "code": "git status\ngit log --oneline",
        "language": "powershell",
        "output": "조건이 맞지 않으면 여기서 멈추고 상태를 확인합니다.",
        "focus": "git",
        "fileName": "전환 전 확인",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-07-switch",
        "title": "이전 커밋 방문",
        "description": "detach는 HEAD를 브랜치에서 떼어 이전 커밋을 직접 보는 것입니다. 파일은 읽기만 합니다.",
        "scene": "terminal",
        "code": "git switch --detach HEAD~1",
        "language": "powershell",
        "output": "이동 후 HEAD는 version 1, main은 여전히 version 2를 가리킵니다. 오류가 아닙니다.",
        "focus": "git",
        "fileName": "이전 기록 방문",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-08",
        "title": "이전 파일과 두 로그 비교",
        "description": "version 1을 읽고 현재 HEAD의 로그와 main의 로그를 비교합니다.",
        "scene": "terminal",
        "code": "git status\ncat .\\note.txt\ngit log --oneline\ngit log --oneline main",
        "language": "powershell",
        "output": "파일과 현재 로그에는 version 1, main의 로그에는 version 2와 version 1이 보입니다. cat은 PowerShell의 Get-Content 기본 별칭입니다.",
        "focus": "git",
        "fileName": "이전 파일",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "codex-09",
        "title": "main으로 돌아오기",
        "description": "이 실습의 브랜치 이름을 지정해 원래 작업으로 돌아옵니다.",
        "scene": "terminal",
        "code": "git switch main\ngit status\ncat .\\note.txt",
        "language": "powershell",
        "output": "main과 version 2를 확인합니다. 두 커밋은 그대로 남아 있습니다.",
        "focus": "git",
        "fileName": "현재 파일",
        "files": [
          "git-practice/",
          ".git/",
          "note.txt"
        ]
      },
      {
        "id": "git-branch-check",
        "title": "실습 상태와 새 이름 확인",
        "description": "새 연습 저장소의 깨끗한 main과 두 기존 커밋을 확인합니다. 파일이 있거나 브랜치 이름이 이미 보이면 멈춥니다.",
        "scene": "terminal",
        "code": "pwd\ngit status\ngit log --oneline\nTest-Path .\\branch-note.txt\ngit branch --list practice-branch",
        "language": "powershell",
        "output": "main, clean, version 1·2, False와 빈 브랜치 목록을 확인합니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-switch",
        "title": "새 작업 갈래 만들기",
        "description": "이름이 비어 있음을 확인한 후 브랜치를 만들고 이동합니다.",
        "scene": "terminal",
        "code": "git switch -c practice-branch\ngit branch",
        "language": "powershell",
        "output": "* practice-branch를 확인합니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-edit",
        "title": "새 파일에 메모 쓰기",
        "description": "새 파일 만들기를 확인하고 branch work 한 줄을 쓴 뒤 Ctrl+S로 저장하고 닫습니다.",
        "scene": "terminal",
        "code": "notepad branch-note.txt\ngit status",
        "language": "powershell",
        "output": "branch-note.txt가 새 파일로 표시됩니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-stage",
        "title": "새 파일만 준비하기",
        "description": "파일을 확인한 뒤 커밋할 대상으로 선택합니다.",
        "scene": "terminal",
        "code": "git add branch-note.txt\ngit status",
        "language": "powershell",
        "output": "Changes to be committed에서 branch-note.txt를 확인합니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-commit",
        "title": "브랜치에서 기록하기",
        "description": "선택한 파일만 커밋한 뒤 상태가 깨끗한지 확인합니다.",
        "scene": "terminal",
        "code": "git commit -m \"Add branch note\"\ngit status",
        "language": "powershell",
        "output": "커밋 성공과 깨끗한 상태를 확인합니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-return",
        "title": "main으로 돌아와 상태 확인",
        "description": "깨끗한 상태에서 돌아옵니다. 새 파일이 없고 기존 메모가 version 2인지 확인합니다.",
        "scene": "terminal",
        "code": "git switch main\ngit status\nTest-Path .\\branch-note.txt\ncat .\\note.txt",
        "language": "powershell",
        "output": "main, clean, False, version 2. 예상과 다르면 멈춥니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-merge",
        "title": "작업을 main에 합치기",
        "description": "깨끗한 main에서만 실행합니다. --no-ff는 병합 지점을 남기고 -m은 메시지를 지정합니다.",
        "scene": "terminal",
        "code": "git merge --no-ff -m \"Merge practice branch\" practice-branch",
        "language": "powershell",
        "output": "병합 커밋이 기록됩니다. 충돌이나 다른 결과가 나오면 멈춥니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      },
      {
        "id": "git-branch-review",
        "title": "분기와 병합 기록 확인",
        "description": "갈라졌다 합쳐지는 선과 두 파일을 확인합니다. ls와 cat은 PowerShell 기본 별칭입니다.",
        "scene": "terminal",
        "code": "git log --oneline --graph --decorate\ngit status\nls\ncat .\\branch-note.txt\ncat .\\note.txt",
        "language": "powershell",
        "output": "Merge practice branch, branch work, version 2를 확인합니다.",
        "focus": "git",
        "fileName": "브랜치 실습",
        "files": [
          "git-practice/",
          "note.txt",
          "branch-note.txt"
        ]
      }
    ],
    "glossary": [
      {
        "term": "Git",
        "definition": "파일 상태를 기록하고 그 기록 사이의 차이를 살펴보는 버전 관리 도구입니다."
      },
      {
        "term": ".git",
        "definition": "현재 저장소의 Git 기록과 관리 정보를 담는 디렉터리입니다."
      },
      {
        "term": "작업 파일",
        "definition": "현재 폴더에서 우리가 읽고 수정하는 파일입니다. 이 파일들의 작업 공간을 작업 트리라고도 부릅니다."
      },
      {
        "term": "스테이징",
        "definition": "다음 커밋에 포함할 내용을 선택해 두는 과정과 그 상태입니다. 인덱스라고도 부릅니다."
      },
      {
        "term": "커밋",
        "definition": "선택한 파일 상태의 스냅샷과 설명, 이전 기록과의 관계 등을 담는 기록입니다."
      },
      {
        "term": "커밋 ID",
        "definition": "커밋을 식별하는 값입니다. 로그에서는 보통 짧게 줄여 표시합니다."
      },
      {
        "term": "diff",
        "definition": "비교하는 두 상태에서 어떤 줄이 달라졌는지 보여 주는 차이입니다."
      },
      {
        "term": "브랜치",
        "definition": "작업 흐름을 나누는 이름입니다. 이 실습에서는 main에서 practice-branch를 만들고 별도 작업을 기록합니다."
      },
      {
        "term": "HEAD",
        "definition": "지금 확인하는 위치를 나타냅니다. 보통 현재 브랜치를 통해 커밋을 가리키고, 이전 커밋을 직접 볼 수도 있습니다."
      },
      {
        "term": "GitHub",
        "definition": "Git 저장소를 원격에 보관하고 협업할 수 있는 서비스입니다. 다음 주제에서 다룹니다."
      },
      {
        "term": "merge",
        "definition": "다른 브랜치의 기록을 현재 브랜치에 합치는 작업입니다."
      }
    ],
    "references": [
      {
        "title": "Git 기초 강의 기록",
        "url": "https://blog.chojaeseong.com/git/%EC%9A%B0%ED%85%8C%EC%BD%94/2022/02/17/%EC%A4%80)-upstream%EA%B3%BC-git%EA%B0%9D%EC%B2%B4-%EA%B0%95%EC%9D%98(%EC%99%84).html"
      },
      {
        "title": "Git · 파일 상태 기록과 스테이징",
        "url": "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository"
      },
      {
        "title": "Git · 스냅샷과 세 가지 상태",
        "url": "https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F"
      },
      {
        "title": "Git · 기록 살펴보기",
        "url": "https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History"
      },
      {
        "title": "Git · switch로 확인 위치 바꾸기",
        "url": "https://git-scm.com/docs/git-switch"
      }
    ],
    "closing": "메모의 두 버전을 기록하고 이전 기록을 확인했습니다. 별도 브랜치에서 만든 파일을 main에 합친 뒤, 다음 GitHub 강의에서 이 저장소를 원격에 올리고 다른 폴더에 복제합니다.",
    "presentation": {
      "caseSummary": "실제 개발 기록에서 커밋·변경 파일·Diff를 살펴봅니다. 이어서 Git을 처음 사용하는 상황으로 돌아가 메모 파일 하나의 두 기록을 직접 만듭니다.",
      "demo": {
        "program": "Windows Terminal · PowerShell · 메모장",
        "file": "터미널 강의의 git-practice 폴더 · 같은 note.txt와 새 branch-note.txt",
        "command": "Git 버전·도움말 확인 → 앞에서 만든 폴더와 note.txt 확인 → 기존 .git·상위 저장소가 없을 때 git init -b main → ls -Force로 .git 관찰\n기존 note.txt를 메모장에서 version 1로 수정·저장·종료 → status → add → 상태 확인 → 첫 commit\n메모장 version 2 저장·종료 → status → diff → add → diff --staged\n두 번째 commit → log에서 HEAD와 main 확인\n상태가 깨끗함 확인 → detach로 이전 커밋 방문 → version 1 읽기 → 현재 log와 main log 비교\ngit switch main → main과 version 2 확인\n새 브랜치와 파일 이름 확인 → practice-branch 생성 → branch-note.txt 저장·커밋\nmain 복귀 → git merge --no-ff -m \"Merge practice branch\" practice-branch → 그래프·파일 확인",
        "expectedResult": "메모 두 버전의 차이를 살펴봅니다. 이전 커밋에서 기본 log에 version 2가 안 보이는 이유를 main 로그와 비교하고 main으로 돌아옵니다. 별도 브랜치의 파일을 main에 합친 뒤 분기와 병합 그래프를 확인합니다.",
        "durationMinutes": 20
      },
      "returnSummary": "메모의 두 버전을 기록하고 이전 기록을 확인했습니다. 별도 브랜치를 main에 합친 저장소를 다음 GitHub 강의에 사용합니다."
    }
  },
  "web-coding": {
    "id": "web-coding",
    "number": 6,
    "title": "웹 코딩 첫 실습: HTML·CSS·JavaScript로 강의 카드 만들기",
    "shortTitle": "웹 코딩 첫 실습",
    "subtitle": "지금까지 익힌 폴더·문서·편집기를 활용해 작은 웹 화면을 만듭니다",
    "icon": "code",
    "durationMinutes": 30,
    "case": {
      "kind": "example",
      "title": "지금까지 배운 도구로 첫 웹 화면을 만들어 볼까요?",
      "body": "### README에서 브라우저 화면으로\n\n지금까지 폴더를 열고, 파일을 편집하고, Markdown을 미리보며 Git의 변경을 살펴봤습니다. 이제 별도의 연습 폴더에서 VS Code로 작은 **강의 카드**를 만들어 브라우저에서 확인합니다. 이 카드는 수업용 예제이며 Codex의 실제 결과물은 아닙니다.\n\n### 같은 카드를 세 단계로 완성합니다\n\n1. **HTML:** 제목·버튼·설명의 내용과 순서를 만듭니다.\n2. **CSS:** 같은 카드에 여백과 색을 더합니다.\n3. **JavaScript:** 버튼을 누르면 설명이 펼쳐지도록 동작을 연결합니다.\n\n앞에서 배운 폴더 확인·파일 저장·편집기와 브라우저 전환을 사용합니다. Git·GitHub는 변경 기록과 공유가 필요할 때 선택해 연결할 수 있으며, 첫 화면을 보는 데 commit이나 push는 필수가 아닙니다. Node·Python 설치 없이 Live Server 확장으로 간단한 정적 파일을 브라우저에서 확인합니다. 확장이 없다면 이 정적 카드는 파일을 직접 열어도 됩니다.",
      "question": "같은 카드에서 내용·모양·버튼 동작은 각각 어떤 파일에서 달라질까요?"
    },
    "objectives": [
      "지금까지 배운 폴더 확인·VS Code 편집·저장과 브라우저 확인을 웹 파일 실습에 연결한다.",
      "HTML·CSS·JavaScript로 한 장의 강의 카드를 단계별로 만들고 각 파일의 역할을 구분한다.",
      "버튼의 동작을 확인하고 다음 프론트엔드·백엔드 주제로 연결한다."
    ],
    "sections": [
      {
        "id": "tools-html",
        "title": "HTML: 강의 카드의 내용과 구조 만들기",
        "minutes": 16,
        "optional": false,
        "body": "### 먼저 만들 화면을 확인합니다\n\n이번 웹 기초 실습은 **강의 카드**를 만듭니다. 제목은 Git, 버튼은 설명 보기, 설명은 변경을 확인하고 기록합니다입니다. [완성 카드](./examples/course-card/03-javascript/index.html)를 잠깐 본 뒤, 별도의 빈 카드 연습 폴더에서 HTML → CSS → JavaScript 순서로 직접 완성합니다. 기존 메모 복제본과 파일이 섞이지 않도록 VS Code의 폴더 열기에서 별도의 빈 카드 연습 폴더를 새로 만들거나 준비합니다. 같은 이름의 폴더나 파일이 이미 있다면 덮어쓰지 말고 다른 이름을 사용합니다. 지금까지 연습한 폴더 확인과 파일 저장을 이곳에서 다시 사용합니다.\n\n브라우저는 HTML의 구조, CSS의 모양, JavaScript의 동작을 읽어 화면을 만듭니다. 인터넷에서 웹 페이지를 열 때는 브라우저가 서버에 자료를 요청하고 응답을 받습니다. 이번에는 내 컴퓨터에 있는 작은 파일을 먼저 열어 보며, 요청·응답과 프론트엔드·백엔드의 자세한 관계는 다음 주제에서 이어갑니다.\n\n### 1. 태그와 내용으로 화면의 구조 표현하기\n\n짧은 제목 하나부터 읽습니다.\n\n```html\n<h1>Git</h1>\n```\n\n![h1의 시작 태그, Git 내용, 끝 태그를 나누어 읽는 설명 그림](./assets/course/diagrams/html-element.svg)\n\n`<h1>`은 제목의 시작 태그, `Git`은 내용, `</h1>`은 끝 태그입니다. 이 묶음을 요소라고 부릅니다. `<p>...</p>`는 문단, `<button>...</button>`은 버튼입니다. HTML은 브라우저에 담을 내용과 구조를 표현합니다.\n\n### 2. 속성으로 요소에 정보 붙이기\n\n```html\n<article class=\"card\">\n  <h1>Git</h1>\n  <button id=\"toggle\" type=\"button\">설명 보기</button>\n  <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n</article>\n```\n\n![HTML 요소의 속성 이름과 값, class와 id의 연결 대상을 설명하는 그림](./assets/course/diagrams/html-attributes.svg)\n\n`article`은 이 카드 내용을 묶습니다. `class=\"card\"`는 다음 CSS에서 카드 모양을 고를 이름이고, `id=\"toggle\"`과 `id=\"detail\"`은 JavaScript에서 버튼과 설명을 찾을 때 사용합니다. `type=\"button\"`은 이 요소가 일반 버튼임을 나타냅니다. 속성은 보통 시작 태그 안에 적습니다. 속성 이름과 값 사이의 `=`와 값의 따옴표를 함께 확인합니다.\n\n**한 가지 확인:** 아직 색이나 버튼 동작을 만들지 않았습니다. 이 코드에서 버튼 다음에 적힌 설명 문단이 화면에서도 다음에 보이는지 예상해 봅니다.\n\n### 3. HTML 문서의 기본 틀에 넣기\n\n![HTML 문서에서 head의 탭 제목과 body의 화면 내용이 나뉘는 설명 그림](./assets/course/diagrams/html-document.svg)\n\n`head`에는 문서의 정보가, `body`에는 페이지에 표시할 내용이 들어갑니다. `title`은 브라우저 탭 이름이고 `h1`은 페이지 안의 제목입니다. `meta charset=\"utf-8\"`은 한글을 포함한 문자의 인코딩을 알립니다. `meta`처럼 끝 태그를 쓰지 않는 요소도 있습니다.\n\nVS Code에서 **파일 → 폴더 열기**로 별도의 카드 연습 폴더를 열고, 왼쪽 탐색기의 **새 파일** 버튼으로 `index.html`을 만듭니다. 아래 코드를 입력한 뒤 `Ctrl+S`로 저장합니다. 파일이 앞의 메모 복제본이 아닌 카드 폴더에 있는지 확인합니다.\n\n~~~html\n<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\">설명 보기</button>\n    <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>\n~~~\n\n### 4. Live Server로 저장한 화면 확인하기\n\n이번 HTML·CSS·JavaScript 카드 실습은 [Live Server 확장](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)을 사용합니다. VS Code 기본 기능과 구분하며, 확장 화면에서 게시자 **Ritwick Dey**, ID `ritwickdey.LiveServer`를 확인해 설치합니다.\n\n1. VS Code에서 방금 만든 **카드 폴더**를 열고 `index.html`을 저장합니다.\n2. 탐색기의 `index.html`을 우클릭해 **Open with Live Server**를 선택합니다. 상태 표시줄 **Go Live**로 시작할 수도 있습니다.\n3. 브라우저에서 `http://127.0.0.1:5500/`처럼 나타나는 **실제 주소**를 확인합니다. 포트는 설정과 사용 상황에 따라 다를 수 있습니다.\n4. `<h1>Git</h1>`의 Git을 다른 제목으로 바꾸어 `Ctrl+S`로 저장합니다. 브라우저의 카드 제목이 바뀌는지 보고 원래대로 돌립니다. 자동 반영이 안 되면 저장과 주소를 확인하고 새로고침합니다. `<title>`은 브라우저 탭 이름입니다. 아직 버튼 동작은 없습니다.\n\nLive Server는 이 파일을 브라우저에 제공하고 저장 후 화면 확인을 돕습니다. 종료할 때는 VS Code 명령 팔레트에서 **Live Server: Stop Live Server**를 선택합니다. 이후 CSS·JavaScript 작업 중 계속 켜 두어도 됩니다. Python 서버나 GitHub Pages에 배포하는 기능은 아닙니다.\n\n**확장이 없는 경우:** 이 정적 카드는 파일 탐색기에서 직접 열어 저장 후 새로고침하거나, 사용 중인 VS Code의 HTML 미리보기를 이용해도 됩니다. 다만 뒤의 백엔드 API 실습은 FastAPI 주소로 열어야 합니다.\n\n**단계 예제:** [HTML 카드](./examples/course-card/01-html/index.html) → [CSS 카드](./examples/course-card/02-css/index.html) → [JavaScript 완성 카드](./examples/course-card/03-javascript/index.html). 다음 단계에서는 같은 카드에 모양을 더합니다.",
        "presentationPoints": [
          "VS Code에서 별도 카드 폴더를 열고 index.html을 만듭니다.",
          "시작 태그·내용·끝 태그와 속성, head와 body를 읽고 저장합니다.",
          "Live Server 주소를 열고 저장한 제목의 변화를 확인합니다."
        ]
      },
      {
        "id": "tools-css",
        "title": "CSS: 같은 강의 카드 꾸미기",
        "minutes": 7,
        "optional": false,
        "body": "### 같은 카드에 모양을 더합니다\n\nHTML로 만든 제목·버튼·설명은 그대로 두고 여백과 색을 더합니다. 먼저 카드의 여백을 정하는 작은 규칙 하나를 읽습니다.\n\n```css\n.card {\n  padding: 24px;\n}\n```\n\n![CSS 규칙의 선택자 card, 속성 padding, 값 24px을 나누어 읽는 설명 그림](./assets/course/diagrams/css-declaration.svg)\n\n`.card`는 `class=\"card\"`인 HTML 요소를 고르는 **선택자**, `padding`은 안쪽 여백을 정하는 **속성**, `24px`은 그 **값**입니다. 중괄호 안에 선언을 적고 세미콜론으로 마칩니다. HTML의 class 이름에는 점을 쓰지 않고 CSS에서 `.card`라고 선택합니다.\n\n### 1. 스타일 파일 저장하기\n\n앞서 만든 카드 폴더에 `style.css`를 만들고 다음 내용을 저장합니다.\n\n~~~css\nbody {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}\n~~~\n\n`body`는 페이지 전체의 글꼴·배경과 여백을, `.card`는 카드의 크기·배경·둥근 모서리를, `button`은 버튼의 여백과 커서를 정합니다.\n\n### 2. HTML과 CSS 연결하기\n\n`index.html`의 `head` 안, 닫는 `</head>` 앞에 아래 줄을 넣고 저장합니다.\n\n~~~html\n<link rel=\"stylesheet\" href=\"style.css\">\n~~~\n\n`href`의 파일 이름과 실제 `style.css` 위치가 같아야 합니다. 브라우저를 새로고침해 연한 배경, 흰색 카드와 여백이 보이는지 확인합니다. 바뀌지 않으면 두 파일의 위치·파일명·저장 여부부터 살펴봅니다.\n\n**한 가지 수정:** `.card` 안의 `padding: 24px`만 `32px`로 바꾸어 카드 안쪽 여백을 비교한 뒤 **24px로 되돌립니다.** 뒤의 템플릿 비교도 24px을 기준으로 진행합니다.\n\n**단계 예제:** [CSS 카드](./examples/course-card/02-css/index.html)를 HTML 카드와 나란히 비교합니다. 다음 단계에서는 같은 버튼에 동작을 연결합니다.",
        "presentationPoints": [
          "style.css를 만들고 index.html에 연결합니다.",
          "저장 후 새로고침해 색상과 여백을 확인합니다.",
          "CSS는 HTML 요소의 시각적인 모양을 정합니다."
        ]
      },
      {
        "id": "tools-javascript",
        "title": "JavaScript: 버튼 클릭으로 설명 펼치기",
        "minutes": 7,
        "optional": false,
        "body": "### 같은 버튼에 클릭 동작 연결하기\n\nHTML로 만든 버튼을 누르면 설명이 펼쳐지고 다시 누르면 접히게 만듭니다. 그림에서 **요소 찾기 → 클릭 듣기 → 상태 바꾸기**를 먼저 따라봅니다.\n\n![JavaScript가 버튼과 설명을 찾고 클릭을 기다린 뒤 hidden과 aria-expanded 상태를 바꾸는 흐름](./assets/course/diagrams/javascript-flow.svg)\n\n### 1. 처음 보일 상태 정하기\n\n앞서 만든 `index.html`의 버튼과 설명 줄을 바꿉니다. `hidden`은 설명을 처음에 숨기고, `aria-expanded=\"false\"`는 버튼의 펼침 상태를 전달합니다.\n\n~~~html\n<button id=\"toggle\" type=\"button\" aria-expanded=\"false\">설명 보기</button>\n<p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n~~~\n\n### 2. 클릭할 때 할 일 적기\n\n같은 카드 폴더에 `script.js`를 만들고 다음 코드를 저장합니다.\n\n~~~javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n~~~\n\n첫 두 줄은 HTML의 `id`로 버튼과 설명을 찾습니다. 여기서 `#toggle`은 id가 toggle인 요소를 고르는 선택자입니다. `addEventListener('click', ...)`는 클릭할 때 실행할 동작을 연결합니다. `detail.hidden`의 현재 값을 읽고 반대로 바꿔 표시·숨김을 전환하며 버튼의 `aria-expanded`도 함께 바꿉니다.\n\n### 3. HTML에 연결하고 결과 확인하기\n\n`index.html`의 `head` 안에 아래 줄을 추가합니다. `defer`는 HTML을 읽은 뒤 스크립트를 실행하도록 합니다. 세 파일을 모두 저장한 뒤 미리보기를 새로고침합니다.\n\n~~~html\n<script defer src=\"script.js\"></script>\n~~~\n\n처음에는 설명이 숨겨져 있어야 합니다. 버튼을 한 번 클릭하면 설명이 나타나고, 다시 클릭하면 숨겨집니다. Tab으로 버튼을 선택해 Enter나 Space를 눌러도 같은지 확인합니다. 동작하지 않으면 `toggle`·`detail` 이름과 파일 연결, 저장 여부를 대조합니다.\n\n**한 가지 수정:** 설명 문장만 나의 소개로 바꾸어 저장하고, 같은 버튼 동작이 유지되는지 확인합니다. HTML의 내용, CSS의 모양, JavaScript의 동작이 같은 카드에 함께 적용되었습니다.\n\n**단계 예제:** [완성 카드](./examples/course-card/03-javascript/index.html)의 클릭·키보드 동작을 확인합니다. 다음 단원에서는 같은 카드의 모양과 동작을 Tailwind CSS와 Alpine.js로 바꿔 봅니다.",
        "presentationPoints": [
          "script.js를 연결하고 버튼 클릭을 처리합니다.",
          "클릭마다 설명이 보이고 숨겨지는지 확인합니다.",
          "구조·모양·동작을 합쳐 프론트엔드 화면을 만듭니다."
        ]
      }
    ],
    "steps": [
      {
        "id": "html-practice",
        "title": "HTML로 강의 카드 만들기",
        "description": "VS Code에서 카드 폴더와 index.html을 만들고 저장한 뒤 Live Server로 열어 제목 변경을 확인합니다.",
        "scene": "vscode",
        "code": "<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>나의 강의 카드</title>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\">설명 보기</button>\n    <p id=\"detail\">변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>",
        "language": "html",
        "output": "Git 제목, 설명 보기 버튼, 설명 문장이 표시됩니다.\n이 단계에서 버튼을 눌러도 설명 상태는 바뀌지 않습니다.\n<title>은 탭 이름, <h1>은 화면의 Git 제목입니다.",
        "focus": "ide",
        "fileName": "index.html · 1단계",
        "files": [
          "index.html"
        ]
      },
      {
        "id": "css-practice",
        "title": "CSS로 강의 카드 꾸미기",
        "description": "같은 폴더에 style.css를 저장하고 index.html의 head에 link 태그를 넣습니다. 선택자·속성·값 그림을 읽고 .card의 여백을 24px에서 32px로 비교한 뒤 24px로 되돌립니다.",
        "scene": "vscode",
        "code": "body {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}",
        "language": "css",
        "output": "연한 배경에 여백과 둥근 모서리가 있는 흰색 카드가 보입니다.",
        "focus": "ide",
        "fileName": "style.css · 2단계",
        "files": [
          "index.html",
          "style.css"
        ]
      },
      {
        "id": "javascript-practice",
        "title": "JavaScript로 설명 펼치기",
        "description": "기존 HTML과 CSS 카드에 hidden과 aria-expanded를 추가하고 script.js를 defer로 연결합니다. 요소 찾기 → 클릭 듣기 → 상태 바꾸기 그림과 코드의 각 부분을 대응합니다.",
        "scene": "vscode",
        "code": "const button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});",
        "language": "javascript",
        "output": "처음에는 설명이 숨겨지고 클릭하면 표시됩니다.\n다시 클릭하면 숨겨지며 Enter·Space도 사용할 수 있습니다.",
        "focus": "ide",
        "fileName": "script.js · 3단계",
        "files": [
          "index.html",
          "style.css",
          "script.js"
        ]
      }
    ],
    "pitfalls": [
      {
        "title": "파일을 저장하기 전에 화면을 확인하기",
        "body": "어느 폴더에 어떤 이름으로 저장했는지 먼저 확인하고, 미리보기나 브라우저를 다시 확인합니다."
      },
      {
        "title": "HTML·CSS·JavaScript를 같은 역할로 생각하기",
        "body": "내용과 구조, 모양, 클릭 동작을 각각 구분하고 같은 카드에서 어떤 변화가 생기는지 확인합니다."
      },
      {
        "title": "기존 메모 프로젝트 파일을 실습 파일로 덮어쓰기",
        "body": "별도의 카드 연습 폴더를 사용하고, 이름이 같은 기존 파일이 있으면 덮어쓰지 않습니다."
      }
    ],
    "glossary": [
      {
        "term": "HTML",
        "definition": "웹 문서의 제목·버튼·문장 등 내용과 구조를 표현하는 언어입니다."
      },
      {
        "term": "CSS",
        "definition": "HTML 요소의 색상·여백·배치 등 시각적 표현을 지정하는 언어입니다."
      },
      {
        "term": "JavaScript",
        "definition": "브라우저의 클릭 등에 반응하고 화면을 변경하는 프로그램을 작성하는 언어입니다."
      }
    ],
    "checklist": [
      "별도 연습 폴더와 VS Code에서 저장한 파일 위치를 확인할 수 있다.",
      "HTML 구조·CSS 모양·JavaScript 버튼 동작의 차이를 설명할 수 있다.",
      "같은 카드를 브라우저에서 열고 수정 결과를 확인할 수 있다."
    ],
    "closing": "하나의 카드에서 HTML은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. 다음 주제에서는 같은 카드의 모양과 동작을 Tailwind CSS와 Alpine.js로 바꿔 봅니다.",
    "references": [
      {
        "title": "VS Code HTML 편집",
        "url": "https://code.visualstudio.com/docs/languages/html"
      },
      {
        "title": "참고한 공개 핸드북 · HTML 구조",
        "url": "https://vibe.onebitefe.com/lessons/s05-c02-html-layout"
      },
      {
        "title": "참고한 공개 핸드북 · CSS로 꾸미기",
        "url": "https://vibe.onebitefe.com/lessons/s05-c04-css"
      }
    ],
    "presentation": {
      "caseSummary": "README를 편집하던 작업대로 별도의 웹 카드 폴더를 엽니다. 같은 카드에 HTML 구조, CSS 모양, JavaScript 동작을 한 단계씩 더해 봅니다.",
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "별도 카드 연습 폴더의 index.html · style.css · script.js",
        "command": "별도 카드 폴더 열기 → index.html 작성·저장 → Live Server로 확인\nstyle.css 작성·연결 → 여백과 색 확인\nscript.js 작성·연결 → 버튼 클릭과 Enter·Space로 펼치기·접기",
        "expectedResult": "하나의 Git 카드가 HTML 구조, CSS 모양과 JavaScript 버튼 동작을 차례로 갖춥니다.",
        "durationMinutes": 6
      },
      "returnSummary": "HTML·CSS·JavaScript로 만든 카드를 다음 주제에서 Tailwind CSS와 Alpine.js로 다시 표현합니다."
    }
  },
  "web": {
    "id": "web",
    "number": 8,
    "title": "프론트엔드: 브라우저 화면과 개발 서버 이해하기",
    "shortTitle": "프론트엔드",
    "subtitle": "앞서 만든 웹 카드부터 AI가 안내한 npm 개발 서버까지 연결하기",
    "icon": "layers",
    "durationMinutes": 42,
    "case": {
      "kind": "real",
      "title": "AI가 알려준 npm 명령은 왜 실행할까요?",
      "body": "![AI가 사이트 결과물을 ZIP으로 제공하고 npm install과 npm run dev를 안내한 실제 화면](./assets/course/terminal-ai-zip-screenshot.png)\n\n### 터미널 강의에서 만났던 실제 화면\n\n처음 강의에서 AI가 프로젝트 ZIP과 함께 `npm install`, `npm run dev`를 알려 준 화면을 보았습니다. 그때는 터미널에서 실행해야 한다는 점만 확인했죠. 이제 앞에서 만든 카드 화면을 바탕으로 **왜 이런 명령이 필요한지** 읽어 봅니다.\n\n이 명령은 **해당 프로젝트에서 안내한 실행 방법**입니다. 모든 사이트에 똑같이 쓰는 필수 명령은 아닙니다. 서버를 켜는 프로그램도 프로젝트마다 다릅니다. 이 화면은 실제 AI 답변이며 아래 연습은 같은 원리를 이해하기 위한 별도 예제입니다.\n\n### 오늘 확인할 순서\n\n앞에서 만든 카드가 브라우저에서 실행되는 프론트엔드라는 점을 살펴보고, `package.json`에 적힌 `dev`가 어떤 명령인지 읽습니다. 우리가 만든 카드는 VS Code의 Live Server로 실행해 저장한 수정 결과를 확인합니다. AI가 안내한 프로젝트에서는 Vite와 npm이 무엇을 하는지 이해하며, 이번 실습에서 npm을 직접 실행할 필요는 없습니다. 이어 사용자 화면과 백엔드가 요청과 응답으로 연결되는 모습을 설명합니다.",
      "question": "브라우저에 보이는 카드와 npm 개발 서버는 각각 어떤 일을 할까요?"
    },
    "objectives": [
      "HTML·CSS·JavaScript와 Tailwind·Alpine이 브라우저 화면에서 하는 일을 말한다.",
      "Live Server로 카드의 로컬 주소를 열고 저장 후 화면 변화를 확인한다.",
      "초기 Windows의 Node.js·npm 준비와 Vite 프로젝트 파일을 읽고 Live Server와 구분한다.",
      "FastAPI가 파일과 API를 함께 제공하는 경우 사용하는 서버 주소를 구분한다.",
      "React·Vue와 백엔드의 FastAPI·Flask·Django·Spring의 역할을 구분한다."
    ],
    "sections": [
      {
        "id": "web-map",
        "title": "프론트엔드란? 브라우저에서 보이고 움직이는 화면",
        "minutes": 12,
        "optional": false,
        "body": "### 앞서 만든 강의 카드가 프론트엔드입니다\n\n사용자가 보고 누르는 화면과 브라우저 쪽 상호작용을 **프론트엔드**라고 부릅니다. 앞선 카드의 `index.html`은 내용과 구조, CSS는 모양, JavaScript는 버튼 동작을 담당했습니다. Tailwind CSS와 Alpine.js는 각각 모양과 동작을 작성할 때 도움을 주는 도구입니다. 이들이 실행된 결과는 브라우저에서 확인합니다.\n\n```text\nHTML: 제목·버튼·설명\nCSS / Tailwind CSS: 카드 여백·색\nJavaScript / Alpine.js: 설명 펼치기\n                 ↓\n           브라우저의 화면\n```\n\n프론트엔드는 HTML·CSS·JavaScript와 별개의 언어가 아니라, 이런 기술로 만드는 **사용자 쪽 영역**을 가리킵니다. 앞에서 작성한 간단한 카드처럼 기본 기술만으로 화면을 만들 수도 있습니다.\n\n### 더 큰 화면을 만들 때 만나는 이름\n\n- **React**는 버튼·카드처럼 다시 사용할 수 있는 화면 조각인 **컴포넌트**로 UI를 만드는 JavaScript 라이브러리입니다.\n- **Vue**는 컴포넌트와 상태를 이용해 UI를 만드는 JavaScript 프레임워크입니다.\n\n둘은 각각 화면을 구성하는 방법을 제공하며 HTML·CSS·JavaScript의 기초가 사라지는 것은 아닙니다. 이 강의에서 React나 Vue를 설치·실습하지는 않습니다. [React 소개](https://react.dev/learn) · [Vue 소개](https://vuejs.org/guide/introduction.html)\n\n### Vite는 React·Vue와 어떻게 다를까요?\n\n**React·Vue는 화면을 구성하는 도구**, **Vite는 개발할 때 화면을 제공하고 배포할 파일을 만드는 도구**입니다. 예를 들어 React 화면을 만들면서 Vite 개발 서버로 확인할 수 있습니다. Vue와 Vite도 함께 쓸 수 있고, React나 Vue 없이 우리가 만든 HTML·CSS·JavaScript 카드에도 Vite를 사용할 수 있습니다. React나 Vue 프로젝트가 모두 Vite를 쓰는 것은 아닙니다. [Vite 소개](https://vite.dev/guide/)\n\n**직접 확인:** 앞에서 만든 카드의 버튼을 눌러 보고, 제목·모양·동작이 어디에서 왔는지 짚습니다. 이어 같은 카드를 여는 Live Server와 Vite를 비교합니다.",
        "presentationPoints": [
          "앞서 만든 카드의 구조·모양·클릭 동작은 프론트엔드입니다.",
          "React는 UI 라이브러리, Vue는 UI 프레임워크입니다.",
          "Vite는 개발 서버·빌드 도구이며 React·Vue와 함께 쓸 수 있습니다."
        ]
      },
      {
        "id": "web-http",
        "title": "같은 카드로 Live Server와 Vite 비교하기",
        "minutes": 20,
        "optional": false,
        "body": "### 1. 우리가 만든 카드를 Live Server로 실행하기\n\n앞에서 VS Code로 만든 `index.html`, `style.css`, `script.js`를 다시 봅니다. VS Code의 **Live Server 확장**으로 카드 폴더의 `index.html`을 우클릭하고 **Open with Live Server**를 선택합니다. 예를 들어 `http://127.0.0.1:5500/`이 열립니다. 주소와 포트는 설정에 따라 달라질 수 있습니다.\n\n**직접 시연:** 카드 제목을 바꾸고 저장해 브라우저의 변화를 확인한 뒤 원래대로 되돌립니다. Live Server는 저장된 HTML·CSS·JavaScript를 로컬 주소로 제공하고 변경 시 브라우저를 새로고침합니다. 이 단순 카드 실습에는 Node.js와 npm이 필요하지 않습니다. [Live Server 확장 안내](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)\n\n### 2. 같은 카드가 Vite 프로젝트에 있다면?\n\n아래는 **앞에서 만든 카드와 화면·동작이 같은 별도 Vite 예제**입니다. 파일 구조와 내용을 여기서 읽어 보며, 지금은 Vite나 npm 명령을 실행하지 않습니다. 두 카드는 서로 다른 폴더의 복사본이므로 한쪽을 수정해도 다른 쪽은 자동으로 바뀌지 않습니다.\n\n```text\n04-vite-dev/                ← Vite 예제 폴더\n├─ index.html               ← 화면의 구조\n├─ style.css                ← 화면의 모양\n├─ script.js                ← 버튼 동작\n├─ package.json             ← 프로젝트와 실행 작업 설정\n├─ package-lock.json        ← 설치된 패키지의 구체적인 기록\n└─ README.md                ← 이 예제의 사용 안내\n```\n\n**`index.html`: 구조와 파일 연결**\n\n아래는 예제 파일 전체입니다. `link`는 CSS를, `script`는 JavaScript를 연결합니다. `article` 안에는 앞에서 만든 Git 카드와 버튼·설명이 있습니다.\n\n```html\n<!doctype html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>강의 카드 · JavaScript</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n  <script defer src=\"script.js\"></script>\n</head>\n<body>\n  <article class=\"card\">\n    <h1>Git</h1>\n    <button id=\"toggle\" type=\"button\" aria-expanded=\"false\">설명 보기</button>\n    <p id=\"detail\" hidden>변경을 확인하고 기록합니다.</p>\n  </article>\n</body>\n</html>\n```\n\n**`style.css`: 카드의 모양**\n\n카드의 폭·여백·둥근 모서리와 버튼의 여백을 정합니다. 별도의 Vite 문법이 아니라 앞에서 사용한 CSS입니다.\n\n```css\nbody {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  padding: 24px;\n}\n\n.card {\n  max-width: 320px;\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\n\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}\n```\n\n**`script.js`: 버튼의 동작**\n\n버튼과 설명을 찾아 클릭할 때 숨김 상태를 바꾸고, `aria-expanded`에도 펼침 상태를 반영합니다. 이것도 앞에서 작성한 JavaScript입니다.\n\n```javascript\nconst button = document.querySelector('#toggle');\nconst detail = document.querySelector('#detail');\n\nbutton.addEventListener('click', () => {\n  const isHidden = detail.hidden;\n  detail.hidden = !isHidden;\n  button.setAttribute('aria-expanded', String(isHidden));\n});\n```\n\n**`package.json`: 프로젝트의 약속**\n\n정확한 파일 이름은 `packages.json`이 아닌 **`package.json`**입니다. 프로젝트 이름, 필요한 패키지와 실행 작업을 기록합니다. 아래는 예제 파일 전체입니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite --host 127.0.0.1 --port 5173\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"6.4.1\"\n  }\n}\n```\n\n- `scripts.dev`는 `npm run dev`를 입력했을 때 실행할 작업입니다. **이 예제에서는** Vite를 로컬 5173번 포트로 실행합니다.\n- `devDependencies`는 개발에 사용할 패키지를 적는 곳입니다. 여기서는 Vite `6.4.1`을 지정합니다. `name`, `version`, `private`, `type`도 프로젝트 설정입니다.\n- `dev`는 각 프로젝트가 정하는 이름이므로 다른 프로그램을 실행하거나 아예 없을 수 있습니다. `npm run dev`가 보인다고 무조건 Vite를 쓰는 것은 아닙니다. [npm 스크립트 안내](https://docs.npmjs.com/cli/commands/npm-run-script/)\n\n**`package-lock.json`: 설치 결과의 기록**\n\nnpm은 설치 과정에서 패키지와 하위 패키지의 구체적인 버전 등을 기록합니다. 아래는 실제 파일의 앞부분 중 프로젝트를 나타내는 부분만 **발췌**한 것입니다. 나머지 내용은 길어서 생략했습니다.\n\n```json\n{\n  \"name\": \"course-card-vite-demo\",\n  \"version\": \"1.0.0\",\n  \"lockfileVersion\": 3,\n  \"requires\": true,\n  \"packages\": {\n    \"\": {\n      \"name\": \"course-card-vite-demo\",\n      \"version\": \"1.0.0\",\n      \"devDependencies\": {\n        \"vite\": \"6.4.1\"\n      }\n```\n\n이 기록은 여러 환경에서 비슷한 설치 결과를 재현하는 데 도움이 됩니다. 일부만 보여 준 내용이므로 이 코드 블록을 새 파일로 복사해 사용하지 않습니다. [npm lock 파일 안내](https://docs.npmjs.com/cli/configuring-npm/package-lock-json/)\n\n**`README.md`: 프로젝트 안내**\n\n아래는 예제 문서의 첫 부분 발췌입니다. 실제 프로젝트의 README에는 필요한 도구와 실행 방법이 적혀 있을 수 있습니다.\n\n```markdown\n# 강의 카드 Vite 개발 서버 예제\n\n앞에서 만든 `03-javascript` 카드의 HTML·CSS·JavaScript를 그대로 복사하고, 개발 서버 실행 설정만 추가한 예제입니다. 정적 카드가 브라우저에서 어떻게 보이는지 먼저 확인한 뒤, 이 폴더를 별도 연습 위치에 복사해서 실행합니다. 이 예제는 FastAPI 백엔드를 실행하거나 GitHub Pages에 서버를 배포하지 않습니다.\n```\n\n설치 후 생기는 `node_modules/`는 내려받은 패키지가 들어가는 폴더입니다. 위 트리의 원본 파일과 달리 **설치 전에 항상 있는 것은 아닙니다**. 직접 파일을 만들거나 수정할 곳으로 생각하지 않아도 됩니다.\n\n### 3. 초기 Windows에서 npm을 사용하려면?\n\n초기화한 Windows에는 보통 **Node.js와 npm이 준비되어 있지 않습니다**. `npm install`을 먼저 입력하는 것만으로 Node.js가 설치되는 것은 아닙니다. 나중에 AI가 npm 명령을 안내하면 해당 프로젝트가 요구하는 Node.js 버전을 확인하고, [Node.js 공식 다운로드](https://nodejs.org/en/download/)에서 Windows용 설치 프로그램을 선택합니다. 일반적인 공식 Node.js 설치에는 npm이 함께 제공됩니다. 설치 방식에 따라 다를 수 있으므로 새 터미널을 열고 `node --version`과 `npm --version`으로 각각 확인합니다. 인식되지 않으면 터미널 재시작과 설치·PATH 설정을 확인합니다.\n\n아래는 **명령의 의미를 읽는 예시**입니다. 이번 강의에서는 실행하지 않습니다.\n\n```powershell\nnpm install\nnpm run dev\n```\n\n1. `npm install`: 해당 프로젝트의 설정을 읽고 필요한 패키지를 준비합니다. 처음 내려받을 때 인터넷이 필요할 수 있습니다.\n2. `npm run dev`: `package.json`의 `scripts.dev`에 적힌 작업을 실행합니다. 위 예제에서는 Vite 개발 서버가 시작됩니다. 프로젝트마다 작업과 요구 버전이 다르므로 안내를 먼저 확인합니다.\n\n### 4. Live Server와 Vite의 차이\n\n| 비교 | 앞에서 만든 카드 + Live Server | 같은 카드의 Vite 예제 |\n| --- | --- | --- |\n| 준비 | VS Code와 Live Server 확장 | Node.js·npm과 프로젝트에 필요한 패키지 |\n| 여는 방법 | `index.html`에서 Open with Live Server | 해당 폴더에서 `npm install` 후 `npm run dev` |\n| 주소 예시 | `http://127.0.0.1:5500/` | `http://127.0.0.1:5173/` |\n| 저장 후 | 파일 변경을 감지해 브라우저 새로고침 | 일부 변경은 전체 새로고침 없이 교체(HMR), 파일·설정에 따라 새로고침 가능 |\n| 추가 역할 | 정적 파일을 로컬 주소로 제공 | 개발 서버와 배포용 파일을 만드는 빌드 도구 |\n\n**보이는 카드와 버튼 동작은 같습니다.** 단순 카드 확인에는 Live Server로 충분합니다. Vite는 여러 모듈과 패키지를 쓰는 프로젝트의 개발·빌드에 도움을 주지만, 그 자체가 React나 Vue처럼 화면을 구성하는 도구는 아닙니다. 같은 이름의 `dev` 작업이 언제나 Vite를 실행하는 것도 아닙니다. 포트 번호는 프로젝트와 설정에 따라 달라집니다. [Vite 공식 안내](https://vite.dev/guide/)\n\n### 5. FastAPI와 템플릿으로 넘어가면?\n\n이후 실습에서는 FastAPI가 템플릿을 데이터로 채운 화면과 API를 제공하며, 브라우저에서 **FastAPI가 알려 준 주소**로 접속합니다. 이 구성에서는 같은 화면을 확인하려고 Live Server를 따로 켤 필요가 없습니다. 주소를 헷갈리지 않도록 VS Code 상태 표시줄 또는 **Live Server: Stop Live Server**로 중지해도 됩니다.\n\nLive Server나 Vite는 Python의 FastAPI 코드를 대신 실행하지 않습니다. 반대로 FastAPI를 쓴다고 언제나 Vite가 필요 없어지는 것은 아닙니다. 프론트엔드를 별도로 개발하는 프로젝트는 둘을 함께 사용할 수도 있지만, 우리 실습은 FastAPI 주소 하나에서 확인합니다.",
        "presentationPoints": [
          "같은 카드 파일과 package.json을 본문에서 읽고 Live Server와 비교합니다.",
          "초기 Windows에는 Node.js와 npm을 준비해야 할 수 있습니다.",
          "npm은 실행하지 않고 Vite와 npm run dev의 역할을 설명합니다."
        ]
      },
      {
        "id": "web-html",
        "title": "브라우저와 서버: 화면 요청과 백엔드의 역할",
        "minutes": 10,
        "optional": false,
        "body": "### 주소를 열면 어떤 일이 일어날까요?\n\nLive Server로 카드를 열면 브라우저는 내 PC의 Live Server에 파일을 요청하고, 받은 HTML·CSS·JavaScript를 해석해 화면을 표시합니다. 버튼 클릭은 브라우저의 JavaScript가 처리합니다.\n\n```text\n브라우저  ── 카드 파일 요청 ──→  Live Server\n브라우저  ←─ HTML·CSS·JS ───  Live Server\n```\n\n`127.0.0.1` 또는 `localhost`는 주소를 연 **내 컴퓨터 자신**입니다. 예를 들어 Live Server가 `127.0.0.1:5500`을, 나중의 FastAPI가 `127.0.0.1:8000`을 사용할 수 있습니다. 포트는 설정에 따라 다르며 화면에 실제로 나온 주소를 사용합니다. 같은 주소를 다른 사람의 PC에 보내면 그 사람의 컴퓨터를 가리킵니다.\n\n### 프론트엔드와 백엔드\n\n프론트엔드는 사용자가 보고 조작하는 화면입니다. **백엔드**는 서버에서 요청 처리와 데이터 준비·저장 등을 담당합니다. Live Server나 Vite 개발 서버는 개발 화면을 확인하는 도구이며, 켜는 것만으로 Python의 FastAPI나 SQLite 처리가 생기지는 않습니다.\n\n### 프론트엔드와 백엔드의 대표적인 도구\n\n같은 강의 카드 서비스에 어떤 도구를 선택할 수 있는지 살펴봅니다. 이름을 외우기보다 **어느 쪽의 일을 돕는지**에 주목하세요.\n\n| 영역 | 대표 예시 | 이 강의에서의 역할 |\n| --- | --- | --- |\n| 프론트엔드 | React, Vue | 브라우저에서 카드·버튼 같은 화면을 구성하는 방법을 제공합니다. |\n| 백엔드 · Python | FastAPI, Flask, Django | 요청에 응답하고 데이터를 처리하는 서버를 만드는 데 사용합니다. |\n| 백엔드 · Java/Kotlin | Spring 또는 Spring Boot | Java나 Kotlin으로 서버 애플리케이션을 만드는 데 사용합니다. |\n\nFastAPI는 API 개발에 사용되며 이번 실습에서 선택한 Python 웹 프레임워크입니다. Flask는 가볍게 시작할 수 있는 Python 웹 프레임워크이고, Django는 여러 기능을 갖춘 Python 웹 프레임워크입니다. Spring은 Java 생태계의 프레임워크이며 Spring Boot는 Spring 앱의 설정과 실행을 돕습니다. 각 도구는 화면·데이터 처리 등 여러 방식으로 쓰일 수 있으므로 이름만 보고 모든 프로젝트의 구성을 단정하지 않습니다. [FastAPI](https://fastapi.tiangolo.com/) · [Flask](https://flask.palletsprojects.com/en/stable/) · [Django](https://www.djangoproject.com/) · [Spring Boot](https://spring.io/projects/spring-boot/)\n\n예를 들어 React 또는 Vue로 구성한 화면이 서버의 FastAPI에 데이터를 요청할 수 있습니다. 반대로 프론트엔드 프레임워크를 따로 쓰지 않고도 서버 템플릿으로 HTML을 만드는 방식이 있습니다. 우리 실습은 뒤쪽의 FastAPI와 템플릿으로 그 흐름을 보여 줍니다.\n\n다음 예제에서는 FastAPI가 `/static/...` 화면 파일과 `/api/...` 데이터를 같은 주소에서 제공합니다. 브라우저에서 `http://127.0.0.1:8000/static/02-dict-api.html`을 열면 페이지의 `fetch('/api/dict')`도 같은 FastAPI의 8000번으로 요청합니다. 템플릿 HTML도 FastAPI 주소에서 받습니다. 이 구성에서는 Live Server를 다시 켤 필요가 없습니다.\n\n**주소가 다르면?** 예를 들어 Live Server의 `:5500`에서 위 파일을 열면 `/api/dict`는 `:5500/api/dict`를 찾으며 FastAPI `:8000`으로 자동 연결되지 않습니다. 포트가 다른 두 주소는 다른 출처입니다. 별도 프론트엔드 서버를 함께 쓰는 프로젝트는 API 주소·프록시 또는 CORS 설정을 따로 맞출 수 있지만, 이번에는 같은 FastAPI 주소로 열어 이해합니다. [FastAPI CORS 안내](https://fastapi.tiangolo.com/tutorial/cors/)\n\n개발 서버와 백엔드를 두 서버로 나누는 프로젝트도 있고, 이번 예제처럼 하나의 FastAPI 서버가 화면과 데이터를 함께 제공하는 경우도 있습니다. 다음 강의에서는 HTML 안 JSON → Python 딕셔너리 → SQLite → 템플릿으로 이어갑니다.",
        "presentationPoints": [
          "React·Vue는 브라우저 화면을 구성하는 대표적인 도구입니다.",
          "FastAPI·Flask·Django와 Spring은 서버를 만드는 도구입니다.",
          "이번 실습은 FastAPI 주소에서 화면과 API를 함께 확인합니다."
        ]
      },
      {
        "id": "web-bonus",
        "title": "보충 노트: 주소의 경로와 해시, 빌드 결과 구분",
        "minutes": 5,
        "optional": true,
        "body": "예제 링크의 `#/lesson/terminal`에서 `#` 뒤는 URL의 fragment입니다. 브라우저 안의 라우팅 코드가 이 값을 읽어 표시할 강의를 고를 수 있습니다. HTTP 요청에는 fragment가 전송되지 않으므로 서버가 `#/lesson/terminal` 경로를 직접 처리한다고 생각하면 혼란스러워집니다.\n\n`/data/course.json` 같은 경로는 호스팅 기준과 배포의 base 경로에 영향을 받습니다. 로컬에서는 맞던 절대 경로가 하위 경로 배포에서 달라질 수 있습니다. 단순한 주소 하나도 어느 기준에서 해석되는지 알아야 한다는 점은 터미널의 상대 경로와 닮아 있습니다.\n\n소스 프로젝트와 빌드 결과도 구분합니다. 개발자는 src와 데이터 같은 원본을 고치고 빌드 도구가 배포 파일을 만듭니다. 생성된 JavaScript 파일을 직접 수정하면 다음 빌드에서 변경이 사라질 수 있습니다. 어디가 원본이고 어디가 결과인지 README와 빌드 설정에서 확인합니다.\n\n추가로 알아둘 점은 브라우저가 다운로드한 JavaScript와 데이터는 사용자가 읽을 수 있다는 사실입니다. 화면에서 버튼을 숨긴 것만으로 서버 권한 검사가 생기지는 않습니다. 로그인이나 결제처럼 서버에서 판단해야 할 규칙은 별도 설계가 필요합니다. 이번 과정에서는 그 구현을 만들지 않고 책임의 위치만 구분합니다."
      }
    ],
    "pitfalls": [
      {
        "title": "npm run dev는 모든 프로젝트에서 같은 명령",
        "body": "dev는 각 package.json에 작성된 스크립트 이름이며 프로젝트마다 내용이 다르거나 없을 수 있습니다."
      },
      {
        "title": "브라우저 화면이 보이면 백엔드도 실행 중",
        "body": "정적 파일이나 개발 서버만으로 화면을 볼 수 있습니다. FastAPI 백엔드는 별도로 실행해야 합니다."
      },
      {
        "title": "localhost 주소를 전달하면 다른 사람도 접속",
        "body": "localhost는 주소를 여는 컴퓨터 자신입니다. 다른 사람에게 공개하려면 별도의 배포와 접근 설정이 필요합니다."
      }
    ],
    "checklist": [
      "카드의 HTML·CSS·JavaScript와 Tailwind·Alpine이 프론트엔드에서 하는 일을 설명한다.",
      "package.json에서 scripts.dev를 찾고 npm install과 npm run dev의 역할을 구분한다.",
      "Live Server 주소에서 카드의 저장 결과를 확인하고 필요하면 Live Server를 중지한다.",
      "브라우저·개발 서버·백엔드·데이터베이스의 역할을 구분한다.",
      "React·Vue와 Vite, Python 백엔드 프레임워크와 Spring의 역할을 구분한다."
    ],
    "steps": [
      {
        "id": "web-01",
        "title": "만든 카드에서 프론트엔드 역할 확인",
        "description": "앞에서 만든 카드의 구조·모양·브라우저 동작을 짚습니다.",
        "scene": "browser",
        "code": "HTML → 구조\nCSS / Tailwind → 모양\nJavaScript / Alpine → 버튼 동작",
        "language": "text",
        "output": "같은 카드가 브라우저에 표시되고 클릭에 반응합니다.",
        "focus": "web",
        "fileName": "강의 카드 · 브라우저",
        "files": [
          "index.html",
          "style.css",
          "script.js"
        ]
      },
      {
        "id": "web-02",
        "title": "같은 카드: Live Server와 Vite 비교",
        "description": "같은 카드 파일과 package.json을 강의 본문에서 읽으며 두 실행 방식을 비교합니다.",
        "scene": "code",
        "code": "Live Server: 카드 폴더의 index.html → Open with Live Server\nVite 예제: 강의 본문의 폴더 구조와 package.json → scripts.dev 확인\n읽기만 하기: npm install → npm run dev\nLive Server :5500 / Vite 예제 :5173 (포트는 달라질 수 있음)",
        "language": "text",
        "output": "카드 화면은 같지만 실행 도구와 준비 과정이 다릅니다. 실제 시연은 Live Server만 사용합니다.",
        "focus": "web",
        "fileName": "카드 index.html / package.json",
        "files": [
          "index.html",
          "package.json"
        ]
      },
      {
        "id": "web-ssr-handler",
        "title": "브라우저와 개발 서버의 요청·응답",
        "description": "Live Server의 정적 카드와 FastAPI의 같은 주소에서 화면·API를 제공하는 실습을 구분합니다.",
        "scene": "architecture",
        "code": "카드 실습: 브라우저 ↔ Live Server :5500 (예시)\n다음 실습: 브라우저 ↔ FastAPI :8000 /static/... · /api/...\n포트는 실제 표시된 값 확인",
        "language": "text",
        "output": "이번 백엔드 실습은 FastAPI 주소만 열면 되며 Live Server는 별도로 필요하지 않습니다.",
        "focus": "web",
        "fileName": "브라우저 · 로컬 서버",
        "files": [
          "index.html",
          "main.py"
        ]
      }
    ],
    "glossary": [
      {
        "term": "프론트엔드",
        "definition": "사용자가 보고 조작하는 화면과 브라우저 쪽 동작을 구성하는 영역."
      },
      {
        "term": "Node.js",
        "definition": "브라우저 밖에서 JavaScript를 실행하는 환경."
      },
      {
        "term": "npm",
        "definition": "패키지를 준비하고 package.json의 스크립트를 실행하는 도구."
      },
      {
        "term": "개발 서버",
        "definition": "개발 중인 파일을 제공하고 수정 결과 확인을 돕는 프로그램."
      },
      {
        "term": "localhost",
        "definition": "주소를 여는 컴퓨터 자신을 가리키는 이름."
      },
      {
        "term": "Vite",
        "definition": "개발 서버와 배포용 빌드 기능을 제공하는 프론트엔드 개발 도구."
      },
      {
        "term": "React·Vue",
        "definition": "컴포넌트를 활용해 브라우저 화면을 구성하는 도구. React는 라이브러리, Vue는 프레임워크."
      }
    ],
    "references": [
      {
        "title": "Node.js 소개",
        "url": "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
      },
      {
        "title": "npm run 스크립트",
        "url": "https://docs.npmjs.com/cli/commands/npm-run-script/"
      },
      {
        "title": "Vite 시작하기",
        "url": "https://vite.dev/guide/"
      }
    ],
    "closing": "앞서 만든 카드를 Live Server로 확인하고 Vite·npm 개발 명령의 뜻을 읽었습니다. 다음에는 FastAPI가 제공하는 주소에서 Python·SQLite 데이터와 템플릿을 확인합니다.",
    "presentation": {
      "caseSummary": "첫 터미널 사례의 npm 안내를 다시 보고, 우리가 직접 사용할 Live Server와 Vite의 역할을 비교합니다. npm은 이번 실습에서 실행하지 않습니다.",
      "demo": {
        "program": "VS Code · 브라우저",
        "file": "카드 index.html · 강의 본문의 예제 파일 구조와 package.json",
        "command": "VS Code에서 카드 폴더를 열고 index.html → Open with Live Server\n표시된 주소에서 제목 변경과 저장 결과 확인\n강의 본문에서 같은 카드와 package.json의 dev 설정을 비교\n다음 FastAPI 단계에서는 FastAPI가 제공하는 주소 사용",
        "expectedResult": "같은 카드를 Live Server로 확인하고 Vite와 npm 명령의 역할을 구분합니다.",
        "durationMinutes": 5
      },
      "returnSummary": "정적 카드에는 Live Server를 사용하고, 다음 FastAPI 예제는 화면·API를 제공하는 FastAPI 주소로 전환합니다."
    }
  },
  "templates": {
    "id": "templates",
    "number": 9,
    "title": "데이터와 백엔드: HTML·Python·SQLite·템플릿",
    "shortTitle": "데이터·백엔드",
    "subtitle": "같은 카드의 데이터를 HTML, Python, DB로 옮기고 템플릿으로 출력합니다",
    "icon": "sparkles",
    "durationMinutes": 80,
    "case": {
      "kind": "example",
      "title": "카드 데이터는 HTML에만 있어야 할까요?",
      "body": "### 같은 카드, 달라지는 데이터 위치\n\n카드의 제목과 설명을 HTML에 직접 넣을 수도 있지만, 화면과 데이터가 늘어나면 관리 방법이 달라집니다. 같은 카드를 이용해 **HTML 안 JSON → 서버의 Python 리스트·딕셔너리 → SQLite DB → Jinja2 템플릿** 순서로 비교합니다. 이 사례는 수업용 예시입니다.",
      "question": "같은 카드 데이터가 어디에 저장되고 누가 HTML을 채울까요?"
    },
    "objectives": [
      "HTML 내부 JSON과 브라우저의 JSON.parse를 읽는다.",
      "Windows에서 Python을 확인하고 가상환경·패키지·FastAPI 서버를 준비한다.",
      "FastAPI 라우트를 직접 작성해 Python 또는 SQLite 데이터를 JSON으로 응답한다.",
      "Jinja2 라우트에서 SQLite 데이터를 템플릿에 전달해 HTML을 만든다."
    ],
    "sections": [
      {
        "id": "backend-html-json",
        "title": "HTML 안의 JSON으로 카드 데이터 표현하기",
        "minutes": 10,
        "optional": false,
        "body": "### HTML 안에 있는 데이터부터 봅니다\n\n앞에서 만든 강의 카드의 제목과 설명은 HTML에 직접 적혀 있습니다. 이번에는 같은 문서 안의 JSON 데이터에 내용을 모아 두고 화면에 채웁니다. JSON은 데이터를 텍스트로 표현하는 형식입니다. 이 단계는 **내 컴퓨터의 정적 파일**만 사용합니다.\n\n[HTML 안 JSON 카드](./examples/course-card/server-data/static/01-local-json.html)를 열어 기존 카드와 비교합니다. 예제의 핵심은 다음과 같습니다.\n\n```html\n<script type=\"application/json\" id=\"lesson-data\">\n[{\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"}]\n</script>\n```\n\n`application/json`은 이 부분을 실행 코드가 아닌 JSON 데이터로 담는다는 표시입니다. 준비된 카드의 Alpine 상태에서 `JSON.parse(document.getElementById('lesson-data').textContent)`로 읽어 카드 목록에 넣습니다. `x-for`로 목록을 반복하고 `x-text`로 내용을 표시합니다. Tailwind는 모양, Alpine은 카드 표시·버튼 동작을 돕습니다.\n\n**직접 확인:** [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)를 clone하거나 **Code → Download ZIP**으로 받습니다. `public/examples/course-card/server-data` 폴더를 통째로 별도의 연습 위치에 복사하고 VS Code에서 `static/01-local-json.html`의 Git 제목을 고쳐 저장합니다. VS Code에서 **Open with Live Server**로 열면 저장 후 제목 변화를 확인할 수 있습니다. 이 정적 단계는 Python·Node 서버가 필요 없으며 파일을 직접 열고 새로고침해도 됩니다. Tailwind와 Alpine은 CDN 주소로 불러오므로 인터넷 연결이 필요합니다.\n\n다음에는 데이터가 HTML 안이 아니라 **서버의 Python**에 있을 때 브라우저가 가져오는 흐름을 확인합니다.",
        "presentationPoints": [
          "HTML 안 JSON을 JSON.parse로 읽고 같은 카드에 표시합니다.",
          "정적 파일을 수정·저장하고 브라우저에서 확인합니다."
        ]
      },
      {
        "id": "backend-python",
        "title": "FastAPI의 Python 데이터 가져오기",
        "minutes": 30,
        "optional": false,
        "body": "### HTML 안의 데이터에서 Python 데이터로\n\n앞에서는 카드 데이터를 HTML 안에 넣었습니다. 이번에는 별도 Python 파일의 리스트와 딕셔너리에 보관합니다. `sample_data.py`의 예시입니다.\n\n```python\nLESSONS = [\n    {\"title\": \"Git\", \"minutes\": 25, \"description\": \"변경을 확인하고 기록합니다.\"},\n]\n```\n\nFastAPI는 `/api/dict` 요청을 받으면 이 Python 목록을 **JSON 응답**으로 바꿔 보냅니다. HTML의 `fetch('/api/dict')`가 응답을 가져오고 Alpine이 같은 카드에 표시합니다. 이제 이 요청에 답할 **Python 서버**를 우리 컴퓨터에 준비해 보겠습니다.\n\n### 1. 실습 폴더 열기\n\n앞 절에서 복사한 `server-data` 폴더 전체를 VS Code로 엽니다. 아직 없다면 [강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP**으로 소스를 내려받거나 앞에서 배운 clone을 이용합니다. 그 안의 `public/examples/course-card/server-data` 폴더를 별도 연습 위치로 **통째로 복사**합니다. 기존 `main.py`와 `practice_complete.py`는 완성 예제이므로 그대로 두고, 이 복사본에 별도의 `practice.py`를 직접 만들어 실습합니다. [서버 예제 파일 보기](https://github.com/is2js/dolbeom-coding-notes/tree/main/public/examples/course-card/server-data)\n\nVS Code의 **터미널 → 새 터미널**에서 PowerShell을 열고 아래를 실행합니다.\n\n```powershell\npwd\nls\n```\n\n현재 위치가 복사한 `server-data` 폴더이고 목록에 `main.py`, `sample_data.py`, `requirements.txt`, `static`, `templates`가 있는지 확인합니다. 다르면 탐색기에서 **그 폴더 자체를 VS Code로 열고** 터미널을 다시 엽니다. `pwd`는 Windows PowerShell의 `Get-Location`, `ls`는 `Get-ChildItem` 기본 별칭입니다. cmd에서는 인수 없는 `cd`와 `dir`, macOS/Linux 기본 셸에서는 `pwd`와 `ls`를 이용합니다.\n\n### 2. Python 설치와 버전 확인\n\n이번 예제는 **Windows의 Python 3.10 이상**을 기준으로 합니다. 아직 설치하지 않았다면 [Python 공식 다운로드](https://www.python.org/downloads/windows/)에서 Windows용 설치 안내에 따라 Python 설치 관리자를 설치하고 Python 3을 준비합니다. 설치 화면은 버전마다 달라질 수 있습니다. Python 설치 관리자 방식으로 준비한다면 터미널을 새로 열고 예를 들어 다음 명령으로 Python 3.12를 설치할 수 있습니다. 이미 Python 3.10 이상이 있다면 설치 명령은 건너뜁니다.\n\n```powershell\npy install 3.12\n```\n\n이 명령은 설치 관리자에서 제공하는 방법이며 인터넷이 필요합니다. 기존 방식의 설치 프로그램을 사용한다면 설치 화면의 안내와 공식 문서를 따릅니다. 설치 후 터미널을 새로 열고 다음을 입력합니다.\n\n```powershell\npy -3 --version\n```\n\n예를 들어 `Python 3.12.10`처럼 표시되면 됩니다. `py`가 없지만 Python이 설치되어 있다면 `python --version`으로 확인하고, 아래 가상환경 생성의 `py -3` 대신 확인된 `python`을 사용하세요. 둘 다 인식되지 않으면 설치 완료 여부, 터미널 재시작, Windows의 앱 실행 별칭·경로를 [Python Windows 공식 안내](https://docs.python.org/3/using/windows.html)에서 확인합니다. `Python 3`이라는 이름만으로 충분한 것이 아니라 **3.10 이상인지 숫자까지 확인**합니다.\n\n### 3. 프로젝트 전용 가상환경 만들기\n\n**가상환경**은 이 프로젝트에 필요한 Python 패키지를 다른 프로젝트와 분리해 두는 폴더입니다. 서버 실행에 반드시 필요한 것은 아니지만, 패키지가 서로 충돌하지 않도록 이 강의에서는 사용합니다. `venv`는 Python에 포함된 기능이라 별도 설치 없이 폴더를 만듭니다.\n\n먼저 같은 폴더에서 `.venv`가 이미 있는지 확인합니다.\n\n```powershell\nTest-Path .\\.venv\n```\n\n`False`일 때만 다음 명령으로 만듭니다. 이미 `True`라면 기존 환경을 덮어쓰지 말고 새 연습 폴더를 복사해 진행합니다. `Test-Path`에는 기본 별칭이 없습니다. cmd에서는 `if exist .venv echo 존재함`, macOS/Linux 셸에서는 `test -e .venv`로 존재를 확인할 수 있지만 출력 방식은 다릅니다.\n\n```powershell\npy -3 -m venv .venv\n```\n\n`py` 대신 `python`으로 버전을 확인했다면 `python -m venv .venv`를 실행합니다. `-m venv`는 선택한 Python에 포함된 가상환경 생성 기능을 실행하라는 뜻입니다. 정상 생성되면 같은 폴더에 `.venv`가 생기고 다시 확인할 때 `True`가 나옵니다.\n\n### 4. 가상환경 활성화와 패키지 설치\n\nPowerShell에서 다음을 입력해 이 터미널이 가상환경의 Python을 사용하도록 합니다.\n\n```powershell\n.\\.venv\\Scripts\\Activate.ps1\npython -c \"import sys; print(sys.executable)\"\n```\n\n프롬프트 앞에 보통 `(.venv)`가 나타나고, 출력 경로가 복사한 `server-data\\.venv\\Scripts\\python.exe`를 가리키는지 확인합니다. 표시가 보이더라도 **경로까지 확인**하면 사용 중인 Python을 확실히 알 수 있습니다. 가상환경 활성화는 이 터미널에만 적용됩니다.\n\n이제 프로젝트에 필요한 FastAPI·Uvicorn·Jinja2를 `requirements.txt`에 적힌 조건에 맞춰 설치합니다. 인터넷이 필요하며, 아래 명령은 **활성화한 터미널**에서 실행합니다.\n\n```powershell\npython -m pip install -r requirements.txt\n```\n\n`pip`은 Python 패키지 설치 도구이고 `-r requirements.txt`는 필요한 패키지 목록을 읽으라는 뜻입니다. `python -m pip`는 지금 선택된 Python에 연결된 pip을 실행합니다. 설치 후 다음으로 확인해 봅니다.\n\n```powershell\npython -m pip show fastapi uvicorn jinja2\n```\n\n설치 정보가 나오면 다음으로 넘어갑니다. 패키지 이름을 찾지 못했다면 인터넷, 현재 폴더와 위 Python 경로를 확인하고 설치 결과의 오류를 읽습니다.\n\n**활성화가 차단된다면:** 회사 PC 등의 PowerShell 실행 정책 때문에 `Activate.ps1`이 실행되지 않을 수 있습니다. 정책을 바꾸지 않아도 아래처럼 `.venv` 안의 Python을 **직접 지정**해 설치와 실행을 계속할 수 있습니다. 활성화 성공 시에는 아래 대안 명령을 다시 실행할 필요가 없습니다.\n\n```powershell\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n```\n\n설치가 끝나면 다음 단계에서 서버 코드를 작성합니다. 활성화하지 않은 경우 실행할 때도 `.venv`의 Python 경로를 직접 사용합니다. [Python 가상환경 공식 안내](https://docs.python.org/3/library/venv.html)\n\n### 5. FastAPI 앱과 첫 번째 라우트를 직접 만들기\n\nVS Code 탐색기에서 복사한 `server-data` 폴더에 `practice.py`라는 **새 파일**을 만듭니다. 같은 이름이 이미 있으면 덮어쓰지 말고 새로운 연습 폴더를 준비합니다. 아래 코드를 입력하고 저장합니다.\n\n```python\nfrom fastapi import FastAPI\nfrom fastapi.staticfiles import StaticFiles\nfrom sample_data import LESSONS\n\napp = FastAPI()\napp.mount(\"/static\", StaticFiles(directory=\"static\"), name=\"static\")\n\n@app.get(\"/api/dict\")\ndef api_dict():\n    return LESSONS\n```\n\n- `FastAPI()`는 웹 요청을 처리할 앱을 만듭니다.\n- `app.mount(...)`는 `static` 폴더의 HTML·JavaScript를 `/static` 주소로 제공해 준비된 카드 화면을 보여 줍니다. 서버는 반드시 `server-data` 폴더에서 실행합니다.\n- `@app.get(\"/api/dict\")`는 브라우저가 해당 주소를 요청할 때 아래 함수가 실행되도록 연결하는 **라우트**입니다. `return LESSONS`는 `sample_data.py`의 Python 리스트·딕셔너리를 돌려주고 FastAPI가 JSON으로 변환합니다.\n\n이 파일은 첫 단계의 직접 작성본입니다. `practice_complete.py`는 세 단계를 모두 입력한 결과와 같은 비교용 완성본이며, 기존 `main.py`도 그대로 둡니다. [FastAPI 첫 라우트](https://fastapi.tiangolo.com/tutorial/first-steps/) · [정적 파일 제공](https://fastapi.tiangolo.com/tutorial/static-files/)\n\n### 6. FastAPI 서버 실행과 화면 확인\n\n활성화에 성공했다면 같은 터미널에서 서버를 시작합니다. 활성화를 건너뛴 경우 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 지정합니다.\n\n```powershell\npython -m uvicorn practice:app --host 127.0.0.1 --port 8000\n```\n\nUvicorn은 FastAPI 앱을 실행해 브라우저의 요청을 받는 서버입니다. `practice:app`은 방금 만든 `practice.py`의 `app`, `127.0.0.1`은 내 컴퓨터, `8000`은 접속할 포트입니다. 터미널에 실행 안내가 나오면 **서버를 켜 둔 채** 다음 두 주소를 각각 엽니다.\n\n1. [Python 데이터 카드](http://127.0.0.1:8000/static/02-dict-api.html): 데이터를 받아 표시한 화면\n2. [JSON 응답](http://127.0.0.1:8000/api/dict): Python 목록이 변환된 데이터\n\n`static/02-dict-api.html`은 준비된 `load-cards.js`를 연결합니다. 그 파일의 핵심은 `fetch('/api/dict')`로 요청하고 `response.json()`으로 응답을 읽는 것입니다. Alpine이 받은 목록을 카드로 표시합니다. `sample_data.py`의 Git 제목을 바꿔 저장한 뒤 서버를 재시작하고 JSON과 카드를 다시 열어 비교해 봅니다.\n\n이 단계에서는 FastAPI가 정적 화면과 API를 함께 제공하므로 Live Server는 **별도로 필요하지 않습니다**. 주소를 헷갈리지 않게 VS Code 명령 팔레트에서 **Live Server: Stop Live Server**로 중지해도 됩니다. Live Server의 `:5500`으로 열면 `fetch('/api/dict')`도 `:5500`으로 요청하므로 FastAPI의 `:8000`에 자동으로 연결되지 않습니다. 두 서버를 따로 연결하는 프로젝트는 별도 설정이 필요합니다.\n\n서버가 켜진 터미널에서 `Ctrl+C`를 누르면 종료됩니다. 이 명령에는 자동 재시작 옵션이 없으므로 Python 코드를 수정한 뒤에는 서버를 종료하고 같은 실행 명령으로 다시 켭니다. HTML·CSS·JavaScript를 수정했다면 저장 후 FastAPI 주소에서 새로고침합니다. `8000` 포트가 이미 사용 중이면 서버를 중지하고 실행 명령의 포트를 `8001`로 바꾼 뒤 브라우저 주소도 `:8001`로 바꾸세요. [FastAPI 서버 실행 안내](https://fastapi.tiangolo.com/deployment/manually/)\n\n다음 SQLite 실습에서는 이 서버를 켜 둔 채 **두 번째 터미널**에서 DB 준비 스크립트를 실행합니다. GitHub Pages는 정적 파일만 제공하며 Python 서버를 실행하지 않습니다. 이 단계에서 `npm run dev`는 필요하지 않습니다.",
        "presentationPoints": [
          "Python과 가상환경을 준비하고 practice.py에 FastAPI와 첫 라우트를 작성합니다.",
          "practice:app을 실행해 /api/dict JSON과 fetch 카드가 연결되는 모습을 확인합니다.",
          "Python 데이터를 수정하고 서버를 재시작해 응답 변화를 확인합니다."
        ]
      },
      {
        "id": "backend-sqlite",
        "title": "SQLite 데이터베이스의 카드 가져오기",
        "minutes": 20,
        "optional": false,
        "body": "### Python 목록 대신 SQLite에 데이터를 보관합니다\n\nSQLite는 표와 행을 한 파일에 저장하는 데이터베이스입니다. Python에 포함된 `sqlite3`를 사용하므로 이번 연습에 별도 DB 서버는 필요하지 않습니다. 예제의 `courses.sqlite3`는 **복사한 별도 연습 폴더**에만 생성합니다.\n\n서버를 켠 상태에서 두 번째 PowerShell 터미널을 열고 같은 `server-data` 폴더인지 확인한 뒤 실행합니다.\n\n```powershell\npwd\n.\\.venv\\Scripts\\python.exe seed.py\n```\n\n`pwd`는 PowerShell의 `Get-Location` 기본 별칭입니다. cmd에서는 인수 없는 `cd`, macOS/Linux 셸에서는 `pwd`로 위치를 확인합니다. `seed.py`는 Python 목록의 데이터를 `lessons` 표가 **비어 있을 때만** 넣습니다. 기존 행이 있다면 삭제하거나 덮어쓰지 않고 유지합니다.\n\n### SQLite를 읽는 라우트 직접 추가하기\n\n첫 번째 터미널에서 `Ctrl+C`로 서버를 중지합니다. 앞에서 만든 `practice.py` **맨 아래에** 다음 코드를 이어서 입력하고 저장합니다. 기존 `/api/dict` 코드는 지우지 않습니다.\n\n```python\nfrom pathlib import Path\nfrom contextlib import closing\nimport sqlite3\nfrom fastapi import HTTPException\n\ndef read_lessons_from_db():\n    database = Path(__file__).resolve().parent / \"courses.sqlite3\"\n    if not database.is_file():\n        raise HTTPException(status_code=503, detail=\"먼저 seed.py를 실행하세요.\")\n    with closing(sqlite3.connect(database)) as connection:\n        connection.row_factory = sqlite3.Row\n        rows = connection.execute(\n            \"SELECT title, minutes, description FROM lessons ORDER BY id\"\n        ).fetchall()\n        return [dict(row) for row in rows]\n\n@app.get(\"/api/sqlite\")\ndef api_sqlite():\n    return read_lessons_from_db()\n```\n\n`read_lessons_from_db()`는 DB 파일을 열고 `lessons` 표의 행을 딕셔너리 목록으로 바꿉니다. 아직 DB 파일이 없다면 503 응답으로 `seed.py` 준비를 안내합니다. `@app.get(\"/api/sqlite\")`는 이 목록을 JSON으로 돌려주는 두 번째 라우트입니다.\n\n첫 번째 터미널에서 서버를 다시 실행합니다. 가상환경을 활성화하지 않았다면 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 씁니다.\n\n```powershell\npython -m uvicorn practice:app --host 127.0.0.1 --port 8000\n```\n\n브라우저에서 [SQLite 데이터 카드](http://127.0.0.1:8000/static/03-sqlite-api.html)를 열고, [SQLite JSON 응답](http://127.0.0.1:8000/api/sqlite)도 확인합니다. FastAPI는 DB 행을 읽어 JSON으로 응답하고, HTML은 `fetch('/api/sqlite')`로 받아 같은 카드에 표시합니다. DB가 아직 없으면 먼저 `seed.py`를 실행하라는 안내가 나타납니다.\n\n두 번째 터미널에서 다음 스크립트를 실행하고 SQLite 카드 화면을 새로고침합니다.\n\n```powershell\n.\\.venv\\Scripts\\python.exe add_card.py\n```\n\n`마크다운` 카드가 추가됩니다. 같은 카드가 이미 있으면 중복하지 않고 기존 데이터를 유지합니다. Python 목록(`/api/dict`)은 별개이므로 DB에 추가한 카드가 자동으로 들어가지는 않습니다. [Python sqlite3 공식 문서](https://docs.python.org/3/library/sqlite3.html)\n\n지금까지는 브라우저가 JSON 응답을 받아 화면을 채웠습니다. 다음에는 서버가 같은 DB 데이터와 템플릿을 합쳐 HTML을 먼저 만들어 보냅니다.",
        "presentationPoints": [
          "seed.py로 연습 DB를 준비하고 기존 데이터는 보존합니다.",
          "practice.py에 /api/sqlite 라우트를 추가해 DB의 JSON과 카드를 확인합니다."
        ]
      },
      {
        "id": "web-jinja",
        "title": "Jinja2 템플릿에 DB 데이터 넣기",
        "minutes": 20,
        "optional": false,
        "body": "### 같은 SQLite 데이터를 템플릿에 전달합니다\n\n이전 단계의 `/api/sqlite`는 **JSON 데이터**를 응답했고, 브라우저가 HTML에 내용을 넣었습니다. 이제 같은 `practice.py`에 화면을 만드는 라우트를 직접 추가합니다. 서버를 `Ctrl+C`로 중지하고 기존 코드 아래에 다음 코드를 이어 적어 저장합니다.\n\n```python\nfrom fastapi import Request\nfrom fastapi.responses import HTMLResponse\nfrom fastapi.templating import Jinja2Templates\n\ntemplates = Jinja2Templates(directory=\"templates\")\n\n@app.get(\"/sqlite\", response_class=HTMLResponse)\ndef template_sqlite(request: Request):\n    return templates.TemplateResponse(\n        request=request,\n        name=\"cards.html\",\n        context={\"lessons\": read_lessons_from_db(), \"source\": \"SQLite 데이터베이스\"},\n    )\n```\n\n`Jinja2Templates`는 `templates` 폴더의 HTML을 찾고, `@app.get(\"/sqlite\")`는 해당 주소의 요청을 처리합니다. `context`의 `lessons`에 바로 앞에서 만든 DB 조회 함수의 결과를 넣고 `source`에는 화면에 표시할 문구를 전달합니다. `request`는 현재 요청 정보를 템플릿 응답에 전달합니다.\n\n서버를 다시 실행한 뒤 [템플릿 카드](http://127.0.0.1:8000/sqlite)를 엽니다. 활성화한 터미널에서 실행하며, 활성화하지 않았다면 `python` 대신 `.\\.venv\\Scripts\\python.exe`를 씁니다.\n\n```powershell\npython -m uvicorn practice:app --host 127.0.0.1 --port 8000\n```\n\nFastAPI가 같은 DB 행을 읽어 `templates/cards.html`에 전달하고 Jinja2가 공통 구조와 데이터를 합쳐 **HTML 응답**을 만듭니다. 화면에는 앞에서 DB에 추가한 마크다운 카드도 나타납니다.\n\n복사해 둔 `templates/cards.html`을 VS Code로 열면 다음과 같은 핵심 부분이 보입니다. 이 파일을 새로 만들거나 덮어쓸 필요는 없습니다.\n\n```html\n{% for lesson in lessons %}\n  <h2>{{ lesson.title }}</h2>\n  <p>{{ lesson.minutes }}분</p>\n  <p>{{ lesson.description }}</p>\n{% endfor %}\n```\n\n`{% for ... %}`는 목록의 카드 구조를 반복하고, `{{ ... }}`는 데이터 값을 넣습니다. 서버는 완성된 HTML을 응답하고 브라우저는 그 HTML을 표시합니다. 그 뒤 Alpine이 버튼의 펼치기 동작을 담당합니다. Tailwind는 모양을 담당합니다. [FastAPI Jinja2 공식 안내](https://fastapi.tiangolo.com/advanced/templates/)\n\n**비교:** `/api/sqlite`는 DB의 JSON 응답, `/sqlite`는 같은 데이터를 담은 HTML 응답입니다. 데이터는 같은 DB에 있으며 화면을 조립하는 위치가 다릅니다. Jinja2는 서버 템플릿 도구이며 데이터베이스나 서버 자체는 아닙니다. Django의 템플릿 언어도 같은 목적을 갖지만 문법과 설정은 다릅니다.\n\n이 화면은 FastAPI가 Jinja 템플릿을 처리해 응답하므로 FastAPI의 `/sqlite` 주소로 엽니다. 템플릿 파일을 Live Server로 직접 열면 서버에서 데이터를 넣어 주지 않습니다. 이 예제의 Tailwind와 Alpine은 CDN에서 불러오므로 인터넷 연결이 필요합니다. 화면과 데이터는 FastAPI 주소에서 확인하므로 여기서는 Live Server가 따로 필요하지 않습니다.\n\n이 예제는 학습용 로컬 서버입니다. GitHub Pages는 정적 HTML을 제공하며 FastAPI와 SQLite 실행을 대신하지 않습니다.\n\n**직접 확인:** `cards.html`의 `{{ lesson.title }}`을 찾아 데이터가 들어갈 위치를 확인합니다. 그다음 `source`의 문구를 `practice.py`에서 바꾸어 저장하고 서버를 재시작한 뒤 `/sqlite` 화면의 출처가 바뀌는지 확인합니다. 세 라우트를 순서대로 작성한 완성본은 복사해 둔 `practice_complete.py`에서 비교할 수 있습니다.",
        "presentationPoints": [
          "practice.py에 템플릿을 반환하는 /sqlite 라우트를 직접 추가합니다.",
          "DB 조회 결과와 source를 cards.html에 전달하고 JSON과 HTML 응답을 비교합니다."
        ]
      }
    ],
    "steps": [
      {
        "id": "backend-html-json",
        "title": "HTML 안 JSON 수정하기",
        "description": "HTML에 담긴 JSON을 바꾸고 정적 카드 화면을 새로고침합니다.",
        "scene": "code",
        "code": "<script type=\"application/json\" id=\"lesson-data\">\n[{\"title\":\"Git\",\"minutes\":25,\"description\":\"변경 확인\"}]\n</script>\nJSON.parse(document.getElementById(\"lesson-data\").textContent)",
        "language": "html",
        "output": "HTML 안의 JSON을 브라우저가 읽어 카드에 표시합니다.",
        "focus": "frontend",
        "fileName": "static/01-local-json.html",
        "files": [
          "static/01-local-json.html"
        ]
      },
      {
        "id": "backend-start",
        "title": "FastAPI 첫 라우트 작성하고 실행하기",
        "description": "가상환경을 준비한 뒤 practice.py에 FastAPI와 /api/dict 라우트를 직접 작성하고 실행합니다.",
        "scene": "terminal",
        "code": "pwd\nls\npy -3 --version\nTest-Path .\\.venv\n# False일 때만 생성\npy -3 -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -c \"import sys; print(sys.executable)\"\npython -m pip install -r requirements.txt\n# practice.py에 /api/dict 코드를 작성하고 저장한 뒤\npython -m uvicorn practice:app --host 127.0.0.1 --port 8000",
        "language": "powershell",
        "output": "(.venv) Python 경로를 확인하고 FastAPI 주소에서 카드와 JSON을 확인합니다.",
        "focus": "backend",
        "fileName": "practice.py · PowerShell",
        "files": [
          "practice.py",
          "sample_data.py",
          "requirements.txt",
          "static/02-dict-api.html"
        ]
      },
      {
        "id": "backend-db-init",
        "title": "SQLite 연습 DB 준비와 데이터 추가",
        "description": "두 번째 터미널에서 DB를 준비하고 practice.py에 /api/sqlite 라우트를 직접 추가합니다.",
        "scene": "terminal",
        "code": "pwd\n.\\.venv\\Scripts\\python.exe seed.py\n.\\.venv\\Scripts\\python.exe add_card.py",
        "language": "powershell",
        "output": "추가한 /api/sqlite 라우트의 JSON과 카드에서 마크다운 항목을 확인합니다.",
        "focus": "backend",
        "fileName": "seed.py · add_card.py",
        "files": [
          "seed.py",
          "add_card.py",
          "courses.sqlite3"
        ]
      },
      {
        "id": "backend-template",
        "title": "템플릿 응답 라우트 직접 추가하기",
        "description": "practice.py에 /sqlite 라우트를 추가해 DB 데이터를 cards.html에 전달합니다.",
        "scene": "code",
        "code": "from fastapi import Request\nfrom fastapi.responses import HTMLResponse\nfrom fastapi.templating import Jinja2Templates\n\ntemplates = Jinja2Templates(directory=\"templates\")\n\n@app.get(\"/sqlite\", response_class=HTMLResponse)\ndef template_sqlite(request: Request):\n    return templates.TemplateResponse(\n        request=request,\n        name=\"cards.html\",\n        context={\"lessons\": read_lessons_from_db(), \"source\": \"SQLite 데이터베이스\"},\n    )",
        "language": "python",
        "output": "/sqlite는 DB 데이터를 반영한 HTML을 응답합니다. /api/sqlite의 JSON과 구분합니다.",
        "focus": "backend",
        "fileName": "practice.py",
        "files": [
          "practice.py",
          "templates/cards.html",
          "courses.sqlite3"
        ]
      }
    ],
    "checklist": [
      "HTML 안 JSON과 Python·SQLite의 데이터 위치를 구분한다.",
      "Python과 가상환경을 준비하고 FastAPI 앱과 /api/dict 라우트를 직접 작성·실행한다.",
      "/api/sqlite 라우트를 추가하고 브라우저가 JSON을 fetch하는 과정을 설명한다.",
      "/sqlite 라우트에서 템플릿에 DB 데이터를 전달해 HTML을 만든다."
    ],
    "pitfalls": [
      {
        "title": "정적 배포와 서버 실행 구분",
        "body": "GitHub Pages는 Python 서버나 SQLite 질의를 실행하지 않습니다. FastAPI 서버는 연습 컴퓨터에서 별도로 실행합니다."
      },
      {
        "title": "Python 목록과 DB는 별개입니다",
        "body": "seed.py는 빈 DB에만 데이터를 넣습니다. 이후 두 저장소의 변경은 자동 동기화되지 않습니다."
      },
      {
        "title": "가상환경은 터미널마다 확인합니다",
        "body": "새 탭에서는 활성화가 이어지지 않습니다. .venv의 Python 경로를 직접 사용하거나 그 탭에서 다시 활성화합니다."
      },
      {
        "title": "가상환경 활성화가 막히면",
        "body": "PowerShell 실행 정책을 변경하지 않고 .venv\\Scripts\\python.exe를 직접 지정해 같은 가상환경을 사용할 수 있습니다."
      }
    ],
    "glossary": [
      {
        "term": "FastAPI",
        "definition": "Python으로 HTTP 요청을 처리하는 백엔드 웹 프레임워크입니다."
      },
      {
        "term": "Jinja2",
        "definition": "서버에서 템플릿에 데이터를 채워 HTML을 만드는 도구입니다."
      },
      {
        "term": "SQLite",
        "definition": "파일에 표와 행을 저장하는 데이터베이스입니다."
      },
      {
        "term": "venv 가상환경",
        "definition": "Python 프로젝트별 패키지를 분리해 관리하기 위해 만드는 환경입니다."
      },
      {
        "term": "pip",
        "definition": "선택한 Python 환경에 필요한 패키지를 설치하는 도구입니다."
      },
      {
        "term": "Uvicorn",
        "definition": "FastAPI 앱을 실행해 브라우저의 HTTP 요청을 처리하는 서버입니다."
      },
      {
        "term": "라우트",
        "definition": "특정 주소의 요청을 처리할 함수를 연결한 규칙입니다."
      }
    ],
    "references": [
      {
        "title": "FastAPI 템플릿",
        "url": "https://fastapi.tiangolo.com/advanced/templates/"
      },
      {
        "title": "Python sqlite3",
        "url": "https://docs.python.org/3/library/sqlite3.html"
      },
      {
        "title": "서버 실행",
        "url": "https://fastapi.tiangolo.com/deployment/manually/"
      },
      {
        "title": "Python Windows 설치",
        "url": "https://docs.python.org/3/using/windows.html"
      },
      {
        "title": "Python 가상환경",
        "url": "https://docs.python.org/3/library/venv.html"
      },
      {
        "title": "FastAPI 첫 라우트",
        "url": "https://fastapi.tiangolo.com/tutorial/first-steps/"
      },
      {
        "title": "FastAPI 정적 파일",
        "url": "https://fastapi.tiangolo.com/tutorial/static-files/"
      }
    ],
    "closing": "HTML 내부 JSON에서 시작해 Python과 SQLite 데이터를 JSON으로 가져왔고, 마지막에는 같은 DB 데이터를 템플릿으로 HTML에 채웠습니다.",
    "presentation": {
      "caseSummary": "같은 카드의 데이터 위치를 HTML 안 JSON → 서버 Python → SQLite로 바꾸고, 마지막에 Jinja 템플릿으로 출력합니다.",
      "demo": {
        "program": "VS Code · PowerShell · 브라우저",
        "file": "practice.py · sample_data.py · courses.sqlite3 · templates/cards.html",
        "command": "HTML 안 JSON 확인 → Python과 가상환경 준비\npractice.py에 /api/dict 작성 → FastAPI 실행과 카드·JSON 확인\nseed.py 실행 → /api/sqlite 추가 후 JSON·카드 확인\n/sqlite 추가 → cards.html에 데이터 전달 확인",
        "expectedResult": "작성한 세 라우트로 Python·SQLite JSON과 Jinja HTML을 확인합니다.",
        "durationMinutes": 20
      },
      "returnSummary": "정적 카드에는 Live Server를 쓰고, FastAPI가 화면·API·템플릿을 제공하는 단계에서는 FastAPI 주소로 전환했습니다."
    }
  }
};
