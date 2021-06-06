import { toiletsRef } from './toilets';
import firebase from 'firebase';

const REVIEW_COLLECTION_NAME = 'reviews';
const reviewsRef = (toiletId: string) =>
  toiletsRef.doc(toiletId).collection(REVIEW_COLLECTION_NAME);

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

export function subscribeToToiletReviewsChange(
  toiletId: string,
  onChangeReviews: (data: Review[]) => void,
): () => void {
  return reviewsRef(toiletId)
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      onChangeReviews(
        snapshot.docs.map(doc =>
          Object.assign(doc.data(), { id: doc.id }),
        ) as unknown as Review[],
      );
    });
}

/**
 *
 */
export async function createReview(
  toiletId: string,
  review: ReviewBase,
): Promise<void> {
  await reviewsRef(toiletId).add(review);
}
