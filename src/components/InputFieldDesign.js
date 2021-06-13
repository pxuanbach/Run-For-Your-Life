import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, Platform,
    View, Dimensions, TouchableOpacity
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';

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
                    paddingHorizontal: 2
                }}>
                    <TextInput 
                    onFocus={onFocus}
                    numberOfLines={1}
                    onEndEditing={onEndEditing}
                    onChangeText={onChangeText}
                    keyboardType={unit != '' ? "numeric" : "default"}
                    maxLength={unit != '' ? 3 : 34}
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
                borderRadius: 5,
                paddingHorizontal: 2
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

const BoxTextFieldInput = ({title, text, numberOfLines=2, onFocus, onChangeText, onEndEditing}) => {
    return (
        <View>
            <View style={{
                padding: 4,
            }}>
                <Text style={styles.title}>{title}: </Text>
                <View style={{
                    backgroundColor: Constants.COLOR.white,
                    marginHorizontal: 4
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
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
    },
})

export {
    TextFieldInput,
    DateFieldInput,
    BoxTextFieldInput
}