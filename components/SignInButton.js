import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SignOutButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0492C2',
    borderRadius: 10,
    width: 150,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignOutButton;