// Published web tools case before introducing the real property map project.
export const previousWebToolsMapCaseDefault = {
  "id": "web-tools",
  "case": {
    "kind": "real",
    "title": "돌범의 부동산 지도는 어떻게 움직일까요?",
    "body": "![돌범의 부동산 지도에서 지역을 선택하고 지도를 살펴보는 실제 프로젝트 화면](./assets/course/buja-map-case.png)\n\n이 화면은 강사가 Codex와 함께 만든 **돌범의 부동산 지도**입니다. 지도를 살펴보고 지역을 선택하면 화면의 내용이 바뀝니다. 직접 화면과 코드를 열어 봅니다. [돌범의 부동산 지도](https://is2js.github.io/buja-clone/) · [GitHub 공개 저장소](https://github.com/is2js/buja-clone)\n\n### 1. Alpine.js로 화면을 움직이기\n\n실제 `index.html`에는 화면의 상태를 연결하는 `x-data`와 로딩 중일 때 문구를 보여 주는 `x-show`가 있습니다.\n\n~~~html\n<div class=\"app-shell\" x-data=\"bujaApp\" x-cloak>\n  <div class=\"loading\" x-show=\"loading\">지도를 준비하고 있어요.</div>\n</div>\n~~~\n\n`x-data=\"bujaApp\"`은 이 화면에서 사용할 상태와 동작을 연결하고 `x-show=\"loading\"`은 로딩 상태에 따라 문구를 표시합니다. 위 코드는 이해하기 쉽도록 실제 HTML의 해당 부분을 모아 보여줍니다. [실제 index.html](https://github.com/is2js/buja-clone/blob/main/index.html)\n\n프로젝트의 `src/main.js`는 npm으로 설치한 Alpine을 불러와 실행합니다. 아래는 파일에서 필요한 줄만 발췌한 것입니다.\n\n~~~javascript\nimport Alpine from 'alpinejs';\n~~~\n\n~~~javascript\nAlpine.start();\n~~~\n\n[실제 main.js](https://github.com/is2js/buja-clone/blob/main/src/main.js)\n\n### 2. Tailwind CSS가 연결된 위치\n\n`package.json`에 `alpinejs`, `tailwindcss`, `vite`가 등록되어 있고, `src/style.css`의 첫 부분에 다음 설정이 있습니다.\n\n~~~css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n~~~\n\nTailwind CSS 3을 빌드할 때 이 설정을 처리합니다. 이 지도 화면은 `p-6` 같은 Tailwind 유틸리티 클래스보다 직접 작성한 CSS 클래스의 비중이 큽니다. [package.json](https://github.com/is2js/buja-clone/blob/main/package.json) · [실제 style.css](https://github.com/is2js/buja-clone/blob/main/src/style.css)\n\n### 3. CDN과 Vite에서 사용하는 방법\n\n이 프로젝트는 npm으로 패키지를 설치하고 **Vite**로 개발 서버를 실행합니다. 배포할 때는 Vite가 Alpine과 CSS를 처리해 정적 파일을 만듭니다. 그래서 원본 HTML의 `<head>`에서 두 라이브러리의 CDN 주소가 바로 보이지 않습니다. Vite는 개발 서버와 빌드를 돕는 도구입니다. [Vite 안내](https://vite.dev/guide/)\n\n수업에서는 설치 없이 HTML에서 직접 연결하는 **CDN**으로 시작합니다. Tailwind 3 **Play CDN**은 학습·시연용으로 사용합니다. 실제 배포용을 만들 때는 AI에게 사용한 버전과 배포 위치를 알려 주고 프로젝트에 맞는 빌드 구성을 요청할 수 있습니다. [Tailwind Play CDN 안내](https://v3.tailwindcss.com/docs/installation/play-cdn)\n\n앞에서 만든 Git 강의 카드로 돌아가 **Tailwind CSS는 모양**, **Alpine.js는 버튼 동작**에 사용해 봅니다. [두 카드 비교 화면](./examples/course-card/template-preview.html)",
    "question": "지도 사례에서는 상태에 따른 화면 표시를 어디에서 확인할 수 있을까요?"
  },
  "presentation": {
    "caseSummary": "기존 CSS·JavaScript 카드와 같은 화면을 Tailwind·Alpine으로 비교합니다. 내용은 그대로 두고 모양과 동작을 작성하는 방법을 바꿉니다."
  },
  "sections": [
    {
      "id": "frontend-css"
    },
    {
      "id": "frontend-alpine"
    },
    {
      "id": "frontend-bonus"
    }
  ],
  "steps": [
    {
      "id": "frontend-02"
    },
    {
      "id": "frontend-03"
    },
    {
      "id": "frontend-06"
    },
    {
      "id": "frontend-08"
    }
  ]
};
