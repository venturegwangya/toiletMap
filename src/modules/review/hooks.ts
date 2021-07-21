import { reviewModels } from '@apis/review';
import { useAppSelector } from '@modules/configureStore';

export function useSelectedToiletReviews(): reviewModels.Review[] {
  const reviews = useAppSelector(state => state.review.fetchedReviews);
  return reviews;
}
