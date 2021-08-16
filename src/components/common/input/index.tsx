import { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import tw from 'twin.macro';

const InputInternal = tw.input`
w-full
shadow
appearance-none
border
rounded
w-full
py-2
px-3
text-gray-700
leading-tight
focus:outline-none
focus:shadow-md
mb-3
`;

export function Input({
  id,
  onChange,
  defalutValue,
  placeholder,
  type,
}: {
  id: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  defalutValue: string;
  placeholder?: string;
  type?: string;
}): ReactElement {
  const [value, setValue] = useState<string>(defalutValue ?? '');
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  }, []);

  return (
    <InputInternal
      type={type}
      placeholder={placeholder || ''}
      onChange={onChangeInput}
      value={value}
      id={id}
    />
  );
}
