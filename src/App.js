/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Map from './components/Map';
import './App.css';

function App() {
  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <Map />
    </div>
  );
}

export default App;
