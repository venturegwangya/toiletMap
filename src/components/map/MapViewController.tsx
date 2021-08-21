import React, { ReactElement } from 'react';
import { useMapEvents } from 'react-leaflet';
import { mapHooks } from '@modules/map';

export default function MapViewController(): ReactElement {
  const { setLatLng, setZoom } = mapHooks.useMapActions();

  const map = useMapEvents({
    dragend: () => {
      setLatLng(map.getCenter());
    },
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });
  return <></>;
}
