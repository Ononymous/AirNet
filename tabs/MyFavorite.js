import { ScrollView, StyleSheet, View, Dimensions, Platform } from 'react-native';
import PlaneItem from '../components/PlaneItem';
import useFavoritePlanes from '../backend/useFavoritePlanes';
import getSinglePlane from '../backend/getSinglePlane';

//make to do list app that shows planes that are flying nearby
export default function MyFavorite({navigation}) {
  const { favoritePlanes, loading, updateFavoritePlanes } = useFavoritePlanes();
  const ListOfPlanes = favoritePlanes.map((id, index) => {
    (async () => {
      const plane = await getSinglePlane(id);
      console.log(id);
      return(
        <PlaneItem 
        key={index}
        plane={plane}
        navigation={navigation}
        />
      )
    })()
  });
  return (
    <View style={styles.container}>
      <View style={styles.planesWrapper}>
        <ScrollView style={styles.ScrollView} persistentScrollbar={true}>
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
