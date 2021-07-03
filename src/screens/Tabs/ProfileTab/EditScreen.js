import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, TextInput, AsyncStorage,Alert,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import {CustomButton, IconButtonDesign} from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import {TextFieldInput, DateFieldInput, PickerFieldInput, BoxTextFieldInput} 
    from '../../../components/InputFieldDesign';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { StackActions, NavigationActions } from 'react-navigation';
import Moment from 'moment';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const resetProfile = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Profile' })],
});

function EditScreen({navigation}) {
    const [date, setDate] = useState(navigation.getParam('birthday') ?
        new Date(navigation.getParam('birthday')) : new Date());
    const [fullname, setName] = useState(navigation.getParam('fullname'));
    const [mail, setMail] = useState(navigation.getParam('mail'));
    const [description, setDescription] = useState(navigation.getParam('description'));
    const [job, setJob] = useState(navigation.getParam('job'));
    const [phone, setPhone] = useState(navigation.getParam('phone'));
    const [gender, setGender] = useState(navigation.getParam('gender'));
    const [address, setAddress] = useState(navigation.getParam('address'));
    const [height, setHeight] = useState(navigation.getParam('height'));
    const [weight, setWeight] = useState(navigation.getParam('weight'));

    let image = navigation.getParam('image');
    let note = navigation.getParam('note');

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

    function ValidateEmail(mail) 
    {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
        {
            return (true)
        }
            return (false)
    }

    const ValidNumber = (str) => {
        return !/[~`!# $%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
    }

    const HandleSave = () => {
        
        if (!ValidateEmail(mail)) {
            Alert.alert(
                "Oops!",
                "Invalid email",
              )
            return;
        }
        if (!ValidNumber(height) || height === "") {
            Alert.alert(
                "Oops!",
                "Height only enter numbers",
              )
            return;
        }
        if (!ValidNumber(weight) || weight === "") {
            Alert.alert(
                "Oops!",
                "Weight only enter numbers",
              )
            return;
        }
        if (date.getFullYear() === new Date().getFullYear()) {
            Alert.alert(
                "Oops!",
                "Invalid date of birth",
              )
            return;
        }
        AsyncStorage.getItem("authToken")
        .then( async (token) => { 
            var vl = jwt_decode(token)
            console.log('Token decode',vl._id)
            let UserID = vl._id;
            console.log(UserID)

            console.log('Date:',date)
            let birthday = Moment(date).format('YYYY-MM-DD')
            console.log('mail',mail)
            //console.log('height:',height)
            console.log('address', address)

            await axios.post('https://runapp1108.herokuapp.com/api/users/Infov2',{
                UserID,fullname,mail,description,job,phone,gender,
                address,birthday,height,weight,image,note
            })
            .then((res)=>{
                console.log(res.data)
                navigation.dispatch(resetProfile);
                navigation.navigate("Profile");
            })
            .catch((err)=> {
                console.log(err)
            })
        })
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
                        HandleSave();
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
                    text={fullname}/>
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
                    onChangeText={(text) => {
                        console.log(text);
                        setAddress(text)}}
                    onFocus={() => setenableShift(false)}
                    title="Live In"
                    text={address}/>
                    <BoxTextFieldInput
                    onChangeText={(text) => setDescription(text)}
                    onFocus={() => setenableShift(false)}
                    numberOfLines={4}
                    title="Description"
                    text={description}/>
                    <View style={{height: windowHeight/7}}></View>
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