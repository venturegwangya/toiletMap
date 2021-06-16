import { LatLng } from 'leaflet';

const CHANGE_POSITION = 'map/CHANGE_POSITION' as const;

export interface MapState {
  position: LatLng;
  fetchAgain: boolean;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
  fetchAgain: false,
};

export const changePosition = (position: LatLng) =>
  <const>{
    type: CHANGE_POSITION,
    payload: position,
  };

type ACTIONTYPE = ReturnType<typeof changePosition>;

// TODO: 박민규 2021-06-16 fetch하고나서 fetchAgain을 무효화한다
export default function mapReducer(
  state: MapState = initialState,
  action: ACTIONTYPE,
): MapState {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.payload, fetchAgain: true };
    default:
      return state;
  }
}
