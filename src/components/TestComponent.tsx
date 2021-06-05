/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import { LatLng } from 'leaflet';
import { Toilet } from '../apis/toilets';
import { processRawToiletData } from '../util/parseToiletData';
import SignUpPage from './SignUp';
import TestToilet from './TestToilet';
// import TestToilet from './TestToilet';

interface Props {
  user: firebase.User | null;
  toilets: Toilet[];
  curpos: LatLng;
}

function TestComponent({ user, toilets, curpos }: Props): EmotionJSX.Element {
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
      `}
    >
      <div>
        로그인된 유저:{user && user.displayName}, UID: {user && user.uid}
        <br />
        위치: {curpos.lat}, {curpos.lng}
      </div>
      <SignUpPage isSignUp />
      <SignUpPage />
      {toilets.map((toilet: Toilet, i: number) => (
        <TestToilet key={i} toilet={toilet} userId={user?.uid} />
      ))}
      <label>JSON파일 Firebase에 업로드</label>
      <input type="file" id="get_the_file" onChange={handleChange}></input>
    </div>
  );
}

export default TestComponent;
