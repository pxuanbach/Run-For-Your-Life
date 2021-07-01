import React, {useState, useEffect} from 'react';
import { View, Dimensions, FlatList, SafeAreaView} from 'react-native';
import ActivityCard from '../ActivityCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var datas = [
    {
        id: '12345',
        title: 'Afternoon Run',
        discription: 'Good job',
        date: '2021-07-01T19:04:25.232+00:00',

        record: {
            activity: 'running',
            level: 'Hard',
            calo: 100,
            distance: 1.77,
            avgPace: 5.75, 
            totalTime: 61,
        },

        map: {
            routes: [
                [
                    {
                        latitude: 11.6003617,
                        longitude: 109.0359483,
                    },
                    {
                        latitude: 11.60035,
                        longitude: 109.0360167,
                    },
                    {
                        latitude: 11.60034,
                        longitude: 109.0360667,
                    },
                    {
                        latitude: 11.60033,
                        longitude: 109.036115,
                    },
                    {
                        latitude: 11.60035,
                        longitude: 109.0360167,
                    },
                    {
                        latitude: 11.60034,
                        longitude: 109.0360667,
                    },
                    {
                        latitude: 11.60033,
                        longitude: 109.036115,
                    },
                ]
            ],
            markerOnRoute: [],
            region: {
                latitude: 11.60032335,
                longitude: 109.03613,
                latitudeDelta: 0.00015340000000207965,
                longitudeDelta: 0.0007267999999953645,
            }
        }
    },
    {
        id: '12346',
        title: 'Morning Bicycling',
        discription: 'De vai lon',
        date: '11/3/2021',

        record: {
            activity: 'bicycling',
            level: 'Hard',
            calo: 100,
            distance: 1.77,
            avgPace: 7.25, 
            totalTime: 93.5,
        },

        map: {
            routes: [
                [
                    {
                        latitude: 11.6003617,
                        longitude: 109.0359483,
                    },
                    {
                        latitude: 11.60035,
                        longitude: 109.0360167,
                    },
                    {
                        latitude: 11.60034,
                        longitude: 109.0360667,
                    },
                    {
                        latitude: 11.60033,
                        longitude: 109.036115,
                    },
                    {
                        latitude: 11.60035,
                        longitude: 109.0360167,
                    },
                    {
                        latitude: 11.60034,
                        longitude: 109.0360667,
                    },
                    {
                        latitude: 11.60033,
                        longitude: 109.036115,
                    },
                ]
            ],
            markerOnRoute: [],
            region: {
                latitude: 11.60032335,
                longitude: 109.03613,
                latitudeDelta: 0.00015340000000207965,
                longitudeDelta: 0.0007267999999953645,
            }
        }
    },
    {
        id: '12347',
        title: 'Evening Run',
        discription: 'Dep me di',
        date: '10/3/2021',

        record: {
            activity: 'running',
            level: 'Extreme',
            calo: 100,
            distance: 1.77,
            avgPace: 6.5, 
            totalTime: 11.5,
        },

        map: {
            routes: [
                [
                    {
                        latitude: 11.6003757,
                        longitude: 109.0337126,
                    },
                    {
                        latitude: 11.5989362,
                        longitude: 109.0298823,
                    },
                    {
                        latitude: 11.5977272,
                        longitude: 109.0324683,
                    },
                    {
                        latitude: 11.5954462,
                        longitude: 109.0340243,
                    },
                ]
            ],
            markerOnRoute: [],
            region: {
                latitude: 11.6003757,
                longitude: 109.0337126,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        }
    },
]

function Activities({navigation}) {
    return (
        <SafeAreaView style={{height: '100%', backgroundColor: '#ececec'}}>
            <FlatList
                data={datas}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <View item={item} key={item.id}>
                            <ActivityCard
                            title={item.title}
                            discription={item.discription}
                            date={item.date}
                            record={item.record}
                            map={item.map}/>
                        </View>
                    )
                }}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
            />
        </SafeAreaView>
    )
}

export default Activities