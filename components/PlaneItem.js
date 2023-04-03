import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import CameraButton from './CameraButton';
import HeartButton from './HeartButton';
import MoreInfoButton from './MoreInfoButton';

export default function PlaneItem ({ imageUrl, airline, flightNumber, origin, destination, planeType, navigation }) {
  return (
      <View style={styles.container}>
        {/* Upper container */}
        <View style={styles.upperContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.airline}>{airline}</Text>
            <Text style={styles.flightNumber}>{flightNumber}</Text>
            <Text style={styles.flightPath}>{origin} to {destination}</Text>
            <Text style={styles.planeType}>{planeType}</Text>
          </View>
        </View>

        {/* Lower container */}
        <View style={styles.lowerContainer}>
          <CameraButton onPress={() => alert("Camera pressed")}/> 
          <HeartButton onPress={() => alert("Heart pressed")}/>
          <MoreInfoButton onPress={() => navigation.navigate("MoreInfo")}/>
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerContainer: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#247BA0',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#373F47',
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 16,
    borderRadius: 10,
    resizeMode: 'cover',
    borderWidth: 5,
    borderColor: '#373F47',
  },
  textContainer: {
    flex: 1,
  },
  airline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flightNumber: {
    fontSize: 16,
  },
  flightPath: {
    fontSize: 14,
  },
  destination: {
    fontSize: 14,
  },
  planeType: {
    fontSize: 14,
  },
});
