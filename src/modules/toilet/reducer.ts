import { toiletActions, toiletModels } from '.';

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
  action: toiletActions.ToiletActionType,
): ToiletState {
  switch (action.type) {
    case toiletActions.NEED_REQUEST_AGAIN:
      return {
        ...state,
        needRequestAgain: true,
      };
    case toiletActions.RECEIVE_TOILETS:
      return {
        ...state,
        fetchedToilets: action.toilets,
        needRequestAgain: false,
      };
    case toiletActions.SELECT_TOILET:
      return {
        ...state,
        selectedToilet:
          state.selectedToilet != action.toilet ? action.toilet : null,
      };
    default:
      return state;
  }
}
