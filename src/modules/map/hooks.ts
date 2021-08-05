import firebase from 'firebase';
import { LatLng } from 'leaflet';
import { useAppSelector } from '../configureStore';
import { useMemo } from 'react';

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
