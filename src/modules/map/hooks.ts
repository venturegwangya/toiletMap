import { LatLng } from 'leaflet';
import { toiletModels } from '@apis/toilet';
import { useAppSelector } from '../configureStore';
import { reviewModels } from '@apis/review';

export function useMapPosition(): LatLng {
  const position = useAppSelector(state => state.map.position);
  return position;
}

export function useNeedRequestAgain(): boolean {
  const fetchAgain = useAppSelector(state => state.map.needRequestAgain);
  return fetchAgain;
}

export function useToilets(): toiletModels.Toilet[] {
  const toilets = useAppSelector(state => state.map.fetchedToilets);
  return toilets;
}

export function useSelectedToilet(): toiletModels.Toilet | null {
  const selectedToilet = useAppSelector(state => state.map.selectedToilet);
  return selectedToilet;
}

export function useReviews(): reviewModels.Review[] {
  const reviews = useAppSelector(state => state.map.fetchedReviews);
  return reviews;
}
