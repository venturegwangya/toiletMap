import { toiletAPI, toiletModels } from '@modules/toilet';
import { Review, ReviewBase } from './models';

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
 * 화장실에 대한 리뷰를 추가하고 관련 정보를 갱신
 */
export async function createNewReview(
  toilet: toiletModels.Toilet,
  review: ReviewBase,
): Promise<void> {
  const booleanToNumericSign = (bool: boolean) => (bool ? 1 : -1);

  toiletAPI.updateToilet(toilet.id, {
    ...toilet,
    avgRating: (toilet.avgRating + review.rating) / 2,
    reviewCount: toilet.reviewCount + 1,
    childFacilities:
      toilet.childFacilities + booleanToNumericSign(review.childFacilities),
    unisex: toilet.unisex + booleanToNumericSign(review.unisex),
    disabledFacilities:
      toilet.disabledFacilities +
      booleanToNumericSign(review.disabledFacilities),
  });
  reviewsRef(toilet.id).add(review);
}
