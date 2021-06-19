import { LatLng } from 'leaflet';
import firebase from 'firebase';
import { toiletModels } from '../../apis/toilet';

/**
 * 지도 위치가 바뀔 때 상태 값을 변경
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
 * 주어진 위치값/범위로 화장실 정보를 가져온다.
 */
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

/**
 * 화장실 정보를 성공적으로 가져왔을 때
 */
export const RECEIVE_TOILETS = 'map/RECEIVE_TOILETS' as const;
export interface ReceiveToiletsAction {
  type: typeof RECEIVE_TOILETS;
  toilets: toiletModels.Toilet[];
}
export function receiveToilets(
  toilets: toiletModels.Toilet[],
): ReceiveToiletsAction {
  return {
    type: RECEIVE_TOILETS,
    toilets,
  };
}

export type MapActionType =
  | ChangePositionAction
  | RequestToiletsInAreaAction
  | ReceiveToiletsAction;
