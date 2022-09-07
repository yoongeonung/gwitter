// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import * as fbaseAuth from "firebase/auth";
import * as fstore from "firebase/firestore";
import * as fstorage from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env["REACT_APP_API_KEY"],
    authDomain: process.env["REACT_APP_AUTH_DOMAIN"],
    projectId: process.env["REACT_APP_PROJECT_ID"],
    storageBucket: process.env["REACT_APP_STORAGE_BUCKET"],
    messagingSenderId: process.env["REACT_APP_MESSAGING_SENDER_ID "],
    appId: process.env["REACT_APP_APP_ID"]
};

// Initialize Firebase
export const fbase = initializeApp(firebaseConfig);

export const dbProvider = fstore;

export const storageProvider = fstorage;

export const authProvider = {
    auth: fbaseAuth.getAuth(fbase),
    ...fbaseAuth
};