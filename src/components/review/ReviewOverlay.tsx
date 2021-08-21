import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks } from '@modules/review';
import { Toilet } from '@modules/toilet/models';
import React, { useEffect } from 'react';
import tw from 'twin.macro';
import firebase from 'firebase';
import ReviewListItem from './ReviewListItem';
import { ReviewForm } from './ReviewForm';
import { useCallback } from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ReviewPanelContainer = tw.div`fixed left-0 z-over-map bg-white md:(relative w-64)`;
const DivideList = tw.ul`divide-y divide-gray-100`;

interface Props {
  toilet: Toilet;
  user: firebase.User | null;
}

export function ReviewOverlay({ toilet, user }: Props): EmotionJSX.Element {
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
    <ReviewPanelContainer>
      {user != null && <ReviewForm toilet={toilet} user={user} />}
      <DivideList>
        {reviews.map((r, i) => (
          <ReviewListItem
            key={`review-${i}`}
            userId={user?.uid}
            review={r}
            toiletId={toilet.id}
          />
        ))}
      </DivideList>
    </ReviewPanelContainer>
  );
}
