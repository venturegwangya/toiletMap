import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { reviewActions, reviewAPI, reviewModels } from '.';

function* createReviewSaga({
  toilet,
  review,
}: reviewActions.CreateReviewAction): Generator<
  StrictEffect,
  void,
  reviewModels.ReviewBase
> {
  try {
    const _review: reviewModels.ReviewBase = yield call(
      reviewAPI.createReview,
      toilet,
      review,
    );
    yield put(reviewActions.onCreateReviewSuccess(_review));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCreateReviewSaga(): Generator {
  yield takeEvery(reviewActions.CREATE_REVIEW, createReviewSaga);
}

function* fetchReviewsByToiletIdSaga({
  toiletId,
}: reviewActions.RequestReviewsByToiletIdAction): Generator<
  StrictEffect,
  void,
  reviewModels.Review[]
> {
  try {
    const reviews: reviewModels.Review[] = yield call(
      reviewAPI.fetchReviewsByToiletId,
      toiletId,
    );
    yield put(reviewActions.receiveReviews(reviews));
  } catch (err) {
    console.error(err);
  }
}

export function* watchFetchReviewsByToiletIdSaga(): Generator {
  yield takeEvery(
    reviewActions.REQUEST_REVIEWS_BY_TOILET_ID,
    fetchReviewsByToiletIdSaga,
  );
}

export function* likeOrDislikeReviewSaga({
  userId,
  toiletId,
  reviewId,
  dislike,
}: reviewActions.LikeOrDislikeReviewAction): Generator<
  StrictEffect,
  void,
  reviewModels.Review
> {
  try {
    const updatedReview: reviewModels.Review = yield call(
      reviewAPI.likeOrDislikeReview,
      userId,
      toiletId,
      reviewId,
      dislike,
    );
    yield put(reviewActions.likeOrDislikeReviewSuccess(updatedReview));
  } catch (err) {
    console.error(err);
  }
}

export function* watchLikeOrDislikeReviewSaga(): Generator {
  yield takeEvery(
    reviewActions.LIKE_OR_DISLIKE_REVIEW,
    likeOrDislikeReviewSaga,
  );
}

export const sagas = [
  watchCreateReviewSaga,
  watchFetchReviewsByToiletIdSaga,
  watchLikeOrDislikeReviewSaga,
];
