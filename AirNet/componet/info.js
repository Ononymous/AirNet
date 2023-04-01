import { Text } from "react-native";
import styles from "../Constant/infoStyles";
const FlightInfo=({str})=>{
    return(
        <Text style={styles.infoContainerTitle}>{str}{'\n'}</Text>
    )
};
export default FlightInfo;