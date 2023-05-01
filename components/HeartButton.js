import { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FavoritePlanesContext from '../backend/FavoritePlanesContext';
import SessionContext from '../backend/SessionContext';

const HeartButton = ({id}) => {
	const { favoritePlanes, setFavoritePlanes, loading, setLoading } = useContext(FavoritePlanesContext);
	const [heartIcon, setHeartIcon] = useState('hearto');

	useEffect(() => {
		if (favoritePlanes.includes(id)) {
			setHeartIcon('heart');
		} else {
			setHeartIcon('hearto');
		}
	}, [favoritePlanes]);

  const handlePress = () => {
    const newFavoritePlanes = favoritePlanes.includes(id)
      ? favoritePlanes.filter((planeId) => planeId !== id)
      : [...favoritePlanes, id];
    setFavoritePlanes(newFavoritePlanes);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <AntDesign name={heartIcon} size={27} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 5,
  },
});

export default HeartButton;
