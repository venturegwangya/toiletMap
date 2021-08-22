import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactElement } from 'react';
import tw from 'twin.macro';
import IconText from '../common/IconText';

const PillContainer = styled.div(props => [
  tw`relative padding[10px] z-over-map bg-white rounded-3xl shadow-default cursor-pointer w-max h-max hover:shadow-hover`,
]);

interface Props {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

export default function Pill({ icon, text, onClick }: Props): ReactElement {
  return (
    <PillContainer onClick={onClick}>
      <IconText icon={icon} text={text} enabled />
    </PillContainer>
  );
}
