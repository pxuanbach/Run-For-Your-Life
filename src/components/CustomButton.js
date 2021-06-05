import React from 'react';
import {Text,View,Image, TouchableOpacity,} from 'react-native';
import Constants from '../utilities/Constants';
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({onPress, iconName, iconSize=28}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            backgroundColor: "transperant",
        }}>
            <Ionicons name={iconName} size={iconSize} color={Constants.COLOR.dark_green} />
        </TouchableOpacity>
    )
}

export default CustomButton