import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}

function StyledIcon({ icon, enabled }: StyledIconProps): EmotionJSX.Element {
  return (
    <IconBox enabled={enabled}>
      <FontAwesomeIcon icon={icon} />
    </IconBox>
  );
}

export default StyledIcon;
