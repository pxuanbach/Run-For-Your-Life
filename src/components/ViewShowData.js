import React, {useState} from 'react';
import {Text, Image, TouchableOpacity, FlatList, View, Modal, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import { borderBottom, borderRadius } from 'styled-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const ViewShowData =({timeStatus})=>
{
    const [status, setStatus] = useState('timeStatus')
    return(
        <View
        style={{width: windowWidth,
        height: windowHeight*0.45,
        backgroundColor:"#fff",
        marginHorizontal:windowWidth*0.1,
        alignSelf:'center',
        marginTop:10
        }}>
            <View
            style={{height:windowHeight*0.05,
            borderColor:"black",
            borderWidth:0.5,
            backgroundColor:"white",
            flexDirection:'row',
            }}>
                <Text
                style={{
                    alignSelf:'center',
                    marginLeft:windowWidth*0.52
                    }}>
                this {timeStatus}
                </Text>
                <Text
                style={{
                    alignSelf:'center',
                    marginLeft:windowWidth*0.075
                    }}>
                last {timeStatus}
                </Text>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.distance}>
                    <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
                    <Text> Distance</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>          
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.distance}>
                    <MaterialCommunityIcons name="speedometer" size={24} color="black" />
                    <Text> Avg Pace</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row',marginTop:-1}}>
                <View style={styles.distance}>
                    <Ionicons name="time" size={24} color="black" />
                    <Text> Time</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row', marginTop:-1}}>
                <View style={styles.distance}>
                    <FontAwesome5 name="fire-alt" size={24} color="black" />
                    <Text> Calories Burned</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>
            <View style={{flexDirection:'row', marginTop:-1}}>
                <View style={styles.distance}>
                    <FontAwesome5 name="running" size={24} color="black" />
                    <Text> Activities</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                <View style={styles.viewTextData}>
                    <Text style={styles.textData}>{(Math.random()*1000).toFixed(0)}</Text>
                </View>
                    
            </View>        
        </View>
    )
}
export default ViewShowData

const styles=StyleSheet.create({
    distance:{
        height: windowHeight*0.08,
        flex:0.5,
        borderColor:"black",
        borderWidth:0.5,
        backgroundColor:"white",
        //justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:-1,
        marginBottom:1,
        flexDirection:'row',
        paddingLeft:10
    },
    textData:{
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    viewTextData:{
        backgroundColor:"white",
        borderWidth:0.5,
        justifyContent:'center',
        flex: 0.25,
        marginTop:-1,
        marginBottom:1,
        marginLeft:-1
    }
})