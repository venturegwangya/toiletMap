import { LatLng } from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../configureStore';

function useMapPosition(): LatLng {
  const position = useSelector((state: RootState) => state.map.position);
  return position;
}

function useFetchAgain(): boolean {
  const fetchAgain = useSelector((state: RootState) => state.map.fetchAgain);
  return fetchAgain;
}

export { useMapPosition, useFetchAgain };
