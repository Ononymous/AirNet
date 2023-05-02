import { useEffect, useState, useContext } from "react";
import useLocation from "./useLocation";
import getPlanes from "./getPlanes";
import getSinglePlane from "./getSinglePlane";
import OptionContext from "./OptionContext";
import { Alert } from "react-native";

export default function usePlaneData(refreshing, setRefreshing, once, setOnce) {
	const { distance, sort } = useContext(OptionContext);
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

    const sortPlanes = (planes, sortType) => {
        if (sortType === "none") return planes;
    
        return planes.sort((a, b) => {
            switch (sortType) {
                case "distance":
                    const distA = Math.sqrt((a.latitude - lat) ** 2 + (a.longitude - lng) ** 2);
                    const distB = Math.sqrt((b.latitude - lat) ** 2 + (b.longitude - lng) ** 2);
                    return distA - distB;
                case "callsign":
                    return a.flightNumber.localeCompare(b.flightNumber);
                case "speed":
                    return b.speed - a.speed;
                case "airplane":
                    return a.planeType.localeCompare(b.planeType);
                default:
                    return 0;
            }
        });
      };

	useEffect(() => {
		if (location) {
			(async () => {
				const rawData = await getPlanes(lat, lng, distance);
				if (rawData) {
                    const planeIds = Object.keys(rawData).filter(
                        (key) => key !== "full_count" && key !== "version" && key !== "stats"
                    );
                    // only take the first 20 planes if there are more than 20
                    if (planeIds.length > 30) {
                        planeIds.splice(30);
                        Alert.alert("Too many requests!", "Only the first 30 planes are shown.")
                    }
                    const planes = [];
                    for(id of planeIds) {
                        if(once) return;
                        const tempPlane = {
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
                        const updatedPlane = await getSinglePlane(id, tempPlane)
                        if(once) return;
                        planes.push(updatedPlane);
                    }
                    setPlaneData(sortPlanes(planes, sort));
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