export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? 'dummy',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: 'toiletmap-d08b5',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
