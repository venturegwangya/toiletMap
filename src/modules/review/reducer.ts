import { ReviewBase } from '@apis/review/models';
import {
  CREATE_REVIEW,
  RECEIVE_REVIEW_RESPONSE,
  ReviewActionType,
} from './actions';

export interface ReviewState {
  review: Partial<ReviewBase | null>;
}

const initialState: ReviewState = {
  review: null,
};

export default function (
  state: ReviewState = initialState,
  action: ReviewActionType,
): ReviewState {
  switch (action.type) {
    case CREATE_REVIEW:
      return {
        ...state,
      };
    case RECEIVE_REVIEW_RESPONSE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
