import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/views/navigation/TabNavigator';
import WelcomeScreen from './src/views/screens/welcome/WelcomeScreen';
import SliderScreen from './src/views/screens/welcome/SliderScreen';
import LoginScreen from './src/views/screens/welcome/LoginScreen';
import DashboardScreen from './src/views/screens/Dashboard/DashboardScreen';
import RestaurantScreen from './src/views/screens/Resturant/RestaurantScreen';
import ProviderScreen from './src/views/screens/Resturant/ProviderScreen';
import OrderMenuItem from './src/views/screens/Resturant/OrderMenuItem';
import CrecheScreen from './src/views/screens/Creche/CrecheScreen';
import CrecheProviderScreen from './src/views/screens/Creche/CrecheProviderScreen';
import CrecheCompleteBookingScreen from './src/views/screens/Creche/CrecheCompleteBookingScreen';


// init stack navigator
const Stack = createNativeStackNavigator();

// create app
const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator
          screenOptions={{headerShown: false}}
       >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Slider" component={SliderScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="Home" component={DashboardScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Creche" component={CrecheScreen} />
            <Stack.Screen name="Provider" component={ProviderScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="CrecheProvider" component={CrecheProviderScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="OrderMenuItem" component={OrderMenuItem} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="CrecheComplete" component={CrecheCompleteBookingScreen} options={{animation: 'slide_from_bottom'}} />
            
       </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;