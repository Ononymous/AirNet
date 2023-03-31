import { ScrollView, Button, StyleSheet, Text, View,SafeAreaView, alert} from 'react-native';
import PlaneItem from './components/planeItem';
import RefreshButton from './components/refreshButton';
import TextInputExample from './components/TextInput';

//make to do list app that shows planes that are flying nearby
export default function App() {
  return (

    <View style={styles.container}> 
      {/* Title and settings area*/}
      <View style={styles.titleWrapper}>
      </View>
      <Text style={styles.sectionTitle}>Sign In</Text>
      <Text style={styles.text}>Email</Text>
      <TextInputExample></TextInputExample>
      <Text style={styles.text}>Password</Text>
      <TextInputExample ></TextInputExample>
      <Button
        title="Sign In"
        color='white'
        backgroundColor='blue'
      />

      <View style={{ flexDirection: "row" ,marginLeft: -80, justifyContent: 'space-evenly'}}>
          <Button
            title="Forgot Password"
            color='white'
            backgroundColor='blue'
          />
          <Button
            title="Sign Up"
            color='#2196F3'
            backgroundColor='blue'
          />
      </View>
      {/* <Button
        title="Forgot Password"
        color='white'
        backgroundColor='blue'
      />
      <Button
        title="Sign Up"
        color='#2196F3'
        backgroundColor='blue'
      /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  refreshRow: {
    flexDirection: 'row',
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
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },

  text: {
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
