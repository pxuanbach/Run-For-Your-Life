import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileTab from './ProfileTab';
import EditScreen from './EditScreen';

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
},
{
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(ProfileTabNavigator)
