// Approved browser/server grid study, retained as a native SVG with its request and response animation.
export const webGridCandidate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 550" class="topic-art-svg section-art-svg wg-scene" aria-hidden="true" focusable="false">
  <title>격자 위 브라우저와 서버</title>
  <desc>두 장치의 받침과 요청·응답 선이 같은 바닥 축을 따릅니다. 주황색 요청은 브라우저에서 서버로, 청록색 응답은 서버에서 브라우저로 흐릅니다.</desc>
  <defs>
    <linearGradient id="wg-cream" x1="0" y1="0" x2=".82" y2="1"><stop stop-color="#fffaf0"/><stop offset="1" stop-color="#eee3c3"/></linearGradient>
    <linearGradient id="wg-sage" x1="0" y1="0" x2=".82" y2="1"><stop stop-color="#f3f3de"/><stop offset="1" stop-color="#d4dfc6"/></linearGradient>
    <linearGradient id="wg-browser-frame" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="#fffbee"/><stop offset="1" stop-color="#ded7ba"/></linearGradient>
    <linearGradient id="wg-browser-card" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="#e9efdb"/><stop offset="1" stop-color="#cadcc5"/></linearGradient>
    <linearGradient id="wg-server-top" x1="0" y1="0" x2=".75" y2="1"><stop stop-color="#f2f4e2"/><stop offset="1" stop-color="#afc0ad"/></linearGradient>
    <linearGradient id="wg-server-side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#aabeb2"/><stop offset="1" stop-color="#778d83"/></linearGradient>
    <linearGradient id="wg-server-front" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#c4d7c5"/><stop offset="1" stop-color="#91a99b"/></linearGradient>
    <filter id="wg-shadow" x="-.4" y="-.5" width="1.8" height="2"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="wg-contact" x="-.4" y="-.55" width="1.8" height="2.1"><feGaussianBlur stdDeviation="4.5"/></filter>
  </defs>
  <style>
    .wg-packet-out { animation: wg-send 5.4s linear infinite both; }
    .wg-packet-back { animation: wg-return 5.4s linear infinite both; }
    @keyframes wg-send {
      0%,8% { opacity: 0; transform: translate(0,0); }
      10% { opacity: 1; }
      42% { opacity: 1; }
      47%,100% { opacity: 0; transform: translate(144.9px,82.8px); }
    }
    @keyframes wg-return {
      0%,51% { opacity: 0; transform: translate(0,0); }
      55% { opacity: 1; }
      88% { opacity: 1; }
      94%,100% { opacity: 0; transform: translate(-144.9px,-82.8px); }
    }
    @media (prefers-reduced-motion: reduce) { .wg-scene .art-motion { animation: none; opacity: 0; } }
  </style>
  <g stroke="#263642" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M390.5,261L535.4,343.8" stroke="#fff8df" stroke-width="10" fill="none"/>
    <path d="M390.5,261L535.4,343.8" stroke="#a66831" stroke-width="3.2" fill="none"/>
    <polygon points="482,313.29 467.25,311.2 472.7,301.66" fill="#a66831" stroke="none"/>
    <g transform="translate(390.5 261)"><circle class="art-motion wg-packet-out" r="5" fill="#a66831" stroke="#fff9e9" stroke-width="1.9"/></g>
    <path d="M453.5,393L308.6,310.2" stroke="#fff8df" stroke-width="10" fill="none"/>
    <path d="M453.5,393L308.6,310.2" stroke="#367b71" stroke-width="3.2" fill="none"/>
    <polygon points="308.6,310.2 320.43,311.66 315.87,319.65" fill="#367b71" stroke="none"/>
    <g transform="translate(453.5 393)"><circle class="art-motion wg-packet-back" r="5" fill="#367b71" stroke="#fff9e9" stroke-width="1.9"/></g>
    <polygon points="252.32,198.68 378.32,270.68 294.32,318.68 168.32,246.68" fill="#554933" stroke="none" opacity=".22" filter="url(#wg-shadow)"/><polygon points="380,245 296,293 296,303 380,255" fill="#b8ae95" /><polygon points="170,221 296,293 296,303 170,231" fill="#d6ccb3" /><polygon points="254,173 380,245 296,293 170,221" fill="url(#wg-cream)" /><polyline points="255.26,177.56 372.44,244.52" fill="none" stroke="#fffdf4" stroke-width="1.2" opacity=".82"/><polyline points="252.32,177.8 177.56,220.52" fill="none" stroke="#fffdf4" stroke-width="1.2" opacity=".82"/>
    <polygon points="546.32,366.68 630.32,414.68 546.32,462.68 462.32,414.68" fill="#554933" stroke="none" opacity=".22" filter="url(#wg-shadow)"/><polygon points="632,389 548,437 548,447 632,399" fill="#b8ae95" /><polygon points="464,389 548,437 548,447 464,399" fill="#d6ccb3" /><polygon points="548,341 632,389 548,437 464,389" fill="url(#wg-sage)" /><polyline points="549.26,345.56 624.44,388.52" fill="none" stroke="#fffdf4" stroke-width="1.2" opacity=".82"/><polyline points="546.32,345.8 471.56,388.52" fill="none" stroke="#fffdf4" stroke-width="1.2" opacity=".82"/>
    <polygon points="243.92,193.64 343.46,250.52 292.22,279.8 192.68,222.92" fill="#4c493c" stroke="none" opacity=".12" filter="url(#wg-contact)"/>
