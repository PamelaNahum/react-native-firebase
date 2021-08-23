
import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { AceptButton, SubmitButton } from '../components';
import { login } from '../controller/loginController'

const PrincipalEjemplo = (props) => {

    //Se generar variables de cambio de email y pass

    const [email, setEmail] = useState("pamela.nahum14@gmail.com")
    const [password, setPassword] = useState("Pamela.14")

    //Se llama a la funcion que genera el login en la base de datos

    const iniciarSesion = () => {
        login(email, password, props)
    }


    return (
        <ScrollView style={styles.container}>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Usuario"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View>
                <SubmitButton  onPress={() => iniciarSesion()}>Iniciar sesion</SubmitButton>
            </View>
            <View>
                <AceptButton onPress={() => props.navigation.navigate("SignUp")}>Registrate</AceptButton>
            </View>


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginTop: 10,
    },

})

export default PrincipalEjemplo