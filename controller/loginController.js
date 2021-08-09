import firebase from "firebase";
import { Alert } from "react-native";

// ejemplo de como hacerlo mas o menos https://www.youtube.com/watch?v=rataaQ3O05M

//Se crea funcion que genera el login y redirige a la vista principal
export function login (email, password, props){
    //const user = {'email': email, 'password': password}
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{
            props.navigation.navigate('CreateUserScreen')
        })
        .catch(()=>{
            Alert.alert("Usuario inválido","Revise sus datos")
        })
};
//siguiendo la misma lógioca con esto debería ser para crear xD
export function signUp (email, password, props){
    firebase.auth()
    .createUserWithEmailAndPassword(email,password, props)
    .then(()=>{
        props.navigation.navigate('Login')
    })
    .catch(()=>{
        Alert.alert("Usuario inválido","Revise sus datos")
    })

};