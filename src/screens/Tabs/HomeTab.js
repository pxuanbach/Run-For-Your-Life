import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import {Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';


function HomeTab() {

    return (
        <SafeAreaView>
            <StatusBar style="auto"/>
            <ScrollView>
                <Text> home</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeTab

const styles=StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
    }
})
