const firstLine = Array.from('AI와 함께 만들기 전에,');
const secondLine = Array.from('기본부터 차근차근.');

// The visual copy is decorative; the complete heading is exposed separately.
export function introTypewriter() {
  return {
    first: '',
    second: '',
    secondStarted: false,
    timer: null,
    motion: null,
    onMotionChange: null,
    init() {
      this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.onMotionChange = (event) => { if (event.matches) this.finish(); };
      this.motion.addEventListener('change', this.onMotionChange);
      if (this.motion.matches) this.finish();
      else this.typeNext(0);
    },
    typeNext(index) {
      if (index < firstLine.length) {
        this.first += firstLine[index];
      } else if (index < firstLine.length + secondLine.length) {
        this.secondStarted = true;
        this.second += secondLine[index - firstLine.length];
      } else {
        this.timer = null;
        return;
      }
      this.timer = window.setTimeout(() => this.typeNext(index + 1), 75);
    },
    finish() {
      window.clearTimeout(this.timer);
      this.timer = null;
      this.first = firstLine.join('');
      this.second = secondLine.join('');
      this.secondStarted = true;
    },
    destroy() {
      window.clearTimeout(this.timer);
      this.motion?.removeEventListener('change', this.onMotionChange);
    },
  };
}
