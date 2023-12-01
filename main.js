// Hamburger Menu
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
const navbar = document.querySelector('.navbar');
const nav_menu = document.querySelectorAll('.navbar_menu li');

toggleBtn.addEventListener('click', (e) => {
  // 클릭 했을 때
  e.preventDefault();
  menu.classList.toggle('active');
  if (menu.classList.contains('active')) {
    // document.body.style.overflow = 'hidden'; // 스크롤 방지
  } else {
    // document.body.style.overflow = 'auto'; // 스크롤 가능하도록
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth <= 768) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    console.log('Navbar Height:', navbarHeight);
    document.querySelector('.hero_img').style.marginTop = navbarHeight + 'px';
  } else {
    console.log('Desktop Version');
    document.querySelector('.hero_img').style.marginTop = '0';
  }
});
