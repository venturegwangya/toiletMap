import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import firebase from 'firebase';
import { useCallback } from 'react';
import { authActions } from '.';

export function useUser(): {
  user: firebase.User | null;
  setUser(user: firebase.User | null): void;
} {
  const dispatch = useAppDispatch();
  const setUser = useCallback(
    (user: firebase.User) => {
      dispatch(authActions.updateUser(user));
    },
    [dispatch],
  );
  const user = useAppSelector(state => state.auth.user);
  return { user, setUser };
}

export function useLogOut(): () => void {
  const dispatch = useAppDispatch();
  const logOut = useCallback(() => dispatch(authActions.logOut()), [dispatch]);
  return logOut;
}

export function useSignInOrSignUp(): {
  signIn(email: string, password: string): void;
  signUp(email: string, password: string, displayName: string): void;
} {
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    (email: string, password: string) =>
      dispatch(authActions.signIn(email, password)),
    [dispatch],
  );

  const signUp = useCallback(
    (email: string, password: string, displayName: string) =>
      dispatch(authActions.signUp(email, password, displayName)),
    [dispatch],
  );
  return { signIn, signUp };
}
