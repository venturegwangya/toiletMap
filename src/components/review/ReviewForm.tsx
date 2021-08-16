import IconText from '@components/common/IconText';
import firebase from 'firebase';
import { toiletModels } from '@modules/toilet';
import tw from 'twin.macro';
import { StartRatingBar } from '@components/review/StarRatingBar';
import {
  faChild,
  faGenderless,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { reviewHooks } from '@modules/review';

const ReviewFormContainer = tw.form`flex flex-col items-center`;
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
  toilet: toiletModels.Toilet;
  user: firebase.User;
}

interface ReviewPanelState {
  disabledFacilities: boolean;
  unisex: boolean;
  childFacilities: boolean;
  text: string;
  rating: number;
}
export function ReviewForm({ toilet, user }: ReviewPanelProps): JSX.Element {
  const createReview = reviewHooks.useCreateReview();
  const [newReview, setNewReview] = useState<ReviewPanelState>({
    disabledFacilities: false,
    unisex: false,
    childFacilities: false,
    text: '',
    rating: 1,
  });

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview({
      ...newReview,
      [e.currentTarget.id]: e.currentTarget.checked,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview({
      ...newReview,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <ReviewFormContainer>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>리뷰 작성</div>
      <div style={{ fontSize: '16px', marginBottom: '6px' }}>평점</div>
      <StartRatingBar value={1 + ''} />
      <div
        style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px' }}
      >
        화장실 편의시설이 잘되어 있었나요?
      </div>
      {/** TODO: 아래 반복되는 것들 컴포넌트로 분리 (+ 스타일링) */}
      <div>
        <IconText icon={faGenderless} enabled />
        <label htmlFor="unisex">남녀공용</label>
        <input id="unisex" type="checkbox" onChange={onChecked} />
      </div>
      <div>
        <IconText icon={faWheelchair} enabled />
        <label htmlFor="disabledFacilities">장애인용 시설</label>
        <input id="disabledFacilities" type="checkbox" onChange={onChecked} />
      </div>
      <div>
        <IconText icon={faChild} enabled />
        <label htmlFor="childFacilities">아동용 시설</label>
        <input id="childFacilities" type="checkbox" onChange={onChecked} />
      </div>
      화장실에 대해 간단하게 알려주세요.
      <textarea id="text" onChange={onChange} />
      <div style={{ fontSize: '14px', marginBottom: '4px' }}>
        <CompleteButton
          onClick={() =>
            createReview(toilet, {
              ...newReview,
              id: user.uid,
              author: user.displayName || '',
            })
          }
        >
          리뷰 등록
        </CompleteButton>
      </div>
    </ReviewFormContainer>
  );
}
