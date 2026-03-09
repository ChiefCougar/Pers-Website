document.addEventListener('DOMContentLoaded', () => {
  // Matrix Rain Canvas
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const charArray = chars.split('');
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const rows = Math.ceil(canvas.height / fontSize);
  const drops = Array(Math.floor(columns)).fill(0).map(() => Math.random() * rows);
  
  // Trail system for fading characters
  const trails = [];
  const TRAIL_DURATION = 10000; // 10 seconds in milliseconds

  function drawMatrix() {
    // Clear canvas completely for fresh start
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();

    // Draw trails with fading effect
    trails.forEach((trail, index) => {
      const age = currentTime - trail.timestamp;
      const opacity = Math.max(0, 1 - (age / TRAIL_DURATION));
      
      if (opacity <= 0) {
        trails.splice(index, 1);
        return;
      }

      ctx.fillStyle = `rgba(255, 59, 214, ${opacity * 0.8})`;
      ctx.font = `${fontSize}px monospace`;
      ctx.globalAlpha = opacity;
      ctx.fillText(trail.char, trail.x, trail.y);
    });

    // Reset global alpha for new characters
    ctx.globalAlpha = 1;

    // Draw new falling characters and add to trails
    ctx.fillStyle = '#ff3bd6';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      ctx.fillText(char, x, y);
      
      // Add to trails
      trails.push({
        char: char,
        x: x,
        y: y,
        timestamp: currentTime
      });

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
        drops[i] = 0;
      }
      drops[i] += 0.22;
    }
  }

  function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
  }

  animateMatrix();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Close menu when link clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .project-card, .skill-card, .about-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
