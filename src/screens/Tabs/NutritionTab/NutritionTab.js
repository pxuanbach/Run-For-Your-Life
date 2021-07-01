import React, {useEffect, useState} from 'react';
import {
    Text, View, FlatList, AsyncStorage,
    ScrollView, Dimensions, SafeAreaView, ActivityIndicator
} from 'react-native';
import {IconButtonDesign, PhraseButton} from '../../../components/CustomButton'
import FoodRecommendCard from '../../../components/FoodRecommendCard';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import { TestRModal } from '../../../components/CustomModal';
import jwt_decode from "jwt-decode";
import Axios from 'axios';

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
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [birthday, setBirthday] = useState(new Date());
    const [isInfoUserLoading, setIsInfoUserLoading] = useState(true);
    const [isTypeFoodLoading, setIsTypeFoodLoading] = useState(true);
    const [info, setInfo] = useState({});
    const [isTested, setIsTested] = useState(false);
    const [listType, setListType] = useState([]);
    let postApi = 'https://runapp1108.herokuapp.com/api/food/foodtype';

    const checkNullUndefined = (data) => {
        if (data === undefined || data === null || data === "")
            return false;
        return true;
    }

    const fetchTypeFood = () => {
        fetch(postApi)
          .then((response) => response.json())
          .then((json) => {
              setListType(json);
          })
          .catch((error) => console.error(error))
          .finally(() => setIsTypeFoodLoading(false));
    }

    const fetchDataUser = () => {
        AsyncStorage.getItem("authToken")
        .then( async (token) => { 
            var vl = jwt_decode(token)
            console.log('Token decode',vl._id)
            Axios.get(`https://runapp1108.herokuapp.com/api/users/getInfo/${vl._id}`)
            .then((res)=>{
                setInfo(res.data);
                if (checkNullUndefined(res.data.note)) {
                    setCalorie(res.data.note);
                    setIsTested(true);
                }
                if (checkNullUndefined(res.data.birthday))
                    setBirthday(new Date(res.data.birthday));
                if (checkNullUndefined(res.data.weight))
                    setWeight(res.data.weight);
                console.log(res.data.weight)
                if (checkNullUndefined(res.data.gender))
                    setGender(res.data.gender);
                console.log(res.data.gender)
                if (checkNullUndefined(res.data.height))
                    setHeight(res.data.height);
                setIsInfoUserLoading(false);
            })
            .catch((error)=>{
                console.log(error)
                setIsInfoUserLoading(false);
            })
            
        }) 
    }

    const HandleSaveCalorie = (calo) => {
        AsyncStorage.getItem("authToken")
        .then( async (token) => { 
            var vl = jwt_decode(token)
            console.log('Token decode',vl._id)
            let UserID = vl._id;
            console.log(UserID)

            //console.log('height:',height)
            //console.log('weight',weight)

            await Axios.post('https://runapp1108.herokuapp.com/api/users/Infov2',{
                UserID: info.user,
                fullname: info.fullname, 
                address: info.address,
                birthday: info.birthday,
                description: info.description,
                gender: info.gender,
                height: info.height,
                weight: info.weight,
                job: info.job,
                phone: info.phone,
                note: calo,
                image: info.image,
            })
            .then((res) => {

            })
            .catch((err)=> {
                console.log(err)
            })
        })
    }

    useEffect(() => {
        fetchTypeFood();
        fetchDataUser();
    }, [])

    return (
        <SafeAreaView style={{
            flexDirection: "column",
            height: '100%',
        }}>
            <TestRModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCalorie={setCalorie}
            setIsTested={setIsTested}
            saveCalorie={HandleSaveCalorie}
            gender={gender}
            weight={weight}
            height={height}
            birthday={birthday}/>
            {/* header */}
            <View style={{
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
                            Nutrition
                        </Text>
                    </FontLoader>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 4
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
            {!isTested ? isInfoUserLoading ? <View style={{
                flex: 1,
                padding: 8,
                paddingHorizontal: 12,
                justifyContent: 'center',
            }}>
                <ActivityIndicator color={Constants.COLOR.green}/>
            </View>
            : <View style={{
                padding: 8,
                paddingHorizontal: 12,
                alignContent: 'center',
                flexDirection: 'row'
            }}>
                <IconButtonDesign
                onPress={() => {
                    fetchDataUser();
                    setModalVisible(!modalVisible);
                }}
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
            </View> : null}
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
                            onPress={() => {
                                fetchDataUser();
                                setModalVisible(!modalVisible);
                            }}
                            iconName="assignment-turned-in"
                            iconSize={windowHeight/30}
                            color={Constants.COLOR.green}
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
                {isTypeFoodLoading ? <View style={{
                    flex: 1,
                    padding: 8,
                    paddingHorizontal: 12,
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator color={Constants.COLOR.green}/>
                </View> 
                : <View style={{
                    height: '90%'
                }}>
                    <FlatList data={listType}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                        return (
                            <View item={item} key={item._id} style={{
                                paddingHorizontal: 12
                            }}>
                                <FoodRecommendCard
                                onPress={() => {
                                    navigation.navigate("FoodScreen", {
                                        name: item.typeName, type: item.type
                                    })
                                }}
                                text={item.typeName}
                                image={item.image}
                                />
                            </View>
                        )
                    }}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}/>
                </View>}
                
            </View>
        </SafeAreaView>
    )
}

export default NutritionTab