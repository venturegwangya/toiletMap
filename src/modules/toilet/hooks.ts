import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import firebase from 'firebase';
import { useCallback, useMemo } from 'react';
import { mapHooks } from '@modules/map';
import { toiletActions, toiletModels } from '.';

export function useToilet(): {
  toilets: toiletModels.Toilet[];
  selectedToilet: toiletModels.Toilet | null;
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
  ) => toiletActions.RequestToiletsInAreaAction;
  setSelectedToilet: (
    toilet: toiletModels.Toilet | null,
  ) => toiletActions.SelectToiletAction;
} {
  const dispatch = useAppDispatch();
  const fetchToilets = useCallback(
    (center, radius) =>
      dispatch(toiletActions.requestToiletsInArea(center, radius)),
    [dispatch],
  );
  const setSelectedToilet = useCallback(
    toilet => dispatch(toiletActions.selectToilet(toilet)),
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
