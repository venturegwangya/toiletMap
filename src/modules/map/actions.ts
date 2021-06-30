import { LatLng } from 'leaflet';
import firebase from 'firebase';
import { toiletModels } from '../../apis/toilet';
import { reviewModels } from '@apis/review';

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

/**
 * 화장실 선택 (맵 마커 혹은 목록에서 선택)
 */
export const SELECT_TOILET = 'map/SELECT_TOILET' as const;
export interface SelectToiletAction {
  type: typeof SELECT_TOILET;
  toilet: toiletModels.Toilet;
}
export function selectToilet(toilet: toiletModels.Toilet): SelectToiletAction {
  return {
    type: SELECT_TOILET,
    toilet,
  };
}

/**
 * 화장실 리뷰 가져옴
 */
export const REQUEST_REVIEWS_BY_TOILET_ID =
  'map/REQUEST_REVIEWS_BY_TOILET_ID' as const;
export interface RequestReviewsByToiletIdAction {
  type: typeof REQUEST_REVIEWS_BY_TOILET_ID;
  toiletId: string;
}
export function requestReviewsByToiletId(
  toiletId: string,
): RequestReviewsByToiletIdAction {
  return {
    type: REQUEST_REVIEWS_BY_TOILET_ID,
    toiletId,
  };
}

/**
 * 화장실 리뷰를 성공적으로 가져왔을 때
 */
export const RECEIVE_REVIEWS = 'map/RECEIVE_REVIEWS' as const;
export interface ReceiveReviewsAction {
  type: typeof RECEIVE_REVIEWS;
  reviews: reviewModels.Review[];
}
export function receiveReviews(
  reviews: reviewModels.Review[],
): ReceiveReviewsAction {
  return {
    type: RECEIVE_REVIEWS,
    reviews,
  };
}

export type MapActionType =
  | ChangePositionAction
  | RequestToiletsInAreaAction
  | ReceiveToiletsAction
  | SelectToiletAction
  | RequestReviewsByToiletIdAction
  | ReceiveReviewsAction;
