import { LatLng } from 'leaflet';
import { toiletModels } from '@apis/toilet';
import { useAppSelector } from '../configureStore';

export function useMapPosition(): LatLng {
  const position = useAppSelector(state => state.map.position);
  return position;
}

export function useNeedRequestAgain(): boolean {
  const fetchAgain = useAppSelector(state => state.map.needRequestAgain);
  return fetchAgain;
}

export function useToilets(): toiletModels.Toilet[] {
  const toilets = useAppSelector(state => state.map.toilets);
  return toilets;
}
