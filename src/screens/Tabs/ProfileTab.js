import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, ImageBackground, Image} from 'react-native';
import FontLoader from '../../utilities/Font';
import Icon from '@expo/vector-icons/AntDesign';
import Constants from '../../utilities/Constants';
import { SafeAreaView } from 'react-native';

function ProfileTab() {
    return (
        <SafeAreaView>
            <View>
                
            </View>
            <ScrollView>
                <View style={{
                    height: '25%',
                    width: '100%',
                }}>
                    <View style={{ alignSelf: 'center', borderRadius: 100}}>
                        
                        <Image
                        source={require('../../images/back.png')}
                        style={{
                            marginTop: 50,
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            overflow: 'hidden',
                        }}></Image>
                        <TouchableOpacity //onPress={() => }
                        style={{
                                position: 'absolute',
                                top: 217,
                                left: 168,
                            }}>
                                <Icon name="pluscircle" size={32} color={Constants.COLOR.second_green}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flex: 1,
                            alignSelf: 'center', 
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}>
                            <FontLoader>
                                <Text style={{
                                    fontFamily: 'SemiRegular',
                                    fontSize: 24,
                                }}>
                                    Phạm Xuân Bách
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'Montserrat',
                                }}>
                                    pxuanbach1412@gmail.com
                                </Text>
                            </FontLoader>
                        </View>
                        <TouchableOpacity //onPress={() => }
                        style={{
                            flex: 1,
                            position: 'absolute',
                            paddingHorizontal: 15,
                        }}>
                                <Icon name="edit" size={28} color={Constants.COLOR.second_green}/>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{
                    height: '75%',
                }}>

                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default ProfileTab