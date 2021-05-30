import { firebaseAuth } from './common';

export function signUpWithEmailAndPassword(email, password, displayName) {
  if (email.length === 0 || password.length === 0) return;
  firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser.user?.updateProfile({ displayName }))
    .catch(error => alert(error.message));
}

export function signInWithEmailAndPassword(email, password) {
  if (email.length === 0 || password.length === 0) return;
  firebaseAuth.signInWithEmailAndPassword(email, password).catch(error => alert(error.message));
}

export function subscribeToAuthChange(onLogin, onLogout) {
  return firebaseAuth.onAuthStateChanged(authUser => {
    if (authUser) onLogin(authUser);
    else onLogout();
  });
}

export function logout() {
  firebaseAuth.signOut();
}
