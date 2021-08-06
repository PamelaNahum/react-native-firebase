import firebase from "firebase";
import'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAMq6cxC4u8PkzpCM6Z8wJhIkHxBQlYqM4",
    authDomain: "crud-react-native-3c205.firebaseapp.com",
    projectId: "crud-react-native-3c205",
    storageBucket: "crud-react-native-3c205.appspot.com",
    messagingSenderId: "786149529536",
    appId: "1:786149529536:web:b5e4299298014a09cb5a25"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();
  export default{
      firebase,
      db,

  };
