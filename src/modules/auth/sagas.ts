import firebase from 'firebase/app';
import { call, StrictEffect } from 'redux-saga/effects';
import { SignInAction } from './actions';
import { signUpWithEmailAndPassword } from './api';

function* signInSaga({
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
    // yield put();
  } catch (err) {
    console.log(err);
  }
}

export const sagas = [signInSaga];
