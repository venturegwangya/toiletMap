import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import { Review, ReviewBase } from './models';
import { toiletModels } from '@modules/toilet';
import {
  createReview,
  likeOrDislikeReview,
  LikeOrDislikeReviewAction,
} from './actions';
import { useCallback } from 'react';
import { CreateReviewAction } from './actions';

export function useSelectedToiletReviews(): Review[] {
  const reviews = useAppSelector(state => state.review.fetchedReviews);
  return reviews;
}

export function useCreateReview(): (
  toilet: toiletModels.Toilet,
  review: ReviewBase,
) => CreateReviewAction {
  const dispatch = useAppDispatch();
  return useCallback(
    (toilet, review) => dispatch(createReview(toilet, review)),
    [dispatch],
  );
}

export function useLikeOrDislikeReview(
  userId: string,
  toiletId: string,
  reviewId: string,
): {
  like: () => LikeOrDislikeReviewAction;
  dislike: () => LikeOrDislikeReviewAction;
} {
  const dispatch = useAppDispatch();
  const like = useCallback(
    () => dispatch(likeOrDislikeReview(userId, toiletId, reviewId, false)),
    [dispatch, userId, toiletId, reviewId],
  );

  const dislike = useCallback(
    () => dispatch(likeOrDislikeReview(userId, toiletId, reviewId, true)),
    [dispatch, userId, toiletId, reviewId],
  );
  return { like, dislike };
}
