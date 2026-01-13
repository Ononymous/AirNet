import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterOptions from './FilterOptions';

const OptionsButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Ionicons name="options" size={24} color="black" />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <FilterOptions setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    padding: 5,
  },
});

export default OptionsButton;
