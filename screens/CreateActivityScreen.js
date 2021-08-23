import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SubmitButton } from '../components';
import fire from '../database/firebase';
import firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const CreateActivityScreen = (props) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        (date) =>
            handleChangeText('fecha', date)
            console.log(date)
    };

    //se crea una funcion que va guardando el estado del objeto

    const [state, setState] = useState({
        id_user: "",
        nom_actividad: "",
        fecha: "",
    });
    /*En esta funcion se toman dos parametros y con ellos se le asiga 
    un valor al otro y con el ...state mantiene el estado de las demás
    variables de arriba */
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    /*con esta funcion yo primero verifico los campos
    y luego conecto con la base, la base genera de forma automática
    la tabla con el collecttion e ingresa el usuario, buenardo la verdad XD */

    const createNewAct = async () => {
        if (state.nom_actividad === "") {
            alert('Debes ingresar un nombre de la actividad')
        }
        else {
            await fire.db.collection('actividades').add({
                id_user: firebase.auth().currentUser.uid,
                nom_actividad: state.nom_actividad,
                fecha: moment(date.toLocaleString('es-CL')).format('DD/MM/YYYY')
            })
            props.navigation.navigate("Home");

        }


    }

    /*aqui yo retorno báscicamente el diseño, pero la
    magia se hace arriba, es como django pero en la screen se hace todo junto 
    (será seguro? :o) */

    return (
        <ScrollView style={styles.container}>

            <View style={styles.inputGroup}>
                <Text style={styles.text}>Nombre Actividad</Text>
                <TextInput
                    placeholder="Nombre Actividad"
                    onChangeText={(value) => handleChangeText('nom_actividad', value)}
                />
            </View>
            <View>
            <Text style={styles.text}>Fecha</Text>
                <TouchableOpacity 
                onPress={showDatepicker} style={styles.touchable}>
                
                    <Image
                            source={require('../assets/calendar.png')}
                            resizeMode="contain"
                            style={styles.imagen}
                        />
                    <Text style={{marginLeft:10, marginTop:5}}>{moment(date.toLocaleString('es-CL')).format('DD/MM/YYYY')}</Text>
                    
                </TouchableOpacity>
                
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                    maximumDate={new Date()}

                />
            )}
            {/* <View style={styles.inputGroup}>
                <Text style={styles.text}>Fecha</Text>
                <DateTimePicker
                    showIcon={false}
                    value={date}
                    display="default"
                    androidMode="spinner"
                    style={{ width: 340 }}
                    mode="date"
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    maxDate={moment().format('DD/MM/YYYY')}
                    onDateChange={(value) =>
                        handleChangeText('fecha', String(value)

                        )}
                />
            </View> */}
            <View>
                <SubmitButton onPress={() => createNewAct()}>Crear Actividad</SubmitButton>
            </View>
        </ScrollView>

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
        alignContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#02be90',
        marginBottom: 10
    },
    imagen: {
        width: 30,
        height: 30,

    },
    touchable: {
        flex: 1,
        flexDirection: 'row',
        marginBottom:20
    }

})

export default CreateActivityScreen