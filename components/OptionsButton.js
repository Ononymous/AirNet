import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterOptions from './FilterOptions';

const OptionsButton = ({ onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => {onPress; setModalVisible(true)}} style={styles.button}>
        <Ionicons name="options" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <FilterOptions setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});

export default OptionsButton;