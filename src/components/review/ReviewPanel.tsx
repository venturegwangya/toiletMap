import React, { useCallback, useState, useEffect } from 'react';
import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks, reviewModels } from '@modules/review';
import ReviewListItem from './ReviewListItem';
import tw from 'twin.macro';

// TODO: 회색 디바이서 리스트 컨테이너 공통으로 추출
const ReviewListContainer = tw.ul`divide-y divide-gray-100`;

import { Toilet } from '@modules/toilet/models';
import IconText from '@components/common/IconText';
import {
  faChild,
  faGenderless,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';

interface ReviewPanelProps {
  toilet: Toilet;
}

export const ReviewPanel: React.FunctionComponent<ReviewPanelProps> = ({
  toilet,
}) => {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState<reviewModels.ReviewBase | null>(null);
  const reviews = reviewHooks.useSelectedToiletReviews();

  useEffect(() => {
    dispatch(reviewActions.requestReviewsByToiletId(toilet.id));
    return () => {
      //
    };
  }, [dispatch, toilet]);

  const onChange = useCallback(
    (id: string, value: string) => {
      // setReview({
      //   ...review,
      //   [id]: value,
      //   author: '12313',
      //   authorUserId: '123123',
      // });
    },
    [review],
  );

  const onChecked = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // setReview({
    //   ...review,
    //   [e.currentTarget.name]: e.currentTarget.checked,
    // });
  }, []);

  const onComplete = useCallback(() => {
    if (review) {
      dispatch(reviewActions.createReview(toilet, review));
    }
  }, [review]);

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
      <div>rating bar</div>
      <div
        style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px' }}
      >
        화장실 편의시설이 잘되어 있었나요?
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <label htmlFor="unisex">남녀 공용</label>
        {/** 체크박스 컴포넌트로 간단하게 쪼갠다. */}
      </div>
      <IconText icon={faGenderless} enabled />
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <input name="unisex" type="checkbox" onChange={onChecked} />
        <label htmlFor="disabledFacilities">장애인용 시설</label>
      </div>
      <IconText icon={faWheelchair} enabled />
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <input name="disabledFacilities" type="checkbox" onChange={onChecked} />
        <label htmlFor="childFacilities">아동용 시설</label>
      </div>
      <IconText icon={faChild} enabled />
      <input name="childFacilities" type="checkbox" onChange={onChecked} />
      화장실에 대해 간단하게 알려주세요.
      <textarea></textarea>
      <div style={{ fontSize: '14px', marginBottom: '4px' }}>
        <button onClick={onComplete}>리뷰 등록</button>
      </div>
      <ReviewListContainer>
        {reviews.map((r, i) => (
          <ReviewListItem key={`review-${i}`} review={r} />
        ))}
      </ReviewListContainer>
    </div>
  );
};
