import { useAppSelector } from '../configureStore';

export function useModalVisibility(): boolean {
  const show = useAppSelector(state => state.modal.show);
  return show;
}

export function useModalContent(): React.ReactNode {
  const content = useAppSelector(state => state.modal.modalContent);
  return content;
}
