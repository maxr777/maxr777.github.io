document.addEventListener('DOMContentLoaded', () => {
  setupEmailProtection();
  setupReadingProgress();
  setupLightbox();
});

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
