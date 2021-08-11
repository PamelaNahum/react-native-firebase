import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Avatar, ListItem, PricingCard } from "react-native-elements";
import {logOut} from '../controller/loginController'

const Home = (props) =>{

    const signOut=()=>{
        logOut(props);
    }
    

    //se creó esta funcion para no tener que escribir el objeto vacio mil veces
    const objetoInicial={
        uid:"",
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
        //finalmente, una consulta decente xD
        const dbRef= firebase.db.collection("users").where("uid","==", id).get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                const user=doc.data();
                setUser({
                    ...user,
                    id:doc.id,
                });
            })
            
        })
        .catch(function(error){
            console.log(error)
        })
        
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
            icon={{name:'star', color:'green', type: 'font-awesome'}}
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
        <View style={styles.card}>
        <PricingCard 
            infoStyle={styles.cuadro}
            color="green"
            title="Cantidad de consumo"
            titleStyle={styles.title}
            price={[user.numCont, '%']}
            info={[['La catidad'],['de consumo'],['en este mes es: '],[user.numCont,'%']]}
            button={{ icon: 'star' }}
            
            />  
            
            <PricingCard 
            infoStyle={styles.cuadro}
            color="green"
            title="Cantidad de consumo"
            titleStyle={styles.title}
            price={[user.numCont, '%']}
            info={[['La catidad'],['de consumo'],['en este mes es: '],[user.numCont,'%']]}
            button={{ icon: 'star' }}
            
            /> 
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

    },
    card:{
        flex:1,
        flexDirection:'row',
        alignSelf:'center'
    },
    cuadro:{
        height:20,
        width:120,
    },
    title:{
        fontSize:12
    }
})
export default Home