import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import React from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import FontLoader from '../../utilities/Font';
import Constants from '../../utilities/Constants';
import Activities from './Activities';
import ProfileTabNavigator from '../../screens/Tabs/ProfileTab/Navigator';
import Progress from './Progress';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const TopTabbar = createMaterialTopTabNavigator({
    Progress: {
        screen: Progress,
        navigationOptions: {
            tabBarLabel: 
                (<FontLoader>
                    <Text style={{
                        color: Constants.COLOR.white,
                        fontSize: windowHeight/36,
                        fontFamily: 'SemiBold',
                        alignSelf: 'center',
                    }}>Progress</Text>
                </FontLoader>),
        }
    },
    Activities: {
        screen: Activities,
        navigationOptions: {
            tabBarLabel: 
                (<FontLoader>
                    <Text style={{
                        color: Constants.COLOR.white,
                        fontSize: windowHeight/36,
                        fontFamily: 'SemiBold',
                        alignSelf: 'center',
                    }}>Activities</Text>
                </FontLoader>),
        }
    },
    ProfileTabNavigator: {
        screen: ProfileTabNavigator,
        navigationOptions: {
            tabBarLabel: 
                (<FontLoader>
                    <Text style={{
                        color: Constants.COLOR.white,
                        fontSize: windowHeight/36,
                        fontFamily: 'SemiBold',
                        alignSelf: 'center',
                    }}>Profile</Text>
                </FontLoader>),
        }
    },
},
{
    initialRouteName: "Progress",
    lazy: true,
    tabBarOptions: {
        style: {
            backgroundColor: Constants.COLOR.green
        }
    }
})

export default createAppContainer(TopTabbar);

