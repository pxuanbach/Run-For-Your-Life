import React from 'react';
import {Text, View, Image, ImageBackground, ScrollView, Dimensions} from 'react-native';
import FoodRecommendCard from '../../../components/FoodRecommendCard';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';

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
                            Calories consumed:
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
                backgroundColor: Constants.COLOR.light_gray
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
                <FoodRecommendCard 
                    text="Vegestables"
                    image={require('../../../images/foodImage.jpg')}
                    h = {windowHeight}
                    w = {windowWidth}
                    onPress={() => navigation.navigate("FoodScreen", 
                        {type: 'vegetables', name: 'Vegetables'})}
                >
                </FoodRecommendCard>

                <FoodRecommendCard 
                    text="Fruits"
                    image={require('../../../images/foodImage.jpg')}
                    h = {windowHeight}
                    w = {windowWidth}
                    onPress={() => navigation.navigate('FoodScreen', 
                        {type: 'fruits', name: 'Fruits'})}
                >
                </FoodRecommendCard>

                <FoodRecommendCard 
                    text="Animal Origin"
                    image={require('../../../images/foodImage.jpg')}
                    h = {windowHeight}
                    w = {windowWidth}
                    onPress={() => navigation.navigate('FoodScreen', 
                        {type: 'animalOrigin', name: 'Animal Origin'})}
                >
                </FoodRecommendCard>
            </View>
        </ScrollView>
    )
}

export default NutritionTab