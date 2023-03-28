import { StyleSheet } from "react-native";
import {COLORS,SIZES} from './theme'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: '#373F47',
        gap:10,
    },
    infoContainer:{
        flexDirection: 'column',
        padding: 0,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: '#373F47',
    },
    image: {
        width: 360,
        height: 150,
        marginRight: 16,
        borderRadius: 10,
        resizeMode: 'cover',
        borderWidth: 5,
        borderColor: '#373F47',
        alignSelf:'center'
    },
    infoContainerTitle:{
        fontWeight: 'bold',
        fontSize: 15,
        color:'#ffffff',
        backgroundColor: '#373F47',
        textAlign:'left',
        
    
    },
    infoContainerTitle3:{
        fontWeight: 'bold',
        fontSize: 15,
        color:'#ffffff',
        backgroundColor: '#373F47',
        justifyContent:"space-between",
        flexDirection: 'column',
    },
    AltitudeLangitudeLongitude:{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color:'#ffffff',
        backgroundColor: '#373F47',

    },
    HEADER: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color:'#ffffff',
        backgroundColor: '#373F47',
    },
    setFontSize: {
        fontSize: 20,
        fontWeight : 'bold' 
      },
    setColorRed : {
        color: '#f44336'
    },
    setColorPink :{
        color: '#e91e63'
    },
    setColorPurple :{
        color: '#9c27b0'
    },
    setColorBlue :{
        color: '#2196f3'
    },
    backBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
    }
      
      

})
export default styles