/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type Size = 40 | 48 | 56;

interface AvartProps {
  imgSrc: string;
  size: Size;
  onClick: () => void;
}

export function Avatar({
  imgSrc,
  size,
  onClick,
}: AvartProps): React.ReactElement {
  return (
    <img
      onClick={onClick}
      css={css`
        object-fit: cover;
        width: ${size}px;
        height: ${size}px;
        border-radius: 100%;
        &:hover {
          cursor: pointer;
        }
      `}
      src={imgSrc}
      alt="profile"
    />
  );
}
