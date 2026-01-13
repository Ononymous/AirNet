import React, { useContext } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import SignOutButton from '../components/SignOutButton';
import SignInButton from '../components/SignInButton';
import { supabase } from '../backend/supabase';
import SessionContext from '../backend/SessionContext';

export default function Setting({ navigation }) {
  const session = useContext(SessionContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.settingContainer}>
          {session && session.user && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('User')}>
                <View style={styles.profileImageContainer}>
                  <Text style={styles.profileImageText}>
                    {session.user.email.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.userName}>{session?.user?.email}</Text>
            </>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('MyFavorite')}>
            <View style={styles.settingTab}>
              <View style={styles.Tab}>
                <FontAwesome5 name="star" size={24} color="black" />
                <Text style={styles.settingTabText}> Manage My Favorites</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <View style={styles.settingTab}>
              <View style={styles.Tab}>
                <AntDesign name="info-circle" size={24} color="black" />
                <Text style={styles.settingTabText}> About</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OrientationCalibration')}>
            <View style={styles.settingTab}>
              <View style={styles.Tab}>
                <FontAwesome5 name="compass" size={24} color="black" />
                <Text style={styles.settingTabText}> Orientation Calibration</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.signOutBtn}>
        {session && session.user ? (
          <SignOutButton onPress={() => supabase.auth.signOut()} />
        ) : (
          <SignInButton onPress={() => navigation.navigate('User')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingBottom: 20,
  },
  userName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2F80ED',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  settingContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 2,
  },
  settingTab: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    backgroundColor: '#f8f7f7',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  Tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTabText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  settingIcons: {
    marginRight: 5,
  },
  signOutBtn: {
    paddingVertical: 10,
  },
});
