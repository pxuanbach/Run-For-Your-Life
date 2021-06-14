import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import {Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';

function ActivitiesScreen({navigation}){
    return(
        <SafeAreaView>
            <StatusBar style='auto'/>
            <View>
                <Text>
                    activities here !
                </Text>
            </View>
        </SafeAreaView>

    )
}
export default ActivitiesScreen