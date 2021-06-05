/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReviewBase, subscribeToToiletReviewsChange } from '../apis/reviews';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export default function TestToilet({
  toilet,
  userId,
}: any): EmotionJSX.Element {
  const [reviews, setReviews] = useState<ReviewBase[]>([]);
  useEffect(() => {
    const unsubscribe = subscribeToToiletReviewsChange(toilet.id, reviews => {
      setReviews(reviews);
    });
    return () => {
      unsubscribe();
    };
  }, [toilet.id]); // 조건, posts 바뀔 때

  return (
    <div
      css={css`
        border-bottom: 1px solid black;
      `}
    >
      {toilet.name}
      {toilet.id}
      {reviews.map((review, i) => {
        return (
          <div key={i}>
            {review.text}
            {review.authorUserId == userId ? '수정 가능' : '수정 불가능'}
          </div>
        );
      })}
    </div>
  );
}

TestToilet.propTypes = {
  toilet: PropTypes.object.isRequired,
  userId: PropTypes.string,
};
