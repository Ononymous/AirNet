import axios from 'axios';

export default async function getPlanes(lat, lng) {
    if(lat === null || lng === null) return null;

    const offset = 3;

    const nLat = lat + offset
    const nLng = lng + offset
  
    const sLat = lat - offset
    const sLng = lng - offset

    const baseURL = 'https://data-cloud.flightradar24.com/zones/fcgi/feed.js';
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
  
    const fetchApiCall = async () => {
		try {
			const response = await axios.get(baseURL, {
				headers: {
					Accept: "application/json",
				},
				params,
			});
			return response.data;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
      
    return fetchApiCall();
}