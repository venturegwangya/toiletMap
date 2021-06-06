/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
      `}
    >
      {children}
    </div>
  );
}

export default HeaderLayout;
