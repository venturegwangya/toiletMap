import firebase from 'firebase/app';
import * as geofirestore from 'geofirestore';
import { firebaseConfig } from '../firebase-config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseDB = firebaseApp.firestore();
const firebaseAuth = firebaseApp.auth();
const firebaseStorage = firebaseApp.storage();
const firebaseGeoDB = geofirestore.initializeApp(firebaseDB);

function getFirebaseServerTimestamp(): firebase.firestore.FieldValue {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export {
  firebaseDB,
  firebaseGeoDB,
  firebaseAuth,
  firebaseStorage,
  getFirebaseServerTimestamp,
};
