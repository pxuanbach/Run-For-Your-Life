import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Progress({navigation}) {
    return (
        <SafeAreaView style={{height: '100%'}}>
            <Text>Progress</Text>
        </SafeAreaView>
    )
}

export default Progress