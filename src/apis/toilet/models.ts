import firebase from 'firebase';
import { ToiletRegisterType } from './types';

export interface Unique {
  id: string;
}

/**
 * 기본 화장실 정보
 */
export interface ToiletBase {
  name: string;
  type: ToiletRegisterType;
  coordinates: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.FieldValue;
}

/**
 * 서버에서 받아오면 id가 추가된다.
 */
export type Toilet = ToiletBase & Unique;
