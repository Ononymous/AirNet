import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MoreInfoButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>More Info</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0099FF',
    borderRadius: 10,
    width: 150,
    padding: 10,
    marginLeft: 60,
    borderWidth: 5,
    borderColor: '#373F47',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MoreInfoButton;
