import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Avatar, ListItem, PricingCard } from "react-native-elements";
import { logOut } from '../controller/loginController'
import fire from '../database/firebase';
import firebase from "firebase";
import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import { FlatList } from 'react-native';


const Home = (props) => {


    //se creó esta funcion para no tener que escribir el objeto vacio mil veces
    const objetoInicial = {
        uid: "",
        name: "",
        correo: "",
        telefono: "",
        numCont: 0,

    }


    //con esto se hace un "cargando"
    const [loading, setLoading] = useState(true)

    //con esto tomamos el usuario vacio y lo alistamos para tomar parámetros
    const [user, setUser] = useState(objetoInicial)

    const getUserById = async (id) => {
        //finalmente, una consulta decente xD
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


    const [acts, setAct] = useState([]);

    useEffect(() => {
        getUserById(firebase.auth().currentUser.uid);
        fire.db.collection("actividades").onSnapshot((querySnapshot) => {
            const acts = [];
            querySnapshot.docs.forEach((doc) => {
                const { id_user, nom_actividad, fecha } = doc.data()
                if (id_user === firebase.auth().currentUser.uid) {

                    acts.push({
                        id: doc.id,
                        id_user,
                        nom_actividad,
                        fecha
                    })

                };
            });
            setAct(acts);
        })
    }, [])

    const Item = ({nom_actividad, fecha}) => (
        <View style={styles.item}>
            <Text style={styles.text}>{nom_actividad}</Text>
            <Text style={styles.fecha}>{fecha}</Text>
        </View>
    );
    const renderItem = ({item}) =>(
        <TouchableOpacity
        style={{
            width:180,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginRight:SIZES.radius,
            marginLeft:10,
            borderRadius: 10,
            backgroundColor:COLORS.white

        }}>
        <View style={{flexDirection:'row'}}>
            <View>
                <Image
                source={require('../assets/icons/star.png')}
                resizeMode="cover"
                style={{
                    marginTop:5,
                    width:20,
                    height:20,                
                }}/>
            </View>
            <View style={{marginLeft: SIZES.base}}>
                <Item nom_actividad={item.nom_actividad} fecha={item.fecha}/>
            </View>
        
        </View>
          
        </TouchableOpacity>
        
    )



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
                        <Text style={{
                            color: COLORS.white, ...FONTS.h2,
                            marginTop: 70, marginBottom: 30
                        }}>
                            Hola, {user.name}</Text>

                    </View>
                    <View style={{ position: 'absolute', bottom: "-40%" }}>
                        <View style={styles.graphic} >
                            <Text style={{ color: COLORS.black, ...FONTS.h2, marginBottom: 10 }}>Su avance</Text>
                            <CircularProgress
                                radius={90}
                                value={parseInt(user.numCont)}
                                textColor='black'
                                fontSize={30}
                                valueSuffix={'%'}
                                inActiveStrokeColor={'#27b871'}
                                inActiveStrokeOpacity={0.2}
                                duration={3000}
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


        <ScrollView>

            <FlatList
                data={acts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal/>

        </ScrollView>

        </ScrollView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
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
        color: 'green',
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
    card: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    cuadro: {
        height: 20,
        width: 120
    },
    title: {
        fontSize: 12
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})
export default Home