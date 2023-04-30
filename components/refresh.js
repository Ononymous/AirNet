import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useFavoritePlanes from '../backend/useFavoritePlanes';

const Refresh = ({id}) => {
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
      <FontAwesome name="refresh" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0f0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 5,
  },
});

export default Refresh;
