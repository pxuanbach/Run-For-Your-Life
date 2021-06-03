import React from 'react';
import {Text, View, TouchableOpacity , ImageBackground} from 'react-native';
import FontLoader from '../utilities/Font';
import Constants from '../utilities/Constants';

function Welcome({navigation}) {
    return (
        <ImageBackground source={require('../images/background.png')}
            style={{width:"100%",height:"100%"}}>
            <FontLoader>
                <Text 
                    style={{color: Constants.COLOR.white,
                    fontSize: 55, 
                    alignSelf: 'center',
                    fontFamily: 'SemiBold',
                    marginTop: 100,
                    }}>
                    Welcome!
                </Text>
            </FontLoader>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}
                style={{backgroundColor: Constants.COLOR.green,
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
                        style={{color: Constants.COLOR.white,
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