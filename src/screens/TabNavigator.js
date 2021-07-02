import React from 'react';
import {Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import {PlansTab, ProfileTab} from './Tabs';
import Constants from '../utilities/Constants';
import NutritionTabNavigator from './Tabs/NutritionTab/Navigator';
import GeofenceTabNavigator from './Tabs/GeofenceTab/Navigator';
import PlansTabNavigator from './Tabs/PlansTab/Navigator';

const windowHeight = Dimensions.get('window').height;

const BottomTabNavigator = createBottomTabNavigator({
    PlansTabNavigator: {
        screen: PlansTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Plan',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialCommunityIcons name="home-outline" 
                size={30} style={{color: tintColor}} />
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
                return <MaterialCommunityIcons name="nutrition" 
                size={28} style={{color: tintColor}} />
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
    initialRouteName: 'PlansTabNavigator',
    backBehavior: 'history',
    tabBarOptions: {
        inactiveTintColor: Constants.COLOR.second_green,
        activeTintColor: Constants.COLOR.white,
        style: {
            height: 50,
            backgroundColor: Constants.COLOR.green,
            borderTopWidth: 0,
            elevation: 8
        }
        
    }
});
  
export default createAppContainer(BottomTabNavigator);
