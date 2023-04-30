import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import FlightInfo from '../components/FlightInfo';
import { useEffect } from 'react';
import SessionContext from '../backend/SessionContext';

import HeartButton from '../components/HeartButton';
import CameraButton from '../components/CameraButton';

export default function MoreInfo({route, navigation}) {
  const session = useContext(SessionContext);
  const { plane } = route.params;
  const renderHeaderRight = (id) => {
    if (session && session.user) {
      // console.log(id)
      return (
        <View style={styles.lowerContainer}>
          <HeartButton id={id} />
          <CameraButton onPress={() => alert('Camera pressed')} />
        </View>
      );
    } else {
      return <CameraButton onPress={() => alert('Camera pressed')} />;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${plane.flightNumber}`,
      headerRight: () => renderHeaderRight(plane.id),
    });
  }, [navigation, plane.id, session]);
  
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
  originText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
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
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});