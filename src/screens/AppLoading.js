import React, { useState, useEffect } from 'react';
import {
    View, AsyncStorage, ActivityIndicator
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

function AppLoading({navigation}) {
    const [isSignIn, setIsSignIn] = useState(false);

    const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("username");
          console.log(value);   //username
          if (value !== null) {
            navigation.navigate('App');
          }
          else {
              navigation.navigate('Auth');
          }

        } catch (error) {
        }
      };

    useEffect(() => {
        let isMounted = true;
        _retrieveData();
        return () => { isMounted = false };
    }, []);
    
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Constants.COLOR.green
        }}>
            <ActivityIndicator size={50} color={Constants.COLOR.white}/>
        </View>
    )
}

export default AppLoading