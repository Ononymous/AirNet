import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,Image,TouchableWithoutFeedback,TouchableOpacity, Button } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      
      <Text numberOfLines={1} onPress={()=>console.log("Press")} >This a practice and learning App</Text>
     
      {/* <Image source={require('./assets/splash.png')}/> When using the local images*/}
      <TouchableOpacity onPress={()=>console.log("Image Tapped")}>
      <Image source={{
        width:200,
        height:300,
        uri:"https://picsum.photos/200"}}/>
        {/* Online images */}
      </TouchableOpacity>
      <Button title='Click Me!' color='black' onPress={()=>alert('Button Tapped') }/>
  
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
