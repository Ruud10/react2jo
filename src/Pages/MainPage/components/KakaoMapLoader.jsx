import React, { useEffect } from 'react';
const { kakao } = window;

const KakaoMapLoader = () => {
    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    // setLocation({ lat: lat, lon: lon });

                    loadKakaoMap(lat, lon);

                    console.log('현재 위치: ', lat, lon);
                },
                (error) => {
                    // 위치 정보를 가져오지 못한 경우 기본 위치를 설정하여 지도를 로드합니다.
                    const defaultLat = 37.5665; // 서울의 위도
                    const defaultLon = 126.978; // 서울의 경도
                    loadKakaoMap(defaultLat, defaultLon);
                    console.error('Error getting current location:', error);
                }
            );
        };

        const loadKakaoMap = async (lat, lon) => {
            kakao.maps.load(() => {
                var container = document.getElementById('map');
                var option = {
                    center: new kakao.maps.LatLng(lat, lon),
                    level: 3, // 보이는 범위
                    isPanto: true, //부드럽게 이동
                };
                var map = new kakao.maps.Map(container, option);

                // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
                var mapTypeControl = new kakao.maps.MapTypeControl();

                // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
                // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
                map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

                // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
                var zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

                // 마커 이동
                var marker = new kakao.maps.Marker({
                    position: map.getCenter(),
                });
                marker.setMap(map);

                kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                    // 클릭한 위도, 경도 정보를 가져옵니다
                    var latlng = mouseEvent.latLng;

                    // 마커 위치를 클릭한 위치로 옮깁니다
                    marker.setPosition(latlng);

                    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                    message += '경도는 ' + latlng.getLng() + ' 입니다';

                    var resultDiv = document.getElementById('clickLatlng');
                    resultDiv.innerHTML = message;
                });

                // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
                kakao.maps.event.addListener(map, 'dragend', function () {
                    // 지도 중심좌표를 얻어옵니다
                    var latlng = map.getCenter();

                    var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
                    message += '경도는 ' + latlng.getLng() + ' 입니다';

                    var resultDiv = document.getElementById('dragResult');
                    resultDiv.innerHTML = message;
                });

                var mapTypes = {
                    traffic: kakao.maps.MapTypeId.TRAFFIC,
                    bicycle: kakao.maps.MapTypeId.BICYCLE,
                };

                const setOverlayMapTypeId = () => {
                    var chkTraffic = document.getElementById('chkTraffic');
                    var chkBicycle = document.getElementById('chkBicycle');

                    // 지도 타입을 제거합니다
                    for (var type in mapTypes) {
                        map.removeOverlayMapTypeId(mapTypes[type]);
                    }

                    // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
                    if (chkTraffic.checked) {
                        map.addOverlayMapTypeId(mapTypes.traffic);
                    }

                    // 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
                    if (chkBicycle.checked) {
                        map.addOverlayMapTypeId(mapTypes.bicycle);
                    }
                };

                // 교통정보 보기, 자전거도로 정보 보기 체크박스에 이벤트 핸들러를 할당합니다.
                document.getElementById('chkTraffic').addEventListener('click', setOverlayMapTypeId);
                document.getElementById('chkBicycle').addEventListener('click', setOverlayMapTypeId);
            });
        };

        getCurrentLocation();
    }, []);

    return (
        <>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
            <p>
                <input type="checkbox" id="chkTraffic" /> 교통정보 보기
                <input type="checkbox" id="chkBicycle" /> 자전거도로 정보 보기
            </p>
            <div id="clickLatlng"></div>
            <div id="dragResult"></div>
        </>
    );
};

export default KakaoMapLoader;
