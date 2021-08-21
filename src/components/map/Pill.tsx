/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactElement } from 'react';
import tw from 'twin.macro';
import IconText from '../common/IconText';

const PillContainer = styled.div<{ show: boolean }>(props => [
  tw`relative padding[10px] z-over-map bg-white rounded-3xl shadow-default cursor-pointer w-max h-max hover:shadow-hover transition-transform transform translate-y-neg-300`,
  props.show && tw`translate-y-0`,
]);

interface Props {
  show: boolean;
  icon: IconProp;
  text: string;
  onClick: () => void;
}

export default function Pill({
  show,
  icon,
  text,
  onClick,
}: Props): ReactElement {
  return (
    <PillContainer onClick={onClick} show={show}>
      <IconText icon={icon} text={text} enabled />
    </PillContainer>
  );
}
