import React, { useContext } from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import { PlaneContext } from './App';

export default function GetPlane(){

    const context = useContext(PlaneContext)
    
    const api_key = "" // Ask for API key from Gen

    let lat = context.location?.coords?.latitude
    let lng = context.location?.coords?.longitude

    const nLat = lat + 0.5
    const nLng = lng + 0.5
  
    const sLat = lat - 0.5
    const sLng = lng - 0.5

    

    const fetchApiCall = () => {
        fetch("https://airlabs.co/api/v9/flights?api_key="+api_key+"&bbox="+nLat+","+nLng+","+sLat+","+sLng+"&_fields=hex,lat,lng", {
            method: "GET",
            headers: {
                Accept: "application/json",
            }
        })
        .then(response => response.json())
        .then(response => context.setData(response.response))
        .catch(err => {console.log(err);});
    }

    const datamap = (context.data)?.map((item, index) => {
        return (
            <Text key={index}>Index:{index} Lat:{item.lat} Lng:{item.lng}</Text>
        )
    })

    return(
        <View style={styles.container}>
            <Button title="Get Planes" onPress={() => {fetchApiCall()}}/>
            <ScrollView>{datamap}</ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
  });