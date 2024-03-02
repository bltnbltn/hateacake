// Hero Carousel
document.addEventListener('DOMContentLoaded', function () {
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
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

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // 3초마다 다음 슬라이드 보여주기
  setInterval(nextSlide, 3000);

  // 슬라이드 막대 업데이트
  function updateSliderBar() {
    const percent =
      ((currentIndex + 1) / totalSlides) * 100 * (3 / totalSlides);
    sliderBar.style.width = `${percent}%`;
  }

  // 터치 시작 이벤트
  document.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
  });

  document.addEventListener('touchmove', function (event) {
    event.preventDefault(); // 세로 스크롤 방지
  });

  // 터치 종료 이벤트
  document.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].clientX;
    handleGesture();
  });

  // 손가락 제스처에 따라 슬라이드 처리
  function handleGesture() {
    if (touchStartX - touchEndX > 50) {
      nextSlide(); // 왼쪽으로 슬라이드
    } else if (touchEndX - touchStartX > 50) {
      prevSlide(); // 오른쪽으로 슬라이드
    }
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
  let touchStartX = 0;
  let touchEndX = 0;

  function positionSlides(index) {
    const offset = -index * slideWidth * 1;
    carousel.style.transform = `translateX(${offset}px)`;
    carousel.style.transition = 'transform 0.5s ease'; // 부드러운 트랜지션 추가
  }

  function moveToSlide(index) {
    positionSlides(index);
    currentSlideIndex = index;
    updateDots(index);
    updateButtonColors();
  }

  function updateDots(index) {
    dots.forEach((dot) => dot.classList.remove('dot--active'));
    dots[index].classList.add('dot--active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      moveToSlide(index);
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
  });

  // nextButton 클릭시
  nextButton.addEventListener('click', function () {
    let newIndex = currentSlideIndex + 1;
    if (newIndex >= slideGroups.length) {
      newIndex = 1;
    }
    moveToSlide(newIndex);
  });

  // 초기에는 첫 번째 그룹의 이미지가 보이도록 설정
  moveToSlide(0);

  // 슬라이드 제스쳐
  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', function (e) {
    // 세로 스크롤 방지
    e.preventDefault();
  });

  carousel.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleGesture();
  });

  function updateButtonColors() {
    const prevIcon = prevButton.querySelector('.material-icons');
    const nextIcon = nextButton.querySelector('.material-icons');
    if (prevIcon && nextIcon) {
      prevIcon.style.color = currentSlideIndex === 0 ? '#f1f0f0' : '#101010';
      nextIcon.style.color =
        currentSlideIndex === slideGroups.length - 1 ? '#101010' : '#f1f0f0';
    }
  }

  function handleGesture() {
    const swipeLength = touchStartX - touchEndX;
    const threshold = Math.abs(carousel.getBoundingClientRect().width * 0.2); // 제스처 감지를 위한 최소 이동 거리

    if (Math.abs(swipeLength) > threshold) {
      if (swipeLength < 0) {
        // 오른쪽으로 슬라이드 (prevButton 클릭과 동일)
        let newIndex = currentSlideIndex - 1;
        if (newIndex < 0) {
          newIndex = slideGroups.length - 1;
        }
        if (newIndex === 1 && slideGroups.length < 3) {
          return; // 이동하지 않음
        }
        moveToSlide(newIndex);
      } else {
        // 왼쪽으로 슬라이드 (nextButton 클릭과 동일)
        let newIndex = currentSlideIndex + 1;
        if (newIndex >= slideGroups.length) {
          newIndex = 1;
        }
        moveToSlide(newIndex);
      }
    }
  }
});
