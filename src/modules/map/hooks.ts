import firebase from 'firebase';
import { LatLng } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../configureStore';
import { useCallback, useMemo } from 'react';
import { changePosition } from './actions';
import { toiletActions } from '@modules/toilet';

export function useMapLatLng(): LatLng {
  const latLng = useAppSelector(state => state.map.position);
  return latLng;
}

export function useMapGeoPoint(): firebase.firestore.GeoPoint {
  const latLng = useMapLatLng();
  const geoPoint = useMemo(
    () => new firebase.firestore.GeoPoint(latLng.lat, latLng.lng),
    [latLng],
  );
  return geoPoint;
}

export function useMapActions(): { setLatLng: (latLng: LatLng) => void } {
  const dispatch = useAppDispatch();
  const setLatLng = useCallback(
    latLng => {
      dispatch(changePosition(latLng));
      dispatch(toiletActions.needRequestAgain());
    },
    [dispatch],
  );
  return { setLatLng };
}
