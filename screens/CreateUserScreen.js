import React, {useState} from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase';

const CreateUserScreen = () =>{

    //se crea una funcion que va guardando el estado del objeto

    const [state, setState]=useState({
        name:'',
        correo:'',
        telefono:''
    });
    /*En esta funcion se toman dos parametros y con ellos se le asiga 
    un valor al otro y con el ...state mantiene el estado de las demás
    variables de arriba */
    const handleChangeText = (name, value) =>{
        setState({...state, [name]:value})
    }

    const createNewUser = async()=>{
        if (state.name===''){
            alert('Debes ingresar un nombre de usuario')
        } 
        else if(state.correo===''){
            alert('Debes ingresar un correo')

        }        
        else if(state.telefono===''){
            alert('Debes ingresar un telefono')

        }
        else{
            await firebase.db.collection('users').add({
                name: state.name,
                correo: state.correo,
                telefono: state.telefono
            })
            alert('Guardado')
        }


    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}> 
                <TextInput 
                placeholder="Nombre de usuario"
                onChangeText={(value)=>handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Correo"
                onChangeText={(value)=>handleChangeText('correo', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Telefono"
                onChangeText={(value)=>handleChangeText('telefono', value)}/>
            </View>
            <Button title="Guardar Usuario" onPress={()=> createNewUser()}/>

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

export default CreateUserScreen