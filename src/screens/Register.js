import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Keyboard, 
    Dimensions, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import logo from '../images/background2.png';
import TextInputDesign from '../components/TextInputDesign'
import FontLoader from '../components/Font'
import backImage1 from '../images/regisImage.jpg';
import backImage2 from '../images/background2.png';
import Axios from 'axios';
import { color, set } from 'react-native-reanimated';
import { NavigationEvents } from 'react-navigation';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const windowHeight = Dimensions.get("window").height;

function Register({navigation}){
    const [ didKeyboardShow, setKeyboardShow ] = useState(false);
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        isValidPassword: true,
    });
const setValue = (fieldName, value) => setData({...data, [fieldName]: value});
const [username,setUsername]=useState()
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
                            onEndEditing={(text) => setValue("username",text)}
                            onChangeText={(text) => setUsername(text)}
                            placeholder='Username'
                            iconName='user'
                            isSecured={false}>
                        </TextInputDesign>
                        {  
                           <Text style = {{color: '#dfede8' ,fontSize: 10,marginLeft : 30 , fontWeight: 'bold'}}> Note:Your username must be 6-30 characters and must contain only letters, numbers, periods, and underscores</Text> 
                        
                        }
                        
                        <TextInputDesign 
                            onEndEditing={(text) => {setValue("email",text)}}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Your mail'
                            iconName='mail'
                            isSecured={false}>
                        </TextInputDesign>
                        <TextInputDesign 
                            onEndEditing={(text) => {setValue("password",text)}}
                            onChangeText={(text) => setPassword(text) }
                            placeholder='Password'
                            iconName='lock'
                            isSecured={true}>
                        </TextInputDesign>
                        <TextInputDesign 
                            onChangeText={(text) => setRePassword(text)}
                            placeholder='Re-Password'
                            iconName='lock'
                            isSecured={true}>
                        </TextInputDesign>
                    </KeyboardAvoidingView>
                    
                    <TouchableOpacity  onPress={handleRegister} 
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