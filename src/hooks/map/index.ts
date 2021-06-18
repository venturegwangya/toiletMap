import { LatLng } from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/configureStore';

function useMapPosition(): LatLng {
  const position = useSelector((state: RootState) => state.mapReducer.position);
  return position;
}

function useFetchAgain(): boolean {
  const fetchAgain = useSelector(
    (state: RootState) => state.mapReducer.fetchAgain,
  );
  return fetchAgain;
}

export { useMapPosition, useFetchAgain };
