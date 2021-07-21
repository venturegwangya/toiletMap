import { reviewModels } from '@apis/review';
import { ReviewBase } from '@apis/review/models';
import {
  CREATE_REVIEW,
  RECEIVE_REVIEWS,
  CREATE_REVIEW_SUCCESS,
  ReviewActionType,
} from './actions';

export interface ReviewState {
  review: Partial<ReviewBase | null>;
  fetchedReviews: reviewModels.Review[];
}

const initialState: ReviewState = {
  review: null,
  fetchedReviews: [],
};

export default function (
  state: ReviewState = initialState,
  action: ReviewActionType,
): ReviewState {
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return {
        ...state,
        fetchedReviews: action.reviews,
      };
    case CREATE_REVIEW:
      return {
        ...state,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
