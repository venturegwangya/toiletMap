/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase/app';
import { getFirebaseServerTimestamp } from '@modules/configureFirebase';
import { reviewModels } from '@modules/review';
import { toiletAPI, toiletModels, toiletTypes } from '@modules/toilet';

interface RawToiletData {
  구분: string;
  화장실명: string;
  위도: string;
  경도: string;
  남녀공용화장실여부: string;
  '남성용-어린이용대변기수': string;
  '남성용-어린이용소변기수': string;
  '남성용-장애인용대변기수': string;
  '남성용-장애인용소변기수': string;
  데이터기준일자: string;
}

function makeToiletBaseFromRawData(
  rawToiletData: RawToiletData,
  reviewData: reviewModels.ReviewBase,
) {
  const type = rawToiletData.구분;
  const name = rawToiletData.화장실명;
  console.debug(rawToiletData);
  const lat = parseFloat(rawToiletData.위도);
  const long = parseFloat(rawToiletData.경도);

  if (!toiletTypes.isToiletRegisterType(type))
    throw new Error(`잘못된 화장실 타입 ${type}`);
  if (!lat || !long) throw new Error(`위도, 경도 정보 없음! ${lat}, ${long}`);

  const coordinates = new firebase.firestore.GeoPoint(lat, long);
  const newToilet: toiletModels.ToiletBase = {
    name,
    type,
    coordinates,
    timestamp: getFirebaseServerTimestamp(),
    avgRating: reviewData.rating,
    childFacilities: Number(reviewData.childFacilities),
    disabledFacilities: Number(reviewData.disabledFacilities),
    unisex: Number(reviewData.unisex),
    reviewCount: 1,
  };
  return newToilet;
}

function makeReviewBaseFromRawData(
  user: { displayName: string; uid: string },
  rawToiletData: RawToiletData,
) {
  const newReview: reviewModels.ReviewBase = {
    author: user.displayName || '관리자',
    authorUserId: user.uid,
    childFacilities:
      parseInt(rawToiletData['남성용-어린이용대변기수']) > 0 ||
      parseInt(rawToiletData['남성용-어린이용소변기수']) > 0,
    disabledFacilities:
      parseInt(rawToiletData['남성용-장애인용대변기수']) > 0 ||
      parseInt(rawToiletData['남성용-장애인용소변기수']) > 0,
    unisex: rawToiletData.남녀공용화장실여부 === 'Y',
    rating: 5,
    text: '신규 정보 등록용 리뷰입니다.',
    timestamp: getFirebaseServerTimestamp(),
  };
  return newReview;
}

export function processRawToiletData(records: RawToiletData[]): void {
  const user = {
    displayName: '화장실 관리자',
    uid: 'HOVBfPDq3qO3QcWJja0ZTAw5gAW2',
  };
  console.log(records);
  records.map((record: RawToiletData) => {
    const newReview = makeReviewBaseFromRawData(user, record);
    if (!newReview) return;
    try {
      const newToilet = makeToiletBaseFromRawData(record, newReview);
      if (!newToilet) return;
      toiletAPI.createToilet(newToilet, newReview);
    } catch (err) {
      console.log(err);
    }
  });
}
