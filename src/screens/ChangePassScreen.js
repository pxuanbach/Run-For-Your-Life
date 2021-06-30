import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, Alert, AsyncStorage,
    SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView
} from 'react-native';
import {CustomButton, IconButtonDesign} from '../components/CustomButton';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import {TextFieldInput, TextFieldSecureInput} 
    from '../components/InputFieldDesign';
import Axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ChangePassScreen({navigation}) {
    const [enableshift,setenableShift] = useState(false);
    const [username, setUsername] = useState();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const handleChangePass = () => {
        console.log(username, currentPassword, newPassword, reNewPassword);
        if (currentPassword == "" || newPassword == "" || reNewPassword == "" || username == "")
            return Alert.alert(
                "Oops!",
                "Input is empty!",
            )
        if (newPassword != reNewPassword)
            return Alert.alert(
                "Oops!",
                "New password is different from confirm password",
            )
        Axios.post("https://runapp1108.herokuapp.com/api/users/changePass", 
        {username, currentPassword, newPassword})
        .then((res) => {
            Alert.alert(
                "Success ✓",
                "Change password successfully!",
            );
        })
        .catch((err) => {
            Alert.alert(
                "Failed",
                "Password change failed",
            );
        })
    }

    const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("username");
          if (value !== null) {
            setUsername(value);
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    useEffect(() => {
        let isMounted = true;
        _retrieveData();
        return () => { isMounted = false };
    }, [])

    return (
        <SafeAreaView style={{height: '100%', backgroundColor: Constants.COLOR.white}}>
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.green,
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
                        color={Constants.COLOR.white}
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
                            color: Constants.COLOR.white,
                        }}>
                            Change Password
                        </Text>
                    </FontLoader>
                </View>
            </View>
            <KeyboardAvoidingView behavior="position" enabled={enableshift} style={{backgroundColor: Constants.COLOR.white}}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{width: "43%"}}>
                            <Text style={styles.label}>Username:</Text>
                        </View>
                        <View style={{width: '56%'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                            style={styles.text}>{username}</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingVertical: 8
                    }}>
                        <TextFieldSecureInput
                        onChangeText={(text) => setCurrentPassword(text)}
                        onFocus={() => setenableShift(false)}
                        title="Cur-Password"
                        placeholder="current password"/>
                    </View>
                    <View style={{
                        paddingVertical: 8
                    }}>
                        <TextFieldSecureInput
                        onChangeText={(text) => setNewPassword(text)}
                        onFocus={() => setenableShift(false)}
                        title="New Password"
                        placeholder="new password"/>
                    </View>
                    <View style={{
                        paddingVertical: 8
                    }}>
                        <TextFieldSecureInput
                        onChangeText={(text) => setReNewPassword(text)}
                        onFocus={() => setenableShift(false)}
                        title="Confirm Password"
                        placeholder="confirm new password"/>
                    </View>
                    
                    <View style={{
                        padding: 16,
                        alignSelf: 'center',
                    }}>
                        <IconButtonDesign
                        onPress={handleChangePass}
                        height={windowHeight/16}
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