import { Platform } from 'react-native';

// API Configuration
export const API_BASE_URL_ZONES = 'https://data-cloud.flightradar24.com/zones/fcgi/feed.js';
export const API_BASE_URL_DETAILS = 'https://data-live.flightradar24.com/clickhandler/';
export const API_VERSION = '1.5';
export const API_TIMEOUT_MS = 10000;

// App Configuration
export const MAX_PLANES_TO_DISPLAY = 30;
export const LOCATION_UPDATE_INTERVAL_MS = 10000;
export const DEFAULT_SEARCH_RADIUS_DEGREES = 0.3;
export const MIN_SEARCH_RADIUS_DEGREES = 0.1;
export const MAX_SEARCH_RADIUS_DEGREES = 2.0;

// Distance Conversions
export const DEGREES_TO_MILES = 62;
export const FEET_TO_METERS = 0.3048;
export const METERS_TO_FEET = 3.28084;

// Sort Options
export const SORT_OPTIONS = {
  NONE: 'none',
  DISTANCE: 'distance',
  CALLSIGN: 'callsign',
  SPEED: 'speed',
  AIRPLANE: 'airplane',
};

// Default Images
export const DEFAULT_PLANE_IMAGE = 'https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png';
export const FALLBACK_PLANE_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';

// Platform-specific
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const TITLE_HEIGHT = IS_ANDROID ? 60 : 100;

// Colors
export const COLORS = {
  PRIMARY: '#2F80ED',
  SECONDARY: '#71c5ee',
  ACTIVE: '#2F80ED',
  INACTIVE: '#E0E0E0',
  BACKGROUND: '#FFFFFF',
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#666666',
  ERROR: '#E74C3C',
  SUCCESS: '#27AE60',
  DARK_BG: '#373F47',
};
