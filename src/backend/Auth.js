import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from './supabase';
import { COLORS } from '../constants';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInActive, setSignInActive] = useState(true);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Success', 'Check your email for the confirmation link!');
    setLoading(false);
  }

  const handleSignInPress = () => {
    setSignInActive(true);
  };

  const handleSignUpPress = () => {
    setSignInActive(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, signInActive && styles.switchButtonActive]}
          onPress={handleSignInPress}>
          <Text style={[styles.switchButtonText, signInActive && styles.switchButtonTextActive]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, !signInActive && styles.switchButtonActive]}
          onPress={handleSignUpPress}>
          <Text style={[styles.switchButtonText, !signInActive && styles.switchButtonTextActive]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>

      {!signInActive && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setConfirm(text)}
            value={confirm}
            secureTextEntry={true}
            placeholder="Confirm Password"
            autoCapitalize="none"
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={signInActive ? signInWithEmail : signUpWithEmail}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : signInActive ? 'Login' : 'Sign up'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  switchButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    width: 150,
    backgroundColor: COLORS.INACTIVE,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  switchButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  switchButtonText: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 18,
  },
  switchButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
