import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { Toilet } from './models';
import {
  RequestToiletsInAreaAction,
  receiveToilets,
  REQUEST_TOILETS_IN_AREA,
} from '@modules/toilet/actions';
import { fetchToiletWithArea } from './api';

function* requestToiletsInArea({
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
