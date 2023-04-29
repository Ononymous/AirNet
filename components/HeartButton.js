import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import useFavoritePlanes from '../backend/useFavoritePlanes';

const HeartButton = ({id}) => {
  const { favoritePlanes, loading, updateFavoritePlanes } = useFavoritePlanes();
  const [heartIcon, setHeartIcon] = useState('hearto');

  useEffect(() => {
    if (favoritePlanes.includes(id)) {
      setHeartIcon('heart');
    } else {
      setHeartIcon('hearto');
    }
  }, [favoritePlanes]);

  return (
    <TouchableOpacity style={styles.button} onPress={()=>{updateFavoritePlanes(id)}}>
      <AntDesign name={heartIcon} size={27} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#373F47',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 5,
  },
});

export default HeartButton;
