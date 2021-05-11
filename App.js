import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import MainScreen from './src/screens/MainScreen';

const stackNavigatorOptions = {
  headerShown:false
}

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  MainScreen: {
    screen: MainScreen,
  }
},
{
  defaultNavigationOptions : stackNavigatorOptions
}
);

export default createAppContainer(AppNavigator)
