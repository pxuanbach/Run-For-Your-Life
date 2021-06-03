import React, { useState, useEffect, setData } from 'react';
import { View, TouchableOpacity, Text, Image, Keyboard, 
    Dimensions, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import TextInputDesign from '../components/TextInputDesign'
import FontLoader from '../utilities/Font'
import backImage from '../images/background2.png';
import Axios from 'axios';
import Constants from '../utilities/Constants';

const windowHeight = Dimensions.get("window").height;

function Register({navigation}){
    const setValue = (fieldName, value) => setData({...data, [fieldName]: value});
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [email,setEmail] = useState()

    const handleRegister =() => {
        console.log(username,password,email)
        Axios.post("https://runapp1108.herokuapp.com/api/users/register",{username,password,email})
        .then((res)=>{
            console.log(res)
            Alert.alert(
                "Đăng ký thành công! Username: ",
                username,
                [
                  {
                      text: "OK", onPress: () =>  
                        Alert.alert("Don't forgot your password",password,
                            [                        
                                { text: "OK", onPress: () =>navigation.navigate('Login')}
                            ]
                        )
                    }
                ]
            );
        })
        .catch((err)=>{
            Alert.alert(
                "Đăng ký không thành công! :(",
                "Username đã tồn tại hoặc bạn nhập thông tin chưa chính xác",
              );
        })
    }


    return(
        <KeyboardAvoidingView behavior='height'>
            <ScrollView>
                <View style={{
                    height: windowHeight/3,
                    
                }}>
                    <Image source={backImage}
                        style={{
                            height: '100%',
                            width: '100%',
                    }}>
                    </Image>
                    <KeyboardAvoidingView
                        style={{position: 'absolute'}}
                    >
                        <Text style={{
                            fontFamily: 'SemiBold', 
                            fontSize: 60,
                            color: Constants.COLOR.white,
                            alignSelf: 'center',
                            marginLeft: 12,
                            marginTop: 90,
                        }}>SIGN UP</Text>
                    </KeyboardAvoidingView>
                </View>
                <View style={{
                    backgroundColor: Constants.COLOR.green,
                    height: 2*windowHeight/3, width: '100%',
                    alignSelf: 'center',
                }}>
                    <KeyboardAvoidingView>
                        <TextInputDesign
                            onEndEditing={(text) => setValue("username",text)}
                            onChangeText={(text) => setUsername(text)}
                            placeholder='Username'
                            iconName='user'
                            isSecured={false}>
                        </TextInputDesign>
                        <TextInputDesign 
                            onEndEditing={(text) => {setValue("email",text)}}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Your mail'
                            iconName='mail'
                            isSecured={false}>
                        </TextInputDesign>
                        <TextInputDesign 
                            onEndEditing={(text) => {setValue("password",text)}}
                            onChangeText={(text) => setPassword(text)}
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
                        backgroundColor: Constants.COLOR.white,
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
                                color: Constants.COLOR.green,
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