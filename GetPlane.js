import React, { useContext } from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import { PlaneContext } from './App';

export default function GetPlane(){

    const context = useContext(PlaneContext)
    
    const api_key = "8f570296-449a-4e0f-9e6d-f60be530ecec"

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
            <Text key={index}>Hex:{item.hex} Lat:{item.lat} Lng:{item.lng}</Text>
        )
    })

    return(
        <View style={styles.container}>
            <Button title="Get Planes" onPress={() => {fetchApiCall()}}/>
            <Text>Lat: {lat}</Text>
            <Text>Lng: {lng}</Text>
            <Text>North Lat: {nLat}</Text>
            <Text>North Lng: {nLng}</Text>
            <Text>South Lat: {sLat}</Text>
            <Text>South Lng: {sLng}</Text>
            <Text></Text>
            <ScrollView>{datamap}</ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});