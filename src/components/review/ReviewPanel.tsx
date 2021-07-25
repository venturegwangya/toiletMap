import IconText from '@components/common/IconText';
import { StartRatingBar } from '@components/common/StarRatingBar';
import {
  faChild,
  faGenderless,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks } from '@modules/review';
import { Toilet } from '@modules/toilet/models';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import firebase from 'firebase';
import ReviewListItem from './ReviewListItem';

const ReviewListContainer = tw.ul`divide-y divide-gray-100`;
const CompleteButton = tw.button`
  py-2
  px-4 
  bg-blue-500
  text-white
  font-semibold 
  rounded-lg
  shadow-md
  hover:bg-blue-700
  focus:outline-none
  focus:ring-2
  focus:ring-blue-400 
  focus:ring-opacity-75`;

interface ReviewPanelProps {
  toilet: Toilet;
  user: firebase.User | null;
}
interface ReviewPanelState {
  disabledFacilities: boolean;
  unisex: boolean;
  childFacilities: boolean;
  text: string;
  rating: number;
}

export const ReviewPanel: React.FunctionComponent<ReviewPanelProps> = ({
  toilet,
  user,
}) => {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState<ReviewPanelState>({
    disabledFacilities: false,
    unisex: false,
    childFacilities: false,
    text: '',
    rating: 1,
  });
  const reviews = reviewHooks.useSelectedToiletReviews();

  useEffect(() => {
    dispatch(reviewActions.requestReviewsByToiletId(toilet.id));
    return () => {
      //
    };
  }, [dispatch, toilet]);

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview({
      ...review,
      [e.currentTarget.id]: e.currentTarget.checked,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onComplete = () => {
    dispatch(
      reviewActions.createReview(toilet, {
        ...review,
        author: user?.uid || '',
        authorUserId: user?.email || '',
      }),
    );
  };

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
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>리뷰 작성</div>
      <div style={{ fontSize: '16px', marginBottom: '6px' }}>평점</div>
      <StartRatingBar value={1 + ''} />
      <div
        style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px' }}
      >
        화장실 편의시설이 잘되어 있었나요?
      </div>
      {/** TODO: 아래 반복되는 것들 컴포넌트로 분리 (+ 스타일링) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          alignItems: 'center',
        }}
      >
        <IconText icon={faGenderless} enabled />
        <label htmlFor="unisex">남녀공용</label>
        <input id="unisex" type="checkbox" onChange={onChecked} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <IconText icon={faWheelchair} enabled />
        <label htmlFor="disabledFacilities">장애인용 시설</label>
        <input id="disabledFacilities" type="checkbox" onChange={onChecked} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <IconText icon={faChild} enabled />
        <label htmlFor="childFacilities">아동용 시설</label>
        <input id="childFacilities" type="checkbox" onChange={onChecked} />
      </div>
      화장실에 대해 간단하게 알려주세요.
      <textarea id="text" onChange={onChange} />
      <div style={{ fontSize: '14px', marginBottom: '4px' }}>
        <CompleteButton onClick={onComplete}>리뷰 등록</CompleteButton>
      </div>
      <ReviewListContainer>
        {reviews.map((r, i) => (
          <ReviewListItem key={`review-${i}`} review={r} />
        ))}
      </ReviewListContainer>
    </div>
  );
};
