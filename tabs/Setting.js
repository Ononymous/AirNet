import { SafeAreaView , ScrollView,View,Text,Image,TextInput,TouchableOpacity,Switch} from "react-native";
import { useRouter } from "expo-router";
import Button from "../componet/BackButton";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from "../componet/seachBar";
import SignOutButton from "../componet/signOutBtn";



export default function setting(searchTerm,setSearchTerm,handleClick) {
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#373F47'}}>
      <View style={styles.HEADERVIEW}>
        <Text style={styles.BiggerText}>Settings</Text>
      </View>
      <ScrollView>
        <SearchBar/>
        <View style={styles.settingContainer}>
          <Image source={uri='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} style={styles.profileImage}></Image>
          <Text style={styles.userName}>User 123</Text>
          <View  style={styles.settingTab} >
              <View style={styles.settingTab}>
                <Ionicons name='notifications-outline' size={24} color="black" />
                <Text style={styles.settingTabText}> Notifications</Text>
              </View>
              <Switch style={styles.switchStyle}/>

          </View>
          <View  style={styles.settingTab} >
              <View style={styles.settingTab}>
                <MaterialIcons name="gps-fixed" size={24} color="black" />
                <Text style={styles.settingTabText}> GPS</Text>
              </View>
              <Switch style={styles.switchStyle}/>

          </View>
          <TouchableOpacity>
            <View  style={styles.settingTab} >
              <View style={styles.settingTab}>
                <FontAwesome5 name="star" size={24} color="black" />
                <Text style={styles.settingTabText}> Manage My Favorites</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons}/>

            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View  style={styles.settingTab} >
              <View style={styles.settingTab}>
                <AntDesign name="infocirlceo" size={24} color="black" />
                <Text style={styles.settingTabText}> About</Text>
              </View>
              <AntDesign name="right" size={24} color="black" style={styles.settingIcons}/>

            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <View style={styles.signOutBtn}>
        <SignOutButton/>
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
    backgroundColor: '#373F47',
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
    backgroundColor: '#373F47',

  },
  profileImage:{
     width: 100, 
     height: 100, 
     borderRadius: 400/ 2,
     alignSelf:'center',
     marginTop:10

  },
  settingContainer:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:2,
    borderWidth: 5,
    borderColor: '#373F47',
  },
  settingTab:{
    flexDirection: 'row',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:2,
    borderWidth: 0,
    borderColor: '#373F47',
    justifyContent:'space-between',
    backgroundColor:'#D9D9D9',
    marginTop:10,
  },
  settingTabText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 0,
    color:COLORS.primary,
    marginLeft:0,
    marginTop:3,
  },
  switchStyle:{
    marginRight:10,
    marginTop:15,
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