'use strict';
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const { FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_CLIENT_CERT_URL } = process.env;

const serviceAccount = {
  "type": "service_account",
  "project_id": "the-quiz-programmer",
  "private_key_id": FIREBASE_PRIVATE_KEY_ID,
  "private_key": JSON.parse(FIREBASE_PRIVATE_KEY),
  "client_email": FIREBASE_CLIENT_EMAIL,
  "client_id": FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": FIREBASE_CLIENT_CERT_URL
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestoreDb = getFirestore();

module.exports = { firestoreDb };