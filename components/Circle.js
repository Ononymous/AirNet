import React from 'react';
import { View } from 'react-native';

const Circle = ({ score }) => {
  const size = (1 - score) * 500; // Change this value to adjust the circle size range

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 5,
      }}
    ></View>
  );
};

export default Circle;