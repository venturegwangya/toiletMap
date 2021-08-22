import firebase from 'firebase';

/**
 * 회원가입
 */
export const SIGN_UP = 'auth/SIGN_UP' as const;

export interface SignUpAction {
  type: typeof SIGN_UP;
  email: string;
  password: string;
  displayName: string;
}

export function signUp(
  email: string,
  password: string,
  displayName: string,
): SignUpAction {
  return {
    type: SIGN_UP,
    email,
    password,
    displayName,
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
}

export function signIn(email: string, password: string): SignInAction {
  return {
    type: SIGN_IN,
    email,
    password,
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
  user: firebase.User | null;
}

export function updateUser(user: firebase.User | null): UpdateUserAction {
  return {
    type: UPDATE_USER,
    user,
  };
}

/**
 * User Auth 상태 구독
 */
export const SUBSCRIBE_AUTH_CHANGED = 'auth/SUBSCRIBE_AUTH_CHANGED' as const;
export interface SubscribeAuthChangedAction {
  type: typeof SUBSCRIBE_AUTH_CHANGED;
}

export function subscribeToAuthChanged(): SubscribeAuthChangedAction {
  return {
    type: SUBSCRIBE_AUTH_CHANGED,
  };
}

export type AuthActionTypes =
  | SignInAction
  | SignUpAction
  | LogOutAction
  | UpdateUserAction
  | SubscribeAuthChangedAction;
