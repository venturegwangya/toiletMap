import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { subscribeToToiletReviewsChange } from '../apis/reviews';

export default function TestToilet({ toilet, userId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    let unsubscribe = subscribeToToiletReviewsChange(toilet.id, reviews => {
      setReviews(reviews);
    });
    return () => {
      unsubscribe();
    };
  }, []); // 조건, posts 바뀔 때

  return (
    <div>
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
