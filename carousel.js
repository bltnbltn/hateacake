// Hero Carousel--------------------------------------------- //

document.addEventListener('DOMContentLoaded', function () {
  let currentIndex = 0;
  const slides = document.querySelectorAll('.auto-slide');
  const totalSlides = slides.length;
  const sliderBar = document.querySelector('.slider-bar');
  function showSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }

    const offset = -index * 100;
    document.querySelector(
      '.auto-slider-container'
    ).style.transform = `translateX(${offset}%)`;
    currentIndex = index;
    updateSliderBar();
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // 3초마다 다음 슬라이드 보여주기
  setInterval(nextSlide, 3000);

  // 슬라이드 막대 업데이트
  function updateSliderBar() {
    const percent =
      ((currentIndex + 1) / totalSlides) * 100 * (3 / totalSlides); // 모바일 사이즈에서는 3분의 1 비율로 조정
    sliderBar.style.width = `${percent}%`;
  }
});

// Related Item Carousel--------------------------------------- //

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
    const offset = -index * slideWidth * 1;
    carousel.style.transform = `translateX(${offset}px)`;
    carousel.style.transition = 'transform 0.5s ease'; // 부드러운 트랜지션 추가
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
