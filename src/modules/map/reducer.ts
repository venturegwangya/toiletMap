import { LatLng } from 'leaflet';
import { toiletModels } from '@apis/toilet';
import {
  CHANGE_POSITION,
  MapActionType,
  RECEIVE_TOILETS,
  SELECT_TOILET,
} from './actions';

export interface MapState {
  position: LatLng;
  fetchedToilets: toiletModels.Toilet[];
  selectedToilet: toiletModels.Toilet | null;
  needRequestAgain: boolean;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
  fetchedToilets: [],
  selectedToilet: null,
  needRequestAgain: false,
};

export default function (
  state: MapState = initialState,
  action: MapActionType,
): MapState {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.position, needRequestAgain: true };
    case RECEIVE_TOILETS:
      return {
        ...state,
        fetchedToilets: action.toilets,
        needRequestAgain: false,
      };
    case SELECT_TOILET:
      return {
        ...state,
        selectedToilet: action.toilet,
      };
    default:
      return state;
  }
}
