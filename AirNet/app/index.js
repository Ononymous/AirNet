import { SafeAreaView , ScrollView,View,Text,Image} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import styles from "../Constant/infoStyles";
import FlightInfo from "../componet/info";
import Button from "../componet/backButton";
import HeartButton from "../componet/heartButton";
import CameraButton from "../componet/cameraButton";


const Info =({FlightNumber})=>{
    const router=useRouter();
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#373F47'}}>
    <View style={styles.HEADERVIEW}>
        <CameraButton onPress={() => alert("Camera pressed")}/> 
        <Text style={styles.BiggerText}>SWA2434</Text>
        <HeartButton onPress={() => alert("Heart pressed")}/>
        
    </View>
        
    <ScrollView>
        <View style={styles.container}>
            <Image source={{ uri: 'https://media.wired.com/photos/62b25f4c18e6fafaa97a6477/16:9/w_2400,h_1350,c_limit/Air-Serbia-Plane-Russian-Sanctions-Safety-Hazard-Business-1239498184.jpg' }} style={styles.image} />
            
            <View style={styles.infoContainer}>
                <FlightInfo str='Aircraft Type'/>
                <Text style={styles.BiggerText}>Boeing 737 MAX 8 {'\n'}</Text>
            </View>

            <View style={styles.infoContainer}>
                <FlightInfo str='Route'/>
                <Text style={styles.BiggerText}>LAX to SBA {'\n'}</Text>
            </View>
            <View style={styles.infoContainer3}>
                <View style={styles.infoContainer} width={121}>
                    <FlightInfo str='Altitude'/>
                    <Text style={styles.NUM}>0 ft {'\n'}</Text>
                </View>
                <View style={styles.infoContainer} width={121}>
                    <FlightInfo str='Langitude'/>
                    <Text style={styles.NUM}>37.3627 {'\n'}</Text>
                </View>
                <View style={styles.infoContainer} width={121}>
                    <FlightInfo str='Longitude'/>
                    <Text style={styles.NUM}>-121.922 {'\n'}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <FlightInfo str='Aircraft Speed'/>
                <Text style={styles.BiggerText}>0 Knots {'\n'}</Text>
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