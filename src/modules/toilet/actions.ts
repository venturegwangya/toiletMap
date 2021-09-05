import firebase from 'firebase';
import { toiletModels } from '.';

/**
 * 주어진 위치값/범위로 화장실 정보를 가져온다.
 */
export const NEED_REQUEST_AGAIN = 'toilet/NEED_REQUEST_AGAIN' as const;
export interface NeedRequestAgainAction {
  type: typeof NEED_REQUEST_AGAIN;
}
export function needRequestAgain(): NeedRequestAgainAction {
  return {
    type: NEED_REQUEST_AGAIN,
  };
}

/**
 * 주어진 위치값/범위로 화장실 정보를 가져온다.
 */
export const REQUEST_TOILETS_IN_AREA =
  'toilet/REQUEST_TOILETS_IN_AREA' as const;
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
export const RECEIVE_TOILETS = 'toilet/RECEIVE_TOILETS' as const;
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

/**
 * 화장실 선택 (맵 마커 혹은 목록에서 선택)
 */
export const SELECT_TOILET = 'toilet/SELECT_TOILET' as const;
export interface SelectToiletAction {
  type: typeof SELECT_TOILET;
  toilet: toiletModels.Toilet | null;
}
export function selectToilet(
  toilet: toiletModels.Toilet | null,
): SelectToiletAction {
  return {
    type: SELECT_TOILET,
    toilet,
  };
}

export type ToiletActionType =
  | NeedRequestAgainAction
  | RequestToiletsInAreaAction
  | ReceiveToiletsAction
  | SelectToiletAction;
