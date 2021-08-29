/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import tw from 'twin.macro';

const IconTextContainer = styled.div<{
  enabled?: boolean;
  clickable?: boolean;
}>(props => [
  tw`flex flex-row items-center`,
  tw`gap-3`,
  !props.enabled && tw`text-gray-300`,
  props.clickable && tw`cursor-pointer`,
]);

interface Props {
  icon: IconProp;
  text?: string;
  enabled?: boolean;
  onClick?: () => void;
}

export default function IconText({
  icon,
  text,
  enabled,
  onClick,
}: Props): React.ReactElement {
  return (
    <IconTextContainer
      enabled={enabled}
      onClick={onClick}
      clickable={onClick != null}
    >
      <FontAwesomeIcon
        icon={icon}
        css={css`
          width: 16px !important;
        `}
        // className={!enabled ? `text-gray-300` : undefined}
      />
      <span>{text}</span>
    </IconTextContainer>
  );
}
