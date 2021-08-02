import React, { ReactElement } from 'react';
import { reviewActions, reviewModels } from '@modules/review';
import tw from 'twin.macro';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import IconText from '@components/common/IconText';
import { useAppDispatch } from '../../modules/configureStore';
const ReviewListItemContainer = tw.li`flex flex-col p-4`;
const ReviewAuthorName = tw.h2`w-full font-semibold`;

interface ReviewCardProps {
  review: reviewModels.Review;
  userId: string | undefined;
  toiletId: string;
}

function ReviewListItem({
  userId,
  toiletId,
  review,
}: ReviewCardProps): ReactElement {
  const dispatch = useAppDispatch();
  const handleLikeButton = (dislike: boolean) => {
    if (userId != null)
      dispatch(
        reviewActions.likeOrDislikeReview(userId, toiletId, review.id, dislike),
      );
  };

  return (
    <ReviewListItemContainer>
      <ReviewAuthorName>{review.author}</ReviewAuthorName>
      <IconText icon={faStar} text={String(review.rating)} />
      {review.text}
      {userId != null && (
        <>
          <button onClick={() => handleLikeButton(false)}>
            좋아요:
            {review.dislikedUIDs &&
              Object.values(review.dislikedUIDs).filter(dislike => !dislike)
                .length}
          </button>
          <button onClick={() => handleLikeButton(true)}>
            싫어요:
            {review.dislikedUIDs &&
              Object.values(review.dislikedUIDs).filter(dislike => dislike)
                .length}
          </button>
        </>
      )}
    </ReviewListItemContainer>
  );
}

export default ReviewListItem;
