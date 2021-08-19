import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import { Toilet } from './models';
import firebase from 'firebase';
import { useCallback, useMemo } from 'react';
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

// zoom = 8 일 때, 범위 100
export function useFetchNearByToilets(): () => void {
  const { fetchToilets, setSelectedToilet } = useToiletActions();
  const { center, zoom } = mapHooks.useMap();
  const area = useMemo(() => 6400 / (zoom * zoom), [zoom]);

  return useCallback(() => {
    fetchToilets(center, area);
    setSelectedToilet(null);
  }, [center, area, fetchToilets, setSelectedToilet]);
}
