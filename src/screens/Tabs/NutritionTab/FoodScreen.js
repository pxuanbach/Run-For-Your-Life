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
                height: isLoading ? windowHeight/10 : '10%',
                backgroundColor: Constants.COLOR.white,
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
                    color={Constants.COLOR.dark_green}
                    iconName="arrow-back-ios"
                    iconSize={32}>
                </CustomButton>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 28,
                        paddingHorizontal: 32,
                        color: Constants.COLOR.dark_green,
                    }}>
                        {navigation.getParam('name')}
                    </Text>
                </FontLoader>
            </View>
            
            {isLoading 
            // Loading screen
            ? <View style={{   
                flex: 1,
                justifyContent: 'center',
                paddingTop: windowHeight/3 
            }}>
                <ActivityIndicator size="large" color={Constants.COLOR.green}/>
            </View>
            //Show list food screen
            : <SafeAreaView style={{
                height: "90%",
                backgroundColor: Constants.COLOR.light_gray
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