import { LatLng } from 'leaflet';
import { Toilet } from '../../apis/toilets';
import firebase from 'firebase';

// 지도 위치 변화
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

// 현재 위치 범위에서 데이터 가져오기
export const REQUEST_TOILETS_IN_AREA = 'map/REQUEST_TOILETS_IN_AREA' as const;
export interface RequestToiletsInAreaAction {
  type: typeof REQUEST_TOILETS_IN_AREA;
  center: firebase.firestore.GeoPoint;
  radius: number;
}
export function requestToiletsInArea(
  center: firebase.firestore.GeoPoint,
  radius: number,
): RequestToiletsInAreaAction {
  return {
    type: REQUEST_TOILETS_IN_AREA,
    center,
    radius,
  };
}

export const RECEIVE_TOILETS = 'map/RECEIVE_TOILETS' as const;
export interface ReceiveToiletsAction {
  type: typeof RECEIVE_TOILETS;
  toilets: Toilet[];
}
export function receiveToilets(toilets: Toilet[]): ReceiveToiletsAction {
  return {
    type: RECEIVE_TOILETS,
    toilets,
  };
}

export type MapActionType =
  | ChangePositionAction
  | RequestToiletsInAreaAction
  | ReceiveToiletsAction;
