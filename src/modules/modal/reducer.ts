import React from 'react';
import { HIDE_MODAL, ModalActionType, SHOW_MODAL } from './actions';

export interface ModalState {
  show: boolean;
  modalContent: React.ReactNode;
}

const initialState: ModalState = {
  show: false,
  modalContent: null,
};

export default function modalReducer(
  state: ModalState = initialState,
  action: ModalActionType,
): ModalState {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, modalContent: action.modalContent, show: true };
    case HIDE_MODAL:
      return { ...state, show: false };
    default:
      return state;
  }
}
