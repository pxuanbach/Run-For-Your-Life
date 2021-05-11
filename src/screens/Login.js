import React from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, KeyboardAvoidingViewBase, Dimensions} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontLoader from '../components/Font';
import TextInputDesign from '../components/TextInputDesign';
import Register from '../screens/Register';
import MainScreen from '../screens/MainScreen';

const windowHeight = Dimensions.get('window').height;

function Login({navigation}) {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

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
                    />
                    
                    <TextInputDesign
                        placeholder='Password'
                        iconName='lock'
                        isSecured={true}
                    />
                </KeyboardAvoidingView>
                
                <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} 
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