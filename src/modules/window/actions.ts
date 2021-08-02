/**
 * 모달을 보여준다.
 */
export const SHOW_MODAL = 'window/SHOW_MODAL' as const;
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
export const HIDE_MODAL = 'window/HIDE_MODAL' as const;
export interface HideModalAction {
  type: typeof HIDE_MODAL;
}
export function hideModal(): HideModalAction {
  return {
    type: HIDE_MODAL,
  };
}

/**
 * @description '이 위치 다시 검색' left position 갱신
 */
export const CHANGE_REFRESH_LEFT_POSITION =
  'window/CHANGE_REFRESH_LEFT_POSITION' as const;

export interface ChangeRefreshPillPositionAction {
  type: typeof CHANGE_REFRESH_LEFT_POSITION;
  position: string;
}

export function changeRefreshPillLeftPosition(
  position: string,
): ChangeRefreshPillPositionAction {
  return {
    type: CHANGE_REFRESH_LEFT_POSITION,
    position,
  };
}

export type WindowActionType =
  | ShowModalAction
  | HideModalAction
  | ChangeRefreshPillPositionAction;
