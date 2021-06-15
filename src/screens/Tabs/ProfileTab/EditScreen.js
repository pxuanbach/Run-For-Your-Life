import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import {CustomButton, IconButtonDesign} from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import {TextFieldInput, DateFieldInput, PickerFieldInput, BoxTextFieldInput} 
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

    const [_menu, setMenu] = useState();
    const [enableshift,setenableShift] = useState(false);

    const setMenuRef = ref => {
        setMenu(ref);
    }
    const hideMenu = () => {
        _menu.hide();
    }

    const showMenu = () => {
        _menu.show();
    }
    return (
        <SafeAreaView style={{backgroundColor: Constants.COLOR.light_gray}}>
            {/* header: tittle + Save button */}
            <View
            style={{
                flexDirection: "row",
                paddingHorizontal: 2, 
                paddingVertical: 4        
            }}>
                <View style={{
                    width: '50%',
                    alignItems: 'flex-start'
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: windowHeight/30,
                            paddingHorizontal: 12,
                            color: Constants.COLOR.dark_green,
                        }}>
                            Edit Profile
                        </Text>
                    </FontLoader>
                </View>
                <View style={{
                    width: '48%',
                    alignItems: 'flex-end',
                }}>
                    <IconButtonDesign
                    onPress={() => {
                        navigation.navigate("Profile", 
                        {
                            name: name, 
                            mail: mail,
                            description: description,
                            job: job,
                            phone: phone,
                            gender: gender,
                            liveIn: liveIn,
                            note: note,
                            birthday: date,
                            height: height,
                            weight: weight
                        })
                    }}
                    width={80}
                    height={36}
                    text="Save"
                    fontSize={windowHeight/28}
                    color={Constants.COLOR.white}
                    backgroundColor={Constants.COLOR.green}/>
                </View>
            </View>
            <KeyboardAvoidingView behavior="position" enabled={enableshift}>
                <ScrollView>
                    {/* infomation */}
                    <TextFieldInput
                    onChangeText={(text) => setName(text)}
                    onFocus={() => setenableShift(false)}
                    title="Name"
                    placeholder="name"
                    text={name}/>
                    <PickerFieldInput
                    title="Gender"
                    gender={gender}
                    setGender={setGender}
                    setMenuRef={setMenuRef}
                    showMenu={showMenu}
                    hideMenu={hideMenu}>
                    </PickerFieldInput>
                    <TextFieldInput
                    onChangeText={(text) => setMail(text)}
                    onFocus={() => setenableShift(false)}
                    title="Mail"
                    placeholder="mail"
                    text={mail}/>
                    <TextFieldInput
                    onChangeText={(text) => setPhone(text)}
                    onFocus={() => setenableShift(false)}
                    title="Phone"
                    placeholder="phone"
                    text={phone}/>
                    <TextFieldInput
                    onChangeText={(text) => setJob(text)}
                    onFocus={() => setenableShift(false)}
                    title="Job"
                    placeholder="job"
                    text={job}/>
                    <DateFieldInput
                    title="Birthday"
                    date={date}
                    setDate={setDate}/>
                    <TextFieldInput
                    onChangeText={(text) => setHeight(text)}
                    onFocus={() => setenableShift(false)}
                    title="Height"
                    placeholder="000"
                    text={height}
                    unit="cm"/>
                    <TextFieldInput
                    onChangeText={(text) => setWeight(text)}
                    onFocus={() => setenableShift(false)}
                    title="Weight"
                    placeholder="000"
                    text={weight}
                    unit="kg"/>
                    <BoxTextFieldInput
                    onChangeText={(text) => setLiveIn(text)}
                    onFocus={() => setenableShift(false)}
                    title="Live In"
                    text={liveIn}/>
                    <BoxTextFieldInput
                    onChangeText={(text) => setDescription(text)}
                    onFocus={() => setenableShift(false)}
                    title="Description"
                    text={description}/>
                    <BoxTextFieldInput
                    onChangeText={(text) => setNote(text)}
                    onFocus={() => setenableShift(false)}
                    numberOfLines={4}
                    title="Note"
                    text={note}/>
                    <View style={{height: windowHeight/8}}></View>
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