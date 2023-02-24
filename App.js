import {StyleSheet, View, SafeAreaView} from 'react-native';
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GetLocation from './GetLocation';
import GetPlane from './GetPlane';

import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

export const PlaneContext = React.createContext();

const Tab = createBottomTabNavigator();

export default function App() {
  const initialState = {
    data: [],
    location: null,
  }
  const [state, setState] = useState(initialState);

  function setLocation(i){
    setState({...state, location: i})
  }
  function setData(i){
    setState({...state, data: i})
  }

  const contextSetters = {
    setLocation,
    setData,
  }

  return (
    <PlaneContext.Provider value={{...state, ...contextSetters}}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator 
          initialRouteName='GPS'
          screenOptions={({ route }) => ({
              activeTintColor: 'tomato',
              inactiveTintColor: 'grey',
              labelStyle: { paddingBottom: 10, fontSize: 10 },
              style: { padding: 10, height: 70},
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                if (rn === "GPS") {
                  iconName = focused ? 'gps-fixed' : 'gps-not-fixed';
                  return <MaterialIcons name={iconName} size={size} color={color} />
                } 
                else if (rn === "Plane") {
                  iconName = focused ? 'ios-airplane-sharp' : 'airplane-outline';
                  return <Ionicons name={iconName} size={size} color={color} />
                } 
                return <View/>;
              },
            })}
          >
            <Tab.Screen name="GPS" component={GetLocation} />
            <Tab.Screen name="Plane" component={GetPlane} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PlaneContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewVisible: {
    borderWidth: 1,
    borderStyle: "dotted",
    width: 50,
    height: 50
  },
  scrollViewContainer: {
    height: 50,
    borderWidth: 1
  },
  textInput: {
    borderWidth: 1
  },
  tinyLogo: {
    width: 50,
    height: 50
  }
});