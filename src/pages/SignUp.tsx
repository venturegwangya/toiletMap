/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StyledButton } from '@components/common/button';
import { StyledInput } from '@components/common/input';
import { Label } from '@components/common/label';
import { useSignInOrSignUp } from '@modules/auth/hooks';
import React, { useCallback, useState } from 'react';

export function SignUp(): JSX.Element {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setSignUp] = useState(false);
  const { signIn, signUp } = useSignInOrSignUp();

  const onClickSignUp = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        signUp(email, password, userName);
        console.log(email, password, userName);
      } catch (e) {
        alert(e);
      }
    },
    [email, password, signUp, userName],
  );

  const onClickSignIn = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      signIn(email, password);
      console.log(email, password);
    },
    [email, password, signIn],
  );

  return (
    <form className="w-full">
      {isSignUp && (
        <>
          {/** 아래 컴포넌트도 한번 더 묶는 게 맞는 것일까? */}
          <Label>이름(닉네임)</Label>
          <StyledInput
            id="name"
            placeholder="Name"
            type="text"
            defaultValue={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </>
      )}
      <Label>이메일</Label>
      <StyledInput
        id="email"
        placeholder="Email"
        type="text"
        defaultValue={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Label>비밀번호</Label>
      <StyledInput
        id="password"
        placeholder="Password"
        type="password"
        defaultValue={password}
        onChange={e => setPassword(e.target.value)}
      />
      {isSignUp ? (
        <StyledButton
          type="submit"
          onClick={onClickSignUp}
          disabled={
            email.length === 0 || userName.length === 0 || password.length === 0
          }
        >
          회원가입
        </StyledButton>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <StyledButton
            type="submit"
            onClick={onClickSignIn}
            disabled={email.length === 0 || password.length === 0}
          >
            로그인
          </StyledButton>
        </div>
      )}
      <div
        className="text-sm pt-2 cursor-pointer text-center text-gray-700"
        onClick={() => setSignUp(!isSignUp)}
      >
        {isSignUp ? '다시 로그인하기 ' : '회원 가입하기'}
      </div>
    </form>
  );
}
