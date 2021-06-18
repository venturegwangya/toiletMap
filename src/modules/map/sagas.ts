import {
  REQUEST_TOILETS_IN_AREA,
  RequestToiletsInAreaAction,
  receiveToilets,
} from './actions';
import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { fetchToiletWithArea, Toilet } from '../../apis/toilets';

export function* requestToiletsInArea({
  center,
  radius,
}: RequestToiletsInAreaAction): Generator<StrictEffect, void, Toilet[]> {
  try {
    const toilets: Toilet[] = yield call(fetchToiletWithArea, center, radius);
    yield put(receiveToilets(toilets));
  } catch (err) {
    console.log(err);
  }
}

export function* watchRequestToiletsInArea(): Generator {
  yield takeEvery(REQUEST_TOILETS_IN_AREA, requestToiletsInArea);
}

export const sagas = [watchRequestToiletsInArea];
