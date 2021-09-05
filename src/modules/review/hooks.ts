import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import { toiletModels } from '@modules/toilet';
import { useCallback } from 'react';
import { reviewModels, reviewActions } from '.';

export function useSelectedToiletReviews(): reviewModels.Review[] {
  const reviews = useAppSelector(state => state.review.fetchedReviews);
  return reviews;
}

export function useCreateReview(): (
  toilet: toiletModels.Toilet,
  review: reviewModels.ReviewBase,
) => reviewActions.CreateReviewAction {
  const dispatch = useAppDispatch();
  return useCallback(
    (toilet, review) => dispatch(reviewActions.createReview(toilet, review)),
    [dispatch],
  );
}

export function useLikeOrDislikeReview(
  userId: string,
  toiletId: string,
  reviewId: string,
): {
  like: () => reviewActions.LikeOrDislikeReviewAction;
  dislike: () => reviewActions.LikeOrDislikeReviewAction;
} {
  const dispatch = useAppDispatch();
  const like = useCallback(
    () =>
      dispatch(
        reviewActions.likeOrDislikeReview(userId, toiletId, reviewId, false),
      ),
    [dispatch, userId, toiletId, reviewId],
  );

  const dislike = useCallback(
    () =>
      dispatch(
        reviewActions.likeOrDislikeReview(userId, toiletId, reviewId, true),
      ),
    [dispatch, userId, toiletId, reviewId],
  );
  return { like, dislike };
}
