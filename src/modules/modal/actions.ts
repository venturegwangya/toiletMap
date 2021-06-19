/**
 * 모달을 보여준다.
 */
export const SHOW_MODAL = 'modal/SHOW_MODAL' as const;
export interface ShowModalAction {
  type: typeof SHOW_MODAL;
  modalContent: React.ReactNode;
}
export function showModal(modalContent: React.ReactNode): ShowModalAction {
  return {
    type: SHOW_MODAL,
    modalContent,
  };
}

/**
 * 모달을 숨긴다.
 */
export const HIDE_MODAL = 'modal/HIDE_MODAL' as const;
export interface HideModalAction {
  type: typeof HIDE_MODAL;
}
export function hideModal(): HideModalAction {
  return {
    type: HIDE_MODAL,
  };
}

export type ModalActionType = ShowModalAction | HideModalAction;
