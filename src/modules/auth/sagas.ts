import { firebaseAuth } from '@modules/configureFirebase';
import firebase from 'firebase';
import { eventChannel } from 'redux-saga';
import {
  call,
  cancelled,
  put,
  StrictEffect,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { authActions, authAPI } from './';

function* signUpSaga({
  email,
  password,
  displayName,
}: authActions.SignUpAction): Generator<StrictEffect, void, firebase.User> {
  try {
    const user: firebase.User = yield call(
      authAPI.signUpWithEmailAndPassword,
      email,
      password,
      displayName,
    );
    yield put(authActions.updateUser(user));
  } catch (err) {
    // todo 예외처리 액션 구현
    console.error(err);
  }
}

export function* watchSignUpReviewSaga(): Generator<
  StrictEffect,
  void,
  firebase.User
> {
  yield takeEvery(authActions.SIGN_UP, signUpSaga);
}

function* signInSaga({
  email,
  password,
}: authActions.SignInAction): Generator<StrictEffect, void, firebase.User> {
  try {
    const user: firebase.User = yield call(
      authAPI.signInWithEmailAndPassword,
      email,
      password,
    );
    yield put(authActions.updateUser(user));
  } catch (err) {
    console.error(err);
  }
}

export function* watchSignInSaga(): Generator<StrictEffect, void, void> {
  yield takeEvery(authActions.SIGN_IN, signInSaga);
}

function* logOutSaga(): Generator<StrictEffect, void, void> {
  try {
    yield call(authAPI.logout);
    yield put(authActions.updateUser(null));
  } catch (err) {
    console.error(err);
  }
}

export function* watchLogOutSaga(): Generator<StrictEffect, void, void> {
  yield takeEvery(authActions.LOG_OUT, logOutSaga);
}

/**
 * {@link} https://stackoverflow.com/questions/48507262/redux-saga-yield-put-not-working-inside-nested-callback
 */
function* subscriptionAuthSaga(): Generator<
  StrictEffect,
  void,
  { user: firebase.User }
> {
  // first create your eventChannel
  const authEventsChannel = eventChannel(emit => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      emit({ user });
    });
    // return a function that can be used to unregister listeners when the saga is cancelled
    return unsubscribe;
  });

  // then monitor those events in your saga
  try {
    while (true) {
      const { user } = yield take(authEventsChannel);
      yield put(authActions.updateUser(user));
    }
  } catch (e) {
    console.error(e);
    authEventsChannel.close();
  } finally {
    // unregister listener if the saga was cancelled
    if (yield cancelled()) authEventsChannel.close();
  }
}

export function* watchSubscriptionAuthSaga(): Generator<
  StrictEffect,
  void,
  void
> {
  yield takeEvery(authActions.SUBSCRIBE_AUTH_CHANGED, subscriptionAuthSaga);
}

export const sagas = [
  watchSignUpReviewSaga,
  watchSignInSaga,
  watchLogOutSaga,
  watchSubscriptionAuthSaga,
];
