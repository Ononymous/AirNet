import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import FlightInfo from '../components/FlightInfo';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import HeartButton from '../components/HeartButton';
import CameraButton from '../components/CameraButton';

export default function MoreInfo({route, navigation}) {
  const { plane } = route.params;
  const renderHeaderRight = (id) => {
    return (
      <View style={styles.lowerContainer}>
        <HeartButton id={id} dark={true}/>
        <CameraButton onPress={() => alert('Camera pressed')} />
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${plane.flightNumber}`,
      headerRight: () => renderHeaderRight(plane.id),
    });
  }, [navigation, plane.id]);
  
  return (
    <LinearGradient colors={['#fafafa', '#a8b2e4']} style={styles.container}>
    <View style={styles.newContainer}>
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.imageContainer}>
            <Image source={{ uri: plane.imgUrl }} style={styles.image} backgroundColor='white' />
          </View>

          <View style={styles.infoContainer}>
            <FlightInfo str='Aircraft Type'/>
            <Text style={styles.BiggerText}>{plane.planeType + '\n'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <FlightInfo str='Route'/>
            <Text style={styles.originText}>{plane.originFull + ' (' + plane.origin + ')\n'} to {'\n' + plane.destinationFull + ' (' + plane.destination + ')\n'}</Text>
          </View>

          {/* <View style={styles.infoContainer}>
            <FlightInfo str='Scheduled Arrival Time '/>
            <Text style={styles.BiggerText}>{plane.scheduledArrival}{'\n'}</Text>
          </View> */}

          <View style={styles.infoContainer3}>

            <View style={styles.infoContainer} width={110}>
              <FlightInfo str='Altitude'/>
              <Text style={styles.NUM}>{plane.altitude} ft {'\n'}</Text>
            </View>
            
            <View style={styles.infoContainer} width={110}>
              <FlightInfo str='Latitude'/>
              <Text style={styles.NUM}>{plane.latitude} {'\n'}</Text>
            </View>

            <View style={styles.infoContainer} width={110}>
              <FlightInfo str='Longitude'/>
              <Text style={styles.NUM}>{plane.longitude} {'\n'}</Text>
            </View>

          </View>


          <View style={styles.infoContainer}>
            <FlightInfo str='Aircraft Speed'/>
            <Text style={styles.BiggerText}>{plane.speed} Knots {'\n'}</Text>
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
  infoContainer:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 3,
    backgroundColor:'#ffffff',
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:4,
    borderWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    backgroundColor:'#ffffff',
  

  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,

  },
  switchStyle:{
    marginRight:10,
    marginTop:5,
  },
  image: {
    width: Dimensions.get('window').width - 28,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 5,
   

  },
  infoContainer3:{
    flexDirection: 'row',
    padding: 3,
    marginBottom: 0,

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
    marginTop: 0,
    color:'#000000',
  },
  originText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 0,
    color:'#000000',

  },
  NUM:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 0,
    color:'#000000',

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