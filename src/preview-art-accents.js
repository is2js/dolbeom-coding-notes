// These details are revealed by the opt-in preview styles. Presentation
// attributes keep the original artwork intact when an SVG is read on its own.
export function previewFocus(x, y, width, height, tone = 'inspect', delay = 0) {
  const right = x + width;
  const bottom = y + height;
  const arm = Math.min(12, height / 3);
  const corners = [
    `M${x} ${y + arm}v-${arm}h${arm}`,
    `M${right - arm} ${y}h${arm}v${arm}`,
    `M${right} ${bottom - arm}v${arm}h-${arm}`,
    `M${x + arm} ${bottom}h-${arm}v-${arm}`,
  ].join('');
  return `<path display="none" fill="none" stroke-linecap="round" stroke-linejoin="round" d="${corners}" class="art-motion preview-art-detail preview-art-focus" data-tone="${tone}" style="--preview-art-delay:${delay}s"/>`;
}

export function previewSignal(x, y, radius, tone = 'inspect', delay = 0) {
  return `<circle display="none" fill="none" cx="${x}" cy="${y}" r="${radius}" class="art-motion preview-art-detail preview-art-signal" data-tone="${tone}" style="--preview-art-delay:${delay}s"/>`;
}
