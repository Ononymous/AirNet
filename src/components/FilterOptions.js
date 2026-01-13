import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from './BackButton';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import OptionContext from '../backend/OptionContext';
import { SORT_OPTIONS, DEGREES_TO_MILES } from '../constants';

export default function FilterOptions({ setModalVisible }) {
  const { sort, setSort, distance, setDistance } = useContext(OptionContext);
  const [tempDistance, setTempDistance] = useState(distance);

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalTitleWrapper}>
        <BackButton onPress={() => setModalVisible(false)} />
        <Text style={styles.modalTitle}>Options</Text>
      </View>
      
      <ScrollView>
        <View style={styles.modalSortWrapper}>
          <Text style={styles.modalTitle}>Sort By</Text>
          
          <TouchableOpacity
            style={styles.modalSortOption}
            onPress={() => setSort(SORT_OPTIONS.NONE)}>
            <View style={styles.modalSortOptionWrapper}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
              <Text style={styles.modalText}>None</Text>
            </View>
            {sort === SORT_OPTIONS.NONE ? (
              <Ionicons name="radio-button-on" size={24} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="black" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.modalSortOption}
            onPress={() => setSort(SORT_OPTIONS.DISTANCE)}>
            <View style={styles.modalSortOptionWrapper}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
              <Text style={styles.modalText}>Distance</Text>
            </View>
            {sort === SORT_OPTIONS.DISTANCE ? (
              <Ionicons name="radio-button-on" size={24} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="black" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.modalSortOption}
            onPress={() => setSort(SORT_OPTIONS.CALLSIGN)}>
            <View style={styles.modalSortOptionWrapper}>
              <Ionicons name="text" size={24} color="black" />
              <Text style={styles.modalText}>Flight Number</Text>
            </View>
            {sort === SORT_OPTIONS.CALLSIGN ? (
              <Ionicons name="radio-button-on" size={24} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="black" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.modalSortOption}
            onPress={() => setSort(SORT_OPTIONS.SPEED)}>
            <View style={styles.modalSortOptionWrapper}>
              <MaterialCommunityIcons name="speedometer" size={24} color="black" />
              <Text style={styles.modalText}>Speed</Text>
            </View>
            {sort === SORT_OPTIONS.SPEED ? (
              <Ionicons name="radio-button-on" size={24} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="black" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.modalSortOption}
            onPress={() => setSort(SORT_OPTIONS.AIRPLANE)}>
            <View style={styles.modalSortOptionWrapper}>
              <Ionicons name="airplane-outline" size={24} color="black" />
              <Text style={styles.modalText}>Plane Model</Text>
            </View>
            {sort === SORT_OPTIONS.AIRPLANE ? (
              <Ionicons name="radio-button-on" size={24} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.modalSortWrapper}>
          <Text style={styles.modalTitle}>Filter</Text>
          <View style={styles.modalSortOptionWrapper}>
            <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="black" />
            <Text style={styles.modalText}>
              Search Radius: {(tempDistance * DEGREES_TO_MILES).toFixed(0)} miles
            </Text>
          </View>
          <Slider
            style={styles.modalSlider}
            minimumValue={0.1}
            maximumValue={2}
            value={distance}
            onValueChange={(value) => setTempDistance(value)}
            onSlidingComplete={(value) => {
              setDistance(value);
              setTempDistance(value);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalText: {
    fontSize: 18,
    color: '#000000',
    marginLeft: 20,
  },
  modalSortWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalSortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  modalSortOptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalSlider: {
    width: '100%',
    height: 40,
  },
});
