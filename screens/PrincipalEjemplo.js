import React, {useEffect, useState} from 'react';
import {View} from 'react-native'; 
import CircularProgress from 'react-native-circular-progress-indicator'
import { AceptButton } from '../components';


const PrincipalEjemplo = (props) =>{
    //creacion de circulo animado https://www.youtube.com/watch?v=9VvXDf7ACIw

    return(
        <View style={{alignItems:'center'}}>
            <CircularProgress  
            radius={90}
            value={70}
            textColor='black'
            fontSize={20}
            valueSuffix={'%'}
            inActiveStrokeColor={'#27b871'}
            inActiveStrokeOpacity={0.2}
            duration={3000}
            />  
            <AceptButton onPress={()=>props.navigation.navigate("CreateUserScreen")}>Ingresar Usuario</AceptButton>                
        </View>
        
    )
}

export default PrincipalEjemplo