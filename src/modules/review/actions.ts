import { ReviewBase } from '@apis/review/models';
import { toiletModels } from '@apis/toilet';

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
 *
 */

export const RECEIVE_REVIEW_RESPONSE = 'review/RECEIVE_REVIEW_RESPONSE';

export interface ReceiveReviewResponseAction {
  type: typeof RECEIVE_REVIEW_RESPONSE;
  res: any;
}

export function receiveCreateReview(res: any): ReceiveReviewResponseAction {
  return {
    type: RECEIVE_REVIEW_RESPONSE,
    res,
  };
}

export type ReviewActionType = CreateReviewAction | ReceiveReviewResponseAction;
