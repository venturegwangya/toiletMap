import { fork } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import { reviewSagas } from './review';
import { toiletSagas } from './toilet';
import { authSagas } from './auth';

const allSagas = [...toiletSagas, ...reviewSagas, ...authSagas];

export default function* rootSaga(): Generator {
  yield all(allSagas.map(saga => fork(saga)));
}
