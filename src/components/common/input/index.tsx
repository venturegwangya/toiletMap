import styled from '@emotion/styled';
import { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import tw from 'twin.macro';

const Internal = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

export function Input({
  id,
  onChange,
}: {
  id: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}): ReactElement {
  const [value, setValue] = useState<string>('');
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [id, onChange, value],
  );

  return <input className="" onChange={onChangeInput} value={value} id={id} />;
}
