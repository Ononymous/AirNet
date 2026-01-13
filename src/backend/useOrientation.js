import { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import * as projector from 'ecef-projector';
import * as math from 'mathjs';

export default function useOrientation() {
  const [rotation, setRotation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener((result) => {
        // Use rotation values directly - no gimbal lock protection
        // This was causing freezing issues
        setRotation(result.rotation);
      })
    );
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
};

export const vectorUserToPlane = (userEcef, planeEcef) => {
  const vectorUserToPlane = [
    planeEcef[0] - userEcef[0],
    planeEcef[1] - userEcef[1],
    planeEcef[2] - userEcef[2],
  ];
  return vectorUserToPlane;
};

export const vecDistance = (vector) => {
  const distance = Math.sqrt(vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2);
  return distance;
};

const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

export const toEnuBasis = (lat, lng) => {
  const cosLat = Math.cos(degToRad(lat));
  const sinLat = Math.sin(degToRad(lat));
  const cosLon = Math.cos(degToRad(lng));
  const sinLon = Math.sin(degToRad(lng));

  const east = [-sinLon, cosLon, 0];
  const north = [-cosLon * sinLat, -sinLon * sinLat, cosLat];
  const up = [cosLon * cosLat, sinLon * cosLat, sinLat];

  return { east, north, up };
};

export const ecefToEnu = (vectorUserToPlane, enuBasis) => {
  const enu = [
    math.dot(enuBasis.east, vectorUserToPlane),
    math.dot(enuBasis.north, vectorUserToPlane),
    math.dot(enuBasis.up, vectorUserToPlane),
  ];

  return enu;
};

export const feetToMeters = (feet) => {
  return feet * 0.3048;
};

// W3C Standard Rotation Matrix (Intrinsic Z-X'-Y'' Tait-Bryan angles)
// This is the CORRECT way to convert device orientation to rotation matrix
export const eulerToRotationMatrix = (alpha, beta, gamma) => {
  const ca = Math.cos(alpha);
  const sa = Math.sin(alpha);
  const cb = Math.cos(beta);
  const sb = Math.sin(beta);
  const cg = Math.cos(gamma);
  const sg = Math.sin(gamma);

  // W3C DeviceOrientation spec: Z-X'-Y'' intrinsic rotations
  // R = Rz(alpha) * Rx(beta) * Ry(gamma)
  return [
    [ca * cg - sa * sb * sg, -ca * sg - sa * sb * cg, -sa * cb],
    [cb * sg, cb * cg, -sb],
    [sa * cg + ca * sb * sg, -sa * sg + ca * sb * cg, ca * cb],
  ];
};

// Gimbal Lock Protection
// When beta (pitch) approaches ±90°, alpha and gamma become degenerate
// This function detects gimbal lock and falls back to previous orientation
export const getSafeDeviceOrientation = (alpha, beta, gamma, previousFrame) => {
  const GIMBAL_LOCK_THRESHOLD = 1.1; // ~63 degrees in radians
  
  // Check if we're near gimbal lock (phone tilted very steeply)
  if (Math.abs(beta) > GIMBAL_LOCK_THRESHOLD) {
    // Use previous frame's orientation to avoid jumps
    return previousFrame || { alpha, beta, gamma };
  }
  
  return { alpha, beta, gamma };
};

// Calculate screen position using simplified approach that matches iOS behavior
export const getScreenPositionFixed = (enu, heading, beta, gamma, screenWidth, screenHeight) => {
  // Normalize ENU vector
  const enuNorm = Math.sqrt(enu[0] ** 2 + enu[1] ** 2 + enu[2] ** 2);
  if (enuNorm === 0) return null;
  
  const enuNormalized = [
    enu[0] / enuNorm,
    enu[1] / enuNorm,
    enu[2] / enuNorm,
  ];
  
  // Calculate azimuth (horizontal bearing) and elevation from ENU
  const planeAzimuth = Math.atan2(enuNormalized[0], enuNormalized[1]); // East, North
  const planeDistance2D = Math.sqrt(enuNormalized[0] ** 2 + enuNormalized[1] ** 2);
  const planeElevation = Math.atan2(enuNormalized[2], planeDistance2D);
  
  // GPS heading tells us where the phone's TOP edge points
  // We need to calculate where the camera (on the BACK) points
  // When phone is upright in portrait: camera points in same direction as TOP
  // When phone is tilted forward (positive beta): camera points downward relative to horizon
  // We need to project the camera's actual pointing direction onto the horizontal plane
  
  // Calculate the camera's horizontal pointing direction
  // Beta is pitch: positive = tilted forward (camera pointing down)
  // When beta = 0 (phone vertical), camera points same direction as GPS heading
  // When beta > 0 (tilted forward), horizontal component is reduced by cos(beta)
  const cameraBearing = heading * (Math.PI / 180);
  
  // Calculate relative bearing on horizontal plane
  let relativeBearing = planeAzimuth - cameraBearing;
  
  // Normalize to -π to π
  while (relativeBearing > Math.PI) relativeBearing -= 2 * Math.PI;
  while (relativeBearing < -Math.PI) relativeBearing += 2 * Math.PI;
  
  // Calculate relative elevation (plane elevation minus phone pitch)
  const relativeElevation = planeElevation - beta;
  
  // Check if plane is behind phone (more than 90° to either side or too far up/down)
  if (Math.abs(relativeBearing) > Math.PI / 1.5 || Math.abs(relativeElevation) > Math.PI / 1.5) {
    return null; // Plane is behind or too far out of view
  }
  
  // Camera field of view
  const hFov = (70 * Math.PI) / 180; // 70 degrees horizontal (wider for safety)
  const vFov = (50 * Math.PI) / 180; // 50 degrees vertical
  
  // Map angles to normalized screen coordinates
  let normalizedX = relativeBearing / (hFov / 2);
  let normalizedY = -relativeElevation / (vFov / 2); // Negative because screen Y increases downward
  
  // Apply roll (gamma) rotation to screen coordinates
  const cosGamma = Math.cos(gamma);
  const sinGamma = Math.sin(gamma);
  const rotatedX = normalizedX * cosGamma - normalizedY * sinGamma;
  const rotatedY = normalizedX * sinGamma + normalizedY * cosGamma;
  
  // Convert to pixel coordinates
  const x = screenWidth * (0.5 + rotatedX / 2);
  const y = screenHeight * (0.5 + rotatedY / 2);
  
  return { x, y };
};

// Legacy getScore function (kept for compatibility)
export const getScore = (rotation, enu) => {
  if (!rotation || !enu) return null;

  // Use proper rotation values (no swapping)
  const alpha = rotation.alpha;
  const beta = rotation.beta;
  const gamma = rotation.gamma;
  
  // Get W3C standard rotation matrix
  const R = eulerToRotationMatrix(alpha, beta, gamma);
  
  // Camera forward vector in device frame is -Y axis
  const cameraForward = [-R[1][0], -R[1][1], -R[1][2]];
  
  // Normalize ENU vector
  const enuNorm = Math.sqrt(enu[0] ** 2 + enu[1] ** 2 + enu[2] ** 2);
  if (enuNorm === 0) return 0;
  
  const enuNormalized = [enu[0] / enuNorm, enu[1] / enuNorm, enu[2] / enuNorm];
  
  // Dot product gives alignment score
  const dotProduct = 
    cameraForward[0] * enuNormalized[0] +
    cameraForward[1] * enuNormalized[1] +
    cameraForward[2] * enuNormalized[2];
  
  return dotProduct;
};
