import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlaneList from './src/tabs/PlaneList';
import Setting from './src/tabs/Setting';
import MoreInfo from './src/tabs/MoreInfo';
import MyFavorite from './src/tabs/MyFavorite';
import About from './src/tabs/About';
import Tracker from './src/tabs/Tracker';
import OrientationCalibration from './src/tabs/OrientationCalibration';

import BackButton from './src/components/BackButton';
import OptionsButton from './src/components/OptionsButton';

import 'react-native-url-polyfill/auto';
import Auth from './src/backend/Auth';
import Account from './src/backend/Account';
import { supabase } from './src/backend/supabase';

import SessionContext from './src/backend/SessionContext';
import FavoritePlanesContext from './src/backend/FavoritePlanesContext';
import OptionContext from './src/backend/OptionContext';

const Stack = createStackNavigator();

export default function App() {
  const [favoritePlanes, setFavoritePlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [sort, setSort] = useState('none');
  const [distance, setDistance] = useState(0.3);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch favorite planes when user logs in
  useEffect(() => {
    if (!session) {
      setFavoritePlanes([]);
    } else {
      getFavoritePlanes();
    }
  }, [session]);

  async function getFavoritePlanes() {
    try {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('favorite_planes')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      setFavoritePlanes(data?.favorite_planes || []);
    } catch (error) {
      console.error('Error fetching favorite planes:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <SessionContext.Provider value={session}>
        <FavoritePlanesContext.Provider
          value={{ favoritePlanes, setFavoritePlanes, loading, setLoading }}
        >
          <OptionContext.Provider value={{ sort, setSort, distance, setDistance }}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="PlaneList">
                <Stack.Screen
                  name="PlaneList"
                  component={PlaneList}
                  options={{
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
                    headerRight: () => <OptionsButton />,
                  }}
                />
                <Stack.Screen
                  name="Setting"
                  component={Setting}
                  options={({ navigation }) => ({
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
                    headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                  })}
                />
                <Stack.Screen
                  name="MoreInfo"
                  component={MoreInfo}
                  options={({ navigation }) => ({
                    headerStyle: {
                      height: TitleHeight,
                      backgroundColor: '#71c5ee',
                      borderBottomWidth: 0,
                      borderBottomColor: '#71c5ee',
                    },
                    headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                  })}
                />
                {session && session.user ? (
                  <Stack.Screen
                    name="MyFavorite"
                    component={MyFavorite}
                    options={({ navigation }) => ({
                      headerTitle: 'My Favorites',
                      headerStyle: {
                        height: TitleHeight,
                        backgroundColor: '#ffffff',
                      },
                      headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000000',
                      },
                      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                    })}
                  />
                ) : (
                  <Stack.Screen
                    name="MyFavorite"
                    component={Auth}
                    options={({ navigation }) => ({
                      headerTitle: 'Authentication',
                      headerStyle: {
                        height: TitleHeight,
                        backgroundColor: '#ffffff',
                      },
                      headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000000',
                      },
                      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                    })}
                  />
                )}
                {session && session.user ? (
                  <Stack.Screen
                    name="User"
                    component={Account}
                    options={({ navigation }) => ({
                      headerTitle: 'Account',
                      headerStyle: {
                        height: TitleHeight,
                        backgroundColor: '#ffffff',
                      },
                      headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000000',
                      },
                      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                    })}
                  />
                ) : (
                  <Stack.Screen
                    name="User"
                    component={Auth}
                    options={({ navigation }) => ({
                      headerTitle: 'Authentication',
                      headerStyle: {
                        height: TitleHeight,
                        backgroundColor: '#ffffff',
                      },
                      headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000000',
                      },
                      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                    })}
                  />
                )}
                <Stack.Screen
                  name="About"
                  component={About}
                  options={({ navigation }) => ({
                    headerTitle: 'About this App',
                    headerStyle: {
                      height: TitleHeight,
                      backgroundColor: '#ffffff',
                    },
                    headerTitleStyle: {
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#000000',
                    },
                    headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                  })}
                />
                <Stack.Screen
                  name="Tracker"
                  component={Tracker}
                  options={({ navigation }) => ({
                    headerStyle: {
                      height: TitleHeight,
                      backgroundColor: '#ffffff',
                    },
                    headerTitleStyle: {
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#000000',
                    },
                    headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                  })}
                />
                <Stack.Screen
                  name="OrientationCalibration"
                  component={OrientationCalibration}
                  options={({ navigation }) => ({
                    headerStyle: {
                      height: TitleHeight,
                      backgroundColor: '#ffffff',
                    },
                    headerTitleStyle: {
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#000000',
                    },
                    headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </OptionContext.Provider>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
