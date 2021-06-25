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
    //tính tháng này, tháng trước yyyy-mm
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
    //get userID
    const [username, setUsername]=useState()
    const [userid, setUserid] = useState()
    const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("username");
          if (value !== null) {
            setUsername(value);
          }
        } catch (error) {
            console.log(error)
        }
      };
        useEffect(() => {
            let isMounted = true;
            _retrieveData();
            return () => { isMounted = false };
        }, [])

        console.log('username:'+username)

        useEffect(()=>{
            fetch("https://my-app-de.herokuapp.com/api/users/getID/"+username)
            .then((res)=>res.text())
            .then((text)=>{
                var u=text.split('"')
                setUserid(u[1])
            })
            .catch((err)=>console.log(err))
        })

        console.log("userid:"+userid)
        //api this last month
        var api_get_data_this_month = "https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/month/"+this_month;
        var api_get_data_last_month = "https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/month/"+last_month;
        
        console.log(api_get_data_this_month)
        console.log(api_get_data_last_month)
        //api today
        var today= moment().format();
        var t = today.split('T');
        today=t[0];
        var api_get_data_today = "https://my-app-de.herokuapp.com/api/activities/userID/"+userid+"/date/"+today;

        /// fecth data về từ api lưu vào các state
        const [isLoading, setIsLoading] = useState(true)
        const [dataThisMonth, setDataThisMonth]=useState([])
        const [dataLastMonth,setDataLastMonth] = useState([])
        const [dataToday, setDataToday]= useState([])
        var listDataThisMonth=[]
        var listDataLastMonth=[]
        var listDataToday=[]

        console.log("state");
        useEffect(()=>{
            let isMounted = true;
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
            } catch (error) {
                console.log('fecth this month err:'+error)
            }
            return () => { isMounted = false };
            console.log("useEffect this month")
        },[])

        useEffect(()=>{
            let isMounted = true;
            try {
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
            } catch (error) {
                console.log('fecth last month err:'+ error)
            }
            return () => { isMounted = false };
            console.log("useEffect last month")
        },[])

        useEffect(()=>{
            let isMounted = true;
            try {
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
            } catch (error) {
                console.log('fecth today err:'+error)
            }
            return () => { isMounted = false };
            console.log("useEffect today")
        },[])



        // useEffect(()=>{
        //     //fecth data this month
        //     try {
        //         //this month
        //         fetch(api_get_data_this_month)
        //         .then((res)=>res.json())
        //         .then((json)=>{
        //             json.map((data)=>{
        //                 listDataThisMonth.push(data)
        //             });
        //             setDataThisMonth(listDataThisMonth);
        //         })
        //         .catch((err)=>console.log(err))
        //         //last month
        //         fetch(api_get_data_last_month)
        //         .then((res)=>res.json())
        //         .then((json)=>{
        //             json.map((data)=>{
        //                 listDataLastMonth.push(data)
        //             });
        //             setDataLastMonth(listDataLastMonth);
        //         })
        //         .catch((err)=>console.log(err))
        //         //fecth today
        //         fetch(api_get_data_today)
        //         .then((res)=>res.json())
        //         .then((json)=>{
        //             json.map((data)=>{
        //                 listDataToday.push(data)
        //             });
        //             setDataToday(listDataToday);
        //         })
        //         .catch((err)=>console.log(err))
        //     } catch (error) {
        //         console.log('Error: ',error.message);
        //     }
        //     console.log("useEffect")
        // },[]);
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
