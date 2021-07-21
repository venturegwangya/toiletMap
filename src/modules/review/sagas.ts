import { Review, ReviewBase } from '@modules/review/models';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateReviewAction,
  CREATE_REVIEW,
  onCreateReviewSuccess,
  receiveReviews,
  RequestReviewsByToiletIdAction,
  REQUEST_REVIEWS_BY_TOILET_ID,
} from './actions';
import { fetchToiletReviews, createNewReview as createNewReview } from './api';

function* createReview({
  toilet,
  review,
}: CreateReviewAction): Generator<StrictEffect, void, any> {
  try {
    const _review: ReviewBase = yield call(createNewReview, toilet, review);
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
    const reviews: Review[] = yield call(fetchToiletReviews, toiletId);
    yield put(receiveReviews(reviews));
  } catch (err) {
    console.log(err);
  }
}

export function* watchRequestReviewsByToiletId(): Generator {
  yield takeEvery(REQUEST_REVIEWS_BY_TOILET_ID, requestReviewsByToiletId);
}

export const sagas = [watchCreateReview, watchRequestReviewsByToiletId];
