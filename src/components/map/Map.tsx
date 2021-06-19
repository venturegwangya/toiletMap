/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { toiletModels } from '@apis/toilet';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import MapViewController from './MapViewController';

const seoul: LatLngExpression = [36.29095, 127.6043522];
const zoom = 8;

function Map({
  toilets,
}: {
  toilets: toiletModels.Toilet[];
}): EmotionJSX.Element {
  return (
    <MapContainer
      css={css`
        width: 100%;
        height: calc(100vh - 60px);
      `}
      center={seoul}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
    >
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
