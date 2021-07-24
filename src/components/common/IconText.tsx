import { css } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { FlexRowDiv, StyledIcon } from '.';

interface Props {
  icon: IconProp;
  text: string;
  enabled?: boolean;
}

export default function IconText({
  icon,
  text,
  enabled,
}: Props): React.ReactElement {
  return (
    <FlexRowDiv>
      <StyledIcon
        enabled={enabled}
        icon={icon}
        iconBoxCss={css`
          margin-right: 8px;
        `}
      />
      <span>{text}</span>
    </FlexRowDiv>
  );
}
