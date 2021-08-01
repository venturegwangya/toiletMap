import { LatLng } from 'leaflet';

/**
 * @description 지도 위치가 바뀔 때 상태 값을 변경
 */
export const CHANGE_POSITION = 'map/CHANGE_POSITION' as const;

export interface ChangePositionAction {
  type: typeof CHANGE_POSITION;
  position: LatLng;
}

export function changePosition(position: LatLng): ChangePositionAction {
  return {
    type: CHANGE_POSITION,
    position,
  };
}

/**
 * @description '이 위치 다시 검색' left position 갱신
 */
export const CHANGE_REFRESH_LEFT_POSITION =
  'map/CHANGE_REFRESH_LEFT_POSITION' as const;

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

export type MapActionType =
  | ChangePositionAction
  | ChangeRefreshPillPositionAction;
