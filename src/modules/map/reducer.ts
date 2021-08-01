import { LatLng } from 'leaflet';
import {
  CHANGE_POSITION,
  CHANGE_REFRESH_LEFT_POSITION,
  MapActionType,
} from './actions';

export interface MapState {
  position: LatLng;
  pillLeftPosition: string;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
  pillLeftPosition: '50%',
};

export default function (
  state: MapState = initialState,
  action: MapActionType,
): MapState {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.position };
    case CHANGE_REFRESH_LEFT_POSITION:
      return { ...state, pillLeftPosition: action.position };
    default:
      return state;
  }
}
