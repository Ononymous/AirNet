import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export default function useLocation(enabled = true, intervalMs = 10000) {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;
    let headingInterval;

    const requestLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setError('Location permission not granted');
          Alert.alert(
            'Location Permission Required',
            'AirNet needs your location to show nearby planes. Please grant location permission in Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(location);
        setError(null);
      } catch (err) {
        console.error('Location error:', err);
        setError(err.message);
      }
    };

    const requestHeading = async () => {
      try {
        const h = await Location.getHeadingAsync();
        setHeading(h);
      } catch (err) {
        console.error('Heading error:', err);
      }
    };

    if (enabled) {
      requestLocation();
      requestHeading();
      interval = setInterval(requestLocation, intervalMs);
      headingInterval = setInterval(requestHeading, 500); // Update heading more frequently
    }

    return () => {
      if (interval) clearInterval(interval);
      if (headingInterval) clearInterval(headingInterval);
    };
  }, [enabled, intervalMs]);

  if (location) {
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      alt: location.coords.altitude,
      heading: heading?.trueHeading || heading?.magHeading || 0,
      error,
    };
  }
  return null;
}
