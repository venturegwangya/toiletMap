import { ReviewBase, Review } from '@modules/review/models';
import { LIKE_OR_DISLIKE_REVIEW_SUCCESS } from './actions';
import {
  CREATE_REVIEW,
  RECEIVE_REVIEWS,
  CREATE_REVIEW_SUCCESS,
  ReviewActionType,
} from './actions';

export interface ReviewState {
  review: Partial<ReviewBase | null>;
  fetchedReviews: Review[];
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
    case LIKE_OR_DISLIKE_REVIEW_SUCCESS:
      return {
        ...state,
        fetchedReviews: state.fetchedReviews.map(review => {
          if (action.review.id === review.id) return action.review;
          return review;
        }),
      };
    default:
      return state;
  }
}
