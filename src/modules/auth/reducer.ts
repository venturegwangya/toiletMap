import firebase from 'firebase';

export interface AuthState {
  user: firebase.User | undefined;
}

// const initialState: AuthState = {};

// export default function (
//   state:
// ): AuthState {

// }
