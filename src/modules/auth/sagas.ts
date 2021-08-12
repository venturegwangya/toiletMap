import firebase from 'firebase';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  LOG_OUT,
  SignInAction,
  SignUpAction,
  SIGN_IN,
  SIGN_UP,
  updateUser,
} from './actions';
import {
  logout,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from './api';

function* signUpSaga({
  email,
  password,
  displayName,
}: SignInAction): Generator<StrictEffect, void, firebase.User> {
  try {
    const user: firebase.User = yield call(
      signUpWithEmailAndPassword,
      email,
      password,
      displayName,
    );
    yield put(updateUser(user));
  } catch (err) {
    console.error(err);
  }
}

export function* watchSignUpReviewSaga(): Generator<
  StrictEffect,
  void,
  firebase.User
> {
  yield takeEvery(SIGN_UP, signUpSaga);
}

function* signInSaga({
  email,
  password,
}: SignUpAction): Generator<StrictEffect, void, firebase.User> {
  try {
    const user: firebase.User = yield call(
      signInWithEmailAndPassword,
      email,
      password,
    );
    yield put(updateUser(user));
  } catch (err) {
    console.error(err);
  }
}

export function* watchSignInSaga(): Generator<StrictEffect, void, void> {
  yield takeEvery(SIGN_IN, signInSaga);
}

function* logOutSaga(): Generator<StrictEffect, void, void> {
  try {
    yield call(logout);
    yield put(updateUser(null));
  } catch (err) {
    console.error(err);
  }
}

export function* watchLogOutSaga(): Generator<StrictEffect, void, void> {
  yield takeEvery(LOG_OUT, logOutSaga);
}

export const sagas = [watchSignUpReviewSaga, watchSignInSaga, watchLogOutSaga];
