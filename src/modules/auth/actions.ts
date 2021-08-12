import firebase from 'firebase';

/**
 * 회원가입
 */
export const SIGN_UP = 'auth/SIGN_UP' as const;

export interface SignUpAction {
  type: typeof SIGN_UP;
  email: string;
  password: string;
}
export function signUp(email: string, password: string): SignUpAction {
  return {
    type: SIGN_UP,
    email,
    password,
  };
}

/**
 * 로그인 액션
 */
export const SIGN_IN = 'auth/SIGN_IN' as const;

export interface SignInAction {
  type: typeof SIGN_IN;
  email: string;
  password: string;
  displayName: string;
}

export function signIn(
  email: string,
  password: string,
  displayName: string,
): SignInAction {
  return {
    type: SIGN_IN,
    email,
    password,
    displayName,
  };
}

/**
 * 로그아웃 액션
 */
export const LOG_OUT = 'auth/LOG_OUT' as const;
export interface LogOutAction {
  type: typeof LOG_OUT;
}
export function logOut(): LogOutAction {
  return {
    type: LOG_OUT,
  };
}

/**
 * User 정보 update
 */
export const UPDATE_USER = 'auth/UPDATE_USER' as const;

// TODO: 이준희 => null, undefined WrapperType 정의(?)
export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  user: firebase.User | null | undefined;
}

export function updateUser(
  user: firebase.User | undefined | null,
): UpdateUserAction {
  return {
    type: UPDATE_USER,
    user,
  };
}

export type AuthActionTypes = SignInAction | SignUpAction | LogOutAction;
