import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EditScreen from './EditScreen';
import ChangePassScreen from './ChangePassScreen';
import Profile from '../../../components/TopTabbar/Profile';

const stackNavigatorOptions = {
    headerShown:false
  }

const ProfileTabNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
    },
    EditScreen: {
        screen: EditScreen,
    },
    ChangePassScreen: {
        screen: ChangePassScreen,
    },
},
{
    initialRouteName: 'Profile',
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(ProfileTabNavigator)
