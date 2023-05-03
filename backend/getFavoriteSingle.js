import axios from 'axios';

export default async function getFavoriteSingle(id, plane) {
    const fetchFavoriteSingle = async (id) => {
		try {
			const response = await axios.get(
				"https://data-cloud.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=0%2C0%2C0%2C0&selected=" + id
			);
            if(response) {
                const rawData = response.data;
                const planeIds = Object.keys(rawData).filter(
                    (key) => key !== "full_count" && key !== "version" && key !== "stats" && key !== "selected" && key !== "selected-aircraft"
                );

                // console.log(planeIds)
                
                if(planeIds.length === 0){
                    // console.log('No data found')
                    return {
                        ...plane,
                        altitude: "N/A",
                        latitude: "N/A",
                        longitude: "N/A",
                        speed: "N/A",
                    }
                }
                else{
                    // console.log('Data found')
                    return {
                        ...plane,
                        altitude: rawData[id][4],
                        latitude: rawData[id][1],
                        longitude: rawData[id][2],
                        speed: rawData[id][5],
                    }
                }
            }
            // console.log('No response')
            return plane
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

    return fetchFavoriteSingle(id);
}