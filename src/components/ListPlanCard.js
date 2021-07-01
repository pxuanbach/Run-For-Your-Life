import React, {useState} from 'react';
import {
    Text, FlatList, View, Dimensions, AsyncStorage
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import PlanRecommendedCard from './PlanRecommendedCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ListPlanCard = ({title, datas, navigation}) => {
    const _storeData = async (key, data) => {
        try {
          await AsyncStorage.setItem(
            key, data
          );
        } catch (error) {
          console.log(error)
        }
      };

    return (
        <View style={{
            paddingLeft: 4,
        }}>
            <View>
                <FontLoader>
                    <Text numberOfLines={1} ellipsizeMode="tail"
                    style={{
                        fontFamily: 'SemiBold',
                        fontSize: windowHeight/30,
                        color: Constants.COLOR.dark_green,
                        paddingHorizontal: 12, 
                    }}>
                        {title}
                    </Text>
                </FontLoader>
            </View>
            <View style={{
                width: '100%',
            }}>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={datas}
                keyExtractor={item => item._id}
                style={{flexWrap: 'wrap',}}
                renderItem={({item}) => {
                    return (
                        <View item={item} key={item._id} style={{
                            width: windowWidth - windowWidth/5,
                        }}>
                            <PlanRecommendedCard
                            onPress={() => {
                                console.log(item.webUrl);
                                if (title === "Plans") {
                                    _storeData("curTitle", item.title);
                                    _storeData("curImageUrl", item.imageUrl);
                                    _storeData("curWebUrl", item.webUrl);
                                }
                                navigation.navigate('PlanScreen', {
                                    name: title,
                                    webUrl: item.webUrl
                                })
                            }}
                            image={item.imageUrl}
                            tittle={item.title}/>
                        </View>
                    )
                }}
                ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 8
                }}/>
                
            </View>
        </View>
    )
}

export default ListPlanCard