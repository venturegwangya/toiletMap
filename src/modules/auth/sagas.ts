import firebase from 'firebase/app';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { SignInAction, SignUpAction, updateUser } from './actions';
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

function* logOutSaga(): Generator<StrictEffect, void, void> {
  try {
    yield call(logout);
    yield put(updateUser(null));
  } catch (err) {
    console.error(err);
  }
}

export const sagas = [signUpSaga, signInSaga, logOutSaga];
