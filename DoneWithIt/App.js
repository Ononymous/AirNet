import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,Alert,Image,TouchableWithoutFeedback,TouchableOpacity, Button } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={[styles.container,containerStyle]}>
      {/* object on the right overwrite the property of the left */}
      
      <Text numberOfLines={1} onPress={()=>console.log("Press")} >This a practice and learning App</Text>
     
      {/* <Image source={require('./assets/splash.png')}/> When using the local images*/}
      <TouchableOpacity onPress={()=>console.log("Image Tapped")}>
      <Image source={{
        width:200,
        height:300,
        uri:"https://picsum.photos/200"}}/>
        {/* Online images */}
      </TouchableOpacity>
      <Button title='Click Me!' color='black' 
      onPress={()=>Alert.prompt("My Titile","My Massage",text=>console.log(text)
      // the text option does not work with IOS
      // the prompt does not work with Android 
      ) }/>
  
    </SafeAreaView>
  );
}
const containerStyle={backgroundColor:'orange'}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'

  },
});
