# AR Plane Tracking - Mathematical Documentation

## Overview
This document explains the mathematical transformations used to display an aircraft's real-world position as a dot on the phone screen in AR (Augmented Reality) mode.

## Coordinate Systems

### 1. LLA (Latitude, Longitude, Altitude)
- **Source**: ADS-B data from aircraft, GPS data from phone
- **Format**: 
  - Latitude: -90° to +90° (South to North)
  - Longitude: -180° to +180° (West to East)
  - Altitude: meters above sea level
- **Example**: Aircraft at (37.7749°N, -122.4194°W, 10000m)

### 2. ECEF (Earth-Centered, Earth-Fixed)
- **Purpose**: 3D Cartesian coordinate system with origin at Earth's center
- **Axes**:
  - X: Points to (0°N, 0°E) - intersection of equator and prime meridian
  - Y: Points to (0°N, 90°E) - intersection of equator and 90°E meridian
  - Z: Points to North Pole (90°N)
- **Units**: meters from Earth's center (~6,371,000m to surface)
- **Rotation**: Fixed to Earth (rotates with Earth)

### 3. ENU (East, North, Up)
- **Purpose**: Local tangent plane coordinate system relative to observer
- **Origin**: Observer's position (phone location)
- **Axes**:
  - E (East): Positive towards East
  - N (North): Positive towards North
  - U (Up): Positive towards sky (perpendicular to Earth's surface)
- **Units**: meters from observer
- **Use**: Easier to work with for local positioning (plane relative to user)

### 4. Device Orientation (from DeviceMotion)
- **alpha** (α): Rotation around Z-axis (compass/yaw)
  - Range: 0 to 2π radians (0° to 360°)
  - 0/2π = North, π/2 = East, π = South, 3π/2 = West
  - Direction: Clockwise when looking down at device
  
- **beta** (β): Rotation around X-axis (pitch)
  - Range: -π to π radians (-180° to +180°)
  - 0 = device flat/horizontal
  - Positive = top of device tilted away from user (looking up)
  - Negative = top of device tilted towards user (looking down)
  
- **gamma** (γ): Rotation around Y-axis (roll)
  - Range: -π/2 to π/2 radians (-90° to +90°)
  - 0 = device upright (portrait mode)
  - Positive = right side of device tilted down
  - Negative = left side of device tilted down

### 5. Screen Coordinates
- **Origin**: Top-left corner of screen
- **X-axis**: Increases to the right (0 to SCREEN_WIDTH pixels)
- **Y-axis**: Increases downward (0 to SCREEN_HEIGHT pixels)
- **Center**: (SCREEN_WIDTH/2, SCREEN_HEIGHT/2)

## Mathematical Transformations Pipeline

### Step 1: LLA to ECEF Conversion
Convert geographic coordinates to Earth-centered Cartesian coordinates.

**Formula**:
```
Given: latitude (φ), longitude (λ), altitude (h)

N = a / sqrt(1 - e² × sin²(φ))

X = (N + h) × cos(φ) × cos(λ)
Y = (N + h) × cos(φ) × sin(λ)
Z = (N × (1 - e²) + h) × sin(φ)

Where:
  a = 6378137.0 (Earth's equatorial radius in meters)
  e² = 0.00669437999014 (Earth's eccentricity squared)
  N = radius of curvature in prime vertical
```

**Implementation**: Uses `ecef-projector` library
- `llaToEcef([longitude, latitude, altitude])` returns `[x, y, z]`

### Step 2: Create ENU Basis Vectors
Create local coordinate system basis vectors at observer's location.

**Formula**:
```
Given observer at: latitude (φ₀), longitude (λ₀)

East vector:
  eₓ = -sin(λ₀)
  eᵧ = cos(λ₀)
  eᵤ = 0

North vector:
  nₓ = -sin(φ₀) × cos(λ₀)
  nᵧ = -sin(φ₀) × sin(λ₀)
  nᵤ = cos(φ₀)

Up vector:
  uₓ = cos(φ₀) × cos(λ₀)
  uᵧ = cos(φ₀) × sin(λ₀)
  uᵤ = sin(φ₀)
```

**Implementation**: In `useOrientation.js` → `toEnuBasis()`

### Step 3: ECEF to ENU Conversion
Transform plane's ECEF coordinates to ENU relative to observer.

**Formula**:
```
Given:
  - Observer ECEF: [x₀, y₀, z₀]
  - Plane ECEF: [xₚ, yₚ, zₚ]
  - ENU basis: [e⃗, n⃗, u⃗]

Δ = [xₚ - x₀, yₚ - y₀, zₚ - z₀]

ENU = [
  e⃗ · Δ,  // East component
  n⃗ · Δ,  // North component
  u⃗ · Δ   // Up component
]
```

**Implementation**: In `useOrientation.js` → `ecefToEnu()`
- Returns `[east, north, up]` in meters from observer

### Step 4: Calculate Plane's Bearing and Elevation
Compute direction angles to the plane in local coordinates.

**Formula**:
```
Given ENU: [e, n, u]

Azimuth (horizontal bearing):
  azimuth = atan2(e, n)
  Range: -π to π radians (-180° to +180°)
  0 = North, π/2 = East, ±π = South, -π/2 = West

Elevation (vertical angle):
  distance_2D = sqrt(e² + n²)
  elevation = atan2(u, distance_2D)
  Range: -π/2 to π/2 radians (-90° to +90°)
  0 = horizontal, π/2 = directly above, -π/2 = directly below
```

**Implementation**: In `Tracker.js` effect hook
```javascript
const planeAzimuth = Math.atan2(enu[0], enu[1]);
const planeDistance2D = Math.sqrt(enu[0] ** 2 + enu[1] ** 2);
const planeElevation = Math.atan2(enu[2], planeDistance2D);
```

### Step 5: Calculate Relative Angles
Adjust plane's direction relative to device orientation.

**Formula**:
```
Given:
  - planeAzimuth: where plane is in world
  - deviceAlpha: where device points in world
  - planeElevation: how high plane is
  - deviceBeta: how much device is tilted

Relative Bearing (horizontal):
  relativeBearing = planeAzimuth - deviceAlpha
  
  Normalize to [-π, π]:
    while relativeBearing > π:  relativeBearing -= 2π
    while relativeBearing < -π: relativeBearing += 2π

Relative Elevation (vertical):
  relativeElevation = planeElevation - deviceBeta
```

**Interpretation**:
- `relativeBearing = 0`: Plane is straight ahead
- `relativeBearing > 0`: Plane is to the right
- `relativeBearing < 0`: Plane is to the left
- `relativeElevation = 0`: Plane is at horizon level (relative to device tilt)
- `relativeElevation > 0`: Plane is above current view
- `relativeElevation < 0`: Plane is below current view

### Step 6: Apply Camera Field of View
Convert angles to normalized screen coordinates.

**Formula**:
```
Given:
  - hFov: horizontal field of view (radians)
  - vFov: vertical field of view (radians)
  - relativeBearing: horizontal angle (radians)
  - relativeElevation: vertical angle (radians)

Normalized coordinates (range: -0.5 to 0.5):
  normalizedX = relativeBearing / hFov
  normalizedY = -relativeElevation / vFov  // Negative because screen Y increases downward
```

**Typical FOV Values**:
- Horizontal: 60° (π/3 radians) - wider view
- Vertical: 45° (π/4 radians) - narrower due to portrait mode

**Implementation**:
```javascript
const hFov = (60 * Math.PI) / 180;
const vFov = (45 * Math.PI) / 180;
const normalizedX = relativeBearing / hFov;
const normalizedY = -relativeElevation / vFov;
```

### Step 7: Apply Roll Compensation
Rotate screen coordinates to account for device roll (tilt left/right).

**Formula**:
```
Given:
  - normalizedX, normalizedY: screen coordinates before roll
  - deviceGamma: roll angle (radians)

2D rotation matrix:
  rotatedX = normalizedX × cos(-γ) - normalizedY × sin(-γ)
  rotatedY = normalizedX × sin(-γ) + normalizedY × cos(-γ)

Note: Negative gamma because we're rotating the coordinate system,
      not the device
```

**Why This Matters**:
- When device is tilted (rolled), the screen's coordinate system rotates
- Without this, the dot would appear in wrong position when phone is not upright
- Example: Phone tilted 45° right → dot should rotate 45° around screen center

### Step 8: Convert to Screen Pixels
Transform normalized coordinates to actual pixel positions.

**Formula**:
```
Given:
  - rotatedX, rotatedY: normalized coordinates after roll (-0.5 to 0.5)
  - SCREEN_WIDTH, SCREEN_HEIGHT: screen dimensions in pixels

Pixel coordinates:
  x = SCREEN_WIDTH × (0.5 + rotatedX)
  y = SCREEN_HEIGHT × (0.5 + rotatedY)

Explanation:
  - Add 0.5 to shift from [-0.5, 0.5] to [0, 1]
  - Multiply by screen dimension to get pixels
  - (0,0) normalized → top-left corner
  - (0,0) rotated → center of screen
```

**Example**:
- Screen: 375×667 pixels (iPhone)
- Plane straight ahead (normalized: 0, 0)
- Result: x = 187.5, y = 333.5 (center of screen)

## Complete Mathematical Flow Example

**Scenario**: Track a plane 10km away to the northeast and 5km above user

### Input Data
- **User Location**: (37.7749°N, -122.4194°W, 100m altitude)
- **Plane Location**: (37.8449°N, -122.3494°W, 5100m altitude)
- **Phone Points**: Northeast (45°), tilted up 10°, held upright
- **Device Orientation**: 
  - alpha = π/4 (45°, pointing NE)
  - beta = π/18 (10°, tilted up)
  - gamma = 0 (0°, held upright)

### Step-by-Step Calculation

1. **Convert to ECEF**:
   - User ECEF: [x₀, y₀, z₀] ≈ [-2,707,000, -4,260,000, 3,885,000] meters
   - Plane ECEF: [xₚ, yₚ, zₚ] ≈ [-2,702,000, -4,253,000, 3,890,000] meters

2. **Calculate ENU**:
   - Δ = [5000, 7000, 5000] meters (approximate)
   - After basis transformation: [7071, 7071, 5000] meters (E, N, U)

3. **Calculate Angles**:
   - planeAzimuth = atan2(7071, 7071) = π/4 (45°, northeast)
   - distance2D = sqrt(7071² + 7071²) = 10000m
   - planeElevation = atan2(5000, 10000) ≈ 0.464 rad (26.6°)

4. **Relative Angles**:
   - relativeBearing = π/4 - π/4 = 0 (plane straight ahead!)
   - relativeElevation = 0.464 - π/18 = 0.29 rad (16.6° above view)

5. **Normalize to Screen**:
   - hFov = 60° = 1.047 rad
   - vFov = 45° = 0.785 rad
   - normalizedX = 0 / 1.047 = 0 (center horizontally)
   - normalizedY = -0.29 / 0.785 = -0.37 (above center)

6. **Apply Roll** (gamma = 0, no effect):
   - rotatedX = 0
   - rotatedY = -0.37

7. **Convert to Pixels** (375×667 screen):
   - x = 375 × (0.5 + 0) = 187.5 (horizontal center)
   - y = 667 × (0.5 - 0.37) = 86.7 (above center)

**Result**: Red dot appears at (188, 87) pixels - horizontally centered, upper portion of screen. ✓

## Current Implementation Issues

### Potential Problems

1. **iOS DeviceMotion Coordinate System**:
   - iOS may use different axis definitions than standard
   - Alpha/beta/gamma meanings can vary by device orientation (portrait vs landscape)
   - May need to swap or invert axes depending on device mode

2. **Camera Orientation**:
   - Camera sensor might not align with device orientation axes
   - Front vs back camera have different coordinate systems
   - Portrait vs landscape mode affects axis mapping

3. **FOV Accuracy**:
   - Real camera FOV varies by device (iPhone vs Android)
   - Wide-angle cameras have different FOV than standard
   - FOV changes slightly with focus distance

4. **Coordinate System Handedness**:
   - ENU uses right-handed system
   - Screen uses left-handed system (Y increases downward)
   - DeviceMotion rotation directions need verification

5. **Gimbal Lock**:
   - Euler angles (alpha/beta/gamma) suffer from gimbal lock at ±90° pitch
   - Alternative: Use quaternions from DeviceMotion

6. **Magnetic Interference**:
   - Alpha (compass) can be affected by magnetic fields
   - May need to use GPS heading instead when moving

### Testing Checklist

To verify the implementation:

- [ ] Phone flat (horizontal): Plane overhead should appear at screen center
- [ ] Phone pointing north: Plane to north should appear at center
- [ ] Phone pointing south: Plane to north should appear behind (off-screen)
- [ ] Phone tilted up 45°: Plane at horizon should appear at bottom of screen
- [ ] Phone tilted down 45°: Plane at horizon should appear at top of screen
- [ ] Phone rolled 90° left: Dot should rotate 90° around screen center
- [ ] Plane directly above: Should appear at center regardless of phone direction (when looking up)
- [ ] Plane at same altitude: Should appear at center height when phone is horizontal

## Alternative Approaches

### 1. Quaternion-Based Rotation
Instead of Euler angles, use quaternions to avoid gimbal lock:
```javascript
const { x, y, z, w } = rotation.quaternion;
// Convert quaternion to rotation matrix
// Apply to ENU vector
```

### 2. Use Phone Heading from Location
If compass (alpha) is unreliable:
```javascript
const heading = await Location.getHeadingAsync();
const deviceAlpha = (heading * Math.PI) / 180;
```

### 3. Calibration Mode
Allow user to point at known object to calibrate:
- Point phone at plane when plane is at specific angle
- Calculate offset between expected and actual position
- Apply correction factor to all subsequent calculations

### 4. ARKit/ARCore Integration
Use native AR frameworks:
- Provides more accurate pose estimation
- Handles coordinate transformations internally
- Better handles camera intrinsics and distortion

## References

- [ECEF Coordinate System](https://en.wikipedia.org/wiki/Earth-centered,_Earth-fixed_coordinate_system)
- [Local Tangent Plane Coordinates](https://en.wikipedia.org/wiki/Local_tangent_plane_coordinates)
- [DeviceMotion API](https://developer.apple.com/documentation/coremotion/cmdevicemotion)
- [Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
- [Geodetic Datum Transformations](https://en.wikipedia.org/wiki/Geodetic_datum)

## Code Files Reference

- `/src/backend/useOrientation.js`: ECEF/ENU transformations, getScore function
- `/src/backend/useLocation.js`: GPS location tracking
- `/src/backend/getSinglePlane.js`: Fetch plane data from API
- `/src/tabs/Tracker.js`: Main AR tracking implementation (lines 70-130)
- `/src/components/Circle.js`: Red dot indicator component

## Formula Summary Sheet

```
LLA → ECEF:
  N = a / sqrt(1 - e² × sin²(φ))
  X = (N + h) × cos(φ) × cos(λ)
  Y = (N + h) × cos(φ) × sin(λ)
  Z = (N × (1 - e²) + h) × sin(φ)

ECEF → ENU:
  ENU = Basis × (Plane_ECEF - Observer_ECEF)

ENU → Angles:
  azimuth = atan2(E, N)
  elevation = atan2(U, sqrt(E² + N²))

World → Relative:
  relativeBearing = planeAzimuth - deviceAlpha
  relativeElevation = planeElevation - deviceBeta

Angles → Normalized:
  normX = relativeBearing / hFov
  normY = -relativeElevation / vFov

Roll Compensation:
  rotX = normX × cos(-γ) - normY × sin(-γ)
  rotY = normX × sin(-γ) + normY × cos(-γ)

Normalized → Pixels:
  x = SCREEN_WIDTH × (0.5 + rotX)
  y = SCREEN_HEIGHT × (0.5 + rotY)
```

---

*Document created: January 12, 2026*
*For: AirNet AR Plane Tracking Feature*
