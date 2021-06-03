import React from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import CustomBackButton from '../../../components/CustomButton';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import listFood from '../../../datas/listFood';
import ListFoodCard from '../../../components/ListFoodCard';

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
                paddingTop: 16
            }}>
                <CustomBackButton 
                    onPress={
                        () => navigation.push("NutritionTab")
                    }
                    iconName="arrowleft">
                </CustomBackButton>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 26,
                        paddingHorizontal: 32,
                    }}>
                        Bữa {navigation.getParam('time')} ăn gì?
                    </Text>
                </FontLoader>
                
            </View>
            <View style={{
                flex: 8,
                flexDirection: "column"
            }}>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 22,
                        paddingHorizontal: 12,
                        paddingVertical: 8
                    }}>
                        Đề xuất:    
                    </Text>
                </FontLoader>
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
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 22,
                        paddingHorizontal: 12,
                        paddingVertical: 8
                    }}>
                        Ăn kiêng:    
                    </Text>
                </FontLoader>

            </View>
            
        </View>
    );
}

export default FoodScreen;