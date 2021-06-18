import { combineReducers } from 'redux';
import map from './map';
import modal from './modal';

export const rootReducer = combineReducers({
  map,
  modal,
});
