import cypress, { defineConfig } from 'cypress';
import admin from 'firebase-admin';

import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  env: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    testUid: process.env.TEST_UID,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return cypressFirebasePlugin(on, config, admin, {
        projectId: 'neon-note',
      });
    },
  },
});
