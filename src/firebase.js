import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXoqq1JlhFKSTd2dzFNTK-cMf2HV8U8nQ",
    authDomain: "my-house-1058a.firebaseapp.com",
    projectId: "my-house-1058a",
    storageBucket: "my-house-1058a.appspot.com",
    messagingSenderId: "629947552485",
    appId: "1:629947552485:web:efe08e57c3303a519cfa0c",
    measurementId: "G-2V2EG7PT9W"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();