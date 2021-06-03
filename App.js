import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Welcome, Login, Register, BottomTabNavigator, FoodScreen} from './src/screens'

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
  BottomTabNavigator: {
    screen: BottomTabNavigator,
  },
},
{
  defaultNavigationOptions : stackNavigatorOptions
}
);

export default createAppContainer(AppNavigator)
