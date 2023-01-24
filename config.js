import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBUVU9ufMwb6yzQkJjpJN3KBk28eD6Ants",
    authDomain: "test-489df.firebaseapp.com",
    projectId: "test-489df",
    storageBucket: "test-489df.appspot.com",
    messagingSenderId: "1012262209146",
    appId: "1:1012262209146:web:98e6e3c0a0b9077c001dc3",
    measurementId: "G-ZHXPMB53QB"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()

export { firebase, auth };