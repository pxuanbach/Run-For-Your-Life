import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import {CustomButton, IconButtonDesign} from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import {TextFieldInput, DateFieldInput, BoxTextFieldInput} 
    from '../../../components/InputFieldDesign';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function EditScreen({navigation}) {
    const [date, setDate] = useState(new Date(navigation.getParam('birthday')));
    const [name, setName] = useState(navigation.getParam('name'));
    const [mail, setMail] = useState(navigation.getParam('mail'));
    const [description, setDescription] = useState(navigation.getParam('description'));
    const [job, setJob] = useState(navigation.getParam('job'));
    const [phone, setPhone] = useState(navigation.getParam('phone'));
    const [gender, setGender] = useState(navigation.getParam('gender'));
    const [liveIn, setLiveIn] = useState(navigation.getParam('liveIn'));
    const [note, setNote] = useState(navigation.getParam('note'));
    const [height, setHeight] = useState(navigation.getParam('height'));
    const [weight, setWeight] = useState(navigation.getParam('weight'));

    const [enableshift,setenableShift] = useState(false)
    return (
        <SafeAreaView>
            {/* header: back button + tittle */}
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
                                navigation.popToTop()
                                navigation.push("ProfileTab")
                            }
                        }
                        color={Constants.COLOR.dark_green}
                        iconName="arrow-back-ios"
                        iconSize={32}>
                    </CustomButton>
                </View>
                <View style={{
                    width: '60%',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: 28,
                            paddingHorizontal: 32,
                            color: Constants.COLOR.dark_green,
                        }}>
                            Edit Profile
                        </Text>
                    </FontLoader>
                </View>
                <View style={{
                    width: '25%',
                    justifyContent: 'flex-end'
                }}>
                    <IconButtonDesign
                    height={40}
                    text="Save"
                    color={Constants.COLOR.green}
                    backgroundColor={Constants.COLOR.white}/>
                </View>
            </View>
            <KeyboardAvoidingView behavior="position" enabled={enableshift}>
                <ScrollView>
                    {/* infomation */}
                    <TextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Name"
                    placeholder="name"
                    text={name}/>
                    <TextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Mail"
                    placeholder="mail"
                    text={mail}/>
                    <TextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Gender"
                    placeholder="gender"
                    text={gender}/>
                    <TextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Job"
                    placeholder="job"
                    text={job}/>
                    <DateFieldInput
                    title="Birthday"
                    date={date}
                    setDate={setDate}/>
                    <TextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Height"
                    placeholder="000"
                    text={height}
                    unit="cm"/>
                    <TextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Weight"
                    placeholder="000"
                    text={weight}
                    unit="kg"/>
                    <BoxTextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Live In"
                    text={liveIn}/>
                    <BoxTextFieldInput
                    onFocus={() => setenableShift(false)}
                    title="Description"
                    text={description}/>
                    <BoxTextFieldInput
                    onFocus={() => setenableShift(false)}
                    numberOfLines={4}
                    title="Note"
                    text={note}/>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
    },
    header: {
        fontSize: windowHeight/26,
        padding: 4,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiBold'
    },
})

export default EditScreen