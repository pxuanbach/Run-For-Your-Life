import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EditScreen from './EditScreen';
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
},
{
    initialRouteName: 'Profile',
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(ProfileTabNavigator)
