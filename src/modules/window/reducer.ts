import React from 'react';
import { LeftMenu } from './types';
import {
  HIDE_MODAL,
  WindowActionType,
  SHOW_MODAL,
  SELECT_LEFT_MENU,
} from './actions';

export interface WindowState {
  show: boolean;
  modalContent: React.ReactNode;
  leftMenu: LeftMenu;
}

const initialState: WindowState = {
  show: false,
  modalContent: null,
  leftMenu: null,
};

export default function windowReducer(
  state: WindowState = initialState,
  action: WindowActionType,
): WindowState {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, modalContent: action.modalContent, show: true };
    case HIDE_MODAL:
      return { ...state, show: false };
    case SELECT_LEFT_MENU:
      return { ...state, leftMenu: action.leftMenu };
    default:
      return state;
  }
}
