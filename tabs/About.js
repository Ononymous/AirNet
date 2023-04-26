import { ScrollView,Text, View, Image,SafeAreaView,StyleSheet } from "react-native";

export default function About(){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#373F47', padding: 10, paddingBottom: 10}}>
            <ScrollView>
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
                <Text style={styles.Slogan}>
                AirNet, Connecting You to the Sky
                </Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

  txt:{
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 0,
    color:'#ffffff',
    backgroundColor: '#373F47',
    marginBottom:10

  },

  Logo:{
     width: 200, 
     height: 200, 
     borderRadius: 400/ 2,
    //  alignSelf:'center',
     marginTop:10,
     marginHorizontal:85

  },
  Container:{
    flexDirection: 'column',
    alignContent:'center',
    padding: 0,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal:2,
    borderWidth: 5,
    borderColor: '#373F47',
  },
  BiggerText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color:'#ffffff',
    marginTop: 10,
    marginBottom:10,
  },
  Slogan:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color:'#35ACAF',
    marginTop: 10,
    marginBottom:10,
  },
  Version:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color:'#ffffff',
    marginTop: 0,
    marginBottom:10,
  }
  });
  