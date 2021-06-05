import React from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import listFood from '../../../datas/listFood';
import ListFoodCard from '../../../components/ListFoodCard';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function FoodScreen({navigation}) {
    const [_showTip, setShowTip] = React.useState(true)
    return (
        <View>
            <View
            style={{
                backgroundColor: Constants.COLOR.white,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
                paddingVertical: 8,               
                paddingTop: 26
            }}>
                <CustomButton 
                    onPress={
                        () => navigation.push("NutritionTab")
                    }
                    iconName="ios-chevron-back-outline"
                    iconSize={30}>
                </CustomButton>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 26,
                        paddingHorizontal: 32,
                        color: Constants.COLOR.dark_green
                    }}>
                        Bữa {navigation.getParam('time')} ăn gì?
                    </Text>
                </FontLoader>
                
            </View>
            <SafeAreaView style={{
                height: windowHeight-112,
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                Đề xuất:    
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={{
                        height: windowHeight/5 + 8,
                        flexDirection: "row",
                        alignContent: "flex-start"
                    }}>
                        <ListFoodCard
                        data={listFood}
                        windowHeight={windowHeight}
                        windowWidth={windowWidth}
                        >
                        </ListFoodCard>
                    </View>
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
                                Ăn kiêng:   
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={{
                        height: windowHeight/5 + 8,
                        flexDirection: "row",
                        alignContent: "flex-start"
                    }}>
                        <ListFoodCard
                        data={listFood}
                        windowHeight={windowHeight}
                        windowWidth={windowWidth}
                        >
                        </ListFoodCard>
                    </View>
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
                                Dinh dưỡng vừa đủ:   
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={{
                        height: windowHeight/5 + 8,
                        flexDirection: "row",
                        alignContent: "flex-start"
                    }}>
                        <ListFoodCard
                        data={listFood}
                        windowHeight={windowHeight}
                        windowWidth={windowWidth}
                        >
                        </ListFoodCard>
                    </View>
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
                                Giàu dinh dưỡng:   
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={{
                        height: windowHeight/5 + 8,
                        flexDirection: "row",
                        alignContent: "flex-start"
                    }}>
                        <ListFoodCard
                        data={listFood}
                        windowHeight={windowHeight}
                        windowWidth={windowWidth}
                        >
                        </ListFoodCard>
                    </View>
                </ScrollView>
            </SafeAreaView>
            
            
        </View>
    );
}

export default FoodScreen;