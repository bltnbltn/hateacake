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

// // 네비게이션 바의 높이를 동적으로 계산하여 히어로 이미지에 적용
const navbarHeight = document.querySelector('.navbar').offsetHeight;
document.querySelector('.hero_img').style.marginTop = navbarHeight + 'px';
