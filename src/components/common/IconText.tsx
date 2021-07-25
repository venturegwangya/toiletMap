/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import tw from 'twin.macro';

const IconTextContainer = styled.div<{ enabled?: boolean }>(props => [
  tw`flex`,
  tw`flex-row`,
  tw`items-center`,
  tw`gap-3`,
  !props.enabled && tw`text-gray-300`,
]);

interface Props {
  icon: IconProp;
  text?: string;
  enabled?: boolean;
}

export default function IconText({
  icon,
  text,
  enabled,
}: Props): React.ReactElement {
  return (
    <IconTextContainer enabled={enabled}>
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
