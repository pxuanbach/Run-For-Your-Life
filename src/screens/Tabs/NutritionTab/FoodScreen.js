import React, {useState, useEffect} from 'react';
import { View, Dimensions, Image, Text, SafeAreaView } from 'react-native';
import {CustomButton} from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import ListFoodCard from '../../../components/ListFoodCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function FoodScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [foodDatas, setFoodDatas] = useState([]);
    var postApi = 'https://runapp1108.herokuapp.com/api/food';
    let typeFood = String(navigation.getParam('type'));
    var listData = [];

    useEffect(() => {
        fetch(postApi)
          .then((response) => response.json())
          .then((json) => {
              json.map((data) => {
                if (data.type == typeFood) 
                    listData.push(data)
              });
              setFoodDatas(listData);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            <View
            style={{
                height: isLoading ? windowHeight/10 : '10%',
                backgroundColor: Constants.COLOR.white,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
                paddingVertical: 8,               
                paddingTop: windowHeight/26
            }}>
                <CustomButton 
                    onPress={
                        () => {
                            navigation.popToTop()
                            navigation.push("NutritionTab")
                        }
                    }
                    iconName="arrow-back-ios"
                    iconSize={32}>
                </CustomButton>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 26,
                        paddingHorizontal: 32,
                        color: Constants.COLOR.dark_green,
                    }}>
                        {navigation.getParam('name')}
                    </Text>
                </FontLoader>
            </View>
            {isLoading 
            ? <View style={{
                position: 'absolute',
                top: windowHeight/2 + 8,
                width: '100%',
                alignItems: 'center'
            }}>
                <FontLoader>
                    <Text style={{
                        color: Constants.COLOR.dark_green,
                        fontSize: 30,
                        fontFamily: 'SemiRegular',
                        alignSelf: 'center',}}
                    >Loading...</Text>
                </FontLoader>  
            </View>
            : <SafeAreaView style={{
                height: "90%"
            }}>
                    <View style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8
                    }}>
                        <FontLoader>
                            <Text style={{
                                fontFamily: "SemiBold",
                                fontSize: 22,
                                color: Constants.COLOR.dark_green
                            }}>
                                Recommended:
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: "row",
                        alignContent: "flex-start"
                    }}>
                        <ListFoodCard
                        data={foodDatas}
                        windowHeight={windowHeight}
                        windowWidth={windowWidth}
                        type={navigation.getParam('type')}
                        >
                        </ListFoodCard>
                    </View>
                    
            </SafeAreaView>
            }
        </View>
    );
}

export default FoodScreen;