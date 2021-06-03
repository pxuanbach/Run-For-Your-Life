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

const windowHeight = Dimensions.get("window").height;

function Register({navigation}){
    const [ didKeyboardShow, setKeyboardShow ] = useState(false);
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
const setValue = (fieldName, value) => setData({...data, [fieldName]: value});
const [username,setUsername]=useState()
const [password,setPassword]=useState()
const [email,setEmail]= useState()


const handleRegister =() => {
    console.log(username,password,email)
    Axios.post("https://runapp1108.herokuapp.com/api/users/register",{username,password,email})
    .then((res)=>{
        console.log(res)
        Alert.alert(
            "Đăng ký thành công! Username: ",
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
            "Đăng ký không thành công! :(",
            "Username đã tồn tại hoặc bạn nhập thông tin chưa chính xác",
    
          );
    })


    
  
}


    // useEffect(() => {
    //     Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    //     Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
    //     //  Don't forget to cleanup with remove listeners
    //     return () => {
    //       Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    //       Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    //     };
    // }, []);
    
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
                            onEndEditing={(text) => setValue("username",text)}
                            onChangeText={(text) => setUsername(text)}
                            placeholder='Username'
                            iconName='user'
                            isSecured={false}>
                        </TextInputDesign>
                        {!data.isValidUser ?
                           <Text>Not valid username</Text> : null
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