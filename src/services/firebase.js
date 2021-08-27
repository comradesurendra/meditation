import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCpx5c1SFMvidhiUXKUMTyahjFmLr-Bzzk",
    authDomain: "meditation-16460.firebaseapp.com",
    projectId: "meditation-16460",
    storageBucket: "meditation-16460.appspot.com",
    messagingSenderId: "943415527541",
    appId: "1:943415527541:web:48a964f3dcacb5d9c8103c",
    measurementId: "G-N913E677T6"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth
export const db = firebase.database()
