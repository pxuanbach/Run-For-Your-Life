import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  LogBox
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";

import * as Location from 'expo-location';

const LATITUDE = 10.8699237;
const LONGTITUDE = 106.8016194;

export default class GeofenceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: { LATITUDE, LONGTITUDE },
      coordinate: ({
        latitude: 10.8699237,
        longitude: 106.8016194,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      })
    };
  }

  componentDidMount() {
    this.startTracking();
  }

  componentWillUnmount() {
    
  }

  startTracking = () => {
    let { status } = Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissions to access location was denied!');
    }

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced, 
        timeInterval: 5000,
        distanceInterval: 3,
      },
      (location) => {
        const { 
          routeCoordinates, 
          distanceTravelled,
        } = this.state;

        let newCoordinate = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }   

        this.setState({
          routeCoordinates: routeCoordinates.concat(newCoordinate),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate)*1000,
          prevLatLng: newCoordinate,
          coordinate: newCoordinate,
        });
      }
    );
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  onPress_btnStart = () => {
    
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
          region={this.state.coordinate}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>

        <View style={styles.logContainer}>
          <View style={styles.item}>
            <Text style={styles.titleItem}>TIME</Text>
            <Text style={styles.contentItem}>
              0:00:00
            </Text>
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

          <View style={styles.item}>
            <Text style={styles.titleItem}>???</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: "green"}]}>
              <Text style={styles.bottomBarContent}>
                START
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
    borderTopColor: "black",
    borderTopWidth: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  logContainer:
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "rgba(255,255,255,1)",
  },
  item:
  {
    width: '50%',
    height: 80,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
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