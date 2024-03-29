import { ScrollView,Text, View, Image,SafeAreaView,StyleSheet } from "react-native";

export default function About(){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', paddingHorizontal:10, height:"100%"}}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.Container}>
              <Image source={require('../assets/AirNet_Logo.png')} style={styles.Logo}></Image>
              <Text style={styles.Version}>version 0.0.1</Text>
              <Text style={styles.txt}>
              Welcome to AirNet, the flight tracking app that helps people gather flight information nearby. Our mission is to connect the sky by providing the most accurate and up-to-date information on flight schedules and status to our users.
              </Text>
              <Text style={styles.BiggerText}> About Our Team</Text>
              <Text style={styles.txt}>AirNet was founded in 2023 by Gen Tamada, Ray Du, Tommy So, and Bryce Wang. Since then, we've been working hard to create a seamless and user-friendly experience for our users. 
              Our team is made up of passionate individuals who are dedicated to providing you with the best possible experience. Thank you for choosing AirNet and we hope you enjoy using our app. If you have any questions or feedback, please don't hesitate to contact us.
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <Text style={styles.Slogan}>
            AirNet, Connecting You to the Sky
            </Text>
          </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

  txt:{
    textAlign:'center',
    fontSize: 16,
    color:'#000000',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  Logo:{
     width: 100, 
     height: 100, 
     borderRadius: 400/ 2,
     alignSelf:'center',
     marginTop:10,
  },
  Container:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:2,
    borderWidth: 0,

  },
  BiggerText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color:'#000000',
    marginTop: 10,
    marginBottom:10,
  },
  Slogan:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color:'#235f63',
    justifyContent:"flex-end",
    marginBottom: 20, // Add this line
  },
  Version:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color:'#000000',
    marginTop: 10,
    marginBottom:10,
  }
  });
  