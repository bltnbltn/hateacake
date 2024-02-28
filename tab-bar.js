// Tab Bar--------------------------------------------- //

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // 탭 내용을 모두 숨김
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // 탭 버튼을 모두 초기화
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }

  // 클릭된 탭에 해당하는 내용을 표시
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');

  // 해당 카테고리에 속하는 제품들만 표시하고 갯수를 업데이트
  updateItemImageCount(tabName.toLowerCase());
}

function updateItemImageCount(category) {
  const itemQuantity = document.querySelector('.item-quantity');
  let productItems;

  // 모든 제품 숨기기
  const allProductItems = document.querySelectorAll('.product-item__item');
  allProductItems.forEach((item) => {
    item.style.display = 'none';
  });

  // 해당 카테고리에 속하는 제품만 표시하고 갯수를 업데이트
  if (category === 'all') {
    productItems = allProductItems;
  } else {
    productItems = document.querySelectorAll(
      '.product-item__item[data-category="' + category + '"]'
    );
  }

  productItems.forEach((item) => {
    item.style.display = 'block';
  });

  // 아이템 갯수 업데이트
  itemQuantity.textContent = productItems.length + ' items';

  // 이미지 나타내기
  const productImages = document.querySelectorAll('.product-item__item img');
  productImages.forEach((image) => {
    image.style.display = 'none'; // 모든 이미지 숨기기
  });

  productItems.forEach((item) => {
    const image = item.querySelector('img');
    image.style.display = 'block'; // 해당 카테고리에 속하는 이미지만 나타내기
  });
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById('all-tab').click(); // "All" 탭 클릭 이벤트 발생
});
