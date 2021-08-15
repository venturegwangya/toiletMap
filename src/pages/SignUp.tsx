/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useSignInOrSignUp } from '@modules/auth/hooks';
import { useState } from 'react';
import tw from 'twin.macro';

const Input = tw.input`
w-full
shadow
appearance-none
border
rounded
w-full
py-2
px-3
text-gray-700
leading-tight
focus:outline-none
focus:shadow-md
mb-3
`;

const Label = tw.label`
block 
text-gray-700
text-sm
font-bold
mb-2
`;

const Button = tw.button`
flex-1 
bg-blue-500
hover:bg-blue-700
text-white 
font-bold 
py-2
px-2
w-full
rounded 
focus:outline-none
`;

export function SignUp(): JSX.Element {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setSignUp] = useState(false);
  const { signIn, signUp } = useSignInOrSignUp();

  const onClickSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      signUp(email, password, userName);
      alert('계정 생성 완료');
    } catch (e) {
      alert(e);
    }
  };

  const onClickSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn(email, password);
    alert('로그인 완료');
  };

  return (
    <div className="bg-white p-4 flex flex-col items-center">
      <form className="w-full">
        {isSignUp && (
          <>
            <Label>이름(닉네임)</Label>
            <Input
              placeholder="Name"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </>
        )}
        <Label>이메일</Label>
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Label>비밀번호</Label>
        <Input
          placeholder="Password"
          type="password"
          value={password}
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
