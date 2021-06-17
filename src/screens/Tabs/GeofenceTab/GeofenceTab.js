import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Alert, } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import haversine from "haversine";
import moment from 'moment';
import { FontAwesome5, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { EventEmitter } from 'fbemitter';

const STORAGE_KEY = 'expo-home-locations';

const LATITUDE = 10.8699237;
const LONGTITUDE = 106.8016194;
const LATITUDE_DELTA = 0.001;
const LONGTITUDE_DELTA = 0.001;

const locationEventsEmitter = new EventEmitter();

export default class GeofenceTab extends React.Component {
  static navigationOptions = {
    title: 'Run',
    headerLeft: () => null,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      // Activity
      routes: [],
      markerOnRoute: [],
    
      // Coordinate
      routeCoordinates: [],      
      prevLatLng: { LATITUDE, LONGTITUDE },
      coordinate: ({
        latitude: 10.8699237,
        longitude: 106.8016194,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
        speed: 0,
      }),
    
      // Data
      avgPace: 0,
      distance: 0,
      distanceMarker: 0,
      time: 0,
    
      // Timer
      start: 0,
      now: 0,
      laps: [],
      
      // Controller
      statement: "isNotActive",
      opacityRecordBox: 1,
      region: ({
        latitude: 10.8699237,
        longitude: 106.8016194,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      }),
    };
  }

  componentDidMount = async () => {    
    await AsyncStorage.removeItem(STORAGE_KEY);
    this.setState({
      routes: [],
      markerOnRoute: [],
    })
    this.getCurrentLocation();
    this.startActivity();
  }

  componentWillUnmount() {
    console.log('Unmount');
    this.stopActivity();
    clearInterval(this.timer);
    locationEventsEmitter.removeAllListeners();
  }

  // Tracking

  getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Foreground permissions to access location was denied!');
    }

    const location = await Location.getCurrentPositionAsync();

    let currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA, 
    }

    this.setState({
      region: currentLocation,
      coordinate: currentLocation,
    })

    console.log('Getting current location!');
  }

  startActivity = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Background permissions to access location was denied!');
    }

    await Location.startLocationUpdatesAsync('background-location-task', {
      accuracy: Location.Accuracy.High,
      timeInterval: 100,
      distanceInterval: 1,
    });

    locationEventsEmitter.addListener('update', locations => {
      this.setState({
        coordinate: {
          latitude: locations[locations.length-1].latitude,
          longitude: locations[locations.length-1].longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGTITUDE_DELTA,
          speed: locations[locations.length-1].speed,
        }
      })

      switch (this.state.statement) {
        case "isNotActive":
          this.waitActive();
          break;
        case "isActive":
          this.updateCoordinates(locations);
          this.addMarker();
          break;
        case "isPaused":
          this.waitActive();
          break;
        default:
          break;
      }
    });
  }

  stopActivity = async () => {
    await Location.stopLocationUpdatesAsync('background-location-task');
  }

  // Handling coordinates

  waitActive = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  updateCoordinates = (locations) => {
    const { distance, distanceMarker, routes } = this.state;

    routes.pop();
    routes.push(locations);

    this.setState({ 
      routes: routes,
      routeCoordinates: locations,
      distance: distance + this.calcDistance(locations[locations.length-1])*10,
      distanceMarker: distanceMarker + this.calcDistance(locations[locations.length-1])*10,
      avgPace: this.calcAVGPage(locations[locations.length-1]),
      prevLatLng: locations[locations.length-1],
    });
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  calcAVGPage = () => {
    const { avgPace, coordinate } = this.state;
    const currentPace = coordinate.speed * 1000 / 60;
    if (avgPace == 0) {
      return currentPace;
    }
    else {
      return (avgPace + currentPace) / 2;
    }
  }

  addMarker = () => {
    const { markerOnRoute, distanceMarker, coordinate } = this.state;
    if (distanceMarker >= 0.5) {
      markerOnRoute.push(coordinate);
      this.setState({ 
        markerOnRoute: markerOnRoute,
        distanceMarker: 0, 
      });
    }  
  }

  //  Handle timer

  startTimer = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
      laps: [0],
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  stopTimer = () => {
    clearInterval(this.timer)
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps
    this.setState({
      time: moment.duration(laps.reduce((total, curr) => total + curr, 0) + now - start).asMinutes(),
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    })
  }

  resetTimer = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    })
  }

  resumeTimer = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }
  // Controller

  onPress_btnStart = async () => {
    this.setState({ statement: "isActive"});

    this.startTimer();
  }

  onPress_btnPause = () => {
    this.setState({ statement: "isPaused"});
    this.setState({ routeCoordinates: [] });

    this.stopTimer();
  }

  onPress_btnResume = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);

    const { routeCoordinates, routes } = this.state;
    routes.push(routeCoordinates);
    
    this.setState({ 
      routes: routes,
    });

    this.setState({ statement: "isActive"});

    this.resumeTimer();
  }

  onPress_btnFinish = () => {
    if (this.state.routes.length > 0) {
      this.props.navigation.navigate('SaveActivityScreen', {
        distance: this.state.distance,
        avgPace: this.state.avgPace,
        time: this.state.time,
        routes: this.state.routes,
        markerOnRoute: this.state.markerOnRoute,
      });
    }
    else {
      Alert.alert(
        "Not moving yet?",
        "App needs a longer activity to upload and analyze. Please continue or start over.",
        [
          {
            text: "Discard",
          },
          {
            text: "Resume",
          }
        ]
      )
    }
    // this.resetTimer();
  }

  onPress_btnLocate = () => {
    this.getCurrentLocation();
  }

  onPress_btnShowRecordBox = () => {
    if (this.state.opacityRecordBox == 0) {
      this.setState({ opacityRecordBox: 1 });
    }
    else {
      this.setState({ opacityRecordBox: 0 });
    }
  }

  // Render

  renderButton() {
    const { statement } = this.state;
    switch (statement) {
      case "isNotActive":
        return (
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: "green"}]}
            onPress={this.onPress_btnStart}>
              <Text style={styles.buttonTitle}>
                START
              </Text>
          </TouchableOpacity>
        )
      case "isActive":
        return (
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: "green"}]}
            onPress={this.onPress_btnPause}>
              <Text style={styles.buttonTitle}>
                PAUSE
              </Text>
          </TouchableOpacity>
        )
      case "isPaused":
        return (
          <React.Fragment>
            <TouchableOpacity 
              style={[styles.button, {
                backgroundColor: "white",
                borderColor: "green",
                borderWidth: 1,
              }]}
              onPress={this.onPress_btnResume}>
                <Text style={[styles.buttonTitle, {color: "green"}]}>
                  RESUME
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, {backgroundColor: "green"}]}
              onPress={this.onPress_btnFinish}>
                <Text style={styles.buttonTitle}>
                  FINISH
                </Text>
            </TouchableOpacity>
          </React.Fragment>
        )
      default:
        break;
    }
  }

  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;

    return (
      <View style={styles.container}>
        <Map 
          region={this.state.region}
          routes={this.state.routes}
          coordinate={this.state.coordinate}
          markerOnRoute={this.state.markerOnRoute}/>

        <View style={[styles.recordBox, { opacity: this.state.opacityRecordBox }]}>
          <View style={{
                  width: '100%', 
                  height: 80,
                  alignItems: "center",
                }}>
            <Text style={styles.itemTitle}>TIME</Text>
            
            <Timer 
              interval={laps.reduce((total, curr) => total + curr, 0) + timer}
              style={styles.itemContent}/>
          </View >
          
          <View style={styles.item}>
            <Text style={styles.itemTitle}>DISTANCE (km)</Text>
            <Text style={styles.itemContent}>
              {parseFloat(this.state.distance).toFixed(2)}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemTitle}>AVG PACE (/km)</Text>
            <Text style={styles.itemContent}>
              {parseFloat(this.state.avgPace).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, 
            {
              borderWidth: 1,
              borderColor: 'green',
              backgroundColor: 'white',
              width: 40,
              height: 40,
            }]}
            onPress={this.onPress_btnShowRecordBox}>
            {
              this.state.opacityRecordBox ? (
                <Entypo name="eye-with-line" size={20} color="green" />
              ) : (
                <Entypo name="eye" size={20} color="green" />
              )
            } 
          </TouchableOpacity>

          {this.renderButton()}
          
          <TouchableOpacity 
            style={[styles.button, 
            {
              backgroundColor: "green",
              width: 40,
              height: 40,
            }]}
            onPress={this.onPress_btnLocate}>

            <MaterialIcons name="my-location" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Map = React.memo(props => {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showUserLocation
      followUserLocation
      loadingEnabled
      region={props.region}>
      
      {
        props.routes.map((route, index) => {
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
        props.markerOnRoute.map((marker, index) => {
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
                
      <Marker
        coordinate={props.coordinate}>
        <FontAwesome5 name="map-marker-alt" size={24} color="gold" />
      </Marker>
    </MapView>
  )
})

function Timer({ interval, style }) {
  const pad = (n) => n < 10 ? '0' + n : n;
  const duration = moment.duration(interval);
  return (
    <Text style={style}>{duration.hours()}:{pad(duration.minutes())}:{pad(duration.seconds())}</Text>
  )
}

async function getSavedLocations() {
  try {
    const item = await AsyncStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

TaskManager.defineTask('background-location-task', async ({ data: { locations }, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (locations && locations.length > 0) {
    // do something with the locations captured in the background

    const savedLocations = await getSavedLocations();
    
    const newLocations = locations.map(({ coords }) => ({
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
    }));

    savedLocations.push(...newLocations);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
    locationEventsEmitter.emit('update', savedLocations);
  }
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
    color: 'white',
  },
  buttonRow: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopColor: "green",
    borderTopWidth: 1,
  },
  recordBox:
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "white"
  },
  item:
  {
    width: '50%',
    alignItems: "center",
  },
  itemTitle:
  {
    marginTop: 5,
    fontSize: 12,
  },
  itemContent:
  {
    marginVertical: 8,
    fontSize: 30,
    fontWeight: "bold",
  },
});