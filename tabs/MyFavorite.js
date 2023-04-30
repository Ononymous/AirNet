import { ScrollView, StyleSheet, View, Dimensions, Platform, RefreshControl } from 'react-native';
import PlaneItem from '../components/PlaneItem';
import FavoritePlanesContext from '../backend/FavoritePlanesContext';
import getSinglePlane from '../backend/getSinglePlane';
import { useEffect, useState, useContext } from 'react';

const tempPlane = {
  id: 0,
  hex: "",
  imgUrl: "",
  airline: "",
  flightNumber: "",
  origin: "",
  originFull: "",
  destination: "",
  destinationFull: "",
  planeType: "",
  scheduledArrival: 0,
  altitude: 0,
  latitude: 0,
  longitude: 0,
  speed: 0,
}

//make to do list app that shows planes that are flying nearby
export default function MyFavorite({navigation}) {
  const { favoritePlanes } = useContext(FavoritePlanesContext);
  const [planes, setPlanes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [counter, setCounter] = useState(false);
  const ListOfPlanes = planes.map((plane, index) => {
    return(
      <PlaneItem 
      key={index}
      plane={plane}
      navigation={navigation}
      />)
  })

  useEffect(() => {
    (async () => {
      setPlanes([]);
      for(id of favoritePlanes) {
        tempPlane.id = id;
        const newPlane = await getSinglePlane(id, tempPlane);
        setPlanes(planes => [...planes, newPlane]);
      }
      setRefreshing(false);
    })();
  }, [counter]);

  useEffect(() => {
    // console.log(favoritePlanes)
  }, [favoritePlanes]);

  return (
    <View style={styles.container}>
      <View style={styles.planesWrapper}>
        <ScrollView style={styles.ScrollView} persistentScrollbar={true} 
          refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={() => {
              setRefreshing(true);
              setCounter(!counter);
        }} />}>
          <View style={styles.items} >
            {ListOfPlanes}
          </View>
        </ScrollView>
      </View>

    </View>
  );
}

const TitleHeight = Platform.OS === 'android' ? 60 : 100;

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
