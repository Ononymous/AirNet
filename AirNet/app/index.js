import { SafeAreaView , ScrollView,View,Text,Image} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import styles from "../Constant/infoStyles";
import FlightInfo from "../componet/info";
import Button from "../componet/backButton";
import FlightInfo3 from "../componet/info3";



const Info =({FlightNumber})=>{
    const router=useRouter();
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#373F47'}}>

    <Text style={styles.HEADER}>SWA2434</Text>
    <ScrollView>
        <View style={styles.container}>
            <Image source={{ uri: 'https://media.wired.com/photos/62b25f4c18e6fafaa97a6477/16:9/w_2400,h_1350,c_limit/Air-Serbia-Plane-Russian-Sanctions-Safety-Hazard-Business-1239498184.jpg' }} style={styles.image} />
            
            <View style={styles.infoContainer}>
                <FlightInfo str='Aircraft Type'/>
                <Text style={styles.HEADER}>Boeing 737 MAX 8 {'\n'}</Text>
            </View>

            <View style={styles.infoContainer}>
                <FlightInfo str='Route'/>
                <Text style={styles.HEADER}>LAX to SBA {'\n'}</Text>
            </View>
            <View style={styles.infoContainer}>
                <FlightInfo3 Altitude={'123'} Longitude={'37.3679'} Langitude={'-121.73'}></FlightInfo3>
            </View>
            <View style={styles.infoContainer}>
                <FlightInfo str='Aircraft Speed'/>
                <Text style={styles.HEADER}>0 Knots</Text>
            </View>


        </View>
       
    </ScrollView>
        <View style={styles.backBtn}>
            <Button/>
        </View>
    
        
    </SafeAreaView>
    )
}

export default Info;