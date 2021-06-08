import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { changePosition } from '../../reducers/mapReducer';
import { useMapEvents } from 'react-leaflet';

export default function MapViewController(): ReactElement {
  const dispatch = useDispatch();

  const map = useMapEvents({
    move: () => {
      // todo => throttling 걸기
      dispatch(changePosition(map.getCenter()));
    },
  });
  return <div></div>;
}
