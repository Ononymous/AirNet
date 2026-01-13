import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import HeartButton from './HeartButton';
import { DEFAULT_PLANE_IMAGE } from '../constants';

export default function PlaneItem({ plane, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MoreInfo', { plane: plane })}>
      <ImageBackground
        source={{ uri: plane?.imgUrl || DEFAULT_PLANE_IMAGE }}
        style={styles.image}>
        <View style={styles.buttonContainer}>
          <HeartButton color="white" id={plane?.id || 0} />
        </View>
        <Text style={styles.planeType}>{plane?.planeType || 'N/A'}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    flexDirection: 'column',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  planeType: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
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
