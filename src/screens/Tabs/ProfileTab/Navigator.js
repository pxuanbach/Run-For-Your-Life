import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TopTabbar from './TopTabbar';
import ProfileTab from './ProfileTab';
import EditScreen from './EditScreen';
import ChangePassScreen from './ChangePassScreen';

const stackNavigatorOptions = {
    headerShown:false
  }

const ProfileTabNavigator = createStackNavigator({
    ProfileTab: {
        screen: ProfileTab,
    },
    EditScreen: {
        screen: EditScreen,
    },
    ChangePassScreen: {
        screen: ChangePassScreen,
    },
},
{
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(ProfileTabNavigator)
