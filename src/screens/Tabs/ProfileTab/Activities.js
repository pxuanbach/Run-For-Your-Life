import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, TextInput,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Activities({navigation}) {
    return (
        <SafeAreaView>
            <Text>activities</Text>
        </SafeAreaView>
    )
}

export default Activities