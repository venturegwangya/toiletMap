import React, { ReactElement } from 'react';
import { reviewModels } from '@apis/review';

interface Props {
  review: reviewModels.Review;
}

function ReviewCard({ review }: Props): ReactElement {
  return <div></div>;
}

export default ReviewCard;
