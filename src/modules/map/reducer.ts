import { LatLng } from 'leaflet';
import { CHANGE_POSITION, MapActionType, CHANGE_ZOOM } from './actions';

export interface MapState {
  position: LatLng;
  zoom: number;
  pillLeftPosition: string;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
  zoom: 8,
  pillLeftPosition: '50%',
};

export default function (
  state: MapState = initialState,
  action: MapActionType,
): MapState {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.position };
    case CHANGE_ZOOM:
      return { ...state, zoom: action.zoom };
    default:
      return state;
  }
}
