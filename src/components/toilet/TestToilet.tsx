/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { ReviewBase, subscribeToToiletReviewsChange } from '../../apis/reviews';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Toilet } from '../../apis/toilets';
import { FlexColumnDiv, FlexRowDiv, SubtitleSpan, TitleSpan } from '../common';
import styled from '@emotion/styled';
import ToiletInfoIconText from './ToiletInfoIconText';

const ToiletItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
`;

interface ToiletReviewInfo {
  reviewCount: number;
  avgRating: number;
  childFacilities: boolean;
  disabledFacilities: boolean;
  unisex: boolean;
}

interface ToiletListItemProps {
  toilet: Toilet;
  userId: string | undefined;
}

const isMoreThanOrEqualToHalf = (count: number, total: number) =>
  count >= total / 2;

const makeToiletReviewInfoFromReviews = (reviews: ReviewBase[]) => {
  const reviewCount = reviews.length;
  let sumRating = 0;
  let childFacilitiesCount = 0;
  let disabledFacilitiesCount = 0;
  let unisexCount = 0;
  reviews.forEach(review => {
    sumRating += review.rating;
    childFacilitiesCount += Number(review.childFacilities);
    disabledFacilitiesCount += Number(review.disabledFacilities);
    unisexCount += Number(review.unisex);
  });
  return {
    reviewCount,
    avgRating: sumRating / reviewCount,
    childFacilities: isMoreThanOrEqualToHalf(childFacilitiesCount, reviewCount),
    disabledFacilities: isMoreThanOrEqualToHalf(
      disabledFacilitiesCount,
      reviewCount,
    ),
    unisex: isMoreThanOrEqualToHalf(unisexCount, reviewCount),
  };
};

function TestToilet({
  toilet,
  userId,
}: ToiletListItemProps): EmotionJSX.Element {
  const [reviews, setReviews] = useState<ReviewBase[]>([]);
  const [toiletReviewInfo, setToiletReviewInfo] =
    useState<ToiletReviewInfo | undefined>();

  useEffect(() => {
    const unsubscribe = subscribeToToiletReviewsChange(toilet.id, reviews => {
      setReviews(reviews);
      setToiletReviewInfo(makeToiletReviewInfoFromReviews(reviews));
    });
    return () => {
      unsubscribe();
    };
  }, [toilet.id]); // 조건, posts 바뀔 때

  return (
    <ToiletItemBox>
      <FlexColumnDiv
        css={css`
          justify-content: space-between;
        `}
      >
        <FlexColumnDiv>
          <TitleSpan>{toilet.name}</TitleSpan>
          <SubtitleSpan>{toilet.type} </SubtitleSpan>
        </FlexColumnDiv>
        <TitleSpan>{toiletReviewInfo?.avgRating} / 5</TitleSpan>
      </FlexColumnDiv>
      <FlexColumnDiv
        css={css`
          height: 100px;
          justify-content: space-evenly;
        `}
      >
        <ToiletInfoIconText
          enabled={toiletReviewInfo?.unisex}
          iconClass={'fa-genderless'}
          text={'남녀공용화장실'}
        />
        <ToiletInfoIconText
          enabled={toiletReviewInfo?.unisex}
          iconClass={'fa-wheelchair'}
          text={'장애인용 시설'}
        />
        <ToiletInfoIconText
          enabled={toiletReviewInfo?.unisex}
          iconClass={'fa-child'}
          text={'아동용 시설'}
        />
      </FlexColumnDiv>
      {/* {reviews.map((review, i) => {
        return (
          <div key={i}>
            {review.text}
            {review.authorUserId == userId ? '수정 가능' : '수정 불가능'}
          </div>
        );
      })} */}
    </ToiletItemBox>
  );
}

export default TestToilet;
