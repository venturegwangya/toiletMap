import { Review, ReviewBase } from '@modules/review/models';
import { toiletModels } from '@modules/toilet';

/**
 * 리뷰 생성
 */
export const CREATE_REVIEW = 'review/CREATE_REVIEW';

export interface CreateReviewAction {
  type: typeof CREATE_REVIEW;
  toilet: toiletModels.Toilet;
  review: ReviewBase;
}

export function createReview(
  toilet: toiletModels.Toilet,
  review: ReviewBase,
): CreateReviewAction {
  return {
    type: CREATE_REVIEW,
    toilet,
    review,
  };
}

/**
 * 화장실 리뷰 가져옴
 */
export const REQUEST_REVIEWS_BY_TOILET_ID =
  'review/REQUEST_REVIEWS_BY_TOILET_ID' as const;
export interface RequestReviewsByToiletIdAction {
  type: typeof REQUEST_REVIEWS_BY_TOILET_ID;
  toiletId: string;
}
export function requestReviewsByToiletId(
  toiletId: string,
): RequestReviewsByToiletIdAction {
  return {
    type: REQUEST_REVIEWS_BY_TOILET_ID,
    toiletId,
  };
}

/**
 * 화장실 리뷰를 성공적으로 가져왔을 때
 */
export const RECEIVE_REVIEWS = 'review/RECEIVE_REVIEWS' as const;
export interface ReceiveReviewsAction {
  type: typeof RECEIVE_REVIEWS;
  reviews: Review[];
}
export function receiveReviews(reviews: Review[]): ReceiveReviewsAction {
  return {
    type: RECEIVE_REVIEWS,
    reviews,
  };
}

/**
 *
 */

export const CREATE_REVIEW_SUCCESS = 'review/CREATE_REVIEW_SUCCESS';

export interface OnCreateReviewSuccessAction {
  type: typeof CREATE_REVIEW_SUCCESS;
  res: any;
}

export function onCreateReviewSuccess(res: any): OnCreateReviewSuccessAction {
  return {
    type: CREATE_REVIEW_SUCCESS,
    res,
  };
}

export const LIKE_OR_DISLIKE_REVIEW = 'review/LIKE_OR_DISLIKE_REVIEW';
export interface LikeOrDislikeReviewAction {
  type: typeof LIKE_OR_DISLIKE_REVIEW;
  userId: string;
  toiletId: string;
  reviewId: string;
  dislike: boolean;
}
export function likeOrDislikeReview(
  userId: string,
  toiletId: string,
  reviewId: string,
  dislike: boolean,
): LikeOrDislikeReviewAction {
  return {
    type: LIKE_OR_DISLIKE_REVIEW,
    userId,
    toiletId,
    reviewId,
    dislike,
  };
}

export const LIKE_OR_DISLIKE_REVIEW_SUCCESS =
  'review/LIKE_OR_DISLIKE_REVIEW_SUCCESS';
export interface LikeOrDislikeReviewSuccessAction {
  type: typeof LIKE_OR_DISLIKE_REVIEW_SUCCESS;
  review: Review;
}
export function likeOrDislikeReviewSuccess(
  review: Review,
): LikeOrDislikeReviewSuccessAction {
  return {
    type: LIKE_OR_DISLIKE_REVIEW_SUCCESS,
    review,
  };
}

export type ReviewActionType =
  | CreateReviewAction
  | OnCreateReviewSuccessAction
  | RequestReviewsByToiletIdAction
  | ReceiveReviewsAction
  | LikeOrDislikeReviewAction
  | LikeOrDislikeReviewSuccessAction;
