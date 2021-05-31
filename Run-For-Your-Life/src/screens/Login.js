import React from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, KeyboardAvoidingViewBase, Dimensions, Button, Alert} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontLoader from '../components/Font';
import TextInputDesign from '../components/TextInputDesign';
import Register from '../screens/Register';
import {BottomTabNavigator} from '../screens';
import { useState } from 'react';
import Axios from "axios"

const windowHeight = Dimensions.get('window').height;

function Login({navigation}) {


    //SetData Bach
    // const [data, setData] = React.useState({
    //     username: '',
    //     password: '',
    //     check_textInputChange: false,
    //     secureTextEntry: true,
    //     isValidUser: true,
    //     isValidPassword: true,
    // });

//SetData Thinh
    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const handleLogin =() => {
    console.log(username,password);    
    Axios.post("https://runapp1108.herokuapp.com/api/users/login",{username,password})
    .then((res)=>{
        navigation.navigate('BottomTabNavigator')
    })
    .catch((err)=>{
        Alert.alert(
            "Oops!",
            "Tài khoản hoặc mật khẩu sai rồi!!!",
        );
                
    })
        


    }

    const isValidMail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            setData({ email: text })
            return false;
        }
        else {
            setData({ email: text })
            console.log("Email is Correct");
        }
    }

    return(
        <View>
            <Image
                source={require('../images/background2.png')}
                style={{height: windowHeight/3, width: '100%'}}>
            </Image>
            <KeyboardAvoidingView style={{
                position: 'absolute', 
            }}>
                <Text style={{
                    fontFamily: 'SemiBold', 
                    fontSize: 70,
                    color: '#fff',
                    marginLeft: 12,
                    marginTop: 92,}}
                >SIGN IN</Text>
            </KeyboardAvoidingView>
        
            <View style={{
                backgroundColor: '#4CD964',
                height: 2*windowHeight/3, width: '100%',
                alignSelf: 'center',
            }}>
                <KeyboardAvoidingView>
                    <TextInputDesign
                        placeholder='Username'
                        iconName='user'
                        isSecured={false}
                      
                        onChangeText={(text)=>setUsername(text)
                
                        }
                    />
                    
                    <TextInputDesign
                        placeholder='Password'
                        iconName='lock'
                        isSecured={true}
                     
                        onChangeText={(text)=>setPassword(text)}
                    

                        
                    />
                </KeyboardAvoidingView>
                
                <TouchableOpacity onPress={handleLogin}
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
                        >Sign In</Text>
                    </FontLoader>  
                </TouchableOpacity>

                <View style={{
                    marginTop: 20,
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    <FontLoader>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'SemiRegular',
                        }}>Don't have account? </Text>
                    </FontLoader> 
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'SemiRegular',
                            color: 'red',
                        }}>Sign up now! </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login