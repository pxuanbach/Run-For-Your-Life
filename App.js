import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Welcome, Login, Register, BottomTabNavigator, AppLoading} from './src/screens'
import ChangePassScreen from './src/screens/ChangePassScreen';

const stackNavigatorOptions = {
  headerShown:false
}

const AppStack = createStackNavigator({
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

const AuthStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
},
{
  defaultNavigationOptions : stackNavigatorOptions
}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: AppLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading'
    }
  )
)
