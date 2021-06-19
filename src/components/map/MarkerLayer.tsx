/** @jsxImportSource @emotion/react */
import { Marker } from 'react-leaflet';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { toiletModels } from '@apis/toilet';

interface MarkerLayerProps {
  toilets: toiletModels.Toilet[];
}

function MarkerLayer({ toilets }: MarkerLayerProps): EmotionJSX.Element {
  return (
    <>
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
    </>
  );
}

export default MarkerLayer;
