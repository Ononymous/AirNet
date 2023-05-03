import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import HeartButton from './HeartButton';

export default function PlaneItem ({ plane, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MoreInfo", {plane: plane})}>
      <ImageBackground source={{ uri: plane?.imgUrl? plane.imgUrl : "https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png" }} style={styles.image}>
        <View style={styles.buttonContainer}>
          <HeartButton color="white" id={plane?.id? plane.id:0}/>
        </View>
        <Text style={styles.planeType}>{plane?.planeType? plane.planeType:"Unknown"}</Text>
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
