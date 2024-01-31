import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import RestaurantScreen from '../screens/Resturant/RestaurantScreen';
import ProviderScreen from '../screens/Resturant/ProviderScreen';
import OrderMenuItem from '../screens/Resturant/OrderMenuItem';
import CrecheScreen from '../screens/Creche/CrecheScreen';
import CrecheProviderScreen from '../screens/Creche/CrecheProviderScreen';
import CrecheCompleteBookingScreen from '../screens/Creche/CrecheCompleteBookingScreen';
import GymScreen from '../screens/Gym/GymScreen';
import GymDetailsScreen from '../screens/Gym/GymDetailsScreen';
import RestaurantOrderScreen from '../screens/Resturant/RestaurantOrderScreen';
import GymCompleteBookingScreen from '../screens/Gym/GymCompleteBookingScreen';
import UpdateProfile from '../screens/welcome/UpdateProfile';
import UpdateCompleted from '../screens/welcome/UpdateCompleted';
import RestaurantCompleteBookingScreen from '../screens/Resturant/RestaurantCompleteBookingScreen';
import RestaurantHistory from '../screens/Resturant/RestaurantHistory';
import GymHistory from '../screens/Gym/GymHistory';
import CrecheHistory from '../screens/Creche/CrecheHistory';
import CrecheRegistration from '../screens/Creche/CrecheRegistration';

// init stack navigator
const Stack = createNativeStackNavigator();

// create app
const AppStack = () => {
  return (

       <Stack.Navigator
          screenOptions={{headerShown: false}}
       >
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="Home" component={DashboardScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Gym" component={GymScreen} />
            <Stack.Screen name="Creche" component={CrecheScreen} />
            <Stack.Screen name="CrecheRegistration" component={CrecheRegistration} />
            <Stack.Screen name="Provider" component={ProviderScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="RestaurantOrder" component={RestaurantOrderScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name="RestaurantHistory" component={RestaurantHistory} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name="GymHistory" component={GymHistory} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name="CrecheHistory" component={CrecheHistory} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name="CrecheProvider" component={CrecheProviderScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="OrderMenuItem" component={OrderMenuItem} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="GymDetails" component={GymDetailsScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="CrecheComplete" component={CrecheCompleteBookingScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="GymComplete" component={GymCompleteBookingScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile}/>
            <Stack.Screen name="CompleteProfile" component={UpdateCompleted} options={{animation: 'slide_from_bottom'}}/>
            <Stack.Screen name="RestaurantComplete" component={RestaurantCompleteBookingScreen} options={{animation: 'slide_from_bottom'}}/>
       </Stack.Navigator>
  )
}

export default AppStack;