import React from 'react';
import {Text, View, Image, ImageBackground, ScrollView, Dimensions} from 'react-native';
import FoodRecommendCard from '../../../components/FoodRecommendCard';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import FoodScreen from './FoodScreen';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function NutritionTab({navigation}) {
    let Calories = 400;
    return (
        <ScrollView style={{
            flexDirection: 'column'
        }}>
            <ImageBackground 
            source={require('../../../images/foodImage.jpg')}
            style={{width: '100%', flex: 1}}>
                <FontLoader>
                    <View style={{
                        backgroundColor: Constants.COLOR.white,
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        borderRadius: 18,
                        marginTop: 20,
                        marginLeft: 8,
                        padding: 5
                    }}>
                        <Text style={{
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'SemiBold',
                            fontSize: 24,
                        }}>
                            Calories đã tiêu thụ:
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'flex-end', 
                        elevation: 7
                    }}>
                        <Text style={{
                            fontFamily: 'SemiBold',
                            fontSize: 55,
                            color: Constants.COLOR.dark_green,
                            marginRight: 10,  
                            
                        }}>
                            {Calories}
                        </Text>
                        <Text style={{
                            fontFamily: 'SemiBold',
                            fontSize: 24,
                            top: 33,
                            color: Constants.COLOR.white,
                            marginRight: 5,
                        }}>
                            calories.
                        </Text>
                        
                    </View>
                </FontLoader>
            </ImageBackground>
            <View style={{
                flex: 7,
                padding: 10,
            }}>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiRegular",
                        fontSize: 22,
                    }}>
                        Bạn đã tiêu thụ {Calories} Calo.
                    </Text>
                    <Text style={{
                        fontFamily: "SemiRegular",
                        fontSize: 22,
                    }}>
                        Vì vậy, bạn nên chọn loại thức ăn giàu dinh dưỡng.
                    </Text>
                </FontLoader>
                <FoodRecommendCard 
                    text="Ăn sáng"
                    image={require('../../../images/foodImage.jpg')}
                    h = {windowHeight}
                    w = {windowWidth}
                    onPress={() => navigation.navigate("FoodScreen", {time: 'sáng'})}
                >
                </FoodRecommendCard>

                <FoodRecommendCard 
                    text="Ăn trưa"
                    image={require('../../../images/foodImage.jpg')}
                    h = {windowHeight}
                    w = {windowWidth}
                    onPress={() => navigation.navigate('FoodScreen', {time: 'trưa'})}
                >
                </FoodRecommendCard>

                <FoodRecommendCard 
                    text="Ăn tối"
                    image={require('../../../images/foodImage.jpg')}
                    h = {windowHeight}
                    w = {windowWidth}
                    onPress={() => navigation.navigate('FoodScreen', {time: 'tối'})}
                >
                </FoodRecommendCard>
            </View>
        </ScrollView>
    )
}

export default NutritionTab