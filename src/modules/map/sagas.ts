import {
  REQUEST_TOILETS_IN_AREA,
  RequestToiletsInAreaAction,
  receiveToilets,
} from './actions';
import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { toiletAPI, toiletModels } from '@apis/toilet';

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

export const sagas = [watchRequestToiletsInArea];
