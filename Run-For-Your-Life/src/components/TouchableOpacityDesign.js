import React from 'react';
import {Text,View,Image, TouchableOpacity,} from 'react-native';
import FontLoader from '../components/Font';

const TouchableOpacityDesign = ({image, text}) => {
    return (
        <TouchableOpacity style={{
            width: '100%',
            alignItems: 'center',
            borderRadius: 20,
            justifyContent: 'center',
        }}>
            <Image
                source={require('../images/foodImage.jpg')}
                style={{height: 90, width: '100%', borderRadius: 15}}>
            </Image>
            <FontLoader>
                <Text style={{
                    position: 'absolute',
                    fontSize: 24,
                    fontFamily: 'RobotoBold',
                    color: '#fff'
                }}>
                    {text}
                </Text>
            </FontLoader>
            
        </TouchableOpacity>
    )
}

export default TouchableOpacityDesign;