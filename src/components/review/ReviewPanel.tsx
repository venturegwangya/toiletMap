import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks, reviewModels } from '@modules/review';
import ReviewListItem from './ReviewListItem';
import tw from 'twin.macro';

type Props = {
  name: string;
  id: string;
  onChange: (id: string, value: string) => void;
};

// TODO: 파일 분리
function TempInput({ name, id, onChange }: Props) {
  return (
    <div style={{ display: 'inline-block' }}>
      <div>{name}</div>{' '}
      <input onChange={e => onChange(id, e.currentTarget.value)} />{' '}
    </div>
  );
}

// TODO: 회색 디바이서 리스트 컨테이너 공통으로 추출
const ReviewListContainer = tw.ul`divide-y divide-gray-100`;

type ReviewFor = Partial<reviewModels.ReviewBase>;

interface ReviewPanelProps {
  toiletId: string;
}

export const ReviewPanel: React.FunctionComponent<ReviewPanelProps> = ({
  toiletId,
}) => {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState<ReviewFor>({});
  const reviews = reviewHooks.useSelectedToiletReviews();

  useEffect(() => {
    dispatch(reviewActions.requestReviewsByToiletId(toiletId));
    return () => {
      //
    };
  }, [dispatch, toiletId]);

  const onChange = useCallback(
    (id: string, value: string) => {
      setReview({ ...review, [id]: value });
    },
    [review],
  );

  const onComplete = useCallback(() => console.log(review), [review]);

  return (
    <div style={{ width: '300px', background: 'white' }}>
      <div>
        <div style={{ fontSize: '20px' }}>리뷰 쓰시오</div>
        <TempInput name="리뷰" id="text" onChange={onChange} />
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
