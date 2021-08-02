import firebase from 'firebase';
import { toiletAPI, toiletModels } from '@modules/toilet';
import { Review, ReviewBase } from './models';
import { getFirebaseServerTimestamp } from '@modules/configureFirebase';

const REVIEW_COLLECTION_NAME = 'reviews';
const reviewsRef = (toiletId: string) =>
  toiletAPI.toiletsRef.doc(toiletId).collection(REVIEW_COLLECTION_NAME);
const reviewRef = (toiletId: string, reviewId: string) =>
  toiletAPI.toiletsRef
    .doc(toiletId)
    .collection(REVIEW_COLLECTION_NAME)
    .doc(reviewId);

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
function snapshotToReview(
  doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
): Review {
  return Object.assign(doc.data() as unknown as Review, {
    id: doc.id,
  }) as Review;
}

export async function fetchReviewsByToiletId(
  toiletId: string,
): Promise<Review[]> {
  const reviewData = await reviewsRef(toiletId)
    .orderBy('timestamp', 'desc')
    .get();
  return reviewData.docs.map(snapshotToReview);
}
/**
 * 화장실에 대한 리뷰를 추가하고 관련 정보를 갱신
 */
export async function createReview(
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
    timestamp: getFirebaseServerTimestamp(),
  });
  // 각 화장실의 리뷰는 유저당 하나를 가정하여 리뷰 document의 ID는 UID로 지정
  reviewsRef(toilet.id).doc(review.id).set(review);
}

function likeReview(userId: string, review: Review): Review {
  if (review.dislikedUIDs === undefined) review.dislikedUIDs = {};
  if (review.dislikedUIDs[userId] != null && !review.dislikedUIDs[userId]) {
    // like가 있으면 취소
    delete review.dislikedUIDs[userId];
  } else {
    // 없거나 dislike였으면 like로 교체
    review.dislikedUIDs[userId] = false;
  }
  return review;
}

//
function dislikeReview(userId: string, review: Review): Review {
  if (review.dislikedUIDs === undefined) review.dislikedUIDs = {};
  if (review.dislikedUIDs[userId] != null && review.dislikedUIDs[userId]) {
    // dislike가 있으면 취소
    delete review.dislikedUIDs[userId];
  } else {
    // 없거나 like였으면 dislike로 교체
    review.dislikedUIDs[userId] = true;
  }
  return review;
}

export async function likeOrDislikeReview(
  userId: string,
  toiletId: string,
  reviewId: string,
  isDislike: boolean,
): Promise<Review> {
  // 항상 최신 리뷰를 가져옴
  const review: Review = snapshotToReview(
    await reviewRef(toiletId, reviewId).get(),
  );
  if (isDislike) {
    dislikeReview(userId, review);
  } else {
    likeReview(userId, review);
  }
  await reviewRef(toiletId, review.id).update({
    dislikedUIDs: review.dislikedUIDs,
  });
  return review;
}
