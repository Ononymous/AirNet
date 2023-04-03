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
        color:'#ffffff',
        backgroundColor: '#373F47',
        textAlign:'left',
    },
});

export default FlightInfo;