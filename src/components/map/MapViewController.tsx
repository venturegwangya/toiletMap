import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { changePosition } from '../../reducers/mapReducer';
import { useMapEvents } from 'react-leaflet';

export default function MapViewController(): ReactElement {
  const dispatch = useDispatch();

  const map = useMapEvents({
    dragend: () => {
      dispatch(changePosition(map.getCenter()));
    },
  });
  return <div></div>;
}
