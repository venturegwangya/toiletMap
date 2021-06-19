import React, { ReactElement } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useAppDispatch } from '../../modules/configureStore';
import { mapActions } from '../../modules/map';

export default function MapViewController(): ReactElement {
  const dispatch = useAppDispatch();

  const map = useMapEvents({
    dragend: () => {
      dispatch(mapActions.changePosition(map.getCenter()));
    },
  });
  return <div></div>;
}
