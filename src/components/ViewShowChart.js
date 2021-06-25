import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const listButtonChart=[
    {status:'Distance',unit:'km'},
    {status:'Time',unit:'min'},
    {status:'Avg Pace',unit:'/km'},
    {status:'Calories',unit:'calo'},
]

function ViewShowChart({data}){
    const [status, setStatus] = useState('Distance')
    const setStatusFilter = status=>{
        setStatus(status)
    }
    const [unit, setUnit] = useState('km')
    

    return(
        <SafeAreaView>
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
                <ScrollView 
                style={{
                    flexDirection:'row', 
                    marginHorizontal:15, 
                    borderWidth:2, 
                    borderRadius:22, 
                    borderColor:"#ffcad4",
                    paddingHorizontal:1
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

        </SafeAreaView>

    )
}
export default ViewShowChart;

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
        position:'relative'
    },
    textTabActive:{
        color:'#fff'
    },
    listButtonChart:{
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row',
       justifyContent:'center',
       alignContent:'center',
       alignSelf:'center',
       alignItems:'center',
       borderRadius:22
    },
    btnChart:{
        width: windowWidth/4.4,
        height:windowHeight*0.06,
        flexDirection:'row',
        borderColor:"black",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:22,
        position:"relative"
    },
})
