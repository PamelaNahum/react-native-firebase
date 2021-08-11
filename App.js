import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import SignUp from './screens/SignUp';
import PrincipalEjemplo from './screens/PrincipalEjemplo';
import Home from './screens/Home';

const Stack = createStackNavigator();
function MyStack(props){
  /*los stack siempre se ponen en el orden en el que van a aparecer
  siempre ponerlos con mayuscula en la carpeta screen
  video de apoyo para el próximo proyecto https://www.youtube.com/watch?v=VE7J0SA1PRQ
  */
 /*para ver el tema de las notificaciones https://www.youtube.com/watch?v=-2zoM_QWGY0
 ahora me da paja asique será mañana xDDDD */
 /*para ver headers mas bellos https://dev.to/netguru/stickyheader-js-beautiful-headers-in-react-native-5ac1
 https://cloudstack.ninja/chamcham/overlapping-react-navigation-header-in-react-native-app/ */
  return(
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen 
      name="Login" component={PrincipalEjemplo} 
      options={{ headerTitle: 'Bienvenido', 
      headerTintColor: '#4f7d67', 
      headerStyle:{backgroundColor: '#fff'}
      }}/>
        
      <Stack.Screen 
      name="CreateUserScreen" component={CreateUserScreen} 
      options={{ headerTitle: 'Crear Usuario', 
      headerTintColor: '#4f7d67', 
      headerStyle:{backgroundColor: '#fff'}}}/>

      <Stack.Screen 
      name="UsersList" component={UsersList}
      options={{ headerTitle: 'Lista de Usuarios', 
      headerTintColor: '#4f7d67', 
      headerStyle:{backgroundColor: '#fff'}}}/>  
      
      <Stack.Screen 
      name="UserDetailsScreen" component={UserDetailsScreen}
      options={{ headerTitle: "Detalles de usuario", 
      headerTintColor: '#4f7d67', 
      headerStyle:{backgroundColor: '#fff'}}}/>

      <Stack.Screen 
      name="SignUp" component={SignUp}
      options={{ headerTitle: "Registrate", 
      headerTintColor: '#4f7d67', 
      headerStyle:{backgroundColor: '#fff'}}}/>

      <Stack.Screen 
      name="Home" component={Home}
      options={{ headerTitle: "Bienvenido", 
      headerTintColor: '#4f7d67', 
      headerStyle:{backgroundColor: '#fff'}}}/>

    </Stack.Navigator>

  )

}
export default function App() {
  return (   
    
    <NavigationContainer>
      
      <MyStack>

      </MyStack>

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
    color:'black',
  },
});
