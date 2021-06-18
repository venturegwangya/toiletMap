import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';
import { changePosition } from '../../modules/map/actions';

export default function MapViewController(): ReactElement {
  const dispatch = useDispatch();

  const map = useMapEvents({
    dragend: () => {
      dispatch(changePosition(map.getCenter()));
    },
  });
  return <div></div>;
}
