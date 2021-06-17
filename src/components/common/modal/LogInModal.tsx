import { ModalPortal } from './ModalPortal';
export interface Props {
  onAfterClose: () => void;
  show: boolean;
}
export function LogInModal(props: Props) {
  return <ModalPortal {...props}>123123</ModalPortal>;
}
