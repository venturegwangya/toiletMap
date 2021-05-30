import { getFirebaseServerTimestamp } from './serverTime';
import { toiletsRef } from './toilets';

const REVIEW_COLLECTION_NAME = 'reviews';
const reviewsRef = toiletId => toiletsRef.doc(toiletId).collection(REVIEW_COLLECTION_NAME);

export function subscribeToToiletReviewsChange(toiletId, onChangeReviews) {
  return reviewsRef(toiletId)
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      onChangeReviews(snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })));
    });
}

export function createReview(toiletId, user, reviewText, rating) {
  reviewsRef(toiletId).add({
    author: user.displayName,
    authorUserId: user.uid,
    rating: rating,
    text: reviewText,
    timestamp: getFirebaseServerTimestamp(),
  });
}
