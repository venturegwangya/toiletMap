import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks } from '@modules/review';
import { Toilet } from '@modules/toilet/models';
import React, { useEffect } from 'react';
import tw from 'twin.macro';
import firebase from 'firebase';
import ReviewListItem from './ReviewListItem';
import { ReviewForm } from './ReviewForm';
import { useCallback } from 'react';

const ReviewListContainer = tw.ul`divide-y divide-gray-100`;

interface ReviewPanelProps {
  toilet: Toilet;
  // TODO: MayBe 타입 만들기
  user: firebase.User | null | undefined;
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
