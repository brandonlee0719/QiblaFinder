import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import GetLocation from 'react-native-get-location';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({navigation}) => {
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [marker, setMarker] = useState({ coordinate: { latitude: LATITUDE, longitude: LONGITUDE } });
  const [userMarker, setUserMarker] = useState({ coordinate: { latitude: LATITUDE + 0.03, longitude: LONGITUDE + 0.03 } });

  const onMapPress = (e) => {
    setMarker({ coordinate: e.nativeEvent.coordinate });
  }

  const handleAR = () => {
    navigation.push("Qibla")
  }

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 3600000
    })
      .then(location => {
        console.log("location", location)
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
        setUserMarker({ coordinate: { latitude: location.latitude, longitude: location.longitude } });
        setMarker({ coordinate: { latitude: location.latitude + 0.03, longitude: location.longitude + 0.03 } });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={onMapPress}>
        <Marker
          coordinate={userMarker && userMarker.coordinate}
          pinColor={"#0000FF"}
        />
        <Marker
          coordinate={marker && marker.coordinate}
          pinColor={"#0000FF"}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleAR}
          style={styles.bubble}>
          <Text style={styles.gotit}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  bubble: {
    backgroundColor: 'rgba(0,0,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  gotit: {
    color: '#FFF'
  }
});

export default Map;