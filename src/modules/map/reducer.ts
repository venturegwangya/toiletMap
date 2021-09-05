import { LatLng } from 'leaflet';
import { mapActions } from '.';

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
  action: mapActions.MapActionType,
): MapState {
  switch (action.type) {
    case mapActions.CHANGE_POSITION:
      return { ...state, position: action.position };
    case mapActions.CHANGE_ZOOM:
      return { ...state, zoom: action.zoom };
    default:
      return state;
  }
}
