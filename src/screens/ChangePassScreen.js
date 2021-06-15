import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import {CustomButton, IconButtonDesign} from '../components/CustomButton';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import {TextFieldInput, TextFieldSecureInput} 
    from '../components/InputFieldDesign';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ChangePassScreen({navigation}) {
    const [enableshift,setenableShift] = useState(false);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [reNewPassword, setReNewPassword] = useState();
    return (
        <SafeAreaView style={{height: '100%'}}>
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.white,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 2,
                paddingVertical: 4,               
                paddingTop: windowHeight/24
            }}>
                <View style={{
                    width: '15%',
                    justifyContent: 'flex-start'
                }}>
                    <CustomButton 
                        onPress={
                            () => {
                                navigation.navigate("ProfileTab")
                            }
                        }
                        color={Constants.COLOR.dark_green}
                        iconName="arrow-back-ios"
                        iconSize={32}>
                    </CustomButton>
                </View>
                <View style={{
                    width: '70%',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: windowHeight/30,
                            paddingHorizontal: 32,
                            color: Constants.COLOR.dark_green,
                        }}>
                            Change Password
                        </Text>
                    </FontLoader>
                </View>
            </View>
            <KeyboardAvoidingView behavior="position" enabled={enableshift}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{width: "43%"}}>
                            <Text style={styles.label}>Username:</Text>
                        </View>
                        <View style={{width: '56%'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                            style={styles.text}>{navigation.getParam("username")}</Text>
                        </View>
                    </View>
                    <TextFieldSecureInput
                    onChangeText={(text) => setCurrentPassword(text)}
                    onFocus={() => setenableShift(false)}
                    title="Cur-Password"
                    placeholder="current password"/>
                    <TextFieldSecureInput
                    onChangeText={(text) => setNewPassword(text)}
                    onFocus={() => setenableShift(false)}
                    title="New Password"
                    placeholder="new password"/>
                    <TextFieldSecureInput
                    onChangeText={(text) => setReNewPassword(text)}
                    onFocus={() => setenableShift(false)}
                    title="Confirm Password"
                    placeholder="confirm new password"/>
                    <View style={{
                        padding: 12,
                        alignSelf: 'center',
                    }}>
                        <IconButtonDesign
                        height={windowHeight/18}
                        text="Change"
                        iconName="published-with-changes"/>
                    </View>
                    
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        paddingVertical: 8,
        flexDirection: 'row'
    },
    title: {
        fontSize: windowHeight/32,
        paddingLeft: 4,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiRegular'
    },
    label: {
        fontSize: windowHeight/36,
        paddingLeft: 8,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiRegular'
    },
    text: {
        fontSize: windowHeight/36,
        paddingLeft: 8,
        color: Constants.COLOR.second_green,
        fontFamily: 'SemiRegular'
    },
})

export default ChangePassScreen