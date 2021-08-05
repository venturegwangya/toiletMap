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
