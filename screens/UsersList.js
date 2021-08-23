import React, { useEffect, useState } from 'react';
import { View, ScrollView, ImageBackground, Text, StyleSheet } from 'react-native';
import { images } from '../constants';
import fire from '../database/firebase';
import firebase from "firebase";
import RNSpeedometer from 'react-native-speedometer'


const UsersList = () => {
    //aqui se rea la lista que va a guardar los datos que llegen de la base
    const objetoInicial = {
        uid: "",
        name: "",
        correo: "",
        telefono: "",
        numCont: 0,

    }

    const [user, setUser] = useState(objetoInicial);
    const [loading, setLoading] = useState(true);

    const getUserById = async (id) => {
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
    

    function renderHeader() {
        return (
            <View style={{
                width: '100%',
                height: 290,
                ...styles.shadow
            }}>
                <ImageBackground
                    source={images.banner}
                    resizeMode="cover"
                    style={{ flex: 1, alignItems: 'center' }}>
                    <View>
                        <Text style={styles.title}>
                        {user.name}</Text>

                    </View>
                    <View style={{ position: 'absolute', bottom: "-40%" }}>
                        <View style={styles.graphic} >
                            <Text style={{ color: 'black', fontSize: 22, lineHeight: 30, marginBottom: 10, marginTop: 5 }}>Su Avance</Text>
                            <RNSpeedometer
                                value={user.numCont}
                                //value for Speedometer
                                size={200}
                                //Size of Speedometer
                                minValue={-100}
                                //Min value for Speedometer
                                maxValue={100}
                                //Max value for Speedometer
                                allowedDecimals={0}
                                //Decimals value allowed or not
                                easeDurations={3000}
                                labels={[
                                    {
                                        name: user.numCont+' KG Co2 Emitido',
                                        labelColor: '#3399FF',
                                        activeBarColor: '#3399FF',
                                        
                                    },
                                    
                                    {
                                        name: user.numCont+' KG Co2 Compensado',
                                        labelColor: '#33CC66',
                                        activeBarColor: '#33CC66',
                                    },
                                ]}
                               
                            //Labels for the different steps of Speedometer
                            />
                        </View>
                    </View>


                </ImageBackground>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
            {renderHeader()}
            </View>
            

        </ScrollView>

    )
}
const styles = StyleSheet.create({
    title: {
        color: '#FFF',
        fontSize: 22,
        lineHeight: 30,
        marginTop: 70,
        marginBottom: 30
    },
    graphic: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        elevation: 7,
        width: 300,
        height: 230
    },
})

export default UsersList