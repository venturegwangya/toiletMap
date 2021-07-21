import { combineReducers } from 'redux';
import map from './map';
import modal from './modal';
import review from './review';
import toilet from './toilet';

export const rootReducer = combineReducers({
  map,
  modal,
  toilet,
  review,
});
