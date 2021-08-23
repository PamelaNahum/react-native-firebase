import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import fire from '../database/firebase';
import firebase from "firebase";
import { images } from '../constants';
import { FlatList } from 'react-native';


const Home = () => {


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

    const Item = ({ nom_actividad, fecha }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{nom_actividad}</Text>
            <Text style={styles.fecha}>{fecha}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.touchable}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image
                        source={require('../assets/icons/star.png')}
                        resizeMode="cover"
                        style={styles.img} />
                </View>
                <View style={{ marginLeft: 8 }}>
                    <Item nom_actividad={item.nom_actividad} fecha={item.fecha} />
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
                        <Text style={styles.title}>
                            Hola, {user.name}</Text>

                    </View>
                    <View style={{ position: 'absolute', bottom: "-40%" }}>
                        <View style={styles.graphic} >
                            <Text style={{ color: 'black', fontSize: 22, lineHeight: 30, marginBottom: 10, marginTop:5 }}>Su Avance</Text>
                            <CircularProgress
                                radius={90}
                                value={parseInt(user.numCont)}
                                textColor='black'
                                fontSize={30}
                                valueSuffix={'%'}
                                inActiveStrokeColor={'#02709f'}
                                inActiveStrokeOpacity={0.2}
                                duration={3000}
                                activeStrokeColor={'#04e3ad'}
                            />
                        </View>



                    </View>


                </ImageBackground>
            </View>
        )
    }

    function renderNotice(){
        return(
            <View
            style={{ 
                marginTop:24,
                marginHorizontal: 24,
                padding: 20,
                borderRadius:12,
                backgroundColor: '#04e3ad',
                ...styles.shadow

            }}>
                <Text style={{fontSize:16}}>
                    Actividades próximas
                </Text>

                <Text style={{fontSize:14, color:'black'}} >
                    la idea es listar actividades proximas por hacer
                </Text>

            </View>
            
        )

    }

    return (
        <ScrollView>

            <View style={{ flex: 1, paddingBottom: 130 }}>

                {renderHeader()}
            </View>


            <ScrollView >
                

                <FlatList
                    
                    data={acts}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal />
                

            </ScrollView>

            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderNotice()}
                {renderNotice()}
                {renderNotice()}
            </View>

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
        color: '#02be90',
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
        color: '#FFF',
        fontSize: 22,
        lineHeight: 30,
        marginTop: 70,
        marginBottom: 30
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
    },
    touchable: {
        width: 180,
        paddingVertical: 24,
        paddingHorizontal: 24,
        marginRight: 12,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    img: {
        marginTop: 5,
        width: 20,
        height: 20,
    }
})
export default Home