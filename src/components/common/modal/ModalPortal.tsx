/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  useModalContent,
  useModalVisibility,
} from '../../../modules/modal/hooks';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useAppDispatch } from '../../../modules/configureStore';
import { modalActions } from '../../../modules/modal';

/**
 * 우선 이 포탈이 hook으로 자신의 상태를 관리한다.
 * 딱히, stateless할 이유가 없어 우선 이렇게 처리
 */
export function ModalPortal(): EmotionJSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const content = useModalContent();
  const show = useModalVisibility();
  const dispatch = useAppDispatch();

  const onClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(modalActions.hideModal());
  };

  return ReactDOM.createPortal(
    <>
      {show && (
        <>
          <div
            css={css`
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 99999; // 추후에 styled-component 지정해둔다.
              background: rgba(0, 0, 0, 0.5); ;
            `}
            onClick={onClickOutside}
          ></div>
          <div
            css={css`
              display: flex;
              left: 50%;
              justify-content: center;
              align-items: center;
              background-color: white;
              top: 50%;
              border-radius: 8px;
              position: absolute;
              transform: translate(-50%, -50%);
              z-index: 9999999; // 추후에 styled-component 지정해둔다.
            `}
            ref={contentRef}
          >
            {content}
          </div>
        </>
      )}
    </>,
    document.getElementById('modal-root') || document.body,
  );
}
