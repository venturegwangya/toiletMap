import * as React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Title>Hello World</Title>
      </div>
    );
  }
}
