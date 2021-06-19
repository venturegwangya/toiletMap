/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';

const IconBox = styled.div<{ enabled?: boolean }>(props => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  width: '20px',
  height: '20px',
  color: props.enabled ? 'black' : 'lightgrey',
}));

interface StyledIconProps {
  iconClass: string;
  size?: string;
  enabled?: boolean;
  iconBoxCss: SerializedStyles;
}

function StyledIcon({
  size = 'fas',
  iconClass,
  enabled,
  iconBoxCss,
}: StyledIconProps): EmotionJSX.Element {
  return (
    <IconBox css={iconBoxCss} enabled={enabled}>
      <i
        className={`${size} ${iconClass}`}
        css={css`
          &:before {
            vertical-align: middle;
          }
        `}
      />
    </IconBox>
  );
}

export default StyledIcon;
