import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SliderScreen from '../screens/welcome/SliderScreen';
import LoginScreen from '../screens/welcome/LoginScreen';

// init stack navigator
const Stack = createNativeStackNavigator();

// create app
const AuthStack = () => {
  return (
       <Stack.Navigator
          screenOptions={{headerShown: false}}
       >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Slider" component={SliderScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />     

       </Stack.Navigator>
  )
}

export default AuthStack;