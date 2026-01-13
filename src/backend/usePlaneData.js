import { useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';
import useLocation from './useLocation';
import getPlanes from './getPlanes';
import getSinglePlane from './getSinglePlane';
import OptionContext from './OptionContext';
import { MAX_PLANES_TO_DISPLAY, SORT_OPTIONS, DEFAULT_PLANE_IMAGE } from '../constants';

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
  }, [location]);

  const sortPlanes = (planes, sortType) => {
    if (sortType === SORT_OPTIONS.NONE) return planes;

    return planes.sort((a, b) => {
      switch (sortType) {
        case SORT_OPTIONS.DISTANCE:
          const distA = Math.sqrt((a.latitude - lat) ** 2 + (a.longitude - lng) ** 2);
          const distB = Math.sqrt((b.latitude - lat) ** 2 + (b.longitude - lng) ** 2);
          return distA - distB;
        case SORT_OPTIONS.CALLSIGN:
          return a.flightNumber.localeCompare(b.flightNumber);
        case SORT_OPTIONS.SPEED:
          return b.speed - a.speed;
        case SORT_OPTIONS.AIRPLANE:
          return a.planeType.localeCompare(b.planeType);
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    let isCancelled = false;

    if (location) {
      (async () => {
        const rawData = await getPlanes(lat, lng, distance);
        
        if (isCancelled || !rawData) {
          setRefreshing(false);
          return;
        }

        const planeIds = Object.keys(rawData).filter(
          (key) => key !== 'full_count' && key !== 'version' && key !== 'stats'
        );

        if (planeIds.length > MAX_PLANES_TO_DISPLAY) {
          planeIds.splice(MAX_PLANES_TO_DISPLAY);
          Alert.alert('Info', `Showing the first ${MAX_PLANES_TO_DISPLAY} nearby planes.`);
        }

        const planes = [];
        const BATCH_SIZE = 5;

        for (let i = 0; i < planeIds.length; i += BATCH_SIZE) {
          if (isCancelled) break;

          const batch = planeIds.slice(i, i + BATCH_SIZE);
          const batchPromises = batch.map((id) => {
            const tempPlane = {
              id: id,
              hex: rawData[id][0],
              imgUrl: DEFAULT_PLANE_IMAGE,
              airline: '',
              flightNumber: '',
              origin: '',
              originFull: '',
              destination: '',
              destinationFull: '',
              planeType: '',
              scheduledArrival: 0,
              altitude: rawData[id][4],
              latitude: rawData[id][1],
              longitude: rawData[id][2],
              speed: rawData[id][5],
            };
            return getSinglePlane(id, tempPlane);
          });

          const batchResults = await Promise.all(batchPromises);
          if (!isCancelled) {
            planes.push(...batchResults.filter((plane) => plane && plane.id));
          }
        }

        if (!isCancelled) {
          setPlaneData(sortPlanes(planes, sort));
        }
        setRefreshing(false);
      })();
    } else {
      setPlaneData([]);
    }

    return () => {
      isCancelled = true;
    };
  }, [counter, distance, sort]);

  return planeData;
}
