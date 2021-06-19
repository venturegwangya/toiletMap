/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase';
import { getFirebaseServerTimestamp } from '../apis/configureFirebase';
import { reviewModels } from '../apis/review';
import { toiletAPI, toiletModels } from '../apis/toilet';

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

function makeToiletBaseFromRawData(rawToiletData: RawToiletData) {
  const type = rawToiletData.구분;
  const name = rawToiletData.화장실명;

  const lat = parseFloat(rawToiletData.위도);
  const long = parseFloat(rawToiletData.경도);
  if (!lat || !long) return null;
  const coordinates = new firebase.firestore.GeoPoint(lat, long);
  const newToilet: toiletModels.ToiletBase = {
    name,
    type,
    coordinates,
    timestamp: getFirebaseServerTimestamp(),
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
    const newToilet = makeToiletBaseFromRawData(record);
    if (!newToilet) return;
    const newReview = makeReviewBaseFromRawData(user, record);
    if (!newReview) return;

    toiletAPI.createToilet(newToilet, newReview);
  });
}
