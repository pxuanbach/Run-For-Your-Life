import React from 'react';
import {Text, Dimensions , ScrollView, View, StyleSheet, SafeAreaView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ActivitiesCard=({dateTime, map, distance, time, avgPace, calories})=>
{
    return(
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View 
                    style={{
                        flexDirection:'row',
                        }}>
                        <View
                        style={{
                            backgroundColor:'#ddd',
                            padding:10,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <MaterialCommunityIcons name="run-fast" size={30} color="black" />
                        </View>
                        <View 
                        style={{
                            backgroundColor:"#dddddd",
                            padding:10,
                            flex:1
                            }}>
                            <Text 
                            style={{
                                fontSize:20,
                                fontWeight:'bold',
                            }}>
                                {dateTime}
                            </Text>
                            <Text 
                            style={{
                                fontSize:14,
                                fontWeight:'200'
                            }}>
                                Jun 14, 2021 8:46 PM
                            </Text>
                        </View>
                    </View>
                    <View >
                        <Text 
                        style={{
                            backgroundColor:"#fff",
                            height:windowHeight*0.3,

                        }}>
                            {map}
                        </Text>
                    </View>
                    <View
                    style={{
                        backgroundColor:"#dddddd",
                        flexDirection:'row',
                    }}>
                        <View
                        style={styles.detail}>
                            <Text>
                                {distance}
                            </Text>
                            <Text 
                            style={{
                                fontWeight:'500'
                            }}>
                                km
                            </Text>
                        </View>

                        <View
                        style={styles.detail}>
                            <Text>
                                {time}
                            </Text>
                            <Text 
                            style={{
                                fontWeight:'500'
                            }}>
                                min
                            </Text>
                        </View>

                        <View
                        style={styles.detail}>
                            <Text>
                                {avgPace}
                            </Text>
                            <Text 
                            style={{
                                fontWeight:'500'
                            }}>
                                min/km
                            </Text>
                        </View>

                        <View
                        style={styles.detail}>
                            <Text>
                                {calories}
                            </Text>
                            <Text 
                            style={{
                                fontWeight:'500'
                            }}>
                                calories
                            </Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ActivitiesCard

const styles=StyleSheet.create({
    detail:{
        backgroundColor:"#ddd",
        borderColor:"black",
        height:windowHeight*0.1,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    }
})