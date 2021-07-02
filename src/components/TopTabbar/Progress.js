import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
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
import jwt_decode from "jwt-decode";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Progress({navigation}) {
    
    //tính ngày, tháng này, tháng trước yyyy-mm
        //tháng này
        var month= moment().format();
        var m=month.split('-')
        var this_month=m[0]+"-"+m[1]
        //tháng trước
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
        //hôm nay
        var today= ((moment().format()).split('T'))[0]
        // các ngày trong tuần này yyyy-mm-dd
        var _thu_hom_nay=moment().format('dddd') //Saturday
        var mon = (moment().format().split('T'))[0]
        var tue=(moment().add(1, 'days').format().split('T'))[0]
        var wed=(moment().add(2, 'days').format().split('T'))[0]
        var thu=(moment().add(3, 'days').format().split('T'))[0]
        var fri=(moment().add(4, 'days').format().split('T'))[0]
        var sat=(moment().add(5, 'days').format().split('T'))[0]
        var sun=(moment().add(6, 'days').format().split('T'))[0]
        switch(_thu_hom_nay){
            case "Monday":{
                mon=(moment().format().split('T'))[0]
                tue=(moment().add(1, 'days').format().split('T'))[0]
                wed=(moment().add(2, 'days').format().split('T'))[0]
                thu=(moment().add(3, 'days').format().split('T'))[0]
                fri=(moment().add(4, 'days').format().split('T'))[0]
                sat=(moment().add(5, 'days').format().split('T'))[0]
                sun=(moment().add(6, 'days').format().split('T'))[0]
                break;
            }
            case "Tuesday":{
                mon=(moment().subtract(1, 'days').format().split('T'))[0]
                tue=(moment().format().split('T'))[0]
                wed=(moment().add(1, 'days').format().split('T'))[0]
                thu=(moment().add(2, 'days').format().split('T'))[0]
                fri=(moment().add(3, 'days').format().split('T'))[0]
                sat=(moment().add(4, 'days').format().split('T'))[0]
                sun=(moment().add(5, 'days').format().split('T'))[0]
                break;
            }
            case "Wednesday":{
                mon=(moment().subtract(2, 'days').format().split('T'))[0]
                tue=(moment().subtract(1,'days').format().split('T'))[0]
                wed=(moment().format().split('T'))[0]
                thu=(moment().add(1, 'days').format().split('T'))[0]
                fri=(moment().add(2, 'days').format().split('T'))[0]
                sat=(moment().add(3, 'days').format().split('T'))[0]
                sun=(moment().add(4, 'days').format().split('T'))[0]
                break;
            }
            case "Thursday":{
                mon=(moment().subtract(3, 'days').format().split('T'))[0]
                tue=(moment().subtract(2,'days').format().split('T'))[0]
                wed=(moment().subtract(1,'days').format().split('T'))[0]
                thu=(moment().format().split('T'))[0]
                fri=(moment().add(1, 'days').format().split('T'))[0]
                sat=(moment().add(2, 'days').format().split('T'))[0]
                sun=(moment().add(3, 'days').format().split('T'))[0]
                break;
            }
            case "Friday":{
                mon=(moment().subtract(4, 'days').format().split('T'))[0]
                tue=(moment().subtract(3,'days').format().split('T'))[0]
                wed=(moment().subtract(2,'days').format().split('T'))[0]
                thu=(moment().subtract(1,'days').format().split('T'))[0]
                fri=(moment().format().split('T'))[0]
                sat=(moment().add(1, 'days').format().split('T'))[0]
                sun=(moment().add(2, 'days').format().split('T'))[0]
                break;
            }
            case "Saturday":{
                mon=(moment().subtract(5, 'days').format().split('T'))[0]
                tue=(moment().subtract(4,'days').format().split('T'))[0]
                wed=(moment().subtract(3,'days').format().split('T'))[0]
                thu=(moment().subtract(2,'days').format().split('T'))[0]
                fri=(moment().subtract(1,'days').format().split('T'))[0]
                sat=(moment().format().split('T'))[0]
                sun=(moment().add(1, 'days').format().split('T'))[0]
                break;
            }
            case "Sunday":{
                mon=(moment().subtract(6, 'days').format().split('T'))[0]
                tue=(moment().subtract(5,'days').format().split('T'))[0]
                wed=(moment().subtract(4,'days').format().split('T'))[0]
                thu=(moment().subtract(3,'days').format().split('T'))[0]
                fri=(moment().subtract(2,'days').format().split('T'))[0]
                sat=(moment().subtract(1,'days').format().split('T'))[0]
                sun=(moment().format().split('T'))[0]
                break;
            }
        }

    //state
    const [dataThisMonth, setDataThisMonth]=useState([])
    const [dataLastMonth,setDataLastMonth] = useState([])
    const [dataToday, setDataToday]= useState([])
    const [dataThisWeek, setDataThisWeek]=useState([])
    const [dataMon, setDataMon]=useState([])
    const [dataTue, setDataTue]=useState([])
    const [dataWed, setDataWed]=useState([])
    const [dataThu, setDataThu]=useState([])
    const [dataFri, setDataFri]=useState([])
    const [dataSat, setDataSat]=useState([])
    const [dataSun, setDataSun]=useState([])

    var listDataThisMonth=[]
    var listDataLastMonth=[]
    var listDataToday=[]
    var listDataThisWeek=[]
    var listDataMon=[]
    var listDataTue=[]
    var listDataWed=[]
    var listDataThu=[]
    var listDataFri=[]
    var listDataSat=[]
    var listDataSun=[]

    const [isLoading, setIsLoading] = useState(true)
    // get user id 
    const _getUserIdAndFetchData= async ()=>{
        await AsyncStorage.getItem("authToken")
        .then(async(token)=>{
            var vl = await jwt_decode(token)
            var userid =vl._id
            console.log("user id: "+userid)
            _fetchdata(userid);
        })
        .catch((err)=>console.log(err))

        console.log("đã chạy get user id and fetch data của tab progress")
    }
    //function fecth data 
    const _fetchdata =  (userid)=>{
        //today
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+today)
        .then((res)=>res.json())
        .then((json)=>{ 
            json.map((data)=>{
                listDataToday.push(data)
            });
            setDataToday(listDataToday);
        })
        .catch((err)=>console.log("fecth chưa xong today"))
        //monday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+mon)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataMon.push(data)
            });
            setDataMon(listDataMon);
        })
        .catch((err)=>console.log("fecth chưa xong mon"))
        //tuesday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+tue)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataTue.push(data)
            });
            setDataTue(listDataTue);
        })
        .catch((err)=>console.log("fecth chưa xong tue"))
        //wednesday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+wed)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataWed.push(data)
            });
            setDataWed(listDataWed);
        })
        .catch((err)=>console.log("fecth chưa xong wed"))
        //thurday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+thu)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataThu.push(data)
            });
            setDataThu(listDataThu);
        })
        .catch((err)=>console.log("fecth chưa xong thu"))
        //friday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+fri)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataFri.push(data)
            });
            setDataFri(listDataFri);
        })
        .catch((err)=>console.log("fecth chưa xong fri"))
        //saturday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+sat)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataSat.push(data)
            });
            setDataSat(listDataSat);
        })
        .catch((err)=>console.log("fecth chưa xong sat"))
        //sunday
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+sun)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataSun.push(data)
            });
            setDataSun(listDataSun);
        })
        .catch((err)=>console.log("fecth chưa xong sun"))
        //this week
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/thisweek")
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataThisWeek.push(data)
            });
            setDataThisWeek(listDataThisWeek);
        })
        .catch((err)=>console.log("fecth chưa xong chart"))
        //this month
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/month/"+this_month)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataThisMonth.push(data)
            });
            setDataThisMonth(listDataThisMonth);
        })
        .catch((err)=>console.log("fecth chưa xong this month"))
        //last month
        fetch("https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/month/"+last_month)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listDataLastMonth.push(data)
            });
            setDataLastMonth(listDataLastMonth);
        })
        .catch((err)=>console.log("fecth chưa xong last month"))
        .finally(()=>setIsLoading(false))
        console.log("hàm fecthdata của tab progress đã chạy")
    }

    // useeffect 
    useEffect(()=>{
        _getUserIdAndFetchData();
    },[])

    return (
        <View>
        {isLoading 
            // Loading screen
            ? <View style={{   
                flex: 1,
                justifyContent: 'center',
                paddingTop: windowHeight/3 
            }}>
                <ActivityIndicator size="large" color="#4CD964"/>
            </View>
            //Show 
            :<SafeAreaView>
                <StatusBar style="auto"/>
                <ScrollView
                style={{backgroundColor:'#fff'}}
                >   

                    <Text style={styles.titleToday}>TODAY</Text>
                    <ViewShowToday
                    data={dataToday}/>
                
                    <Text style={styles.titleToday}>THIS WEEK</Text>
                    <ViewShowChart
                    dataMon={dataMon}
                    dataTue={dataTue}
                    dataWed={dataWed}
                    dataThu={dataThu}
                    dataFri={dataFri}
                    dataSat={dataSat}
                    dataSun={dataSun}/>
                
                    <Text style={styles.titleToday}>MONTHLY</Text>
                    <ViewShowData 
                    timeStatus= 'month'
                    dataThisMonth = {dataThisMonth}
                    dataLastMonth ={dataLastMonth}/>    

                </ScrollView>
            </SafeAreaView>
        }
        </View>
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
