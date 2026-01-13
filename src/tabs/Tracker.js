import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Circle from '../components/Circle';

import useLocation from '../backend/useLocation';
import getSinglePlane from '../backend/getSinglePlane';
import useOrientation, {
  llaToEcef,
  vectorUserToPlane,
  vecDistance,
  toEnuBasis,
  ecefToEnu,
  getScore,
  feetToMeters,
  getScreenPositionFixed,
} from '../backend/useOrientation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Tracker({ route, navigation }) {
  const initialPlane = route.params.plane;

  const [permission, requestPermission] = useCameraPermissions();
  const [plane, setPlane] = useState(initialPlane);
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);
  const [enu, setEnu] = useState(null);
  const [position, setPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 });

  const rotation = useOrientation();
  const location = useLocation(true, 1000);
  
  const lat = location?.lat;
  const lng = location?.lng;
  const alt = location?.alt;
  const heading = location?.heading || 0;

  useEffect(() => {
    if (plane?.id) {
      navigation.setOptions({
        headerTitle: `Tracking ${plane.flightNumber}`,
      });
    }
  }, [navigation, plane?.id, plane?.flightNumber]);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Fetch updated plane data every 5 seconds
  useEffect(() => {
    if (!plane?.id) return;

    const fetchPlaneData = async () => {
      try {
        const updatedPlane = await getSinglePlane(plane.id);
        if (updatedPlane) {
          setPlane(updatedPlane);
        }
      } catch (error) {
        console.error('Error fetching plane data:', error);
      }
    };

    fetchPlaneData();
    const interval = setInterval(fetchPlaneData, 5000);

    return () => clearInterval(interval);
  }, [plane?.id]);

  useEffect(() => {
    if (lat && lng && alt && plane?.latitude && plane?.longitude && plane?.altitude) {
      try {
        // Convert lat, lng, alt to ECEF (Earth-Centered, Earth-Fixed) coordinates (3D)
        const userEcef = llaToEcef(lat, lng, alt);
        const planeEcef = llaToEcef(plane.latitude, plane.longitude, feetToMeters(plane.altitude));

        // Get 3D vector from user to plane
        const vectorUToP = vectorUserToPlane(userEcef, planeEcef);

        // Get distance from user to plane (meters)
        const tempDistance = vecDistance(vectorUToP);
        setDistance(tempDistance);

        // Convert to ENU (East-North-Up) coordinate system
        const enuBasis = toEnuBasis(lat, lng);
        const enuVector = ecefToEnu(vectorUToP, enuBasis);
        setEnu(enuVector);
      } catch (error) {
        console.error('Error calculating plane position:', error);
        Alert.alert('Error', 'Failed to calculate plane position');
      }
    }
  }, [lat, lng, alt, plane?.altitude, plane?.latitude, plane?.longitude]);

  useEffect(() => {
    if (rotation && enu) {
      try {
        const tempScore = getScore(rotation, enu);
        if (tempScore !== null) {
          setScore(tempScore);

          // Use the new, CORRECT screen position calculation
          // Fallback to rotation.alpha if heading is not available yet
          const currentHeading = (heading !== null && heading !== undefined) ? heading : (rotation.alpha * 180 / Math.PI);
          
          const screenPos = getScreenPositionFixed(
            enu,
            currentHeading,
            rotation.beta,
            rotation.gamma,
            SCREEN_WIDTH,
            SCREEN_HEIGHT
          );

          if (screenPos) {
            setPosition(screenPos);
          }
        }
      } catch (error) {
        console.error('Error calculating score:', error);
      }
    }
  }, [rotation, enu, heading]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission is required to use AR tracking.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.camera}>
        <View style={styles.overlay}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Distance: {distance ? `${(distance / 1000).toFixed(2)} km` : 'Loading...'}
            </Text>
            <Text style={styles.infoText}>
              Altitude: {plane?.altitude ? `${plane.altitude} ft` : 'N/A'}
            </Text>
            <Text style={styles.infoText}>
              Alignment: {score ? (score > 0.8 ? '🎯 Locked' : '↻ Searching') : '...'}
            </Text>
          </View>
          {score !== null && score > -0.5 && (
            <View style={[styles.targetDot, { left: position.x, top: position.y }]}>
              <View style={[styles.dot, { opacity: Math.max(0.3, score) }]} />
              <View style={styles.crosshair} />
            </View>
          )}
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  infoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
    fontFamily: 'monospace',
  },
  targetDot: {
    position: 'absolute',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF4444',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  crosshair: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 68, 68, 0.5)',
    borderRadius: 20,
  },
  message: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
