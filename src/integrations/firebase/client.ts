import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth, GoogleAuthProvider } from 'firebase/auth';

/* eslint-disable @typescript-eslint/no-explicit-any */
const env = import.meta.env as Record<string, string>;

const firebaseConfig = {
  apiKey: env['VITE_FIREBASE_API_KEY'],
  authDomain: env['VITE_FIREBASE_AUTH_DOMAIN'],
  projectId: env['VITE_FIREBASE_PROJECT_ID'],
  storageBucket: env['VITE_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
  appId: env['VITE_FIREBASE_APP_ID'],
  measurementId: env['VITE_FIREBASE_MEASUREMENT_ID'],
};

const app: FirebaseApp = getApps().length
  ? getApps()[0]!
  : initializeApp(firebaseConfig);

export const firebaseAuth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

// Analytics is browser-only (not available in SSR/Workers context)
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    try { getAnalytics(app); } catch { /* ignore analytics errors */ }
  });
}
