import { useSelector } from 'react-redux';
import { AppPath } from '../reducers/pathReducer';
import { RootState } from '../store';

export function useAppPath(): AppPath {
  const path = useSelector((state: RootState) => state.pathReducer.path);
  return path;
}
