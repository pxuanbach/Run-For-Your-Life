import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, Platform,
    View, Dimensions, TouchableOpacity
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const TextFieldInput = ({title, placeholder, text, unit='', onEndEditing, onChangeText, onFocus}) => {
    return (
        <View style={styles.container}>
            <FontLoader>
                <View style={{width: '23%'}}>
                    <Text style={styles.title}>{title}: </Text>
                </View>
                
                <View style={{
                    width: unit != '' ? '15%' : '76%',
                    backgroundColor: Constants.COLOR.white,
                    paddingHorizontal: 2,
                    borderWidth: 1,
                    borderRadius: 4,
                }}>
                    <TextInput 
                    onFocus={onFocus}
                    numberOfLines={1}
                    onEndEditing={onEndEditing}
                    onChangeText={onChangeText}
                    keyboardType={unit != '' ? "numeric" 
                            : title != "Phone" ? "default" : "numeric"}
                    maxLength={unit != '' ? 3 
                            : title != "Phone" ? 34 : 10}
                    underlineColorAndroid="transparent"
                    placeholder = {placeholder}
                    style={styles.text}> 
                    {text}
                    </TextInput>
                </View>
                
                {unit != '' 
                ? <Text style={styles.title}>
                    {unit}.
                </Text> 
                : null}
            </FontLoader>
        </View>
    )
}

const DateFieldInput = ({title, date, setDate}) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={styles.container}>
            <View style={{width: '23%'}}>
                <Text style={styles.title}>{title}: </Text>
            </View>
            <TouchableOpacity onPress={showDatepicker} 
            style={{
                flexDirection: 'row', 
                alignSelf: 'center',
                backgroundColor: Constants.COLOR.white,
                borderRadius: 4,
                padding: 2,
                borderWidth: 1
            }}>
                <Text style={styles.text}>{Moment(date).format('DD/MM/YYYY')}</Text>
                <MaterialIcons 
                name="calendar-today" 
                size={28} 
                color={Constants.COLOR.second_green} 
                style={{paddingLeft: 8, alignSelf: 'center'}}/>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </View>
    )
}

const PickerFieldInput = ({title, gender, setGender, setMenuRef, showMenu, hideMenu}) => {
    const changeText = text => {
        hideMenu(),
        setGender(text)
    }
    
    return (
        <View style={styles.container}>
            <View style={{width: '23%'}}>
                <Text style={styles.title}>{title}: </Text>
            </View>
            <TouchableOpacity onPress={() => showMenu()}
            style={{
                width: '30%',
                backgroundColor: Constants.COLOR.white, 
                padding: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderRadius: 4,
            }}>
                    <Menu
                    ref={setMenuRef}
                    button={<Text
                    onPress={showMenu} 
                    style={styles.text}>{gender}</Text> }
                    >
                        <FontLoader>
                            <MenuItem onPress={() => changeText("Male")}
                            textStyle={{
                                fontFamily: "RobotoRegular",
                                fontSize: windowHeight/38,
                                color: Constants.COLOR.second_green,
                                alignSelf: 'center'
                            }}>
                                Male
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => changeText("Female")}
                            textStyle={{
                                fontFamily: "RobotoRegular",
                                fontSize: windowHeight/38,
                                color: Constants.COLOR.second_green,
                                alignSelf: 'center'
                            }}>
                                Female
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => changeText("Unknown")}
                            textStyle={{
                                fontFamily: "RobotoRegular",
                                fontSize: windowHeight/38,
                                color: Constants.COLOR.second_green,
                                alignSelf: 'center'
                            }}>
                                Unknown
                            </MenuItem>
                            <MenuDivider />
                        </FontLoader>
                    </Menu>
                    <View style={{alignSelf: 'center'}}>
                        <MaterialIcons 
                        name="arrow-drop-down" 
                        size={26} 
                        color={Constants.COLOR.second_green}/>
                    </View>
                
                
            </TouchableOpacity>

        </View>
    )
}

const BoxTextFieldInput = ({title, text, numberOfLines=2, onFocus, onChangeText, onEndEditing}) => {
    return (
        <View>
            <View style={{
                padding: 4,
            }}>
                <Text style={styles.title}>{title}: </Text>
                <View style={{
                    backgroundColor: Constants.COLOR.white,
                    marginHorizontal: 4,
                    borderRadius: 5,
                    borderWidth: 1
                }}>
                    <TextInput
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing}
                    onFocus={onFocus}
                    multiline
                    maxLength={200}
                    numberOfLines={numberOfLines}
                    style={styles.text}>
                        {text}
                    </TextInput>
                </View>
            </View>
        </View>
    )
}

const TextFieldSecureInput = ({title, onFocus, onEndEditing, onChangeText, placeholder}) => {
    return (
        <View style={{
            padding: 2,
            flexDirection: "row",
            height: windowHeight/19,
        }}>
            <View style={{
                width: '44%'
            }}>
                <Text style={styles.title}>{title}: </Text>
            </View>
            <View style={{
                    width: '55%',
                    backgroundColor: Constants.COLOR.white,
                    paddingHorizontal: 2,
                    borderWidth: 1,
                    borderRadius: 4,
                }}>
                    <TextInput 
                    secureTextEntry={true}
                    onFocus={onFocus}
                    numberOfLines={1}
                    onEndEditing={onEndEditing}
                    onChangeText={onChangeText}
                    maxLength={25}
                    underlineColorAndroid="transparent"
                    placeholder = {placeholder}
                    style={styles.text}> 
                    </TextInput>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        height: windowHeight/19
    },
    header: {
        fontSize: windowHeight/26,
        padding: 4,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiBold'
    },
    title: {
        fontSize: windowHeight/36,
        paddingTop: 2,
        paddingLeft: 8,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiRegular'
    },
    text: {
        fontSize: windowHeight/36,
        paddingLeft: 8,
        color: Constants.COLOR.second_green,
        fontFamily: 'SemiRegular',
        textAlignVertical: 'top',
    },
})

export {
    TextFieldInput,
    DateFieldInput,
    PickerFieldInput,
    BoxTextFieldInput,
    TextFieldSecureInput
}