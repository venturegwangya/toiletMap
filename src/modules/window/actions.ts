import { windowTypes } from '.';
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
 * 모달을 숨긴다.
 */
export const SELECT_LEFT_MENU = 'window/SELECT_LEFT_MENU' as const;
export interface SelectLeftMenuAction {
  type: typeof SELECT_LEFT_MENU;
  leftMenu: windowTypes.LeftMenu;
}
export function selectLeftMenu(
  leftMenu: windowTypes.LeftMenu,
): SelectLeftMenuAction {
  return {
    type: SELECT_LEFT_MENU,
    leftMenu,
  };
}

export type WindowActionType =
  | ShowModalAction
  | HideModalAction
  | SelectLeftMenuAction;
