import { Text, StyleSheet } from "react-native";
const FlightInfo=({str})=>{
    return(
        <Text style={styles.infoContainerTitle}>{str}{'\n'}</Text>
    )
};

const styles = StyleSheet.create({
    infoContainerTitle:{
        fontWeight: 'bold',
        fontSize: 17,
        color:'#6F9BE4',
        marginLeft:'10%'
        
        
    },
});

export default FlightInfo;