import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, ScrollView, Text, Button} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {

  const [data, setData] = useState([]);
  
  const lat = 34.4137076038152
  const lng = -119.84548267425166

  const nLat = lat + 0.5
  const nLng = lng + 0.5

  const sLat = lat - 0.5
  const sLng = lng - 0.5

  const datamap = data.map((item, index) => {
    return (
      <Text key={index}>Hex:{item.hex} Lat:{item.lat} Lng:{item.lng}</Text>
    )
  })


  const api_key = "" // ASK FOR API KEY

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
      <Button title="Get Data" onPress={() => fetchApiCall()}/>
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