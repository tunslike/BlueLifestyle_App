// import react
import React from 'react';

//import react native
import { View, StyleSheet } from 'react-native';
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
                    height:60,
                    borderRadius: 50,
                    marginBottom:10,
                    marginHorizontal:5,
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
                        title="Cart"    
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