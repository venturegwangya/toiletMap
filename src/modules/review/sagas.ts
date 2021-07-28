import { Review, ReviewBase } from '@modules/review/models';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateReviewAction,
  CREATE_REVIEW,
  LIKE_OR_DISLIKE_REVIEW,
  onCreateReviewSuccess,
  receiveReviews,
  RequestReviewsByToiletIdAction,
  REQUEST_REVIEWS_BY_TOILET_ID,
} from './actions';
import {
  LikeOrDislikeReviewAction,
  likeOrDislikeReviewSuccess,
} from './actions';
import { reviewAPI } from '.';

function* createReview({
  toilet,
  review,
}: CreateReviewAction): Generator<StrictEffect, void, any> {
  try {
    const _review: ReviewBase = yield call(
      reviewAPI.createNewReview,
      toilet,
      review,
    );
    yield put(onCreateReviewSuccess(_review));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCreateReview(): Generator {
  yield takeEvery(CREATE_REVIEW, createReview);
}

function* requestReviewsByToiletId({
  toiletId,
}: RequestReviewsByToiletIdAction): Generator<StrictEffect, void, Review[]> {
  try {
    const reviews: Review[] = yield call(
      reviewAPI.fetchToiletReviews,
      toiletId,
    );
    yield put(receiveReviews(reviews));
  } catch (err) {
    console.error(err);
  }
}

export function* watchRequestReviewsByToiletId(): Generator {
  yield takeEvery(REQUEST_REVIEWS_BY_TOILET_ID, requestReviewsByToiletId);
}

export function* likeOrDislikeReview({
  userId,
  toiletId,
  reviewId,
  dislike,
}: LikeOrDislikeReviewAction): Generator<StrictEffect, void, Review> {
  try {
    const updatedReview: Review = yield call(
      reviewAPI.likeOrDislikeReview,
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

export function* watchLikeOrDislikeReview(): Generator {
  yield takeEvery(LIKE_OR_DISLIKE_REVIEW, likeOrDislikeReview);
}

export const sagas = [
  watchCreateReview,
  watchRequestReviewsByToiletId,
  watchLikeOrDislikeReview,
];
