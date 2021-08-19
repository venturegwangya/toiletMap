import React from 'react';
import tw from 'twin.macro';

export type ButtonType = 'submit' | 'button' | 'reset';

// TODO: 이준희 => 추후에 타입 별 버튼 색상 타입 추가
type Props = React.PropsWithChildren<{
  onClick(e: React.MouseEvent): void;
  disabled?: boolean;
  varientStyle?: string;
  type?: ButtonType;
}>;

const ButtonView = tw.button`
flex-1 
bg-blue-500
hover:bg-blue-700
text-white 
font-bold 
py-2
px-2
w-full
rounded 
focus:outline-none
`;

export function Button({
  onClick,
  children,
  disabled = false,
  type = 'button',
  varientStyle,
}: Props): React.ReactElement {
  return (
    <ButtonView
      className={varientStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonView>
  );
}
