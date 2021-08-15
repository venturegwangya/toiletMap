/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { FlexColumnDiv, SubtitleSpan, TitleSpan } from '../common';
import styled from '@emotion/styled';
import IconText from '../common/IconText';
import { toiletHooks } from '@modules/toilet';
import { Toilet } from '@modules/toilet/models';
import {
  faChild,
  faGenderless,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';

const ToiletItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;
`;

interface ToiletListItemProps {
  toilet: Toilet;
}

const availableText = (available: boolean | undefined) =>
  available ? '있음' : '없음';

function ToiletInfoCard({ toilet }: ToiletListItemProps): EmotionJSX.Element {
  const { setSelectedToilet } = toiletHooks.useToiletActions();
  // useEffect(() => {
  //   const unsubscribe = reviewAPI.subscribeToToiletReviewsChange(
  //     toilet.id,
  //     reviews => {
  //       setReviews(reviews);
  //       setToiletReviewInfo(makeToiletReviewInfoFromReviews(reviews));
  //     },
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [toilet.id]); // 조건, posts 바뀔 때

  return (
    <ToiletItemBox onClick={() => setSelectedToilet(toilet)}>
      <FlexColumnDiv
        css={css`
          justify-content: space-between;
        `}
      >
        <FlexColumnDiv>
          <TitleSpan>{toilet.name}</TitleSpan>
          <SubtitleSpan>{toilet.type} </SubtitleSpan>
        </FlexColumnDiv>
        <TitleSpan>{toilet.avgRating} / 5</TitleSpan>
      </FlexColumnDiv>
      <FlexColumnDiv
        css={css`
          height: 100px;
          justify-content: space-evenly;
        `}
      >
        <IconText
          enabled={toilet.unisex >= 1}
          icon={faGenderless}
          text={'남녀공용화장실 ' + availableText(toilet.unisex >= 1)}
        />
        <IconText
          enabled={toilet.disabledFacilities >= 1}
          icon={faWheelchair}
          text={
            '장애인용 시설 ' + availableText(toilet.disabledFacilities >= 1)
          }
        />
        <IconText
          enabled={toilet.childFacilities >= 1}
          icon={faChild}
          text={'아동용 시설 ' + availableText(toilet.childFacilities >= 1)}
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

export default ToiletInfoCard;
