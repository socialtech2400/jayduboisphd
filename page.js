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
