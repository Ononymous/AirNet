import { ScrollView, StyleSheet, Text, View, RefreshControl, Dimensions, Platform } from 'react-native';
import PlaneItem from '../components/PlaneItem';
import { useState } from 'react';
import usePlaneData from '../backend/usePlaneData';
import BottomMenu from '../components/BottomMenu';
import { TITLE_HEIGHT } from '../constants';

export default function PlaneList({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [once, setOnce] = useState(false);
  const planeData = usePlaneData(refreshing, setRefreshing, once, setOnce);
  
  const ListOfPlanes = planeData.map((plane, index) => {
    return <PlaneItem key={index} plane={plane} navigation={navigation} />;
  });

  return (
    <View style={styles.container}>
      <View style={styles.planesWrapper}>
        <ScrollView
          style={styles.ScrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setOnce(true);
              }}
            />
          }>
          <View style={styles.items}>
            {planeData.length === 0 && !refreshing ? (
              <Text style={styles.emptyMessage}>No planes nearby. Pull down to refresh.</Text>
            ) : (
              ListOfPlanes
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomMenu}>
        <BottomMenu
          navigation={navigation}
          setOnce={setOnce}
          setRefreshing={setRefreshing}
          refreshing={refreshing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    height: Dimensions.get('window').height - TITLE_HEIGHT - 100,
  },
  items: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
    paddingHorizontal: 20,
  },
});
