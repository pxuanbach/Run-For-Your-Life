import React, { useState, useEffect, setData } from 'react';
import { View, TouchableOpacity, Text, 
    Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import TextInputDesign from '../components/TextInputDesign'
import FontLoader from '../utilities/Font'
import Axios from 'axios';
import Constants from '../utilities/Constants';
import { ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {CustomButton} from '../components/CustomButton';

const windowHeight = Dimensions.get('window').height;

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
            <View style={{
                height: '100%', 
                width: '100%',
                backgroundColor: Constants.COLOR.green,
                overflow: 'scroll'
            }}>
                <View style={{
                    paddingVertical: windowHeight/24,
                    padding: 12,
                    flexDirection: 'column',
                    
                }}>
                    <CustomButton
                        onPress={() => navigation.push("Login")}
                        iconName='arrow-back-ios'
                        iconSize={windowHeight/20}>
                    </CustomButton>
                    <Text style={{
                        fontFamily: 'SemiBold', 
                        fontSize: windowHeight/12,
                        color: Constants.COLOR.white,
                    }}>
                        Create new Account
                    </Text>
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                    }}
                    >
                        <FontAwesome5 
                            name="running" 
                            size={windowHeight/8} 
                            color={Constants.COLOR.white} 
                        />
                    </View>
                    
                </View>
                <ScrollView style={{
                    paddingVertical: 12
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
                            iconName='mail-bulk'
                            isSecured={false}>
                        </TextInputDesign>
                        <TextInputDesign 
                            onEndEditing={(text) => {setValue("password",text)}}
                            onChangeText={(text) => setPassword(text)}
                            placeholder='Password'
                            iconName='key'
                            isSecured={true}>
                        </TextInputDesign>
                        <TextInputDesign 
                            placeholder='Re-Password'
                            iconName='key'
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
                </ScrollView>
            </View>
            
    )
}

export default Register;