import { LatLng } from 'leaflet';

export interface MapState {
  position: LatLng;
}

interface MapAction {
  type: string;
  position: LatLng;
}

const initialState: MapState = {
  position: new LatLng(37.65095, 126.843522),
};

export const CHANGE_MAP_POSITION = 'CHANGE_MAP_POSITION';

function mapReducer(
  state: MapState = initialState,
  action: MapAction,
): MapState {
  switch (action.type) {
    case CHANGE_MAP_POSITION:
      return {
        position: action.position,
      };
  }
  return state;
}

export { mapReducer };
