import firebase from 'firebase';

/**
 * 기본 리뷰 데이터
 */
export interface ReviewBase {
  id: string;
  author: string;
  text: string;
  rating: number;
  disabledFacilities: boolean;
  childFacilities: boolean;
  unisex: boolean;
  timestamp?: firebase.firestore.FieldValue;
}

export interface ReviewReaction {
  dislikedUIDs: { [key: string]: boolean };
}

export type Review = ReviewBase & ReviewReaction;
