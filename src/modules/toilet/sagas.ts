import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { toiletAPI, toiletModels } from '@apis/toilet';
import {
  RequestToiletsInAreaAction,
  receiveToilets,
  REQUEST_TOILETS_IN_AREA,
} from '@modules/toilet/actions';

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
