/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { PropsWithChildren, ReactElement } from 'react';

export default function LeftMenuContainer(
  props: PropsWithChildren<any>,
): ReactElement {
  return (
    <div
      css={css`
        width: 50px;
        height: 100%;
        background-color: white;
      `}
    >
      {props.children}
    </div>
  );
}
