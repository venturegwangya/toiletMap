import firebase from 'firebase';
import { toiletTypes } from '.';

export interface Unique {
  id: string;
}

/**
 * 기본 화장실 정보
 */
export interface ToiletBase {
  name: string;
  type: toiletTypes.ToiletRegisterType;
  coordinates: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.FieldValue;
  reviewCount: number;
  avgRating: number;
  // 갱신시 >= 1 일 때 true
  childFacilities: number;
  disabledFacilities: number;
  unisex: number;
}

/**
 * 서버에서 받아오면 id가 추가된다.
 */
export type Toilet = ToiletBase & Unique;
