import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const PlaneItem = ({ imageUrl, airline, flightNumber, origin, destination, planeType }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.airline}>{airline}</Text>
        <Text style={styles.flightNumber}>{flightNumber}</Text>
        <Text style={styles.origin}>{origin}</Text>
        <Text style={styles.destination}>{destination}</Text>
        <Text style={styles.planeType}>{planeType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 45,
    paddingTop: 5,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#C3C9E9',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 16,
    borderRadius: 10,
    resizeMode: 'cover',
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
  origin: {
    fontSize: 14,
    color: '#666',
  },
  destination: {
    fontSize: 14,
    color: '#666',
  },
  planeType: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaneItem;
