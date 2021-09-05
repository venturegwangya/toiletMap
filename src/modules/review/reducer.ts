import { reviewActions, reviewModels } from '.';

export interface ReviewState {
  review: Partial<reviewModels.ReviewBase | null>;
  fetchedReviews: reviewModels.Review[];
}

const initialState: ReviewState = {
  review: null,
  fetchedReviews: [],
};

export default function (
  state: ReviewState = initialState,
  action: reviewActions.ReviewActionType,
): ReviewState {
  switch (action.type) {
    case reviewActions.RECEIVE_REVIEWS:
      return {
        ...state,
        fetchedReviews: action.reviews,
      };
    case reviewActions.CREATE_REVIEW:
      return {
        ...state,
      };
    case reviewActions.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
      };
    case reviewActions.LIKE_OR_DISLIKE_REVIEW_SUCCESS:
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
