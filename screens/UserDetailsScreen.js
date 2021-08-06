import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from '../database/firebase';

const UserDetailsScreen = (props) =>{

    const getUserById = async(id) => {
        const dbRef= firebase.db.collection("users").doc(id)
        const doc = await dbRef.get();
        const user =doc.data();
    }

    useEffect(()=>{
        getUserById(props.route.params.user_id);
    })


    
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
            <Button title="Guardar Usuario" onPress={()=> createNewUser()}/>

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
    }
})
export default UserDetailsScreen