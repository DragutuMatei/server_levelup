import { initializeApp } from "firebase-admin/app"; // Modular import
import { getDatabase } from "firebase-admin/database"; // Modular import for Realtime Database
import admin from "firebase-admin";
import "dotenv/config";

const { credential } = admin;
const app = initializeApp({
  credential: credential.cert({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  }),
  databaseURL: process.env.databaseURL,
});

// Reference to Realtime Database
const db = getDatabase(app);

// Example of writing data to the Realtime Database
// const ref = db.ref("messages");
// ref.set({
//   username: "admin",
//   text: "Hello from the Admin!",
//   timestamp: Date.now(),
// });
export { db, admin };
