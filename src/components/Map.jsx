/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';

const seoul = [37.40095, 126.733522];

function Map() {
  useEffect(() => {
    // effect
    // 장소 검색 객체 생성
    const { kakao } = window;
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소 검색
    // 키워드 및
    ps.keywordSearch('개방화장실', (data, status, pagination) => {
      console.log(data);
      console.log(status);
      console.log(pagination);
      // 이거 한 후에 현재 위치와 비교해서 marker 표시해줘야할듯
    });
    return () => {
      // cleanup
    };
  }, []);
  return (
    <MapContainer
      css={css`
        width: 100%;
        height: 100vh;
      `}
      center={seoul}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={seoul}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
