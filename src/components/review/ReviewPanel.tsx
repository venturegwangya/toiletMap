import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch } from '@modules/configureStore';
import { reviewActions, reviewHooks, reviewModels } from '@modules/review';

type Props = {
  name: string;
  id: string;
  onChange: (id: string, value: string) => void;
};

function TempInput({ name, id, onChange }: Props) {
  return (
    <div style={{ display: 'inline-block' }}>
      <div>{name}</div>{' '}
      <input onChange={e => onChange(id, e.currentTarget.value)} />{' '}
    </div>
  );
}

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
      <div>
        {' '}
        {reviews.map((r, i) => (
          <div key={i}>
            {' '}
            {r.author} <br></br>
            {r.text}
          </div>
        ))}
      </div>
    </div>
  );
};
