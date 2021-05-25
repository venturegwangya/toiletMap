/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import './App.css';
import Map from './components/Map';
import TestComponent from './components/TestComponent';

function App() {

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <Map />
      <TestComponent />
    </div>
  );
}

export default App;
