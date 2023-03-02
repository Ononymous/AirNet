import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Magnetometer, Accelerometer, Gyroscope } from 'expo-sensors';
import AHRS from 'ahrs';

export default function Compass() {
    const [compass, setCompass] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [accel, setAccel] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [gyro, setGyro] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [angles, setAngles] = useState({
        heading: 0,
        roll: 0,
        pitch: 0,
    });
    
    const interval = 200;

    Magnetometer.setUpdateInterval(interval);
    Accelerometer.setUpdateInterval(interval);
    Gyroscope.setUpdateInterval(interval);

    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        setSubscription([
            Magnetometer.addListener(result => {
                setCompass(result);
            }),
            Accelerometer.addListener(result => {
                setAccel(result);
            }),
            Gyroscope.addListener(result => {
                setGyro(result);
            })
        ]);
    };

    const _unsubscribe = () => {
        subscription[0] != null && subscription[0].remove();
        subscription[1] != null && subscription[1].remove();
        subscription[2] != null && subscription[2].remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const madgwick = new AHRS({
        // The sample interval, in Hz.
        sampleInterval: 1/interval,
        // Choose from the `Madgwick` or `Mahony` filter.
        algorithm: 'Madgwick',
        // The filter noise value, smaller values have
        // smoother estimates, but have higher latency.
        // This only works for the `Madgwick` filter.
        beta: 0.4,
        // The filter noise values for the `Mahony` filter.
        kp: 0.5, // Default: 0.5
        ki: 0, // Default: 0.0
        // When the AHRS algorithm runs for the first time and this value is
        // set to true, then initialisation is done.
        doInitialisation: false,
      });

      useEffect(() => {
        madgwick.update(gyro.x, gyro.y, gyro.z, accel.x, accel.y, accel.z, compass.x/65, compass.y/65, compass.z/65);
        // madgwick.update(gyro.x, gyro.y, gyro.z, accel.x, accel.y, accel.z);
        const tempAngles = madgwick.getEulerAngles();
        setAngles({
            heading: tempAngles.heading * 100000000,
            roll: tempAngles.roll * 100000000,
            pitch: tempAngles.pitch * 100000000,
        });
    }, [compass, accel, gyro]);

    return (
        <View style={styles.container}>
            <Button onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? 'On' : 'Off'}/>
            
            <Text style={styles.text}>Magnetometer: (in μT, micro Tesla)</Text>
            <Text style={styles.text}>x: {compass.x}</Text>
            <Text style={styles.text}>y: {compass.y}</Text>
            <Text style={styles.text}>z: {compass.z}</Text>
            <Text style={styles.text}>---------------------------------</Text>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {accel.x}</Text>
            <Text style={styles.text}>y: {accel.y}</Text>
            <Text style={styles.text}>z: {accel.z}</Text>
            <Text style={styles.text}>---------------------------------</Text>
            <Text style={styles.text}>Gyroscope: (in radian/s)</Text>
            <Text style={styles.text}>x: {gyro.x}</Text>
            <Text style={styles.text}>y: {gyro.y}</Text>
            <Text style={styles.text}>z: {gyro.z}</Text>
            <Text style={styles.text}>---------------------------------</Text>
            <Text style={styles.text}>Euler Angles:</Text>
            <Text style={styles.text}>heading: {angles.heading}</Text>
            <Text style={styles.text}>roll: {angles.roll}</Text>
            <Text style={styles.text}>pitch: {angles.pitch}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});