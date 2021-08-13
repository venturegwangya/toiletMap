import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import firebase from 'firebase';
import { useCallback } from 'react';
import { authActions } from '.';

export function useUser(): {
  user: firebase.User | null;
  setUser(user: firebase.User | null): void;
} {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const setUser = useCallback((_user: firebase.User) => {
    dispatch(authActions.updateUser(_user));
  }, []);
  return { user, setUser };
}

export function useLogOut() {
  const dispatch = useAppDispatch();
  const signOut = useCallback(() => {
    dispatch(authActions.logOut());
  }, []);
  return signOut;
}

export function useSignInOrSignUp(): {
  signIn(email: string, password: string): void;
  signUp(email: string, password: string, displayName: string): void;
} {
  const dispatch = useAppDispatch();

  const signIn = useCallback((email: string, password: string) => {
    dispatch(authActions.signIn(email, password));
  }, []);

  const signUp = useCallback(
    (email: string, password: string, displayName: string) => {
      dispatch(authActions.signUp(email, password, displayName));
    },
    [],
  );
  return { signIn, signUp };
}
