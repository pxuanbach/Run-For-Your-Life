import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import {Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import ViewShowData from '../../components/ViewShowData';
import { StatusBar } from 'expo-status-bar';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { flexDirection } from 'styled-system';
import { FontAwesome5 } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const listButtonChart=[
    {status:'Distance',unit:'km'},
    {status:'Time',unit:'min'},
    {status:'Avg Pace',unit:'/km'},
    {status:'Calories',unit:'calo'},
]

function HomeTab() {
    const [status, setStatus] = useState('Distance')
    const setStatusFilter = status=>{
        setStatus(status)
    }
    const [unit, setUnit] = useState('km')
    return (
        <SafeAreaView>
            <StatusBar style="auto"/>
            <ScrollView
            style={{backgroundColor:'#fff'}}
            >
                <View
                style={{
                    height:windowHeight/12,
                    alignItems:'center',
                    backgroundColor: "#4CD964",
                    justifyContent:'center'
                }}>
                    <Text
                    style={{
                        fontSize:25,
                        fontWeight:'bold',
                        color:"#fff"
                    }}>Dashboard</Text>
                </View>

                <Text style={styles.titleToday}>Today</Text>

                <View 
                style={{
                    flexDirection:'row', 
                    alignSelf:'center', 
                    marginTop:-10
                    }}>
                    <View style={styles.blockData}>
                        <Text 
                        style={styles.textDataToday}
                        >{(Math.random()*1000).toFixed(0)}
                        </Text>
                        <Text>Distance (m)</Text>
                    </View>

                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >{(Math.random()*1000).toFixed(0)}
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
                            >{(Math.random()*1000).toFixed(0)}
                            </Text>
                            <Text>Time Spent (min)</Text>
                    </View>
                    <View style={styles.blockData}>
                        <Text 
                            style={styles.textDataToday}
                            >
                            {(Math.random()*1000).toFixed(0)}
                            </Text>
                            <Text>Calories Burned</Text>
                    </View>
                </View>
                

                <View>
                <Text style={styles.titleToday}>This week</Text>

                    <View style={{alignItems:'center'}}>
                        <LineChart
                            data={{
                            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
                            datasets: [
                                {
                                data: [
                                    Math.random()*100,
                                    Math.random()*100,
                                    Math.random()*100,
                                    Math.random()*100,
                                    Math.random()*100,
                                    Math.random()*100,
                                    Math.random()*100,
                                ]
                                }
                            ]
                            }}
                            width= {windowWidth*0.9}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix={unit}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#ffcad4",
                                backgroundGradientTo: "#ffe5d8",
                                decimalPlaces: 0, // làm chữ số thập phân, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 55, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(225, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 15
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 5,
                            borderRadius: 20
                            }}
                        />
                    </View>
                </View>
                <ScrollView 
                style={{
                    flexDirection:'row', 
                    marginHorizontal:15, 
                    borderWidth:2, 
                    borderRadius:22, 
                    borderColor:"#ffcad4"
                    }}>
                    <View 
                    style={styles.listButtonChart}>
                        {
                            listButtonChart.map(c=>(
                                <TouchableOpacity
                                key={c.status} 
                                style={[styles.btnChart, status == c.status && styles.btnTabActive]}
                                onPress={()=> {setStatusFilter(c.status) , setUnit(c.unit)}}
                                >
                                    <Text
                                    style={styles.textTab}
                                    >
                                        {c.status}
                                    </Text>                  
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>

                {/* <View 
                style={styles.listTab}
                >
                {
                    listTab.map(e=>(
                        <TouchableOpacity
                        style={[styles.btnTab, status == e.status && styles.btnTabActive]}
                        onPress={() => setStatusFilter(e.status)}
                        >
                            <Text
                            style={styles.textTab, status=== e.status && styles.textTabActive}
                            >
                            {e.status}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
                <ViewShowData
                timeStatus={status}
                >
                </ViewShowData> */}

                    <Text style={styles.titleToday}>Monthly</Text>
                <ViewShowData timeStatus= 'month'></ViewShowData>

                <TouchableOpacity 
                style={{backgroundColor:"#dddddd",
                    borderRadius:20,
                    width:windowWidth*0.9,
                    height:windowHeight*0.07,
                    flexDirection:'row',
                    alignContent:'center',
                    alignItems:'center',
                    alignSelf:'center',
                    paddingHorizontal:10
                }}>
                    <FontAwesome5 name="running" size={24} color="black" />
                    <Text>  All Activities</Text>
                </TouchableOpacity>
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
    },
    listTab:{
        backgroundColor:'#fff',
        padding:0,
        flex:1,
        flexDirection:'row',
       justifyContent:'center',
    },
    btnTab:{
        width: windowWidth/3,
        height:windowHeight*0.06,
        flexDirection:'row',
        borderWidth:0.5,
        borderColor:"black",
        justifyContent:'center',
        padding:10
    },
    textTab:{
        fontSize:15,
    },
    btnTabActive:{
        backgroundColor: "#ffcad4",
    },
    textTabActive:{
        color:'#fff'
    },
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
    listButtonChart:{
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row',
       justifyContent:'center',
       alignContent:'center',
       alignSelf:'center',
       alignItems:'center'
    },
    btnChart:{
        width: windowWidth/4.4,
        height:windowHeight*0.06,
        flexDirection:'row',
        borderColor:"black",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:22
    },
    titleToday:{
        marginLeft:10,
        marginTop:15,
        fontSize:20, 
        fontWeight:'bold'
    }
})
