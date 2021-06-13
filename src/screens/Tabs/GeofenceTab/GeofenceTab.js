import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import haversine from "haversine";

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { EventEmitter } from 'fbemitter';

const STORAGE_KEY = 'expo-home-locations';

const LATITUDE = 10.8699237;
const LONGTITUDE = 106.8016194;

const locationEventsEmitter = new EventEmitter();

export default class GeofenceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Route
      routes: [],

      // Coordinate
      routeCoordinates: [],      
      prevLatLng: { LATITUDE, LONGTITUDE },
      coordinate: ({
        latitude: 10.8699237,
        longitude: 106.8016194,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      }),

      // Data
      distanceTravelled: 0,
      
      // State
      statement: "hasNotStarted",
    };
  }

  componentDidMount = async () => {    
    await AsyncStorage.removeItem(STORAGE_KEY);
    this.startActivity();
  }

  componentWillUnmount() {
    //this.stopActivity();
  }

  // Tracking

  startActivity = async () => {
    const { fore_status } = await Location.requestForegroundPermissionsAsync();
    if (fore_status !== 'granted') {
      console.log('Foreground permissions to access location was denied!');
    }

    const { back_status } = await Location.requestBackgroundPermissionsAsync();
    if (back_status !== 'granted') {
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
          latitudeDelta: 0.0006,
          longitudeDelta: 0.0006,
        }
      })

      switch (this.state.statement) {
        case "hasNotStarted":
          this.waitStarting();
          break;
        case "isActive":
          this.updateCoordinates(locations);
          break;
        case "isPaused":
          this.waitResuming();
          //console.log('latest routes: ', this.state.routes[this.state.routes.length-1]);
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

  waitStarting = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    this.setState({ 
      routes: [],
      routeCoordinates: [], 
    });
  }

  updateCoordinates = (locations) => {
    const { distanceTravelled, routes } = this.state;

    // routes[routes.length-1] = locations;
    routes.pop();
    routes.push(locations);

    this.setState({ 
      routes: routes,
      routeCoordinates: locations,
      distanceTravelled:
        distanceTravelled + this.calcDistance(locations[locations.length-1]),
      prevLatLng: locations[locations.length-1],
    });
  }

  waitResuming = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  // Controller
  onPress_btnStart = async () => {
    this.setState({ statement: "isActive"});
  }

  onPress_btnPause = () => {
    this.setState({ statement: "isPaused"});
    this.setState({ routeCoordinates: [] });
  }

  onPress_btnResume = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);

    const { routeCoordinates, routes } = this.state;
    routes.push(routeCoordinates);
    
    this.setState({ 
      routes: routes,
    });

    this.setState({ statement: "isActive"});
  }

  onPress_btnFinish = () => {
    this.setState({ statement: "hasNotStarted" });
  }

  // Render

  renderButton() {
    const { statement } = this.state;
    switch (statement) {
      case "hasNotStarted":
        return (
          <TouchableOpacity 
            style={[styles.roundedButton, {backgroundColor: "green"}]}
            onPress={this.onPress_btnStart}>
              <Text style={styles.bottomBarContent}>
                START
              </Text>
          </TouchableOpacity>
        )
      case "isActive":
        return (
          <TouchableOpacity 
            style={[styles.roundedButton, {backgroundColor: "green"}]}
            onPress={this.onPress_btnPause}>
              <Text style={styles.bottomBarContent}>
                PAUSE
              </Text>
          </TouchableOpacity>
        )
      case "isPaused":
        return (
          <React.Fragment>
            <TouchableOpacity 
              style={[styles.roundedButton, {backgroundColor: "green"}]}
              onPress={this.onPress_btnResume}>
                <Text style={styles.bottomBarContent}>
                  RESUME
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.roundedButton, {backgroundColor: "green"}]}
              onPress={this.onPress_btnFinish}>
                <Text style={styles.bottomBarContent}>
                  FINISH
                </Text>
            </TouchableOpacity>
          </React.Fragment>
        )
      case "hasFinished":
        break;
      default:
        break;
    }
  }

  randomColor = () => {
    const colorArray = ['red', 'green', 'black', 'blue', 'yellow'];
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.region)}</Text>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.state.coordinate}>
          
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
                   
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>

        <View style={styles.logContainer}>
          <View style={{
                  width: '100%', 
                  height: 80,
                  alignItems: "center",
                }}>
            <Text style={styles.titleItem}>TIME</Text>
            
            <Text style={styles.contentItem}>0:00:00</Text>
          </View >
          
          <View style={styles.item}>
            <Text style={styles.titleItem}>DISTANCE (km)</Text>
            <Text style={styles.contentItem}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.titleItem}>AVG PACE (/km)</Text>
            <Text style={styles.contentItem}>
              -:--
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
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
    }));

    //console.log('new Coordinate: ', newLocations);

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
  roundedButton: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  logContainer:
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "green",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  item:
  {
    width: '50%',
    height: 80,
    alignItems: "center",
  },
  titleItem:
  {
    marginTop: 5,
    fontSize: 12,
  },
  contentItem:
  {
    marginVertical: 12,
    fontSize: 24,
    fontWeight: "bold",
  },
});