import { css } from '@emotion/react';
import React from 'react';
import { FlexRowDiv, StyledIcon } from '../common';

interface ToiletInfoIconText {
  iconClass: string;
  text: string;
  enabled?: boolean;
}

export default function ToiletInfoIconText({
  iconClass,
  text,
  enabled,
}: ToiletInfoIconText): React.ReactElement {
  return (
    <FlexRowDiv>
      <StyledIcon
        enabled={enabled}
        iconClass={iconClass}
        css={css`
          margin-right: 8px;
        `}
      />
      <span>
        {text} {enabled ? '있음' : '없음'}
      </span>
    </FlexRowDiv>
  );
}
