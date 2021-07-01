import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { CustomButton } from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import { WebView } from 'react-native-webview';
import { StackActions, NavigationActions } from 'react-navigation';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


function PlanScreen({navigation}) {
    return (
        <SafeAreaView>
            {/* header */}
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.green,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 2,
                paddingVertical: 4,               
                paddingTop: windowHeight/26
            }}>
                <View style={{
                    width: '13%'
                }}>
                    <CustomButton 
                        onPress={
                            () => {
                                navigation.navigate("PlansTab")
                            }
                        }
                        color={Constants.COLOR.white}
                        iconName="arrow-back-ios"
                        iconSize={32}>
                    </CustomButton>
                </View>
                <View style={{
                    width: '70%',
                    alignItems: 'center'
                }}>
                    <FontLoader>
                        <Text numberOfLines={1} ellipsizeMode='tail'
                        style={{
                            fontFamily: "SemiBold",
                            fontSize: windowHeight/30,
                            paddingHorizontal: 32,
                            color: Constants.COLOR.white,
                        }}>
                            {navigation.getParam('name')}
                        </Text>
                    </FontLoader>
                </View>
            </View>
            {/* content */}
            <View style={{
                height: '90%'
            }}>
                <WebView source={{ uri: navigation.getParam('webUrl')}}/> 
            </View>
            
        </SafeAreaView>
    )
}

export default PlanScreen