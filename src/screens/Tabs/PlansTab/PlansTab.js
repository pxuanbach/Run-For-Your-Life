import React, {useEffect, useState} from 'react';
import {
    Text, View, ScrollView, Dimensions, FlatList, ActivityIndicator, SectionList,
    StyleSheet, SafeAreaView, AsyncStorage
} from 'react-native';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import PlanRecommendedCard from '../../../components/PlanRecommendedCard';
import ListPlanCard from '../../../components/ListPlanCard';
import Axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function PlansTab({navigation}) {
    const [curTitle, setCurTitle] = useState("");
    const [curImageUrl, setCurImageUrl] = useState("");
    const [curWebUrl, setCurWebUrl] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [arr, setArr] = useState([]);

    const checkCurPlan = () => {
        if (curWebUrl === "" || curTitle === "" || curImageUrl === "") {
            return false;
        }
        return true;
    }

    const _storeData = async (key, data) => {
        try {
          await AsyncStorage.setItem(
            key, data
          );
        } catch (error) {
          console.log(error)
        }
    };

    const  _retrieveData = async () => {
        try {
          const curTitle = await AsyncStorage.getItem("curTitle");
          if (curTitle !== null) {
            setCurTitle(curTitle);
          }

          const curImageUrl = await AsyncStorage.getItem("curImageUrl");
          if (curImageUrl !== null) {
              setCurImageUrl(curImageUrl);
          }

          const curWebUrl = await AsyncStorage.getItem("curWebUrl");
          if (curWebUrl !== null) {
              setCurWebUrl(curWebUrl);
          }
        } catch (error) {
            
        }
    };

    useEffect(() => {
        let isMounted = true;
        _retrieveData();
        Axios.get("https://runapp1108.herokuapp.com/api/plan/")
        .then((res)=>{
            if (isMounted) {
                setArr(res.data)
                setLoading(false);
            }
        })
        .catch((error)=>{
            if (!clean)
                console.log(error.message)
        })
        return () => { isMounted = false };
    }, []);

    return (
        <SafeAreaView style={{height: '100%'}}>
            {/* header */}
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.green,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 2,
                paddingVertical: 4,
                paddingTop: windowHeight/24             
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: windowHeight/30,
                            paddingHorizontal: 32,
                            color: Constants.COLOR.white,
                            textAlign: 'center'
                        }}>
                            All Plans
                        </Text>
                    </FontLoader>
                </View>
            </View>
            <ScrollView>
                {checkCurPlan() ? 
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
                    paddingHorizontal: 12,
                    paddingBottom: 12
                }}>
                    <View style={{
                        marginTop: 4,
                        alignSelf: 'flex-start'
                    }}>
                        <View style={{
                            alignSelf: 'center',
                            padding: 4,
                            paddingHorizontal: 8,
                            backgroundColor: Constants.COLOR.green,
                            borderRadius: 12
                        }}>
                            <FontLoader>
                                <Text numberOfLines={1} ellipsizeMode="tail"
                                style={{
                                    fontFamily: 'SemiBold',
                                    fontSize: windowHeight/30,
                                    color: Constants.COLOR.white,
                                }}>
                                    Current Plan
                                </Text>
                            </FontLoader>
                        </View>
                    </View>
                    <PlanRecommendedCard
                    imageHeight={windowHeight/4}
                    image={curImageUrl}
                    tittle={curTitle}
                    onPress={() => {
                        _storeData("curTitle", curTitle);
                        _storeData("curImageUrl", curImageUrl);
                        _storeData("curWebUrl", curWebUrl);
                        navigation.navigate('PlanScreen', {
                            name: "Current Plan",
                            webUrl: curWebUrl
                        })
                    }}/>
                </View>
                : <View/>}
            {isLoading ? <View style={{
                    flex: 1,
                    padding: 8,
                    paddingHorizontal: 12,
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size="large" color={Constants.COLOR.green}/>
                </View>  
                : <SafeAreaView style={{flex: 1}}>
                    {arr.map((item) => {
                        return (
                            <View item={item} key={item._id} style={{
                                paddingVertical: 2
                            }}>
                            <ListPlanCard
                                title={item.title}
                                datas={item.list}
                                navigation={navigation}/>
                            </View>
                        )
                    })}
                </SafeAreaView>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlansTab