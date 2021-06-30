import React, {useState, useEffect} from 'react';
import {Text, Image, TouchableOpacity, FlatList, View, Modal, SafeAreaView, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { borderBottom, borderRadius } from 'styled-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Moment from 'moment';
import moment from 'moment';
import { interpolate } from 'react-native-reanimated';
import { keyboardDismissHandlerManager } from 'native-base';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const ViewShowData =({timeStatus,dataThisMonth,dataLastMonth})=>
{
    const [status, setStatus] = useState('timeStatus')

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
            _avg= _total_avg/count;
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
    function get_count_activities(data){
        if(data===[]) return 0;
        var _count=0;
        data.forEach(element=>{
            _count++;
        })
        return _count;
    }


    return(
        <View
        style={{width: windowWidth,
        height: windowHeight*0.45,
        backgroundColor:"#fff",
        marginHorizontal:windowWidth*0.1,
        alignSelf:'center',
        marginTop:10
        }}>
            <View
            style={{height:windowHeight*0.05,
            borderColor:"black",
            borderWidth:0.5,
            backgroundColor:"white",
            flexDirection:'row',
            }}>
                <Text
                style={{
                    alignSelf:'center',
                    marginLeft:windowWidth*0.52
                    }}>
                This {timeStatus}
                </Text>
                <Text
                style={{
                    alignSelf:'center',
                    marginLeft:windowWidth*0.075
                    }}>
                Last {timeStatus}
                </Text>
            </View>

            <View style={{flexDirection:'row',marginBottom:-1}}>
                <View style={styles.distance}>
                    <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
                    <Text> Distance </Text>
                    <Text style={styles.unit}> (km)</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_distance(dataThisMonth).toFixed(2)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_distance(dataLastMonth).toFixed(2)}</Text>
                </View>          
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.distance}>
                    <MaterialCommunityIcons name="speedometer" size={24} color="black" />
                    <Text> Avg Pace</Text>
                    <Text style={styles.unit}> (min/km)</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_avg_pace(dataThisMonth).toFixed(2)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_avg_pace(dataLastMonth).toFixed(2)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row',marginTop:-1}}>
                <View style={styles.distance}>
                    <Ionicons name="time" size={24} color="black" />
                    <Text> Time</Text>
                    <Text style={styles.unit}> (min)</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_time(dataThisMonth).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_time(dataLastMonth).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row', marginTop:-1}}>
                <View style={styles.distance}>
                    <FontAwesome5 name="fire-alt" size={24} color="black" />
                    <Text> Calories Burned</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_calories(dataThisMonth).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_calories(dataLastMonth).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row', marginTop:-1}}>
                <View style={styles.distance}>
                    <FontAwesome5 name="running" size={24} color="black" />
                    <Text> Activities</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_count_activities(dataThisMonth)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{get_count_activities(dataLastMonth)}</Text>
                </View>            
            </View>        
        </View>
    )
}
export default ViewShowData

const styles=StyleSheet.create({
    distance:{
        height: windowHeight*0.08,
        flex:0.5,
        borderColor:"black",
        borderWidth:0.5,
        backgroundColor:"white",
        alignContent:'center',
        alignItems:'center',
        marginTop:-1,
        marginBottom:1,
        flexDirection:'row',
        paddingLeft:10
    },
    textData:{
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    viewTextData:{
        backgroundColor:"white",
        borderWidth:0.5,
        justifyContent:'center',
        flex: 0.25,
        marginTop:-1,
        marginBottom:1,
        marginLeft:-1
    },
    unit:{
        fontSize:12,
        color:"#999999"
    }
})