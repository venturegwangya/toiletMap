/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';

const IconBox = styled.div<{ enabled?: boolean }>(props => ({
  display: 'flex',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  color: props.enabled ? 'black' : 'lightgrey',
  backgroundColor: props.enabled != null ? '' : 'lightgrey',
}));

interface StyledIconProps {
  iconClass: string;
  size?: string;
  enabled?: boolean;
  css: SerializedStyles;
}

function StyledIcon({
  size = 'fas',
  iconClass,
  enabled,
  css,
}: StyledIconProps): EmotionJSX.Element {
  return (
    <IconBox css={css} enabled={enabled}>
      <i className={`${size} ${iconClass}`} />
    </IconBox>
  );
}

export default StyledIcon;
