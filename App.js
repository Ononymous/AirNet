import {StyleSheet, View, Platform, ScrollView, Text, Button} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {

  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [counter, setCounter] = useState(false);
  
  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(34.4137076038152)
  const [lng, setLng] = useState(-119.84548267425166)
  const [alt, setAlt] = useState(-20)

  const nLat = lat + 0.5
  const nLng = lng + 0.5

  const sLat = lat - 0.5
  const sLng = lng - 0.5
  

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setAlt(location.coords.altitude);
      setLat(location.coords.latitude);
      setLng(location.coords.longitude);
      setLocation(location);
    })();
  }, [counter]);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Your location:\nLatitude:" + lat + "\nLongitude:" + lng + "\nAltitude:" + alt + "\n";
  }

  const datamap = data.map((item, index) => {
    return (
      <Text key={index}>Index:{index} Lat:{item.lat} Lng:{item.lng}</Text>
    )
  })

  const api_key = "" // Ask for API key

  const fetchApiCall = () => {
    fetch("https://airlabs.co/api/v9/flights?api_key="+api_key+"&bbox="+nLat+","+nLng+","+sLat+","+sLng+"&_fields=hex,lat,lng", {
      method: "GET",
      headers: {
        Accept: "application/json",
    }
    })
      .then(response => response.json())
      .then(response => setData(response.response))
      .catch(err => {console.log(err);});
  }

  return (
    <View style={styles.container}>
      <Button title="Get Data" onPress={() => {setCounter(!counter);fetchApiCall()}}/>
      <Text>{text}</Text>
      <ScrollView>{datamap}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
});