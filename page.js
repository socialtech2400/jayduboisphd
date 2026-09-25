(() => {
  'use strict';
  const button = document.getElementById('theme-button');
  if (!button) return;
  button.hidden = false;
  const setTheme = dark => {
    document.documentElement.classList.toggle('dark', dark);
    button.setAttribute('aria-pressed', String(dark));
    button.textContent = dark ? 'Light appearance' : 'Dark appearance';
  };
  let saved;
  try { saved = localStorage.getItem('jay-v3-theme'); } catch {}
  setTheme(saved === 'dark');
  button.addEventListener('click', () => {
    const dark = !document.documentElement.classList.contains('dark');
    setTheme(dark);
    try { localStorage.setItem('jay-v3-theme', dark ? 'dark' : 'light'); } catch {}
  });
})();

(() => {
  'use strict';
  const slideshow = document.querySelector('[data-heart-slideshow]');
  if (!slideshow) return;
  const slides = [...slideshow.querySelectorAll('[data-heart-slide]')];
  const controls = slideshow.querySelector('[data-heart-controls]');
  const status = slideshow.querySelector('.heart-slide-status');
  const selectors = [...slideshow.querySelectorAll('[data-heart-slide-to]')];
  if (slides.length < 2 || !controls || !status || selectors.length !== slides.length) return;
  let current = 0;
  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
    selectors.forEach((selector, selectorIndex) => {
      if (selectorIndex === current) selector.setAttribute('aria-current', 'true');
      else selector.removeAttribute('aria-current');
    });
    status.textContent = `Photo ${current + 1} of ${slides.length}`;
  };
  controls.hidden = false;
  selectors.forEach(selector => selector.addEventListener('click', () => showSlide(Number(selector.dataset.heartSlideTo))));
})();
