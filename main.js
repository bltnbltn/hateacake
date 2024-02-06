const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');
const navbar = document.querySelector('.navbar');
const additionalMenu = document.querySelector('.additional-menu');

toggleBtn.addEventListener('click', toggleMenu);

function toggleMenu(e) {
  e.preventDefault();
  const isActive = menu.classList.toggle('active');
  [searchIcon, bagIcon].forEach(
    (icon) => (icon.style.display = isActive ? 'none' : 'block')
  );
  navbar.style.position = isActive ? 'absolute' : 'fixed';
  navbar.style.top = isActive ? '0' : '';
}

const mainContent = document.querySelector('.main__hero-img');
const navbarHeight = document.querySelector('.navbar').offsetHeight;

window.addEventListener('DOMContentLoaded', adjustContentPosition);
window.addEventListener('resize', adjustContentPosition);

function adjustContentPosition() {
  mainContent.style.marginTop =
    window.innerWidth <= 768 ? navbarHeight + 'px' : '0';
}
