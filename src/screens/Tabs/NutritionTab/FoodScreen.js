import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, SafeAreaView, ActivityIndicator } from 'react-native';
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
        let isMounted = true;
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
          return () => { isMounted = false };
    }, []);

    return (
        <View>
            {/* header: back button + tittle */}
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.green,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 2,
                paddingVertical: 4,               
                paddingTop: windowHeight/26
            }}>
                <CustomButton 
                    onPress={
                        () => {
                            navigation.popToTop()
                            navigation.navigate("NutritionTab")
                        }
                    }
                    color={Constants.COLOR.white}
                    iconName="arrow-back-ios"
                    iconSize={32}>
                </CustomButton>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: windowHeight/30,
                        paddingHorizontal: 32,
                        color: Constants.COLOR.white,
                    }}>
                        {navigation.getParam('name')}
                    </Text>
                </FontLoader>
            </View>
            {/* show list food */}
            <SafeAreaView style={{
                height: "90%",
                backgroundColor: Constants.COLOR.light_gray
            }}>
                {isLoading 
                // Loading screen
                ? <View style={{   
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size="large" color={Constants.COLOR.green}/>
                </View>
                    : <View style={{
                        height: '100%'
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
                            type={navigation.getParam('name')}>
                            </ListFoodCard>
                        </View>
                    </View>}
            </SafeAreaView>
        </View>
    );
}

export default FoodScreen;