// Hamburger Menu
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
const navbar = document.querySelector('.navbar');
const nav_menu = document.querySelectorAll('.navbar_menu li');

toggleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  menu.classList.toggle('active');
  if (menu.classList.contains('active')) {
    navbar.style.padding = '';
  } else {
    // navbar.style.padding = '14px 0px';
  }
});
