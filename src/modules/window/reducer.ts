import React from 'react';
import { HIDE_MODAL, WindowActionType, SHOW_MODAL } from './actions';

export interface WindowState {
  show: boolean;
  modalContent: React.ReactNode;
  pillLeftPosition: string;
}

const initialState: WindowState = {
  show: false,
  modalContent: null,
  pillLeftPosition: '50%',
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
    default:
      return state;
  }
}