<polygon points="335.48,248.56 292.22,273.28 292.22,280.28 335.48,255.56" fill="#a8a286" /><polygon points="197.72,219.28 292.22,273.28 292.22,280.28 197.72,226.28" fill="#ccc5aa" /><polygon points="240.98,194.56 335.48,248.56 292.22,273.28 197.72,219.28" fill="#f9f2dd" />
<polygon points="235.94,205.76 314.9,250.88 297.26,260.96 218.3,215.84" fill="#dfe7d2" stroke-width="1.1" stroke="#879582"/>
<polyline points="235.94,209.4 307.76,250.44" fill="none" stroke="#82927e" stroke-width="1.18"/>
<polyline points="230.48,212.52 302.3,253.56" fill="none" stroke="#82927e" stroke-width="1.18"/>
<polyline points="225.02,215.64 296.84,256.68" fill="none" stroke="#82927e" stroke-width="1.18"/>
<polygon points="243.92,232.4 271.22,248 263.66,252.32 236.36,236.72" fill="#fdf8eb" stroke-width="1" stroke="#a6ab95"/>
<polygon points="334.22,177.28 322.88,183.76 322.88,256.76 334.22,250.28" fill="#9da087" /><polygon points="228.38,129.76 322.88,183.76 322.88,256.76 228.38,202.76" fill="url(#wg-browser-frame)" /><polygon points="239.72,123.28 334.22,177.28 322.88,183.76 228.38,129.76" fill="#f8f0d9" />
<polygon points="232.96,139.42 318.22,188.14 318.22,247.14 232.96,198.42" fill="#2c414c" stroke-width="1.55"/>
<polygon points="235.39,145.91 315.61,191.75 315.61,240.75 235.39,194.91" fill="#f7f7ea" stroke="none"/>
<polygon points="235.35,145.94 315.57,191.78 315.57,200.78 235.35,154.94" fill="#dce7d5" stroke="none"/>
<ellipse cx="239.51" cy="152.76" rx="1.65" ry="1.68" fill="#c89565" stroke="none"/>
<ellipse cx="244.13" cy="155.4" rx="1.65" ry="1.68" fill="#c8b266" stroke="none"/>
<ellipse cx="248.75" cy="158.04" rx="1.65" ry="1.68" fill="#84a88f" stroke="none"/>
<polygon points="256.31,160.46 304.61,188.06 304.61,191.56 256.31,163.96" fill="#f8faef" stroke="none"/>
<polygon points="243.71,165.76 308.39,202.72 308.39,230.72 243.71,193.76" fill="url(#wg-browser-card)" stroke="#a8b89c" stroke-width="1"/>
<polyline points="252.4,178.87 278.44,193.75" fill="none" stroke="#5c7866" stroke-width="2.3"/>
<polyline points="252.4,185.87 298.18,212.03" fill="none" stroke="#94a990" stroke-width="1.75"/>
<polygon points="252.82,191.11 277.18,205.03 277.18,209.63 252.82,195.71" fill="#7b9e86" stroke="none"/>
    <polygon points="545.9,350.36 616.04,390.44 547.16,429.8 477.02,389.72" fill="#384735" stroke="none" opacity=".23" filter="url(#wg-contact)"/>
