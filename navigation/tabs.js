import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import UsersList from '../screens/UsersList';
import CreateUserScreen from '../screens/CreateUserScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import SignUp from '../screens/SignUp';
import PrincipalEjemplo from '../screens/PrincipalEjemplo';
import Home from '../screens/Home';

//https://www.youtube.com/watch?v=gPaBicMaib4





const Tab = createBottomTabNavigator();

const Tabs =()=>{

    
    
    // if (route.state.routes[route.state.index].name === "Login") {
    //     navigation.setOptions({ tabBarVisible: false })
    //   }
    //   else {
    //     navigation.setOptions({ tabBarVisible: true })
    //   }
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle: {
                position: 'absolute',
                elevation:0,
                backgroundColor:'#fff',
                borderRadius:15,
                height:80,
                ...styles.shadow
            },
        }}>
            <Tab.Screen name="Login" component={PrincipalEjemplo} 
            options={{
                tabBarShowLabel:false,
                

            }}/>
            <Tab.Screen name="UsersList" component={UsersList} options={{
                tabBarIcon:({focused})=>(
                    <View style={styles.view}>
                        <Image
                        source={require('../assets/home.png')}
                        resizeMode="contain"
                        style={styles.imagen}
                        />
                    </View>
                )

            }}/>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={styles.view}>
                        <Image
                        source={require('../assets/pie-chart.png')}
                        resizeMode="contain"
                        style={styles.imagen}
                        />
                    </View>
                )

            }} />
            
            <Tab.Screen name="CreateUserScreen" component={CreateUserScreen} options={{
                tabBarIcon:({focused})=>(
                    <View style={styles.view}>
                        <Image
                        source={require('../assets/plus.png')}
                        resizeMode="contain"
                        style={styles.imagen}
                        />
                    </View>
                )

            }}/>
            <Tab.Screen name="UserDetailsScreen" component={UserDetailsScreen} options={{
                tabBarIcon:({focused})=>(
                    <View style={styles.view}>
                        <Image
                        source={require('../assets/user.png')}
                        resizeMode="contain"
                        style={styles.imagen}
                        />
                    </View>
                )

            }}/>
            <Tab.Screen name="SignUp" component={SignUp}
            options={{
                tabBarIcon:({focused})=>(
                    <View style={styles.view}>
                        <Image
                        source={require('../assets/badge.png')}
                        resizeMode="contain"
                        style={styles.imagen}
                        />
                    </View>
                )

            }}/>
        </Tab.Navigator>
    )
};
const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width:0, 
            height:10,
        },
        shadowOpacity:0.25,  
        shadowRadius:3.5,  
        elevation:5,
    },
    view:{
        alignItems:'center',
        justifyContent: 'center',
        top:10

    },
    imagen:{
        width: 25,
        height:25,

    },
    text:{
        fontSize:12
    }
})
export default Tabs;

