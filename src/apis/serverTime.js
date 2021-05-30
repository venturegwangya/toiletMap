import firebase from 'firebase';

export function getFirebaseServerTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
