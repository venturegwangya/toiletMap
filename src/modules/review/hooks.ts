import { useAppSelector } from '@modules/configureStore';
import { Review } from './models';

export function useSelectedToiletReviews(): Review[] {
  const reviews = useAppSelector(state => state.review.fetchedReviews);
  return reviews;
}
