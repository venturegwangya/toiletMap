/** @jsxImportSource @emotion/react */
import { ReactElement } from 'react';
import IconText from '../common/IconText';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tw from 'twin.macro';

const PopupPillContainer = tw.div`absolute left-1/2 top-24 padding[10px] z-index[500] bg-white rounded-3xl shadow cursor-pointer transform -translate-x-1/2`;

interface Props {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

export default function PopupPill({
  icon,
  text,
  onClick,
}: Props): ReactElement {
  return (
    <PopupPillContainer onClick={onClick}>
      <IconText icon={icon} text={text} enabled />
    </PopupPillContainer>
  );
}
