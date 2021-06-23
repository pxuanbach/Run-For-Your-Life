import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { StackActions, NavigationActions } from 'react-navigation';

const windowWidth = Dimensions.get('window').width;
const LEVEL = ['Easy', 'Normal', 'Difficult', 'Hard', 'Extreme', 'Insane'];

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'BottomTabNavigator' })],
});

export default class SaveActivityScreen extends React.Component {
    static navigationOptions = {
        title: 'Save Activity',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'green',
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            time: this.props.navigation.getParam('time'),
            distance: this.props.navigation.getParam('distance'),
            avgPace: this.props.navigation.getParam('avgPace'),
            routes: this.props.navigation.getParam('routes'),
            markerOnRoute: this.props.navigation.getParam('markerOnRoute'),

            calo: 0,
            weight: 60,

            value: 2,

            centerCoordinate: ({
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })
        };
    }

    componentDidMount() {
        this.calcBurnedCalories();
        this.findCenterCoordinate();
    }

    calcBurnedCalories = () => {
        const { time, avgPace, weight } = this.state;
        this.setState({
            calo: time * (488.241 - 464.259 * Math.pow(2.7183, 0.0029 * avgPace)) * 3.5 * weight / 200,
        }) 
    }

    findCenterCoordinate = () => {
        const { routes } = this.state;

        let coordinates = [];
        routes.map((route) => {
            route.map(coordinate => {
                coordinates.push(coordinate);
            })
        })

        let x = coordinates.map(c => c.latitude);
        let y = coordinates.map(c => c.longitude);

        let minX = Math.min.apply(null, x);
        let maxX = Math.max.apply(null, x);

        let minY = Math.min.apply(null, y);
        let maxY = Math.max.apply(null, y);

        // let delta = Math.max(maxX - minX, maxY - minY) * windowHeight / 250;

        this.setState({
            centerCoordinate: {    
                latitude: (minX + maxX) / 2,
                longitude: (minY + maxY) / 2,
                latitudeDelta: maxX - minX,
                longitudeDelta: maxY - minY,
            }
        }) 
    }

    render() {        
        const { navigation } = this.props;
        return (
            <ScrollView 
            style={{width: '100%'}}
            contentContainerStyle={styles.container}>               
                <Text style={{
                    color: 'green',
                    fontSize: 120,
                    marginTop: 5,
                    fontWeight: '300',
                }}>
                    {
                        (this.state.calo >= 100) ? (
                            parseFloat(this.state.calo).toFixed(0)
                        ) : (
                            parseFloat(this.state.calo).toFixed(2)
                        )
                    }
                </Text>

                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}>
                    BURNED CALORIES
                </Text>

                <View style={styles.containerRecord}>
                    <View style={styles.itemRecord}>
                        <MaterialCommunityIcons name="run-fast" size={24} color="green" />
                        
                        <Text style={styles.itemContent}>
                            {
                                (this.state.distance >= 10) ? (
                                    parseFloat(this.state.distance).toFixed(1)
                                ) : (
                                    parseFloat(this.state.distance).toFixed(2)
                                )
                            }      
                        </Text>

                        <Text style={styles.itemTitle}>
                            TOTAL DISTANCE
                        </Text>
                    </View>
                    
                    <View style={[styles.itemRecord, 
                    {
                        borderLeftColor: 'gray',
                        borderLeftWidth: 1,
                        borderRightColor: 'gray',
                        borderRightWidth: 1,
                    }]}>
                        <MaterialIcons name="timer" size={24} color="green" />
                        
                        <Text style={styles.itemContent}>
                            {parseFloat(this.state.time).toFixed(2)}
                        </Text>

                        <Text style={styles.itemTitle}>
                            TOTAL TIME
                        </Text>
                    </View>

                    <View style={styles.itemRecord}>
                        <MaterialCommunityIcons name="speedometer" size={24} color="green" />

                        <Text style={styles.itemContent}>
                            {parseFloat(this.state.avgPace).toFixed(2)}
                        </Text>

                        <Text style={styles.itemTitle}>
                            AVG PACE
                        </Text>
                    </View>
                </View>

                <Text style={styles.title}>
                    Your running route
                </Text>

                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={this.state.centerCoordinate}>

                    {
                        this.state.routes.map((route, index) => {
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
                        this.state.markerOnRoute.map((marker, index) => {
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
                        coordinate={this.state.routes[0][0]}
                        anchor={{x:0, y:1}}>
                            <FontAwesome name="flag" size={24} color="gold" />
                        </Marker>
                    }
                </MapView>

                <Text style={styles.title}>
                    How did that activity feel?
                </Text>

                <Text style={{
                    color: 'green',
                    fontSize: 24,
                    marginVertical: 10,
                }}>
                    {LEVEL[this.state.value]}
                </Text>
                
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    minimumTrackTintColor={'lime'}
                    thumbTintColor={'green'}
                    value={this.state.value}
                    onValueChange={value => this.setState({value: value})}/>

                <View style={styles.containerTxtInput}>
                    <TextInput 
                        style={styles.txtInput} 
                        placeholder={'Title your run'}
                        multiline={true} />
                </View>
                
                <View style={styles.containerTxtInput}>
                    <TextInput 
                        style={styles.txtInput} 
                        placeholder={'Add a description'}
                        multiline={true} />
                </View>
                
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, 
                    {
                        backgroundColor: 'white',
                        borderColor: 'green',
                        borderWidth: 1.5,
                    }]}
                    onPress={() => {
                        navigation.dispatch(resetAction);
                    }}>
                        <Text style={[styles.buttonTitle, {color: 'green'}]}>
                            DISCARD
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, 
                    {
                        backgroundColor: 'green',
                    }]}
                    onPress={() => {
                        navigation.dispatch(resetAction);
                    }}>
                        <Text style={[styles.buttonTitle, {color: 'white'}]}>
                            SAVE
                        </Text>
                    </TouchableOpacity>
                </View> 
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerTxtInput: {
        width: '90%',
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },  
    txtInput: {
        width: '100%',
        fontSize: 18,
    },
    title: {
        width: '100%',
        fontSize: 16,
        backgroundColor: 'lightgrey',
        color: 'gray',
        paddingLeft: 10,
        paddingVertical: 3, 
        marginVertical: 10,
    },
    slider: {
        width: '75%',
        marginVertical: 10,
    },
    containerRecord: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemRecord: {
        width: windowWidth/3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContent: {
        fontSize: 24,
        color: 'black',
        marginVertical: 3,
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 10,
        color: 'gray',
        marginVertical: 3,
    },
    map: {
        width: '85%',
        height: 250,
    },
    buttonRow: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    button: {
        width: 140,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 18,
    },
});