import React, {useState} from 'react';
import {Text, Image, 
    TouchableOpacity, FlatList, 
    View, Modal, SafeAreaView,
} from 'react-native';
import { paddingBottom } from 'styled-system';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import {IconButtonDesign} from './CustomButton';
import { MaterialIcons } from '@expo/vector-icons';

const FoodCard = ({windowHeight, windowWidth, urlImage, name, calories, onPress}) => {
    const w = windowWidth;
    const h = windowHeight;
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            height: h/5 + 12,
            width: w/2-12, 
            backgroundColor: Constants.COLOR.white,
            margin: 6,
            borderRadius: 12,
            flexDirection: "column",
            elevation: 6,
        }}>
            <View style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: "center",
            }}>
                <Image source={{
                    uri: urlImage
                }}
                style={{
                    height: h/8 + 10,
                    width: w/2 - 20, 
                    borderRadius: 10,
                }}>
                </Image>
                <FontLoader>
                    <Text style={{
                        fontFamily: "SemiBold",
                        fontSize: 18,
                        paddingHorizontal: 5,
                        color: Constants.COLOR.dark_green
                    }}>
                        {name}   
                    </Text>
                    <Text style={{
                        fontFamily: "SemiRegular",
                        fontSize: 17,
                        paddingHorizontal: 5,
                        alignSelf: "center",
                        color: Constants.COLOR.second_green
                    }}>
                        {calories} calories  
                    </Text>
                </FontLoader>
            </View>
        </TouchableOpacity>
    )
}

const ListFoodCard = ({windowHeight, windowWidth, data, type}) => {
    const [modalVisible, setModalVisible] = useState(false);
    var [curItem, setCurItem] = useState("urlImage", 
        "_id", "name", "type", "calories", "totalWeight", 
        "fat", "protein", "carbohydrates", "cholesterol");

    return (
        <SafeAreaView>
            <Modal
            transparent={true}
            animationType='fade'
            visible={modalVisible}
            
            onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{
                    backgroundColor: Constants.COLOR.white,
                    flex: 1,
                    margin: 20,
                    marginVertical: 100,
                    borderRadius: 20,
                    borderColor: Constants.COLOR.second_green,
                    borderWidth: 2
                }}>
                    <Image source={{
                        uri: curItem.urlImage
                    }}
                    style={{
                        height: windowHeight/3,
                        justifyContent: 'flex-start',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        margin: 4,
                    }}>
                    </Image>
                    <FontLoader>
                        <Text style={{
                            fontSize: 28,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Name: {curItem.name}</Text>
                        <Text style={{
                            fontSize: 20,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Type: {curItem.type}</Text>
                        <Text style={{
                            fontSize: 20,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Calories: {curItem.calories}</Text>
                        <Text style={{
                            fontSize: 20,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Total weight: {curItem.totalWeight}</Text>
                        <Text style={{
                            fontSize: 20,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Fat: {curItem.fat}</Text>
                        <Text style={{
                            fontSize: 20,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Protein: {curItem.protein}</Text>
                        <Text style={{
                            fontSize: 20,
                            padding: 2,
                            paddingLeft: 8,
                            color: Constants.COLOR.dark_green,
                            fontFamily: 'RobotoRegular'
                        }}>Carbohydrates: {curItem.carbohydrates}</Text>
                    </FontLoader>
                    <View style={{
                        position: 'absolute',
                        bottom: 4,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        padding: 4
                    }}>
                        <IconButtonDesign
                        text="Share"
                        width={120}
                        height={46}
                        iconName="share">
                        </IconButtonDesign>
                        <IconButtonDesign
                        onPress={() => setModalVisible(!modalVisible)}
                        text="Close"
                        width={120}
                        height={46}
                        iconName="cancel">
                        </IconButtonDesign>
                    </View>
                </View>
            </Modal>
            <FlatList 
                numColumns={2}
                data={data}
                showsVerticalScrollIndicator={true}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <View item = {item} key={item._id}>
                            {item.type === String(type) ?
                            <View>
                                <FoodCard
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setCurItem(item)
                                }}
                                windowHeight={windowHeight}
                                windowWidth={windowWidth}
                                urlImage={item.urlImage}
                                name={item.name}
                                calories={item.calories}
                                >
                                </FoodCard>
                            </View>
                            : null}
                        </View>
                    )
                }}
                contentContainerStyle={{
                    paddingBottom: windowHeight/16 + 2
                }}>
            </FlatList>
        </SafeAreaView>
    )
}


export default ListFoodCard