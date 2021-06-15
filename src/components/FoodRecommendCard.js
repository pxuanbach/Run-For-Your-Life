import React from 'react';
import {Text,View,Image, TouchableOpacity,} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const FoodRecommendCard = ({image, text, onPress, h = 90, w = 400}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            width: '100%',
            marginTop: 12,
            elevation: 7
        }}>
            <View style={{
                elevation: 8
            }}>
                <Image
                    source={image}
                    style={{height: h/7, width: '100%', borderRadius: 15,}}>
                </Image>
                <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: h/18,
                    width: w/2 - 16,
                    backgroundColor: Constants.COLOR.white,
                    borderTopLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 7,
                }}>
                    <FontLoader>
                        <Text style={{
                            position: 'absolute',
                            fontSize: h/28,
                            fontFamily: 'SemiBold',
                            color: Constants.COLOR.dark_green
                        }}>
                            {text}
                        </Text>
                    </FontLoader>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

export default FoodRecommendCard;