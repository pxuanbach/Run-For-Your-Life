import React, {useEffect, useState} from 'react';
import {
    Text, View, FlatList, AsyncStorage,
    ScrollView, Dimensions, SafeAreaView
} from 'react-native';
import {IconButtonDesign, PhraseButton} from '../../../components/CustomButton'
import FoodRecommendCard from '../../../components/FoodRecommendCard';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import { TestRModal } from '../../../components/CustomModal';
import jwt_decode from "jwt-decode";
import Axios from 'axios';
import Moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var datas = [
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/us-news-world-report-best-worst-diets-2021-1440x810.jpg?alt=media&token=d2c78279-bfd4-43d5-ae1d-6776baba7490",
        name: "Vegetables",
        type: "vegetables",
    },
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/us-news-world-report-best-worst-diets-2021-1440x810.jpg?alt=media&token=d2c78279-bfd4-43d5-ae1d-6776baba7490",
        name: "Fruits",
        type: "fruits",
    },
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/us-news-world-report-best-worst-diets-2021-1440x810.jpg?alt=media&token=d2c78279-bfd4-43d5-ae1d-6776baba7490",
        name: "Animal Origin",
        type: "animalOrigin",
    },
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/us-news-world-report-best-worst-diets-2021-1440x810.jpg?alt=media&token=d2c78279-bfd4-43d5-ae1d-6776baba7490",
        name: "Animal",
        type: "animal",
    },
]

function NutritionTab({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [calorie, setCalorie] = useState(0);
    const [R, setR] = useState(0)
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [birthday, setBirthday] = useState(new Date());

    const [isTested, setIsTested] = useState(false);

    const calculateDailyCalorie = () => {
        let bmr = 0;
        var currentDay = new Date();
        if (gender === "Male") {
            bmr = (13.397 * weight) + (4.799 * height) 
                - (5.677 * (currentDay.getFullYear() - birthday.getFullYear())) + 88.362;
        }
        else {
            bmr = (9.247 * weight) + (3.098 * height) 
                - (4.33 * (currentDay.getFullYear() - birthday.getFullYear())) + 447.593;
        }
        //console.log((R*bmr).toFixed(2));
        setCalorie((R*bmr).toFixed(2));
    }

    const checkNullUndefined = (data) => {
        if (data === undefined || data === null || data === "")
            return false;
        return true;
    }

    const fetchData = () => {
        AsyncStorage.getItem("authToken")
        .then( async (token) => { 
            var vl = jwt_decode(token)
            console.log('Token decode',vl._id)
            Axios.get(`https://runapp1108.herokuapp.com/api/users/getInfo/${vl._id}`)
            .then((res)=>{
                if (checkNullUndefined(res.data.weight))
                    setWeight(res.data.weight);
                if (checkNullUndefined(res.data.gender))
                    setGender(res.data.gender);
                if (checkNullUndefined(res.data.height))
                    setHeight(res.data.height);
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
            
        }) 
    }

    useEffect(() => {
        fetchData();
        calculateDailyCalorie();
    }, []);

    return (
        <SafeAreaView style={{
            flexDirection: "column",
            height: '100%',
        }}>
            <TestRModal
            setR={setR}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCalorie={setCalorie}
            setIsTested={setIsTested}
            gender={gender}
            weight={weight}
            height={height}
            birthday={birthday}/>
            {/* header */}
            <View style={{
                height: windowHeight/16,
                margin: 8,
                marginHorizontal: 12,
                backgroundColor: Constants.COLOR.white,
                borderRadius: 15,
                marginTop: windowHeight/24,
                elevation: 7
            }}>
                <FontLoader>
                    <Text style={{
                        fontFamily: 'SemiBold',
                        fontSize: windowHeight/24,
                        color: Constants.COLOR.dark_green,
                        paddingHorizontal: 12, 
                    }}>
                        Nutrition
                    </Text>
                </FontLoader>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                {/* left */}
                <View style={{
                    height: windowHeight/8,
                    width: windowWidth/3,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Constants.COLOR.green,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    elevation: 7
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/36,
                            color: Constants.COLOR.white,
                            textAlignVertical: 'center',
                            textAlign: 'center'
                        }}>
                            Daily calorie intake
                        </Text>
                    </FontLoader>
                </View>
                <View style={{width: 2}}></View>
                {/* main */}
                <View style={{
                    height: windowHeight/8,
                    width: windowWidth/2 + windowWidth/10,
                    backgroundColor: Constants.COLOR.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 7
                }}>
                    <FontLoader>
                        <Text numberOfLines={1} ellipsizeMode="tail"
                        style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/24,
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 8,
                            textAlignVertical: 'center'
                        }}>
                            ~ {calorie}
                        </Text>
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/40,
                            color: Constants.COLOR.second_green,
                            paddingHorizontal: 12,
                        }}>
                            Calories
                        </Text>
                    </FontLoader>
                </View>
            </View>
            {/* test */}
            {!isTested && <View style={{
                padding: 8,
                paddingHorizontal: 12,
                alignContent: 'center',
                flexDirection: 'row'
            }}>
                <IconButtonDesign
                onPress={() => setModalVisible(!modalVisible)}
                iconName="assignment"
                iconSize={32}
                height={windowWidth/8}
                width={windowWidth/3}
                text="Test"/>
                <View style={{
                    width: windowWidth*2/3
                }}>
                    <Text style={{
                        fontFamily: 'RobotoRegular',
                        fontSize: windowHeight/40,
                        color: Constants.COLOR.second_green,
                        paddingHorizontal: 8,
                    }}>Complete test to calculate your daily calorie intake.</Text>
                </View>
            </View>}
            {/* Tag + list type food */}
            <View style={{
                height: isTested ? '75%' : '64%',
            }}>
                <View style={{
                    paddingHorizontal: 12
                }}>
                    <FontLoader>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontFamily: "SemiBold",
                                fontSize: windowHeight/30,
                                color: Constants.COLOR.dark_green
                            }}>
                                Food Categories
                            </Text>
                            
                            {isTested && <PhraseButton
                            onPress={() => {setModalVisible(!modalVisible)}}
                            iconName="assignment-turned-in"
                            iconSize={windowHeight/30}
                            color={Constants.COLOR.second_green}
                            phrase="Re-Test"
                            windowHeight={windowHeight}/>}
                        </View>
                        
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/40,
                            color: Constants.COLOR.second_green,
                            paddingHorizontal: 8, 
                        }}>
                            Select the type of food you want to see
                        </Text>
                    </FontLoader>
                </View>
                <View style={{
                    height: '90%'
                }}>
                    <FlatList data={datas}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={item => item.type}
                    renderItem={({item}) => {
                        return (
                            <View item={item} key={item.type} style={{
                                paddingHorizontal: 12
                            }}>
                                <FoodRecommendCard
                                onPress={() => {
                                    navigation.navigate("FoodScreen", {
                                        name: item.name, type: item.type
                                    })
                                }}
                                text={item.name}
                                image={item.imageUrl}
                                />
                            </View>
                        )
                    }}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}/>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default NutritionTab