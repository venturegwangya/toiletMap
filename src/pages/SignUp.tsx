/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Button } from '@components/common/button';
import { Input } from '@components/common/input';
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
        alert('계정 생성 완료');
      } catch (e) {
        alert(e);
      }
    },
    [signIn, signUp],
  );

  const onClickSignIn = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      signIn(email, password);
      alert('로그인 완료');
    },
    [signIn, signUp],
  );

  return (
    <div className="bg-white p-4 flex flex-col items-center">
      <form className="w-full">
        {isSignUp && (
          <>
            {/** 아래 컴포넌트도 한번 더 묶는 게 맞는 것일까? */}
            <Label>이름(닉네임)</Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              defalutValue={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </>
        )}
        <Label>이메일</Label>
        <Input
          id="email"
          placeholder="Email"
          type="text"
          defalutValue={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Label>비밀번호</Label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          defalutValue={password}
          onChange={e => setPassword(e.target.value)}
        />
        {isSignUp ? (
          <Button
            type="submit"
            onClick={onClickSignUp}
            disabled={
              email.length === 0 ||
              userName.length === 0 ||
              password.length === 0
            }
          >
            회원가입
          </Button>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Button
              type="submit"
              onClick={onClickSignIn}
              disabled={email.length === 0 || password.length === 0}
            >
              로그인
            </Button>
          </div>
        )}
        <div
          className="text-sm pt-2 cursor-pointer text-center text-gray-700"
          onClick={() => setSignUp(!isSignUp)}
        >
          {isSignUp ? '다시 로그인하기 ' : '회원 가입하기'}
        </div>
      </form>
    </div>
  );
}
