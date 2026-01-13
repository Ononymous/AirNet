import axios from 'axios';
import { NetworkError, APIError, withErrorHandling } from '../utils/errorHandler';
import { API_BASE_URL_ZONES, API_TIMEOUT_MS } from '../constants';

export default async function getPlanes(lat, lng, distance) {
  return withErrorHandling(async () => {
    if (lat === null || lng === null) {
      throw new Error('Location not available');
    }

    const offset = distance;
    const nLat = lat + offset;
    const nLng = lng + offset;
    const sLat = lat - offset;
    const sLng = lng - offset;

    const params = {
      faa: 1,
      bounds: `${nLat.toFixed(3)},${sLat.toFixed(3)},${sLng.toFixed(3)},${nLng.toFixed(3)}`,
      satellite: 1,
      mlat: 1,
      flarm: 1,
      adsb: 1,
      gnd: 1,
      air: 1,
      vehicles: 1,
      estimated: 1,
      maxage: 14400,
      gliders: 1,
      stats: 1,
    };

    try {
      const response = await axios.get(API_BASE_URL_ZONES, {
        headers: { Accept: 'application/json' },
        params,
        timeout: API_TIMEOUT_MS,
      });

      if (!response.data) {
        throw new APIError('Empty response from server', response.status);
      }

      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new NetworkError('Request timeout. Please try again.');
      } else if (!error.response) {
        throw new NetworkError('No internet connection');
      } else if (error.response.status === 429) {
        throw new APIError('Rate limit exceeded', 429);
      } else {
        throw new APIError(
          error.response.data?.message || 'Failed to fetch planes',
          error.response.status
        );
      }
    }
  }, 'getPlanes');
}
