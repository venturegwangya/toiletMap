import { css } from '@emotion/react';
import React from 'react';
import { FlexRowDiv, StyledIcon } from '.';

interface Props {
  iconClass: string;
  text: string;
  enabled?: boolean;
}

export default function IconText({
  iconClass,
  text,
  enabled,
}: Props): React.ReactElement {
  return (
    <FlexRowDiv>
      <StyledIcon
        enabled={enabled}
        iconClass={iconClass}
        iconBoxCss={css`
          margin-right: 8px;
        `}
      />
      <span>{text}</span>
    </FlexRowDiv>
  );
}
