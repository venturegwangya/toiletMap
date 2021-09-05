import { takeEvery, call, put, StrictEffect } from 'redux-saga/effects';
import { toiletModels, toiletActions, toiletAPI } from '.';

function* fetchToiletsInAreaSaga({
  center,
  radius,
}: toiletActions.RequestToiletsInAreaAction): Generator<
  StrictEffect,
  void,
  toiletModels.Toilet[]
> {
  try {
    const toilets: toiletModels.Toilet[] = yield call(
      toiletAPI.fetchToiletsInArea,
      center,
      radius,
    );
    yield put(toiletActions.receiveToilets(toilets));
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchToiletsInArea(): Generator {
  yield takeEvery(
    toiletActions.REQUEST_TOILETS_IN_AREA,
    fetchToiletsInAreaSaga,
  );
}

export const sagas = [watchFetchToiletsInArea];
