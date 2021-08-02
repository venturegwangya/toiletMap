import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { Toilet } from './models';
import {
  RequestToiletsInAreaAction,
  receiveToilets,
  REQUEST_TOILETS_IN_AREA,
} from '@modules/toilet/actions';
import { fetchToiletsInArea } from './api';

function* fetchToiletsInAreaSaga({
  center,
  radius,
}: RequestToiletsInAreaAction): Generator<StrictEffect, void, Toilet[]> {
  try {
    const toilets: Toilet[] = yield call(fetchToiletsInArea, center, radius);
    yield put(receiveToilets(toilets));
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchToiletsInArea(): Generator {
  yield takeEvery(REQUEST_TOILETS_IN_AREA, fetchToiletsInAreaSaga);
}

export const sagas = [watchFetchToiletsInArea];
