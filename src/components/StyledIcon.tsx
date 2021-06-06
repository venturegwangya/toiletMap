/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Icon } from 'react-bulma-components';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

interface StyledIconProps {
  iconClass: string;
  size?: string;
  enabled?: boolean;
}

export default function StyledIcon({
  size = 'fas',
  iconClass,
  enabled,
}: StyledIconProps): EmotionJSX.Element {
  return (
    <Icon
      css={css`
        color: ${enabled ? 'black' : 'lightgrey'};
        background-color: ${enabled != null ? '' : 'lightgrey'};
      `}
    >
      <i className={`${size} ${iconClass}`} />
    </Icon>
  );
}
