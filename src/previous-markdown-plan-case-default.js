// Published Markdown case before the Plan mode screenshots were added.
export const previousMarkdownPlanCaseDefault = {
  "case": {
    "kind": "real",
    "title": "Codex Plan 모드에서 계획을 받고 마크다운으로 요청하기",
    "body": "### 1. Plan 모드에서 계획 먼저 받기\n\n![Codex Plan 모드에서 PVP RPG 소개 화면 개선 계획을 받고 구현을 요청한 실제 대화](./assets/course/markdown-codex-plan-conversation.png)\n\n소개 화면을 개선해 달라고 요청하자, 코딩을 돕는 AI 에이전트인 Codex가 **Plan 모드에서 구현 전에 계획을 마크다운으로 정리**했습니다. 저는 계획에 담긴 작업 범위를 확인한 뒤 **이 계획을 구현해 달라**고 요청했습니다. [OpenAI Plan 모드 안내](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)\n\n### 2. 계획에서 마크다운 찾기\n\n![같은 Codex 계획문에 구현 목표, 목록, 경로를 표시한 인라인 코드, 화면 구성 표가 보이는 화면](./assets/course/markdown-codex-plan-document.png)\n\n같은 계획을 펼쳐 보면 **제목**으로 내용을 나누고, **목록**으로 할 일을 정리하며, **표**로 화면 구성을 비교합니다. `/intro` 같은 경로는 인라인 코드로 표시해 본문에서 바로 찾을 수 있습니다.\n\n### 3. 내가 보내는 요청도 마크다운으로 쓰기\n\n<mark>프롬프트는 에이전트에게 보내는 요청입니다. 제목과 목록으로 바꿀 것, 지킬 조건, 확인 방법을 나눠 쓰면 요청을 읽고 빠진 부분을 확인하기 쉽습니다.</mark>\n\n```markdown\n## 목표\n- 강의 카드에 자세히 보기 버튼을 추가해 주세요.\n\n## 지킬 조건\n- 기존 카드 제목과 색상은 유지해 주세요.\n\n## 확인 방법\n- 버튼을 누르면 설명이 열리고, 다시 누르면 닫히는지 확인해 주세요.\n```\n\n[마크다운 실시간 연습 열기](#/lesson/markdown/section-markdown-map)에서 위 요청을 붙여 넣고, 제목과 목록이 어떻게 보이는지 확인해 봅니다.",
    "question": "내가 Codex에게 요청한다면, 바꿀 것과 지킬 조건을 어떤 제목과 목록으로 나눠 쓸까요?"
  },
  "presentation": {
    "caseSummary": "이 강의노트의 실제 모바일 디자인 개선 요청과 Codex 계획 발췌를 비교합니다. 제목·목록·강조·인라인 코드·링크·표를 살펴보고 구현 전에 계획을 검토합니다. [마크다운 실시간 연습 열기](#/lesson/markdown/section-markdown-map)에서 계획의 원문과 미리보기를 비교하고 제목이나 목록을 바꿔 봅니다."
  }
};
