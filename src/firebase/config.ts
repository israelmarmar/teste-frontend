import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOrHuv6WZ_oXjjHWIrI5HSZm34SkqWKFs",
  authDomain: "teste-frontend-b1042.firebaseapp.com",
  databaseURL: "https://teste-frontend-b1042.firebaseio.com",
  projectId: "teste-frontend-b1042",
  storageBucket: "teste-frontend-b1042.appspot.com",
  messagingSenderId: "556420804761",
  appId: "1:556420804761:web:f0d24509328d830df6c808",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
