import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import FlightInfo from '../components/FlightInfo';
import { useEffect } from 'react';
import SessionContext from '../backend/SessionContext';
import { LinearGradient } from 'expo-linear-gradient';

import HeartButton from '../components/HeartButton';
import CameraButton from '../components/CameraButton';

export default function MoreInfo({route, navigation}) {
  const session = useContext(SessionContext);
  const { plane } = route.params;
  const renderHeaderRight = (id) => {
    if (session && session.user) {
      return (
        <View style={styles.lowerContainer}>
          <HeartButton id={id} dark={true}/>
          <CameraButton onPress={() => alert('Camera pressed')} />
        </View>
      );
    } else {
      return <CameraButton onPress={() => alert('Camera pressed')} />;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ``,
      headerRight: () => renderHeaderRight(plane.id),
    });
  }, [navigation, plane.id, session]);
  
  return (
    <LinearGradient colors={['#71c5ee', '#ffffff']} style={styles.container} end={{x:0.65,y:0.65}}>
      <View style={styles.newContainer}>
      <ScrollView>
      {/* E1ECFD */}
      {/* B0c9F1 */}
      <Text style={styles.PlaneNUm}>{plane.flightNumber}</Text>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.PlaneType}>
              <Text style={styles.PlaneTypeType}>Aircraft Type</Text>
              <Text style={styles.PlaneTypeTxt}>{plane.planeType }</Text>
            <Image source={{ uri: plane.imgUrl }} style={styles.image} backgroundColor='white' />
            <View style={styles.City}>
              {/* Need to change the following two lines into city name */}
              <Text style={styles.OriginDetail}>Santa Babara</Text>
              <Text style={styles.DestinationDetail}>Los Angeles</Text>
            </View>
            <View style={styles.RouteContainer}>
            <Text style={styles.originText}>{plane.origin}</Text>
            <Image source={require('../assets/PlaneIcon.png')} style={styles.PlaneIcon}/>
            <Text style={styles.originText}>{plane.destination}</Text>
            </View>
           
            </View>
          </View>

         
            {/* <Text style={styles.originText}>{plane.originFull + ' (' + plane.origin + ')\n'} to {'\n' + plane.destinationFull + ' (' + plane.destination + ')\n'}</Text> */}

          {/* <View style={styles.infoContainer}>
            <FlightInfo str='Scheduled Arrival Time '/>
            <Text style={styles.BiggerText}>{plane.scheduledArrival}{'\n'}</Text>
          </View> */}

          <View style={styles.infoContainer3}>

            <View style={styles.ALLContainer} width={110}>
              <FlightInfo str='Altitude'/>
              <Text style={styles.NUM}>{plane.altitude} ft {'\n'}</Text>
            </View>
            
            <View style={styles.ALLContainer} width={110}>
              <FlightInfo str='Latitude'/>
              <Text style={styles.NUM}>{plane.latitude} {'\n'}</Text>
            </View>

            <View style={styles.ALLContainer} width={110}>
              <FlightInfo str='Longitude'/>
              <Text style={styles.NUM}>{plane.longitude} {'\n'}</Text>
            </View>

          </View>


          <View style={styles.SpeedContainer}>
            <Text style={styles.SpeedText}>Aircraft Speed</Text>
            <Text style={styles.SpeedNUM}>{plane.speed} Knots {'\n'}</Text>
          </View>

        </View>     
        
      </ScrollView>
      </View>
     

    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  newContainer:{

    height: "100%",
  },

  // Ray's contant styles from here on
  container: {
    flexDirection: 'column',
    alignContent:'center',
    padding: 5,
    borderRadius: 0,
    marginBottom: 0,
    borderWidth: 0,
   

  },
  PlaneIcon:{
    width: 100,
    height: 40,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 5,
  },
  RouteContainer:{
    flexDirection: 'row',
    padding: 3,
    marginBottom: 0,
    justifyContent:"space-evenly"
    
  },
  City:{
    flexDirection: 'row',
    padding: 0,
    marginBottom: 0,
    justifyContent:'space-between'
  },
  PlaneNUm:{
    color:'#ffffff',
    fontSize:65,
    fontWeight: 'bold',
    marginLeft:'5%',
  },
  PlaneType:{
    flex: 1,
    marginTop:'5%',

  },
  infoContainer:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 3,
    backgroundColor:'#ffffff',
    borderRadius: 10,
    marginBottom: '3%',
    marginHorizontal:4,
    borderWidth: 0,
    backgroundColor:'#ffffff',

  },
  ALLContainer:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 3,
    backgroundColor:'#ffffff',
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:4,
    borderWidth: 0,

    backgroundColor:'#E1ECFD',
  },
  SpeedContainer:{
    flexDirection: 'column',
    alignContent:'center',
    justifyContent:'center',
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:4,
    borderWidth: 0,
    backgroundColor:'#B0C9F1',
    gap:"6%",
    
  },
  
  imageContainer: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginBottom:'5%',
    borderRadius:10,
    height:'70%',
    

  },
  switchStyle:{
    marginRight:10,
    marginTop:5,
  },
  image: {
    width: Dimensions.get('window').width - 50,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 5,
    
   

  },
  SpeedText:{
    color:'#3C6EC0',
    fontWeight:'bold',
    textAlign: 'center',
    fontSize:20,
    marginTop:'5%'
  },
  SpeedNUM:{
    color:'#3C6EC0',
    fontWeight:'bold',
    textAlign: 'center',
    fontSize:40,
  },
  infoContainer3:{
    flexDirection: 'row',
    padding: 3,
    marginBottom: 0,
    marginBottom:'3%',
    justifyContent:"space-evenly"
  },
  HEADERVIEW:{
    justifyContent:'space-evenly',
    flexDirection: 'row',
    height: 50,
  },
  BiggerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color:'#000000',

  },
  PlaneTypeTxt:{
    marginLeft:'10%',
    fontWeight: 'bold',
    fontSize: 32,
    color:'#61A6C8',
    marginBottom:10,
  },
  PlaneTypeType:{
    marginLeft:'5%',
    fontWeight: 'bold',
    fontSize: 20,
    color:'#A2C9DC',
  },
  OriginDetail:{
    fontSize: 15,
    color:'#C2C5C6',
    fontWeight: 'bold',
    marginLeft:'5%'
  },
  DestinationDetail:{
    fontSize: 15,
    color:'#C2C5C6',
    fontWeight: 'bold',
    marginRight:'5%'
  },
  originText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 0,
    color:'#000000',

  },
  NUM:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 0,
    color:'#2B92FA',

  },
  backBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});