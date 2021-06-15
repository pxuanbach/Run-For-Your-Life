import React from 'react';
import {Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {HomeTab, GeofenceTab, ProfileTab} from './Tabs';
import Constants from '../utilities/Constants';
import NutritionTabNavigator from './Tabs/NutritionTab/Navigator';

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
    GeofenceTab: {
        screen: GeofenceTab,
        navigationOptions: {
            tabBarLabel: 'More',
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
            tabBarLabel: 'You',
            tabBarIcon: ({ tintColor }) => {
                return <AntDesign name='user' 
                size={28} style={{color: tintColor}}></AntDesign>
            },
        },
    }
},{
    initialRouteName: 'HomeTab',
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
