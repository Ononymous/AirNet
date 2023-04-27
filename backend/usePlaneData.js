import { useEffect, useState } from "react";
import useLocation from "./useLocation";
import getPlanes from "./getPlanes";
import getSinglePlane from "./getSinglePlane";

export default function usePlaneData(refreshing, setRefreshing) {
	const location = useLocation();
    const [counter, setCounter] = useState(true);
	const [planeData, setPlaneData] = useState([]);

	const lat = location?.lat;
	const lng = location?.lng;

    useEffect(() => {
        if (refreshing) {
            setCounter(!counter);
            setRefreshing(false);
        }
    }, [location])

	useEffect(() => {
		if (location) {
			(async () => {
				const rawData = await getPlanes(lat, lng);
				if (rawData) {
                    const planeIds = Object.keys(rawData).filter(
                        (key) => key !== "full_count" && key !== "version" && key !== "stats"
                    );
                    setPlaneData([])
                    console.log(planeIds)
                    for(id of planeIds) {
                        tempPlane = {
                            id: id,
                            hex: rawData[id][0],
                            imgUrl: "",
                            airline: "",
                            flightNumber: "",
                            origin: rawData[id][11],
                            originFull: "",
                            destination: rawData[id][12],
                            destinationFull: "",
                            planeType: "",
                            scheduledArrival: 0,
                            altitude: rawData[id][4],
                            latitude: rawData[id][1],
                            longitude: rawData[id][2],
                            speed: rawData[id][5],
                        }
                        tempPlane = await getSinglePlane(id, tempPlane)
                        setPlaneData((prev) => [...prev, tempPlane])
                    }
				}
			})();
		}
        else{
            setPlaneData([])
        }
	}, [counter]);

	return planeData;
}