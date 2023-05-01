import { useEffect, useState } from "react";
import useLocation from "./useLocation";
import getPlanes from "./getPlanes";
import getSinglePlane from "./getSinglePlane";

export default function usePlaneData(refreshing, setRefreshing, once, setOnce) {
	const location = useLocation();
    const [counter, setCounter] = useState(true);
	const [planeData, setPlaneData] = useState([]);

	const lat = location?.lat;
	const lng = location?.lng;

    useEffect(() => {
        if (once) {
            setOnce(false);
            setCounter(!counter);
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
                    for(id of planeIds) {
                        if(once) return;
                        tempPlane = {
                            id: id,
                            hex: rawData[id][0],
                            imgUrl: "https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png",
                            airline: "",
                            flightNumber: "",
                            origin: "",
                            originFull: "",
                            destination: "",
                            destinationFull: "",
                            planeType: "",
                            scheduledArrival: 0,
                            altitude: rawData[id][4],
                            latitude: rawData[id][1],
                            longitude: rawData[id][2],
                            speed: rawData[id][5],
                        }
                        if(once) return;
                        tempPlane = await getSinglePlane(id, tempPlane)
                        if(once) return;
                        setPlaneData((prev) => [...prev, tempPlane])
                    }
				}
                setRefreshing(false);
			})();
		}
        else{
            setPlaneData([])
        }
	}, [counter]);

	return planeData;
}