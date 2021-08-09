import React, {useState} from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import { AceptButton, SubmitButton } from '../components';
import firebase from '../database/firebase';

const CreateUserScreen = (props) =>{

    //se crea una funcion que va guardando el estado del objeto

    const [state, setState]=useState({
        name:"",
        correo:"",
        telefono:"",
        numCont:0,
    });
    /*En esta funcion se toman dos parametros y con ellos se le asiga 
    un valor al otro y con el ...state mantiene el estado de las demás
    variables de arriba */
    const handleChangeText = (name, value) =>{
        setState({...state, [name]:value})
    }

    /*con esta funcion yo primero verifico los campos
    y luego conecto con la base, la base genera de forma automática
    la tabla con el collecttion e ingresa el usuario, buenardo la verdad XD */

    const createNewUser = async()=>{
        if (state.name===""){
            alert('Debes ingresar un nombre de usuario')
        } 
        else if(state.correo===""){
            alert('Debes ingresar un correo')

        }        
        else if(state.telefono===""){
            alert('Debes ingresar un telefono')

        }
        else{
            await firebase.db.collection('users').add({
                name: state.name,
                correo: state.correo,
                telefono: state.telefono,
                numCont: 0
            })
            props.navigation.navigate("UsersList");
            
        }


    }

    const verUsuario=(()=>{
        return(props.navigation.navigate('UsersList'))
    });

    /*aqui yo retorno báscicamente el diseño, pero la
    magia se hace arriba, es como django pero en la screen se hace todo junto 
    (será seguro? :o) */

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
            <View>
            <SubmitButton onPress={()=> createNewUser()}>Crear usuario</SubmitButton>
            </View>
            <View> 
            <AceptButton onPress={()=> verUsuario()}>Ver usuarios</AceptButton>
            </View>
            
            

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
    },
    
})

export default CreateUserScreen