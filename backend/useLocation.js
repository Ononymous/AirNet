import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, 5000);
    return () => {
      clearInterval(interval); // Cleanup the interval when the component is unmounted
    };
  }, []);

  if (location)
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      alt: location.coords.altitude,
    };
  return null;
}