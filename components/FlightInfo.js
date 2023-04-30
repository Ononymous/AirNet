import { Text, StyleSheet } from "react-native";
const FlightInfo=({str})=>{
    return(
        <Text style={styles.infoContainerTitle}>{str}{'\n'}</Text>
    )
};

const styles = StyleSheet.create({
    infoContainerTitle:{
        fontWeight: 'bold',
        fontSize: 15,
        color:'#36454F',
        textAlign:'left',
    },
});

export default FlightInfo;