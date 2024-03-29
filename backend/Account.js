import { useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import SessionContext from './SessionContext';

export default function Account({navigation}) {
	const session = useContext(SessionContext)
	
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState('');

	useEffect(() => {
		if (session) getProfile();
	}, [session]);

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error('No user on the session!');

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`username`)
				.eq('id', session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({ username }) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error('No user on the session!');

			const updates = {
				id: session?.user.id,
				username,
				updated_at: new Date(),
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) {
				throw error;
			}
			else {
				Alert.alert("Profile updated!");
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input label="Email" value={session?.user?.email} disabled />
			</View>
			<View style={styles.verticallySpaced}>
				<Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
			</View>

			{/* <View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title={loading ? 'Loading ...' : 'Update'}
					onPress={() => updateProfile({ username })}
					disabled={loading}
				/>
			</View> */}
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title={loading ? 'Loading ...' : 'Update'}
					onPress={() => updateProfile({ username })}
					disabled={loading}
					buttonStyle={styles.updateButton}
					titleStyle={styles.updateButtonText}
				/>
			</View>

			{/* <View style={styles.verticallySpaced}>
				<Button title="Sign Out" onPress={() => {supabase.auth.signOut(); navigation.goBack()}} />
			</View> */}
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign Out"
					onPress={() => {supabase.auth.signOut(); navigation.goBack()}}
					buttonStyle={styles.signOutButton}
					titleStyle={styles.signOutButtonText}
				/>
			</View>
		</View>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		marginTop: 40,
// 		padding: 12,
// 	},
// 	verticallySpaced: {
// 		paddingTop: 4,
// 		paddingBottom: 4,
// 		alignSelf: 'stretch',
// 	},
// 	mt20: {
// 		marginTop: 20,
// 	},
// });

const styles = StyleSheet.create({
	container: {
	  marginTop: 40,
	  padding: 12,
	},
	verticallySpaced: {
	  paddingTop: 4,
	  paddingBottom: 4,
	  alignSelf: 'stretch',
	},
	mt20: {
	  marginTop: 20,
	},
	updateButton: {
	  backgroundColor: '#007aff',
	  borderRadius: 10,
	  padding: 10,
	  marginHorizontal: 10
	},
	updateButtonText: {
	  color: '#fff',
	  fontWeight: 'bold',
	},
	signOutButton: {
	  backgroundColor: '#fff',
	  borderRadius: 10,
	  borderWidth: 1,
	  borderColor: '#007aff',
	  padding: 10,
	  marginHorizontal: 10
	},
	signOutButtonText: {
	  color: '#007aff',
	  fontWeight: 'bold',
	},
});