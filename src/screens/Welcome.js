import React, {useState, useEffect} from 'react';
import {Text, Dimensions, TouchableOpacity , ImageBackground, AsyncStorage} from 'react-native';
import FontLoader from '../utilities/Font';
import Constants from '../utilities/Constants';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Welcome({navigation}) {

    const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("isUsed");
          console.log(value); // log 1
          if (value == 1) {
            navigation.navigate('Login');
          }
        } catch (error) {
            
        }
      };
      
    useEffect(() => {
        let isMounted = true;
        console.log("welcome")
        _retrieveData();
        return () => { isMounted = false };
    }, []);
    
    return (
        <ImageBackground source={require('../images/background.png')}
            style={{width:"100%",height:"100%"}}>
            <FontLoader>
                <Text 
                    style={{color: Constants.COLOR.white,
                    fontSize: windowHeight/10, 
                    alignSelf: 'center',
                    fontFamily: 'SemiBold',
                    marginTop: 80
                    }}>
                    Welcome!
                </Text>
            </FontLoader>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}
                style={{backgroundColor: Constants.COLOR.green,
                elevation: 8,
                height: windowHeight/10,
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 30,
                paddingVertical: 10,
                marginTop: windowHeight/2
                }}>
                <FontLoader>
                    <Text
                        style={{color: Constants.COLOR.white,
                        fontSize: windowHeight/18,
                        fontFamily: 'SemiRegular',
                        alignSelf: 'center',}}
                    >Get Started</Text>
                </FontLoader>  
            </TouchableOpacity>          
        </ImageBackground>
    )
}

export default Welcome