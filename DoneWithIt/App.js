import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={()=>console.log("Press")} >Open up App.js to start working on your app!</Text>
      <Image source={require('./assets/splash.png')}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'

  },
});
