import React from 'react';
import {Text ,TouchableOpacity,} from 'react-native';
import Constants from '../utilities/Constants';
import { MaterialIcons } from '@expo/vector-icons';
import FontLoader from '../utilities/Font';

const CustomButton = ({onPress, iconName, iconSize=28, 
    backgroundColor="transperant", color=Constants.COLOR.dark_green}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            backgroundColor: backgroundColor,
            height: "100%",
        }}>
            <MaterialIcons name={iconName} size={iconSize} color={color} 
                style={{alignSelf: 'center', }}/>
        </TouchableOpacity>
    )
}

const IconButtonDesign = ({onPress, width, height, text, fontSize=30,
        iconName, iconSize=30, color=Constants.COLOR.white}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            height: height,
            width: width,
            borderRadius: 10,
            backgroundColor: Constants.COLOR.green,
            alignSelf: 'center'
        }}>
            <MaterialIcons 
            name={iconName} size={iconSize} color={color} 
            style={{
                alignSelf: 'center',
                padding: 4
            }}/>
            <FontLoader>
                <Text style={{
                    color: color,
                    fontSize: fontSize,
                    fontFamily: 'SemiRegular',
                    alignSelf: 'center',
                    paddingHorizontal: 4,
                    paddingBottom: 4}}
                >{text}</Text>
            </FontLoader>  
        </TouchableOpacity>
    )
}

export {
    CustomButton,
    IconButtonDesign
} 