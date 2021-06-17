import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function useModalVisibility(): boolean {
  const show = useSelector((state: RootState) => state.modalReducer.show);
  return show;
}

function useModalContent() {
  const content = useSelector(
    (state: RootState) => state.modalReducer.modalContent,
  );
  return content;
}

export { useModalVisibility, useModalContent };
