/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { authAPI } from '@modules/auth';

export default function SignUp({
  isSignUp,
}: {
  isSignUp?: boolean; // required 한가?
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // authAPI.signUpWithEmailAndPassword(email, password, userName);
    alert('계정 생성');
  };

  const signIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // authAPI.signInWithEmailAndPassword(email, password);
    alert('로그인 완료');
  };

  return (
    <div>
      <form className="signUpPage__form">
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
            onClick={signUp}
            disabled={
              email.length === 0 ||
              userName.length === 0 ||
              password.length === 0
            }
          >
            {' '}
            Sign Up
          </button>
        ) : (
          <button
            type="submit"
            onClick={signIn}
            disabled={email.length === 0 || password.length === 0}
          >
            {' '}
            Sign In
          </button>
        )}
      </form>
      {/* <div className="signUpPage__signUpContainer">
        {isSignUp ? `Already have an account?` : `Don't have an account?`}{' '}
        <Link className="signUpPage__signUpText" to={isSignUp ? '/login' : '/signup'}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </Link>
      </div> */}
    </div>
  );
}
