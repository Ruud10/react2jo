// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAt4sEwx5J6kX6ISHDB8bwBFx_4O8YaA_Y",
    authDomain: "camping-25e08.firebaseapp.com",
    databaseURL: "https://camping-25e08-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "camping-25e08",
    storageBucket: "camping-25e08.appspot.com",
    messagingSenderId: "186249159826",
    appId: "1:186249159826:web:4fe82111c0c73c0bf7f24b",
    measurementId: "G-XPYL8CMNFF"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
export const storage = getStorage();
export default app;