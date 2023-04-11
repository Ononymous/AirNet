import { ScrollView, StyleSheet, Text, View, RefreshControl, Dimensions, Modal, Alert } from 'react-native';
import PlaneItem from '../components/PlaneItem';
import { useState } from 'react';
import MoreInfo from './MoreInfo';
import SettingButton from '../components/SettingButton';
import SampleData from '../SampleData';

//make to do list app that shows planes that are flying nearby
export default function PlaneList({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const ListOfPlanes = SampleData.map((plane, index) => {
    return(
      <PlaneItem 
      key={index}
      plane={plane}
      navigation={navigation}
      />
  )})
  return (
    <View style={styles.container}>
      {/* Planes list area */}
      <View style={styles.planesWrapper}>
        {/* pull down to refresh */}
        <ScrollView style={styles.ScrollView} persistentScrollbar={true} 
          refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={() => {
              setRefreshing(true); 
              alert("Refresh triggered"); 
              setRefreshing(false)
        }} />}>
          {/* Plane items (supports 6 planes currently)*/}
          <View style={styles.items} >
            {ListOfPlanes}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const TitleHeight = 110;

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: '#C3C9E9',
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#373F47',
    height: '100%',
  },

  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: TitleHeight,
  },  

  planesWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    // borderRadius: 10,
    height: Dimensions.get('window').height - TitleHeight,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  items: {
    backgroundColor: '#C3C9E9',
    borderRadius: 10,
    padding: 10,
  },
});
