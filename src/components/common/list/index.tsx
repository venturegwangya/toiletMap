import { ReactNode } from 'react';
import tw from 'twin.macro';

export const DividedList = tw.ul`h-full p-8 divide-y divide-gray-300 overflow-y-auto scrollbar-width[1em]`;
export const RoundContainer = tw.div`w-full overflow-hidden bg-white rounded-xl shadow-default md:(margin-top[1em] margin-bottom[1em])`;
export const RoundDividedList = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <RoundContainer>
    <DividedList>{children}</DividedList>
  </RoundContainer>
);
