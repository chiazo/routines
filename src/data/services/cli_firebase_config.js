import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

import dotenv from "dotenv";

dotenv.config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

firebase.initializeApp(config);

const fb = {
  db: firebase.database(),
  auth: firebase.auth(),
};

export default fb;
