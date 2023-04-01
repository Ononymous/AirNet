import { StyleSheet } from "react-native";
import {COLORS,SIZES} from './theme'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignContent:'center',
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
        alignContent:'center',
        padding: 0,
        backgroundColor: '#2C4251',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal:2,
        borderWidth: 5,
        borderColor: '#373F47',
    },
    image: {
        width: 300,
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
    infoContainer3:{
        flexDirection: 'row',
        padding: 0,
        backgroundColor: '#D9D9D9',
        marginBottom: 0,
        borderColor: '#373F47',
        justifyContent:"space-evenly"
    },
    HEADERVIEW:{
        justifyContent:'space-evenly',
        flexDirection: 'row',
    },
    BiggerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color:'#ffffff',
        backgroundColor: '#373F47',
    },
    NUM:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 0,
        color:'#ffffff',
        backgroundColor: '#373F47',
        
    },
    userName:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
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
    },
    profileImage:{
       width: 100, 
       height: 100, 
       borderRadius: 400/ 2,
       alignSelf:'center',
       marginTop:10

    },
    searchInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
        
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.gray2,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
        marginLeft:10
      },
      searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 25,
      },
      searchBtn: {
        width: 50,
        height: "100%",
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        marginRight:10
      },
      searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: COLORS.white,
      },
      settingContainer:{
        flexDirection: 'column',
        alignContent:'center',
        padding: 0,
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal:2,
        borderWidth: 5,
        borderColor: '#373F47',
      },
      settingTab:{
        flexDirection: 'row',
        padding: 0,
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal:2,
        borderWidth: 0,
        borderColor: '#373F47',
        justifyContent:'space-between',
        backgroundColor:'#D9D9D9',
        marginTop:10,
      },
      settingTabText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 0,
        color:COLORS.primary,
        marginLeft:0,
        marginTop:3,
      },
      switchStyle:{
        marginRight:10,
        marginTop:15,
      },
      settingIcons:{
        marginRight:10,
        marginTop:7,
      },
      signOutBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
      }

    
      

})
export default styles