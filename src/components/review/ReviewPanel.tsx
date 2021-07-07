import { ReviewBase } from '@apis/review/models';
import { useCallback, useState } from 'react';

type Props = {
  name: string;
  id: string;
  onChange: (id: string, value: string) => void;
};

function TempInput({ name, id, onChange }: Props) {
  return (
    <div style={{ display: 'inline-block' }}>
      <div>{name}</div>
      <input onChange={e => onChange(id, e.currentTarget.value)} />
    </div>
  );
}

type ReviewFor = Partial<ReviewBase>;

export function ReviewPanel() {
  const [review, setReview] = useState<ReviewFor>({});

  const onChange = useCallback(
    (id: string, value: string) => {
      setReview({ ...review, [id]: value });
    },
    [review],
  );

  const onComplete = useCallback(() => console.log(review), [review]);

  return (
    <div style={{ width: '300px', background: 'white' }}>
      <div style={{ fontSize: '20px' }}>리뷰 쓰시오</div>
      <TempInput name="리뷰" id="text" onChange={onChange} />
      <button onClick={onComplete}>리뷰 등록</button>
    </div>
  );
}
