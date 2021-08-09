import firebase from "firebase";
import'firebase/firestore'
/*Aquí se creó una carpeta database, luego de creo un js firebase, con el script que sale
en la pagina de creacion de firebase (No es todo el codigo que sale ahí, fijarse bien) */

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
  /*Como vamos a trabajar con la base en otras vistas, esta se debe exportar,
  aqui se exporta con los parametros firebase y bd, cosa de llamarla desde
  los componentes y screen como firebase.db(etc..) */
  
  const db = firebase.firestore();
  export default{
      firebase,
      db,
      

  };
