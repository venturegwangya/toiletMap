import * as React from 'react';
import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: `i bg-dark-red`,
})``;

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Title>Hello World</Title>
      </div>
    );
  }
}
