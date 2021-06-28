import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PlansTab from './PlansTab';
import PlanScreen from './PlanScreen';

const stackNavigatorOptions = {
    headerShown:false
}

const PlansTabNavigator = createStackNavigator({
    PlansTab: {
        screen: PlansTab,
    },
    PlanScreen: {
        screen: PlanScreen,
    },
},
{
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(PlansTabNavigator)
