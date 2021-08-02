import { Review, ReviewBase } from '@modules/review/models';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateReviewAction,
  CREATE_REVIEW,
  LikeOrDislikeReviewAction,
  likeOrDislikeReviewSuccess,
  LIKE_OR_DISLIKE_REVIEW,
  onCreateReviewSuccess,
  receiveReviews,
  RequestReviewsByToiletIdAction,
  REQUEST_REVIEWS_BY_TOILET_ID,
} from './actions';
import {
  createReview,
  fetchReviewsByToiletId,
  likeOrDislikeReview,
} from './api';

function* createReviewSaga({
  toilet,
  review,
}: CreateReviewAction): Generator<StrictEffect, void, ReviewBase> {
  try {
    const _review: ReviewBase = yield call(createReview, toilet, review);
    yield put(onCreateReviewSuccess(_review));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCreateReviewSaga(): Generator {
  yield takeEvery(CREATE_REVIEW, createReviewSaga);
}

function* fetchReviewsByToiletIdSaga({
  toiletId,
}: RequestReviewsByToiletIdAction): Generator<StrictEffect, void, Review[]> {
  try {
    const reviews: Review[] = yield call(fetchReviewsByToiletId, toiletId);
    yield put(receiveReviews(reviews));
  } catch (err) {
    console.error(err);
  }
}

export function* watchFetchReviewsByToiletIdSaga(): Generator {
  yield takeEvery(REQUEST_REVIEWS_BY_TOILET_ID, fetchReviewsByToiletIdSaga);
}

export function* likeOrDislikeReviewSaga({
  userId,
  toiletId,
  reviewId,
  dislike,
}: LikeOrDislikeReviewAction): Generator<StrictEffect, void, Review> {
  try {
    const updatedReview: Review = yield call(
      likeOrDislikeReview,
      userId,
      toiletId,
      reviewId,
      dislike,
    );
    yield put(likeOrDislikeReviewSuccess(updatedReview));
  } catch (err) {
    console.error(err);
  }
}

export function* watchLikeOrDislikeReviewSaga(): Generator {
  yield takeEvery(LIKE_OR_DISLIKE_REVIEW, likeOrDislikeReviewSaga);
}

export const sagas = [
  watchCreateReviewSaga,
  watchFetchReviewsByToiletIdSaga,
  watchLikeOrDislikeReviewSaga,
];
