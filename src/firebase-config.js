export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? 'dummy_api_key',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? 'dummy_auth_domain',
  projectId: process.env.FIREBASE_PROJECT_ID ?? 'dummy_project_id',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? 'dummy_storage_bucket',
  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID ?? 'dummy_messaging_sender_id',
  appId: process.env.FIREBASE_APP_ID ?? 'dummy_app_id',
};
