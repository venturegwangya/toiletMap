import axios from 'axios';
import firebase from 'firebase';
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

export { firebaseDB, firebaseAuth, firebaseStorage, axiosInstance };
