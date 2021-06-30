import React from 'react';
import {Text,View,Image, TouchableOpacity, Dimensions} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlanRecommendedCard = ({image, tittle, onPress}) => {
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
                        height: windowHeight/5, 
                        width: '100%', 
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}>
                </Image>
                <View
                style={{
                    height: windowHeight/11,
                    backgroundColor: Constants.COLOR.white,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    justifyContent: 'flex-start',
                    elevation: 7
                }}>
                    <FontLoader>
                        <Text numberOfLines={2} ellipsizeMode="tail"
                        style={{
                            fontSize: windowHeight/32,
                            fontFamily: 'SemiBold',
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 8,
                            textAlignVertical: 'top',
                        }}>
                            {tittle}
                        </Text>
                    </FontLoader>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

export default PlanRecommendedCard;