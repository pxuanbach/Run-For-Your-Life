import React from 'react';
import {Text,View,Image, TouchableOpacity, Dimensions} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlanRecommendedCard = ({image, tittle, text, onPress}) => {
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
                    style={{
                        height: windowHeight/4, 
                        width: '100%', 
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}>
                </Image>
                <View
                style={{
                    height: windowHeight/12,
                    backgroundColor: Constants.COLOR.white,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 7
                }}>
                    <FontLoader>
                        <Text style={{
                            fontSize: windowHeight/28,
                            fontFamily: 'SemiBold',
                            color: Constants.COLOR.dark_green
                        }}>
                            {tittle}
                        </Text>
                        <Text style={{
                            fontSize: windowHeight/40,
                            fontFamily: 'SemiRegular',
                            color: Constants.COLOR.second_green
                        }}>
                            {text}
                        </Text>
                    </FontLoader>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

export default PlanRecommendedCard;