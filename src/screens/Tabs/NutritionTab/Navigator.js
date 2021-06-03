import React from 'react';
import {Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FontLoader from '../../../utilities/Font';
import FoodScreen from './FoodScreen';
import NutritionTab from './NutritionTab';

const stackNavigatorOptions = {
    headerShown:false
  }

const NutritionTabNavigator = createStackNavigator({
    NutritionTab: {
        screen: NutritionTab,
    },
    FoodScreen: {
        screen: FoodScreen,
    },
},
{
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(NutritionTabNavigator)
