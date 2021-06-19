/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactElement } from 'react';
import IconText from './IconText';

interface Props {
  icon: string;
  text: string;
  onClick: () => void;
}

export default function PopupPill({
  icon,
  text,
  onClick,
}: Props): ReactElement {
  return (
    <div
      css={css`
        position: absolute;
        left: 50%;
        top: 50px;
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
      <IconText iconClass={icon} text={text} enabled />
    </div>
  );
}
