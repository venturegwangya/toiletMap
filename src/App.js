/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import './App.css';
import Map from './components/Map';

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
