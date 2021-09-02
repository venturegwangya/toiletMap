import React from 'react';
import { windowTypes, windowActions } from '.';

export interface WindowState {
  show: boolean;
  modalContent: React.ReactNode;
  leftMenu: windowTypes.LeftMenu;
}

const initialState: WindowState = {
  show: false,
  modalContent: null,
  leftMenu: null,
};

export default function windowReducer(
  state: WindowState = initialState,
  action: windowActions.WindowActionType,
): WindowState {
  switch (action.type) {
    case windowActions.SHOW_MODAL:
      return { ...state, modalContent: action.modalContent, show: true };
    case windowActions.HIDE_MODAL:
      return { ...state, show: false };
    case windowActions.SELECT_LEFT_MENU:
      return { ...state, leftMenu: action.leftMenu };
    default:
      return state;
  }
}
