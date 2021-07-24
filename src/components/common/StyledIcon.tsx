/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import { Icon, IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const IconBox = styled.div<{ enabled?: boolean }>(props => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  width: '20px',
  height: '20px',
  color: props.enabled ? 'black' : 'lightgrey',
}));

interface StyledIconProps {
  icon: IconProp;
  enabled?: boolean;
  iconBoxCss: SerializedStyles;
}

function StyledIcon({
  icon,
  enabled,
  iconBoxCss,
}: StyledIconProps): EmotionJSX.Element {
  return (
    <IconBox css={iconBoxCss} enabled={enabled}>
      <FontAwesomeIcon icon={icon} />
    </IconBox>
  );
}

export default StyledIcon;
