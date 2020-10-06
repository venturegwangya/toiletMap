import * as React from 'react';
import styled from 'styled-components';
import Theme from '../theme/theme';

const Title = styled.h1.attrs({
  className: `i`,
})`
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Theme>
          <Title>Hello World</Title>
        </Theme>
      </div>
    );
  }
}
