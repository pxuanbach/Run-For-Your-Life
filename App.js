import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Welcome, Login, Register, BottomTabNavigator} from './src/screens'
import ChangePassScreen from './src/screens/Tabs/ProfileTab/ChangePassScreen';

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
  ChangePassScreen: {
    screen: ChangePassScreen,
  }
},
{
  defaultNavigationOptions : stackNavigatorOptions
}
);

export default createAppContainer(AppNavigator)
