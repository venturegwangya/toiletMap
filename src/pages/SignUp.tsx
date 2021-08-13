/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useSignInOrSignUp } from '@modules/auth/hooks';
import { useState } from 'react';

export default function SignUp(): JSX.Element {
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        className="signUpPage__form"
      >
        {isSignUp && (
          <input
            placeholder="Name"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        )}
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {isSignUp ? (
          <button
            type="submit"
            onClick={onClickSignUp}
            disabled={
              email.length === 0 ||
              userName.length === 0 ||
              password.length === 0
            }
          >
            가입
          </button>
        ) : (
          <button
            type="submit"
            onClick={onClickSignIn}
            disabled={email.length === 0 || password.length === 0}
          >
            로그인하기
          </button>
        )}
      </form>
      <button onClick={() => setSignUp(!isSignUp)}>
        {isSignUp
          ? '아이디가 갑자기 기억나서 로그인 하러 가기'
          : '회원 가입하기'}
      </button>
      {/* <div className="signUpPage__signUpContainer">
        {isSignUp ? `Already have an account?` : `Don't have an account?`}{' '}
        <Link className="signUpPage__signUpText" to={isSignUp ? '/login' : '/signup'}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </Link>
      </div> */}
    </div>
  );
}
