function initMap() {
  // 토론토의 위도와 경도
  var toronto = { lat: 43.65107, lng: -79.347015 };

  // 맵의 스타일을 정의합니다.
  var mapStyles = [
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#C7E1FF', // 연한 하늘색으로 바다 색상 변경
        },
      ],
    },
  ];

  // 새로운 지도 객체를 생성합니다.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: toronto, // 토론토를 중심으로 설정
    zoom: 12, // 확대 수준 설정
    styles: mapStyles, // 스타일 적용
  });

  // 마커를 추가합니다.
  var marker = new google.maps.Marker({
    position: toronto,
    map: map,
    title: 'toronto',
  });

  // 말풍선을 추가합니다.
  var infowindow = new google.maps.InfoWindow({
    content: 'HATE A CAKE', // 말풍선에 표시할 내용
    closeButton: false, // 닫기 아이콘을 표시하지 않음
  });

  // 말풍선을 마커 위에 표시합니다.
  infowindow.open(map, marker);
}

// 페이지가 로드될 때 initMap() 함수를 호출합니다.
google.maps.event.addDomListener(window, 'load', initMap);
