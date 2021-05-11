import React from 'react';
import FontLoader from '../../components/Font';
import {Text, View, Image, ImageBackground, ScrollView} from 'react-native';
import TouchableOpacityDesign from '../../components/TouchableOpacityDesign';

function NutritionTab() {
    return (
        <ScrollView style={{
            flexDirection: 'column'
        }}>
            <ImageBackground 
            source={require('../../images/foodImage.jpg')}
            style={{width: '100%', flex: 1}}>
                <FontLoader>
                    <View style={{
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        borderRadius: 18,
                        marginTop: 20,
                        marginLeft: 8,
                        padding: 3
                    }}>
                        <Text style={{
                            color: 'black',
                            fontFamily: 'SemiBold',
                            fontSize: 24,
                        }}>
                            Calories consumed:
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'flex-end', 
                    }}>
                        <Text style={{
                            fontFamily: 'SemiBold',
                            fontSize: 55,
                            color: '#145A00',
                            marginRight: 10,
                            
                        }}>
                            400
                        </Text>
                        <Text style={{
                            fontFamily: 'SemiBold',
                            fontSize: 24,
                            top: 33,
                            color: '#fff',
                            marginRight: 5,
                        }}>
                            calories.
                        </Text>
                        
                    </View>
                </FontLoader>
            </ImageBackground>
            <View style={{
                flex: 2,
                margin: 8
            }}>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiRegular",
                        fontSize: 24,
                    }}>
                        You should
                    </Text>
                </FontLoader>
                <TouchableOpacityDesign 
                    text='Giảm cân'
                    image={require('../../images/foodImage.jpg')}
                >

                </TouchableOpacityDesign>
            </View>
        </ScrollView>
    )
}

export default NutritionTab