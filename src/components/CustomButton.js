import React from 'react';
import {Text ,TouchableOpacity, View} from 'react-native';
import Constants from '../utilities/Constants';
import { MaterialIcons } from '@expo/vector-icons';
import FontLoader from '../utilities/Font';


const CustomButton = ({onPress, iconName, iconSize=28, 
    backgroundColor="transperant", color=Constants.COLOR.dark_green}) => {
    return (
    <TouchableOpacity onPress={onPress}
        style={{
            backgroundColor: backgroundColor,
            paddingHorizontal: 16,
    }}>
        <MaterialIcons name={iconName} size={iconSize} color={color} />
    </TouchableOpacity>
    )
}

const IconButtonDesign = ({onPress, width, height, text, fontSize=30,
        iconName, iconSize=30, color=Constants.COLOR.white, 
        backgroundColor=Constants.COLOR.green}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            height: height,
            width: width,
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor:backgroundColor,
            borderWidth: 0.4,
            borderColor: Constants.COLOR.second_green,
            paddingHorizontal: 4,
        }}>
            <View style={{
                flexDirection: 'row',
                height: '100%',
            }}>
                <MaterialIcons 
                name={iconName} size={iconSize} color={color} 
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
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
            </View>
        </TouchableOpacity>
    )
}

const PhraseButton = ({phrase, onPress, windowHeight, iconName="arrow-right", iconSize=30, color=Constants.COLOR.dark_green}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            flexDirection: 'row',
            paddingVertical: windowHeight/90
        }}>
            <MaterialIcons name={iconName} size={iconSize} color={color} />
            <Text style={{
                fontFamily: 'RobotoRegular',
                fontSize: windowHeight/40,
                color: Constants.COLOR.second_green,
                paddingHorizontal: 8, 
            }}>
                {phrase}.
            </Text>
        </TouchableOpacity>
    )
}

export {
    CustomButton,
    IconButtonDesign,
    PhraseButton
} 