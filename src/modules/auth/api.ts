/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import firebase from 'firebase/app';
import { firebaseAuth } from '../configureFirebase';

/**
 * @override 회원가입
 */
export function signUpWithEmailAndPassword(
  email: string,
  password: string,
  displayName: string,
) {
  if (email.length === 0 || password.length === 0) return;
  firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser.user?.updateProfile({ displayName }))
    .catch(error => alert(error.message));
}

/**
 * @override 로그인
 */
export function signInWithEmailAndPassword(email: string, password: string) {
  if (email.length === 0 || password.length === 0) return;
  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message));
}

export function subscribeToAuthChange(
  onLogin: {
    (arg0: firebase.User): void;
  },
  onLogout: () => void,
) {
  return firebaseAuth.onAuthStateChanged(authUser => {
    if (authUser) onLogin(authUser);
    else onLogout();
  });
}

/**
 * @override 로그아웃
 */
export function logout() {
  firebaseAuth.signOut();
}
