import { firebaseDB, firebaseGeoDB } from './common';
import { createReview, ReviewBase } from './reviews';
import firebase from 'firebase';
import { GeoFirestoreTypes } from 'geofirestore';

const TOILET_COLLECTION_NAME = 'toilets';
export const toiletsRef = firebaseDB.collection(TOILET_COLLECTION_NAME);
export const toiletsGeoRef = firebaseGeoDB.collection(TOILET_COLLECTION_NAME);

export interface ToiletBase {
  name: string;
  type: string;
  coordinates: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.FieldValue;
}

export interface ToiletReviewInfo {
  avgRating: number;
  childFacilitiesCount: number;
  disabledFacilitiesCount: number;
  unisexCount: number;
}

export type Toilet = ToiletBase & ToiletReviewInfo;

export async function fetchToiletWithArea(
  center: firebase.firestore.GeoPoint,
  radius: number,
): Promise<
  GeoFirestoreTypes.QueryDocumentSnapshot<GeoFirestoreTypes.GeoDocumentData>[]
> {
  const toiletData = await toiletsGeoRef.near({ center, radius }).get();
  return toiletData.docs;
}

/**
 * 화장실 등록 함수. 화장실 이름/위치 정보 정도를 받고 나머지 상태는 리뷰로 등록한다.
 */
export function createToilet(newToilet: ToiletBase, review: ReviewBase): void {
  toiletsGeoRef.add(newToilet).then(doc => {
    createReview(doc.id, review);
  });
}
