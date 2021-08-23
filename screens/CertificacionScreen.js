import React from 'react';
import { View } from 'react-native';
import {
    Text, Modal, StyleSheet, TouchableOpacity
} from 'react-native';

const CertificacionScreen = (props) => {

    
    return (
        
        
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Aún falta para poder solicitar la certificación</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.navigation.navigate("Home")}
              >
                <Text style={styles.textStyle}>Entendido</Text>
              </TouchableOpacity>
            </View>
          </View>
    

    )

}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#00b1ff",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  



export default CertificacionScreen;