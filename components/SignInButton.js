// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// const SignOutButton = ({ onPress }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={styles.button}>
//       <Text style={styles.buttonText}>Sign In</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#2F80ED',
//     borderRadius: 10,
//     width: 200,
//     height: 40,
//     padding: 10,
//     marginTop: 10,
//     marginLeft: 10,
//   },
//   // button: {
//   //   backgroundColor: '#2F80ED',
//   //   borderRadius: 10,
//   //   width: 200,
//   //   height: 40,
//   //   padding: 10,
//   //   marginTop: 10,
//   //   marginLeft: 10,
//   //   shadowColor: '#000',
//   //   shadowOffset: {
//   //     width: 0,
//   //     height: 2,
//   //   },
//   //   shadowOpacity: 0.25,
//   //   shadowRadius: 3.84,
//   //   elevation: 5,
//   // },
  
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default SignOutButton;

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SignOutButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2F80ED',
    borderRadius: 25,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#2F80ED',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default SignOutButton;