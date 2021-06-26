import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
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
import { set } from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Progress({navigation}) {
    /******************************************************************************/
    //tính ngày, tháng này, tháng trước yyyy-mm
        var month= moment().format();
        var m=month.split('-')
        var this_month=m[0]+"-"+m[1]

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
        var today= moment().format();
        var t = today.split('T');
        today=t[0];

    //get userID
    const [username, setUsername]=useState()
    const [userid, setUserid] = useState()
    const _getuserid=async()=>{
        try {
            const username= await AsyncStorage.getItem("username")
            fetch("https://my-app-de.herokuapp.com/api/users/getID/" + username)
            .then((res)=>res.text())
            .then((text)=>{
                var u = text.split('"')
                setUserid(u[1])
            })          
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        let isMounted = true;
        _getuserid();
        return () => { isMounted = false };
    },[])
    console.log('userid: '+userid)
        /// fecth data về từ api lưu vào các state
        const [isLoading, setIsLoading] = useState(true)
        const [dataThisMonth, setDataThisMonth]=useState([])
        const [dataLastMonth,setDataLastMonth] = useState([])
        const [dataToday, setDataToday]= useState([])
        const [dataThisWeek, setDataThisWeek]=useState([])
        var listDataThisMonth=[]
        var listDataLastMonth=[]
        var listDataToday=[]
        var listDataThisWeek=[]

        setTimeout(()=>{
                //this month
                fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/month/"+this_month)
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataThisMonth.push(data)
                    });
                    setDataThisMonth(listDataThisMonth);
                })
                .catch((err)=>console.log(err))
                //last month
                fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/month/"+last_month)
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataLastMonth.push(data)
                    });
                    setDataLastMonth(listDataLastMonth);
                })
                .catch((err)=>console.log(err))
                //today
                fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+today)
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataToday.push(data)
                    });
                    setDataToday(listDataToday);
                })
                .catch((err)=>console.log(err))
                //this week
                fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/thisweek")
                .then((res)=>res.json())
                .then((json)=>{
                    json.map((data)=>{
                        listDataThisWeek.push(data)
                    });
                    setDataThisWeek(listDataThisWeek);
                })
                .catch((err)=>console.log(err))

                console.log("timeout")
        },5000)
        

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
