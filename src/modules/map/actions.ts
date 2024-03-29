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
 * @description 지도 zoom값
 */
export const CHANGE_ZOOM = 'map/CHANGE_ZOOM' as const;

export interface ChangeZoomAction {
  type: typeof CHANGE_ZOOM;
  zoom: number;
}

export function changeZoom(zoom: number): ChangeZoomAction {
  return {
    type: CHANGE_ZOOM,
    zoom,
  };
}

export type MapActionType = ChangePositionAction | ChangeZoomAction;
