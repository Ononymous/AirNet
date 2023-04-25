
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import useFavoritePlanes from './MyFavoritePlanes';

const HeartButton = ({favoritePlane}) => {
  const [heartIcon, setHeartIcon] = useState('hearto');
  const [favorite,setFavorite]=useState(false);
  const [avoritePlanes,addFavoritePlane, removeFavoritePlane] = useFavoritePlanes();
  return (
    <TouchableOpacity style={styles.button} onPress={()=>{
      if(!favorite){
        setHeartIcon('heart')
        setFavorite(true)
        addFavoritePlane(favoritePlane);
        Alert.alert('This plane has been added to my favorites!')
      }else{
        setHeartIcon('hearto')
        setFavorite(false)
        removeFavoritePlane(favoritePlane)
        Alert.alert('This plane has been removed from my favorites!')
      }
    }}>
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
