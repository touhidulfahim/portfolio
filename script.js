const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const yearEl = document.querySelector('#year');

yearEl.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('section[id]');
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        navItems.forEach((link) => link.classList.remove('active'));
        activeLink?.classList.add('active');
      }
    });
  },
  { rootMargin: '-35% 0px -55% 0px' }
);

sections.forEach((section) => activeObserver.observe(section));
