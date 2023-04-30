import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { FontAwesome5, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

import SignOutButton from "../components/SignOutButton";
import SignInButton from "../components/SignInButton";

import { supabase } from "../backend/supabase";
import SessionContext from "../backend/SessionContext";
import 'react-native-gesture-handler';
import SwitchBar from '../components/SwitchBar';

export default function Setting({navigation}) {

  const session = useContext(SessionContext);

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', padding: 10, paddingBottom: 20}}>
      <ScrollView>
        <View style={styles.settingContainer}>
          {session && session.user && <>
            <TouchableOpacity onPress={()=>navigation.navigate('User')}>
              <Image source={require('../assets/802043_man_512x512.png')} style={styles.profileImage}/>
            </TouchableOpacity>
            <Text style={styles.userName}>{session?.user?.email}</Text>
          </>}
          <View  style={styles.settingTab} >
              <View style={styles.Tab}>
                <Ionicons name='notifications-outline' size={24} color="black" />
                <Text style={styles.settingTabText}> Notifications</Text>
              </View>
              <SwitchBar/>
          </View>

          <View  style={styles.settingTab} >
              <View style={styles.Tab}>
                <MaterialIcons name="gps-fixed" size={24} color="black" />
                <Text style={styles.settingTabText}> GPS</Text>
              </View>
              <SwitchBar/>
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate('MyFavorite')}>
            <View  style={styles.settingTab} >
              <View style={styles.Tab}>
                <FontAwesome5 name="star" size={24} color="black" />
                <Text style={styles.settingTabText}> Manage My Favorites</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('About')}>
            <View  style={styles.settingTab} >
              <View style={styles.Tab}>
                <AntDesign name="infocirlceo" size={24} color="black" />
                <Text style={styles.settingTabText}> About</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons}/>
            </View>
          </TouchableOpacity>
          
        </View>
      </ScrollView>

      <View style={styles.signOutBtn}>
        {session && session.user ? <SignOutButton onPress={() => supabase.auth.signOut()}/> : <SignInButton onPress={() => navigation.navigate('User')}/>}
      </View> 

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  HEADERVIEW:{
    justifyContent:'space-evenly',
    flexDirection: 'row',
  },
  BiggerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 0,
    color:'#ffffff',
    backgroundColor: '#000000',
  },
  NUM:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 0,
    color:'#ffffff',
    backgroundColor: '#373F47',

  },
  userName:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 0,
    color:'#ffffff',
    backgroundColor: '#000000',

  },
  profileImage:{
    width: 100, 
    height: 100, 
    borderRadius: 400/ 2,
    alignSelf:'center',
    marginTop:10,
  },
  settingContainer:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:2,
    borderWidth: 0,
    borderColor: '#373F47',
    
  },
  settingTab:{
    flexDirection: 'row',
    
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:5,
    borderWidth: 0,
    borderColor: '#373F47',
    justifyContent:'space-between',
    backgroundColor:'#f8f7f7',
    marginTop:10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    
  
  },
  Tab:{
    flexDirection: 'row',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:2,
    borderWidth: 0,
    borderColor: '#373F47',
    justifyContent:'space-between',
    backgroundColor:'#f8f7f7',
    marginTop:10,
    height:'65%'
  },
  settingTabText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 0,
    color:"#000000",
    marginLeft:0,
    marginTop:3,
  },
  switchStyle:{
    marginRight:10,
    marginTop:5,
  },
  settingIcons:{
    marginRight:10,
    marginTop:7,
  },
  signOutBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
});