import {
  REQUEST_TOILETS_IN_AREA,
  RequestToiletsInAreaAction,
  receiveToilets,
  RequestReviewsByToiletIdAction,
  receiveReviews,
} from './actions';
import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { toiletAPI, toiletModels } from '@apis/toilet';
import { reviewAPI, reviewModels } from '@apis/review';
import { REQUEST_REVIEWS_BY_TOILET_ID } from './actions';

function* requestToiletsInArea({
  center,
  radius,
}: RequestToiletsInAreaAction): Generator<
  StrictEffect,
  void,
  toiletModels.Toilet[]
> {
  try {
    const toilets: toiletModels.Toilet[] = yield call(
      toiletAPI.fetchToiletWithArea,
      center,
      radius,
    );
    yield put(receiveToilets(toilets));
  } catch (err) {
    console.log(err);
  }
}

export function* watchRequestToiletsInArea(): Generator {
  yield takeEvery(REQUEST_TOILETS_IN_AREA, requestToiletsInArea);
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

export const sagas = [watchRequestToiletsInArea];
