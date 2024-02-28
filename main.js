// Search Bar--------------------------------------- //

// 검색 아이콘을 클릭했을 때 활성화/비활성화 상태를 토글하는 함수
let searchBarVisible = false;

function toggleLogoVisibility() {
  if (window.innerWidth <= 767 && searchBarVisible) {
    document.querySelector('.navbar__logo').style.visibility = 'hidden';
  } else {
    document.querySelector('.navbar__logo').style.visibility = 'visible';
  }
}

document
  .querySelector('.search-icon')
  .addEventListener('click', function (event) {
    event.preventDefault();
    const searchBar = document.querySelector('.search-bar');
    searchBar.classList.toggle('active');
    searchBarVisible = !searchBarVisible;
    toggleLogoVisibility(); // 아이콘 클릭시 로고 가시성 변경
  });

window.addEventListener('resize', function () {
  toggleLogoVisibility(); // 창 크기 변경시 로고 가시성 변경
});

// 검색 clear 기능
document.getElementById('clear-icon').addEventListener('click', function () {
  document.getElementById('search-input').value = ''; // 검색 입력 필드 내용 지우기
});
const searchInput = document.getElementById('search-input');
const clearIcon = document.getElementById('clear-icon');

searchInput.addEventListener('input', function () {
  if (this.value.length > 0) {
    clearIcon.style.display = 'block'; // 입력 내용이 있는 경우 아이콘을 보이도록 설정
  } else {
    clearIcon.style.display = 'none'; // 입력 내용이 없는 경우 아이콘을 숨김
  }
});

clearIcon.addEventListener('click', function () {
  searchInput.value = ''; // 검색 입력 필드 내용 지우기
  clearIcon.style.display = 'none'; // 아이콘 숨기기
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

// Add to Cart----------------------------------------- //
// Add to Cart 버튼 요소를 가져옵니다.
const addToCartButton = document.querySelector('.product-detail__bag');

// 장바구니 아이콘 요소를 가져옵니다.
const cartIcon = document.querySelector('.bag-icon');

// 장바구니 아이템 수를 저장할 변수를 초기화합니다.
let cartItemCount = 0;

// Add to Cart 버튼에 클릭 이벤트 리스너를 추가합니다.
addToCartButton.addEventListener('click', function (event) {
  event.preventDefault(); // 기본 동작을 막습니다. (페이지 이동 등)

  // 모든 옵션을 선택했는지 확인합니다.
  const selectedSize = document.getElementById('size').value;
  const selectedFlavour = document.getElementById('flavour').value;
  const selectedPacking = document.getElementById('packing').value;
  const selectedDate = document.getElementById('date').value;

  if (!selectedSize || !selectedFlavour || !selectedPacking || !selectedDate) {
    alert('Please select all options.');
    return; // 함수를 종료합니다.
  }

  // 선택된 수량을 가져옵니다.
  const selectedQuantity = parseInt(
    document.querySelector('.product-detail__quantity').textContent
  );

  // 장바구니 아이콘에 숫자 뱃지를 표시합니다.
  cartItemCount += selectedQuantity;
  cartIcon.innerHTML = `<a href="#"><img src="../icon/bag.svg" alt="Bag icon"></a><span class="cart-badge">${cartItemCount}</span>`;

  // 장바구니에 추가하는 로직을 구현합니다.
  // 이 부분은 실제로 장바구니에 추가하는 로직으로 변경해야 합니다.
  // 예를 들어, localStorage에 추가하는 등의 방식으로 구현할 수 있습니다.

  // 장바구니에 상품을 추가한 후, 사용자에게 성공적으로 추가되었음을 알리는 등의 메시지를 보여줄 수 있습니다.
  alert(`${selectedQuantity} item has been added to the cart`);
});

// // 장바구니 아이콘 클릭 시 장바구니에 담은 아이템을 보여주는 로직을 구현합니다.
// cartIcon.addEventListener('click', function () {
//   // 장바구니에 담은 아이템을 보여주는 로직을 구현합니다.
//   // 이 부분은 실제로 장바구니 아이템을 보여주는 UI를 구현해야 합니다.
//   // 예를 들어, 모달 창이나 새로운 페이지에 장바구니 아이템을 나타내는 내용을 표시할 수 있습니다.
//   alert('장바구니 아이템을 보여줍니다.');
// });

// Input Stepper--------------------------------------- //

// 수량 카운팅
const decreaseBtn = document.querySelector('.product-detail__decrease-icon');
const increaseBtn = document.querySelector('.product-detail__increase-icon');
const quantityDisplay = document.querySelector('.product-detail__quantity');
const sizeSelect = document.getElementById('size'); // Size 선택 요소를 가져옵니다.
const flavourSelect = document.getElementById('flavour'); // Flavour 선택 요소를 가져옵니다.
const packingSelect = document.getElementById('packing'); // Packing 선택 요소를 가져옵니다.
const dateSelect = document.getElementById('date'); // Date 선택 요소를 가져옵니다.

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
  decreaseBtn.style.color =
    quantity > 1 ? 'var(--text-color)' : 'var(--border1-color)';
}

// 모든 옵션이 선택되었는지 확인하는 함수
function isAllOptionsSelected() {
  return (
    sizeSelect.value !== '' &&
    flavourSelect.value !== '' &&
    packingSelect.value !== '' &&
    dateSelect.value !== '' // Date 선택 여부도 확인
  );
}

// Size Price Option--------------------------------------- //

// 가격을 표시하는 요소
const priceElement = document.querySelector('.product-detail__price');

// 사이즈 선택 요소
const sizeSelectPrice = document.getElementById('size'); // sizeSelect와 중복되지 않도록 수정

// 가격 설정
let basePrice = 45.0;
let priceIncrement = 5.0; // 각 사이즈에 대한 추가 금액

// 사이즈가 변경될 때마다 호출되는 함수
sizeSelectPrice.addEventListener('change', function () {
  // 선택된 사이즈 가져오기
  const selectedSize = sizeSelectPrice.value;

  // 사이즈에 따른 가격 설정
  switch (selectedSize) {
    case 'Small':
      priceElement.textContent = '$' + basePrice.toFixed(2);
      break;
    case 'Medium':
      priceElement.textContent = '$' + (basePrice + priceIncrement).toFixed(2);
      break;
    case 'Large':
      priceElement.textContent =
        '$' + (basePrice + 2 * priceIncrement).toFixed(2);
      break;
    default:
      priceElement.textContent = '$' + basePrice.toFixed(2);
  }
});
