/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { fetchToilets } from '../apis/toiletApi';

function TestComponent() {
  const [toilets, setToilets] = useState([]);

  useEffect(() => {
    // componentMount/Update
    fetchToilets(toilets => setToilets(toilets));
    return () => {
      // cleanup
    };
  }, []);
  return (
    <div
      css={css`
        position: absolute;
        background-color: white;
        width: 200px;
        height: 200px;
        z-index: 500;
      `}
    >
      {toilets.map(toilet => toilet.name)}
    </div>
  );
}

export default TestComponent;
