/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from '../apis/authentication';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SignUpPage({ isSignUp }: any): JSX.Element {
  // signup
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUpWithEmailAndPassword(email, password, userName);
    alert('계정 생성');
  };

  const signIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
    alert('로그인 완료');
  };

  return (
    <div className="signUpPage">
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

SignUpPage.propTypes = {
  isSignUp: PropTypes.bool,
};

export default SignUpPage;
