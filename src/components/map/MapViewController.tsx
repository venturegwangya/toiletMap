import React, { ReactElement } from 'react';
import { useMapEvents } from 'react-leaflet';
import { changePosition } from '../../modules/map/actions';
import { useAppDispatch } from '../../modules/configureStore';

export default function MapViewController(): ReactElement {
  const dispatch = useAppDispatch();

  const map = useMapEvents({
    dragend: () => {
      dispatch(changePosition(map.getCenter()));
    },
  });
  return <div></div>;
}
