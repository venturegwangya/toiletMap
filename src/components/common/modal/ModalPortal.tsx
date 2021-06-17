/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  onAfterClose: () => void;
  children?: React.ReactNode;
  show: boolean;
}

export function ModalPortal(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onAfterClose();
  };

  return ReactDOM.createPortal(
    <>
      {props.show && (
        <>
          <div
            css={css`
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 99999;
              background: rgba(0, 0, 0, 0.5); ;
            `}
            onClick={onClickOutside}
          ></div>
          <div
            css={css`
              left: 50%;
              top: 50%;
              width: 500px;
              height: 300px;
              background-color: white;
            `}
            ref={contentRef}
          >
            <div>{props.children}</div>
          </div>
        </>
      )}
    </>,
    document.getElementById('modal-root') || document.body,
  );
}
