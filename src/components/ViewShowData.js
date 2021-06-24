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


const ViewShowData =({timeStatus,distanceThis})=>
{
    const [status, setStatus] = useState('timeStatus')

    // //xát định string api lấy dữ lấy api đúng với tháng này, tháng rồi
    // var month= moment().format();
    // var m=month.split('-')
    // var this_month=m[0]+"-"+m[1]
    // console.log("this month: ",this_month)
    // var last_month=""
    // if(Number.parseInt(m[1])===1)
    // {
    //     var last_year = (Number.parseInt(m[0])-1).toString()
    //     last_month= last_year+"-12"
    // }
    // else 
    // {
    //     var int_last_month=((Number.parseInt(m[1]))-1)
    //     if(int_last_month<10)
    //     {
    //         last_month= m[0]+"-0"+ int_last_month.toString()
    //     }
    //     else
    //     {
    //         last_month= m[0]+"-"+ int_last_month.toString()
    //     }
    // }
    // console.log("last month: ",last_month)

    // var api_get_data_this_month = "https://my-app-de.herokuapp.com/api/activities/month="+this_month
    // var api_get_data_last_month = "https://my-app-de.herokuapp.com/api/activities/month="+last_month
    // console.log(api_get_data_this_month)
    // console.log(api_get_data_last_month)

    // /// fecth data this month về từ api lưu vào dataThisMonth , dataLastMonth
    // const [isLoading, setIsLoading] = useState(true)
    // const [dataThisMonth, setDataThisMonth]=useState([])
    // var listDataThisMonth=[]

    // useEffect(()=>{
    //     fetch(api_get_data_this_month)
    //     .then((res)=>res.json())
    //     .then((json)=>{
    //         json.map((data)=>{
    //             listDataThisMonth.push(data)
    //         });
    //         setDataThisMonth(listDataThisMonth);
    //     })
    //     .catch((err)=>console.log(err))
    //     .finally(setIsLoading(false));
    // },[]);

    // console.log(dataThisMonth)
    // console.log(isLoading)
    // //tính distance tháng này
    // function get_distance(dataMonth){
    //     var _distance=0;
    //     dataMonth.forEach(element => {
    //         _distance+=element.distance
    //     });
    //     return _distance;
    // }



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

            <View style={{flexDirection:'row'}}>
                <View style={styles.distance}>
                    <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
                    <Text> Distance</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{distanceThis}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>          
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.distance}>
                    <MaterialCommunityIcons name="speedometer" size={24} color="black" />
                    <Text> Avg Pace</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row',marginTop:-1}}>
                <View style={styles.distance}>
                    <Ionicons name="time" size={24} color="black" />
                    <Text> Time</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row', marginTop:-1}}>
                <View style={styles.distance}>
                    <FontAwesome5 name="fire-alt" size={24} color="black" />
                    <Text> Calories Burned</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row', marginTop:-1}}>
                <View style={styles.distance}>
                    <FontAwesome5 name="running" size={24} color="black" />
                    <Text> Activities</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
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
    }
})