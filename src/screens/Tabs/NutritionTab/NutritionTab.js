import React from 'react';
import {
    Text, View, FlatList, 
    ScrollView, Dimensions, SafeAreaView
} from 'react-native';
import {IconButtonDesign} from '../../../components/CustomButton'
import FoodRecommendCard from '../../../components/FoodRecommendCard';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';

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
    let caloriesDaily = "2200 - 2400";
    return (
        <SafeAreaView style={{
            flexDirection: "column",
            height: '100%',
        }}>
            {/* header */}
            <View style={{
                height: windowHeight/16,
                margin: 12,
                backgroundColor: Constants.COLOR.white,
                borderRadius: 16,
                marginTop: windowHeight/24,
                alignSelf: 'center'
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
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/24,
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 12,
                            textAlignVertical: 'center'
                        }}>
                            {caloriesDaily}
                        </Text>
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/40,
                            color: Constants.COLOR.second_green,
                            paddingHorizontal: 12,
                        }}>
                            Calories left
                        </Text>
                    </FontLoader>
                </View>
            </View>
            <View style={{
                padding: 8,
                alignContent: 'center',
                flexDirection: 'row'
            }}>
                <IconButtonDesign
                iconName="assignment"
                iconSize={32}
                height={windowWidth/8}
                width={windowWidth/3}
                text="Test"/>
                <View style={{
                    width: 2*windowWidth/3,
                    paddingHorizontal: 8
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiRegular",
                            fontSize: windowHeight/38,
                            color: Constants.COLOR.dark_green
                        }}>
                            Complete the quiz to calculate your daily calorie intake!
                        </Text>
                    </FontLoader>
                </View>
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