import React, {useState, useEffect} from 'react';
import {View, Dimensions, FlatList, SafeAreaView, AsyncStorage, ActivityIndicator} from 'react-native';
import ActivityCard from '../ActivityCard';
import jwt_decode from "jwt-decode";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Activities({navigation}) {
    const [isLoading, setIsLoading] = useState(true)
    const [datas, setDatas] = useState([])
    var listData = []

    //hàm get user id
    const getData = async ()=>{
        await AsyncStorage.getItem("authToken")
        .then(async(token) => {
            var vl = await jwt_decode(token)
            var userid =vl._id
            console.log("user id: " + userid)
            fetchData(userid);
        })
        .catch((err) => console.log(err))
        console.log("đã chạy get user id của tab progress")
    }
    //hàm fecth data 
    const fetchData = (userid) => {
        fetch("http://my-app-de.herokuapp.com/api/activities/userID/"+userid)
        .then((res) => res.json())
        .then((json) => {
            json.map((data) => {
                listData.push(data)    
            })
            setDatas(listData)
        })
        .catch((err) => console.log("load list activities chưa kịp"))
        .finally(() => setIsLoading(false))
    }
    //useEffect
    useEffect(() => {
        let isMouted = true;
        getData();
        return () => { isMounted = false };
    },[])

    return (
        <SafeAreaView style={{height: '100%', backgroundColor: '#ececec'}}>
        {
            isLoading ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size={50} color='green'/>
                </View>
            ) : (
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
                }}/>
            )
        }
        </SafeAreaView>
    )
}

export default Activities