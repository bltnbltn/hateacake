// Search Bar--------------------------------------- //

// 검색 아이콘을 클릭했을 때 활성화/비활성화 상태를 토글하는 함수
document
  .querySelector('.search-icon')
  .addEventListener('click', function (event) {
    // 기본 동작 중지
    event.preventDefault();

    // 검색 바의 활성화/비활성화 상태 토글
    document.querySelector('.search-bar').classList.toggle('active');
  });

// Hamburger Menu--------------------------------------- //

// 네비게이션 메뉴 토글 버튼, 메뉴, 네비게이션 바, 추가 메뉴 선택
const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');
const navbar = document.querySelector('.navbar');
const additionalMenu = document.querySelector('.additional-menu');

// 토글 버튼 클릭 시 메뉴를 토글하고 네비게이션 바 위치를 조정하는 함수
toggleBtn.addEventListener('click', handleMenuToggle);

function handleMenuToggle(e) {
  e.preventDefault();
  const isActive = menu.classList.toggle('active');
}

// Input Stepper--------------------------------------- //

// 수량 카운팅
const decreaseBtn = document.querySelector('.product-detail__decrease-icon');
const increaseBtn = document.querySelector('.product-detail__increase-icon');
const quantityDisplay = document.querySelector('.product-detail__quantity');
const sizeSelect = document.getElementById('size'); // Size 선택 요소를 가져옵니다.
const flavourSelect = document.getElementById('flavour'); // Flavour 선택 요소를 가져옵니다.
const packingSelect = document.getElementById('packing'); // Packing 선택 요소를 가져옵니다.

let quantity = 1;

// 수량 증가 버튼 클릭 시
increaseBtn.addEventListener('click', () => {
  if (isAllOptionsSelected()) {
    quantity++;
    quantityDisplay.textContent = quantity;
  } else {
    alert('Please select all options before increasing quantity.');
  }
});

// 수량 감소 버튼 클릭 시
decreaseBtn.addEventListener('click', () => {
  if (isAllOptionsSelected() && quantity > 1) {
    quantity--;
    quantityDisplay.textContent = quantity;
  } else {
    alert(
      'Please select all options before decreasing quantity or quantity cannot be less than 1.'
    );
  }
});

// 모든 옵션이 선택되었는지 확인하는 함수
function isAllOptionsSelected() {
  return (
    sizeSelect.value !== '' &&
    flavourSelect.value !== '' &&
    packingSelect.value !== ''
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const carouselContainer = document.querySelector('.carousel-container');
  const carousel = carouselContainer.querySelector('.carousel');
  const slideGroups = Array.from(carousel.querySelectorAll('.slide-group'));
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  const dotsNav = document.querySelector('.dot-container');
  const dots = Array.from(dotsNav.children);

  const slideWidth = slideGroups[0].getBoundingClientRect().width;
  let currentSlideIndex = 0;
  function positionSlides(index) {
    const offset = -index * slideWidth;
    carousel.style.transform = `translateX(${offset}px)`;
  }

  function moveToSlide(index) {
    positionSlides(index);
    currentSlideIndex = index;
    updateDots(index);
  }

  function updateDots(index) {
    dots.forEach((dot) => dot.classList.remove('dot--active'));
    dots[index].classList.add('dot--active');
  }

  prevButton.addEventListener('click', function () {
    let newIndex = currentSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = slideGroups.length - 1;
    }
    if (newIndex === 1 && slideGroups.length < 3) {
      return; // 이동하지 않음
    }
    moveToSlide(newIndex);
    // prevButton의 SVG 아이콘 색상 변경
    const prevIcon = prevButton.querySelector('.material-icons');
    if (prevIcon) {
      prevIcon.style.color = '#f1f0f0';
    }

    // nextButton의 SVG 아이콘 색상 변경
    const nextIcon = nextButton.querySelector('.material-icons');
    if (nextIcon) {
      nextIcon.style.color = '#101010';
    }
  });

  nextButton.addEventListener('click', function () {
    let newIndex = currentSlideIndex + 1;
    if (newIndex >= slideGroups.length) {
      newIndex = 1;
    }
    moveToSlide(newIndex);
    // nextButton의 SVG 아이콘 색상 변경
    const nextIcon = nextButton.querySelector('.material-icons');
    if (nextIcon) {
      nextIcon.style.color = '#f1f0f0';
    }

    // prevButton의 SVG 아이콘 색상 변경
    const prevIcon = prevButton.querySelector('.material-icons');
    if (prevIcon) {
      prevIcon.style.color = '#101010';
    }
  });

  // 초기에는 첫 번째 그룹의 이미지가 보이도록 설정
  moveToSlide(0);

  // 처음 그룹의 dot을 활성화
  updateDots(0);
});
