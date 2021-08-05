import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import { Toilet } from './models';
import firebase from 'firebase/app';
import { requestToiletsInArea, RequestToiletsInAreaAction } from './actions';
import { useCallback } from 'react';

export function useNeedRequestAgain(): boolean {
  const fetchAgain = useAppSelector(state => state.toilet.needRequestAgain);
  return fetchAgain;
}

export function useToilets(): Toilet[] {
  const toilets = useAppSelector(state => state.toilet.fetchedToilets);
  return toilets;
}

export function useSelectedToilet(): Toilet | null {
  const selectedToilet = useAppSelector(state => state.toilet.selectedToilet);
  return selectedToilet;
}

export function useRequestToiletsInArea(): (
  center: firebase.firestore.GeoPoint,
  radius: number,
) => RequestToiletsInAreaAction {
  const dispatch = useAppDispatch();
  return useCallback(
    (center, radius) => dispatch(requestToiletsInArea(center, radius)),
    [dispatch],
  );
}
