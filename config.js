import * as firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyB3qZIjm79BnWhel6uhubMP7PlyMZdcYag",
    authDomain: "library-68b6b.firebaseapp.com",
    projectId: "library-68b6b",
    storageBucket: "library-68b6b.appspot.com",
    messagingSenderId: "524458566063",
    appId: "1:524458566063:web:ce1d7bb6ab5ab5107f8f5a"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();