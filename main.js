// Search Bar--------------------------------------- //

// 검색 아이콘을 클릭했을 때 활성화/비활성화 상태를 토글하는 함수
document
  .querySelector('.search-icon')
  .addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.search-bar').classList.toggle('active');
  });

// Hamburger Menu--------------------------------------- //

// 네비게이션 메뉴 토글 버튼, 메뉴, 네비게이션 바, 추가 메뉴 선택
const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');

// 토글 버튼 클릭 시 메뉴를 토글하고 네비게이션 바 위치를 조정하는 함수

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  menu.classList.toggle('active');
});

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
increaseBtn.addEventListener('click', () => updateQuantity(1));
decreaseBtn.addEventListener('click', () => updateQuantity(-1));

function updateQuantity(change) {
  if (!isAllOptionsSelected()) {
    alert('Please select all options before updating quantity.');
    return;
  }

  quantity += change;
  quantity = Math.max(1, quantity); // quantity가 1보다 작아지지 않도록 보장
  quantityDisplay.textContent = quantity;
}

// 모든 옵션이 선택되었는지 확인하는 함수
function isAllOptionsSelected() {
  return (
    sizeSelect.value !== '' &&
    flavourSelect.value !== '' &&
    packingSelect.value !== ''
  );
}

// Carousel--------------------------------------- //

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

  // 미디어 쿼리 매치 상태 확인 함수
  function checkMediaQuery() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  // 모바일 화면인 경우 translateX() 값을 동적으로 조정하는 함수
  function adjustTranslateX() {
    const slideWidth = slideGroups[0].getBoundingClientRect().width;
    const offset = checkMediaQuery() ? slideWidth : 740; // 모바일인 경우 slideWidth로 설정, 아닌 경우 729로 설정
    const secondSlideGroup = document.querySelector('.second-slide-group');
    secondSlideGroup.style.transform = `translateX(${offset}px)`;
  }

  // 페이지 로드 시 초기화 함수 호출
  window.addEventListener('load', function () {
    adjustTranslateX();
  });

  // 윈도우 리사이즈 시 translateX() 값을 조정하는 이벤트 리스너 추가
  window.addEventListener('resize', function () {
    // 현재 슬라이드의 인덱스를 기억합니다.
    const currentIndex = currentSlideIndex;

    // 슬라이드의 너비를 다시 계산합니다.
    const newSlideWidth = slideGroups[0].getBoundingClientRect().width;

    // 슬라이드의 너비가 변경되었을 때만 현재 슬라이드의 위치를 조정합니다.
    if (newSlideWidth !== slideWidth) {
      slideWidth = newSlideWidth;
      positionSlides(currentIndex);
      adjustTranslateX(); // adjustTranslateX() 함수를 호출하여 두 번째 슬라이드 그룹도 조정합니다.
    }
  });

  function updateDots(index) {
    dots.forEach((dot) => dot.classList.remove('dot--active'));
    dots[index].classList.add('dot--active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      moveToSlide(index);

      // prevButton의 SVG 아이콘 색상 변경
      const prevIcon = prevButton.querySelector('.material-icons');
      if (prevIcon) {
        prevIcon.style.color = index === 0 ? '#f1f0f0' : '#101010';
      }

      // nextButton의 SVG 아이콘 색상 변경
      const nextIcon = nextButton.querySelector('.material-icons');
      if (nextIcon) {
        nextIcon.style.color =
          index === dots.length - 1 ? '#f1f0f0' : '#101010';
      }
    });
  });

  // PrevButton 클릭시
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

  // nextButton 클릭시

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
