import React from 'react';
import StyledIcon from './StyledIcon';

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
    <div>
      <StyledIcon enabled={enabled} iconClass={iconClass} />
      <span>
        {text} {enabled ? '있음' : '없음'}
      </span>
    </div>
  );
}
