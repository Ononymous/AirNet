import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,Image,TouchableWithoutFeedback,TouchableOpacity } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      
      <Text numberOfLines={1} onPress={()=>console.log("Press")} >Open up App.js to start working on your app!</Text>
     
      {/* <Image source={require('./assets/splash.png')}/> When using the local images*/}
      <TouchableOpacity onPress={()=>console.log("Image Tapped")}>
      <Image source={{
        width:200,
        height:300,
        uri:"https://picsum.photos/200"}}/>
        {/* Online images */}
      </TouchableOpacity>
  
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
