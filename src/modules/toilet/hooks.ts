import { useAppSelector } from '@modules/configureStore';
import { Toilet } from './models';

export function useNeedRequestAgain(): boolean {
  const fetchAgain = useAppSelector(state => state.toilet.needRequestAgain);
  return fetchAgain;
}

export function useToilets(): Toilet[] {
  const toilets = useAppSelector(state => state.toilet.fetchedToilets);
  return toilets;
}

export function useSelectedToilet(): Toilet | null {
  const selectedToilet = useAppSelector(state => state.toilet.selectedToilet);
  return selectedToilet;
}
