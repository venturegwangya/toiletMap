import React, { ReactElement } from 'react';
import { useMapEvents } from 'react-leaflet';
import { mapHooks } from '@modules/map';

export default function MapViewController(): ReactElement {
  const { setLatLng } = mapHooks.useMapActions();

  const map = useMapEvents({
    dragend: () => {
      setLatLng(map.getCenter());
    },
  });
  return <div></div>;
}
