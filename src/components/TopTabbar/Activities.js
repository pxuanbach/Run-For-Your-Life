import React, {useState, useEffect} from 'react';
import { View, Dimensions, FlatList, SafeAreaView, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import ActivityCard from '../ActivityCard';
import jwt_decode from "jwt-decode";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


function Activities({navigation}) {
    //state
    const [userid, setUserid] = useState()
    const [isLoading, setIsLoading]=useState(true)
    const [isLoadingid, setIsLoadingId] = useState(true)
    const [datas,setDatas] = useState([])
    var listData=[]
    //get user id
    const _getuserid=()=>{
        AsyncStorage.getItem("authToken")
        .then(async(token)=>{
            var vl = jwt_decode(token)
            setUserid(vl._id)
        })
        .catch((err)=>console.log(err))
        .finally(()=>setIsLoadingId(false))
        console.log("đã chạy get user id của tab activity")
    }
    //function fecth data 
    const  _fecthdata= async()=>{
        await fetch("http://my-app-de.herokuapp.com/api/activities/userID/"+userid)
        .then((res)=>res.json())
        .then((json)=> async()=>{
            json.map((data)=>{
                listData.push(data)    
            })
            setDatas(listData)
        })
        .catch((err)=>console.log("load list activities chưa kịp"))
        .finally(()=>setIsLoading(false))
        console.log("đã chạy fecthdata của tab activity")
    }
    //useEffect
    useEffect(()=>{
        async function getUserIdAndFecthData(){
            try {
                await _getuserid();
                await _fecthdata();
            } catch (error) {
                console.log("lỗi tại async function get and fecth")
            }
        }
        getUserIdAndFecthData();
    },[isLoadingid])

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
            :<SafeAreaView style={{height: '100%', backgroundColor: '#ececec'}}>
            <FlatList
                data={datas}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <View item={item} key={item._id}>
                            <ActivityCard
                            title={item.title}
                            discription={item.discription}
                            date={item.date}
                            record={item.record}
                            map={item.map}/>
                        </View>
                    )
                }}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
            />
        </SafeAreaView>
        }
        </View>
    )
}

export default Activities