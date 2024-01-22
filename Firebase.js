import { getApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBuA591Sg_dv0RKLXbcD-H5ADZbFmridSE",
    authDomain: "bc-trading-6ac92.firebaseapp.com",
    databaseURL: "https://bc-trading-6ac92-default-rtdb.firebaseio.com",
    projectId: "bc-trading-6ac92",
    storageBucket: "bc-trading-6ac92.appspot.com",
    messagingSenderId: "562200664168",
    appId: "1:562200664168:web:2e95d81a9e5f57ddff83dd",
    measurementId: "G-K9N4051ZS2"
};

let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
  auth = getAuth();
}

export { app, auth };