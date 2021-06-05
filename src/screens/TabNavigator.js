import React from 'react';
import {Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {HomeTab, NutritionTab, ProfileTab, Tab1} from './Tabs';
import NutritionTabNavigator from '../screens/Tabs/NutritionTab/Navigator'
import Constants from '../utilities/Constants';

const BottomTabNavigator = createBottomTabNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialIcons name='home' 
                size={28} style={{color: tintColor}}></MaterialIcons>
            },
        }
    },
    Tab1: {
        screen: Tab1,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => {
                return <AntDesign name='profile' 
                size={28} style={{color: tintColor}}></AntDesign>
            },
        }
    },
    NutritionTabNavigator: {
        screen: NutritionTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Nutrition',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialIcons name='food-bank' 
                size={28} style={{color: tintColor}}></MaterialIcons>
            },
        }
    },
    ProfileTab: {
        screen: ProfileTab,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => {
                return <AntDesign name='user' 
                size={28} style={{color: tintColor}}></AntDesign>
            },
        },
    }
},{
    tabBarOptions: {
        inactiveTintColor: Constants.COLOR.second_green,
        activeTintColor: Constants.COLOR.white,
        style: {
            height: 54,
            backgroundColor: Constants.COLOR.green,
            borderTopWidth: 0
        }
        
    }
});
  
  export default createAppContainer(BottomTabNavigator);
