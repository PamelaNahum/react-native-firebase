import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersList from './screens/UsersList';
import CertificacionScreen from './screens/CertificacionScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import PrincipalEjemplo from './screens/PrincipalEjemplo';
import Home from './screens/Homes';
import CreateActivityScreen from './screens/CreateActivityScreen';
import SignUp from './screens/SignUp'

//casi toda la app xD https://www.youtube.com/watch?v=xBmx2eaozck
////https://www.youtube.com/watch?v=gPaBicMaib4 tab.navigator


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const CustomTabBarButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: "center",
                alignItems: 'center',
                ...styles.shadow
            }}
            onPress={onPress}
        >
            <View style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#2196f3'
            }}
            >{children}</View>
        </TouchableOpacity>
    )
}

const tabList = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    height: 80,
                    ...styles.shadow
                    
                },
                headerShown: false,
                tabBarHideOnKeyboard:true
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => (
                    <View style={styles.view}>
                        <Image
                            source={require('./assets/pie-chart.png')}
                            resizeMode="contain"
                            style={styles.imagen}
                        />
                    </View>
                )

            }} />
            <Tab.Screen name="UsersList" component={UsersList} options={{
                tabBarIcon: () => (
                    <View style={styles.view}>
                        <Image
                            source={require('./assets/home.png')}
                            resizeMode="contain"
                            style={styles.imagen}
                        />
                    </View>
                )

            }} />


            <Tab.Screen name="Agregar Nueva Actividad" component={CreateActivityScreen} options={{
                headerShown: true,
                tabBarIcon: ({ }) => (
                    <Image
                        source={require('./assets/plus.png')}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton{...props} />
                )

            }} />
            <Tab.Screen name="Informacion del usuario" component={UserDetailsScreen} options={{
                headerShown: true,
                tabBarIcon: () => (
                    <View style={styles.view}>
                        <Image
                            source={require('./assets/user.png')}
                            resizeMode="contain"
                            style={styles.imagen}
                        />
                    </View>
                )

            }} />
            <Tab.Screen name="certificacion" component={CertificacionScreen}
                options={{
                    tabBarIcon: () => (
                        <View style={styles.view}>
                            <Image
                                source={require('./assets/badge.png')}
                                resizeMode="contain"
                                style={styles.imagen}
                            />
                        </View>
                    )

                }} />
        </Tab.Navigator>
    )
};


const MyStack = (props) => {
    /*los stack siempre se ponen en el orden en el que van a aparecer
    siempre ponerlos con mayuscula en la carpeta screen
    video de apoyo para el próximo proyecto https://www.youtube.com/watch?v=VE7J0SA1PRQ
    */
    /*para ver el tema de las notificaciones https://www.youtube.com/watch?v=-2zoM_QWGY0
    ahora me da paja asique será mañana xDDDD */

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Login" component={PrincipalEjemplo} />

            <Stack.Screen
                name="app" component={tabList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp" component={SignUp} />
        </Stack.Navigator>



    )

}
export default function App() {
    return (
        <NavigationContainer>

            <MyStack></MyStack>
        </NavigationContainer>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginRight: 20,
        color: 'black',
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 10

    },
    imagen: {
        width: 25,
        height: 25,

    },
    text: {
        fontSize: 12
    }
});
