import { LatLng } from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

export function useMapPosition(): LatLng {
  const position = useSelector((state: RootState) => state.mapReducer.position);
  return position;
}
