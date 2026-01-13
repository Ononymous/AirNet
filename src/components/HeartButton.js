import { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FavoritePlanesContext from '../backend/FavoritePlanesContext';
import SessionContext from '../backend/SessionContext';
import { supabase } from '../backend/supabase';

const HeartButton = ({ id, dark }) => {
  const session = useContext(SessionContext);
  const { favoritePlanes, setFavoritePlanes } = useContext(FavoritePlanesContext);
  const [heartIcon, setHeartIcon] = useState('hearto');

  useEffect(() => {
    if (favoritePlanes.includes(id)) {
      setHeartIcon('heart');
    } else {
      setHeartIcon('hearto');
    }
  }, [favoritePlanes, id]);

  const handlePress = async () => {
    if (id === null || !session?.user) return;

    const newFavoritePlanes = favoritePlanes.includes(id)
      ? favoritePlanes.filter((planeId) => planeId !== id)
      : [...favoritePlanes, id];

    setFavoritePlanes(newFavoritePlanes);

    // Update database
    try {
      await supabase.from('profiles').upsert({
        id: session.user.id,
        favorite_planes: newFavoritePlanes,
        updated_at: new Date(),
      });
    } catch (error) {
      console.error('Failed to update favorites:', error);
      // Revert on error
      setFavoritePlanes(favoritePlanes);
    }
  };

  return session ? (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <AntDesign name={heartIcon} size={27} color={dark ? 'black' : 'white'} />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 5,
  },
});

export default HeartButton;
