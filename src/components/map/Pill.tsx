/** @jsxImportSource @emotion/react */
import { ReactElement } from 'react';
import IconText from '../common/IconText';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tw, { theme } from 'twin.macro';

const PillContainer = tw.div`relative padding[10px] z-over-map bg-white rounded-3xl shadow-default cursor-pointer w-max h-max hover:shadow-hover`;

interface Props {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

export default function Pill({ icon, text, onClick }: Props): ReactElement {
  console.debug({ t: `${theme`colors.gray`}` });
  return (
    <PillContainer onClick={onClick}>
      <IconText icon={icon} text={text} enabled />
    </PillContainer>
  );
}
