import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import { AceptButton, DeleteButton } from '../components';
import fire from '../database/firebase';
import firebase from "firebase";
import { logOut } from '../controller/loginController'

const UserDetailsScreen = (props) => {


    //se creó esta funcion para no tener que escribir el objeto vacio mil veces
    const objetoInicial = {
        id: "",
        name: "",
        correo: "",
        telefono: "",
        numCont: 0,
        uid: ""

    }
    //con esto se hace un "cargando"
    const [loading, setLoading] = useState(true)

    //con esto tomamos el usuario vacio y lo alistamos para tomar parámetros
    const [user, setUser] = useState(objetoInicial)
    const cerrarSesion = () => {
        logOut()
    }



    const getUserById = async (id) => {
        //aqui yo recibo el id que envíe como parámetro en la vista anterior
        const dbRef = fire.db.collection("users").where("uid", "==", id).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                    setUser({
                        ...user,
                        id: doc.id,
                    });
                })

            })
            .catch(function (error) {
                console.log(error)
            })

        setLoading(false)
    };

    useEffect(() => {
        getUserById(firebase.auth().currentUser.uid);
    }, [])

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    };
    //en esta fucion genero el dele en la base para eliminar usuarios
    // const eliminarUsuario = async () => {
    //     const dbRef = firebase.db.collection('users').doc(props.route.params.user_id);
    //     dbRef.delete();
    //     props.navigation.navigate('UsersList')
    // };
    //en esta fucion genero el dele en la base para modificar usuarios
    const modificarUsuario = async () => {
        const dbRef = fire.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            correo: user.correo,
            telefono: user.telefono,
            numCont: user.numCont,
            uid: firebase.auth().currentUser.uid,
        })
        const u = firebase.auth().currentUser;
        u.updateEmail(user.correo).then(() => {
            console.log("uwu")
        })
        setUser(objetoInicial)
        props.navigation.navigate('Home')
    }

    // const confEliminar = () => {
    //     Alert.alert("Eliminar Usuario", "Está seguro que desea eliminar?", [
    //         { text: 'Yes', onPress: () => eliminarUsuario() },
    //         { text: 'No', }
    //     ])
    // }


    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    };




    return (
        //cuada parámetro que logro obtener de lo de arriba se lo asigno a un cuadro de texto
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Nombre</Text>
                <TextInput
                    placeholder="Nombre de usuario"
                    value={user.name}
                    onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Correo</Text>
                <TextInput
                    placeholder="Correo"
                    value={user.correo}
                    onChangeText={(value) => handleChangeText('correo', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Telefono</Text>
                <TextInput
                    placeholder="Telefono"
                    value={user.telefono}
                    onChangeText={(value) => handleChangeText('telefono', value)} />
            </View>



            <AceptButton onPress={() => modificarUsuario()}>Guardar Usuario</AceptButton>
            <DeleteButton >Cerrar Sesión</DeleteButton>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        marginTop: 10
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        color: '#02be90',
        marginBottom: 10
    },
})
export default UserDetailsScreen