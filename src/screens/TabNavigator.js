import React from 'react';
import {Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import {HomeTab, Tab1} from './Tabs';
import Constants from '../utilities/Constants';
import NutritionTabNavigator from './Tabs/NutritionTab/Navigator';
import ProfileTabNavigator from './Tabs/ProfileTab/Navigator';
import GeofenceTabNavigator from './Tabs/GeofenceTab/Navigator';

const windowHeight = Dimensions.get('window').height;

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
    GeofenceTabNavigator: {
        screen: GeofenceTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Record',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialCommunityIcons name="record-circle-outline" 
                size={28} style={{color: tintColor}}></MaterialCommunityIcons>
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
    ProfileTabNavigator: {
        screen: ProfileTabNavigator,
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
            height: 58,
            backgroundColor: Constants.COLOR.green,
            borderTopWidth: 0
        }
        
    }
});
  
  export default createAppContainer(BottomTabNavigator);
