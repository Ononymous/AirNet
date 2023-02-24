import React, { useContext, useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import { PlaneContext } from './App';


export default function GetLocation(){
    
    const context = useContext(PlaneContext)

    const [counter, setCounter] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [text, setText] = useState("Waiting..");

    useEffect(() => {
        (async () => {
          
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});

            context.setLocation(location);

            let lat, lng, alt

            if (errorMsg) {
                setText(errorMsg);
            } else if(context.location) {
                lat = context.location.coords.latitude
                lng = context.location.coords.longitude
                alt = context.location.coords.altitude
                setText("Your location:\nLatitude: " + lat + "\nLongitude: " + lng + "\nAltitude: " + alt + "\n")
            }
        })();
    }, [counter]);


    return(
        <View style={styles.container}>
            <Button title="Get GPS Location" onPress={() => {setCounter(!counter);}}/>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});