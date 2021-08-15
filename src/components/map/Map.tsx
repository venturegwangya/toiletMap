/** @jsxImportSource @emotion/react */
import { LatLngExpression } from 'leaflet';
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

const mapStyle = tw`w-screen h-screen`;

function Map(): EmotionJSX.Element {
  const { toilets, selectedToilet, requestAgain } = toiletHooks.useToilet();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();
  return (
    <MapContainer
      css={mapStyle}
      center={seoul}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
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
