import { useAppSelector } from '../configureStore';

export function useModalVisibility(): boolean {
  const show = useAppSelector(state => state.window.show);
  return show;
}

export function useModalContent(): React.ReactNode {
  const content = useAppSelector(state => state.window.modalContent);
  return content;
}

export function useRefreshPillPosition(): string {
  const position = useAppSelector(state => state.window.pillLeftPosition);
  return position;
}
