import React, { ReactElement } from 'react';
import { reviewModels } from '@modules/review';
import tw from 'twin.macro';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import IconText from '@components/common/IconText';

const ReviewListItemContainer = tw.li`flex flex-col p-4`;
const ReviewAuthorName = tw.h2`w-full font-semibold`;

interface ReviewCardProps {
  review: reviewModels.Review;
}

function ReviewListItem({ review }: ReviewCardProps): ReactElement {
  return (
    <ReviewListItemContainer>
      <ReviewAuthorName>{review.author}</ReviewAuthorName>
      <IconText icon={faStar} text={String(review.rating)} />
      {review.text}
    </ReviewListItemContainer>
  );
}

export default ReviewListItem;
