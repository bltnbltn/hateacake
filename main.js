// 검색 아이콘을 클릭했을 때 활성화/비활성화 상태를 토글하는 함수
document.querySelector('.search-icon').addEventListener('click', function () {
  document.querySelector('.search-bar').classList.toggle('active');
});

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
  navbar.style.position = isActive ? 'absolute' : 'fixed';
  navbar.style.top = isActive ? '0' : '';
}

// 초기 로드 시 및 창 크기 조정 시 메인 콘텐츠의 위치 조정
const mainContent = document.querySelector('.top-content');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('DOMContentLoaded', updateContentPosition);
window.addEventListener('resize', updateContentPosition);

function updateContentPosition() {
  mainContent.style.marginTop =
    window.innerWidth <= 768 ? navbarHeight + 'px' : '0';
}

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
