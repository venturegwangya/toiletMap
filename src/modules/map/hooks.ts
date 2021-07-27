import { LatLng } from 'leaflet';
import { useAppSelector } from '../configureStore';

export function useMapPosition(): LatLng {
  const position = useAppSelector(state => state.map.position);
  return position;
}

export function useRefreshPillPosition(): string {
  const position = useAppSelector(state => state.map.pillLeftPosition);
  return position;
}
