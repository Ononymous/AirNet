import React, { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import * as projector from 'ecef-projector';
import * as math from 'mathjs';

export default function useOrientation() {
    const [rotation, setRotation] = useState({ alpha: 0, beta: 0, gamma: 0 });
    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
		setSubscription(
			DeviceMotion.addListener(result => {
				setRotation(result.rotation);
			})
		)
		DeviceMotion.setUpdateInterval(16);
	};
	const _unsubscribe = () => {
		if (subscription) {
			subscription.remove();
			setSubscription(null);
		}
	};

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

    return rotation;
}

export const llaToEcef = (latitude, longitude, altitude) => {
    const ecef = projector.project(latitude, longitude, altitude);
    return ecef;
}

export const vectorUserToPlane = (userEcef, planeEcef) => {
    const vectorUserToPlane = [
        planeEcef[0] - userEcef[0],
        planeEcef[1] - userEcef[1],
        planeEcef[2] - userEcef[2]
    ];
    return vectorUserToPlane;
}

export const vecDistance = (vector) => {
    const distance = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2);
    return distance;
}

export const toEnuBasis = (lat, lng) => {
    const cosLat = Math.cos(degToRad(lat));
    const sinLat = Math.sin(degToRad(lat));
    const cosLon = Math.cos(degToRad(lng));
    const sinLon = Math.sin(degToRad(lng));
  
    const east = [-sinLon, cosLon, 0];
    const north = [-cosLon * sinLat, -sinLon * sinLat, cosLat];
    const up = [cosLon * cosLat, sinLon * cosLat, sinLat];
  
    return { east, north, up };
}

export const ecefToEnu = (vectorUserToPlane, enuBasis) => {
    const enu = [
      math.dot(enuBasis.east, vectorUserToPlane),
      math.dot(enuBasis.north, vectorUserToPlane),
      math.dot(enuBasis.up, vectorUserToPlane)
    ];
  
    return enu;
}

const calMatrix = (alpha, beta, gamma) => {
    const orientationMatrix = eulerToMatrix(alpha, beta, gamma);
    return orientationMatrix.toArray();
}

const eulerToMatrix = (alpha, beta, gamma) => {
    const Rx = math.matrix([
        [1, 0, 0],
        [0, math.cos(alpha), -math.sin(alpha)],
        [0, math.sin(alpha), math.cos(alpha)],
    ]);

    const Ry = math.matrix([
        [math.cos(beta), 0, math.sin(beta)],
        [0, 1, 0],
        [-math.sin(beta), 0, math.cos(beta)],
    ]);

    const Rz = math.matrix([
        [math.cos(gamma), -math.sin(gamma), 0],
        [math.sin(gamma), math.cos(gamma), 0],
        [0, 0, 1],
    ]);

  return math.multiply(Rz, math.multiply(Ry, Rx));
};

const degToRad = (deg) => {
    return deg * (Math.PI / 180);
}

export const feetToMeters = (feet) => {
    return feet * 0.3048;
}

export const getScore = (rotation, enu) => {
    if (!rotation || !enu) return null;
  
    const alpha = rotation.gamma;
    const beta = rotation.beta;
    const gamma = rotation.alpha;
    const orientationMatrixUser = calMatrix(alpha, beta, gamma);
  
    const userForwardVectorENU = [
        orientationMatrixUser[2][0],
        orientationMatrixUser[2][1],
        orientationMatrixUser[2][2],
    ];
  
    // Normalize userForwardVectorENU
    const userForwardVectorENUNorm = math.divide(
        userForwardVectorENU,
        math.norm(userForwardVectorENU)
    );
  
    // Normalize vectorUserToPlaneEnu
    const vectorUserToPlaneEnuNorm = math.divide(
        enu,
        math.norm(enu)
    );
  
    const dotProduct = math.dot(userForwardVectorENUNorm, vectorUserToPlaneEnuNorm);
    return dotProduct;
};