import { firebaseDB, firebaseGeoDB } from './common';
import { createReview, ReviewBase } from './reviews';
import firebase from 'firebase';

const TOILET_COLLECTION_NAME = 'toilets';
export const toiletsRef = firebaseDB.collection(TOILET_COLLECTION_NAME);
export const toiletsGeoRef = firebaseGeoDB.collection(TOILET_COLLECTION_NAME);

export interface Unique {
  id: string;
}

export interface ToiletBase {
  name: string;
  type: string;
  coordinates: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.FieldValue;
}

export type Toilet = ToiletBase & Unique;

export async function fetchToiletWithArea(
  center: firebase.firestore.GeoPoint,
  radius: number,
): Promise<Toilet[]> {
  const toiletData = await toiletsGeoRef.near({ center, radius }).get();
  return toiletData.docs.map(doc =>
    Object.assign(doc.data() as unknown as Toilet, { id: doc.id }),
  );
}

/**
 * 화장실 등록 함수. 화장실 이름/위치 정보 정도를 받고 나머지 상태는 리뷰로 등록한다.
 */
export function createToilet(newToilet: ToiletBase, review: ReviewBase): void {
  toiletsGeoRef.add(newToilet).then(doc => {
    createReview(doc.id, review);
  });
}
