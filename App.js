import { StyleSheet, View, Platform, StatusBar, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlaneList from './tabs/PlaneList';
import Setting from './tabs/Setting';
import MoreInfo from './tabs/MoreInfo';
import MyFavorite from './tabs/MyFavorite';
import About from './tabs/About';
import BottomMenu from './components/BottomMenu';

import SettingButton from './components/SettingButton';
import BackButton from './components/BackButton';
import CameraButton from './components/CameraButton';
import HeartButton from './components/HeartButton';

import 'react-native-url-polyfill/auto';
import Auth from './backend/Auth';
import Account from './backend/Account';
import { supabase } from './backend/supabase';

import SessionContext from './backend/SessionContext';
import FavoritePlanesContext from './backend/FavoritePlanesContext';

const Stack = createStackNavigator();

export default function App() {
  const [favoritePlanes, setFavoritePlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      updateFavoritePlanes();
    }
  }, [favoritePlanes]);

  useEffect(() => {
		if (!session) {
			setFavoritePlanes([]);
      // console.log("logged out clear favorite planes")
		}
		if (session) {
			getFavoritePlanes();
			// console.log("logged in get favorite planes")
		}
	}, [session]);

  async function getFavoritePlanes() {
    try {
        if (!session?.user) throw new Error('No user on the session! (get)');

        // Fetch the favorite_planes for the user
        const { data, error } = await supabase
            .from('profiles')
            .select('favorite_planes')
            .eq('id', session?.user.id)
            .single();

        if (error) throw error;

        // Store the favorite_planes in the PlaneContext
        setFavoritePlanes(data.favorite_planes || []);
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    }
}

async function updateFavoritePlanes() {
    try {
        if (!session?.user) throw new Error('No user on the session! (update)');

        const updates = {
            id: session?.user.id,
            favorite_planes: favoritePlanes,
            updated_at: new Date(),
        };

        let { error: updateError } = await supabase.from('profiles').upsert(updates);

        // console.log("updateFavoritePlanes")

        if (updateError) {
            throw updateError;
        }
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    }
}

  return (
    <View style={styles.container}>
      <SessionContext.Provider value={session}>
        <FavoritePlanesContext.Provider value={{ favoritePlanes, setFavoritePlanes, loading, setLoading }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="PlaneList">
              <Stack.Screen name="PlaneList" component={PlaneList} options={({ navigation }) => ({
                title: 'Nearby Planes',
                headerStyle: {
                  height: TitleHeight,
                  backgroundColor: '#FFFFFF',
                },  
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000000',
                },
                // headerRight: () => (
                //   <SettingButton onPress={() => navigation.navigate("Setting")} />
                // ),
              })}/>
              <Stack.Screen name="Setting" component={Setting} options={({ navigation }) => ({
                title: 'Setting',
                headerStyle: {
                  height: TitleHeight,
                  backgroundColor: '#ffffff',
                },
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000000',
                },
                headerLeft: () => (
                  <BackButton onPress={() => navigation.goBack()} />
                ),
              })}/>
              <Stack.Screen name="MoreInfo" component={MoreInfo} options={({ navigation }) => ({
                headerStyle: {
                  height: TitleHeight,
                  backgroundColor: '#ffffff',
                },
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000000',
                },
                headerLeft: () => (
                  <BackButton onPress={() => navigation.goBack()} />
                ),
              })}/>
              {session && session.user ? 
                <Stack.Screen name='MyFavorite' component={MyFavorite} options={({ navigation }) => ({
                  headerTitle:'My Favorites',
                  headerStyle: {
                    height: TitleHeight,
                    backgroundColor: '#ffffff',
                  },
                  headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#000000',
                  },
                  headerLeft: () => (
                    <BackButton onPress={() => navigation.goBack()} />
                  ),
                })}/> : 
                <Stack.Screen name='MyFavorite' component={Auth} options={({ navigation }) => ({
                  headerTitle:'Authentication',
                  headerStyle: {
                    height: TitleHeight,
                    backgroundColor: '#ffffff',
                  },
                  headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#000000',
                  },
                  headerLeft: () => (
                    <BackButton onPress={() => navigation.goBack()} />
                  ),
                })}/>
              }
              {session && session.user ? 
                <Stack.Screen name='User' component={Account} options={({ navigation }) => ({
                  headerTitle:'Account',
                  headerStyle: {
                    height: TitleHeight,
                    backgroundColor: '#ffffff',
                  },
                  headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#000000',
                  },
                  headerLeft: () => (
                    <BackButton onPress={() => navigation.goBack()} />
                  ),
                })}/> : 
                <Stack.Screen name='User' component={Auth} options={({ navigation }) => ({
                  headerTitle:'Authentication',
                  headerStyle: {
                    height: TitleHeight,
                    backgroundColor: '#ffffff',
                  },
                  headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#000000',
                  },
                  headerLeft: () => (
                    <BackButton onPress={() => navigation.goBack()} />
                  ),
                })}/>
              }
              <Stack.Screen name='About' component={About} options={({ navigation }) => ({
                headerTitle:'About this App',
                headerStyle: {
                  height: TitleHeight,
                  backgroundColor: '#ffffff',
                },
                headerTitleStyle: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000000',
                },
                headerLeft: () => (
                  <BackButton onPress={() => navigation.goBack()} />
                ),
              })}/>
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritePlanesContext.Provider>
      </SessionContext.Provider>
    </View>
  );
}

const TitleHeight = Platform.OS === 'android' ? 55 : 100;

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
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
