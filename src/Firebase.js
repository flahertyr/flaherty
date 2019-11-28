const firebase = require("firebase");
require("firebase/firestore");

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBjzAwcJNauNB6-aRfcMF_nhDm1zzjKEdU",
    authDomain: "chat-a7859.firebaseapp.com",
    databaseURL: "https://chat-a7859.firebaseio.com",
    projectId: "chat-a7859",
    storageBucket: "chat-a7859.appspot.com",
    messagingSenderId: "675010776994",
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
