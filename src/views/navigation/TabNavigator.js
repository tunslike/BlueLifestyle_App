// import react
import React from 'react';

//import react native
import { View, StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import HistoryScreen from '../screens/Dashboard/HistoryScreen';
import OrderScreen from '../screens/Dashboard/OrderScreen';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';

import { COLORS, icons,images } from '../../constants';
import { TabIcon } from '../components';
import RestaurantScreen from '../screens/Resturant/RestaurantScreen';



// init bottom tab
const Tab = createBottomTabNavigator();

// create tab
const TabNavigator = () => {
    return (
        <Tab.Navigator
            
            screenOptions={{
                tabBarShowLabel:false,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.StandardardBankBlue,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    height: hp(6.8),
                    borderRadius: 50,
                    marginBottom: Platform.OS === 'ios' ? hp(3.2) : hp(2),
                    marginHorizontal:10,
                    borderTopColor: 'transparent'
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={DashboardScreen} 
                options={{
                    tabBarIcon: ({focused}) => 
                    <TabIcon 
                        focused={focused} 
                        icon={icons.home}
                        title="Home"    
                    />
                }}
                />
            <Tab.Screen 
                name="Order" 
                component={OrderScreen} 
                options={{
                    tabBarIcon: ({focused}) => 
                    <TabIcon 
                        focused={focused} 
                        icon={icons.cart}
                        title="Order"    
                    />
                }}
                />
            <Tab.Screen 
                name="History" 
                component={HistoryScreen} 
                options={{
                    tabBarIcon: ({focused}) => 
                    <TabIcon 
                        focused={focused} 
                        icon={icons.history}
                        title="History"    
                    />
                }}
                />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({focused}) => 
                    <TabIcon 
                        focused={focused} 
                        icon={icons.profile}
                        title="Profile" 
                        addStyle={{
                            marginLeft:-18,
                        }}   
                    />
                }}
                />
            <Tab.Screen 
                name="Restaurant" 
                component={RestaurantScreen} 
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
        </Tab.Navigator>
    )
};

// create stylesheer
const styles = StyleSheet.create({

})

export default TabNavigator;