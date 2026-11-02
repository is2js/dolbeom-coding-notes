const button = document.querySelector('#toggle');
const detail = document.querySelector('#detail');

button.addEventListener('click', () => {
  const isHidden = detail.hidden;
  detail.hidden = !isHidden;
  button.setAttribute('aria-expanded', String(isHidden));
});
