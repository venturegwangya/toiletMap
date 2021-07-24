import firebase from 'firebase/app';

/**
 * 기본 리뷰 데이터
 */
export interface ReviewBase {
  author: string;
  authorUserId: string;
  text: string;
  rating: number;
  disabledFacilities: boolean;
  childFacilities: boolean;
  unisex: boolean;
  timestamp: firebase.firestore.FieldValue;
}

export interface ReviewReaction {
  like: number;
  dislike: number;
}

export type Review = ReviewBase & ReviewReaction;
