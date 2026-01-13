import React from 'react';
import { View } from 'react-native';

const Circle = ({ score }) => {
  const size = score ? (1 - score) * 500 : 100;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 5,
      }}
    />
  );
};

export default Circle;
