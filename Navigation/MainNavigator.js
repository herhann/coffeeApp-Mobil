import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; 
import Subscription from '../screens/LikedProductScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailScreen from '../screens/DetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FonstAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
    screenOptions={
      {
        headerShown: false,
      }
    }>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Subscription" component={Subscription} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        shadowColor: 'transparent',
        backgroundColor: '#171616',
      },
      
    }} 
    >
      <Tab.Screen 
      name="HomeTab" component={HomeStack} 
      options={
        {
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={24} color='#fff' />
          ),
        }
      }
      />
      <Tab.Screen name="Subscription" component={Subscription} 
      options={
        {
          tabBarIcon: ({ focused }) => (
            <FonstAwesome name={focused ? 'heart' : 'heart-o'} size={24} color='#fff' />
          ),
        }
      }
      />
    
    </Tab.Navigator>
  );
};

export default MainNavigator;