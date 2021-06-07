/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { ReviewBase, subscribeToToiletReviewsChange } from '../apis/reviews';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Card, Columns, Content, Heading } from 'react-bulma-components';
import { Toilet } from '../apis/toilets';
import ToiletInfoIconText from './ToiletInfoIconText';

interface ToiletReviewInfo {
  reviewCount: number;
  avgRating: number;
  childFacilities: boolean;
  disabledFacilities: boolean;
  unisex: boolean;
}

interface ToiletCardProps {
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

export default function TestToilet({
  toilet,
  userId,
}: ToiletCardProps): EmotionJSX.Element {
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
    <div
      css={css`
        border-bottom: 1px solid black;
      `}
    >
      <Card>
        <Card.Content>
          <Columns>
            <Columns.Column>
              <Heading size={5}>{toilet.name}</Heading>
              <Heading size={6} subtitle>
                {toilet.type}
              </Heading>
            </Columns.Column>
            <Columns.Column size={'one-fifth'}>
              <Heading size={5}>{toiletReviewInfo?.avgRating} / 5</Heading>
            </Columns.Column>
          </Columns>
          <Content display="flex" flexDirection="column">
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
          </Content>
        </Card.Content>
      </Card>
      {/* {reviews.map((review, i) => {
        return (
          <div key={i}>
            {review.text}
            {review.authorUserId == userId ? '수정 가능' : '수정 불가능'}
          </div>
        );
      })} */}
    </div>
  );
}
