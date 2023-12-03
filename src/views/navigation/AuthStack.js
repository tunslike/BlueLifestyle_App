import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SliderScreen from '../screens/welcome/SliderScreen';
import LoginScreen from '../screens/welcome/LoginScreen';
import UpdateProfile from '../screens/welcome/UpdateProfile';
import UpdateCompleted from '../screens/welcome/UpdateCompleted';

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
            <Stack.Screen name="UpdateProfile" component={UpdateProfile}/>
            <Stack.Screen name="CompleteProfile" component={UpdateCompleted} options={{animation: 'slide_from_bottom'}}/>
       </Stack.Navigator>
  )
}

export default AuthStack;