import { LatLng } from 'leaflet';
import { toiletModels } from '@apis/toilet';
import { CHANGE_POSITION, MapActionType, RECEIVE_TOILETS } from './actions';

export interface MapState {
  position: LatLng;
  toilets: toiletModels.Toilet[];
  needRequestAgain: boolean;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
  toilets: [],
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
      return { ...state, toilets: action.toilets, needRequestAgain: false };
    default:
      return state;
  }
}
