import axios from 'axios';
import firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import { firebaseConfig } from '../firebase-config';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

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
  axiosInstance,
};
