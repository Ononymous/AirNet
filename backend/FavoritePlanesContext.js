import { createContext } from 'react';

const FavoritePlanesContext = createContext({
    favoritePlanes: [],
    setFavoritePlanes: () => {},
    loading: true,
    setLoading: () => {},
});

export default FavoritePlanesContext;