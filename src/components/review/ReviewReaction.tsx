import React, { ReactElement } from 'react';
import { useLikeOrDislikeReview } from '../../modules/review/hooks';

interface ReviewReactionProps {
  userId: string;
  toiletId: string;
  reviewId: string;
  likeCount: number;
  dislikeCount: number;
}

function ReviewReaction({
  userId,
  toiletId,
  reviewId,
  likeCount,
  dislikeCount,
}: ReviewReactionProps): ReactElement {
  const { like, dislike } = useLikeOrDislikeReview(userId, toiletId, reviewId);
  return (
    <div>
      <button onClick={like}>좋아요: {likeCount}</button>
      <button onClick={dislike}> 싫어요: {dislikeCount} </button>
    </div>
  );
}

export default ReviewReaction;
