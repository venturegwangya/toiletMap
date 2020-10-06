import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

render(<App />, document.getElementById('root'));
//  테스트 아아
console.log(_.compact([0, 1, false, 2, '', 3]));
