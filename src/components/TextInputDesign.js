import React from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const heightOfView = 48;
const fontSizeOfText = 22;
const sizeOfIcon = 25;

const TextInputDesign = ({placeholder, iconName, isSecured, onChangeText, onEndEditing}) => {
    return (
        (isSecured === true) ?
        (<KeyboardAvoidingView style={{
            backgroundColor: '#fff',
            flexDirection:"row",
            alignItems:"center",
            marginHorizontal:25,
            marginTop:12,
            paddingHorizontal:10,
            borderRadius:30,
            paddingVertical:2,
            height: heightOfView
        }}>
            <FontAwesome5 name={iconName} color="#4CD964" size={sizeOfIcon}/>
            <TextInput 
                onEndEditing = {onEndEditing}
                onChangeText = {onChangeText}
                placeholder = {placeholder}
                secureTextEntry={true}
                style={{ 
                paddingHorizontal:5,
                fontSize: fontSizeOfText,
                fontFamily: 'SemiBold',
                width: '90%',
            }}/>
        </KeyboardAvoidingView>) :
        (<KeyboardAvoidingView style={{
            backgroundColor: '#fff',
            flexDirection:"row",
            alignItems:"center",
            marginHorizontal:25,
            marginTop:12,
            paddingHorizontal:10,
            borderRadius:30,
            paddingVertical:2,
            height: heightOfView
        }}>
            <FontAwesome5 name={iconName} color="#4CD964" size={sizeOfIcon}/>
            <TextInput 
                onEndEditing = {onEndEditing}
                onChangeText = {onChangeText}
                placeholder = {placeholder}
                style={{ 
                paddingHorizontal:5,
                fontSize: fontSizeOfText,
                fontFamily: 'SemiBold',
                width: '90%',
            }}/>
        </KeyboardAvoidingView>)
    )
}

export default TextInputDesign