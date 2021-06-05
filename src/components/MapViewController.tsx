import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_MAP_POSITION } from '../store/mapReducer';
import { useMapEvents } from 'react-leaflet';

export default function MapViewController(): ReactElement {
  const dispatch = useDispatch();
  const map = useMapEvents({
    move: () => {
      dispatch({ type: CHANGE_MAP_POSITION, position: map.getCenter() });
    },
  });
  return <div></div>;
}
