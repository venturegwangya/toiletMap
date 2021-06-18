import { useSelector } from 'react-redux';
import { RootState } from '../../modules/configureStore';

function useModalVisibility(): boolean {
  const show = useSelector((state: RootState) => state.modalReducer.show);
  return show;
}

function useModalContent(): React.ReactNode {
  const content = useSelector(
    (state: RootState) => state.modalReducer.modalContent,
  );
  return content;
}

export { useModalVisibility, useModalContent };
