import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    powderWhite: '#FFFDF9',
    persianGreen: '#06B49A',
    lightBlue: '#AFDBD2',
    onyx: '#36313D',
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

class Theme extends React.Component {
  // propType 지정하기
  // @babel/plugin-proposal-class-properties
  // https://stackoverflow.com/questions/35517245/error-missing-class-properties-transform
  // https://github.com/yannickcr/eslint-plugin-react/issues/522
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return <ThemeProvider theme={theme}> {this.props.children} </ThemeProvider>;
  }
}

export default Theme;
