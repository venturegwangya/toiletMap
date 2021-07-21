import { fork } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import { reviewSagas } from './review';
import { toiletSagas } from './toilet';

const allSagas = [...toiletSagas, ...reviewSagas];

export default function* rootSaga(): Generator {
  yield all(allSagas.map(saga => fork(saga)));
}
