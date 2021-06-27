import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ViewShowToday({data}){

    function get_distance(data){
        var _distance=0;
        data.forEach(element => {
            _distance+=element.distance
        });
        return _distance.toFixed(2);
    }
    function get_avg_pace(data){
        var _avg = 0;
        var _total_avg = 0;
        var count = 0;
        data.forEach(element=>{
            _total_avg+= element.avgPace;
            count++;
        });
        if(count!=0){
            _avg= (_total_avg/count).toFixed(2);
        }
        return _avg;
    }
    function get_time(data){
        var _time =0;
        data.forEach(element=>{
            _time+=element.time;
        })
        return _time.toFixed(2);
    }
    function get_calories(data){
        var _calories=0;
        data.forEach(element=>{
            _calories+=element.calories;
        })
        return _calories;
    }

    return(
        <SafeAreaView>
            <View 
                style={{
                    flexDirection:'row', 
                    alignSelf:'center', 
                    marginTop:-10
                    }}>
                    <View style={styles.blockData}>
                        <Text 
                        style={styles.textDataToday}
                        >{get_distance(data)}
                        </Text>
                        <Text>Distance (km)</Text>
                    </View>

                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >{get_avg_pace(data)}
                            </Text>
                        <Text>Avg Pace (min/km)</Text>
                    </View>
                    </View>

                <View 
                style={{
                    flexDirection:'row', 
                    alignSelf:'center'
                    }}>
                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >{get_time(data)}
                            </Text>
                            <Text>Time Spent (min)</Text>
                    </View>
                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >
                            {get_calories(data)}
                            </Text>
                            <Text>Calories Burned</Text>
                    </View>
                </View>
        </SafeAreaView>
    )
}

export default ViewShowToday

const styles=StyleSheet.create({
    blockData:{
        width: windowWidth*0.4,
        height:windowWidth*0.3,
        backgroundColor: "#6ff6ff",
        borderRadius:20,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    textDataToday:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff'
    },
})