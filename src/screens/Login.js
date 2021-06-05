import React, { useState } from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Dimensions} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontLoader from '../utilities/Font';
import TextInputDesign from '../components/TextInputDesign';
import Constants from '../utilities/Constants';
import Axios from "axios";

const windowHeight = Dimensions.get('window').height;

function Login({navigation}) {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
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
                style={{height: '35%', width: '100%'}}>
            </Image>
            <KeyboardAvoidingView style={{
                position: 'absolute', 
            }}>
                <Text style={{
                    fontFamily: 'SemiBold', 
                    fontSize: 70,
                    color: Constants.COLOR.white,
                    marginLeft: 12,
                    marginTop: 92,}}
                >SIGN IN</Text>
            </KeyboardAvoidingView>
        
            <View style={{
                backgroundColor: Constants.COLOR.green,
                height: '65%', width: '100%',
                alignSelf: 'center',
            }}>
                <KeyboardAvoidingView>
                    <TextInputDesign
                        placeholder='Username'
                        iconName='user'
                        isSecured={false}
                        onChangeText={(text) => setUsername(text)}
                    />
                    
                    <TextInputDesign
                        placeholder='Password'
                        iconName='lock'
                        isSecured={true}
                        onChangeText={(text)=>setPassword(text)}
                    />
                </KeyboardAvoidingView>
                
                <TouchableOpacity onPress={() => navigation.navigate('BottomTabNavigator')} 
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
                            fontSize: 21,
                            fontFamily: 'SemiRegular',
                        }}>Don't have account? </Text>
                    </FontLoader> 
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            fontSize: 22,
                            fontFamily: 'SemiRegular',
                            color: Constants.COLOR.red,
                        }}>Sign up now! </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login