import React from 'react';

const SHOW_MODAL = 'modal/SHOW_MODAL' as const;
const HIDE_MODAL = 'modal/HIDE_MODAL' as const;

export interface ModalState {
  show: boolean;
  modalContent: React.ReactNode;
}

const initialState: ModalState = {
  show: false,
  modalContent: null,
};

export const showModal = (modalContent: React.ReactNode) =>
  <const>{
    type: SHOW_MODAL,
    payload: modalContent,
  };

export const hideModal = () =>
  <const>{
    type: HIDE_MODAL,
  };

type ACTIONTYPE = ReturnType<typeof showModal> | ReturnType<typeof hideModal>;

export default function modalReducer(
  state: ModalState = initialState,
  action: ACTIONTYPE,
): ModalState {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, modalContent: action.payload, show: true };
    case HIDE_MODAL:
      return { ...state, show: false };
    default:
      return state;
  }
}
