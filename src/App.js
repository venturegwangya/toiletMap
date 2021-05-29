/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import './App.css';
import HeaderLayout from './components/HeaderLayout';
import Map from './components/Map';
import TestComponent from './components/TestComponent';

function App() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <HeaderLayout>
        <div>logo</div>
      </HeaderLayout>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
          `}
        >
          <TestComponent />
        </div>
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
          `}
        >
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
