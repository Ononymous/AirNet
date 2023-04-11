import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlaneList from './tabs/PlaneList';
import Setting from './tabs/Setting';
import MoreInfo from './tabs/MoreInfo';
import MyFavorite from './tabs/MyFavorite';

import SettingButton from './components/SettingButton';
import BackButton from './components/BackButton';
import CameraButton from './components/CameraButton';
import HeartButton from './components/HeartButton';


const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PlaneList">
          <Stack.Screen name="PlaneList" component={PlaneList} options={({ navigation }) => ({
            title: 'Nearby Planes',
            headerStyle: {
              height: TitleHeight,
              backgroundColor: '#373F47',
            },  
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
            },
            headerRight: () => (
              <SettingButton onPress={() => navigation.navigate("Setting")} />
            ),
          })}/>
          <Stack.Screen name="Setting" component={Setting} options={({ navigation }) => ({
            title: 'Setting',
            headerStyle: {
              height: TitleHeight,
              backgroundColor: '#373F47',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
            },
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
          })}/>
          <Stack.Screen name="MoreInfo" component={MoreInfo} options={({ navigation }) => ({
            headerStyle: {
              height: TitleHeight,
              backgroundColor: '#373F47',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
            },
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
            headerRight: () => (
              <View style={styles.lowerContainer}>
                <HeartButton onPress={() => alert("Added to My Favorite!")}/>
                <CameraButton onPress={() => alert("Camera pressed")}/> 
              </View>
            ),
          })}/>
          <Stack.Screen name='MyFavorite' component={MyFavorite} options={({navigation})=>({
            headerTitle:'My Favorites',
            headerStyle: {
              height: TitleHeight,
              backgroundColor: '#373F47',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
            },
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
            headerRight: () => (
              <SettingButton onPress={() => navigation.navigate("Setting")} />
            ),
          })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const TitleHeight = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373F47',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: TitleHeight,
  },  
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
