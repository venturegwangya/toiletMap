import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks, reviewModels } from '@modules/review';
import { Toilet } from '@modules/toilet/models';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import firebase from 'firebase';
import ReviewListItem from './ReviewListItem';
import { ReviewForm } from './ReviewForm';
import { useCallback } from 'react';

const ReviewListContainer = tw.ul`divide-y divide-gray-100`;

interface ReviewPanelProps {
  toilet: Toilet;
  user: firebase.User | null;
}

export const ReviewPanel: React.FunctionComponent<ReviewPanelProps> = ({
  toilet,
  user,
}) => {
  const dispatch = useAppDispatch();
  const reviews = reviewHooks.useSelectedToiletReviews();
  const userHasReview = useCallback(() => {
    return reviews.some(review => review.id === user?.uid);
  }, [reviews, user]);

  useEffect(() => {
    dispatch(reviewActions.requestReviewsByToiletId(toilet.id));
    return () => {
      //
    };
  }, [dispatch, toilet]);

  return (
    <div
      style={{
        width: '300px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {user != null && <ReviewForm toilet={toilet} user={user} />}
      <ReviewListContainer>
        {reviews.map((r, i) => (
          <ReviewListItem
            key={`review-${i}`}
            userId={user?.uid}
            review={r}
            toiletId={toilet.id}
          />
        ))}
      </ReviewListContainer>
    </div>
  );
};
