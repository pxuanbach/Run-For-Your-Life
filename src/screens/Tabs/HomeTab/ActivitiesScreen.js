import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import {Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ActivitiesCard from '../../../components/ActivitiesCard';

function ActivitiesScreen({navigation}){
    return(
        <SafeAreaView>
            <StatusBar style='auto'/>
            <View>
                <ActivitiesCard
                    dateTime="Monday Evening"
                    map="map nè"
                    distance={(Math.random()*100).toFixed(0)}
                    time={(Math.random()*100).toFixed(0)}
                    avgPace={(Math.random()*100).toFixed(0)}
                    calories={(Math.random()*100).toFixed(0)}
                    />
            </View>
        </SafeAreaView>

    )
}
export default ActivitiesScreen