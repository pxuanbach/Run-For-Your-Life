import React from 'react';
import {Text, Image, TouchableOpacity, FlatList, View} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const FoodCard = ({windowHeight, windowWidth, image, foodName, calories, onPress}) => {
    const w = windowWidth;
    const h = windowHeight;
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            height: h/5,
            width: w*3/10, 
            backgroundColor: Constants.COLOR.white,
            margin: 4,
            borderRadius: 12,
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
        }}>
            <Image source={image}
            style={{
                height: h/10,
                width: w/4, 
                borderRadius: 10,
                marginTop: 8
            }}>
            </Image>
            <FontLoader>
                <Text style={{
                    fontFamily: "SemiRegular",
                    fontSize: 18,
                    paddingHorizontal: 5,
                }}>
                    {foodName}   
                </Text>
                <Text style={{
                    fontFamily: "SemiRegular",
                    fontSize: 17,
                    paddingHorizontal: 5,
                    alignSelf: "center"
                }}>
                    {calories} calo   
                </Text>
            </FontLoader>
        </TouchableOpacity>
    )
}

const ListFoodCard = ({windowHeight, windowWidth, data}) => {
    return (
        <FlatList 
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                return (
                    <View item = {item} key={item.id}>
                        <FoodCard 
                        windowHeight={windowHeight}
                        windowWidth={windowWidth}
                        image={require("../images/banhmi.jpg")}
                        foodName={item.foodName}
                        calories={item.calo}
                        >
                        </FoodCard>
                    </View>
                    
                )
            }}
            keyExtractor={item => item.id}>
        </FlatList>
    )
}


export default ListFoodCard