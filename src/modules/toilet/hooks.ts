import { toiletModels } from '@apis/toilet';
import { useAppSelector } from '@modules/configureStore';

export function useNeedRequestAgain(): boolean {
  const fetchAgain = useAppSelector(state => state.toilet.needRequestAgain);
  return fetchAgain;
}

export function useToilets(): toiletModels.Toilet[] {
  const toilets = useAppSelector(state => state.toilet.fetchedToilets);
  return toilets;
}

export function useSelectedToilet(): toiletModels.Toilet | null {
  const selectedToilet = useAppSelector(state => state.toilet.selectedToilet);
  return selectedToilet;
}
