import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

const UsersList = (props) =>{

    const [users, setUsers]= useState([]);

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
            <Button title="Atras"
            onPress={()=>props.navigation.navigate("CreateUserScreen")}/>

            {
                users.map(user => {
                    return(
                        <ListItem
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
        </ScrollView>
        
    )
}

export default UsersList