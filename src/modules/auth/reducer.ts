import firebase from 'firebase';
import { authActions } from '.';

export interface AuthState {
  user: firebase.User | null;
}

/**
 * TODO: 이준희 => guest user 데이터 필요하면 추후에 정의해준다.
 */
const initialState: AuthState = {
  user: null,
};

export default function (
  state: AuthState = initialState,
  action: authActions.AuthActionTypes,
): AuthState {
  switch (action.type) {
    case authActions.SIGN_UP:
      return { ...state };
    case authActions.SIGN_IN:
      return { ...state };
    case authActions.UPDATE_USER:
      return { ...state, user: action.user };
    case authActions.SUBSCRIBE_AUTH_CHANGED:
      return { ...state };
    default:
      return { ...state };
  }
}
