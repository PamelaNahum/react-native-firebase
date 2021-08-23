import firebase from "firebase";
import { Alert } from "react-native";

// ejemplo de como hacerlo mas o menos https://www.youtube.com/watch?v=rataaQ3O05M

//Se crea funcion que genera el login y redirige a la vista principal
export function login(email, password, props) {
    //const user = {'email': email, 'password': password}

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            const user = firebase.auth().currentUser;

            if (user) {
                props.navigation.navigate('app')
            }
        })
        .catch(() => {
            Alert.alert("Usuario inválido", "Revise sus datos")
        })
};
//siguendo la misma lógica con esto debería ser para crear xD
export function signUp(email, password, props) {
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = firebase.auth().currentUser;
            if (user) {
                props.navigation.navigate('Login')
            }



        })
        .catch((error) => {
            Alert.alert("Datos inválidos", "Debe ingresar todos los campos correctamente")
            console.log(error)
        })

};

export function logOut(props) {
    firebase.auth().
        signOut().then(()=> {
            console.log('hecho xD')
        })

};

