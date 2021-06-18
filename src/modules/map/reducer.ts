import { LatLng } from 'leaflet';

const CHANGE_POSITION = 'map/CHANGE_POSITION' as const;
// TODO: 박민규 2021-06-16 나중에 필요없는 action
const OFF_FETCH_AGAIN = 'map/OFF_FETCH_AGAIN' as const;

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

export const offFetchAgain = () =>
  <const>{
    type: OFF_FETCH_AGAIN,
    payload: false,
  };

type ACTIONTYPE =
  | ReturnType<typeof changePosition>
  | ReturnType<typeof offFetchAgain>;

// TODO: 박민규 2021-06-16 fetch하고나서 fetchAgain을 무효화한다
export default function (
  state: MapState = initialState,
  action: ACTIONTYPE,
): MapState {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.payload, fetchAgain: true };
    case OFF_FETCH_AGAIN:
      return { ...state, fetchAgain: false };
    default:
      return state;
  }
}
