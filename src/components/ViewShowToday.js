import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ViewShowToday({data}){

    function get_distance(data){
        if(data===[]) return 0;
        var _distance=0;
        data.forEach(element => {
            _distance+=element.record.distance;
        });
        return _distance;
    }
    function get_avg_pace(data){
        if(data===[]) return 0;
        var _avg = 0;
        var _total_avg = 0;
        var count = 0;
        data.forEach(element=>{
            _total_avg+= element.record.avgPace;
            count++;
        });
        if(count!=0){
            _avg= (_total_avg/count);
        }
        return _avg;
    }
    function get_time(data){
        if(data===[]) return 0;
        var _time =0;
        data.forEach(element=>{
            _time+=element.record.totalTime;
        })
        return _time;
    }
    function get_calories(data){
        if(data===[]) return 0;
        var _calories=0;
        data.forEach(element=>{
            _calories+=element.record.calo;
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
                        >{get_distance(data).toFixed(2)}
                        </Text>
                        <Text>km</Text>
                    </View>

                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >{get_avg_pace(data).toFixed(2)}
                            </Text>
                        <Text>min/km</Text>
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
                            >{get_time(data).toFixed(2)}
                            </Text>
                            <Text>min</Text>
                    </View>
                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >
                            {get_calories(data).toFixed(0)}
                            </Text>
                            <Text>Calories</Text>
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
        backgroundColor: "#4CD964",
        borderRadius:20,
        paddingTop:20,
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