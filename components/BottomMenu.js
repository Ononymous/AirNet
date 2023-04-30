import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import CameraButton from './CameraButton';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';

const BottomMenu = ({ onPressButton1, onPressButton2, onPressButton3 }) => {
  return (
    <View style={styles.menuBar}>
      <TouchableOpacity style={styles.menuBarButton} onPress={onPressButton1}>
        <View style={styles.burger}>
          <AntDesign name="hearto" size={27} color="black" />
        </View>
        <Text style={styles.menuBarButtonText}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBarButton} onPress={onPressButton2}>
        <View style={styles.refresh}>
          <FontAwesome name="refresh" size={30} color="white"/>
        </View>
        <Text style={styles.menuBarButtonText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBarButton} onPress={onPressButton3}>
        <View style={styles.burger}>
          <Entypo name="menu" size={24} color="black" />
        </View>
        <Text style={styles.menuBarButtonText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#DDDDDD',
  },
  menuBarButton: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '33%',

  },
  menuBarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  refresh: {
    backgroundColor: '#0f0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  burger: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});

export default BottomMenu;
