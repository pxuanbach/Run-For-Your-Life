import React, {useState} from 'react';
import {
    Text, View, ScrollView, Dimensions, 
    StyleSheet, SafeAreaView, FlatList
} from 'react-native';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import PlanRecommendedCard from '../../../components/PlanRecommendedCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var listdata = [
    {
        _id: '1',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/regisImage.jpg?alt=media&token=83f1b515-6416-43e1-b0a7-15491f8f42a6',
        title: 'title 1',
        text: 'text 1'
    },
    {
        _id: '2',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/summer-running-1597413181.jpg?alt=media&token=f6bd39db-0484-4d6c-9652-53c0c3c30f1f',
        title: 'title 2',
        text: 'text 2'
    }
]

function PlansTab() {
    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                {/*  */}
                <View style={{
                    height: windowHeight/10,
                    margin: 12,
                    backgroundColor: Constants.COLOR.white,
                    borderRadius: 16,
                    marginTop: windowHeight/24,
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: 'SemiBold',
                            fontSize: windowHeight/24,
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 12, 
                        }}>
                            All Plans
                        </Text>
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/38,
                            color: Constants.COLOR.second_green,
                            paddingHorizontal: 12, 
                        }}>
                            Choose the plan that's fit for you
                        </Text>
                    </FontLoader>
                </View>
                {/* Tag + List plan */}
                <View style={{
                    paddingLeft: 4,
                }}>
                    <View>
                        <FontLoader>
                            <Text style={{
                                fontFamily: 'SemiBold',
                                fontSize: windowHeight/28,
                                color: Constants.COLOR.dark_green,
                                paddingHorizontal: 12, 
                            }}>
                                Tag
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={{
                        width: '100%',
                    }}>
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={listdata}
                        keyExtractor={item => item._id}
                        style={{flexWrap: 'wrap',}}
                        renderItem={({item}) => {
                            return (
                                <View item={item} key={item._id} style={{
                                    width: windowWidth - windowWidth/5,
                                }}>
                                    <PlanRecommendedCard
                                    image={item.imageUrl}
                                    tittle={item.title}
                                    text={item.text}/>
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
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default PlansTab

const styles=StyleSheet.create({
    
})
