import React from 'react';
import { View } from 'react-native';
import {
    Alert, Text
} from 'react-native';

const CertificacionScreen = (props) => {
    const confEliminar = () => {
        Alert.alert("Aun falta", "aun falta tiempo para solicitar la certificación", [
            { text: 'Ok', onPress: () => props.navigation.navigate("Home") },

        ])
    }
    return (
        <View>{confEliminar()}</View>

    )
}


export default CertificacionScreen;