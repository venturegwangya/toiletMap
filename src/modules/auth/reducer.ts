import firebase from 'firebase';
import { AuthActionTypes, SIGN_IN, SIGN_UP } from './actions';

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
