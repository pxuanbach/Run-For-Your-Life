import React from 'react';
import {Text,View,Image, TouchableOpacity, Dimensions} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const FoodRecommendCard = ({image, text, onPress}) => {
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
                    source={{
                        uri: image
                    }}
                    style={{height: windowHeight/7, width: '100%', borderRadius: 15,}}>
                </Image>
                <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: windowHeight/18,
                    width: windowWidth/2 - 16,
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
                            fontSize: windowHeight/28,
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