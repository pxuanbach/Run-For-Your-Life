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
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        isValidPassword: true,
    });
const setValue = (fieldName, value) => setData({...data, [fieldName]: value});
const [username,setUsername]=useState("")
const [password,setPassword]=useState()
const [email,setEmail]= useState()
const [RePassword,setRePassword]=useState()

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function ValidUser(username) {
    /* 
      Usernames can only have: 
      - Lowercase Letters (a-z) 
      - Numbers (0-9)
      - Dots (.)
      - Underscores (_)

    */
   if (!username) return 0
   if (username.length >=6 && username.length <= 30)  {
    const res = /^[a-z0-9_\.]+$/.exec(username);
    const valid = !!res;
    return valid;
   }
   return 0
  }

  const handleRegister =() => {

    console.log(username,email,password,RePassword)
    if (!ValidUser(username)) {

        Alert.alert(
            "Oops!",
            "Username không hợp lệ!",
          )
        return 0
    }
    if (!ValidateEmail(email)) {
        Alert.alert(
            "Oops!",
            "Email không hợp lệ",
          )
        return 0
    }
    if ((password == "" || password == undefined)) {
        Alert.alert(
            "Oops!",
            "Vui lòng nhập mật khẩu",
          )
        return 0}
    if ((password != RePassword)) {
        Alert.alert(
        "Oops!",
        "Bạn đã nhập sai RePassword",
      )
        return 0
    }
    
    Axios.post("https://runapp1108.herokuapp.com/api/users/register",{username,password,email})
    .then((res)=>{
        console.log(res)
        Alert.alert(
            "Success ✓ Username: ",
            username,
            
            [
              
              {text: "OK", onPress: () =>  Alert.alert("Don't forgot your password",password,
                        
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
            "Oops! :(",
            "Username đã tồn tại!!",
    
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
                    paddingTop: windowHeight/24,
                    paddingHorizontal: 12,
                    flexDirection: 'column',
                    
                }}>
                    <CustomButton
                        onPress={() => navigation.push("Login")}
                        iconName='arrow-back-ios'
                        iconSize={windowHeight/20}>
                    </CustomButton>
                </View>
                <ScrollView style={{
                    paddingVertical: 4
                }}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{
                            width: '75%',
                            paddingLeft: 8
                        }}>
                            <Text style={{
                                fontFamily: 'SemiBold', 
                                fontSize: windowHeight/14,
                                color: Constants.COLOR.white,
                            }}>
                                Create new Account
                            </Text>
                        </View>
                        
                        <View style={{
                            width: '25%',
                            justifyContent: 'center'
                        }}>
                            <FontAwesome5 
                                name="running" 
                                size={windowHeight/8} 
                                color={Constants.COLOR.white} 
                            />
                        </View>
                    </View>
                    
                    <KeyboardAvoidingView>
                            <TextInputDesign
                                onEndEditing={(text) => setValue("username",text)}
                                onChangeText={(text) => setUsername(text)}
                                placeholder='Username'
                                iconName='user-alt'
                                isSecured={false}>
                            </TextInputDesign>
                            {username != "" &&
                            <Text style={{
                                color: '#dfede8' ,
                                fontSize: windowHeight/46,
                                marginLeft: 30, 
                                fontWeight: 'bold'
                            }}> 
                                Username must be 6-30 characters.
                            </Text> 
                            
                            }
                            
                            <TextInputDesign 
                                onEndEditing={(text) => {setValue("email",text)}}
                                onChangeText={(text) => setEmail(text)}
                                placeholder='Your mail'
                                iconName='mail-bulk'
                                isSecured={false}>
                            </TextInputDesign>
                            <TextInputDesign 
                                onEndEditing={(text) => {setValue("password",text)}}
                                onChangeText={(text) => setPassword(text) }
                                placeholder='Password'
                                iconName='key'
                                isSecured={true}>
                            </TextInputDesign>
                            <TextInputDesign 
                                onChangeText={(text) => setRePassword(text)}
                                placeholder='Re-Password'
                                iconName='key'
                                isSecured={true}>
                            </TextInputDesign>
                    </KeyboardAvoidingView>
                    
                    <TouchableOpacity onPress={handleRegister}  
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