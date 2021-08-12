import { useAppSelector } from '@modules/configureStore';
import firebase from 'firebase';

export function useUser(): firebase.User | null {
  return useAppSelector(state => state.auth.user);
}
