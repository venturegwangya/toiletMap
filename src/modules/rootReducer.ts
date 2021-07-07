import { combineReducers } from 'redux';
import map from './map';
import modal from './modal';
import review from './review';

export const rootReducer = combineReducers({
  map,
  modal,
  review,
});
