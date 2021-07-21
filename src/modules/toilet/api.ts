import firebase from 'firebase';
import { Toilet, ToiletBase } from './models';
import { firebaseDB, firebaseGeoDB } from '../configureFirebase';
import { reviewModels, reviewAPI } from '@modules/review';

const TOILET_COLLECTION_NAME = 'toilets';
export const toiletsRef = firebaseDB.collection(TOILET_COLLECTION_NAME);
export const toiletsGeoRef = firebaseGeoDB.collection(TOILET_COLLECTION_NAME);

export async function fetchToiletWithArea(
  center: firebase.firestore.GeoPoint,
  radius: number,
): Promise<Toilet[]> {
  const toiletData = await toiletsGeoRef.near({ center, radius }).get();
  return toiletData.docs.map(doc =>
    Object.assign(doc.data() as unknown as Toilet, { id: doc.id }),
  );
}

export async function updateToilet(
  toiletId: string,
  toiletProps: Partial<ToiletBase>,
): Promise<void> {
  await toiletsRef.doc(toiletId).set(toiletProps);
}

/**
 * 화장실 등록 함수. 화장실 이름/위치 정보 정도를 받고 나머지 상태는 리뷰로 등록한다.
 */
export function createToilet(
  newToilet: ToiletBase,
  review: reviewModels.ReviewBase,
): void {
  toiletsGeoRef.add(newToilet).then(doc => {
    reviewAPI.createNewReview(Object.assign(newToilet, { id: doc.id }), review);
  });
}
