import React, {useEffect, useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import { ListItem } from 'react-native-elements';
import { SubmitButton } from '../components';


const UsersList = (props) =>{
    //aqui se rea la lista que va a guardar los datos que llegen de la base

    const [users, setUsers]= useState([]);

    //Con esto hago la consulta a la base y lleno la lista con los datos

    useEffect(()=>{
        firebase.db.collection("users").onSnapshot((querySnapshot)=>{
            const users =[];
            querySnapshot.docs.forEach((doc)=>{
                const {name, correo, telefono} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    correo,
                    telefono
                })
            });
            setUsers(users);
        });
        
    },[]);

    return(
        <ScrollView>
                       
            {
                users.map(user => {
                    return(
                        <ListItem
                        /*aqui utilizo un boton tipo "flechita" para poder ingresa a cada usuario
                        la idea es que despues pueda tomar los datos
                        y modificarlos en otra vista, ademas le envío como parámetro el id del usuario
                        seleccionado*/
                        key={user.id} bottomDivider onPress={()=>{
                            props.navigation.navigate('UserDetailsScreen',{
                                user_id:user.id
                            })
                        }}
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.correo}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <SubmitButton onPress={()=>props.navigation.navigate("CreateUserScreen")}>Atras</SubmitButton>
        </ScrollView>
        
    )
}

export default UsersList