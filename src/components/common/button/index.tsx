import styled from '@emotion/styled';
import tw from 'twin.macro';

export const StyledButton = styled.button<{
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}>(props => [
  tw`flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-full rounded focus:outline-none`,
  props.disabled && tw`disabled:bg-gray-100`,
]);
