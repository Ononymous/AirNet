import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import FlightInfo from '../components/FlightInfo';
import { useEffect } from 'react';

export default function MoreInfo({route, navigation}) {
  const { plane } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${plane.flightNumber}`,
    });
  }, [navigation, plane.flightNumber]);
  
  return (
    <View style={styles.newContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: plane.imgUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
            <FlightInfo str='Aircraft Type'/>
            <Text style={styles.BiggerText}>{plane.planeType + '\n'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <FlightInfo str='Route'/>
            <Text style={styles.BiggerText}>{plane.origin} to {plane.destination + '\n'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <FlightInfo str='Scheduled Arrival Time '/>
            <Text style={styles.BiggerText}>3:25 PM {'\n'}</Text>
          </View>
          <View style={styles.infoContainer3}>
            <View style={styles.infoContainer} width={110}>
              <FlightInfo str='Altitude'/>
              <Text style={styles.NUM}>0 ft {'\n'}</Text>
            </View>
            <View style={styles.infoContainer} width={110}>
              <FlightInfo str='Langitude'/>
              <Text style={styles.NUM}>37.3627 {'\n'}</Text>
            </View>
            <View style={styles.infoContainer} width={110}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newContainer:{
    backgroundColor: '#373F47',
    height: '100%',
  },

  // Ray's contant styles from here on
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
    marginHorizontal:4,
    borderWidth: 5,
    borderColor: '#373F47',
  },
  image: {
    width: Dimensions.get('window').width - 28,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf:'center',
    marginBottom: 5,
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
    height: 50,
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
  backBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
});