import React from 'react';
import {
    Text, View, FlatList, ImageBackground, Image,
    ScrollView, Dimensions, SafeAreaView
} from 'react-native';
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
]

function NutritionTab({navigation}) {
    let Calories = 400;
    return (
        <SafeAreaView style={{
            flexDirection: "column",
            height: '100%',
            backgroundColor: Constants.COLOR.light_gray
        }}>
            <View style={{
                height: '28%'
            }}>
                <Image
                source={require('../../../images/foodImage.jpg')}
                style={{width: '100%', height: '100%'}}/>
                <View style={{
                    position: 'absolute',
                    backgroundColor: Constants.COLOR.white,
                    marginTop: windowHeight/24,
                    marginLeft: windowWidth/18,
                    borderRadius: 12
                }}>
                    <FontLoader>
                        <Text style={{
                            fontSize: windowHeight/30,
                            padding: 4,
                            paddingHorizontal: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoBold'
                        }}>Calories consumed:</Text>
                    </FontLoader>
                </View>
                <View style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    bottom: 10,
                    right: 10,
                }}>
                    <FontLoader>
                        <Text style={{
                            fontSize: windowHeight/12,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoBold'
                        }}>
                            {Calories}
                        </Text>
                        <Text style={{
                            alignSelf:'flex-end',
                            fontSize: windowHeight/28,
                            padding: 8,
                            color: Constants.COLOR.white,
                            fontFamily: 'RobotoBold'
                        }}>
                            calories.
                        </Text>
                    </FontLoader>
                </View>
            </View>
            <View style={{
                height: '73%',
            }}>
                <View style={{
                    paddingHorizontal: 12
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiRegular",
                            fontSize: 22,
                            color: Constants.COLOR.dark_green
                        }}>
                            You have consumed {Calories} calories.
                        </Text>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: 24,
                            color: Constants.COLOR.dark_green
                        }}>
                            Food Categories
                        </Text>
                    </FontLoader>
                </View>
                
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
                    paddingBottom: windowHeight/36,
                }}/>
            </View>
        </SafeAreaView>
    )
}

export default NutritionTab