/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export default function BodyLayout({
  LeftPanel,
  RightPanel,
}: {
  LeftPanel: React.ReactNode;
  RightPanel: React.ReactNode;
}): EmotionJSX.Element {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          overflow-y: scroll;
        `}
      >
        {LeftPanel}
      </div>
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
        `}
      >
        {RightPanel}
      </div>
    </div>
  );
}
