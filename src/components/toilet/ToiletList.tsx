/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import { toiletModels } from 'src/apis/toilet';
import { processRawToiletData } from '../../util/parseToiletData';
import ToiletInfoCard from './ToiletInfoCard';
// import TestToilet from './TestToilet';

interface Props {
  user: firebase.User | null;
  toilets: toiletModels.Toilet[];
}

function ToiletList({ user, toilets }: Props): EmotionJSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const fileread = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileread.onload = function (e: any) {
      const content = e.target.result as string;
      // console.log(content);
      const data = JSON.parse(content); // Array of Objects.
      processRawToiletData(data.records.slice(0, 5));
    };
    fileread.readAsText(file);
  };

  return (
    <div
      css={css`
        background-color: white;
        overflow-y: scroll;
        padding-left: 20px;
        padding-right: 20px;
      `}
    >
      {toilets.map((toilet: toiletModels.Toilet) => (
        <ToiletInfoCard key={toilet.id} toilet={toilet} userId={user?.uid} />
      ))}
      <label>JSON파일 Firebase에 업로드</label>
      <input type="file" id="get_the_file" onChange={handleChange}></input>
    </div>
  );
}

export default ToiletList;