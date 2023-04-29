import { useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';
import SessionContext from './SessionContext';

export default function useFavoritePlanes() {
	const session = useContext(SessionContext)
    const [favoritePlanes, setFavoritePlanes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (session) getFavoritePlanes();
        else setFavoritePlanes([]);
	}, [session]);

    async function updateFavoritePlanes(planeHexId) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error('No user on the session!');
	
			// Fetch the current favorite_planes for the user
			const { data, error } = await supabase
				.from('profiles')
				.select('favorite_planes')
				.eq('id', session?.user.id)
				.single();
	
			if (error) throw error;
	
			const favoritePlanes = data.favorite_planes || [];
	
			// Add or remove the planeHexId
			if (favoritePlanes.includes(planeHexId)) {
				favoritePlanes.splice(favoritePlanes.indexOf(planeHexId), 1);
			} else {
				favoritePlanes.push(planeHexId);
			}

            setFavoritePlanes(favoritePlanes);
	
			// Update the favorite_planes column
			const updates = {
				id: session?.user.id,
				favorite_planes: favoritePlanes,
				updated_at: new Date(),
			};
	
			let { error: updateError } = await supabase.from('profiles').upsert(updates);
	
			if (updateError) {
				throw updateError;
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function getFavoritePlanes() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error('No user on the session!');
	
			// Fetch the favorite_planes for the user
			const { data, error } = await supabase
				.from('profiles')
				.select('favorite_planes')
				.eq('id', session?.user.id)
				.single();
	
			if (error) throw error;
	
			// Store the favorite_planes in the PlaneContext
			setFavoritePlanes(data.favorite_planes || []);
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}	

    return { favoritePlanes, loading, updateFavoritePlanes };
}