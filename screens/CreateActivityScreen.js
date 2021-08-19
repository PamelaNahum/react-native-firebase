import React, {useState} from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text } from 'react-native';
import { AceptButton, SubmitButton } from '../components';
import fire from '../database/firebase';
import firebase from "firebase";
import DatePicker from 'react-native-datepicker'
import moment from "moment";

const CreateActivityScreen = (props) =>{

    //se crea una funcion que va guardando el estado del objeto

    const [state, setState]=useState({
        id_user:"",
        nom_actividad:"",
        fecha:"",
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

    const createNewAct = async()=>{
        if (state.nom_actividad===""){
            alert('Debes ingresar un nombre de la actividad')
        } 
        else{
            await fire.db.collection('actividades').add({
                id_user: firebase.auth().currentUser.uid,
                nom_actividad: state.nom_actividad,
                fecha: state.fecha
            })
            props.navigation.navigate("Home");
            
        }


    }

    

    /*aqui yo retorno báscicamente el diseño, pero la
    magia se hace arriba, es como django pero en la screen se hace todo junto 
    (será seguro? :o) */

    return(
        <ScrollView style={styles.container}>
            
            <View style={styles.inputGroup}> 
            <Text style={styles.text}>Nombre Actividad</Text>
                <TextInput 
                placeholder="Nombre Actividad"
                onChangeText={(value)=>handleChangeText('nom_actividad', value)}
                />
            </View>
            
            <View style={styles.inputGroup}> 
            <Text style={styles.text}>Fecha</Text>
            <DatePicker
            showIcon={false}
            androidMode="spinner"
            style={{width:340}}
            mode="date"
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            maxDate={moment().format('DD/MM/YYYY')}
            onDateChange={(value)=>
                handleChangeText('fecha', String(value)

            )}
            />
            </View>
            
           
            <View>
            <SubmitButton onPress={()=> createNewAct()}>Crear Actividad</SubmitButton>
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
        alignContent:'center'
    },
    text: {
        fontSize: 20,
        color: 'green',
        marginBottom:10
    },
    
})

export default CreateActivityScreen