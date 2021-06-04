/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { subscribeToAuthChange } from '../apis/authentication';
import { fetchToiletWithArea, Toilet } from '../apis/toilets';
import { processRawToiletData } from '../util/parseToiletData';
import SignUpPage from './SignUp';
import TestToilet from './TestToilet';
// import TestToilet from './TestToilet';

function TestComponent(): EmotionJSX.Element {
  const [toilets, setToilets] = useState<any>([]);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    // user바뀔 때
    const unsubscribe = subscribeToAuthChange(
      authUser => {
        setUser(authUser);
      },
      () => setUser(null),
    );
    return () => {
      unsubscribe(); // detach backend listener
    };
  }, []);

  useEffect(() => {
    // componentMount/Update
    const seoul: firebase.firestore.GeoPoint = new firebase.firestore.GeoPoint(
      37.40095,
      126.733522,
    );
    fetchToiletWithArea(seoul, 1000).then(res =>
      setToilets(res.map(r => Object.assign(r.data(), { id: r.id }))),
    );
    // const data = res.map((r: { data: () => any; id: any }) =>
    // );
    // setToilets(data);
  }, []);

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
        position: absolute;
        background-color: white;
        width: 200px;
        height: 200px;
        z-index: 500;
      `}
    >
      <div>
        로그인된 유저:{user && user.displayName}, UID: {user && user.uid}
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
