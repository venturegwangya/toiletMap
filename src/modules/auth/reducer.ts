import firebase from 'firebase/app';
import { AuthActionTypes, SIGN_IN, SIGN_UP } from './actions';

export interface AuthState {
  user: firebase.User | undefined | null;
}

/**
 * TODO: 이준희 => guest user 데이터 필요하면 추후에 정의해준다.
 */
const initialState: AuthState = {
  user: undefined,
};

export default function (
  state: AuthState = initialState,
  action: AuthActionTypes,
): AuthState {
  switch (action.type) {
    case SIGN_UP:
      return { ...state };
    case SIGN_IN:
      return { ...state };
    default:
      return { ...state };
  }
}
