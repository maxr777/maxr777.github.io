(function() {
  const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupEmailProtection();
  setupReadingProgress();
  setupLightbox();
});

function setupTheme() {
  const header = document.querySelector('header');
  if (!header) return;

  const toggle = document.createElement('div');
  toggle.id = 'theme-toggle';
  toggle.setAttribute('aria-label', 'Toggle theme');
  
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  
  const updateToggleIcon = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.innerHTML = isDark ? sunIcon : moonIcon;
  };
  
  updateToggleIcon();
  header.appendChild(toggle);

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
  });
}

function setupLightbox() {
  const images = document.querySelectorAll('main img');
  if (images.length === 0) return;

  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  images.forEach(img => {
    img.addEventListener('click', () => {
      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
      lightbox.appendChild(fullImg);
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

function setupEmailProtection() {
  const emailLink = document.getElementById('email-link');
  if (!emailLink) return;

  const user = 'website';
  const domain = 'maxr.dev';
  const email = user + '@' + domain;

  emailLink.addEventListener('click', (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(email).then(() => {
        const originalText = emailLink.textContent;
        emailLink.textContent = 'COPIED';
        emailLink.classList.add('copied');

        setTimeout(() => {
          emailLink.textContent = originalText;
          emailLink.classList.remove('copied');
        }, 1500);
      });
  });
}

function setupReadingProgress() {
  const bar = document.createElement('div');
  bar.id = 'progress-bar';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (winScroll > 50) {
      bar.style.width = scrolled + "%";
      bar.style.opacity = "1";
    } else {
      bar.style.opacity = "0";
    }
  });
}
