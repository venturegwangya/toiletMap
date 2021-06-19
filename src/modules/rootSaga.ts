import { fork } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import { mapSagas } from './map';

const allSagas = [...mapSagas];

export default function* rootSaga(): Generator {
  yield all(allSagas.map(saga => fork(saga)));
}
