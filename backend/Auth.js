import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from './supabase'
import { Button, Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

const activeColor = '#2F80ED'; // blue
const inactiveColor = '#E0E0E0'; // light gray
const switchDuration = 200;

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [loading, setLoading] = useState(false);
	const [signInActive, setSignInActive] = useState(true);

	async function signInWithEmail() {
		setLoading(true)
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})

		if (error) Alert.alert(error.message)
		setLoading(false)
	}

	async function signUpWithEmail() {
		setLoading(true)
		if(password !== confirm) {
			Alert.alert("Passwords do not match");
			setLoading(false);
			return;
		}
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
		})

		if (error) Alert.alert(error.message)
		else Alert.alert("Check your email for the confirmation link!")
		setLoading(false)
	}

	const handleSignInPress = () => {
		setSignInActive(true);
		
	};

	const handleSignUpPress = () => {
		setSignInActive(false);
	};

	const signInStyle = {
		backgroundColor: signInActive ? activeColor : inactiveColor,
	};

	const signUpStyle = {
		backgroundColor: !signInActive ? activeColor : inactiveColor,
	};

	return (
		<View style={styles.container}>
			{/* <Animated.View
				style={{
				transform: [
					{
					translateX: switchAnimation.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -200],
					}),
					},
				],
			}}> */}
			<View style={[styles.rowContainer, styles.centeredContainer]}>
				<TouchableOpacity
					style={[styles.switchButton, signInStyle]}
					onPress={handleSignInPress}>
					<Text style={styles.switchButtonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.switchButton, signUpStyle]}
					onPress={handleSignUpPress}>
					<Text style={styles.switchButtonText}>Sign up</Text>
				</TouchableOpacity>
			</View>
			{/* </Animated.View> */}
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					labelStyle={styles.inputLabel}
					inputContainerStyle={styles.inputContainer}
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>

			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					labelStyle={styles.inputLabel}
					inputContainerStyle={styles.inputContainer}
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={'none'}
				/>
			</View>
			{!signInActive && (
				<View style={[styles.verticallySpaced]}>
					<Input
						label="Confirm Password"
						labelStyle={styles.inputLabel}
						inputContainerStyle={styles.inputContainer}
						leftIcon={{ type: 'font-awesome', name: 'lock' }}
						onChangeText={(text) => setConfirm(text)}
						value={confirm}
						secureTextEntry={true}
						placeholder="Confirm Password"
						autoCapitalize={'none'}
					/>
				</View>
			)}
			
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title={signInActive ? "Login" : "Sign up"}
					disabled={loading}
					buttonStyle={{ backgroundColor: activeColor, borderRadius: 0, padding: 14}}
					titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
					onPress={signInActive ? () => signInWithEmail(): () => signUpWithEmail()}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		paddingHorizontal: 20,
		paddingVertical: 40,
	},
	  
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	verticallySpaced: {
		justifyContent: 'center',
	},
	centeredContainer: {
		justifyContent: 'center',
	},
	switchButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 0,
		width: 170,
		height: 60,
		backgroundColor: activeColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	switchButtonText: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 24,
		textAlign: 'center',
	},
	inputLabel: {
		fontWeight: 'bold',
		fontSize: 16,
		paddingBottom: 5,
	},
	inputContainer: {
		borderBottomWidth: 0,
		borderRadius: 5,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
	},  
})