import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB6h89GBR4mfKfuX5WNoHk3Pc-A6jYAVho",
    authDomain: "brilliantz-edu.firebaseapp.com",
    projectId: "brilliantz-edu",
    storageBucket: "brilliantz-edu.appspot.com",
    messagingSenderId: "1049059338440",
    appId: "1:1049059338440:web:6c2e8701fa5d31c8771dfd"
};

firebase.initializeApp(config);

export default firebase;
