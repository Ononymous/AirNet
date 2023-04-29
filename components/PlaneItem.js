import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import CameraButton from './CameraButton';
import HeartButton from './HeartButton';
import MoreInfoButton from './MoreInfoButton';
import SessionContext from '../backend/SessionContext';

export default function PlaneItem ({ plane, navigation }) {
  const session = useContext(SessionContext);
  const imgUrl = plane.imgUrl? plane.imgUrl : "https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
  return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Image source={{ uri: imgUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.airline}>{plane.airline}</Text>
            <Text style={styles.flightNumber}>{plane.flightNumber}</Text>
            <Text style={styles.flightPath}>{plane.origin} to {plane.destination}</Text>
            <Text style={styles.planeType}>{plane.planeType}</Text>
          </View>
        </View>

        {/* Lower container */}
        <View style={styles.lowerContainer}>
          <CameraButton onPress={() => alert("Camera pressed")}/>
          {session && session.user.id &&
          <HeartButton id={plane.id}/>
          }
          <MoreInfoButton onPress={() => navigation.navigate("MoreInfo", {plane: plane})}/>
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
    justifyContent: 'space-between',
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
