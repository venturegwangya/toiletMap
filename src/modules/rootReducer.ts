import { combineReducers } from 'redux';
import map from './map';
import window from './window';
import review from './review';
import toilet from './toilet';
import auth from './auth';

export const rootReducer = combineReducers({
  map,
  window,
  toilet,
  review,
  auth,
});
