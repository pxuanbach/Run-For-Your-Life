import React from 'react';
import {Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {HomeTab, NutritionTab, ProfileTab, Tab1} from './Tabs';
import CustomButton from '../components/CustomButton';
import CustomTabBar from '../components/CustomTabbar';

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
    NutritionTab: {
        screen: NutritionTab,
        navigationOptions: {
            tabBarLabel: 'Nutrition',
            tabBarIcon: ({ tintColor }) => {
                return <MaterialIcons name='food-bank' 
                size={28} style={{color: tintColor}}></MaterialIcons>
            },
            tabBarButton: (props) => {
                <CustomButton {...props}></CustomButton>
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
            },
           
        },
    }
},{
    tabBarOptions: {
        inactiveTintColor: '#fff',
        activeTintColor: 'red',
        style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0
        }
        
    }
});
  
  export default createAppContainer(BottomTabNavigator);
