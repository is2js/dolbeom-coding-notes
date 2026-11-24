// Published web-tools case before the Alpine-only case revision.
export const previousWebToolsAlpineCaseDefault = {
  "id": "web-tools",
  "case": {
    "kind": "real",
    "title": "부동산 지도와 온라인 청첩장은 어떻게 움직일까요?",
    "body": "![돌범의 부동산 지도에서 지역을 선택하고 지도를 살펴보는 실제 프로젝트 화면](./assets/course/buja-map-case.gif)\n\n이 화면은 강사가 Codex와 함께 만든 **돌범의 부동산 지도**입니다. 지도를 살펴보고 지역을 선택하면 화면의 내용이 바뀝니다. 화면에서 지역 탭과 지도를 직접 눌러 봅니다. [돌범의 부동산 지도](https://is2js.github.io/buja-clone/)\n\n### 1. Alpine.js로 화면을 움직이기\n\n카테고리에서 서울·경기 같은 **지역 탭을 선택**하거나 지도에서 **지역을 클릭**하면 선택한 위치와 화면이 바뀝니다. 이때 Alpine.js가 지역 선택과 화면 표시를 연결하고, 지도 영역은 지도 라이브러리와 함께 동작합니다.\n\n지역 탭에서 쓰는 코드의 일부입니다. `@click`은 버튼을 눌렀을 때 지역을 선택하는 동작을 실행합니다.\n\n~~~html\n<template x-for=\"item in data.areas\" :key=\"item.code\">\n  <button type=\"button\" role=\"tab\"\n    :aria-selected=\"area === item.code\"\n    :class=\"{on: area === item.code}\"\n    @click=\"setArea(item.code)\" x-text=\"item.name\"></button>\n</template>\n~~~\n\n\n프로젝트의 `src/main.js`는 npm으로 설치한 Alpine을 불러와 실행합니다. 아래는 파일에서 필요한 줄만 발췌한 것입니다.\n\n~~~javascript\nimport Alpine from 'alpinejs';\n~~~\n\n~~~javascript\nAlpine.start();\n~~~\n\n### 또 다른 사례: CDN으로 만든 온라인 청첩장\n\n강사가 만든 [온라인 청첩장](https://wedding.chojaeseong.com/)에서도 Alpine.js를 사용합니다. 질문을 누르면 답변이 펼쳐지는 동작을 살펴보세요. 청첩장에는 Bootstrap과 Swiper 등 다른 도구도 함께 사용됩니다.\n\n이 사이트의 HTML에는 Alpine.js를 CDN으로 연결하는 코드가 직접 들어 있습니다.\n\n~~~html\n<script defer src=\"https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js\"></script>\n~~~\n\n이처럼 CDN 주소를 HTML에 적으면 별도의 패키지 설치 없이 브라우저가 Alpine.js를 불러옵니다. 위 주소의 `3.x.x`는 3 버전 계열을 가리킵니다. 청첩장에서는 답변이 부드럽게 펼쳐지도록 별도의 Alpine 플러그인도 사용합니다.\n\n### 2. Tailwind CSS가 연결된 위치\n\n지도 프로젝트의 `package.json`에서 필요한 부분만 발췌하면 다음과 같습니다.\n\n~~~json\n{\n  \"scripts\": { \"dev\": \"vite --host 127.0.0.1\", \"build\": \"vite build\" },\n  \"dependencies\": { \"alpinejs\": \"3.14.9\" },\n  \"devDependencies\": { \"tailwindcss\": \"3.4.17\", \"vite\": \"6.4.5\" }\n}\n~~~\n\n`src/style.css`의 첫 부분에는 Tailwind CSS를 연결하는 설정이 있습니다.\n\n~~~css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n~~~\n\nTailwind CSS 3을 빌드할 때 이 설정을 처리합니다. 이 지도 화면은 `p-6` 같은 Tailwind 유틸리티 클래스보다 직접 작성한 CSS 클래스의 비중이 큽니다.\n\n### 3. CDN과 Vite에서 사용하는 방법\n\n이 프로젝트는 npm으로 패키지를 설치하고 **Vite**로 개발 서버를 실행합니다. 배포할 때는 Vite가 Alpine과 CSS를 처리해 정적 파일을 만듭니다. 그래서 원본 HTML의 `<head>`에서 두 라이브러리의 CDN 주소가 바로 보이지 않습니다. Vite는 개발 서버와 빌드를 돕는 도구입니다. [Vite 안내](https://vite.dev/guide/)\n\n<mark>수업에서는 설치 없이 HTML에서 직접 연결하는 **CDN**으로 시작합니다. Tailwind 3 **Play CDN**은 학습·시연용으로 사용합니다. 실제 배포용을 만들 때는 AI에게 사용한 버전과 배포 위치를 알려 주고 프로젝트에 맞는 빌드 구성을 요청할 수 있습니다.</mark> [Tailwind Play CDN 안내](https://v3.tailwindcss.com/docs/installation/play-cdn)\n\n앞에서 만든 Git 강의 카드로 돌아가 **Tailwind CSS는 모양**, **Alpine.js는 버튼 동작**에 사용해 봅니다. [두 카드 비교 화면](./examples/course-card/template-preview.html)",
    "question": "지역 탭과 지도 클릭을 통해 화면에 어떤 변화가 생기나요?"
  },
  "presentation": {
    "caseSummary": "<mark>돌범의 부동산 지도</mark>와 <mark>온라인 청첩장</mark>의 화면 동작을 살펴봅니다. 지도는 Vite로 빌드하고, 청첩장은 Alpine.js를 CDN으로 연결합니다. 수업에서는 CDN으로 시작합니다."
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
