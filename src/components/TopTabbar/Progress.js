import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import ViewShowData from '../../components/ViewShowData';
import ViewShowToday from '../ViewShowToday';
import ViewShowChart from '../ViewShowChart';
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
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const listButtonChart=[
    {status:'Distance',unit:'km'},
    {status:'Time',unit:'min'},
    {status:'Avg Pace',unit:'/km'},
    {status:'Calories',unit:'calo'},
]

function Progress({navigation}) {
    const [status, setStatus] = useState('Distance')
    const setStatusFilter = status=>{
        setStatus(status)
    }
    const [unit, setUnit] = useState('km')

    /***************************************************************************** */
    //api this month, last month
        var month= moment().format();
        var m=month.split('-')
        var this_month=m[0]+"-"+m[1]
        console.log("this month: ",this_month)
        var last_month=""
        if(Number.parseInt(m[1])===1){
            var last_year = (Number.parseInt(m[0])-1).toString()
            last_month= last_year+"-12"
        }
        else{
            var int_last_month=((Number.parseInt(m[1]))-1)
            if(int_last_month<10){
                last_month= m[0]+"-0"+ int_last_month.toString()
            }
            else{
                last_month= m[0]+"-"+ int_last_month.toString()
            }
        }
        var api_get_data_this_month = "https://my-app-de.herokuapp.com/api/activities/month/"+this_month
        var api_get_data_last_month = "https://my-app-de.herokuapp.com/api/activities/month/"+last_month
        //api today
        var today= moment().format();
        var t = today.split('T');
        today=t[0];

        var api_get_data_today = "https://my-app-de.herokuapp.com/api/activities/date/"+today;

        /// fecth data về từ api lưu vào các state
        const [isLoading, setIsLoading] = useState(true)
        const [dataThisMonth, setDataThisMonth]=useState([])
        const [dataLastMonth,setDataLastMonth] = useState([])
        const [dataToday, setDataToday]= useState([])
        var listDataThisMonth=[]
        var listDataLastMonth=[]
        var listDataToday=[]

        useEffect(()=>{
            //fecth data this month
            try {
                //this month
                fetch(api_get_data_this_month)
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataThisMonth.push(data)
                    });
                    setDataThisMonth(listDataThisMonth);
                })
                .catch((err)=>console.log(err))
                .finally(setIsLoading(false));
                //last month
                fetch(api_get_data_last_month)
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataLastMonth.push(data)
                    });
                    setDataLastMonth(listDataLastMonth);
                })
                .catch((err)=>console.log(err))
                .finally(setIsLoading(false));
                //fecth today
                fetch(api_get_data_today)
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataToday.push(data)
                    });
                    setDataToday(listDataToday);
                })
                .catch((err)=>console.log(err))
                .finally(setIsLoading(false));


            } catch (error) {
                console.log('Error: ',error.message);
            }

        },[]);

    /***************************************************************************** */


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
                <ViewShowToday
                data={dataToday}/>
            
                <Text style={styles.titleToday}>This week</Text>
                <ViewShowChart>

                </ViewShowChart>
             
                <Text style={styles.titleToday}>Monthly</Text>
                <ViewShowData 
                timeStatus= 'month'
                dataThisMonth = {dataThisMonth}
                dataLastMonth ={dataLastMonth}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Progress

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
    titleToday:{
        marginLeft:10,
        marginTop:15,
        marginBottom:5,
        fontSize:20, 
        fontWeight:'bold'
    }
})
