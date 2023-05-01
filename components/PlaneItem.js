import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import CameraButton from './CameraButton';
import HeartButton from './HeartButton';
import MoreInfoButton from './MoreInfoButton';
import SessionContext from '../backend/SessionContext';

export default function PlaneItem ({ plane, navigation }) {
  const session = useContext(SessionContext);
  const imgUrl = plane.imgUrl? plane.imgUrl : "https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MoreInfo", {plane: plane})}>
      <ImageBackground source={{ uri: imgUrl }} style={styles.image}>
        <View style={styles.buttonContainer}>
          <HeartButton color="white" />
        </View>
        <Text style={styles.planeType}>{plane.planeType}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    // fit to container
    width: "100%",
    flexDirection: 'column',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden", // prevent the border-radius from clipping the image
  },
  planeType: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    //place at bottom left
    position: 'absolute',
    bottom: 0,
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 5,
    backgroundColor: 'transparent',
  },
});
