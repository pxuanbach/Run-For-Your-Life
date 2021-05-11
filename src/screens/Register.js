import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Keyboard, 
    Dimensions, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import logo from '../images/background2.png';
import TextInputDesign from '../components/TextInputDesign'
import FontLoader from '../components/Font'
import backImage1 from '../images/regisImage.jpg';
import backImage2 from '../images/background2.png';

const windowHeight = Dimensions.get("window").height;

function Register({navigation}){
    const [ didKeyboardShow, setKeyboardShow ] = useState(false);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        //  Don't forget to cleanup with remove listeners
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    
    const _keyboardDidShow = () => {
        setKeyboardShow(true) 
    }

    const _keyboardDidHide = () => {
        setKeyboardShow(false)
    }

    const handleValidUser = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const createAlert = () =>
        Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );

    return(
        <KeyboardAvoidingView behavior='height'>
            <ScrollView style={{backgroundColor: '#D3D2D2'}}>
                <View style={{
                    height: windowHeight/3,
                    
                }}>
                    {didKeyboardShow &&
                        <Image source={backImage1}
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'stretch',
                        }}>
                        </Image>
                    }
                    {!didKeyboardShow &&
                    <Image source={backImage2}
                        style={{
                            height: '100%',
                            width: '100%',
                    }}>
                    </Image> }
                    <KeyboardAvoidingView
                        style={{position: 'absolute'}}
                    >
                        {didKeyboardShow &&
                        <Text style={{
                            fontFamily: 'SemiBold', 
                            fontSize: 60,
                            color: '#4CD964',
                            alignSelf: 'center',
                            marginLeft: 12,
                            marginTop: 98,
                        }}>SIGN UP</Text>}
                        {!didKeyboardShow &&
                        <Text style={{
                            fontFamily: 'SemiBold', 
                            fontSize: 60,
                            color: '#fff',
                            alignSelf: 'center',
                            marginLeft: 12,
                            marginTop: 90,
                        }}>SIGN UP</Text>}
                    </KeyboardAvoidingView>
                </View>
                <View style={{
                    backgroundColor: '#4CD964',
                    height: 2*windowHeight/3, width: '100%',
                    alignSelf: 'center',
                }}>
                    <KeyboardAvoidingView>
                        <TextInputDesign
                            onChangeText={(text) => textInputChange(text)}
                            placeholder='Username'
                            iconName='user'
                            isSecured={false}>
                        </TextInputDesign>
                        {!data.isValidUser ?
                           <Text>Not valid username</Text> : null
                        }
                        <TextInputDesign 
                            placeholder='Your mail'
                            iconName='mail'
                            isSecured={false}>
                        </TextInputDesign>
                        <TextInputDesign 
                            placeholder='Password'
                            iconName='lock'
                            isSecured={true}>
                        </TextInputDesign>
                        <TextInputDesign 
                            placeholder='Re-Password'
                            iconName='lock'
                            isSecured={true}>
                        </TextInputDesign>
                    </KeyboardAvoidingView>
                    
                    <TouchableOpacity //Log In: onPress={() => navigate()} 
                        style={{
                        backgroundColor: '#fff',
                        elevation: 8,
                        alignItems: 'center',
                        borderRadius: 25,
                        marginHorizontal: 25,
                        justifyContent: 'center',
                        paddingVertical: 4,
                        marginTop: 20
                        }}>
                        <FontLoader>
                            <Text style={{
                                color: '#4CD964',
                                fontSize: 35,
                                fontFamily: 'SemiRegular',
                                alignSelf: 'center',}}
                            >Sign Up</Text>
                        </FontLoader>  
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register;