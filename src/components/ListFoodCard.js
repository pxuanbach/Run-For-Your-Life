import React, {useState} from 'react';
import {Text, Image, StyleSheet,
    TouchableOpacity, FlatList, Share,
    View, Modal, SafeAreaView, Dimensions
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import {IconButtonDesign} from './CustomButton';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const FoodCard = ({urlImage, name, calories, onPress}) => {
    const w = windowWidth;
    const h = windowHeight;
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            height: h/5 + 10,
            width: w/2-10, 
            backgroundColor: Constants.COLOR.white,
            margin: 5,
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

const ListFoodCard = ({data, type}) => {
    const [modalVisible, setModalVisible] = useState(false);
    var [curItem, setCurItem] = useState("urlImage", 
        "_id", "name", "type", "calories", "totalWeight", 
        "fat", "protein", "carbohydrates", "cholesterol");
    
    let messShare = 'Name: '+curItem.name+'\n'+
        'Type: '+curItem.type+'\n'+'Calories: '+curItem.calories+'\n'+
        'Total weight: '+curItem.totalWeight+' g.\n'+
        'Fat: '+curItem.fat+' g.\n'+'Protein: '+curItem.protein+' g.\n'+
        'Carbohydrates: '+curItem.carbohydrates+' g.\n'+
        'Cholesterol: '+curItem.cholesterol+' mg.\n'+curItem.urlImage;
    
    const onShare = async () => {
        try {
            const result = await Share.share({
            message: messShare,
            url: messShare,
        });
        } catch (error) {
            alert(error.message);
        }
    };

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
                    marginVertical: 80,
                    borderRadius: 20,
                    borderColor: Constants.COLOR.second_green,
                    borderWidth: 2
                }}>
                    <View style={{
                        height: '40%',
                        width: windowWidth - 48
                    }}>
                        <Image source={{
                            uri: curItem.urlImage
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'flex-start',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            margin: 2,
                        }}>
                        </Image>
                    </View>
                    
                    <FontLoader>
                        <Text style={styles.heading}>
                            Name: {curItem.name}</Text>
                        {curItem.type == "animalOrigin" 
                        ? <Text style={styles.normal}>Type: animal origin.</Text>
                        : <Text style={styles.normal}>
                            Type: {type}.</Text>}
                        <Text style={styles.normal}>
                            Calories: {curItem.calories}</Text>
                        <Text style={styles.normal}>
                            Total weight: {curItem.totalWeight} g.</Text>
                        <Text style={styles.normal}>
                            Fat: {curItem.fat} g.</Text>
                        <Text style={styles.normal}>
                            Protein: {curItem.protein} g.</Text>
                        <Text style={styles.normal}>
                            Carbohydrates: {curItem.carbohydrates} g.</Text>
                        <Text style={styles.normal}>
                            Cholesterol: {curItem.cholesterol} mg.</Text>
                    </FontLoader>
                    <View style={{
                        position: 'absolute',
                        bottom: 4,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        padding: 4
                    }}>
                        <IconButtonDesign
                        onPress={onShare}
                        text="Share"
                        width={120}
                        height={46}
                        iconName="share">
                        </IconButtonDesign>
                        <View style={{
                            width: windowWidth/10
                        }}></View>
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
                    )
                }}
                contentContainerStyle={{
                    paddingBottom: windowHeight/12 + 4
                }}>
            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: windowHeight/28,
        paddingLeft: 12,
        color: Constants.COLOR.dark_green,
        fontFamily: 'RobotoRegular'
    },
    normal: {
        fontSize: windowHeight/36,
        paddingLeft: 20,
        color: Constants.COLOR.dark_green,
        fontFamily: 'RobotoRegular'
    }
})

export default ListFoodCard