/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { subscribeToAuthChange } from '../apis/authentication';
import { fetchToilets } from '../apis/toilets';
import SignUpPage from './SignUp';
import TestToilet from './TestToilet';

function TestComponent() {
  const [toilets, setToilets] = useState([]);
  const [user, setUser] = useState(null);

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
    fetchToilets(toilets => setToilets(toilets));
    return () => {
      // cleanup
    };
  }, []);
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
      {toilets.map((toilet, i) => (
        <TestToilet key={i} toilet={toilet} userId={user.uid} />
      ))}
    </div>
  );
}

export default TestComponent;
