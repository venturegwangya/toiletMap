/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { mapHooks } from '@modules/map';
import { toiletHooks } from '@modules/toilet';
import { LatLngBounds, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import tw from 'twin.macro';
import MapViewController from './MapViewController';

const seoul: LatLngExpression = [36.29095, 127.6043522];

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
  const { zoom } = mapHooks.useMap();
  const { toilets } = toiletHooks.useToilet();

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
      <ZoomControl position={'bottomright'} />
      <MapViewController />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {toilets.map(toilet => {
        return (
          <Marker
            key={toilet.id}
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
