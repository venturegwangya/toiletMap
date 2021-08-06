import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import { Toilet } from './models';
import firebase from 'firebase';
import { useCallback } from 'react';
import {
  RequestToiletsInAreaAction,
  SelectToiletAction,
  requestToiletsInArea,
  selectToilet,
} from './actions';
import { mapHooks } from '@modules/map';

export function useToilet(): {
  toilets: Toilet[];
  selectedToilet: Toilet | null;
  requestAgain: boolean;
} {
  const toilets = useAppSelector(state => state.toilet.fetchedToilets);
  const selectedToilet = useAppSelector(state => state.toilet.selectedToilet);
  const requestAgain = useAppSelector(state => state.toilet.needRequestAgain);
  return { toilets, selectedToilet, requestAgain };
}

export function useToiletActions(): {
  fetchToilets: (
    center: firebase.firestore.GeoPoint,
    radius: number,
  ) => RequestToiletsInAreaAction;
  setSelectedToilet: (toilet: Toilet | null) => SelectToiletAction;
} {
  const dispatch = useAppDispatch();
  const fetchToilets = useCallback(
    (center, radius) => dispatch(requestToiletsInArea(center, radius)),
    [dispatch],
  );
  const setSelectedToilet = useCallback(
    toilet => dispatch(selectToilet(toilet)),
    [dispatch],
  );
  return { fetchToilets, setSelectedToilet };
}

export function useFetchNearByToilets(): () => void {
  const { fetchToilets, setSelectedToilet } = useToiletActions();
  const mapCenter = mapHooks.useMapGeoPoint();
  return useCallback(() => {
    fetchToilets(mapCenter, 100);
    setSelectedToilet(null);
  }, [fetchToilets, mapCenter, setSelectedToilet]);
}
