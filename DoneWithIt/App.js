import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      
      <Text numberOfLines={1} onPress={()=>console.log("Press")} >Open up App.js to start working on your app!</Text>
      {/* <Image source={require('./assets/splash.png')}/> When using the local images*/}
      <Image source={{
        width:200,
        height:300,
        uri:"https://picsum.photos/200/300"}}/>
        {/* Online images */}
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
