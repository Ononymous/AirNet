import { ScrollView, Button, StyleSheet, Text, View, RefreshControl, Dimensions, Modal, Platform, StatusBar } from 'react-native';
import PlaneItem from './components/PlaneItem';
import { useState } from 'react';
import MoreInfo from './tabs/MoreInfo';
import SettingButton from './components/SettingButton';

//make to do list app that shows planes that are flying nearby
export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Modal for more info */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={moreInfoVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setMoreInfoVisible(!moreInfoVisible);
      }}>
        <MoreInfo setMoreInfoVisible={setMoreInfoVisible} />
      </Modal>

      {/* Title and settings area*/}
      <View style={styles.titleWrapper}>
        <Text style={styles.sectionTitle}>Nearby Planes</Text>
        <SettingButton onPress={() => alert('Settings button pressed!')} />
      </View>
      {/* <Button title="More Info" onPress={() => setMoreInfoVisible(!moreInfoVisible)} /> */}

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

            <PlaneItem 
            imageUrl={"https://media.wired.com/photos/62b25f4c18e6fafaa97a6477/16:9/w_2400,h_1350,c_limit/Air-Serbia-Plane-Russian-Sanctions-Safety-Hazard-Business-1239498184.jpg"}
            airline="SouthWest"
            flightNumber={"SWA2434"}
            origin="LAX"
            destination={"SBA"}
            planeType={"Boeing 737"}
            setMoreInfoVisible={setMoreInfoVisible}
            /> 
          
          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
            setMoreInfoVisible={setMoreInfoVisible}
          />

          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
            setMoreInfoVisible={setMoreInfoVisible}
          />

          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
            setMoreInfoVisible={setMoreInfoVisible}
          />
          
          {/* <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
            setMoreInfoVisible={setMoreInfoVisible}
          />

          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
            setMoreInfoVisible={setMoreInfoVisible}
          /> */}

          </View>
        </ScrollView>
      </View>

    </View>
  );
}

const TitleHeight = 60;

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: '#C3C9E9',
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#373F47',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
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
