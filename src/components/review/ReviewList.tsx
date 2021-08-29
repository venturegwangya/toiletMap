import IconText from '@components/common/IconText';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { authHooks } from '@modules/auth';
import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks } from '@modules/review';
import { toiletHooks, toiletModels } from '@modules/toilet';
import { useCallback, useEffect } from 'react';
import { ReviewForm } from './ReviewForm';
import ReviewListItem from './ReviewListItem';

interface Props {
  selectedToilet: toiletModels.Toilet;
}

export function ReviewList({ selectedToilet }: Props): EmotionJSX.Element {
  const { user } = authHooks.useUser();
  const dispatch = useAppDispatch();
  const reviews = reviewHooks.useSelectedToiletReviews();
  const { setSelectedToilet } = toiletHooks.useToiletActions();
  const userHasReview = useCallback(() => {
    return reviews.some(review => review.id === user?.uid);
  }, [reviews, user]);

  useEffect(() => {
    if (selectedToilet != null)
      dispatch(reviewActions.requestReviewsByToiletId(selectedToilet.id));
    return () => {
      //
    };
  }, [dispatch, selectedToilet]);

  return (
    <>
      <IconText
        onClick={() => setSelectedToilet(null)}
        icon={faArrowLeft}
        text={'뒤로가기'}
        enabled
      />
      {user != null && <ReviewForm toilet={selectedToilet} user={user} />}
      {reviews.map((r, i) => (
        <ReviewListItem
          key={`review-${i}`}
          userId={user?.uid}
          review={r}
          toiletId={selectedToilet.id}
        />
      ))}
    </>
  );
}
