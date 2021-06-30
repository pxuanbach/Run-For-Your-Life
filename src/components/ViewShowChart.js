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
    {status:'AvgPace',unit:'/km'},
    {status:'Calories',unit:'calo'},
]

function ViewShowChart({dataMon, dataTue, dataWed, dataThu, dataFri, dataSat, dataSun}){
    const [isloading, setIsloading]=useState(true)
    const [status, setStatus] = useState('Distance')
    const setStatusFilter = status=>{
        setStatus(status)
    }
    const [unit, setUnit] = useState('km')
    //state giá trị các cột trên biểu đồ

    const [chartmon, setChartmon]= useState(0)
    const [charttue, setCharttue]= useState(0)
    const [chartwed, setChartwed]= useState(0)
    const [chartthu, setChartthu]= useState(0)
    const [chartfri, setChartfri]= useState(0)
    const [chartsat, setChartsat]= useState(0)
    const [chartsun, setChartsun]= useState(0)
    // hàm set lại cái giá trị các cột trên biểu đồ khi đổi status ( distnce/ time/ avg pace/ calories)
    async function setChartValue(){
        if(status=="Distance"){
            await setChartmon(get_distance(dataMon))
            await setCharttue(get_distance(dataTue))
            await setChartwed(get_distance(dataWed))
            await setChartthu(get_distance(dataThu))
            await setChartfri(get_distance(dataFri))
            await setChartsat(get_distance(dataSat))
            await setChartsun(get_distance(dataSun))
        }
        if(status=="Time"){
            await setChartmon(get_time(dataMon))
            await setCharttue(get_time(dataTue))
            await setChartwed(get_time(dataWed))
            await setChartthu(get_time(dataThu))
            await setChartfri(get_time(dataFri))
            await setChartsat(get_time(dataSat))
            await setChartsun(get_time(dataSun))
        }
        if(status=="AvgPace"){
            await setChartmon(get_avg_pace(dataMon))
            await setCharttue(get_avg_pace(dataTue))
            await setChartwed(get_avg_pace(dataWed))
            await setChartthu(get_avg_pace(dataThu))
            await setChartfri(get_avg_pace(dataFri))
            await setChartsat(get_avg_pace(dataSat))
            await setChartsun(get_avg_pace(dataSun))
        }
        if(status=="Calories"){
            await setChartmon(get_calories(dataMon))
            await setCharttue(get_calories(dataTue))
            await setChartwed(get_calories(dataWed))
            await setChartthu(get_calories(dataThu))
            await setChartfri(get_calories(dataFri))
            await setChartsat(get_calories(dataSat))
            await setChartsun(get_calories(dataSun))
        }
    }
    setTimeout(()=>{
        setIsloading(false)
    },5000)
    useEffect(()=>{
        setChartValue()
    },[status,isloading])
    //hàm tính toán 
    function get_distance(data){
        if(data===[]) return 0;
        var _distance=0;
        data.forEach(element => {
            _distance+=element.distance
        });
        return _distance;
    }
    function get_avg_pace(data){
        if(data===[]) return 0;
        var _avg = 0;
        var _total_avg = 0;
        var count = 0;
        data.forEach(element=>{
            _total_avg+= element.avgPace;
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
            _time+=element.time;
        })
        return _time;
    }
    function get_calories(data){
        if(data===[]) return 0;
        var _calories=0;
        data.forEach(element=>{
            _calories+=element.calories;
        })
        return _calories;
    }

    return(
        <SafeAreaView>
            <View style={{alignItems:'center'}}>
                        <LineChart
                            data={{
                            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
                            datasets: [
                                {
                                data: [
                                    {chartmon}.chartmon,
                                    {charttue}.charttue,
                                    {chartwed}.chartwed,
                                    {chartthu}.chartthu,
                                    {chartfri}.chartfri,
                                    {chartsat}.chartsat,
                                    {chartsun}.chartsun,
                                ]
                                }
                            ]
                            }}
                            width= {windowWidth*0.9}
                            height={240}
                            yAxisLabel=""
                            yAxisSuffix={unit}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#4CD964",
                                backgroundGradientFrom: "#f0f0f0",
                                backgroundGradientTo: "#FaFaFa",
                                decimalPlaces: 0, // làm chữ số thập phân
                                color: (opacity = 1) => `rgba(76, 217, 100, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 15
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "1",
                                stroke: "#000"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 5,
                            borderRadius: 20
                            }}
                        />
                    </View>
                <View 
                style={{
                    flexDirection:'row', 
                    marginHorizontal:15, 
                    borderWidth:2, 
                    borderRadius:22, 
                    borderColor:"#4CD964",
                    paddingHorizontal:0

                    }}>
                    <View 
                    style={styles.listButtonChart}>
                        {
                            listButtonChart.map(c=>(
                                <TouchableOpacity
                                key={c.status} 
                                style={[styles.btnChart, status == c.status && styles.btnTabActive]}
                                onPress={()=> {
                                    setStatusFilter(c.status) , 
                                    setUnit(c.unit)
                                }}
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
                </View>

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
        backgroundColor: "#4CD964",
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
       borderRadius:22,
       margin:-1
    },
    btnChart:{
        width: windowWidth/4.37,
        height:windowHeight*0.06,
        flexDirection:'row',
        borderColor:"black",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:22,
        position:"relative"
    },
})
