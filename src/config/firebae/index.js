import * as firebase from 'firebase';
// import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAXMYmDwgPfg9PZkDbz5BBJmE_YXi_g4P4",
    authDomain: "foodnow95.firebaseapp.com",
    databaseURL: "https://foodnow95.firebaseio.com",
    projectId: "foodnow95",
    storageBucket: "foodnow95.appspot.com",
    messagingSenderId: "426348569359",
    appId: "1:426348569359:web:37bb7c97f466aa27"
  };
export default firebase.initializeApp(firebaseConfig)
