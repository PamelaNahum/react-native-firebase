import React, {useEffect, useState} from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert  } from 'react-native';
import firebase from '../database/firebase';

const UserDetailsScreen = (props) =>{

    //se creó esta funcion para no tener que escribir el objeto vacio mil veces
    const objetoInicial={
        id:"",
        name:"",
        correo:"",
        telefono:"",

    }
    //con esto se hace un "cargando"
    const [loading, setLoading] = useState(true)

    //con esto tomamos el usuario vacio y lo alistamos para tomar parámetros
    const [user, setUser] = useState(objetoInicial)
    
    

    const getUserById = async(id) => {
        //aqui yo recibo el id que envíe como parámetro en la vista anterior
        const dbRef= firebase.db.collection("users").doc(id)
        const doc = await dbRef.get();
        const user =doc.data();
        //aqui yo ya comienzo a actualizar al usuario
        setUser({
            ...user,
            id:doc.id,
        });
        setLoading(false)
    };

    useEffect(()=>{
        getUserById(props.route.params.user_id);
    },[])

    const handleChangeText = (name, value) =>{
        setUser({...user, [name]:value})
    };
    //en esta fucion genero el dele en la base para eliminar usuarios
    const eliminarUsuario = async()=>{
        const dbRef = firebase.db.collection('users').doc(props.route.params.user_id);
        dbRef.delete();
        props.navigation.navigate('UsersList')
    };
    //en esta fucion genero el dele en la base para modificar usuarios
    const modificarUsuario = async()=>{
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            correo: user.correo,
            telefono: user.telefono
        })
        setUser(objetoInicial)
        props.navigation.navigate('UsersList')
    }
    
    const confEliminar = () => {
        Alert.alert("Eliminar Usuario", "Está seguro que desea eliminar?",[
            {text: 'Yes', onPress:()=>eliminarUsuario()},
            {text: 'No', }
        ])
    }


    if(loading){
        return(
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    };



    
    return(
        //cuada parámetro que logro obtener de lo de arriba se lo asigno a un cuadro de texto
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}> 
                <TextInput 
                placeholder="Nombre de usuario"
                value={user.name}
                onChangeText={(value)=>handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Correo"
                value={user.correo}
                onChangeText={(value)=>handleChangeText('correo', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Telefono"
                value={user.telefono}
                onChangeText={(value)=>handleChangeText('telefono', value)}/>
            </View>
            <Button title="Guardar Usuario" onPress={()=> modificarUsuario()}/>
            <Button 
            color="red"
            title="Eliminar Usuario" onPress={()=> confEliminar()}/>

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc',
        marginTop:10,
    }
})
export default UserDetailsScreen