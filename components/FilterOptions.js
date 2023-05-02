import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import BackButton from './BackButton';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import OptionContext from '../backend/OptionContext';

export default function FilterOptions({setModalVisible}) {
    const { sort, setSort, distance, setDistance } = useContext(OptionContext);
    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalTitleWrapper}>
                <BackButton onPress={() => setModalVisible(false)} />
                <Text style={styles.modalTitle}>Options</Text>
            </View>
            <View style={styles.modalSortWrapper}>
                <Text style={styles.modalTitle}>Sort By</Text>
                <TouchableOpacity style={styles.modalSortOption} onPress={() => setSort('none')}>
                    <View style={styles.modalSortOptionWrapper}>
                        <MaterialCommunityIcons name="map-marker-distance" size={24} color="white" />
                        <Text style={styles.modalText}>None</Text>
                    </View>
                    {sort === 'none' ? <Ionicons name="ios-radio-button-on" size={24} color="black" /> : <Ionicons name="ios-radio-button-off" size={24} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSortOption} onPress={() => setSort('distance')}>
                    <View style={styles.modalSortOptionWrapper}>
                        <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
                        <Text style={styles.modalText}>Distance</Text>
                    </View>
                    {sort === 'distance' ? <Ionicons name="ios-radio-button-on" size={24} color="black" /> : <Ionicons name="ios-radio-button-off" size={24} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSortOption} onPress={() => setSort('callsign')}>
                    <View style={styles.modalSortOptionWrapper}>
                        <Ionicons name="text" size={24} color="black" />
                        <Text style={styles.modalText}>Flight Number</Text>
                    </View>
                    {sort === 'callsign' ? <Ionicons name="ios-radio-button-on" size={24} color="black" /> : <Ionicons name="ios-radio-button-off" size={24} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSortOption} onPress={() => setSort('speed')}>
                    <View style={styles.modalSortOptionWrapper}>
                        <MaterialCommunityIcons name="speedometer" size={24} color="black" />
                        <Text style={styles.modalText}>Speed</Text>
                    </View>
                    {sort === 'speed' ? <Ionicons name="ios-radio-button-on" size={24} color="black" /> : <Ionicons name="ios-radio-button-off" size={24} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSortOption} onPress={() => setSort('airplane')}>
                    <View style={styles.modalSortOptionWrapper}>
                        <Ionicons name="airplane-outline" size={24} color="black" />
                        <Text style={styles.modalText}>Plane Model</Text>
                    </View>
                    {sort === 'airplane' ? <Ionicons name="ios-radio-button-on" size={24} color="black" /> : <Ionicons name="ios-radio-button-off" size={24} color="black" />}
                </TouchableOpacity>
            </View>
            <View style={styles.modalSortWrapper}>
                <Text style={styles.modalTitle}>Filter</Text>
                <View style={styles.modalSortOptionWrapper}>
                    <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="black" />
                    <Text style={styles.modalText}>Search Radius: {(distance*62).toFixed(1)} miles</Text>
                </View>
                <Slider
                    style={styles.modalSlider}
                    minimumValue={0.1}
                    lowerLimit={0.1}
                    maximumValue={2}
                    upperLimit={2}
                    value={distance}
                    onValueChange={value => setDistance(value)}
                    // onSlidingComplete={value => setDistance(value)}
                />
            </View>
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
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingBottom: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    modalSortOptionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    modalSortOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        paddingRight: 20,
    },
    modalSlider: {
        width: '100%',
        height: 40,
    },
  });