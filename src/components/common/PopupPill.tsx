/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactElement } from 'react';
import IconText from './IconText';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconProp;
  text: string;
  onClick: () => void;
  left?: number;
}

export default function PopupPill({
  icon,
  text,
  onClick,
  left,
}: Props): ReactElement {
  return (
    <div
      css={css`
        position: absolute;
        left: ${left}px;
        top: 100px;
        z-index: 500;
        background-color: white;
        padding: 10px;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        cursor: pointer;
      `}
      onClick={onClick}
    >
      <IconText icon={icon} text={text} enabled />
    </div>
  );
}
