const header = document.querySelector('.header');
const btnMobileNav = document.querySelector('.btn-mobile-nav');
const mainNav = document.querySelector('.main-nav');
const sectionHero = document.querySelector('.section-hero');
const logoAnchors = document.querySelectorAll('.logo-anchor');

btnMobileNav.addEventListener('click', function (e) {
  header.classList.toggle('nav-open');
});

mainNav.addEventListener('click', function (e) {
  const link = e.target.closest('.main-nav-link');

  if (!link || !link.getAttribute('href').startsWith('#')) return;

  e.preventDefault();

  const sectionId = link.getAttribute('href').slice(1);
  header.classList.remove('nav-open');

  document
    .querySelector(`#${sectionId}`)
    .scrollIntoView({ behavior: 'smooth' });
});

sectionHero.addEventListener('click', function (e) {
  e.preventDefault();
  const link = e.target.closest('.btn');

  if (!link) return;

  const sectionId = link.getAttribute('href').slice(1);

  document
    .querySelector(`#${sectionId}`)
    .scrollIntoView({ behavior: 'smooth' });
});

logoAnchors.forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});

const sectionHeroObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) document.body.classList.add('sticky-nav');
    else document.body.classList.remove('sticky-nav');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);

sectionHeroObserver.observe(sectionHero);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
