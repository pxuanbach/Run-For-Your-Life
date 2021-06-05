import React from 'react';
import {Text,View,Image, TouchableOpacity,} from 'react-native';
import Constants from '../utilities/Constants';
import { AntDesign } from '@expo/vector-icons';

const CustomButton = ({onPress, iconName}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            alignItems: "center",
            backgroundColor: "transperant"
        }}>
            <AntDesign name={iconName} size={35} color={Constants.COLOR.dark_green} />
        </TouchableOpacity>
    )
}

export default CustomButton