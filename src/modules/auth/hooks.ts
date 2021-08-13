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
