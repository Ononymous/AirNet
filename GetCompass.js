import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { Quaternion } from 'quaternion';

export default function Compass() {
    const [rotation, setRotation] = useState({
        alpha: 0,
        beta: 0,
        gamma: 0,
    });

    const [data, setData] = useState({ 
        x: 0, 
        y: 0, 
        z: 0, 
        w: 0
    })
    
    const [subscription, setSubscription] = useState(false);
    const _subscribe = () => {
        setSubscription(
            DeviceMotion.addListener(result => {
                setRotation(result.rotation);
            })
        )
    };
    const _unsubscribe = () => {
        subscription != null && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    useEffect(() => {
        var q = Quaternion.fromEuler(rotation.alpha, rotation.beta, rotation.gamma, 'ZXY');
        setData(q);
    }, [rotation]);

    return (
        <View style={styles.container}>
            <Button title={subscription ? 'ON' : 'OFF'} onPress={subscription ? _unsubscribe : _subscribe} />
            <Text style={styles.text}>Orientation</Text>
            <Text style={styles.text}>Alpha: {rotation.alpha/Math.PI*180}</Text>
            <Text style={styles.text}>Beta: {rotation.beta/Math.PI*180}</Text>
            <Text style={styles.text}>Gamma: {rotation.gamma/Math.PI*180}</Text>
            <Text style={styles.text}>----------------------------------</Text>
            <Text style={styles.text}>Quaternion</Text>
            <Text style={styles.text}>X: {data.x}</Text>
            <Text style={styles.text}>Y: {data.y}</Text>
            <Text style={styles.text}>Z: {data.z}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});