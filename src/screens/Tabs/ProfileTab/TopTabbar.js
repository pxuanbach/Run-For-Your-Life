import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import React from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import FontLoader from '../../../utilities/Font';
import Constants from '../../../utilities/Constants';
import Activities from './Activities';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const TopTabbar = createMaterialTopTabNavigator({
    Progress: {
        screen: () => null,
        navigationOptions: {
            tabBarLabel: 
                (<FontLoader>
                    <Text style={{
                        color: Constants.COLOR.second_green,
                        fontSize: windowHeight/38,
                        fontFamily: 'SemiRegular',
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
                        color: Constants.COLOR.second_green,
                        fontSize: windowHeight/38,
                        fontFamily: 'SemiRegular',
                        alignSelf: 'center',
                    }}>Activities</Text>
                </FontLoader>),
        }
    },
    Profile: {
        screen: () => null,
        navigationOptions: {
            tabBarLabel: 
                (<FontLoader>
                    <Text style={{
                        color: Constants.COLOR.second_green,
                        fontSize: windowHeight/38,
                        fontFamily: 'SemiRegular',
                        alignSelf: 'center',
                    }}>Profile</Text>
                </FontLoader>),
        }
    },
},
{
    initialRouteName: "Activities",
    tabBarOptions: {
        style: {
            backgroundColor: Constants.COLOR.white
        }
    }
})

export default createAppContainer(TopTabbar);

