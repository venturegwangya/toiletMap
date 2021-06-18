import { useSelector } from 'react-redux';
import { RootState } from '../../modules/configureStore';

function useModalVisibility(): boolean {
  const show = useSelector((state: RootState) => state.modal.show);
  return show;
}

function useModalContent(): React.ReactNode {
  const content = useSelector((state: RootState) => state.modal.modalContent);
  return content;
}

export { useModalVisibility, useModalContent };
