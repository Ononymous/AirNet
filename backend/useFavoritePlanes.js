import { useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';
import SessionContext from './SessionContext';
import FavoritePlanesContext from './FavoritePlanesContext';

export default function useFavoritePlanes() {
	const session = useContext(SessionContext);
	const { favoritePlanes, setFavoritePlanes, loading, setLoading } = useContext(FavoritePlanesContext);

	useEffect(() => {
		if (session) {
			getFavoritePlanes();
		} else {
			setFavoritePlanes([]);
		}
	}, [session]);

	useEffect(() => {
		if (session && favoritePlanes.length > 0) {
			updateFavoritePlanes();
		}
	}, [favoritePlanes]);

    async function updateFavoritePlanes() {
		try {
			if (!session?.user) throw new Error('No user on the session!');
	
			setLoading(true);
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
			setLoading(!loading);
		}
	}

	async function getFavoritePlanes() {
		try {
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
		}
	}

	return { updateFavoritePlanes };
}