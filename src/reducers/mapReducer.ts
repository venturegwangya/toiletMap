import { LatLng } from 'leaflet';

const CHANGE_POSITION = 'map/CHANGE_POSITION' as const;

export interface MapState {
  position: LatLng;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
};

export const changePosition = (position: LatLng) =>
  <const>{
    type: CHANGE_POSITION,
    payload: position,
  };

type ACTIONTYPE = ReturnType<typeof changePosition>;

export default function mapReducer(
  state: MapState = initialState,
  action: ACTIONTYPE,
): MapState {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.payload };
    default:
      return state;
  }
}
