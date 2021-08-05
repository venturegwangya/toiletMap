import React, { ReactElement } from 'react';
import { reviewModels } from '@modules/review';
import tw from 'twin.macro';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import IconText from '@components/common/IconText';
import ReviewReaction from './ReviewReaction';
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
  return (
    <ReviewListItemContainer>
      <ReviewAuthorName>{review.author}</ReviewAuthorName>
      <IconText icon={faStar} text={String(review.rating)} />
      {review.text}
      {userId != null && (
        <ReviewReaction
          userId={userId}
          reviewId={review.id}
          toiletId={toiletId}
          likeCount={
            review.dislikedUIDs != null
              ? Object.values(review.dislikedUIDs).filter(dislike => !dislike)
                  .length
              : 0
          }
          dislikeCount={
            review.dislikedUIDs != null
              ? Object.values(review.dislikedUIDs).filter(dislike => dislike)
                  .length
              : 0
          }
        />
      )}
    </ReviewListItemContainer>
  );
}

export default ReviewListItem;
