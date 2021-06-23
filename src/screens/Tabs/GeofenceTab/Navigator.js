import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GeofenceTab from './GeofenceTab';
import SaveActivityScreen from './SaveActivityScreen';

const GeofenceTabNavigator = createStackNavigator({
    GeofenceTab: {
        screen: GeofenceTab,
    },
    SaveActivityScreen: {
        screen: SaveActivityScreen,
    },
});

export default createAppContainer(GeofenceTabNavigator);