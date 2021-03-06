import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: "AIzaSyC8FyDM28DUFgWKkW1hEyaNNeeR6gyXCQg",
  authDomain: "wtmcrobotics-website.firebaseapp.com",
  databaseURL: "https://wtmcrobotics-website.firebaseio.com",
  projectId: "wtmcrobotics-website",
  storageBucket: "wtmcrobotics-website.appspot.com",
  messagingSenderId: "95633154984",
  appId: "1:95633154984:web:e9d1e9d80825804d23b39d",
  measurementId: "G-YTK70RRDRM",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = app.firestore();

export const storage = app.storage();

export const functions = app.functions();

if (process.env.USE_FIREBASE_EMULATORS) {
  console.log("using Firebase emulators!");
  firestore.settings({
    host: "localhost:8080",
    ssl: false,
  });
  functions.useFunctionsEmulator("http://localhost:5001"); // TODO make sure this is the correct port
}

export const ui = new firebaseui.auth.AuthUI(auth);
export const signInOptions = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.GithubAuthProvider.PROVIDER_ID,
  "microsoft.com",
];
export const credentialHelper = firebaseui.auth.CredentialHelper.GOOGLE_YOLO;

export const authorLength = 25;
export const titleLength = 50;
export interface BlogPost {
  author: string;
  body: string;
  date: firebase.firestore.Timestamp | Date;
  image: string;
  title: string;
  public: boolean;
}

export interface Gallery {
  photos: Photo[];
  lastModifiedBy: string;
}

export interface Photo {
  url: { name: string; token: string };
  fileName: string;
  tokens: { "300x200": string; "1920x1080": string };
  alt: string;
  date: firebase.firestore.Timestamp | Date;
}

export interface Claims {
  isEditor?: boolean;
  isAdmin?: boolean;
}

export interface Sponsor {
  logo: string;
  name: string;
  website: string;
}

export interface SponsorsDoc {
  sponsors: Sponsor[];
}

export interface Quote {
  quote: string;
  author: string;
}

export interface QuotesDoc {
  quotes: Quote[];
}

export function isTimestamp(t: any): t is firebase.firestore.Timestamp {
  return typeof t.seconds === "number" && typeof t.nanoseconds === "number" && typeof t.toDate === "function";
}
