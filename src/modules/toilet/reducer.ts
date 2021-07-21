import { toiletModels } from '@apis/toilet';
import {
  NEED_REQUEST_AGAIN,
  RECEIVE_TOILETS,
  SELECT_TOILET,
  ToiletActionType,
} from './actions';

export interface ToiletState {
  fetchedToilets: toiletModels.Toilet[];
  selectedToilet: toiletModels.Toilet | null;
  needRequestAgain: boolean;
}

const initialState: ToiletState = {
  fetchedToilets: [],
  selectedToilet: null,
  needRequestAgain: false,
};

export default function (
  state: ToiletState = initialState,
  action: ToiletActionType,
): ToiletState {
  switch (action.type) {
    case NEED_REQUEST_AGAIN:
      return {
        ...state,
        needRequestAgain: true,
      };
    case RECEIVE_TOILETS:
      return {
        ...state,
        fetchedToilets: action.toilets,
        needRequestAgain: false,
      };
    case SELECT_TOILET:
      return {
        ...state,
        selectedToilet:
          state.selectedToilet != action.toilet ? action.toilet : null,
      };
    default:
      return state;
  }
}
