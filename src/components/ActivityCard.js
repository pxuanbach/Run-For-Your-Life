import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

const ActivityCard = ({ title, discription, date, record, map }) => {
    const convertPace = () => {
        var decimalTime = record.avgPace;
        decimalTime = decimalTime * 60;
        var minutes = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        var seconds = Math.round(decimalTime);

        return (   
            <Text style={styles.itemContent}>
                {minutes}:{seconds} /km
            </Text>
        )
    }

    const convertDate = () => {
        return (moment(date).subtract(7, 'hours').format('LLLL'))
    }

    const convertTime = () => {
        var decimalTime = record.totalTime;
        decimalTime = decimalTime * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        var seconds = Math.round(decimalTime);

        if (record.totalTime > 60) {
            return (   
                <Text style={styles.itemContent}>
                    {hours}h {minutes}m
                </Text>
            )
        }
        else {
            return (   
                <Text style={styles.itemContent}>
                    {minutes}m {seconds}s
                </Text>
            )
        }
    }

    const renderIcon = () => {
        switch(record.activity) {
            case 'running':
                return <FontAwesome5 name="running" size={14} color="black" />;
            case 'bicycling':
                return <Ionicons name="bicycle-sharp" size={14} color="black" />;
            default:
                return;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18, marginHorizontal: 10, marginTop: 10, fontWeight: 'bold'}}>
                {title}
            </Text>
            
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                {renderIcon()}

                <Text style={{fontSize: 12, marginLeft: 3,}}>
                    {convertDate()}
                </Text>
            </View>

            <Text style={{fontSize: 14, marginHorizontal: 10, marginVertical: 10,}}>
                {discription}
            </Text>

            <View style={styles.containerRecord}>
                <View style={styles.itemRecord}>  
                    <Text style={styles.itemTitle}>
                        Distance
                    </Text>                  

                    <Text style={styles.itemContent}>
                        {
                            (record.distance >= 10) ? (
                                parseFloat(record.distance).toFixed(1)
                            ) : (
                                parseFloat(record.distance).toFixed(2)
                            )
                        } km     
                    </Text>
                </View>
                
                <View style={[styles.itemRecord, 
                {
                    borderLeftColor: 'gray',
                    borderLeftWidth: 0.5,
                    borderRightColor: 'gray',
                    borderRightWidth: 0.5,
                }]}>
                    <Text style={styles.itemTitle}>
                        Pace
                    </Text>

                    {convertPace()}                    
                </View>

                <View style={[styles.itemRecord, 
                {
                    borderRightColor: 'gray',
                    borderRightWidth: 0.5,
                }]}>  
                    <Text style={styles.itemTitle}>
                        Time
                    </Text>

                    {convertTime()}
                </View>

                <View style={styles.itemRecord}>  
                    <Text style={styles.itemTitle}>
                        Caloies
                    </Text>

                    <Text style={styles.itemContent}>
                        {record.calo} Kcal
                    </Text>
                </View>
            </View>

            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={map.region}
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}>

                {
                    map.routes.map((route, index) => {
                        return (
                            <Polyline
                            key={index}
                            coordinates={route}
                            strokeWidth={6}
                            strokeColor='green'/>
                        )
                    })
                }

                {
                    map.markerOnRoute.map((marker, index) => {
                        return (
                            <Marker 
                            key={index}
                            coordinate={marker} 
                            anchor={{x:0.5, y:0.5}}>
                                <FontAwesome name="check-circle" size={16} color="gold" />
                            </Marker>
                        )
                    })
                }

                {
                    <Marker 
                    coordinate={map.routes[0][0]}
                    anchor={{x:0, y:1}}>
                        <FontAwesome name="flag" size={24} color="gold" />
                    </Marker>
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        marginTop: 20, 
        backgroundColor: 'white',
    },
    map: {
        width: '100%',
        height: 280,
        marginBottom: 20,
    },
    containerRecord: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    itemRecord: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    itemContent: {
        fontSize: 20,
        color: 'black',
    },
    itemTitle: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 2,
    },
})

export default ActivityCard;