import React, { useState, useEffect } from 'react';
import {
    View, AsyncStorage, ActivityIndicator, Alert
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import Axios from 'axios';

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
    //Dang xu ly
    const tokenValid = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            const token = await AsyncStorage.getItem("authToken");
            console.log("token: " + token);   //username + token
            if (token !== null) {
                const hearders = {
                    'auth-token': token,
                }
                Axios.get("https://runapp1108.herokuapp.com/api/users/", {
                    headers: hearders,
                    timeout: 3000,
                })
                .then((res)=>{
                    console.log(res.status);
                    if (value !== null)
                        navigation.navigate('App');
                    else
                        navigation.navigate('Auth');
                })
                .catch((err)=>{
                    console.log(err);
                    navigation.navigate('Auth');
                })
            }
            else
                navigation.navigate('Auth');
          } catch (error) {
          }
        
    }

    useEffect(() => {
        let isMounted = true;
        console.log("apploading");
        tokenValid();
        //_retrieveData();
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