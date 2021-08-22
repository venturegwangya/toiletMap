import { css } from '@emotion/react';
import React, { ReactElement, useState } from 'react';

function Star({ marked, id }: { marked: boolean; id: number }) {
  return (
    <span
      data-star-id={id}
      css={css`
        color: #ff9933;
        cursor: pointer;
      `}
      role="button"
    >
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
}

export function StartRatingBar({ value }: { value: string }): ReactElement {
  const [rating, setRating] = useState(parseInt(value) || 0);
  const [selection, setSelection] = useState(0);

  /**
   * MouseEvent에 event.target.getAttribute 없음
   */
  const hoverOver = (event: any) => {
    let val = 0;
    if (event?.target)
      val = Number(event.target.getAttribute('data-star-id') || 0);
    setSelection(val);
  };
  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={(e: any) =>
        setRating(Number(e.target.getAttribute('data-star-id')) || rating)
      }
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          id={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
}
