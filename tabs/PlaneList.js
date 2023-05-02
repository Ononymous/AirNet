import { ScrollView, StyleSheet, Text, View, RefreshControl, Dimensions, Modal, Alert, Platform } from 'react-native';
import PlaneItem from '../components/PlaneItem';
import { useState, useEffect } from 'react';
import usePlaneData from '../backend/usePlaneData';
import BottomMenu from '../components/BottomMenu';

//make to do list app that shows planes that are flying nearby
export default function PlaneList({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [once, setOnce] = useState(false);
  const planeData = usePlaneData(refreshing, setRefreshing, once, setOnce);
  const ListOfPlanes = planeData.map((plane, index) => {
    return(
      <PlaneItem 
      key={index}
      plane={plane}
      navigation={navigation}
      />
  )})

  return (
    <View style={styles.container}>
      <View style={styles.planesWrapper}>
        <ScrollView style={styles.ScrollView} persistentScrollbar={true} 
          refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={() => {
              setRefreshing(true);
              setOnce(true);
        }} />}>
          <View style={styles.items} >
            {ListOfPlanes}
          </View>
        </ScrollView>
      </View>

      {/* Bottom menu */}
      <View style={styles.bottomMenu}>
        <BottomMenu navigation={navigation} setOnce={setOnce} setRefreshing={setRefreshing} refreshing={refreshing}/>
      </View>
    </View>
      
  );
}
const TitleHeight = Platform.OS === 'android' ? 60 : 100;

const styles = StyleSheet.create({
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // borderTopWidth: 0.5,
  },
  ScrollView: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  planesWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
    // borderRadius: 10,
    height: Dimensions.get('window').height - TitleHeight - 100,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  items: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
});
