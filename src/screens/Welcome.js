import React from 'react';
import {Text, View, TouchableOpacity , ImageBackground} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontLoader from '../components/Font';
import Feather from 'react-native-vector-icons/Feather';

function Welcome({navigation}) {
    return (
        <ImageBackground source={require('../images/background.png')}
            style={{width:"100%",height:"100%"}}>
            <FontLoader>
                <Text 
                    style={{color: '#FFFFFF',
                    fontSize: 55, 
                    alignSelf: 'center',
                    fontFamily: 'SemiBold',
                    marginTop: 100,
                    }}>
                    Welcome!
                </Text>
            </FontLoader>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}
                style={{backgroundColor: '#4CD964',
                elevation: 8,
                height: '10%',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 350,
                marginHorizontal: 30,
                paddingVertical: 10,
                }}>
                <FontLoader>
                    <Text
                        style={{color: '#fff',
                        fontSize: 35,
                        fontFamily: 'SemiRegular',
                        alignSelf: 'center',}}
                    >Get Started</Text>
                </FontLoader>  
            </TouchableOpacity>          
        </ImageBackground>
    )
}

export default Welcome