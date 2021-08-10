import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet} from 'react-native';
import { AceptButton, DeleteButton } from '../components';
import firebase from '../database/firebase';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Avatar, ListItem } from "react-native-elements";


const Home = (props) =>{
    

    //se creó esta funcion para no tener que escribir el objeto vacio mil veces
    const objetoInicial={
        id:"",
        name:"",
        correo:"",
        telefono:"",
        numCont:0,

    }
    //con esto se hace un "cargando"
    const [loading, setLoading] = useState(true)

    //con esto tomamos el usuario vacio y lo alistamos para tomar parámetros
    const [user, setUser] = useState(objetoInicial)
    
    

    const getUserById = async(id) => {
        //aqui yo recibo el id que envíe como parámetro en la vista anterior
        const dbRef= firebase.db.collection("users").doc(id)
        const doc = await dbRef.get();
        const user =doc.data();
        //aqui yo ya comienzo a actualizar al usuario
        setUser({
            ...user,
            id:doc.id,
        });
        setLoading(false)
    };

    useEffect(()=>{
        getUserById(props.route.params.user_id);
    },[])   
    
    return(
        <ScrollView>
            
            <View>
            <ListItem>
            <Avatar
            rounded
            icon={{name:'user', color:'green', type: 'font-awesome-5'}}
            onPress={() => console.log("Works!")}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.text}>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.correo}</ListItem.Subtitle>
            
            </ListItem.Content>
            </ListItem>
            </View>
            <View style={styles.graphic}>
            <CircularProgress  
            radius={90}
            value={parseInt(user.numCont)}
            textColor='black'
            fontSize={20}
            valueSuffix={'%'}
            inActiveStrokeColor={'#27b871'}
            inActiveStrokeOpacity={0.2}
            duration={3000}
            />        
        </View>
        <View>
            <AceptButton>Guardar Usuario</AceptButton>
            
            <DeleteButton >Eliminar Usuario</DeleteButton>
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
    },
    text:{
        fontSize:30,
        color: 'green',
    },
    graphic:{
        alignItems:'center',
        marginTop:30,
        marginBottom:30

    }
})
export default Home