import { reviewAPI } from '@apis/review';
import { ReviewBase } from '@apis/review/models';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateReviewAction,
  CREATE_REVIEW,
  receiveCreateReview,
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
    yield put(receiveCreateReview(_review));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCreateReview(): Generator {
  yield takeEvery(CREATE_REVIEW, createReview);
}

export const sagas = [watchCreateReview];
