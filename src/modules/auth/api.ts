/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import firebase from 'firebase';
import { firebaseAuth } from '../configureFirebase';

/**
 * @override 회원가입
 */
export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  displayName: string,
): Promise<firebase.User | null | undefined> {
  const userCredential: firebase.auth.UserCredential =
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
  userCredential.user?.updateProfile({ displayName });
  return userCredential.user;
}

/**
 * @override 로그인
 */
export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<firebase.User | undefined | null> {
  try {
    const userCredential: firebase.auth.UserCredential =
      await firebaseAuth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    alert(error);
  }
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
export async function logout() {
  try {
    await firebaseAuth.signOut();
  } catch (err) {
    alert(err);
  }
}