<polygon points="613.52,383.52 549.26,420.24 549.26,425.24 613.52,388.52" fill="#788b7f" /><polygon points="483.74,382.8 549.26,420.24 549.26,425.24 483.74,387.8" fill="#90a497" /><polygon points="548,346.08 613.52,383.52 549.26,420.24 483.74,382.8" fill="#d8e4d0" />
<polygon points="604.28,291.52 549.26,322.96 549.26,414.96 604.28,383.52" fill="url(#wg-server-side)" /><polygon points="492.98,290.8 549.26,322.96 549.26,414.96 492.98,382.8" fill="url(#wg-server-front)" /><polygon points="548,259.36 604.28,291.52 549.26,322.96 492.98,290.8" fill="url(#wg-server-top)" />
<polygon points="548,264.44 595.04,291.32 549.26,317.48 502.22,290.6" fill="#e7ead7" stroke="#9aa89a" stroke-width="1"/>
<polyline points="548.42,270.8 581.18,289.52" fill="none" stroke="#657b6e" stroke-width="1.55" opacity=".75"/>
<polyline points="543.38,273.68 576.14,292.4" fill="none" stroke="#657b6e" stroke-width="1.55" opacity=".75"/>
<polyline points="538.34,276.56 571.1,295.28" fill="none" stroke="#657b6e" stroke-width="1.55" opacity=".75"/>
<polyline points="533.3,279.44 566.06,298.16" fill="none" stroke="#657b6e" stroke-width="1.55" opacity=".75"/>
<polyline points="528.26,282.32 561.02,301.04" fill="none" stroke="#657b6e" stroke-width="1.55" opacity=".75"/>
<polygon points="499.2,360.45 542.04,384.93 542.04,405.93 499.2,381.45" fill="#374e55" stroke="#394c4d" stroke-width="1.25"/><polyline points="503.9,370.52 521.54,380.6" fill="none" stroke="#a5b7ae" stroke-width="2"/><polyline points="503.9,376.52 521.54,386.6" fill="none" stroke="#758e87" stroke-width="1.3"/><ellipse cx="534.14" cy="388.8" rx="2.35" ry="2.25" fill="#9fbc98" stroke="none"/><ellipse cx="534.14" cy="395.8" rx="1.25" ry="1.25" fill="#8eac9e" stroke="none"/>
<polygon points="499.2,333.45 542.04,357.93 542.04,378.93 499.2,354.45" fill="#374e55" stroke="#394c4d" stroke-width="1.25"/><polyline points="503.9,343.52 521.54,353.6" fill="none" stroke="#a5b7ae" stroke-width="2"/><polyline points="503.9,349.52 521.54,359.6" fill="none" stroke="#758e87" stroke-width="1.3"/><ellipse cx="534.14" cy="361.8" rx="2.35" ry="2.25" fill="#9fbc98" stroke="none"/><ellipse cx="534.14" cy="368.8" rx="1.25" ry="1.25" fill="#8eac9e" stroke="none"/>
<polygon points="499.2,306.45 542.04,330.93 542.04,351.93 499.2,327.45" fill="#374e55" stroke="#394c4d" stroke-width="1.25"/><polyline points="503.9,316.52 521.54,326.6" fill="none" stroke="#a5b7ae" stroke-width="2"/><polyline points="503.9,322.52 521.54,332.6" fill="none" stroke="#758e87" stroke-width="1.3"/><ellipse cx="534.14" cy="334.8" rx="2.35" ry="2.25" fill="#deb664" stroke="none"/><ellipse cx="534.14" cy="341.8" rx="1.25" ry="1.25" fill="#8eac9e" stroke="none"/>
<polyline points="594.2,367.28 561.44,386" fill="none" stroke="#697d75" stroke-width="1.8" opacity=".73"/>
<polyline points="594.2,355.28 561.44,374" fill="none" stroke="#697d75" stroke-width="1.8" opacity=".73"/>
<polyline points="594.2,343.28 561.44,362" fill="none" stroke="#697d75" stroke-width="1.8" opacity=".73"/>
<polyline points="594.2,331.28 561.44,350" fill="none" stroke="#697d75" stroke-width="1.8" opacity=".73"/>
<polyline points="594.2,319.28 561.44,338" fill="none" stroke="#697d75" stroke-width="1.8" opacity=".73"/>
<polyline points="493.4,295.04 549.26,326.96" fill="none" stroke="#e5eee0" stroke-width="1.6"/>
    <g transform="translate(123 145)" stroke="none"><rect x="0" y="0" width="88" height="27" rx="7" fill="#fff9ed" stroke="#c2bb9e" stroke-width="1.1"/><text x="44" y="14.6" text-anchor="middle" dominant-baseline="middle" fill="#26334b" font-family="Pretendard, Malgun Gothic, system-ui, sans-serif" font-size="16" font-weight="650">브라우저</text></g>
    <g transform="translate(580 261)" stroke="none"><rect x="0" y="0" width="72" height="27" rx="7" fill="#fff9ed" stroke="#c2bb9e" stroke-width="1.1"/><text x="36" y="14.6" text-anchor="middle" dominant-baseline="middle" fill="#26334b" font-family="Pretendard, Malgun Gothic, system-ui, sans-serif" font-size="16" font-weight="650">서버</text></g>
    <g transform="translate(408 239)" stroke="none"><rect x="0" y="0" width="64" height="27" rx="7" fill="#fcf2d8" stroke="#c2bb9e" stroke-width="1.1"/><text x="32" y="14.6" text-anchor="middle" dominant-baseline="middle" fill="#75451d" font-family="Pretendard, Malgun Gothic, system-ui, sans-serif" font-size="16" font-weight="650">요청</text></g>
    <g transform="translate(352 380)" stroke="none"><rect x="0" y="0" width="64" height="27" rx="7" fill="#e9f2e4" stroke="#c2bb9e" stroke-width="1.1"/><text x="32" y="14.6" text-anchor="middle" dominant-baseline="middle" fill="#315d5c" font-family="Pretendard, Malgun Gothic, system-ui, sans-serif" font-size="16" font-weight="650">응답</text></g>
  </g>
</svg>`;
