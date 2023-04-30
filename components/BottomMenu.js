import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import CameraButton from './CameraButton';
import HeartButton from './HeartButton';
import MenuOptionButton from './MenuOptionButton';
import Refresh from './refresh';

const BottomMenu = ({ onPressButton1, onPressButton2, onPressButton3 }) => {
  return (
    <View style={styles.menuBar}>
      <TouchableOpacity style={styles.menuBarButton} onPress={onPressButton1}>
        <HeartButton />
        <Text style={styles.menuBarButtonText}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBarButton} onPress={onPressButton2}>
        <Refresh />
        <Text style={styles.menuBarButtonText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBarButton} onPress={onPressButton3}>
        <MenuOptionButton />
        <Text style={styles.menuBarButtonText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  menuBarButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  menuBarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomMenu;
