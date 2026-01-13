import axios from 'axios';
import { withErrorHandling } from '../utils/errorHandler';
import { API_BASE_URL_DETAILS, API_VERSION, API_TIMEOUT_MS, DEFAULT_PLANE_IMAGE, FALLBACK_PLANE_IMAGE } from '../constants';

export default async function getSinglePlane(id, plane) {
  return withErrorHandling(async () => {
    if (!id) return plane;

    const response = await axios.get(
      `${API_BASE_URL_DETAILS}?version=${API_VERSION}&flight=${id}`,
      { timeout: API_TIMEOUT_MS }
    );

    if (response?.data) {
      const airline = response.data.airline?.name;
      const planeModel = response.data.aircraft?.model?.text;
      const origin = response.data.airport?.origin?.code?.iata;
      const destination = response.data.airport?.destination?.code?.iata;
      const originCountry = response.data.airport?.origin?.position?.country?.codeLong || 
                           response.data.airport?.origin?.position?.country?.code;
      const destinationCountry = response.data.airport?.destination?.position?.country?.codeLong || 
                                 response.data.airport?.destination?.position?.country?.code;
      const originCity = response.data.airport?.origin?.position?.region?.city;
      const destinationCity = response.data.airport?.destination?.position?.region?.city;
      const originFull = origin ? `${originCity} (${originCountry})` : 'Unknown';
      const destinationFull = destination ? `${destinationCity} (${destinationCountry})` : 'Unknown';
      const largeImages = response.data.aircraft?.images?.large;
      const sideViewImage = response.data.aircraft?.images?.sideview;
      const thumbnails = response.data.aircraft?.images?.thumbnails;
      const flightNumber = response.data.identification?.callsign;

      const imageUrl = largeImages && largeImages[0]
        ? largeImages[0].src
        : sideViewImage
        ? sideViewImage
        : thumbnails && thumbnails.length > 0
        ? thumbnails[0].src
        : FALLBACK_PLANE_IMAGE;

      return {
        ...plane,
        imgUrl: imageUrl,
        airline: airline || 'N/A',
        planeType: planeModel || 'N/A',
        originFull: originFull,
        destinationFull: destinationFull,
        flightNumber: flightNumber || 'N/A',
        origin: origin || 'N/A',
        destination: destination || 'N/A',
      };
    }
    return plane;
  }, 'getSinglePlane', false);
}
