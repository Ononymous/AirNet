import { ScrollView, Button, StyleSheet, Text, View } from 'react-native';
import PlaneItem from './components/planeItem';
import RefreshButton from './components/refreshButton';

//make to do list app that shows planes that are flying nearby
export default function App() {
  return (
    <View style={styles.container}> 

      {/* Title and settings area*/}
      <View style={styles.titleWrapper}>
        <Text style={styles.sectionTitle}>Nearby Planes</Text>
        <Button title="Settings" onPress={() => alert('Settings button pressed!')} />
      </View>

      <View style={styles.planesWrapper}>
        <ScrollView style={styles.ScrollView} persistentScrollbar={true}>

          {/* Plane items (supports 6 planes currently)*/}
          <View style={styles.items}>

            <PlaneItem 
            imageUrl={"https://media.wired.com/photos/62b25f4c18e6fafaa97a6477/16:9/w_2400,h_1350,c_limit/Air-Serbia-Plane-Russian-Sanctions-Safety-Hazard-Business-1239498184.jpg"}
            airline="SouthWest"
            flightNumber={"SWA2434"}
            origin="LAX"
            destination={"SBA"}
            planeType={"Boeing 737"}
            /> 
          
          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
          />

          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
          />

          {/* <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
          />

          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
          />

          <PlaneItem
            imageUrl="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            airline="United Airlines"
            flightNumber="UA123"
            origin="SFO"
            destination="JFK"
            planeType="Boeing 737"
          /> */}

          </View>
        </ScrollView>
      </View>

      <View style={styles.refreshRow}>
        <RefreshButton onPress={() => alert("Refresh button pressed")}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  refreshRow: {
    flexDirection: 'row',
    //put to center
    justifyContent: 'center',
  },

  ScrollView: {
    backgroundColor: '#C3C9E9',
    borderRadius: 10,
    height: 600,
  },

  container: {
    flex: 1,
    backgroundColor: '#373F47',
    
  },

  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 60,
  },  

  planesWrapper: {
    paddingTop: 20,
    paddingHorizontal: 10,
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
    height: 1060,

  },
});
