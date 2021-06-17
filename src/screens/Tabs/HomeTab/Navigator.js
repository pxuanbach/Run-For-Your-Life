import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './HomeScreen';
import ActivitiesScreen from './ActivitiesScreen';

const stackNavigatorOptions = {
    headerShown:false
  }

const HomeTabNavigator = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    ActivitiesScreen: {
        screen: ActivitiesScreen,
    },
},
{
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(HomeTabNavigator)