/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import SignUp from '../../../pages/SignUp';

export function LogInModal(): EmotionJSX.Element {
  return (
    <div
      css={css`
        width: 200px;
        height: 300px;
      `}
    >
      <SignUp></SignUp>
      <SignUp isSignUp></SignUp>
    </div>
  );
}
