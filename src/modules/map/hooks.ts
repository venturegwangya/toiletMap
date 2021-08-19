import firebase from 'firebase';
import { LatLng } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../configureStore';
import { useCallback, useMemo } from 'react';
import { changePosition, changeZoom } from './actions';
import { toiletActions } from '@modules/toilet';

export function useMapLatLng(): LatLng {
  const latLng = useAppSelector(state => state.map.position);
  return latLng;
}

export function useMap(): {
  center: firebase.firestore.GeoPoint;
  zoom: number;
} {
  const latLng = useMapLatLng();
  const geoPoint = useMemo(
    () => new firebase.firestore.GeoPoint(latLng.lat, latLng.lng),
    [latLng],
  );
  const zoom = useAppSelector(state => state.map.zoom);
  return { center: geoPoint, zoom };
}

export function useMapActions(): {
  setLatLng: (latLng: LatLng) => void;
  setZoom: (zoom: number) => void;
} {
  const dispatch = useAppDispatch();
  const setLatLng = useCallback(
    latLng => {
      dispatch(changePosition(latLng));
      dispatch(toiletActions.needRequestAgain());
    },
    [dispatch],
  );

  const setZoom = useCallback(
    zoom => {
      dispatch(changeZoom(zoom));
      dispatch(toiletActions.needRequestAgain());
    },
    [dispatch],
  );
  return { setLatLng, setZoom };
}
