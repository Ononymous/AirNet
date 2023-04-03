import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import PlaneList from './tabs/PlaneList';

//make to do list app that shows planes that are flying nearby
export default function App() {
  return (
    <View style={styles.container}>
      <PlaneList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373F47',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
});
