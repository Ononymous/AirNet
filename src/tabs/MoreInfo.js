import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeartButton from '../components/HeartButton';
import CameraButton from '../components/CameraButton';

export default function MoreInfo({ route, navigation }) {
  const { plane } = route.params;

  const renderHeaderRight = (id) => {
    return (
      <View style={styles.lowerContainer}>
        <HeartButton id={id} dark={true} />
        <CameraButton onPress={() => navigation.navigate('Tracker', { plane: plane })} />
      </View>
    );
  };

  useEffect(() => {
    if (plane?.id) {
      navigation.setOptions({
        headerTitle: ``,
        headerRight: () => renderHeaderRight(plane?.id),
      });
    }
  }, [navigation, plane?.id]);

  return (
    <LinearGradient colors={['#71c5ee', '#ffffff']} style={styles.container} end={{ x: 0.65, y: 0.65 }}>
      <View style={styles.newContainer}>
        <ScrollView>
          <Text style={styles.PlaneNUm}>{plane.flightNumber}</Text>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <View style={styles.PlaneType}>
                <Text style={styles.PlaneTypeType}>Aircraft Type</Text>
                <Text style={styles.PlaneTypeTxt}>{plane.planeType}</Text>
                <Image source={{ uri: plane.imgUrl }} style={styles.image} backgroundColor='white' />
                
                <View style={styles.City}>
                  <Text style={styles.OriginDetail}>{plane.originFull}</Text>
                  <Text style={styles.DestinationDetail}>{plane.destinationFull}</Text>
                </View>
                
                <View style={styles.RouteContainer}>
                  <Text style={styles.originText}>{plane.origin}</Text>
                  <Image source={require('../../assets/PlaneIcon.png')} style={styles.PlaneIcon} />
                  <Text style={styles.originText}>{plane.destination}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoContainer3}>
              <View style={[styles.ALLContainer, { width: 110 }]}>
                <Text style={styles.NUM}>
                  {plane.altitude !== 'N/A' ? plane.altitude + ' ft' : plane.altitude}
                </Text>
                <Text style={styles.attribute}>Altitude</Text>
              </View>

              <View style={[styles.ALLContainer, { width: 110 }]}>
                <Text style={styles.NUM}>
                  {plane.latitude !== 'N/A' ? plane.latitude.toFixed(2) : plane.latitude}
                </Text>
                <Text style={styles.attribute}>Latitude</Text>
              </View>

              <View style={[styles.ALLContainer, { width: 110 }]}>
                <Text style={styles.NUM}>
                  {plane.longitude !== 'N/A' ? plane.longitude.toFixed(2) : plane.longitude}
                </Text>
                <Text style={styles.attribute}>Longitude</Text>
              </View>
            </View>

            <View style={styles.SpeedContainer}>
              <Text style={styles.SpeedText}>Aircraft Speed</Text>
              <Text style={styles.SpeedNUM}>{plane.speed !== 'N/A' ? plane.speed + ' Knots' : plane.speed}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  newContainer: {
    height: '100%',
  },
  container: {
    flexDirection: 'column',
    alignContent: 'center',
    padding: 5,
    borderRadius: 0,
    marginBottom: 0,
    borderWidth: 0,
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  PlaneNUm: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  PlaneType: {
    flex: 1,
    marginTop: '5%',
  },
  PlaneTypeType: {
    marginLeft: '7%',
    fontWeight: '600',
    fontSize: 15,
    color: '#a5c0e1',
  },
  PlaneTypeTxt: {
    marginLeft: '7%',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#739ED1',
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get('window').width - 50,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 5,
  },
  PlaneIcon: {
    flex: 1,
    height: 30,
    borderRadius: 10,
    resizeMode: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  City: {
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 0,
    justifyContent: 'space-between',
    marginHorizontal: '10%',
  },
  OriginDetail: {
    fontSize: 8,
    color: '#9c9c9c',
    fontWeight: 'bold',
  },
  DestinationDetail: {
    fontSize: 8,
    color: '#9c9c9c',
    fontWeight: 'bold',
  },
  RouteContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 0,
    justifyContent: 'center',
    marginHorizontal: '10%',
  },
  originText: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 24,
    marginTop: 0,
    color: '#000000',
  },
  infoContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    padding: 3,
    borderRadius: 10,
    marginBottom: '3%',
    marginHorizontal: 4,
    borderWidth: 0,
    backgroundColor: '#ffffff',
  },
  infoContainer3: {
    flexDirection: 'row',
    padding: 3,
    marginBottom: '3%',
    justifyContent: 'space-between',
  },
  ALLContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    padding: 3,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 4,
    borderWidth: 0,
    backgroundColor: '#E1ECFD',
  },
  NUM: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 22,
    marginVertical: '30%',
    color: '#2B92FA',
  },
  attribute: {
    textAlign: 'center',
    fontSize: 15,
    color: '#709BD1',
  },
  SpeedContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 4,
    borderWidth: 0,
    backgroundColor: '#B0C9F1',
  },
  SpeedText: {
    color: '#495e8e',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    marginTop: '2%',
  },
  SpeedNUM: {
    color: '#495e8e',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',
    paddingBottom: '12%',
    fontSize: 40,
  },
});
