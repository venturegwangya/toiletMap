/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { toiletModels } from '@apis/toilet';
import { FlexColumnDiv, SubtitleSpan, TitleSpan } from '../common';
import styled from '@emotion/styled';
import IconText from '../common/IconText';
import { useAppDispatch } from '../../modules/configureStore';
import { mapActions } from '@modules/map';

const ToiletItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;
`;

interface ToiletListItemProps {
  toilet: toiletModels.Toilet;
  userId: string | undefined;
}

const availableText = (available: boolean | undefined) =>
  available ? '있음' : '없음';

function ToiletInfoCard({
  toilet,
  userId,
}: ToiletListItemProps): EmotionJSX.Element {
  const dispatch = useAppDispatch();

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
    <ToiletItemBox onClick={() => dispatch(mapActions.selectToilet(toilet))}>
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
          iconClass={'fa-genderless'}
          text={'남녀공용화장실' + availableText(toilet.unisex >= 1)}
        />
        <IconText
          enabled={toilet.disabledFacilities >= 1}
          iconClass={'fa-wheelchair'}
          text={'장애인용 시설' + availableText(toilet.disabledFacilities >= 1)}
        />
        <IconText
          enabled={toilet.childFacilities >= 1}
          iconClass={'fa-child'}
          text={'아동용 시설' + availableText(toilet.childFacilities >= 1)}
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
