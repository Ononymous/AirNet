import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import Circle from '../components/Circle';

import useLocation from '../backend/useLocation';
import useOrientation, { llaToEcef, vectorUserToPlane, vecDistance, toEnuBasis, ecefToEnu, getScore, feetToMeters } from '../backend/useOrientation';

export default function Tracker({ route, navigation }) {
  const { plane } = route.params;
  
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;

  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();

  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);
  const [enu, setEnu] = useState(null);
  const [matrix, setMatrix] = useState(null);

  const rotation = useOrientation();

  const location = useLocation();
	const lat = location?.lat;
	const lng = location?.lng;
  const alt = location?.alt;

  useEffect(() => {
    if (plane?.id) {
      navigation.setOptions({
        headerTitle: `Tracking ${plane.flightNumber}`,
      });
    }
  }, [navigation, plane?.id]);

  useEffect(() => {
    if (lat && lng && alt) {
      // convert lat, lng, alt to ecef, earth-centered, earth-fixed coordinates (3d)

      const userEcef = llaToEcef(lat, lng, alt);
      // const planeEcef = llaToEcef(plane.latitude, plane.longitude, feetToMeters(plane.altitude));
      const planeEcef = llaToEcef(lat+1, lng, alt+10000);

      // get 3d vector from user to plane

      const vectorUToP = vectorUserToPlane(userEcef, planeEcef);

      // get distance from user to plane (meters)

      const tempDistance = vecDistance(vectorUToP);
      setDistance(tempDistance);

      const enuBasis = toEnuBasis(lat, lng);
      const enu = ecefToEnu(vectorUToP, enuBasis);
      setEnu(enu);
    }
  }, [lat, lng, alt, plane.altitude, plane.latitude, plane.longitude]);

  useEffect(() => {
    if (rotation && enu) {
      const tempScore = getScore(rotation, enu);
      if (tempScore === null) return;
      setScore(tempScore);
    }
  }, [rotation, enu]);


  if (!hasPermission) {
    return <View />;
  }
  else if (!hasPermission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera}>
        <View style={styles.overlay}>
          <Text style={{ color: 'white' }}>Distance: {distance? distance: "Loading..."}</Text>
          <Text style={{ color: 'white' }}>Score: {score? score: "Loading..."}</Text>
          {/* <View style={styles.matrix}>
          </View> */}
          <Circle score={score} />
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  matrix: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    },
  cell: {
    width: 80,
    textAlign: 'center',
    marginVertical: 4,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: '#eee',
    padding: 4,
  },
});