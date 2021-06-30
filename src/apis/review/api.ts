import { Review, ReviewBase } from './models';
import { toiletAPI } from '../toilet';

const REVIEW_COLLECTION_NAME = 'reviews';
const reviewsRef = (toiletId: string) =>
  toiletAPI.toiletsRef.doc(toiletId).collection(REVIEW_COLLECTION_NAME);

// export function subscribeToToiletReviewsChange(
//   toiletId: string,
//   onChangeReviews: (data: Review[]) => void,
// ): () => void {
//   return reviewsRef(toiletId)
//     .orderBy('timestamp', 'desc')
//     .onSnapshot(snapshot => {
//       onChangeReviews(
//         snapshot.docs.map(doc =>
//           Object.assign(doc.data(), { id: doc.id }),
//         ) as unknown as Review[],
//       );
//     });
// }

export async function fetchToiletReviews(toiletId: string): Promise<Review[]> {
  const reviewData = await reviewsRef(toiletId)
    .orderBy('timestamp', 'desc')
    .get();
  return reviewData.docs.map(doc =>
    Object.assign(doc.data() as unknown as Review, { id: doc.id }),
  );
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
