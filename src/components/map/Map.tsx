/** @jsxImportSource @emotion/react */
import { LatLngBounds, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { toiletModels, toiletHooks } from '@modules/toilet';
import MapViewController from './MapViewController';
import tw from 'twin.macro';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import PopupPill from '@components/map/PopupPill';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { windowHooks } from '@modules/window';
import { useRef } from 'react';

const seoul: LatLngExpression = [36.29095, 127.6043522];
const zoom = 8;

const southKoreaBounds: LatLngBounds = new LatLngBounds([
  [38.8, 121.75],
  [38.8, 132.18],
  [34.3, 132.18],
  [34.3, 129.4],
  [31.93, 129.4],
  [31.93, 121.75],
]);

const mapStyle = tw`w-screen h-screen`;

function Map(): EmotionJSX.Element {
  const { toilets, selectedToilet, requestAgain } = toiletHooks.useToilet();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();
  return (
    <MapContainer
      css={mapStyle}
      center={seoul}
      zoom={zoom}
      minZoom={8}
      scrollWheelZoom={false}
      zoomControl={false}
      maxBounds={southKoreaBounds}
      maxBoundsViscosity={1.0} // 맵 경계밖으로 드래그 완전 차단
    >
      {requestAgain && (
        <PopupPill
          text="이 위치에서 다시 검색"
          icon={faRedo}
          onClick={fetchNearByToilets}
        />
      )}
      <ZoomControl position={'bottomright'} />
      <MapViewController />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {toilets.map((toilet, i) => {
        return (
          <Marker
            key={i}
            position={{
              lat: toilet.coordinates.latitude,
              lng: toilet.coordinates.longitude,
            }}
          ></Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
