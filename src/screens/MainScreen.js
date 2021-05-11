import React from 'react';
import {Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HomeTab from './Tab/HomeTab';
import Tab1 from './Tab/Tab1';
import NutritionTab from './Tab/NutritionTab';
import ProfileTab from './Tab/ProfileTab';

const MainScreen = createBottomTabNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialIcons name='home' 
                size={28} style={{color: tintColor}}></MaterialIcons>
            }
        }
    },
    Tab1: {
        screen: Tab1,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => {
                return <AntDesign name='profile' 
                size={28} style={{color: tintColor}}></AntDesign>
            }
        }
    },
    NutritionTab: {
        screen: NutritionTab,
        navigationOptions: {
            tabBarLabel: 'Nutrition',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialIcons name='food-bank' 
                size={28} style={{color: tintColor}}></MaterialIcons>
            }
        }
    },
    ProfileTab: {
        screen: ProfileTab,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => {
                return <AntDesign name='profile' 
                size={28} style={{color: tintColor}}></AntDesign>
            }
        }
    }
},{
    tabBarOptions: {
        inactiveTintColor: '#fff',
        activeTintColor: 'red',
        style: {
            backgroundColor: '#4CD964'
        }
    }
});
  
  export default createAppContainer(MainScreen);
