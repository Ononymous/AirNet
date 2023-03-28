import { Text, View } from "react-native";
import styles from "../Constant/infoStyles";
const FlightInfo3=({Altitude, Langitude, Longitude})=>{
    return(
        <View>
        <Text style={{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color:'#ffffff',
        justifyContent:'space-between', 
        backgroundColor: '#373F47'}}>
            Altitude: {Altitude}
        </Text>
        <Text style={{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color:'#ffffff',
        backgroundColor: '#373F47'}}>
            Longitude:{Longitude}
        </Text>
        <Text style={{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color:'#ffffff',
        backgroundColor: '#373F47'}}>
            Langitude: {Langitude}
        </Text>
           
        </View>
        
    )
};
export default FlightInfo3;