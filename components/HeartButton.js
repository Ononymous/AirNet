import { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import FavoritePlanesContext from '../backend/FavoritePlanesContext';

const HeartButton = ({id}) => {
  const { favoritePlanes, setFavoritePlanes, loading, setLoading } = useContext(FavoritePlanesContext);
  const [heartIcon, setHeartIcon] = useState('hearto');

  useEffect(() => {
    // console.log(id)
    if (favoritePlanes.includes(id)) {
      setHeartIcon('heart');
    } else {
      setHeartIcon('hearto');
    }
  }, [favoritePlanes]);

  const handlePress = () => {
    setLoading(true);
    const newFavoritePlanes = favoritePlanes.includes(id)
      ? favoritePlanes.filter((planeId) => planeId !== id)
      : [...favoritePlanes, id];
    setFavoritePlanes(newFavoritePlanes);
    setLoading(false);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
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
