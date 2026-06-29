// NAV SCROLL
const nav = document.querySelector('.nav');
window.addEventListener('scroll', function() {
  nav.style.background = window.scrollY > 50 ? 'rgba(10,10,20,0.9)' : 'rgba(10,10,20,0.75)';
});

// HAMBURGER
(function() {
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const mobileHireBtn = document.getElementById('mobileHireBtn');

  function isSmall() { return window.innerWidth <= 760; }

  function syncMobileBtn() {
    if (mobileHireBtn) mobileHireBtn.style.display = isSmall() ? 'inline-flex' : 'none';
  }
  syncMobileBtn();
  window.addEventListener('resize', syncMobileBtn);

  burger.addEventListener('click', function() {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();
