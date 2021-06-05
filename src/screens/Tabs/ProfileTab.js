import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions} from 'react-native';
import FontLoader from '../../utilities/Font';
import Icon from '@expo/vector-icons/AntDesign';
import Constants from '../../utilities/Constants';
import CustomButton from '../../components/CustomButton';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ProfileTab({navigation}) {
    return (
        <SafeAreaView>
            <View
            style={{
                backgroundColor: Constants.COLOR.white,
                flexDirection: 'row-reverse',
                alignItems: "center",
                paddingHorizontal: 8,
                paddingVertical: 8,               
                paddingTop: 24
            }}>
                <CustomButton 
                    iconSize={30}
                    onPress={() => navigation.navigate('Login')}
                    iconName="exit-outline">
                </CustomButton>
                
            </View>
            <ScrollView>
                <View style={{ alignSelf: 'center', borderRadius: 100}}>
                        
                        <Image
                        source={require('../../images/back.png')}
                        style={{
                            width: 120,
                            height: 120,
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
                    
                <View style={{
                    height: '75%',
                }}>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default ProfileTab