import React, {useState} from 'react';
import {
    Text, View, FlatList, 
    ScrollView, Dimensions, SafeAreaView
} from 'react-native';
import {IconButtonDesign} from '../../../components/CustomButton'
import FoodRecommendCard from '../../../components/FoodRecommendCard';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import { TestRModal } from '../../../components/CustomModal';

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
]

function NutritionTab({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [calorie, setCalorie] = useState(0);
    const [R, setR] = useState(0)
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState(175);
    const [weight, setWeight] = useState(55);
    const [birthday, setbirthday] = useState(new Date());

    const calculateDailyCalorie = () => {
        let bmr = 0;
        if (gender === "Male") {
            bmr = (13.397 * weight) + (4.799 * height) 
                - (5.677 * (Date.now.getFullYear() - birthday.getFullYear())) + 88.362;
        }
        else {
            bmr = (9.247 * weight) + (3.098 * height) 
                - (4.33 * (Date.now.getFullYear() - birthday.getFullYear())) + 447.593;
        }
        setCalorie(R*bmr);
    }

    return (
        <SafeAreaView style={{
            flexDirection: "column",
            height: '100%',
        }}>
            <TestRModal
            setR={setR}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}/>
            {/* header */}
            <View style={{
                height: windowHeight/16,
                margin: 8,
                marginHorizontal: 12,
                backgroundColor: Constants.COLOR.white,
                borderRadius: 15,
                marginTop: windowHeight/24,
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
                    width: windowWidth/3 + 20,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Constants.COLOR.white,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/36,
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 4,
                            textAlignVertical: 'center',
                            textAlign: 'center'
                        }}>
                            Daily calorie intake
                        </Text>
                    </FontLoader>
                </View>
                <View style={{width: 1}}></View>
                {/* main */}
                <View style={{
                    height: windowHeight/8,
                    width: windowWidth/2 + 24,
                    backgroundColor: Constants.COLOR.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15
                }}>
                    <FontLoader>
                        <Text numberOfLines={1} ellipsizeMode="tail"
                        style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/24,
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 12,
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
            <View style={{
                padding: 8,
                alignContent: 'center',
                flexDirection: 'row'
            }}>
                <IconButtonDesign
                onPress={() => setModalVisible(!modalVisible)}
                iconName="calculate"
                iconSize={32}
                height={windowWidth/8}
                width={windowWidth/2}
                text="Calculator"/>
                
            </View>
            {/* Tag + list type food */}
            <View style={{
                height: '64%',
            }}>
                <View style={{
                    paddingHorizontal: 12
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: windowHeight/30,
                            color: Constants.COLOR.dark_green
                        }}>
                            Food Categories
                        </Text>
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