import { reviewAPI, reviewModels } from '@apis/review';
import { ReviewBase } from '@apis/review/models';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateReviewAction,
  CREATE_REVIEW,
  onCreateReviewSuccess,
  receiveReviews,
  RequestReviewsByToiletIdAction,
  REQUEST_REVIEWS_BY_TOILET_ID,
} from './actions';

function* createReview({
  toilet,
  review,
}: CreateReviewAction): Generator<StrictEffect, void, any> {
  try {
    const _review: ReviewBase = yield call(
      reviewAPI.createReview,
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
}: RequestReviewsByToiletIdAction): Generator<
  StrictEffect,
  void,
  reviewModels.Review[]
> {
  try {
    const reviews: reviewModels.Review[] = yield call(
      reviewAPI.fetchToiletReviews,
      toiletId,
    );
    yield put(receiveReviews(reviews));
  } catch (err) {
    console.log(err);
  }
}

export function* watchRequestReviewsByToiletId(): Generator {
  yield takeEvery(REQUEST_REVIEWS_BY_TOILET_ID, requestReviewsByToiletId);
}

export const sagas = [watchCreateReview, watchRequestReviewsByToiletId];
