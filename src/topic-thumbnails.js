// Small, text-free scenes shared by home, lesson and presentation cards.
// All artwork is local SVG with no IDs, external resources or user-supplied markup.
const scenes = {
  terminal: `
    <path d="M34 22 114 13 123 19 43 28Z" fill="#c6d1bb"/>
    <path d="M34 22 43 28V79L34 73Z" fill="#89a38c"/>
    <path d="M43 28 123 19V70L43 79Z" fill="#3c5b50"/>
    <path d="M43 39 123 30" stroke="#9fb99d"/>
    <circle cx="51" cy="33" r="1.8" fill="#e4bf80"/><circle cx="58" cy="32" r="1.8" fill="#c7d4b7"/>
    <path d="m55 49 9 5-8 8m17 0 16-2" stroke="#fff1cd" stroke-width="3"/>
    <path d="m51 84 41-5 18 9-41 6Z" fill="#e6dcc4"/>
    <path d="m51 84 18 10v5L51 89Zm18 10 41-6v5l-41 6Z" fill="#9caf98"/>
    <path d="m112 65 13-2 5 4 13-2v24l-31 5Z" fill="#e1bd80"/>
    <path d="m112 73 31-5" stroke="#b48d5f"/>
  `,
  git: `
    <path d="M48 20 111 12 121 19 58 27Z" fill="#e9d3aa"/>
    <path d="M48 20 58 27V88L48 81Z" fill="#bba785"/>
    <path d="M58 27 121 19V80L58 88Z" fill="#fff8e7"/>
    <path d="M76 39v33m0-23c0 11 25 2 25 15" stroke="#577966" stroke-width="4"/>
    <circle cx="76" cy="38" r="6" fill="#dfb878"/><circle cx="76" cy="73" r="6" fill="#dfb878"/>
    <circle cx="101" cy="65" r="6" fill="#c88c68"/>
    <path d="m28 74 13-6 13 7-13 6Z" fill="#a9bea1"/>
    <path d="m28 74 13 7v12l-13-7Zm13 7 13-6v12l-13 6Z" fill="#789b85"/>
    <path d="m111 87 11-6 12 6-11 6Z" fill="#ecd5ad"/><path d="m111 87 12 6v8l-12-6Zm12 6 11-6v8l-11 6Z" fill="#c5ac82"/>
  `,
  github: `
    <path d="M59 43c-10 0-15-6-15-13 0-9 8-15 17-14C66 4 85 4 93 15c12-4 24 4 24 14 0 8-6 14-15 14Z" fill="#e5eddb"/>
    <path d="m79 27 10-4 10 5-10 5Z" fill="#6f927a"/><path d="m79 27 10 6v12l-10-6Zm10 6 10-5v12l-10 5Z" fill="#456a5b"/>
    <path d="M89 48v12m0 0L48 75m41-15 31 13" stroke="#89a78b" stroke-dasharray="3 4"/>
    <path d="m28 70 25-6 17 9-25 6Z" fill="#fff8e8"/><path d="m28 70 17 9v16l-17-9Z" fill="#dfcda8"/><path d="m45 79 25-6v16l-25 6Z" fill="#b5c5a4"/>
    <path d="m100 70 25-6 15 9-25 6Z" fill="#fff8e8"/><path d="m100 70 15 9v16l-15-9Z" fill="#dfcda8"/><path d="m115 79 25-6v16l-25 6Z" fill="#b5c5a4"/>
    <path d="m62 88 20-5 15 8-20 5Z" fill="#e2bd81"/><path d="m62 88 15 8v8l-15-8Zm15 8 20-5v8l-20 5Z" fill="#bd9f70"/>
  `,
  markdown: `
    <path d="m40 23 51-9 24 13v58l-51 10-24-13Z" fill="#b1c0a4"/>
    <path d="m47 20 51-9 19 11v60L66 93 47 81Z" fill="#e2d6ba"/>
    <path d="m58 26 50-10 13 8v60L71 95 58 86Z" fill="#fff9e9"/>
    <path d="m108 16 0 16 13-8" fill="#dbe5cc"/>
    <path d="m77 38-1 17m10-20-1 17m-14-9 20-4m-21 13 20-4" stroke="#577b65" stroke-width="2.5"/>
    <path d="m76 65 32-7m-32 15 24-5m-24 13 30-6" stroke="#9db196" stroke-width="2.7"/>
    <path d="m33 83 7 5 27-38-7-5Z" fill="#dfb878"/><path d="m33 83-1 9 8-4Z" fill="#fff0cb"/>
  `,
  ide: `
    <path d="m28 24 89-12 11 7-89 12Z" fill="#c8d2b9"/>
    <path d="m28 24 11 7v54l-11-7Z" fill="#8ca38c"/>
    <path d="m39 31 89-12v54L39 85Z" fill="#fff7e6"/>
    <path d="m39 41 89-12M64 38v43" stroke="#a2b698"/>
    <path d="m46 50 10-1m-10 9 8-1m-8 9 10-1" stroke="#9ab096" stroke-width="2.4"/>
    <path d="m73 47 16-2m6-1 20-2m-36 13 28-4m-34 13 16-2m6-1 20-3m-36 13 20-3" stroke="#678b73" stroke-width="2.7"/>
    <path d="m95 52 12-2m-34 14 8-1" stroke="#c88c68" stroke-width="2.7"/>
    <path d="m62 87 35-5 20 10-35 6Z" fill="#d9cfb7"/>
    <path d="m62 87 20 11v4L62 91Zm20 11 35-6v4l-35 6Z" fill="#9cb098"/>
    <path d="m112 59 31-4v28l-31 4Z" fill="#dce7cf"/><path d="m118 65 19-3m-19 9 12-2m-12 9 17-2" stroke="#769779" stroke-width="2.3"/>
  `,
  web: `
    <path d="m16 36 61-8 8 5-61 8Z" fill="#d7dfc8"/>
    <path d="m16 36 8 5v43l-8-5Z" fill="#a0b196"/>
    <path d="m24 41 61-8v43l-61 8Z" fill="#fff8e7"/>
    <path d="m24 50 61-8" stroke="#9eb397"/>
    <path d="m33 59 20-2v15l-20 2Z" fill="#afc7a3"/>
    <path d="m60 57 17-2m-17 9 13-2m-13 9 17-2" stroke="#84a085" stroke-width="2.5"/>
    <path d="m107 23 22-6 15 9-22 6Z" fill="#91ac8e"/>
    <path d="m107 23 15 9v56l-15-9Z" fill="#6e8f78"/>
    <path d="m122 32 22-6v56l-22 6Z" fill="#3e6154"/>
    <path d="m127 43 12-3m-12 18 12-3m-12 18 12-3" stroke="#b5c8a8" stroke-width="2.4"/>
    <path d="m88 52 15-3m-5-3 5 3-4 5m-12 12 15-3m-10-3-5 6 5 2" stroke="#c18e59" stroke-width="2.3"/>
  `,
  templates: `
    <path d="m24 67 64-17 44 24-64 18Z" fill="#c4d3b5"/><path d="m24 67 44 25v7L24 74Zm44 25 64-18v7L68 99Z" fill="#91aa8b"/>
    <path d="m24 49 64-17 44 24-64 18Z" fill="#f0dbb3"/><path d="m24 49 44 25v6L24 55Zm44 25 64-18v6L68 80Z" fill="#ceb78b"/>
    <path d="m24 31 64-17 44 24-64 18Z" fill="#fff8e7"/><path d="m24 31 44 25v6L24 37Zm44 25 64-18v6L68 62Z" fill="#b6c4a6"/>
    <path d="m42 32 15-4 11 6-15 4Z" fill="#a4bd9d"/><path d="m65 26 19-5 26 14-19 5Z" fill="#e3e8d2"/>
    <path d="m60 43 31-8m-24 12 31-9" stroke="#8da784" stroke-width="2.2"/>
    <path d="m116 79 10-3 9 5-10 3Z" fill="#e2b77b"/><path d="m116 79 9 5v11l-9-5Zm9 5 10-3v11l-10 3Z" fill="#bb9464"/>
  `,
  fallback: `
    <path d="m43 26 47-12 28 16v54L71 97 43 80Z" fill="#e5d7b8"/>
    <path d="m71 42 47-12v54L71 97Z" fill="#fff8e7"/>
    <path d="m81 54 25-7m-25 18 25-7m-25 18 18-5" stroke="#83a081" stroke-width="3"/>
    <path d="m43 26 28 16v55L43 80Z" fill="#a7bb9f"/>
  `,
};

export function topicThumbnail(id) {
  const key = Object.hasOwn(scenes, id) ? id : 'fallback';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 112" fill="none" aria-hidden="true" focusable="false" data-topic-thumbnail="${key}"><ellipse cx="81" cy="97" rx="66" ry="10" fill="#7e9970" opacity=".12"/><g stroke="#3e574c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${scenes[key]}</g></svg>`;
}
