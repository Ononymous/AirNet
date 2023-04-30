import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FadingBackground = () => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#000000']}
      style={styles.background}
    >
      <View style={styles.content}>
        {/* your content goes here */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FadingBackground;
