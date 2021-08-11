import React, { useState} from 'react';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native'; 
import { AceptButton, SubmitButton  } from '../components';
import {signUp} from '../controller/loginController'

const SignUp = (props) =>{

    //Se generar variables de cambio de email y pass
    
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    //Se llama a la funcion que genera el login en la base de datos

    const registrarse =()=>{
        signUp(email, password, props)
    }
    

    return(
        <ScrollView style={styles.container}>
            
            <View style={styles.inputGroup}> 
                <TextInput 
                placeholder="Ingresa tu correo"
                value={email}
                onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Ingresa una contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=>setPassword(text)}
                />
            </View>
            <View>
            <SubmitButton onPress={()=> registrarse()}>Registrate</SubmitButton>
            </View>
            <View> 
            <AceptButton onPress={()=>props.navigation.navigate("Login")}>Volver</AceptButton>
            </View>          
            

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
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

export default SignUp