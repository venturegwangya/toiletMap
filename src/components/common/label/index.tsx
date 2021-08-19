import tw from 'twin.macro';

// todo 이준희 => 타입 별로 필요한 것들 추후에 props로 받기
const LabelView = tw.label`
block 
text-gray-700
text-sm
font-bold
mb-2
`;

type Props = React.PropsWithChildren<{ htmlFor?: string }>;

export function Label({ children, htmlFor }: Props): React.ReactElement {
  return <LabelView htmlFor={htmlFor}>{children}</LabelView>;
}
