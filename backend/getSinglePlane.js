import axios from 'axios';

export default async function getSinglePlane(id, plane) {
    const fetchSinglePlane = async (id) => {
		try {
			const response = await axios.get(
				"https://data-live.flightradar24.com/clickhandler/?version=1.5&flight=" + id
			);
            if(response) {
                const airline = response?.data?.airline?.name
                const planeModel = response?.data?.aircraft?.model?.text
                const originFull = response?.data?.airport?.origin?.name
                const origin = response?.data?.airport?.origin?.code?.iata
                const destination = response?.data?.airport?.destination?.code?.iata
                const destinationFull = response?.data?.airport?.destination?.name
                const largeImages = response?.data?.aircraft?.images?.large
                const sideViewImage = response?.data?.aircraft?.images?.sideview
                const thumbnails = response?.data?.aircraft?.images?.thumbnails
                const flightNumber = response?.data?.identification?.callsign

                const imageUrl = largeImages
                ? largeImages[0].src
                : sideViewImage
                ? sideViewImage
                : thumbnails && thumbnails.length > 0
                ? thumbnails[0].src
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
                
                return {
                    ...plane,
                    imgUrl: imageUrl,
                    airline: airline? airline : 'NA',
                    planeType: planeModel? planeModel : 'NA',
                    originFull: originFull,
                    destinationFull: destinationFull,
                    flightNumber: flightNumber,
                    origin: origin? origin : 'NA',
                    destination: destination? destination : 'NA',
                }
            }
            return null
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

    return fetchSinglePlane(id);
}