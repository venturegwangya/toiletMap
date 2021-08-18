import firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import { firebaseConfig } from '../firebase-config';

const DEV_ENV = 'development';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseDB = firebaseApp.firestore();
const firebaseAuth = firebaseApp.auth();
const firebaseStorage = firebaseApp.storage();
const firebaseGeoDB = geofirestore.initializeApp(firebaseDB);

if (process.env.NODE_ENV === DEV_ENV) {
  firebaseDB.useEmulator('http://localhost', 8080);
  firebaseAuth.useEmulator('http://localhost:9099');
}

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
