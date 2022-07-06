import { FirebaseApp, initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { firebaseConfig } from "./env";

var firebase: FirebaseApp | undefined;

const clientCredentials = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
};

if (!firebase) {
  firebase = initializeApp(clientCredentials);
}

const functions = getFunctions(firebase);

// Connect emulator
// connectFunctionsEmulator(functions, "localhost", 5001);

export { firebase, functions };
