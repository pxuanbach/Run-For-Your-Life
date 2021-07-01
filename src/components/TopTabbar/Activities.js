import React, {useState, useEffect} from 'react';
import {View, Dimensions, FlatList, SafeAreaView, AsyncStorage, ActivityIndicator} from 'react-native';
import ActivityCard from '../ActivityCard';
import jwt_decode from "jwt-decode";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


function Activities({navigation}) {

    //const [username, setUsername]=useState()
    const [userid, setUserid] = useState()
    const [isLoadingid, setIsLoadingId] = useState(true)
    const [isLoading, setIsLoading]=useState(true)

    const [datas,setDatas] = useState([])
    var listData=[]
    //hàm get user id
    const _getuserid=()=>{
        AsyncStorage.getItem("authToken")
        .then(async(token)=>{
            var vl = jwt_decode(token)
            setUserid(vl._id)
            setIsLoadingId(false)
        })
        .catch((err)=>console.log(err))
    }
    //hàm fecth data 
    async function _fecthdata(){
        await fetch("http://my-app-de.herokuapp.com/api/activities/userID/"+userid)
        .then((res)=>res.json())
        .then((json)=>{
            json.map((data)=>{
                listData.push(data)    
            })
            setDatas(listData)
        })
        .catch((err)=>console.log("load list activities chưa kịp"))
        .finally(()=>setIsLoading(false))
    }
    //useEffect
    useEffect(()=>{
        _getuserid();
        _fecthdata();
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
            :
        <SafeAreaView style={{height: '100%', backgroundColor: '#ececec'}}>
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