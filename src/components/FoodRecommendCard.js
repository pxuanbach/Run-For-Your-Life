import React from 'react';
import {Text,View,Image, TouchableOpacity,} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const FoodRecommendCard = ({image, text, onPress, h = 90}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            width: '100%',
            alignItems: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 10
        }}>
            <Image
                source={image}
                style={{height: h/7, width: '100%', borderRadius: 15}}>
            </Image>
            <FontLoader>
                <Text style={{
                    position: 'absolute',
                    fontSize: h/22,
                    fontFamily: 'RobotoBold',
                    color: Constants.COLOR.black
                }}>
                    {text}
                </Text>
            </FontLoader>
            
        </TouchableOpacity>
    )
}

export default FoodRecommendCard;