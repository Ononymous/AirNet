import axios from 'axios';
import { withErrorHandling } from '../utils/errorHandler';
import { API_BASE_URL_ZONES, API_TIMEOUT_MS } from '../constants';

export default async function getFavoriteSingle(id, plane) {
  return withErrorHandling(async () => {
    const response = await axios.get(
      `${API_BASE_URL_ZONES}?faa=1&bounds=0%2C0%2C0%2C0&selected=${id}`,
      { timeout: API_TIMEOUT_MS }
    );

    if (response?.data) {
      const rawData = response.data;
      const planeIds = Object.keys(rawData).filter(
        (key) => key !== 'full_count' && key !== 'version' && key !== 'stats' && key !== 'selected' && key !== 'selected-aircraft'
      );

      if (planeIds.length === 0) {
        return {
          ...plane,
          altitude: 'N/A',
          latitude: 'N/A',
          longitude: 'N/A',
          speed: 'N/A',
        };
      } else {
        return {
          ...plane,
          altitude: rawData[id][4],
          latitude: rawData[id][1],
          longitude: rawData[id][2],
          speed: rawData[id][5],
        };
      }
    }
    return plane;
  }, 'getFavoriteSingle', false);
}
